import type { Metadata } from "next";

import { ExperienceCard } from "@/components/experience-card";
import { ExternalLink } from "@/components/external-link";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { resolveLocale } from "@/lib/params";
import { EXPERIENCE, PROFILE, PROJECTS, UPCOMING_CASE_STUDIES } from "@/lib/profile";
import { getSections } from "@/lib/sections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: "/",
    title: t(locale, "site.title"),
    description: t(locale, "site.description"),
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const sections = getSections(locale);
  const sectionTitle = (id: string) =>
    sections.find((section) => section.id === id)!.label;

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-20 focus:rounded-sm focus:bg-bg-elevated focus:px-3 focus:py-2"
      >
        {t(locale, "a11y.skipToContent")}
      </a>
      <SiteHeader locale={locale} path="/" />

      <div className="mx-auto max-w-[1200px] px-5 pt-20 lg:flex lg:gap-x-12 lg:px-10 lg:pt-0">
        <Sidebar locale={locale} />

        {/* pt-10 compensa el padding superior de la primera Section, para que
            su título quede a la altura de la foto de la columna izquierda. */}
        <main id="content" className="lg:w-3/5 lg:pt-10 lg:pb-24">
          <Section id="about" title={sectionTitle("about")}>
            <div className="space-y-4 text-fg-muted">
              <p>{t(locale, "todo.aboutFirst")}</p>
              <p>{t(locale, "todo.aboutSecond")}</p>
            </div>
          </Section>

          <Section id="experience" title={sectionTitle("experience")}>
            <div className="space-y-2">
              {EXPERIENCE.map((entry) => (
                <ExperienceCard key={entry.id} locale={locale} entry={entry} />
              ))}
            </div>
          </Section>

          <Section id="projects" title={sectionTitle("projects")}>
            <div className="space-y-6">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} locale={locale} project={project} />
              ))}
            </div>
          </Section>

          <Section id="case-studies" title={sectionTitle("case-studies")}>
            <ul className="space-y-6">
              {UPCOMING_CASE_STUDIES.map((caseStudy) => (
                <li key={caseStudy.id}>
                  <p className="font-mono text-xs text-fg-muted">
                    {t(locale, "comingSoon")}
                  </p>
                  <p className="mt-1 font-medium">{caseStudy.title[locale]}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="contact" title={sectionTitle("contact")}>
            <p className="text-fg-muted">
              {PROFILE.email ? (
                <a className="link" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
              ) : (
                t(locale, "todo.email")
              )}
              {" · "}
              <a className="link" href={`tel:${PROFILE.phone}`}>
                {PROFILE.phoneDisplay}
              </a>
              {" · "}
              <ExternalLink href={PROFILE.linkedinUrl}>
                {t(locale, "social.linkedin")}
              </ExternalLink>
              {" · "}
              {PROFILE.githubUrl ? (
                <ExternalLink href={PROFILE.githubUrl}>
                  {t(locale, "social.github")}
                </ExternalLink>
              ) : (
                t(locale, "todo.github")
              )}
            </p>
          </Section>

          <Footer locale={locale} />
        </main>
      </div>
    </>
  );
}
