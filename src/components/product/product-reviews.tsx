"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Star, BadgeCheck } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1} estrellas`}
            onClick={() => onChange(i + 1)}
            className="p-0.5"
          >
            <Star
              className={cn(
                "size-6",
                filled ? "fill-accent text-accent" : "fill-none text-muted-foreground/40"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export function ProductReviews({
  productSlug,
  initialReviews,
}: {
  productSlug: string;
  initialReviews: Review[];
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user)).catch(() => {});
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Elegí una calificación.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, rating, comment }),
      });
      const json = await response.json();
      if (!response.ok) {
        toast.error(json.error ?? "No se pudo guardar la reseña.");
        return;
      }
      toast.success("¡Gracias por tu reseña!");
      setReviews((prev) => {
        const authorName =
          (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "Vos";
        const withoutMine = prev.filter((r) => r.author_name !== authorName);
        return [
          {
            id: "temp",
            author_name: authorName,
            rating,
            comment,
            verified_purchase: false,
            created_at: new Date().toISOString(),
          },
          ...withoutMine,
        ];
      });
      setRating(0);
      setComment("");
    } catch {
      toast.error("No se pudo guardar la reseña. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-border p-4">
          <p className="text-sm font-medium text-foreground">Dejá tu reseña</p>
          <StarPicker value={rating} onChange={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Contanos qué te pareció el producto"
            rows={3}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {submitting ? "Enviando..." : "Publicar reseña"}
          </Button>
        </form>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-border p-4">
          <p className="text-sm text-muted-foreground">
            Iniciá sesión para dejar tu reseña.
          </p>
          <Button
            render={<Link href={`/login?redirect=${encodeURIComponent(pathname)}`} />}
            nativeButton={false}
            variant="outline"
          >
            Iniciar sesión
          </Button>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Todavía no hay reseñas para este producto. ¡Sé el primero en opinar!
        </p>
      ) : (
        <ul className="space-y-5">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-border pb-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{review.author_name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString("es-PY")}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-3.5",
                        i < review.rating ? "fill-current" : "fill-none text-muted-foreground/40"
                      )}
                    />
                  ))}
                </div>
                {review.verified_purchase && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <BadgeCheck className="size-3.5" />
                    Compra verificada
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
