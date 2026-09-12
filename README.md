# Portafolio de Sebastián Pardo

Sitio personal y casos de estudio técnicos de Sebastián Pardo, ingeniero backend
y DevOps. Next.js (App Router) + Tailwind + MDX, desplegado en Vercel. Sin CMS,
sin base de datos, sin backend: publicar es hacer un commit.

Inglés en `/`, español en `/es`. Tema claro y oscuro.

## Correr el proyecto

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` es la URL pública del sitio, sin barra final. De ahí salen
`metadataBase`, el sitemap, los canonical, el hreflang y Open Graph; el dominio
nunca se escribe fijo en el código. En Vercel se define como variable de entorno
del proyecto: al conectar un dominio propio, se cambia solo ese valor.

```bash
npm run build && npm run start   # build de producción
npm run lint
```

## Añadir un caso de estudio

1. Crear la carpeta `content/case-studies/<slug>/`. El slug va en kebab-case, en
   inglés, y no se renombra nunca después de publicar.
2. Crear **los dos** archivos: `en.mdx` y `es.mdx`. Si falta uno, el build falla.
3. Frontmatter obligatorio en ambos:

   ```yaml
   ---
   title: "Docker Swarm in production: when not to use Kubernetes"
   summary: "Dos líneas. Qué va a aprender quien lea, no un teaser."
   date: 2026-10-01
   tags: [docker-swarm, aws, ci-cd]
   draft: true
   ---
   ```

   Si falta un campo o tiene el tipo equivocado, el build falla indicando el
   archivo y el campo. El tiempo de lectura se calcula solo; no se escribe.
4. Imágenes y diagramas del caso en `public/case-studies/<slug>/`. SVG con
   `currentColor` cuando se pueda, para que respeten el tema.
5. Publicar: poner `draft: false` en los dos idiomas a la vez. El valor debe
   coincidir entre `en.mdx` y `es.mdx` o el build falla.

Mientras `draft` sea `true`, el caso tiene URL directa (útil para revisarlo) pero
no aparece en el índice, la landing, el sitemap ni la navegación anterior/siguiente,
y la página se sirve con `noindex`.

`content/case-studies/example/` es una prueba del pipeline, no contenido. Se borra
cuando se publique el primer caso real.

## Estructura

```
app/[locale]/          rutas (layout raíz, landing, casos de estudio)
proxy.ts               reescribe / → /en y redirige /en/... a la ruta limpia
components/            un componente por archivo
lib/                   contenido, i18n, rutas, metadata, fuentes, perfil
messages/              textos de interfaz en.json / es.json
content/case-studies/  los casos, un archivo por idioma
docs/                  documentos de planeación y de identidad visual
```

Los datos del perfil (experiencia, enlaces, casos en escritura) viven en
`lib/profile.ts`. Los textos de interfaz en `messages/`. `lib/i18n.ts` tipa las
claves a partir del diccionario inglés: una clave inexistente o una traducción
que falte rompen la compilación.

## Imagen de Open Graph

`public/og.png` se genera con `node scripts/generate-og.mjs` y se commitea. No hay
generación dinámica de OG.
