// app/auth/callback/route.ts
import { createRouteHandlerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  // URL'den dil parametresini yakala (örn. /tr/auth/callback)
  const localeMatch = requestUrl.pathname.match(/^\/(tr|en|de|ru|es|ko|ar)\//);
  const locale = localeMatch ? localeMatch[1] : "en"; // fallback

  if (code) {
    const supabase = await createRouteHandlerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(
        `${origin}/${locale}/login?error=${encodeURIComponent(error.message)}`
      );
    }

  }

  // Başarılı girişten sonra yönlendirme (dil korumalı)
  return NextResponse.redirect(`${origin}/${locale}/dashboard/generate-image`);
}
