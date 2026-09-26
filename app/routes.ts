import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { projectRouteSlugs } from "./data/projects";

export default [
  index("routes/home.tsx"),
  route("projects/", "routes/projects.tsx"),
  ...(projectRouteSlugs.length ? [route("projects/:slug/", "routes/project.tsx")] : []),
] satisfies RouteConfig;
