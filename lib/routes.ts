export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  return locale === DEFAULT_LOCALE
    ? normalized || "/"
    : `/${locale}${normalized}`;
}
