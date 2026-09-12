import Image from "next/image";

import { LocaleToggle } from "./locale-toggle";
import { SectionNav } from "./section-nav";
import { SocialLinks } from "./social-links";
import { ThemeToggle } from "./theme-toggle";
import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";
import type { Locale } from "@/lib/routes";
import { getSections } from "@/lib/sections";

/**
 * Intro del perfil. En móvil se apila arriba del contenido; desde `lg` se
 * convierte en la columna izquierda fija. Se renderiza una sola vez, así que
 * solo hay un `h1` en la página.
 */
export function Sidebar({ locale }: { locale: Locale }) {
  const sections = getSections(locale);

  return (
    <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-2/5 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* TODO(sebastián): esta es una foto de grado, cuerpo completo y fondo
            de exteriores; docs/05-identidad-visual.md pide encuadre de hombros
            hacia arriba con fondo neutro. Sirve de placeholder mientras llega
            la foto definitiva. */}
        <Image
          src="/images/sebastian.jpg"
          alt=""
          width={96}
          height={96}
          priority
          className="size-24 rounded-xl border border-border object-cover"
        />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight lg:text-4xl">
          {PROFILE.name}
        </h1>
        <p className="mt-2 text-lg text-fg">{t(locale, "site.role")}</p>
        <p className="mt-4 max-w-sm text-fg-muted">{t(locale, "profile.tagline")}</p>

        <div className="mt-8 hidden lg:block">
          <SectionNav label={t(locale, "nav.sections")} sections={sections} />
        </div>
      </div>

      <div className="mt-6 lg:mt-0">
        <SocialLinks locale={locale} />
        <div className="mt-2 hidden items-center gap-x-2 lg:flex">
          <LocaleToggle locale={locale} path="/" />
          <ThemeToggle
            toDarkLabel={t(locale, "theme.toDark")}
            toLightLabel={t(locale, "theme.toLight")}
          />
        </div>
      </div>
    </div>
  );
}
