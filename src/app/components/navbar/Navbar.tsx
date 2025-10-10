"use client";

import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn button
import { cn } from "@/lib/utils"; // shadcn yardımcı fonksiyon (opsiyonel)
import Link from "next/link";
export default function Navbar() {
  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
      )}
    >
      {/* containter */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Sol taraf - Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground font-bold text-lg px-2 py-1 rounded-md">
            V
          </div>
          <span className="font-semibold text-lg text-foreground">
            EGA
          </span>
        </div>

        {/* Menü */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          <li className="hover:text-foreground transition">For teams</li>
          <li className="hover:text-foreground transition">Studio</li>
          <li className="hover:text-foreground transition">Pricing</li>
          <li className="flex items-center hover:text-foreground cursor-pointer gap-1">
            Use Cases <ChevronDown size={14} />
          </li>
          <li className="flex items-center hover:text-foreground cursor-pointer gap-1">
            Learn more <ChevronDown size={14} />
          </li>
        </ul>

        {/* Sağ taraf - Butonlar */}
        <div className="flex items-center space-x-4">
          <Globe
            size={18}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          />

          <Button
            variant="outline"
            className="rounded-full px-4 py-1.5 text-sm border-border"
          >
            <Link href={"/login"}>Log in</Link>
          </Button>

          <Button className="rounded-full px-4 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}
