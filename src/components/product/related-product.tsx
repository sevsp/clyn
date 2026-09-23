import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getProductImage } from "@/lib/mock-data";
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
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
            <Image
              src={getProductImage(product.slug)}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
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
