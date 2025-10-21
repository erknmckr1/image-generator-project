"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/lib/redux/store";
import { setLanguage } from "@/lib/redux/slices/language.slice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.language);
  const [open,setOpen] =useState(false)
  const languages = [
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "한국어", flag: "de" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "ar", label: "العربية", flag: "🇸a" },
    { code: "ko", label: "Deutsch", flag: "ko" },
  ];

  const handleSelect = (lang: string) => {
    dispatch(setLanguage(lang));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{language}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-36 p-2">
        <div className="flex flex-col gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition cursor-pointer ${
                language === lang.code
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
