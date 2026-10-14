import { HandCoins } from "lucide-react";

export function PaymentBanner() {
  return (
    <div className="bg-accent text-accent-foreground shadow-md">
      <p className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-3.5 text-center text-sm font-extrabold uppercase tracking-wide sm:text-lg">
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
          <HandCoins className="relative size-5" />
        </span>
        <span className="leading-tight">
          Pagás cuando recibís tu pedido
          <span className="block text-xs font-semibold normal-case tracking-normal opacity-95 sm:inline sm:text-base sm:before:content-['_·_']">
            Sin pagar nada por adelantado
          </span>
        </span>
      </p>
    </div>
  );
}
