import type { ProjectOverview } from "../../app/data/project-schema";

export const fixtureProjects: ProjectOverview[] = [
  { id: "software-later", title: "Software Later", description: "Overview of the later software project.", category: "software-engineering", priority: 20, stack: ["TypeScript", "React"], links: { github: "https://github.com/example/software-later" } },
  { id: "data-first", title: "Data First", description: "Overview of the first data engineering project.", category: "data-engineering", priority: 1, stack: ["SQL", "Python"], links: { github: "https://github.com/example/data-first" } },
  { id: "software-first", title: "Software First", description: "Overview of the first software engineering project.", category: "software-engineering", priority: 10, stack: ["Go"], links: { github: "https://github.com/example/software-first" } },
];
