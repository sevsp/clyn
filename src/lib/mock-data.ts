import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "lentes-antiluz",
    name: "Lentes Antiluz Azul CLYN",
    tagline: "Filtro naranja de alta protección contra la luz azul",
    category: "Lentes antiluz azul",
    price: 129900,
    compareAtPrice: 159900,
    description:
      "Nuestros lentes antiluz azul filtran hasta el 90% de la luz azul emitida por pantallas, reduciendo la fatiga visual y mejorando tu calidad de sueño. El filtro naranja está diseñado para uso nocturno frente a computadores, celulares y televisores.",
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
    variants: [{ id: "unico", label: "Único" }],
  },
  {
    slug: "bandas-nasales",
    name: "Bandas Nasales CLYN",
    tagline: "Respira mejor, duerme mejor",
    category: "Bandas nasales",
    price: 39900,
    compareAtPrice: 49900,
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
      { label: "Tamaño", value: "Talla única" },
      { label: "Uso", value: "Diario, hasta 12h" },
    ],
    variants: [{ id: "unico", label: "Único" }],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

const productImages: Record<string, string> = {
  "lentes-antiluz": "/images/productos/lentes-antiluz.jpg",
  "bandas-nasales": "/images/productos/bandas-nasales.jpg",
};

export function getProductImage(slug: string) {
  return productImages[slug];
}
