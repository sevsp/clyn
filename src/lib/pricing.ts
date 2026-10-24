import { getProductBySlug, getVariantPrice } from "@/lib/mock-data";
import type { CartItem } from "@/types/product";

export const LENTES_SLUG = "lentes-antiluz";
export const TIRAS_SLUG = "bandas-nasales";

// Variantes de tiras que entran en la oferta (el combo no).
export const TIRAS_OFFER_VARIANTS = ["estandar", "premium"];
export const TIRAS_OFFER_PRICE = 90000;
export const LENTES_OFFER_PRICE = 140000;

export type LinePart = { unitPrice: number; quantity: number; offer: boolean };

// La oferta solo vale mientras el otro producto siga en el carrito.
function getOfferUnitPrice(item: CartItem, items: CartItem[]): number | null {
  if (!item.offer) return null;
  if (
    item.productSlug === TIRAS_SLUG &&
    TIRAS_OFFER_VARIANTS.includes(item.variantId) &&
    items.some((i) => i.productSlug === LENTES_SLUG)
  ) {
    return TIRAS_OFFER_PRICE;
  }
  if (item.productSlug === LENTES_SLUG && items.some((i) => i.productSlug === TIRAS_SLUG)) {
    return LENTES_OFFER_PRICE;
  }
  return null;
}

// La oferta aplica a 1 unidad; el resto de la línea va a precio normal.
export function getLineParts(item: CartItem, items: CartItem[]): LinePart[] {
  const product = getProductBySlug(item.productSlug);
  if (!product) return [];
  const regular = getVariantPrice(product, item.variantId);
  const offerPrice = getOfferUnitPrice(item, items);
  if (offerPrice === null) return [{ unitPrice: regular, quantity: item.quantity, offer: false }];

  const parts: LinePart[] = [{ unitPrice: offerPrice, quantity: 1, offer: true }];
  if (item.quantity > 1) {
    parts.push({ unitPrice: regular, quantity: item.quantity - 1, offer: false });
  }
  return parts;
}

export function getLineTotal(item: CartItem, items: CartItem[]) {
  return getLineParts(item, items).reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + getLineTotal(item, items), 0);
}

// Qué producto ofrecerle al cliente según lo que le falta.
export function getMissingOffer(items: CartItem[]): "tiras" | "lentes" | null {
  const hasLentes = items.some((i) => i.productSlug === LENTES_SLUG);
  const hasTiras = items.some((i) => i.productSlug === TIRAS_SLUG);
  if (hasLentes && !hasTiras) return "tiras";
  if (hasTiras && !hasLentes) return "lentes";
  return null;
}
