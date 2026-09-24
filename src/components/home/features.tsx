import { Eye, Wind, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Bloquea la luz azul",
    description:
      "El filtro rojo corta hasta el 99.7% de la luz azul de tus pantallas para cuidar tu vista.",
  },
  {
    icon: Wind,
    title: "Mejora tu respiración",
    description:
      "Las tiras nasales abren tus vías respiratorias para que respires con más facilidad, ya sea entrenando o durmiendo.",
  },
  {
    icon: ShieldCheck,
    title: "Diseño cómodo",
    description:
      "Materiales livianos e hipoalergénicos pensados para usarse todo el día, sin molestias.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
      <h2 className="font-heading text-3xl font-extrabold text-primary">
        ¿Por qué CLYN?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Seleccionamos productos simples y efectivos para cuidar dos cosas que
        usamos todos los días: tus ojos y tu respiración.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <feature.icon className="size-6" />
            </div>
            <p className="font-heading font-semibold text-foreground">
              {feature.title}
            </p>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
