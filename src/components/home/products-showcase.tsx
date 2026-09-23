import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, getProductImage } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export function ProductsShowcase() {
  return (
    <section id="productos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary">
          Nuestros productos
        </h2>
        <p className="mt-3 text-muted-foreground">
          Dos productos, un mismo propósito: cuidar tu bienestar todos los días.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <Link key={product.slug} href={`/productos/${product.slug}`}>
            <Card className="group h-full overflow-hidden border-border/70 p-0 transition hover:shadow-lg">
              <div className="relative aspect-[4/3] bg-muted">
                <Badge className="absolute left-4 top-4 z-10 bg-accent text-accent-foreground">
                  {product.category}
                </Badge>
                <Image
                  src={getProductImage(product.slug)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="space-y-2 p-6">
                <p className="font-heading text-lg font-bold text-foreground">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">{product.tagline}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-accent">
                    Ver producto
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
