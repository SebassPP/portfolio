import type { Metadata } from "next";

import { t } from "./i18n";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale } from "./routes";
import { absoluteUrl } from "./site";

type PageMetadataOptions = {
  locale: Locale;
  /** Ruta sin prefijo de idioma, empezando por `/`. */
  path: string;
  title: string;
  description: string;
  /** Borradores: URL directa accesible, pero fuera de los buscadores. */
  noindex?: boolean;
};

/** Open Graph pide language_TERRITORY, no el código corto. */
const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
};

function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, absoluteUrl(localizedPath(l, path))]),
  );

  return {
    canonical: absoluteUrl(localizedPath(locale, path)),
    languages: {
      ...languages,
      "x-default": absoluteUrl(localizedPath(DEFAULT_LOCALE, path)),
    },
  };
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));

  return {
    title,
    description,
    robots: noindex ? { index: false, follow: false } : undefined,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale: OG_LOCALES[locale],
      siteName: t(locale, "site.title"),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
  };
}
