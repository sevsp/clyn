"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { getProductBySlug } from "@/lib/mock-data";
import { formatPrice, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const SHIPPING_COST = 12000;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(({ data }) => {
        const user = data.user;
        if (user) {
          setForm((prev) => ({
            ...prev,
            name: (user.user_metadata?.full_name as string) ?? prev.name,
            email: user.email ?? prev.email,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const subtotal = items.reduce((sum, item) => {
    const product = getProductBySlug(item.productSlug);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const total = items.length > 0 ? subtotal + SHIPPING_COST : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productSlug: item.productSlug,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          contact: { name: form.name, email: form.email, phone: form.phone },
          shippingAddress: form.address,
        }),
      });
      const json = await response.json();

      if (!response.ok) {
        toast.error(json.error ?? "No se pudo enviar el pedido.");
        setSubmitting(false);
        return;
      }

      useCartStore.getState().clear();
      window.open(json.whatsappUrl, "_blank", "noopener,noreferrer");
      router.push(`/checkout/exito?order=${json.orderId}`);
    } catch {
      toast.error("No se pudo enviar el pedido. Intenta de nuevo.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <p className="text-muted-foreground">Tu carrito está vacío.</p>
        <Button
          className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => router.push("/#productos")}
        >
          Ver productos
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-primary">Pagar</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              required
              placeholder="0991 234 567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Dirección de envío</Label>
            <Input
              id="address"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className={cn(
              "w-full bg-accent text-accent-foreground hover:bg-accent/90",
              submitting && "opacity-70"
            )}
          >
            {submitting ? "Enviando pedido..." : "Enviar pedido por WhatsApp"}
          </Button>
        </form>

        <div className="h-fit rounded-2xl border border-border p-5">
          <h2 className="mb-4 font-heading font-semibold text-foreground">
            Resumen del pedido
          </h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => {
              const product = getProductBySlug(item.productSlug);
              if (!product) return null;
              return (
                <div
                  key={`${item.productSlug}-${item.variantId}`}
                  className="flex justify-between text-muted-foreground"
                >
                  <span>
                    {product.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(product.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Envío</span>
            <span>{formatPrice(SHIPPING_COST)}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between text-base font-semibold text-foreground">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
