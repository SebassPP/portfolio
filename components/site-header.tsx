import Link from "next/link";

import { LocaleToggle } from "./locale-toggle";
import { ThemeToggle } from "./theme-toggle";
import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";
import { localizedPath, type Locale } from "@/lib/routes";

type SiteHeaderProps = {
  locale: Locale;
  /** Ruta actual sin prefijo de idioma. */
  path: string;
  /**
   * En la landing los controles viven en la columna izquierda desde `lg`, así
   * que la barra desaparece. En las páginas de una columna se queda.
   */
  showOnDesktop?: boolean;
};

/** Barra fija con el nombre y los dos toggles. */
export function SiteHeader({
  locale,
  path,
  showOnDesktop = false,
}: SiteHeaderProps) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 border-b border-border bg-bg/90 backdrop-blur-sm ${
        showOnDesktop ? "" : "lg:hidden"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-2">
        <Link
          href={localizedPath(locale, "/")}
          className="rounded-sm py-2 text-sm font-semibold transition-colors hover:text-accent"
        >
          {PROFILE.name}
        </Link>
        <div className="flex items-center gap-x-1">
          <LocaleToggle locale={locale} path={path} />
          <ThemeToggle
            toDarkLabel={t(locale, "theme.toDark")}
            toLightLabel={t(locale, "theme.toLight")}
          />
        </div>
      </div>
    </header>
  );
}
