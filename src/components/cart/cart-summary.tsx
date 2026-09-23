"use client";

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
  const shipping = subtotal > 0 ? 12000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Envío</span>
        <span>{shipping > 0 ? formatPrice(shipping) : "—"}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-base font-semibold text-foreground">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        disabled={items.length === 0}
      >
        Ir a pagar
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Checkout disponible próximamente.
      </p>
    </div>
  );
}
