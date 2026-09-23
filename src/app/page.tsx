import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { AboutSection } from "@/components/home/about-section";
import { ProductsShowcase } from "@/components/home/products-showcase";
import { TrustSection } from "@/components/home/trust-section";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AboutSection />
      <ProductsShowcase />
      <TrustSection />
      <Newsletter />
    </>
  );
}
