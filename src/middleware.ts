// middleware.ts (projenizin ROOT dizininde - app klasörünün dışında!)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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

  // Korumalı sayfalar için kontrol (isteğe bağlı)
  if (!user && request.nextUrl.pathname.startsWith("/generate-image")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if(user && request.nextUrl.pathname.startsWith("/login")){
    const redirectUrl = request.nextUrl.clone();
     redirectUrl.pathname = "/generate-image";
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
