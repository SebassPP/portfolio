import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { geistMono, geistSans } from "@/lib/fonts";
import { resolveLocale } from "@/lib/params";
import { LOCALES } from "@/lib/routes";
import { siteUrl } from "@/lib/site";
import "../globals.css";

export const metadata = {
  metadataBase: new URL(siteUrl),
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
