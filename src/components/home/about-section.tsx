import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/product/product-art";

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-muted/50 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div className="relative order-2 flex aspect-square items-center justify-center rounded-3xl bg-white p-12 shadow-sm md:order-1">
          <ProductArt variant="nasal-band" />
        </div>

        <div className="order-1 space-y-5 md:order-2">
          <h2 className="font-heading text-3xl font-extrabold text-primary">
            Sobre CLYN
          </h2>
          <p className="text-muted-foreground">
            Nacimos con una idea simple: el cuidado personal no tiene que ser
            complicado. Empezamos con dos problemas que enfrentamos todos los
            días — el cansancio visual por las pantallas y la dificultad para
            respirar bien al dormir o entrenar — y buscamos productos
            honestos, probados y fáciles de incorporar a tu rutina.
          </p>
          <p className="text-muted-foreground">
            Cada lente y cada banda nasal pasa por nuestro control de calidad,
            priorizando materiales buenos y comodidad diaria, sin vueltas
            innecesarias.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              render={<Link href="/productos/lentes-antiluz" />}
              nativeButton={false}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Comprar ahora
            </Button>
            <Button
              render={<Link href="/#ciencia" />}
              nativeButton={false}
              variant="outline"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
