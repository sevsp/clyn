import { NextResponse } from "next/server";
import { z } from "zod";
import { getProductBySlug } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";
import { getClientIp, isRateLimited, isSameOrigin } from "@/lib/api-security";

const SHIPPING_COST = 0;
const ORDERS_WHATSAPP_NUMBER = "595973477019"; // CLYN oficial

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productSlug: z.string(),
        variantId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
  contact: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
  }),
  shippingAddress: z.string().min(1),
});

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`checkout:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Demasiados pedidos seguidos. Intenta de nuevo en unos minutos." },
      { status: 429 }
    );
  }

  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }
  const { items, contact, shippingAddress } = parsed.data;

  const lineItems = items.map((item) => {
    const product = getProductBySlug(item.productSlug);
    if (!product) {
      throw new Error(`Producto no encontrado: ${item.productSlug}`);
    }
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant) {
      throw new Error(`Variante no encontrada: ${item.variantId}`);
    }
    return {
      productSlug: product.slug,
      variantId: variant.id,
      productName:
        product.variants.length > 1
          ? `${product.name} — ${variant.label}`
          : product.name,
      unitPrice: product.price,
      quantity: item.quantity,
    };
  });

  const subtotal = lineItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = SHIPPING_COST;
  const total = subtotal + shipping;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const admin = createAdminClient();

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      status: "pending",
      contact_name: contact.name,
      contact_email: contact.email,
      contact_phone: contact.phone,
      shipping_address: shippingAddress,
      subtotal,
      shipping,
      total,
      currency: "PYG",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "No se pudo crear el pedido." }, { status: 500 });
  }

  const { error: itemsError } = await admin.from("order_items").insert(
    lineItems.map((item) => ({
      order_id: order.id,
      product_slug: item.productSlug,
      variant_id: item.variantId,
      product_name: item.productName,
      unit_price: item.unitPrice,
      quantity: item.quantity,
    }))
  );

  if (itemsError) {
    return NextResponse.json({ error: "No se pudo crear el pedido." }, { status: 500 });
  }

  const messageLines = [
    `Nuevo pedido #${order.id.slice(0, 8)}`,
    "",
    ...lineItems.map((item) => `• ${item.productName} × ${item.quantity} — ${formatPrice(item.unitPrice * item.quantity)}`),
    "",
    `Envío: Envío gratis`,
    `Total: ${formatPrice(total)}`,
    "",
    `Nombre: ${contact.name}`,
    `Teléfono: ${contact.phone}`,
    `Email: ${contact.email}`,
    `Dirección de envío: ${shippingAddress}`,
  ];

  const whatsappUrl = `https://wa.me/${ORDERS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messageLines.join("\n")
  )}`;

  return NextResponse.json({ orderId: order.id, whatsappUrl });
}
