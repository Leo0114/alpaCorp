import { defaultLang, isLang, routes, showDefaultLang, type Lang, type RouteId } from "./ui";

/** Resolves the active language from the URL, falling back to defaultLang ('es'). */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return isLang(segment) ? segment : defaultLang;
}

/**
 * Builds an absolute, locale-aware path.
 *   localizePath("es", "products")      -> "/productos"
 *   localizePath("en", "products")      -> "/en/productos"
 *   localizePath("en", "products", "x") -> "/en/productos/x"
 */
export function localizePath(lang: Lang, route: RouteId, ...rest: string[]): string {
  const segment = routes[lang][route];
  const parts = [segment, ...rest].filter(Boolean);
  const prefix = !showDefaultLang && lang === defaultLang ? "" : `/${lang}`;
  const path = parts.join("/");
  return path ? `${prefix}/${path}` : prefix || "/";
}

/** Curried helper for templates: `const path = usePath(lang)`. */
export function usePath(lang: Lang) {
  return (route: RouteId, ...rest: string[]) => localizePath(lang, route, ...rest);
}

/**
 * Returns the equivalent pathname in the target locale.
 * E.g., `/` -> `/en`
 * E.g., `/quienes-somos` -> `/en/quienes-somos`
 * E.g., `/en/productos/tarima-estandar` -> `/productos/tarima-estandar`
 */
export function switchLocalePath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  if (current === target) return url.pathname;

  const rawSegments = url.pathname.split("/").filter(Boolean);

  if (current !== defaultLang || showDefaultLang) {
    if (rawSegments[0] === current) {
      rawSegments.shift();
    }
  }

  const path = rawSegments.join("/");
  const targetPrefix = !showDefaultLang && target === defaultLang ? "" : `/${target}`;
  return path ? `${targetPrefix}/${path}` : targetPrefix || "/";
}
