/**
 * Única lectura de la URL base del sitio. Durante la construcción el sitio vive
 * en *.vercel.app; el dominio propio se conecta cambiando solo esta variable.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
