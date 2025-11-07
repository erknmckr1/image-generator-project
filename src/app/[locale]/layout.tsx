// src/app/[locale]/layout.tsx
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/redux/Providers";
import { createClient } from "@/lib/supabase/server";
import UserProvider from "@/lib/providers/UserProvider";
import CreditProvider from "@/lib/providers/CreditProvider";
import NavbarWrapper from "../components/navbar/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vega",
  description: "AI powered image generation platform",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // artık locale’yi bekliyoruz
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} bg-gradient-to-b from-muted/30 via-background to-muted`}
      >
        <Providers>
          <UserProvider user={user}>
            <CreditProvider user={user}>
              <NavbarWrapper user={user} />
              <main className="mx-auto">{children}</main>
            </CreditProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
