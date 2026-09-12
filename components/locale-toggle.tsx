import Link from "next/link";

import { t } from "@/lib/i18n";
import { LOCALES, localizedPath, type Locale } from "@/lib/routes";

type LocaleToggleProps = {
  locale: Locale;
  /** Ruta actual sin prefijo de idioma, para cambiar de idioma sin cambiar de página. */
  path: string;
};

/**
 * Server component: cambiar de idioma es navegar a la misma ruta con el otro
 * prefijo, así que no hace falta JavaScript en cliente.
 */
export function LocaleToggle({ locale, path }: LocaleToggleProps) {
  return (
    <div className="flex items-center font-mono text-xs">
      {LOCALES.map((target, index) => {
        const isActive = target === locale;
        return (
          <span key={target} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className="text-fg-muted">
                /
              </span>
            )}
            <Link
              href={localizedPath(target, path)}
              hrefLang={target}
              aria-current={isActive ? "true" : undefined}
              className={`flex h-11 items-center px-2 transition-colors hover:text-accent ${
                isActive ? "text-fg" : "text-fg-muted"
              }`}
            >
              {t(locale, target === "en" ? "locale.en" : "locale.es")}
              {/*
                El nombre accesible debe contener el texto visible (WCAG 2.5.3),
                así que se amplía con texto oculto en vez de con un aria-label
                que lo reemplace.
              */}
              <span className="sr-only">
                {" — "}
                {t(
                  locale,
                  target === "en" ? "locale.toEnglish" : "locale.toSpanish",
                )}
              </span>
            </Link>
          </span>
        );
      })}
    </div>
  );
}
