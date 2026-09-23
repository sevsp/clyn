import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductReviews } from "@/components/product/product-reviews";
import type { Product } from "@/types/product";
import type { Review } from "@/lib/reviews";

export function ProductTabs({
  product,
  reviews,
}: {
  product: Product;
  reviews: Review[];
}) {
  return (
    <Tabs defaultValue="descripcion" className="mt-16 gap-5 sm:gap-4">
      <TabsList className="grid! h-auto! w-full grid-cols-2 gap-1 sm:inline-flex! sm:h-8! sm:w-fit sm:gap-0">
        <TabsTrigger className="h-9! sm:h-[calc(100%-1px)]!" value="descripcion">Descripción</TabsTrigger>
        <TabsTrigger className="h-9! sm:h-[calc(100%-1px)]!" value="beneficios">Beneficios</TabsTrigger>
        <TabsTrigger className="h-9! sm:h-[calc(100%-1px)]!" value="especificaciones">Especificaciones</TabsTrigger>
        <TabsTrigger className="h-9! sm:h-[calc(100%-1px)]!" value="resenas">Reseñas ({reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="descripcion" className="max-w-2xl text-muted-foreground">
        {product.description}
      </TabsContent>

      <TabsContent value="beneficios">
        <ul className="grid max-w-2xl gap-3 sm:grid-cols-2">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/80">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              {benefit}
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="especificaciones">
        <dl className="grid max-w-2xl gap-3 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between border-b border-border py-2 text-sm"
            >
              <dt className="text-muted-foreground">{spec.label}</dt>
              <dd className="font-medium text-foreground">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="resenas">
        <ProductReviews productSlug={product.slug} initialReviews={reviews} />
      </TabsContent>
    </Tabs>
  );
}
