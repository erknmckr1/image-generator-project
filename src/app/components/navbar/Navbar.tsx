"use client";

import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AvatarButton } from "./AvatarButton";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useState } from "react";
export default function Navbar() {
  const { id } = useSelector((state: RootState) => state.user);
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (href: string) => pathName === href;

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
      setIsOpen(false); // mobilde tıklanınca kapat
    }
  };

  const navLinks = [
    { href: "#pricing", label: "Pricing" },
    { href: "#usecases", label: "Use Cases" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathName === "/") {
              e.preventDefault();
              scrollToSection(e, "hero");
            }
          }}
          className="flex items-center space-x-2"
        >
          <div className="bg-primary text-primary-foreground font-bold text-lg px-2 py-1 rounded-md">
            V
          </div>
          <span className="font-semibold text-lg text-foreground">EGA</span>
        </Link>

        {/* Masaüstü Menü */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="hover:text-foreground transition">
              <Link
                href={href}
                onClick={(e) => scrollToSection(e, href.slice(1))}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sağ taraf */}
        <div className="flex items-center space-x-4">
          {/* Dil ikonu */}
          <Globe
            size={18}
            className="text-muted-foreground hover:text-foreground cursor-pointer hidden sm:block"
          />
          {/* Masaüstü Butonlar */}
          <div className="hidden md:flex items-center space-x-3">
            {id ? (
              <AvatarButton />
            ) : (
              <>
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-1.5 text-sm border-border"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="rounded-full px-4 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/login">Get started </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobil Menü Butonu */}
          <button
            className="md:hidden p-2 rounded-md border border-border hover:bg-muted transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={20} className="text-foreground" />
            ) : (
              <Menu size={20} className="text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobil Menü */}
      <div
        className={cn(
          "md:hidden fixed top-[64px] left-0 w-full bg-background/95 backdrop-blur-md border-t border-border/40 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col p-4 space-y-4 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => scrollToSection(e, href.slice(1))}
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

          {/* Mobil butonlar */}
          <div className="flex flex-col gap-3 mt-3 border-t border-border/30 pt-3">
            {id ? (
              <div className="flex items-center justify-between">
                <AvatarButton />
                <span className="text-xs text-muted-foreground">
                  My Account
                </span>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Get started </Link>
                </Button>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}
