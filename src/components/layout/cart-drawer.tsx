"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCartStore } from "@/lib/cart-store";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const items = useCartStore((state) => state.items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : close())}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
              <ShoppingBag className="size-10 opacity-40" />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item) => (
                <CartItemRow key={`${item.productSlug}-${item.variantId}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border pt-4">
            <CartSummary />
            <Button
              render={<Link href="/carrito" onClick={close} />}
              nativeButton={false}
              variant="outline"
              className="w-full"
            >
              Ver carrito completo
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
