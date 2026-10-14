"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductGalleryImages } from "@/lib/mock-data";
import type { Product } from "@/types/product";

export function ProductGallery({
  product,
  variantId,
}: {
  product: Product;
  variantId?: string;
}) {
  const images = getProductGalleryImages(product.slug, variantId);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // Volver a la primera foto al cambiar de variante
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    setIndex(0);
  }, [variantId]);

  const multiple = images.length > 1;

  return (
    <div className="min-w-0 space-y-3">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-xl bg-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] w-full shrink-0 snap-center"
            >
              <Image
                src={src}
                alt={`${product.name} - foto ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>

        {multiple && (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => goTo(Math.max(index - 1, 0))}
              disabled={index === 0}
              className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur transition disabled:opacity-0"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => goTo(Math.min(index + 1, images.length - 1))}
              disabled={index === images.length - 1}
              className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur transition disabled:opacity-0"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {multiple && (
        <div className="flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Ir a la foto ${i + 1}`}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full transition ${
                i === index ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
