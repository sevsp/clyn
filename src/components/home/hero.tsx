"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 10000;

const slides = [
  {
    product: getProductBySlug("lentes-antiluz")!,
    image: "/images/hero/lentes-modelo.jpg",
    badge: "Nuevo · Filtro naranja",
    heading: ["Cuida tu vista.", "Cuida tu descanso."],
    textPosition: "left" as const,
    theme: "dark" as const,
    overlay: true,
    fit: "contain" as const,
    align: "object-center" as const,
  },
  {
    product: getProductBySlug("bandas-nasales")!,
    image: "/images/hero/bandas-nasales.jpg",
    badge: "Respira mejor",
    heading: ["Respira mejor.", "Duerme mejor."],
    textPosition: "right" as const,
    theme: "light" as const,
    overlay: false,
    fit: "contain" as const,
    align: "object-center" as const,
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const goTo = (i: number) => {
    setIndex((i + slides.length) % slides.length);
    restartTimer();
  };

  return (
    <section className="group relative aspect-16/7 w-full min-h-80 overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.product.slug}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
            s.fit === "contain" && "bg-background"
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={s.product.name}
            fill
            priority={i === 0}
            className={cn(s.fit === "contain" ? "object-contain" : "object-cover", s.align)}
            sizes="100vw"
          />
          {s.overlay && (
            <>
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-r from-primary/90 via-primary/40 to-transparent",
                  s.textPosition === "right" &&
                    "bg-linear-to-l from-primary/90 via-primary/40 to-transparent"
                )}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-transparent" />
            </>
          )}

          <div
            className={cn(
              "relative mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6",
              s.textPosition === "right" && "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-md space-y-6",
                s.theme === "dark" ? "text-primary-foreground" : "text-primary"
              )}
            >
              <span
                className={cn(
                  "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent",
                  s.theme === "dark" ? "bg-accent/20" : "bg-accent/10"
                )}
              >
                {s.badge}
              </span>
              <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                {s.heading[0]}
                <br />
                {s.heading[1]}
              </h1>
              <p
                className={cn(
                  "max-w-sm",
                  s.theme === "dark" ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {s.product.tagline}. {s.product.description.split(". ")[0]}.
              </p>

              <Button
                size="lg"
                render={<Link href={`/productos/${s.product.slug}`} />}
                nativeButton={false}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Ver producto
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => goTo(index - 1)}
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-black/40 sm:left-6"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Siguiente slide"
        className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-black/40 sm:right-6"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur">
        {slides.map((s, i) => (
          <button
            key={s.product.slug}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-accent" : "w-2 bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
}
