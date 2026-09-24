import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const fontLogo = Poppins({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["200"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CLYN Paraguay — Lentes antiluz azul y tiras nasales",
    template: "%s | CLYN Paraguay",
  },
  description:
    "CLYN vende en Paraguay lentes antiluz azul con filtro rojo y tiras nasales para respirar mejor. Envíos a todo el país, pagás y coordinás por WhatsApp.",
  keywords: [
    "lentes antiluz azul Paraguay",
    "lentes antiluz azul",
    "tiras nasales Paraguay",
    "filtro luz azul Paraguay",
    "lentes filtro rojo Paraguay",
    "CLYN",
    "cuidado personal Paraguay",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PY",
    siteName: "CLYN",
    title: "CLYN Paraguay — Lentes antiluz azul y tiras nasales",
    description:
      "Lentes antiluz azul con filtro rojo y tiras nasales para respirar mejor. Envíos a todo Paraguay.",
    url: siteUrl,
    images: [
      {
        url: "/images/hero/lentes-modelo.jpg",
        width: 2400,
        height: 1050,
        alt: "Lentes Antiluz Azul CLYN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLYN Paraguay — Lentes antiluz azul y tiras nasales",
    description:
      "Lentes antiluz azul con filtro rojo y tiras nasales para respirar mejor. Envíos a todo Paraguay.",
    images: ["/images/hero/lentes-modelo.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CLYN",
  url: siteUrl,
  logo: `${siteUrl}/images/brand/clyn-logo.jpg`,
  sameAs: ["https://www.instagram.com/clynpy"],
  areaServed: {
    "@type": "Country",
    name: "Paraguay",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontLogo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
