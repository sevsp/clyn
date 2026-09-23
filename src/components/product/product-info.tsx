"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VariantSelector } from "@/components/product/variant-selector";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductInfo({
  product,
  average,
  count,
}: {
  product: Product;
  average: number;
  count: number;
}) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-w-0 space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">{product.category}</p>
        <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{product.tagline}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < Math.round(average)
                  ? "size-4 fill-current"
                  : "size-4 fill-none text-muted-foreground/40"
              }
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {count > 0
            ? `${average.toFixed(1)} (${count} reseña${count === 1 ? "" : "s"})`
            : "Sé el primero en opinar"}
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {product.variants.length > 1 && (
        <VariantSelector
          variants={product.variants}
          value={variantId}
          onChange={setVariantId}
        />
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Cantidad</p>
        <div className="flex w-fit items-center gap-3 rounded-full border border-border px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="size-3.5" />
          </Button>
          <span className="w-5 text-center text-sm">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
        onClick={() => {
          addItem(product.slug, variantId, quantity);
          toast.success(`${product.name} agregado al carrito`);
        }}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}
