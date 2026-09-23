import { Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";

const trustPoints = [
  {
    icon: Truck,
    title: "Envío a todo el país",
    description: "Recibí tu pedido en la puerta de tu casa, sin complicaciones.",
  },
  {
    icon: RotateCcw,
    title: "Cambios sin vueltas",
    description: "Si no te queda como esperabas, te ayudamos con el cambio.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de calidad",
    description: "Materiales revisados antes de despachar cada pedido.",
  },
  {
    icon: Lock,
    title: "Pago 100% seguro",
    description: "Tus datos y tu compra siempre protegidos.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary">
          Comprá con confianza
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <point.icon className="size-6" />
              </div>
              <p className="font-heading font-semibold text-foreground">{point.title}</p>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
