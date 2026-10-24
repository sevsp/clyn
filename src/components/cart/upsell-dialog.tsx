"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { getProductBySlug, getProductImage, getVariantPrice } from "@/lib/mock-data";
import {
  LENTES_OFFER_PRICE,
  LENTES_SLUG,
  TIRAS_OFFER_PRICE,
  TIRAS_OFFER_VARIANTS,
  TIRAS_SLUG,
  getMissingOffer,
} from "@/lib/pricing";
import { PIXEL_CURRENCY, trackPixel } from "@/lib/meta-pixel";
import { cn, formatPrice } from "@/lib/utils";

export function UpsellDialog() {
  const router = useRouter();
  const open = useCartStore((state) => state.upsellOpen);
  const items = useCartStore((state) => state.items);
  const closeUpsell = useCartStore((state) => state.closeUpsell);
  const addItem = useCartStore((state) => state.addItem);
  const [tirasVariant, setTirasVariant] = useState(TIRAS_OFFER_VARIANTS[0]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeUpsell();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeUpsell]);

  const missing = getMissingOffer(items);
  if (!open || !missing) return null;

  const isTiras = missing === "tiras";
  const product = getProductBySlug(isTiras ? TIRAS_SLUG : LENTES_SLUG);
  if (!product) return null;

  const variantId = isTiras ? tirasVariant : product.variants[0].id;
  const offerPrice = isTiras ? TIRAS_OFFER_PRICE : LENTES_OFFER_PRICE;
  const regularPrice = getVariantPrice(product, variantId);

  function goToCheckout() {
    closeUpsell();
    router.push("/checkout");
  }

  function handleAccept() {
    addItem(product!.slug, variantId, 1, true);
    trackPixel("AddToCart", {
      content_ids: [`${product!.slug}:${variantId}`],
      content_name: product!.name,
      content_type: "product",
      value: offerPrice,
      currency: PIXEL_CURRENCY,
    });
    goToCheckout();
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={closeUpsell}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-title"
    >
      <div
        className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeUpsell}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
          <Gift className="size-3.5" />
          Oferta especial
        </span>

        <h2 id="upsell-title" className="mt-3 pr-6 font-heading text-2xl font-extrabold text-primary">
          {isTiras
            ? `¡Llevate unas tiras nasales por solo ${formatPrice(offerPrice)}!`
            : `¡Llevate unos lentes antiluz por solo ${formatPrice(offerPrice)}!`}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isTiras
            ? "Por llevar tus lentes, agregá unas tiras nasales a precio especial. Elegí el diseño:"
            : "Por llevar tus tiras nasales, agregá unos lentes antiluz a precio especial."}
        </p>

        {isTiras ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {TIRAS_OFFER_VARIANTS.map((id) => {
              const variant = product.variants.find((v) => v.id === id);
              const selected = id === tirasVariant;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTirasVariant(id)}
                  aria-pressed={selected}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border-2 text-left transition",
                    selected ? "border-accent" : "border-border hover:border-accent/50"
                  )}
                >
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={getProductImage(product.slug, id)}
                      alt={variant?.label ?? id}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <p className="px-3 py-2 text-sm font-semibold text-foreground">
                    {variant?.label}
                  </p>
                  {selected && (
                    <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-border p-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={getProductImage(product.slug, variantId)}
                alt={product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <p className="text-sm font-semibold text-foreground">{product.name}</p>
          </div>
        )}

        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-primary">{formatPrice(offerPrice)}</span>
          <span className="text-muted-foreground line-through">{formatPrice(regularPrice)}</span>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Button
            size="lg"
            onClick={handleAccept}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Sí, agregar y pagar
          </Button>
          <Button size="lg" variant="ghost" onClick={goToCheckout} className="w-full">
            No, gracias, ir a pagar
          </Button>
        </div>
      </div>
    </div>
  );
}
