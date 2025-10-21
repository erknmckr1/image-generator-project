"use client";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ru from "@/locales/ru.json";
import ar from "@/locales/ar.json";
import es from "@/locales/es.json";
import ko from "@/locales/ko.json";
import de from "@/locales/de.json"
// JSON yapısı için type tanımla
type TranslationValue =
  | string
  | TranslationObject
  | TranslationArray
  | number
  | boolean;
type TranslationObject = { [key: string]: TranslationValue }; // json içindeki nesnet object olabilir
type TranslationArray = Array<TranslationValue>; // json içinde bir array olabilir.

export function useTranslation() {
  const { language } = useSelector((state: RootState) => state.language);
  // ---  dil haritası ---
  const locales: Record<string, TranslationObject> = {
    en,
    tr,
    ru,
    ar,
    es,
    ko,
    de
  };
  const translations = locales[language];

  const t = <T = string>(path: string): T => {
    const result = path
      .split(".")
      .reduce<TranslationValue | undefined>((acc, key) => {
        if (acc && typeof acc === "object" && !Array.isArray(acc)) {
          return (acc as TranslationObject)[key];
        }
        return undefined;
      }, translations as TranslationValue);

    // Eğer sonuç bulunamazsa path'i döndür
    return (result ?? path) as T;
  };

  return { t, language };
}
