import { ExternalArrow } from "./external-arrow";
import { TagList } from "./tag-list";
import { formatDateRange } from "@/lib/dates";
import { t } from "@/lib/i18n";
import type { ExperienceEntry } from "@/lib/profile";
import type { Locale } from "@/lib/routes";

type ExperienceCardProps = {
  locale: Locale;
  entry: ExperienceEntry;
};

const LAYOUT =
  // 9rem: cabe un rango completo ("Jul 2025 — Jan 2026") en una sola línea.
  "group -mx-3 grid gap-y-2 rounded-lg px-3 py-4 lg:grid-cols-[9rem_1fr] lg:gap-x-4";

/**
 * Toda la card es link cuando hay URL de la empresa. Mientras no la haya es
 * texto plano, sin hover: un `href="#"` es un link que no lleva a ninguna parte.
 */
export function ExperienceCard({ locale, entry }: ExperienceCardProps) {
  const content = (
    <>
      <p className="font-mono text-xs text-fg-muted lg:pt-1">
        {formatDateRange(locale, entry.start, entry.end)}
      </p>
      <div>
        <h3 className="font-medium transition-colors group-hover:text-accent">
          {entry.role} · {entry.company}
          {entry.url && <ExternalArrow />}
        </h3>
        <p className="mt-2 text-sm text-fg-muted">
          {t(locale, "todo.experienceDescription")}
        </p>
        <div className="mt-3">
          <TagList tags={entry.tags} />
        </div>
      </div>
    </>
  );

  if (!entry.url) {
    return <article className={LAYOUT}>{content}</article>;
  }

  return (
    <article>
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${LAYOUT} transition-colors hover:bg-bg-elevated`}
      >
        {content}
      </a>
    </article>
  );
}
