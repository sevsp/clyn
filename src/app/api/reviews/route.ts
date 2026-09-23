import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, isRateLimited, isSameOrigin } from "@/lib/api-security";

const reviewSchema = z.object({
  productSlug: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(1000),
});

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Iniciá sesión para dejar una reseña." }, { status: 401 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`review:${user.id}:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Demasiados intentos seguidos. Intenta de nuevo en unos minutos." },
      { status: 429 }
    );
  }

  const parsed = reviewSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }
  const { productSlug, rating, comment } = parsed.data;

  const admin = createAdminClient();

  const { count: purchaseCount } = await admin
    .from("order_items")
    .select("order_id, orders!inner(user_id, status)", { count: "exact", head: true })
    .eq("product_slug", productSlug)
    .eq("orders.user_id", user.id)
    .eq("orders.status", "paid");

  const authorName =
    (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "Cliente CLYN";

  const { error } = await admin.from("reviews").upsert(
    {
      product_slug: productSlug,
      user_id: user.id,
      author_name: authorName,
      rating,
      comment,
      verified_purchase: (purchaseCount ?? 0) > 0,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "product_slug,user_id" }
  );

  if (error) {
    return NextResponse.json({ error: "No se pudo guardar la reseña." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
