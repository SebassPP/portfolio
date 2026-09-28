"use client";

import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

type ThemeToggleProps = {
  toDarkLabel: string;
  toLightLabel: string;
};

export function ThemeToggle({ toDarkLabel, toLightLabel }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    const supportsViewTransition = typeof document.startViewTransition === "function";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const { x, y } =
      event.detail === 0
        ? (() => {
            const rect = event.currentTarget.getBoundingClientRect();
            return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
          })()
        : { x: event.clientX, y: event.clientY };

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-toggle-x", `${x}px`);
    root.style.setProperty("--theme-toggle-y", `${y}px`);
    root.style.setProperty("--theme-toggle-r", `${radius}px`);

    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
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
