import { useState } from "react";
import type { MetaFunction } from "react-router";
import { SITE } from "../../src/lib/constants";
import ProjectFilter from "../components/interactive/ProjectFilter";
import SystemTerminal from "../components/interactive/SystemTerminal";
import PortfolioRegistry from "../components/sections/PortfolioRegistry";
import { filterProjects } from "../data/project-filter";
import { orderedProjects } from "../data/projects";

const canonical = `${SITE.site}${SITE.base}/projects/`;

export const meta: MetaFunction = () => [
  { title: "Project Registry | Ryan Tran" },
  { name: "description", content: "A structured registry of Ryan Tran's documented systems, quantitative work and infrastructure projects." },
  { tagName: "link", rel: "canonical", href: canonical },
  { property: "og:type", content: "website" },
  { property: "og:url", content: canonical },
  { property: "og:title", content: "Project Registry | Ryan Tran" },
  { name: "twitter:title", content: "Project Registry | Ryan Tran" },
];

export default function Projects() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const visibleProjects = filterProjects(orderedProjects, selectedCategories);
  const terminalCommands = [
    { input: "neofetch", output: "Runtime: Static Portfolio\nHost: GitHub Pages\nBuild: React + TypeScript\nContent: Markdown + Zod\nStyle: Tailwind CSS 4\nMode: Static Generation" },
    { input: "ls /projects", output: orderedProjects.map((project) => `${project.category.padEnd(22, " ")} ${project.routeSlug}`).join("\n") },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      <header className="mx-auto mb-8 max-w-[1600px] px-6 md:px-10">
        <div className="border-b border-primary/20 pb-4"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Portfolio_Inventory</p><h1 className="text-3xl font-bold uppercase tracking-tighter md:text-5xl">Project Registry</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">Browse the documented systems by domain, stack and operational impact.</p><div className="mt-6"><ProjectFilter selectedCategories={selectedCategories} onChange={setSelectedCategories} /></div></div>
      </header>
      <section className="mx-auto mb-8 max-w-[1600px] px-6 md:px-10" aria-labelledby="runtime-terminal-title"><div className="mb-3 flex items-center gap-2"><span className="h-px w-6 bg-primary" /><h2 id="runtime-terminal-title" className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Portfolio_Runtime_Terminal</h2></div><SystemTerminal commands={terminalCommands} /></section>
      <PortfolioRegistry projects={visibleProjects} />
    </div>
  );
}
