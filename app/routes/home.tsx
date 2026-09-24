import AboutMe from "../components/sections/AboutMe";
import Hero from "../components/sections/Hero";
import IntelligenceHub from "../components/sections/IntelligenceHub";
import ProjectShowcase from "../components/sections/ProjectShowcase";
import { orderedProjects } from "../data/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="about-me" className="flex min-h-screen items-center border-t border-border/30 bg-transparent">
        <AboutMe />
      </section>
      <section id="intelligence-hub" className="flex min-h-screen items-center overflow-hidden border-t border-border/30 bg-transparent">
        <div className="w-full"><IntelligenceHub projects={orderedProjects} /></div>
      </section>
      <ProjectShowcase projects={orderedProjects} limit={6} />
    </>
  );
}
