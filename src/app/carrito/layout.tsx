import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CarritoLayout({ children }: LayoutProps<"/carrito">) {
  return children;
}
