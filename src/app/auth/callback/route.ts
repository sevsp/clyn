import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { createClient } from "@/lib/supabase/server";

function safePath(value: string | undefined) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = getSiteUrl();
  const code = searchParams.get("code");

  const cookieStore = await cookies();
  const redirectTo = safePath(cookieStore.get("auth_redirect")?.value);
  cookieStore.delete("auth_redirect");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const target = new URL(redirectTo, origin);
      target.searchParams.set("login", "success");
      return NextResponse.redirect(target);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=google`);
}
