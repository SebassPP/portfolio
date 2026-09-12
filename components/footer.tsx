import { ExternalLink } from "./external-link";
import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";
import type { Locale } from "@/lib/routes";

/** Una línea. Nada más. */
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-border py-8 text-sm text-fg-muted">
      <p>
        {t(locale, "footer.builtWith")}{" "}
        <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>
        {" · "}
        {t(locale, "footer.deployedOn")}{" "}
        <ExternalLink href="https://vercel.com">Vercel</ExternalLink>
        {" · "}
        {t(locale, "footer.sourceOn")}{" "}
        {PROFILE.repoUrl ? (
          <ExternalLink href={PROFILE.repoUrl}>GitHub</ExternalLink>
        ) : (
          "GitHub"
        )}
      </p>
    </footer>
  );
}
