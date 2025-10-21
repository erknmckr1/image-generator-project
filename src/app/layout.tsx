// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/redux/Providers";
import { createClient } from "@/lib/supabase/server";
import UserProvider from "@/lib/providers/UserProvider";
import CreditProvider from "@/lib/providers/CreditProvider";
const inter = Inter({ subsets: ["latin"] });
import NavbarWrapper from "./components/navbar/NavbarWrapper";
export const metadata: Metadata = {
  title: "Vega",
  description: "AI powered image generation platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
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
