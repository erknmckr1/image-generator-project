// middleware.ts (projenizin ROOT dizininde - app klasörünün dışında!)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "tr", "de", "ru", "es", "ko", "ar"];
const DEFAULT_LOCALE = "en";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const browserLang = request.headers
      .get("accept-language")
      ?.split(",")[0]
      .split("-")[0];

    const detectedLocale = SUPPORTED_LOCALES.includes(browserLang!)
      ? browserLang
      : DEFAULT_LOCALE;

    const redirectUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // ÖNEMLI: Session'ı yenilemek için getUser çağrısı
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(" Middleware auth error:", error.message);
  }

  //  Yetki kontrolü — dil path'i koruyarak yönlendirme
  const localePrefix = pathname.split("/")[1]; // örn: "tr", "en"
  if (!user && pathname.startsWith(`/${localePrefix}/dashboard`)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${localePrefix}/login`;
    return NextResponse.redirect(redirectUrl);
  }

  if (user && pathname.startsWith(`/${localePrefix}/login`)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${localePrefix}/dashboard`;
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Şunlar HARİÇ tüm route'ları yakala:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public klasöründeki dosyalar (*.svg, *.png, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
