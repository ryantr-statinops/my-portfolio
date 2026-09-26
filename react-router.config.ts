import { projectRouteSlugs } from "./app/data/projects";
import type { Config } from "@react-router/dev/config";

export default {
  basename: "/my-portfolio/",
  ssr: false,
  prerender: [
    "/",
    "/projects",
    ...projectRouteSlugs.map((slug) => `/projects/${slug}`),
  ],
} satisfies Config;
