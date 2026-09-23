import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (productSlug: string, variantId: string, quantity?: number) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (productSlug, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productSlug === productSlug && item.variantId === variantId
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item === existing
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { productSlug, variantId, quantity }],
            isOpen: true,
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
    }),
    { name: "clyn-cart" }
  )
);
