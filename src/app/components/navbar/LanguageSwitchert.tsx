"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params?.locale as string;

  const languages = [
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "ko", label: "한국어", flag: "🇰🇷" },
  ];

  const handleSelect = (lang: string) => {
    if (lang === currentLocale) return setOpen(false);
    const newPath = pathname.replace(`/${currentLocale}`, `/${lang}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="uppercase">{currentLocale}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-36 p-2">
        <div className="flex flex-col gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition cursor-pointer ${
                currentLocale === lang.code
                  ? "bg-primary text-white"
                  : "hover:bg-foreground/10 text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
