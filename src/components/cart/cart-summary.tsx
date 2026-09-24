"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { getProductBySlug } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce((sum, item) => {
    const product = getProductBySlug(item.productSlug);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const total = subtotal;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Envío</span>
        <span>{subtotal > 0 ? "Envío gratis" : "—"}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-base font-semibold text-foreground">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button
        render={<Link href="/checkout" onClick={() => useCartStore.getState().close()} />}
        nativeButton={false}
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled={items.length === 0}
      >
        Ir a pagar
      </Button>
    </div>
  );
}
