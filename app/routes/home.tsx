import { useState } from "react";
import type { MetaFunction } from "react-router";
import { SITE } from "../../src/lib/constants";
import AboutMe from "../components/sections/AboutMe";
import Hero from "../components/sections/Hero";
import IntelligenceHub from "../components/sections/IntelligenceHub";
import ProjectShowcase from "../components/sections/ProjectShowcase";
import ProjectFilter from "../components/interactive/ProjectFilter";
import { filterProjects } from "../data/project-filter";
import { orderedProjects } from "../data/projects";

const canonical = `${SITE.site}${SITE.base}/`;

export const meta: MetaFunction = () => [
  { title: SITE.title },
  { name: "description", content: SITE.description },
  { tagName: "link", rel: "canonical", href: canonical },
  { property: "og:url", content: canonical },
  { property: "og:image", content: `${SITE.site}${SITE.base}/images/avt.webp` },
  { name: "twitter:image", content: `${SITE.site}${SITE.base}/images/avt.webp` },
];

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
