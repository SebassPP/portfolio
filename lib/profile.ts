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
  /** En `public/`, servido tal cual. */
  cvUrl: "/sebastian-pardo-cv.pdf",
} as const;

/**
 * Secciones ocultas temporalmente: el código y los datos se quedan, solo no
 * se renderizan. Reactivar es cambiar este valor a `true`.
 */
export const SHOW_PROJECTS = false;

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
  /**
   * Borrador armado con los hechos de docs/01-perfil-profesional.md y lo
   * confirmado en conversación. Pendiente de pasar por la voz de Sebastián.
   */
  description: { en: string; es: string };
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
    description: {
      en: "I lead backend development and infrastructure for a multi-tenant school transportation platform — GPS tracking, access control, and school management for ~2,000 active users across 5 schools, with Docker Swarm and CI/CD on AWS.",
      es: "Lidero el desarrollo backend y la infraestructura de una plataforma multi-tenant de transporte escolar — tracking GPS, control de acceso y gestión escolar para ~2.000 usuarios activos en 5 colegios, con Docker Swarm y CI/CD en AWS.",
    },
  },
  {
    id: "paramo-programing",
    role: "Backend & DevOps Engineer (Freelance)",
    company: "Páramo Programing",
    start: "2026-01",
    end: null,
    url: "https://paramoprograming.com/",
    tags: ["Next.js", "Docker Swarm", "Nginx", "CI/CD"],
    description: {
      en: "Freelance backend & DevOps engineer for external clients — end-to-end delivery from architecture to deployment and operation, including full DevOps setups taken from an empty server to production.",
      es: "Ingeniero backend y DevOps freelance para clientes externos — entrega de punta a punta, desde la arquitectura hasta el despliegue y la operación, incluyendo montajes de DevOps completos desde un servidor vacío hasta producción.",
    },
  },
  {
    id: "domo-i",
    role: "Innovation Intern",
    company: "Domo i",
    start: "2025-07",
    end: "2026-01",
    url: "https://www.grupobolivar.com.co/",
    tags: ["Design Thinking", "SIT", "User Research"],
    description: {
      en: "Domo i is the innovation hub of Grupo Bolívar–Davivienda, one of Colombia's largest financial and business groups. I applied research, design thinking, and the SIT method to explore opportunities and build user-centered solutions alongside multidisciplinary teams across the group.",
      es: "Domo i es el centro de innovación de Grupo Bolívar–Davivienda, uno de los grupos financieros y empresariales más grandes de Colombia. Apliqué metodologías de research, design thinking y el método SIT para explorar oportunidades y desarrollar soluciones centradas en el usuario, junto a equipos multidisciplinares de todo el grupo.",
    },
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
