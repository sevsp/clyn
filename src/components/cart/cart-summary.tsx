"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { getCartSubtotal, getMissingOffer } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);

  const subtotal = getCartSubtotal(items);
  const total = subtotal;

  function handleCheckout() {
    if (items.length === 0) return;
    const { close, openUpsell } = useCartStore.getState();
    if (getMissingOffer(items)) {
      openUpsell();
      return;
    }
    close();
    router.push("/checkout");
  }

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
        size="lg"
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        Ir a pagar
      </Button>
    </div>
  );
}
