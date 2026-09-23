"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";

type VariantSelectorProps = {
  variants: ProductVariant[];
  value: string;
  onChange: (id: string) => void;
};

export function VariantSelector({ variants, value, onChange }: VariantSelectorProps) {
  const hasColors = variants.some((v) => v.colorHex);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">
        {hasColors ? "Color de montura" : "Tamaño"}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) =>
          hasColors ? (
            <button
              key={variant.id}
              onClick={() => onChange(variant.id)}
              aria-label={variant.label}
              className={cn(
                "size-9 rounded-full border-2 transition",
                value === variant.id ? "border-accent" : "border-transparent"
              )}
            >
              <span
                className="block size-full rounded-full ring-1 ring-border"
                style={{ backgroundColor: variant.colorHex }}
              />
            </button>
          ) : (
            <button
              key={variant.id}
              onClick={() => onChange(variant.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                value === variant.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground/80 hover:border-primary/40"
              )}
            >
              {variant.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
