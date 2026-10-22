import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { PaymentBanner } from "@/components/layout/payment-banner";
import { Navbar } from "@/components/layout/navbar";
import { SplashScreen } from "@/components/layout/splash-screen";
import { LoginSuccess } from "@/components/auth/login-success";
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
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontHeading.variable} ${fontLogo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1468292868512574');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1468292868512574&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SplashScreen />
        <PaymentBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LoginSuccess />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
