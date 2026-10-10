"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 10000;

const slides: {
  id: string;
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
  image: string;
  mobileImage?: string;
  badge: string;
  heading: [string, string];
  copy?: string;
  showDesktopCopy?: boolean;
  textPosition: "left" | "right";
  theme: "dark" | "light";
  overlay: boolean;
  fit: "contain" | "cover";
  align: string;
}[] = [
  {
    id: "lentes-antiluz",
    product: getProductBySlug("lentes-antiluz")!,
    image: "/images/hero/lentes-modelo.jpg",
    mobileImage: "/images/hero/lentes-modelo-mobile.jpg",
    badge: "Nuevo · Filtro rojo",
    heading: ["Cuida tu vista.", "Cuida tu descanso."],
    textPosition: "left" as const,
    theme: "dark" as const,
    overlay: true,
    fit: "contain" as const,
    align: "object-center" as const,
  },
  {
    id: "bandas-nasales",
    product: getProductBySlug("bandas-nasales")!,
    image: "/images/hero/bandas-nasales.jpg",
    mobileImage: "/images/hero/bandas-nasales-mobile.jpg",
    badge: "Respira mejor",
    heading: ["Respira mejor.", "Duerme mejor."],
    textPosition: "right" as const,
    theme: "light" as const,
    overlay: false,
    fit: "contain" as const,
    align: "object-center" as const,
  },
  {
    id: "bandas-nasales-deporte-descanso",
    product: getProductBySlug("bandas-nasales")!,
    image: "/images/hero/bandas-nasales-deporte-v3.jpg",
    badge: "Para correr y dormir",
    heading: ["Corre con más aire.", "Duerme sin ronquidos."],
    copy: "Las tiras nasales CLYN abren tus fosas nasales para que rindas más al entrenar y descanses de corrido por la noche.",
    showDesktopCopy: false,
    textPosition: "left" as const,
    theme: "light" as const,
    overlay: false,
    fit: "contain" as const,
    align: "object-center" as const,
  },
];

const mobileSlides = slides.filter(
  (s): s is typeof s & { mobileImage: string } => Boolean(s.mobileImage)
);

const getSlideCount = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
    ? slides.length
    : mobileSlides.length;

export function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % getSlideCount());
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const goTo = (i: number) => {
    const count = getSlideCount();
    setIndex((i + count) % count);
    restartTimer();
  };

  const touchStartX = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const SWIPE_THRESHOLD = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    dragXRef.current = delta;
    setDragX(delta);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const delta = dragXRef.current;
    if (delta > SWIPE_THRESHOLD) {
      goTo(mIndex - 1);
    } else if (delta < -SWIPE_THRESHOLD) {
      goTo(mIndex + 1);
    }
    touchStartX.current = null;
    dragXRef.current = 0;
    setIsDragging(false);
    setDragX(0);
  };

  const mIndex = Math.min(index, mobileSlides.length - 1);
  const mCurrent = mobileSlides[mIndex];

  return (
    <>
      {/* Mobile: full-bleed photo, elevated product chips overlapping the fold,
          centered headline + dual CTA — the chips double as the slide switcher. */}
      <section className="md:hidden">
        <div
          className="relative aspect-3/4 w-full touch-pan-y overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={cn(
              "flex h-full",
              !isDragging && "transition-transform duration-500 ease-out"
            )}
            style={{
              width: `${mobileSlides.length * 100}%`,
              transform: `translateX(calc(${-mIndex * (100 / mobileSlides.length)}% + ${dragX}px))`,
            }}
          >
            {mobileSlides.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "relative h-full shrink-0 transition-opacity duration-500 ease-out",
                  i === mIndex ? "opacity-100" : "opacity-0"
                )}
                style={{ width: `${100 / mobileSlides.length}%` }}
              >
                <Image
                  src={s.mobileImage}
                  alt={s.product.name}
                  fill
                  priority={i === 0}
                  className="pointer-events-none object-cover object-center"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent" />
          <span className="pointer-events-none absolute left-4 top-4 inline-block rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
            {mCurrent.badge}
          </span>
        </div>

        <div className="mt-6 space-y-3 px-6 text-center">
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-primary">
            {mCurrent.heading[0]}
            <br />
            {mCurrent.heading[1]}
          </h1>
          <p className="mx-auto min-h-10 max-w-xs text-sm text-muted-foreground">
            {mCurrent.copy ?? `${mCurrent.product.tagline}.`}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              size="lg"
              render={<Link href={`/productos/${mCurrent.product.slug}`} />}
              nativeButton={false}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Ver producto
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/#productos" />}
              nativeButton={false}
            >
              Ver todos
            </Button>
          </div>

          <div className="flex justify-center gap-2 pt-1">
            {mobileSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === mIndex ? "w-6 bg-accent" : "w-2 bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop / tablet: full-bleed banner with overlaid copy — unchanged. */}
      <section className="group relative hidden aspect-16/7 w-full min-h-80 overflow-hidden md:block">
        {slides.map((s, i) => (
          <div
            key={s.id}
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

            {s.showDesktopCopy === false && (
              <>
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-primary/90 via-primary/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 px-6 text-center text-primary-foreground">
                  <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    {s.badge}
                  </span>
                  <h1 className="font-heading text-3xl font-extrabold leading-tight lg:text-4xl">
                    {s.heading[0]} {s.heading[1]}
                  </h1>
                  <Button
                    size="lg"
                    render={<Link href={`/productos/${s.product.slug}`} />}
                    nativeButton={false}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Ver producto
                  </Button>
                </div>
              </>
            )}

            <div
              className={cn(
                "relative mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6",
                s.textPosition === "right" && "justify-end",
                s.showDesktopCopy === false && "hidden"
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
                  {s.copy ?? `${s.product.tagline}. ${s.product.description.split(". ")[0]}.`}
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
              key={s.id}
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
    </>
  );
}
