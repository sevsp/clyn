import { createClient } from "@/lib/supabase/server";

export type Review = {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
};

export type ReviewsData = {
  reviews: Review[];
  average: number;
  count: number;
};

export async function getProductReviews(productSlug: string): Promise<ReviewsData> {
  let data: Review[] | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("reviews")
      .select("id, author_name, rating, comment, verified_purchase, created_at")
      .eq("product_slug", productSlug)
      .order("created_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(2500));
    data = result.data;
  } catch {
    // Reviews are optional: if Supabase is slow or unreachable, show the
    // product without them instead of blocking the page.
  }

  const reviews = data ?? [];
  const count = reviews.length;
  const average =
    count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return { reviews, average, count };
}
