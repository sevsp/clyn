"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "@/components/auth/google-button";
import { signUpWithPassword, type AuthResult } from "@/lib/actions/auth";

export default function RegistroPage() {
  return (
    <Suspense>
      <RegistroForm />
    </Suspense>
  );
}

function RegistroForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";
  const [state, formAction, pending] = useActionState<AuthResult, FormData>(
    signUpWithPassword,
    undefined
  );

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="font-heading text-2xl font-extrabold text-primary">
        Crear cuenta
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Regístrate para guardar tus datos y ver el historial de tus pedidos.
      </p>

      <div className="mt-6">
        <GoogleButton redirectTo={redirectTo} />
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        o con tu email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input id="fullName" name="fullName" type="text" required autoComplete="name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
