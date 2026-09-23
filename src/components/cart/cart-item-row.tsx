"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { getProductBySlug, getProductImage } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/product";

export function CartItemRow({ item }: { item: CartItem }) {
  const product = getProductBySlug(item.productSlug);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!product) return null;
  const variant = product.variants.find((v) => v.id === item.variantId);

  return (
    <div className="flex gap-4 py-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={getProductImage(product.slug)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">{product.name}</p>
            {variant && product.variants.length > 1 && (
              <p className="text-xs text-muted-foreground">{variant.label}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.productSlug, item.variantId)}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Quitar producto"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-border px-1.5 py-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={() =>
                setQuantity(item.productSlug, item.variantId, item.quantity - 1)
              }
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-4 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={() =>
                setQuantity(item.productSlug, item.variantId, item.quantity + 1)
              }
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <p className="text-sm font-semibold text-primary">
            {formatPrice(product.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
