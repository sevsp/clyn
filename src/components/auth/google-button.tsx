"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/actions/auth";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3a7.4 7.4 0 0 1-11-3.89H.98v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.07 14.2a7.2 7.2 0 0 1 0-4.4V6.71H.98a12 12 0 0 0 0 10.58l4.09-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 .98 6.71l4.09 3.09A7.16 7.16 0 0 1 12 4.77Z"
      />
    </svg>
  );
}

export function GoogleButton({ redirectTo }: { redirectTo: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => signInWithGoogle(redirectTo)}
    >
      <GoogleIcon />
      Continuar con Google
    </Button>
  );
}
