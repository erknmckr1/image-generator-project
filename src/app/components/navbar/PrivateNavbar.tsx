"use client";

import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AvatarButton } from "./AvatarButton";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PrivateNavbar() {
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard/generate-image", label: "Generate Image" },
    { href: "/dashboard/my-images", label: "My Images" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Sol taraf - Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground font-bold text-lg px-2 py-1 rounded-md">
            V
          </div>
          <span className="font-semibold text-lg text-foreground">EGA</span>
        </div>

        {/* Desktop Menü */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition hover:text-foreground",
                isActive(href)
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </ul>

        {/* Sağ taraf */}
        <div className="flex items-center gap-3">
          <Globe
            size={18}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          />

          <div className="hidden md:block">
            <AvatarButton />
          </div>

          {/* Mobil menü butonu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="md:hidden border-t  border-border/40 bg-background/95 backdrop-blur-md">
          <ul className="flex flex-col p-4 space-y-3 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "transition hover:text-foreground",
                  isActive(href)
                    ? "text-foreground font-semibold border-l-4 border-primary pl-2"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}

            {/* Avatar mobilde altta */}
            <div className="pt-3 border-t border-border/30 flex items-center justify-between">
              <AvatarButton />
              <span className="text-xs text-muted-foreground">My Account</span>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}
