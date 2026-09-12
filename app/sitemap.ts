import type { MetadataRoute } from "next";

import { getCaseStudies } from "@/lib/content";
import { DEFAULT_LOCALE, LOCALES, localizedPath } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

/** Ambos idiomas de cada ruta publicada. Los borradores quedan fuera. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/case-studies",
    ...getCaseStudies(DEFAULT_LOCALE).map(
      (study) => `/case-studies/${study.slug}`,
    ),
  ];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, absoluteUrl(localizedPath(l, path))]),
        ),
      },
    })),
  );
}
