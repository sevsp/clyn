import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/product";

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="descripcion" className="mt-16">
      <TabsList>
        <TabsTrigger value="descripcion">Descripción</TabsTrigger>
        <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
        <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
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
    </Tabs>
  );
}
