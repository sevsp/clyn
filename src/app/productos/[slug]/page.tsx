import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProduct } from "@/components/product/related-product";
import { products, getProductBySlug } from "@/lib/mock-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = products.find((p) => p.slug !== product.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      {related && <RelatedProduct product={related} />}
    </div>
  );
}
