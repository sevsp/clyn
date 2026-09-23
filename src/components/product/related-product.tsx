import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProductArt } from "@/components/product/product-art";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function RelatedProduct({ product }: { product: Product }) {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="font-heading text-2xl font-bold text-primary">
        También te puede interesar
      </h2>
      <Link href={`/productos/${product.slug}`} className="mt-6 block max-w-sm">
        <Card className="group flex flex-row items-center gap-4 overflow-hidden border-border/70 p-4 transition hover:shadow-md">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-muted p-3">
            <ProductArt variant={product.art} />
          </div>
          <div className="flex-1">
            <p className="font-heading font-semibold text-foreground">
              {product.name}
            </p>
            <p className="text-sm font-medium text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <ArrowRight className="size-4 text-accent transition group-hover:translate-x-1" />
        </Card>
      </Link>
    </div>
  );
}
