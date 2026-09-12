import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { LOCALES, type Locale } from "./routes";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyFrontmatter = {
  title: string;
  summary: string;
  /** Fecha ISO (`YYYY-MM-DD`). */
  date: string;
  tags: string[];
  draft: boolean;
};

export type CaseStudy = {
  slug: string;
  locale: Locale;
  frontmatter: CaseStudyFrontmatter;
  /** Cuerpo MDX sin frontmatter. */
  body: string;
  readingMinutes: number;
};

function fail(file: string, message: string): never {
  throw new Error(`[case-studies] ${file}: ${message}`);
}

function parseFrontmatter(file: string, data: unknown): CaseStudyFrontmatter {
  if (typeof data !== "object" || data === null) {
    fail(file, "el frontmatter está vacío o no es un objeto.");
  }
  const raw = data as Record<string, unknown>;

  for (const field of ["title", "summary"] as const) {
    if (typeof raw[field] !== "string" || raw[field].trim() === "") {
      fail(file, `falta el campo obligatorio "${field}" (texto no vacío).`);
    }
  }

  // gray-matter convierte una fecha YAML sin comillas en Date.
  const date =
    raw.date instanceof Date
      ? raw.date.toISOString().slice(0, 10)
      : typeof raw.date === "string"
        ? raw.date
        : fail(file, 'falta el campo obligatorio "date" (ISO, YYYY-MM-DD).');

  if (Number.isNaN(Date.parse(date))) {
    fail(file, `"date" no es una fecha válida: ${date}`);
  }

  if (
    !Array.isArray(raw.tags) ||
    raw.tags.length === 0 ||
    !raw.tags.every((tag) => typeof tag === "string")
  ) {
    fail(file, 'falta el campo obligatorio "tags" (lista de textos no vacía).');
  }

  if (raw.draft !== undefined && typeof raw.draft !== "boolean") {
    fail(file, '"draft" debe ser true o false.');
  }

  return {
    title: raw.title as string,
    summary: raw.summary as string,
    date,
    tags: raw.tags as string[],
    draft: raw.draft === true,
  };
}

function readFile(slug: string, locale: Locale): CaseStudy {
  const relative = path.join("content", "case-studies", slug, `${locale}.mdx`);
  const absolute = path.join(CONTENT_DIR, slug, `${locale}.mdx`);

  if (!fs.existsSync(absolute)) {
    fail(
      relative,
      `no existe. Cada caso necesita un archivo por idioma (${LOCALES.join(", ")}).`,
    );
  }

  const { data, content } = matter(fs.readFileSync(absolute, "utf8"));
  const frontmatter = parseFrontmatter(relative, data);

  return {
    slug,
    locale,
    frontmatter,
    body: content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

function listSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

/**
 * Lee todos los casos del idioma pedido, ordenados por fecha descendente.
 * Valida las dos versiones de cada caso, así que un error en el español rompe
 * el build aunque se esté construyendo el índice en inglés.
 */
export function getCaseStudies(
  locale: Locale,
  { includeDrafts = false } = {},
): CaseStudy[] {
  const studies = listSlugs().map((slug) => {
    const versions = LOCALES.map((l) => readFile(slug, l));
    const drafts = new Set(versions.map((v) => v.frontmatter.draft));

    if (drafts.size > 1) {
      fail(
        path.join("content", "case-studies", slug),
        '"draft" no coincide entre idiomas. Un caso se publica en los dos a la vez.',
      );
    }

    return versions.find((v) => v.locale === locale)!;
  });

  return studies
    .filter((study) => includeDrafts || !study.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getCaseStudy(slug: string, locale: Locale): CaseStudy | null {
  if (!listSlugs().includes(slug)) return null;
  return readFile(slug, locale);
}

/** Casos publicados anterior y siguiente, en el orden del índice. */
export function getAdjacentCaseStudies(slug: string, locale: Locale) {
  const published = getCaseStudies(locale);
  const index = published.findIndex((study) => study.slug === slug);

  return {
    previous: index > 0 ? published[index - 1] : null,
    next:
      index !== -1 && index < published.length - 1 ? published[index + 1] : null,
  };
}
