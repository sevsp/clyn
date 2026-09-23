import { cn } from "@/lib/utils";

type ProductArtProps = {
  variant: "glasses" | "nasal-band";
  className?: string;
};

function GlassesArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 140"
      className={cn("w-full h-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="120" cy="120" rx="95" ry="10" className="fill-black/10" />
      <path
        d="M35 55c0-12 10-20 22-20h8c12 0 20 9 20 20"
        stroke="#141414"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M205 55c0-12-10-20-22-20h-8c-12 0-20 9-20 20"
        stroke="#141414"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M85 55h70"
        stroke="#141414"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect
        x="20"
        y="52"
        width="70"
        height="52"
        rx="24"
        fill="url(#lensGradient)"
        stroke="#141414"
        strokeWidth="6"
      />
      <rect
        x="150"
        y="52"
        width="70"
        height="52"
        rx="24"
        fill="url(#lensGradient)"
        stroke="#141414"
        strokeWidth="6"
      />
      <path
        d="M12 60l8-4"
        stroke="#141414"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M228 60l-8-4"
        stroke="#141414"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="lensGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB27A" />
          <stop offset="100%" stopColor="#FF6A2B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NasalBandArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 140"
      className={cn("w-full h-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="120" cy="120" rx="95" ry="10" className="fill-black/10" />
      <rect
        x="40"
        y="50"
        width="160"
        height="40"
        rx="20"
        fill="#F3ECE0"
        stroke="#141414"
        strokeWidth="4"
      />
      <rect x="55" y="62" width="130" height="16" rx="8" fill="#FFDFC6" />
      <path
        d="M75 70c8-6 16-6 24 0"
        stroke="#FF6A2B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M115 70c8-6 16-6 24 0"
        stroke="#FF6A2B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M155 70c8-6 16-6 24 0"
        stroke="#FF6A2B"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProductArt({ variant, className }: ProductArtProps) {
  return variant === "glasses" ? (
    <GlassesArt className={className} />
  ) : (
    <NasalBandArt className={className} />
  );
}
