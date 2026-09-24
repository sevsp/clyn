import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "lentes-antiluz",
    name: "Lentes Antiluz Azul CLYN",
    tagline: "Filtro rojo de alta protección contra la luz azul",
    category: "Lentes antiluz azul",
    price: 149000,
    compareAtPrice: 159900,
    description:
      "Nuestros lentes antiluz azul filtran hasta el 99.7% de la luz azul emitida por pantallas, reduciendo la fatiga visual y mejorando tu calidad de sueño. El filtro rojo está diseñado para uso nocturno frente a computadores, celulares y televisores.",
    benefits: [
      "Bloquea hasta 99.7% de la luz azul",
      "Reduce la fatiga visual digital",
      "Mejora la calidad del sueño",
      "Montura ultraliviana, cómoda todo el día",
    ],
    specs: [
      { label: "Filtro", value: "Rojo, corte 450nm" },
      { label: "Material lente", value: "TR90" },
      { label: "Peso", value: "22 g" },
      { label: "Protección UV", value: "UV400" },
    ],
    variants: [{ id: "unico", label: "Único" }],
  },
  {
    slug: "bandas-nasales",
    name: "Tiras Nasales CLYN",
    tagline: "Respira mejor, entrená mejor, duerme mejor",
    category: "Tiras nasales",
    price: 39900,
    compareAtPrice: 49900,
    description:
      "Las tiras nasales CLYN abren suavemente tus fosas nasales para mejorar el flujo de aire, reduciendo el ronquido y facilitando la respiración durante el ejercicio o el sueño. Ideales para entrenar con más resistencia y descansar mejor por la noche. Hipoalergénicas y de uso diario.",
    benefits: [
      "Mejora el flujo de aire nasal durante el ejercicio",
      "Reduce el ronquido y mejora la calidad del sueño",
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
