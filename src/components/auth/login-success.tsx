"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, HandCoins, Package, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const AUTO_CLOSE_MS = 8000;

const perks = [
  { icon: Star, label: "Dejá reseñas" },
  { icon: Package, label: "Seguí tus pedidos" },
  { icon: HandCoins, label: "Pagás al recibir" },
];

const confettiColors = ["#f97316", "#10b981", "#fbbf24", "#fb7185", "#38bdf8", "#a78bfa"];

// Posiciones fijas (sin Math.random) para que el estallido sea siempre parejo.
const confetti = Array.from({ length: 28 }).map((_, i) => {
  const angle = (i / 28) * Math.PI * 2 + (i % 2) * 0.2;
  const distance = 110 + (i % 5) * 28;
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance) - 20,
    r: (i * 67) % 360,
    color: confettiColors[i % confettiColors.length],
    delay: (i % 6) * 40,
    round: i % 3 === 0,
  };
});

type Profile = { name: string | null; email: string | null; avatar: string | null };

function LoginSuccessDialog() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>({ name: null, email: null, avatar: null });
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    if (searchParams.get("login") !== "success") return;

    // Quita el parámetro para que no reaparezca al recargar.
    const url = new URL(window.location.href);
    url.searchParams.delete("login");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);

    setOpen(true);
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        const meta = data.user?.user_metadata ?? {};
        const fullName = (meta.full_name ?? meta.name) as string | undefined;
        const email = data.user?.email ?? null;
        setProfile({
          name: (fullName ?? email ?? "").split(" ")[0] || null,
          email,
          avatar: (meta.avatar_url ?? meta.picture ?? null) as string | null,
        });
      })
      .catch(() => {});
  }, [searchParams]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const initial = (profile.name ?? "C").charAt(0).toUpperCase();
  const showAvatar = profile.avatar && !avatarFailed;

  return (
    <div
      className="ls-fade fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-success-title"
    >
      {/* Borde degradado */}
      <div
        className="ls-pop relative w-full max-w-md overflow-hidden rounded-[2rem] bg-linear-to-br from-accent via-white/80 to-emerald-400 p-px shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-background px-6 pb-9 pt-12 text-center sm:px-10">
          {/* Resplandores de fondo */}
          <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 size-56 rounded-full bg-emerald-400/20 blur-3xl" />

          {/* Avatar + confeti */}
          <div className="relative mx-auto flex size-28 items-center justify-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
              {confetti.map((c, i) => (
                <span
                  key={i}
                  className="ls-burst absolute block"
                  style={
                    {
                      "--x": `${c.x}px`,
                      "--y": `${c.y}px`,
                      "--r": `${c.r}deg`,
                      width: c.round ? 8 : 6,
                      height: c.round ? 8 : 12,
                      borderRadius: c.round ? "9999px" : 2,
                      background: c.color,
                      animationDelay: `${300 + c.delay}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <span className="ls-ring absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#f97316,#fbbf24,#10b981,#f97316)]" />
            <span className="absolute inset-[3px] rounded-full bg-background" />
            <span className="ls-pulse absolute inset-0 rounded-full ring-8 ring-emerald-500/15" />

            <div className="relative size-[88px] overflow-hidden rounded-full bg-linear-to-br from-accent to-orange-400 shadow-lg">
              {showAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar!}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="size-full object-cover"
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <span className="flex size-full items-center justify-center font-heading text-4xl font-extrabold text-white">
                  {initial}
                </span>
              )}
            </div>

            {/* Check */}
            <span className="ls-check-badge absolute -bottom-1 -right-1 flex size-10 items-center justify-center rounded-full border-4 border-background bg-emerald-500 shadow-lg shadow-emerald-500/40">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path className="ls-draw" d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
          </div>

          {/* Texto */}
          <div className="ls-rise relative mt-7" style={{ animationDelay: "250ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Sesión iniciada
            </span>
          </div>

          <h2
            id="login-success-title"
            className="ls-rise relative mt-4 font-heading text-4xl font-extrabold tracking-tight text-primary"
            style={{ animationDelay: "350ms" }}
          >
            {profile.name ? `¡Hola, ${profile.name}!` : "¡Hola!"}
          </h2>
          <p className="ls-rise relative mt-2 text-sm text-muted-foreground" style={{ animationDelay: "450ms" }}>
            {profile.email ?? "Ya sos parte de CLYN"}
          </p>

          {/* Beneficios */}
          <div
            className="ls-rise relative mt-7 flex flex-wrap items-center justify-center gap-2"
            style={{ animationDelay: "550ms" }}
          >
            {perks.map((perk) => (
              <span
                key={perk.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground"
              >
                <perk.icon className="size-3.5 text-accent" />
                {perk.label}
              </span>
            ))}
          </div>

          {/* Acciones */}
          <div className="ls-rise relative mt-8 flex flex-col gap-3" style={{ animationDelay: "650ms" }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40"
            >
              Seguir comprando
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/cuenta"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
            >
              Ir a mi cuenta
            </Link>
          </div>

          {/* Barra de cierre automático */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-muted">
            <div
              className="h-full origin-left bg-linear-to-r from-accent to-emerald-400"
              style={{ animation: `ls-bar ${AUTO_CLOSE_MS}ms linear forwards` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .ls-fade { animation: ls-fade .25s ease-out both; }
        .ls-pop { animation: ls-pop .55s cubic-bezier(.2,1.2,.3,1) both; }
        .ls-rise { opacity: 0; animation: ls-rise .6s cubic-bezier(.2,.8,.2,1) forwards; }
        .ls-ring { animation: ls-spin 6s linear infinite; }
        .ls-pulse { animation: ls-pulse 2.4s ease-in-out infinite; }
        .ls-check-badge { animation: ls-badge .5s cubic-bezier(.2,1.6,.4,1) .35s both; }
        .ls-draw { stroke-dasharray: 24; stroke-dashoffset: 24; animation: ls-draw .45s ease-out .75s forwards; }
        .ls-burst { opacity: 0; animation: ls-burst 1.3s cubic-bezier(.1,.7,.3,1) forwards; }
        @keyframes ls-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ls-pop { from { opacity: 0; transform: translateY(24px) scale(.9); } to { opacity: 1; transform: none; } }
        @keyframes ls-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes ls-spin { to { transform: rotate(360deg); } }
        @keyframes ls-pulse { 0%,100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.12); opacity: .3; } }
        @keyframes ls-badge { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes ls-draw { to { stroke-dashoffset: 0; } }
        @keyframes ls-burst {
          0% { opacity: 1; transform: translate(0,0) rotate(0) scale(.4); }
          70% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--x), calc(var(--y) + 70px)) rotate(var(--r)) scale(1); }
        }
        @keyframes ls-bar { from { transform: scaleX(1); } to { transform: scaleX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .ls-ring, .ls-pulse, .ls-burst { animation: none; }
          .ls-burst { display: none; }
          .ls-rise, .ls-pop, .ls-check-badge { animation-duration: .01ms; animation-delay: 0ms; }
        }
      `}</style>
    </div>
  );
}

export function LoginSuccess() {
  return (
    <Suspense fallback={null}>
      <LoginSuccessDialog />
    </Suspense>
  );
}
