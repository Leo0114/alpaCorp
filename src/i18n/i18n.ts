import es from "@/constants/es.json";
import en from "@/constants/en.json";
import { defaultLang, isLang, type Lang } from "./ui";

export type Dictionary = typeof es;

const DICTIONARIES: Record<Lang, Dictionary> = {
  es,
  en: en as Dictionary,
};

/**
 * Returns the dictionary for the given locale. Accepts `Astro.currentLocale`.
 */
export const getI18N = (currentLocale?: string | null): Dictionary =>
  DICTIONARIES[isLang(currentLocale) ? currentLocale : defaultLang];

export const getLang = (currentLocale?: string | null): Lang =>
  isLang(currentLocale) ? currentLocale : defaultLang;
