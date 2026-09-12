import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TagList } from "@/components/tag-list";
import { getCaseStudies } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { resolveLocale } from "@/lib/params";
import { localizedPath, LOCALES } from "@/lib/routes";

const PATH = "/case-studies";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/case-studies">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: PATH,
    title: t(locale, "caseStudies.title"),
    description: t(locale, "caseStudies.description"),
  });
}

export default async function CaseStudiesPage({
  params,
}: PageProps<"/[locale]/case-studies">) {
  const locale = await resolveLocale(params);
  const caseStudies = getCaseStudies(locale);

  return (
    <>
      <SiteHeader locale={locale} path={PATH} showOnDesktop />

      <div className="mx-auto max-w-[720px] px-5 pt-20 lg:pt-28">
        <main id="content">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t(locale, "caseStudies.title")}
          </h1>

          {caseStudies.length === 0 ? (
            <p className="mt-8 text-fg-muted">{t(locale, "caseStudies.empty")}</p>
          ) : (
            <ul className="mt-8 space-y-2">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={localizedPath(locale, `${PATH}/${study.slug}`)}
                    className="group -mx-3 block rounded-lg px-3 py-4 transition-colors hover:bg-bg-elevated"
                  >
                    <p className="font-mono text-xs text-fg-muted">
                      {formatDate(locale, study.frontmatter.date)} ·{" "}
                      {study.readingMinutes} {t(locale, "caseStudies.readingTime")}
                    </p>
                    <h2 className="mt-1 font-medium transition-colors group-hover:text-accent">
                      {study.frontmatter.title}
                    </h2>
                    <p className="mt-1 text-sm text-fg-muted">
                      {study.frontmatter.summary}
                    </p>
                    <div className="mt-3">
                      <TagList tags={study.frontmatter.tags} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>

        <div className="mt-16">
          <Footer locale={locale} />
        </div>
      </div>
    </>
  );
}
