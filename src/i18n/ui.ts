export const LANGUAGES = {
  es: { code: "es", name: "Español", short: "ES", locale: "es-MX" },
  en: { code: "en", name: "English", short: "EN", locale: "en-US" },
} as const;

export type Lang = keyof typeof LANGUAGES;

export const defaultLang: Lang = "es";
export const showDefaultLang = false;

export const isLang = (value?: string | null): value is Lang =>
  !!value && value in LANGUAGES;

/**
 * Route IDs mapped to path segments for each locale.
 */
export const routes = {
  es: {
    index: "",
    about: "quienes-somos",
    products: "productos",
    services: "servicios",
    contact: "contacto",
  },
  en: {
    index: "",
    about: "quienes-somos",
    products: "productos",
    services: "servicios",
    contact: "contacto",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type RouteId = keyof (typeof routes)["es"];
