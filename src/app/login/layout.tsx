import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: LayoutProps<"/login">) {
  return children;
}
