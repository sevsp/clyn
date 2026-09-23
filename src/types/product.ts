export type ProductVariant = {
  id: string;
  label: string;
  colorHex?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  benefits: string[];
  specs: ProductSpec[];
  variants: ProductVariant[];
  art: "glasses" | "nasal-band";
};

export type CartItem = {
  productSlug: string;
  variantId: string;
  quantity: number;
};
