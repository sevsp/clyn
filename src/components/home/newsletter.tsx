"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-8 rounded-3xl bg-primary px-8 py-12 text-primary-foreground sm:px-12 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="mt-2 text-primary-foreground/70">
            Recibe novedades, tips de cuidado personal y descuentos exclusivos.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("¡Gracias por suscribirte!");
            e.currentTarget.reset();
          }}
        >
          <Input
            type="email"
            required
            placeholder="Ingresa tu correo"
            className="border-0 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Suscribirme
          </Button>
        </form>
      </div>
    </section>
  );
}
