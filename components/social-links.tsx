import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";
import type { Locale } from "@/lib/routes";

const ICONS = {
  github: (
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.73c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.35 9.35 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .28.18.6.69.5A10.27 10.27 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  ),
  linkedin: (
    <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.93h3.4V21H3.3V8.93Zm5.56 0h3.26v1.65h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.22V21h-3.4v-5.28c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-3.4V8.93Z" />
  ),
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  email: (
    <path d="M3 5.5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.9 2L12 13l8.1-5.5" />
  ),
} as const;

const OUTLINE_ICONS = new Set<keyof typeof ICONS>(["email", "instagram"]);

function Icon({ name }: { name: keyof typeof ICONS }) {
  const isOutline = OUTLINE_ICONS.has(name);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={isOutline ? "none" : "currentColor"}
      stroke={isOutline ? "currentColor" : "none"}
      strokeWidth={isOutline ? 1.5 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {ICONS[name]}
    </svg>
  );
}

/** GitHub / LinkedIn / correo. SVG inline, sin librería de íconos. */
export function SocialLinks({ locale }: { locale: Locale }) {
  const links = [
    PROFILE.githubUrl && {
      name: "github" as const,
      href: PROFILE.githubUrl,
      label: t(locale, "social.github"),
    },
    {
      name: "linkedin" as const,
      href: PROFILE.linkedinUrl,
      label: t(locale, "social.linkedin"),
    },
    PROFILE.instagramUrl && {
      name: "instagram" as const,
      href: PROFILE.instagramUrl,
      label: t(locale, "social.instagram"),
    },
    PROFILE.email && {
      name: "email" as const,
      href: `mailto:${PROFILE.email}`,
      label: t(locale, "social.email"),
    },
  ].filter((link) => link !== null);

  return (
    <ul className="-ml-2.5 flex items-center">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-sm text-fg-muted transition-colors hover:text-accent"
          >
            <span className="sr-only">{link.label}</span>
            <Icon name={link.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
