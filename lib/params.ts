import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./routes";

/** Valida el segmento `[locale]` de una página y devuelve el tipo estrecho. */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
