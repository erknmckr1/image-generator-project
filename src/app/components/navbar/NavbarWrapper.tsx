// app/components/NavbarWrapper.tsx
"use client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import PrivateNavbar from "./PrivateNavbar";

export default function NavbarWrapper({ user }: { user: User | null }) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");
  const isAccount = pathname.includes("/account");

  if ((isDashboard || isAccount) && user) {
    return <PrivateNavbar />;
  }

  if (!isDashboard && !isAccount) {
    return <Navbar />;
  }
}
