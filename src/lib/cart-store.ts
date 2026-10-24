import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  upsellOpen: boolean;
  addItem: (
    productSlug: string,
    variantId: string,
    quantity?: number,
    offer?: boolean
  ) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  openUpsell: () => void;
  closeUpsell: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      upsellOpen: false,
      addItem: (productSlug, variantId, quantity = 1, offer = false) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productSlug === productSlug && item.variantId === variantId
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item === existing
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      ...(item.offer || offer ? { offer: true } : {}),
                    }
                  : item
              ),
              isOpen: !offer,
            };
          }
          return {
            items: [
              ...state.items,
              { productSlug, variantId, quantity, ...(offer ? { offer } : {}) },
            ],
            isOpen: !offer,
          };
        }),
      removeItem: (productSlug, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productSlug === productSlug && item.variantId === variantId)
          ),
        })),
      setQuantity: (productSlug, variantId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productSlug === productSlug && item.variantId === variantId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      openUpsell: () => set({ isOpen: false, upsellOpen: true }),
      closeUpsell: () => set({ upsellOpen: false }),
    }),
    { name: "clyn-cart", partialize: (state) => ({ items: state.items }) }
  )
);
