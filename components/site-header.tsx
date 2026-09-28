import Link from "next/link";

import { LocaleToggle } from "./locale-toggle";
import { ThemeToggle } from "./theme-toggle";
import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";
import { localizedPath, type Locale } from "@/lib/routes";

type SiteHeaderProps = {
  locale: Locale;
  path: string;
  showOnDesktop?: boolean;
};

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
