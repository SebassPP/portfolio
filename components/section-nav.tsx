"use client";

import { useEffect, useState } from "react";

type SectionNavProps = {
  label: string;
  sections: readonly { id: string; label: string }[];
};

/**
 * Resalta la sección visible. Único JavaScript de la landing.
 */
export function SectionNav({ label, sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element) => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // Franja alta del viewport (10%–30%): la sección activa es la que el
      // lector acaba de alcanzar. Centrarla haría que al inicio de la página
      // ya apareciese resaltada la segunda sección.
      { rootMargin: "-10% 0px -70% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label}>
      <ul className="flex flex-col">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex h-11 items-center rounded-sm text-sm transition-colors hover:text-accent ${
                  isActive ? "text-accent" : "text-fg-muted"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
