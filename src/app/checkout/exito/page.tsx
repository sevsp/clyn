import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";

export default async function CheckoutExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  const admin = createAdminClient();
  const { data: order } = orderId
    ? await admin
        .from("orders")
        .select("id, status, total, contact_email")
        .eq("id", orderId)
        .single()
    : { data: null };

  const status = order?.status ?? "unknown";

  const statusView = {
    paid: {
      icon: <CheckCircle2 className="size-12 text-emerald-500" />,
      title: "¡Pago confirmado!",
      description: "Te enviamos los detalles del pedido a tu correo.",
    },
    pending: {
      icon: <Clock className="size-12 text-amber-500" />,
      title: "¡Tu pedido fue enviado!",
      description:
        "Te contactaremos por WhatsApp para coordinar el pago y el envío.",
    },
    failed: {
      icon: <XCircle className="size-12 text-destructive" />,
      title: "El pago no se pudo confirmar",
      description: "Intenta nuevamente o contáctanos por WhatsApp.",
    },
    unknown: {
      icon: <Clock className="size-12 text-muted-foreground" />,
      title: "No encontramos el pedido",
      description: "Si acabas de pagar, escríbenos por WhatsApp con tu comprobante.",
    },
  }[status as "paid" | "pending" | "failed" | "unknown"];

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6">
      {statusView.icon}
      <h1 className="mt-4 font-heading text-2xl font-extrabold text-primary">
        {statusView.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{statusView.description}</p>

      {order && (
        <p className="mt-4 text-sm text-muted-foreground">
          Pedido #{order.id.slice(0, 8)} · {formatPrice(order.total)}
        </p>
      )}

      <Button
        render={<Link href="/" />}
        nativeButton={false}
        className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
      >
        Volver al inicio
      </Button>
    </div>
  );
}
