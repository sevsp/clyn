import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "lentes-antiluz",
    name: "Lentes Antiluz CLYN",
    tagline: "Filtro naranja de alta protección contra la luz azul",
    category: "Lentes antiluz",
    price: 129900,
    compareAtPrice: 159900,
    rating: 4.8,
    reviewCount: 342,
    description:
      "Nuestros lentes antiluz filtran hasta el 90% de la luz azul emitida por pantallas, reduciendo la fatiga visual y mejorando tu calidad de sueño. El filtro naranja está diseñado para uso nocturno frente a computadores, celulares y televisores.",
    benefits: [
      "Bloquea hasta 90% de la luz azul",
      "Reduce la fatiga visual digital",
      "Mejora la calidad del sueño",
      "Montura ultraliviana, cómoda todo el día",
    ],
    specs: [
      { label: "Filtro", value: "Naranja, corte 450nm" },
      { label: "Material montura", value: "Acetato liviano" },
      { label: "Peso", value: "22 g" },
      { label: "Protección UV", value: "UV400" },
    ],
    variants: [
      { id: "navy", label: "Azul marino", colorHex: "#16324F" },
      { id: "black", label: "Negro mate", colorHex: "#1B2430" },
      { id: "tortoise", label: "Carey", colorHex: "#6B4A2E" },
    ],
    art: "glasses",
  },
  {
    slug: "bandas-nasales",
    name: "Bandas Nasales CLYN",
    tagline: "Respira mejor, duerme mejor",
    category: "Bandas nasales",
    price: 39900,
    compareAtPrice: 49900,
    rating: 4.6,
    reviewCount: 218,
    description:
      "Las bandas nasales CLYN abren suavemente tus fosas nasales para mejorar el flujo de aire, reduciendo el ronquido y facilitando la respiración durante el ejercicio o el sueño. Hipoalergénicas y de uso diario.",
    benefits: [
      "Mejora el flujo de aire nasal",
      "Reduce el ronquido",
      "Hipoalergénicas, sin fragancias",
      "Ideales para deporte y descanso",
    ],
    specs: [
      { label: "Presentación", value: "Caja x 30 unidades" },
      { label: "Material", value: "Fibra hipoalergénica" },
      { label: "Tamaño", value: "Regular / Grande" },
      { label: "Uso", value: "Diario, hasta 12h" },
    ],
    variants: [
      { id: "regular", label: "Regular" },
      { id: "large", label: "Grande" },
    ],
    art: "nasal-band",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
