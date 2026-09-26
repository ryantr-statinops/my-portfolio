import rawProjects from "./projects.json";
import { projectCatalogSchema } from "./project-schema";

export const projects = projectCatalogSchema.parse(rawProjects);
