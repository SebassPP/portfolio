import localFont from "next/font/local";

/**
 * Mismos archivos que expone el paquete `geist`, declarados aquí para poder
 * controlar el preload. Fuentes locales: ninguna petición externa.
 */
export const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
  // Solo se usa en fechas, tags y código: no debe competir con el primer
  // render. Sin preload baja 71 kB de la ruta crítica.
  preload: false,
});
