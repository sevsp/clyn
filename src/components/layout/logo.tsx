import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center", className)}>
      <span
        className="font-logo text-2xl leading-none font-extralight tracking-[0.2em]"
        style={{ transform: "scaleY(0.85)" }}
      >
        CLYN
      </span>
      <svg
        viewBox="0 0 100 27"
        className="-mt-px h-2.5 w-16"
        aria-hidden="true"
      >
        <path
          d="M0 5 Q50 24 100 5 Q50 13 0 5 Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
