import { ProductArt } from "@/components/product/product-art";
import type { Product } from "@/types/product";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-muted p-14">
      <div className="absolute inset-10 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative w-full">
        <ProductArt variant={product.art} />
      </div>
    </div>
  );
}
