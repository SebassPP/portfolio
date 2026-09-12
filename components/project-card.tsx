import Image from "next/image";

import { ExternalArrow } from "./external-arrow";
import { TagList } from "./tag-list";
import { t } from "@/lib/i18n";
import type { ProjectEntry } from "@/lib/profile";
import type { Locale } from "@/lib/routes";

type ProjectCardProps = {
  locale: Locale;
  project: ProjectEntry;
};

const LAYOUT = "group -mx-3 block rounded-lg px-3 py-4";

/**
 * Captura estática + título. Mientras no haya captura ni URL confirmadas, se
 * muestra el marco 16:10 vacío y el título como TODO, sin link muerto.
 */
export function ProjectCard({ locale, project }: ProjectCardProps) {
  const content = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-bg-elevated">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-fg-muted">
            {t(locale, "todo.projectScreenshot")}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-medium transition-colors group-hover:text-accent">
        {t(locale, "todo.projectTitle")}
        {project.url && <ExternalArrow />}
      </h3>
      <p className="mt-1 text-sm text-fg-muted">
        {t(locale, "todo.projectDescription")}
      </p>
      <div className="mt-3">
        <TagList tags={project.tags} />
      </div>
    </>
  );

  if (!project.url) {
    return <article className={LAYOUT}>{content}</article>;
  }

  return (
    <article>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${LAYOUT} transition-colors hover:bg-bg-elevated`}
      >
        {content}
      </a>
    </article>
  );
}
