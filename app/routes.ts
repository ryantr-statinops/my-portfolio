import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects/", "routes/projects.tsx"),
  route("projects/:slug/", "routes/project.tsx"),
] satisfies RouteConfig;
