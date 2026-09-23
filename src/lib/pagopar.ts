import crypto from "node:crypto";

/**
 * Pagopar REST integration ("iniciar transacción").
 * Reference: https://soporte.pagopar.com/portal/es/kb/articles/api-integracion-medios-pagos
 *
 * Pagopar doesn't publish a separate sandbox host — test transactions are run
 * against the same API using the test credentials issued with the merchant
 * account. Until PAGOPAR_PUBLIC_TOKEN/PAGOPAR_PRIVATE_TOKEN are set to real
 * (test or live) values from the Pagopar dashboard, calls here will fail.
 */

const PAGOPAR_API_URL = "https://api.pagopar.com/api/comercios/2.0/iniciar-transaccion";
const PAGOPAR_CHECKOUT_URL = "https://www.pagopar.com/pagos";

function sha1(input: string) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

export type PagoparBuyer = {
  nombre: string;
  email: string;
  documento: string;
  telefono: string;
  direccion: string;
};

export type PagoparItem = {
  productoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
};

type CreatePaymentOrderInput = {
  orderId: string;
  totalAmount: number;
  buyer: PagoparBuyer;
  items: PagoparItem[];
};

export async function createPaymentOrder({
  orderId,
  totalAmount,
  buyer,
  items,
}: CreatePaymentOrderInput) {
  const publicToken = process.env.PAGOPAR_PUBLIC_TOKEN!;
  const privateToken = process.env.PAGOPAR_PRIVATE_TOKEN!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const token = sha1(privateToken + orderId + String(totalAmount));

  const maxPaymentDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const fechaMaximaPago = maxPaymentDate.toISOString().slice(0, 19).replace("T", " ");

  const body = {
    token,
    public_key: publicToken,
    monto_total: totalAmount,
    tipo_pedido: "VENTA-COMERCIO",
    id_pedido_comercio: orderId,
    fecha_maxima_pago: fechaMaximaPago,
    notificar_url: `${siteUrl}/api/webhooks/pagopar`,
    url_retorno: `${siteUrl}/checkout/exito?order=${orderId}`,
    comprador: {
      ruc: "",
      email: buyer.email,
      nombre: buyer.nombre,
      telefono: buyer.telefono,
      documento: buyer.documento,
      tipo_documento: "CI",
      direccion: buyer.direccion,
      ciudad: "Asunción",
      coordenadas: "",
      razon_social: buyer.nombre,
      direccion_referencia: "",
    },
    compras_items: items.map((item) => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      categoria: "Cuidado personal",
      precio_total: item.precioUnitario * item.cantidad,
      id_producto: item.productoId,
      descripcion: item.nombre,
      url_imagen: "",
      public_key: publicToken,
      ciudad: "Asunción",
      vendedor_telefono: "",
      vendedor_direccion: "",
      vendedor_direccion_referencia: "",
      vendedor_direccion_coordenadas: "",
    })),
  };

  const response = await fetch(PAGOPAR_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([body]),
  });

  const json = await response.json();

  if (!response.ok || !json?.respuesta || !json?.resultado?.[0]?.data) {
    throw new Error(
      `Pagopar rechazó la transacción: ${json?.resultado?.[0]?.mensaje ?? response.statusText}`
    );
  }

  const hashPedido: string = json.resultado[0].data;

  return {
    hashPedido,
    checkoutUrl: `${PAGOPAR_CHECKOUT_URL}/${hashPedido}`,
  };
}

/**
 * Verifies the signature Pagopar sends on its payment-status webhook so an
 * order can only be marked as paid by a genuine Pagopar callback.
 */
export function verifyWebhookToken(hashPedido: string, receivedToken: string) {
  const privateToken = process.env.PAGOPAR_PRIVATE_TOKEN!;
  return sha1(privateToken + hashPedido) === receivedToken;
}

export type PagoparWebhookPayload = {
  resultado: Array<{
    pagado: boolean;
    hash_pedido: string;
    token: string;
    fecha_pago?: string;
    monto?: string;
    forma_pago?: string;
    numero_comprobante_interno?: string;
  }>;
};
