import { useState } from "react";
import AboutMe from "../components/sections/AboutMe";
import Hero from "../components/sections/Hero";
import IntelligenceHub from "../components/sections/IntelligenceHub";
import ProjectShowcase from "../components/sections/ProjectShowcase";
import ProjectFilter from "../components/interactive/ProjectFilter";
import { filterProjects } from "../data/project-filter";
import { orderedProjects } from "../data/projects";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const visibleProjects = filterProjects(orderedProjects, selectedCategories);

  return (
    <>
      <Hero />
      <section id="about-me" className="flex min-h-screen items-center border-t border-border/30 bg-transparent">
        <AboutMe />
      </section>
      <section id="intelligence-hub" className="flex min-h-screen items-center overflow-hidden border-t border-border/30 bg-transparent">
        <div className="w-full">
          <div className="mx-auto mb-4 flex max-w-7xl justify-end px-4 md:px-6"><ProjectFilter selectedCategories={selectedCategories} onChange={setSelectedCategories} /></div>
          <IntelligenceHub projects={visibleProjects} />
        </div>
      </section>
      <ProjectShowcase projects={visibleProjects} limit={6} />
    </>
  );
}
