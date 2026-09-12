import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import type { PluggableList } from "unified";

/**
 * Resaltado con Shiki en build. Los dos temas se emiten como variables CSS y
 * `globals.css` elige uno según la clase `.dark`: cero JavaScript en cliente.
 */
const options: Options = {
  theme: { light: "github-light", dark: "github-dark" },
  // El fondo lo pone el tema del sitio (--bg-elevated), no Shiki.
  keepBackground: false,
};

export const rehypePlugins: PluggableList = [[rehypePrettyCode, options]];
