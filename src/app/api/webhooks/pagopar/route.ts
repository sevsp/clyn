import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyWebhookToken, type PagoparWebhookPayload } from "@/lib/pagopar";

export async function POST(request: Request) {
  const payload = (await request.json()) as PagoparWebhookPayload;
  const result = payload?.resultado?.[0];

  if (!result?.hash_pedido || !result?.token) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!verifyWebhookToken(result.hash_pedido, result.token)) {
    return NextResponse.json({ error: "Firma inválida." }, { status: 401 });
  }

  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders")
    .select("id, status")
    .eq("pagopar_hash", result.hash_pedido)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Pedido no encontrado." }, { status: 404 });
  }

  // Idempotent: a status already settled (paid/failed) is never overwritten
  // by a retried notification.
  if (order.status === "pending") {
    await admin
      .from("orders")
      .update({
        status: result.pagado ? "paid" : "failed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);
  }

  return NextResponse.json(payload);
}
