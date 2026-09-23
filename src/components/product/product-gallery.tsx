import Image from "next/image";
import { getProductImage } from "@/lib/mock-data";
import type { Product } from "@/types/product";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-xl bg-muted">
      <Image
        src={getProductImage(product.slug)}
        alt={product.name}
        fill
        priority
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}
