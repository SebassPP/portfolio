import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TagList } from "@/components/tag-list";
import { getAdjacentCaseStudies, getCaseStudies, getCaseStudy } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { t } from "@/lib/i18n";
import { rehypePlugins } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { resolveLocale } from "@/lib/params";
import { localizedPath, LOCALES, otherLocale } from "@/lib/routes";

const BASE_PATH = "/case-studies";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getCaseStudies(locale, { includeDrafts: true }).map((study) => ({
      locale,
      slug: study.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const study = getCaseStudy(slug, locale);
  if (!study) notFound();

  return buildMetadata({
    locale,
    path: `${BASE_PATH}/${slug}`,
    title: study.frontmatter.title,
    description: study.frontmatter.summary,
    noindex: study.frontmatter.draft,
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/case-studies/[slug]">) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const study = getCaseStudy(slug, locale);
  if (!study) notFound();

  const path = `${BASE_PATH}/${slug}`;
  const other = otherLocale(locale);
  const { previous, next } = getAdjacentCaseStudies(slug, locale);

  return (
    <>
      <SiteHeader locale={locale} path={path} showOnDesktop />

      <div className="mx-auto max-w-[65ch] px-5 pt-20 lg:pt-28">
        <article id="content">
          <header>
            <h1 className="text-3xl font-semibold tracking-tight">
              {study.frontmatter.title}
            </h1>
            <p className="mt-3 text-fg-muted">{study.frontmatter.summary}</p>
            <p className="mt-4 font-mono text-xs text-fg-muted">
              <time dateTime={study.frontmatter.date}>
                {formatDate(locale, study.frontmatter.date)}
              </time>{" "}
              · {study.readingMinutes} {t(locale, "caseStudies.readingTime")}
            </p>
            <div className="mt-4">
              <TagList tags={study.frontmatter.tags} />
            </div>
            <p className="mt-4 text-sm">
              <Link
                href={localizedPath(other, path)}
                hrefLang={other}
                className="link"
              >
                {t(
                  locale,
                  other === "en"
                    ? "locale.otherVersionEnglish"
                    : "locale.otherVersionSpanish",
                )}
              </Link>
            </p>
          </header>

          <div className="prose prose-tokens mt-10 max-w-none">
            <MDXRemote
              source={study.body}
              options={{
                mdxOptions: { rehypePlugins },
              }}
            />
          </div>
        </article>

        {(previous || next) && (
          <nav
            aria-label={t(locale, "caseStudies.title")}
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {previous && (
              <Link
                href={localizedPath(locale, `${BASE_PATH}/${previous.slug}`)}
                className="group rounded-lg"
              >
                <span className="font-mono text-xs text-fg-muted">
                  {t(locale, "caseStudies.previous")}
                </span>
                <span className="mt-1 block text-sm transition-colors group-hover:text-accent">
                  {previous.frontmatter.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={localizedPath(locale, `${BASE_PATH}/${next.slug}`)}
                className="group rounded-lg sm:col-start-2 sm:text-right"
              >
                <span className="font-mono text-xs text-fg-muted">
                  {t(locale, "caseStudies.next")}
                </span>
                <span className="mt-1 block text-sm transition-colors group-hover:text-accent">
                  {next.frontmatter.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        <div className="mt-16">
          <Footer locale={locale} />
        </div>
      </div>
    </>
  );
}
