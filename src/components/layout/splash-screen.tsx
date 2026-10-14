"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "clyn-splash";
const TOTAL_MS = 3400;

const letters = ["C", "L", "Y", "N"];

/**
 * Pantalla de bienvenida: una vez por sesión. La animación (incluida la salida)
 * está hecha solo con CSS, así que nunca puede quedar tapando el sitio aunque
 * falle el JavaScript; el JS solo la desmonta y recuerda que ya se mostró.
 */
export function SplashScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setGone(true);
        return;
      }
    } catch {
      // sin sessionStorage: se muestra igual
    }

    const root = document.documentElement;
    root.style.overflow = "hidden";
    const timer = setTimeout(() => {
      root.style.overflow = "";
      try {
        // Se guarda al terminar (no al empezar) para que React Strict Mode,
        // que ejecuta el efecto dos veces en desarrollo, no la cancele.
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setGone(true);
    }, TOTAL_MS);

    return () => {
      clearTimeout(timer);
      root.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <>
      {/* Evita el parpadeo en visitas repetidas de la misma sesión */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${STORAGE_KEY}"))document.documentElement.setAttribute("data-splash","seen")}catch(e){}`,
        }}
      />
      <div
        className="splash-root fixed inset-0 z-200 flex items-center justify-center overflow-hidden bg-background"
        aria-hidden="true"
      >
        {/* Manchas de color difusas */}
        <span className="splash-blob splash-blob-a absolute -left-24 -top-24 size-[26rem] rounded-full bg-accent/45 blur-[90px]" />
        <span className="splash-blob splash-blob-b absolute -bottom-32 -right-24 size-[30rem] rounded-full bg-orange-300/50 blur-[100px]" />
        <span className="splash-blob splash-blob-c absolute right-[-6rem] top-1/4 size-80 rounded-full bg-amber-300/40 blur-[90px]" />
        <span className="splash-blob splash-blob-d absolute bottom-1/4 left-[-5rem] size-72 rounded-full bg-accent/30 blur-[80px]" />

        <div className="relative flex flex-col items-center text-primary">
          {/* Resplandor detrás del logo */}
          <span className="splash-glow absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl lg:size-[30rem]" />

          <div className="relative flex font-logo text-7xl font-extralight leading-none tracking-[0.2em] sm:text-8xl lg:text-9xl">
            {letters.map((letter, i) => (
              <span
                key={letter}
                className="splash-letter inline-block"
                style={{ animationDelay: `${250 + i * 130}ms`, transform: "scaleY(0.85)" }}
              >
                {letter}
              </span>
            ))}
          </div>

          <svg viewBox="0 0 100 27" className="splash-smile relative -mt-1 h-6 w-40 sm:h-8 sm:w-52 lg:h-10 lg:w-64" aria-hidden="true">
            <path d="M0 5 Q50 24 100 5 Q50 13 0 5 Z" fill="currentColor" />
          </svg>

          <p className="splash-tagline relative mt-6 max-w-[15rem] text-center text-xs sm:max-w-none font-medium uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
            Cuidado personal inteligente
          </p>

          {/* Barra de carga */}
          <span className="splash-bar relative mt-8 block h-0.5 w-24 origin-left rounded-full bg-accent" />
        </div>
      </div>

      <style>{`
        html[data-splash="seen"] .splash-root { display: none; }
        .splash-root { animation: sp-out ${TOTAL_MS}ms cubic-bezier(.7,0,.3,1) forwards; }
        .splash-blob { opacity: 0; animation: sp-fade 1s ease-out forwards; }
        .splash-blob-a { animation: sp-fade 1s ease-out forwards, sp-drift-a 7s ease-in-out infinite alternate; }
        .splash-blob-b { animation: sp-fade 1s ease-out .1s forwards, sp-drift-b 8s ease-in-out infinite alternate; }
        .splash-blob-c { animation: sp-fade 1s ease-out .2s forwards, sp-drift-c 6s ease-in-out infinite alternate; }
        .splash-blob-d { animation: sp-fade 1s ease-out .3s forwards, sp-drift-d 9s ease-in-out infinite alternate; }
        .splash-glow { animation: sp-glow 2.6s ease-in-out infinite; }
        .splash-letter { opacity: 0; animation: sp-letter .8s cubic-bezier(.2,.9,.2,1) forwards; }
        .splash-smile { opacity: 0; transform-origin: center; animation: sp-smile .7s cubic-bezier(.2,.9,.2,1) 1s forwards; }
        .splash-tagline { opacity: 0; animation: sp-rise .7s ease-out 1.5s forwards; }
        .splash-bar { transform: scaleX(0); animation: sp-bar 1.5s cubic-bezier(.6,0,.3,1) 1.3s forwards; }
        @keyframes sp-out {
          0%, 82% { opacity: 1; transform: none; filter: none; visibility: visible; }
          100% { opacity: 0; transform: scale(1.06); filter: blur(8px); visibility: hidden; }
        }
        @keyframes sp-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sp-letter {
          from { opacity: 0; filter: blur(10px); translate: 0 28px; }
          to { opacity: 1; filter: blur(0); translate: 0 0; }
        }
        @keyframes sp-smile {
          from { opacity: 0; clip-path: inset(0 50% 0 50%); }
          to { opacity: 1; clip-path: inset(0 0 0 0); }
        }
        @keyframes sp-rise { from { opacity: 0; translate: 0 10px; } to { opacity: 1; translate: 0 0; } }
        @keyframes sp-bar { to { transform: scaleX(1); } }
        @keyframes sp-glow { 0%,100% { opacity: .5; scale: .9; } 50% { opacity: 1; scale: 1.15; } }
        @keyframes sp-drift-a { to { translate: 140px 90px; scale: 1.2; } }
        @keyframes sp-drift-b { to { translate: -120px -80px; scale: 1.15; } }
        @keyframes sp-drift-c { to { translate: -90px 110px; scale: 1.3; } }
        @keyframes sp-drift-d { to { translate: 110px -100px; scale: 1.2; } }
        @media (prefers-reduced-motion: reduce) {
          .splash-root { animation-duration: 1.2s; }
          .splash-blob, .splash-glow { animation: none; opacity: 1; }
          .splash-letter, .splash-smile, .splash-tagline, .splash-bar { animation-duration: .01ms; animation-delay: 0ms; }
        }
      `}</style>
    </>
  );
}
