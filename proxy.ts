import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/lib/routes";

/**
 * El inglés se sirve sin prefijo: `/case-studies` se reescribe internamente a
 * `/en/case-studies` (rewrite, no redirect, para que la URL quede limpia).
 * `/es/...` pasa tal cual. `/en/...` sí redirige, para que cada página tenga
 * una sola URL pública.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Fuera: rutas de api, internos de Next y cualquier archivo con extensión.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
