"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-primary">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <ShoppingBag className="size-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">Tu carrito está vacío.</p>
          <Button
            render={<Link href="/#productos" />}
            nativeButton={false}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Ver productos
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
          <div className="divide-y divide-border rounded-2xl border border-border px-4">
            {items.map((item) => (
              <CartItemRow key={`${item.productSlug}-${item.variantId}`} item={item} />
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-border p-5">
            <h2 className="mb-4 font-heading font-semibold text-foreground">
              Resumen del pedido
            </h2>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
