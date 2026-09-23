import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = {
  pending: "Pendiente de pago",
  paid: "Pagado",
  failed: "Pago fallido",
  cancelled: "Cancelado",
};

export default async function CuentaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/cuenta");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, total, currency, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-primary">
            Mi cuenta
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="outline">
            Cerrar sesión
          </Button>
        </form>
      </div>

      <h2 className="mt-10 mb-4 font-heading font-semibold text-foreground">
        Mis pedidos
      </h2>

      {!orders || orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Todavía no tienes pedidos.
        </p>
      ) : (
        <div className="divide-y divide-border rounded-2xl border border-border">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-foreground">
                  Pedido #{order.id.slice(0, 8)}
                </p>
                <p className="text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("es-PY")} ·{" "}
                  {statusLabel[order.status] ?? order.status}
                </p>
              </div>
              <p className="font-semibold text-foreground">
                {formatPrice(order.total)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
