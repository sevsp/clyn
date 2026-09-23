import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RegistroLayout({ children }: LayoutProps<"/registro">) {
  return children;
}
