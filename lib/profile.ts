/**
 * Datos reales del perfil, tal cual `docs/01-perfil-profesional.md`.
 * Lo que no esté confirmado va como TODO visible, nunca inventado.
 */

export const PROFILE = {
  name: "Sebastián Pardo",
  linkedinUrl: "https://www.linkedin.com/in/juan-sebastian-pardo-parra",
  githubUrl: "https://github.com/SebassPP",
  instagramUrl: "https://instagram.com/sebzzpp",
  email: "sebastianpardo0316@gmail.com",
  /** E.164, para el link `tel:`. */
  phone: "+573105773241",
  phoneDisplay: "+57 310 577 3241",
  repoUrl: "https://github.com/SebassPP/portfolio",
} as const;

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  /** `YYYY-MM` o `YYYY`. */
  start: string;
  /** `YYYY-MM`, `YYYY` o `null` cuando sigue vigente. */
  end: string | null;
  /** URL oficial de la empresa, o `null` mientras no esté confirmada. */
  url: string | null;
  tags: readonly string[];
};

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: "bo-tech",
    role: "Technical Lead & Backend Developer",
    company: "BO-TECH",
    start: "2025-02",
    end: null,
    url: "https://www.botech.com.co/",
    tags: ["Java 17", "Spring Boot 3", "Docker Swarm", "AWS", "PostgreSQL"],
  },
  {
    id: "paramo-programing",
    role: "Co-owner & Software Engineer",
    company: "Páramo Programing",
    start: "2026-01",
    end: null,
    url: "https://paramoprograming.com/",
    tags: ["Next.js", "Docker Swarm", "Nginx", "CI/CD"],
  },
  {
    id: "domo-i",
    role: "Innovation Intern",
    company: "Domo i",
    start: "2025-07",
    end: "2026-01",
    url: null,
    tags: ["Design Thinking", "SIT", "User Research"],
  },
];

export type ProjectEntry = {
  id: string;
  /** URL de la web real del cliente, o `null` mientras no esté confirmada. */
  url: string | null;
  /** Captura en `public/projects/<id>.png`, o `null` mientras no exista. */
  screenshot: string | null;
  tags: readonly string[];
};

// TODO(sebastián): confirmar qué frontends de clientes se pueden mostrar.
export const PROJECTS: readonly ProjectEntry[] = [
  { id: "project-1", url: null, screenshot: null, tags: [] },
  { id: "project-2", url: null, screenshot: null, tags: [] },
];

/**
 * Títulos de los casos en escritura (prioridad alta de `docs/04-casos-de-estudio.md`).
 * Se muestran como "Coming soon", sin link, hasta que exista el MDX.
 */
export const UPCOMING_CASE_STUDIES: readonly {
  id: string;
  title: { en: string; es: string };
}[] = [
  {
    id: "docker-swarm-in-production",
    title: {
      en: "Docker Swarm in production: when not using Kubernetes makes sense",
      es: "Docker Swarm en producción: cuándo tiene sentido no usar Kubernetes",
    },
  },
  {
    id: "multi-tenant-architecture",
    title: {
      en: "Multi-tenant architecture for a school transport platform",
      es: "Arquitectura multi-tenant para una plataforma de transporte escolar",
    },
  },
  {
    id: "firestore-multi-tenant-migration",
    title: {
      en: "Migrating to multi-tenant Firestore with historical data",
      es: "Migración a Firestore multi-tenant con datos históricos",
    },
  },
];
