import { useState } from "react";
import type { MetaFunction } from "react-router";
import ProjectFilter from "../components/interactive/ProjectFilter";
import PortfolioRegistry from "../components/sections/PortfolioRegistry";
import { filterProjects } from "../data/project-filter";
import { orderedProjects } from "../data/projects";

export const meta: MetaFunction = () => [
  { title: "Project Registry | Ryan Tran" },
  { name: "description", content: "A structured registry of Ryan Tran's documented systems, quantitative work and infrastructure projects." },
  { tagName: "link", rel: "canonical", href: "https://ryantr-statinops.github.io/my-portfolio/projects/" },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://ryantr-statinops.github.io/my-portfolio/projects/" },
  { property: "og:title", content: "Project Registry | Ryan Tran" },
  { name: "twitter:title", content: "Project Registry | Ryan Tran" },
];

export default function Projects() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const visibleProjects = filterProjects(orderedProjects, selectedCategories);

  return (
    <div className="min-h-screen bg-background pt-24">
      <header className="mx-auto mb-8 max-w-[1600px] px-6 md:px-10">
        <div className="border-b border-primary/20 pb-4"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Portfolio_Inventory</p><h1 className="text-3xl font-bold uppercase tracking-tighter md:text-5xl">Project Registry</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">Browse the documented systems by domain, stack and operational impact.</p><div className="mt-6"><ProjectFilter selectedCategories={selectedCategories} onChange={setSelectedCategories} /></div></div>
      </header>
      <PortfolioRegistry projects={visibleProjects} />
    </div>
  );
}
