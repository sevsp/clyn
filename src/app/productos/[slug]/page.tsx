import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProduct } from "@/components/product/related-product";
import { products, getProductBySlug, getProductImage } from "@/lib/mock-data";
import { getProductReviews } from "@/lib/reviews";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} en Paraguay`;
  const description = `${product.tagline}. Envíos a todo Paraguay, coordinás la compra por WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      title,
      description,
      images: [getProductImage(product.slug)],
    },
  };
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { reviews, average, count } = await getProductReviews(product.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${getProductImage(product.slug)}`,
    brand: { "@type": "Brand", name: "CLYN" },
    ...(count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: average,
        reviewCount: count,
      },
    }),
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/productos/${product.slug}`,
      priceCurrency: "PYG",
      price: product.price,
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "Country", name: "Paraguay" },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery product={product} />
        <ProductInfo product={product} average={average} count={count} />
      </div>

      <ProductTabs product={product} reviews={reviews} />

      {related && <RelatedProduct product={related} />}
    </div>
  );
}
