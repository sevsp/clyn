"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import type { Product } from "@/types/product";

export function ProductMain({
  product,
  average,
  count,
}: {
  product: Product;
  average: number;
  count: number;
}) {
  const [variantId, setVariantId] = useState(product.variants[0].id);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <ProductGallery product={product} variantId={variantId} />
      <ProductInfo
        product={product}
        average={average}
        count={count}
        variantId={variantId}
        onVariantChange={setVariantId}
      />
    </div>
  );
}
