import { t } from "./i18n";
import type { Locale } from "./routes";

/** `YYYY-MM` → "Feb 2025" / "feb 2025". `YYYY` → "2023". */
function formatPoint(locale: Locale, value: string): string {
  if (/^\d{4}$/.test(value)) return value;

  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** Rango de fechas de una experiencia. `end: null` = vigente. */
export function formatDateRange(
  locale: Locale,
  start: string,
  end: string | null,
): string {
  const from = formatPoint(locale, start);
  const to = end ? formatPoint(locale, end) : t(locale, "experience.present");
  return `${from} — ${to}`;
}

/** Fecha de publicación de un caso de estudio. */
export function formatDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
