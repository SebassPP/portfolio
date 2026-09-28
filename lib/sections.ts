import { t, type MessageKey } from "./i18n";
import { SHOW_PROJECTS } from "./profile";
import type { Locale } from "./routes";

/** Secciones de la landing, en orden. El id es el ancla. */
const SECTION_IDS = [
  ["about", "nav.about"],
  ["experience", "nav.experience"],
  ["projects", "nav.projects"],
  ["case-studies", "nav.caseStudies"],
  ["contact", "nav.contact"],
] as const satisfies readonly (readonly [string, MessageKey])[];

export function getSections(locale: Locale) {
  return SECTION_IDS.filter(([id]) => SHOW_PROJECTS || id !== "projects").map(
    ([id, key]) => ({ id, label: t(locale, key) }),
  );
}
