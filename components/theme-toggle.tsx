"use client";

import { useTheme } from "next-themes";

type ThemeToggleProps = {
  /** "Switch to dark theme" — se anuncia cuando el tema actual es claro. */
  toDarkLabel: string;
  /** "Switch to light theme" — se anuncia cuando el tema actual es oscuro. */
  toLightLabel: string;
};

/**
 * El icono y la etiqueta se eligen con la clase .dark en CSS, no con estado de
 * React: así no hay parpadeo ni desajuste de hidratación en el primer render.
 */
export function ThemeToggle({ toDarkLabel, toLightLabel }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="-m-2.5 flex size-11 items-center justify-center rounded-sm text-fg-muted transition-colors hover:text-accent"
    >
      <span className="sr-only dark:hidden">{toDarkLabel}</span>
      <span className="sr-only hidden dark:block">{toLightLabel}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[18px] dark:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden size-[18px] dark:block"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
      </svg>
    </button>
  );
}
