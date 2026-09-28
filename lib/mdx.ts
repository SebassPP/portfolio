import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import type { PluggableList } from "unified";

const options: Options = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
};

export const rehypePlugins: PluggableList = [[rehypePrettyCode, options]];
