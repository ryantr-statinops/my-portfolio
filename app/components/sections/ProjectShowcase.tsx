import type { Project } from "../../data/project-schema";
import ProjectCard from "./ProjectCard";

type Props = {
  projects: Project[];
  limit?: number;
};

export default function ProjectShowcase({ projects, limit = 6 }: Props) {
  const visible = projects.slice(0, limit);
  return (
    <section id="projects" className="flex min-h-screen items-center border-y border-border bg-transparent px-8 py-20 reveal md:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4"><div className="flex items-center gap-2"><span className="h-px w-8 bg-primary/50" /><span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Audit_Asset_Log</span></div><h2 className="text-5xl font-bold uppercase leading-none tracking-tighter md:text-7xl">PROJECT.<br /><span className="text-primary">REGISTRY_</span></h2></div>
          <div className="flex items-center gap-3"><span className="rounded border border-border bg-foreground/5 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-muted">Index: BY_PRIORITY</span></div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" data-filter-surface="showcase">
          {visible.map((project) => <ProjectCard key={project.routeSlug} project={project} />)}
          <p data-filter-empty hidden className="col-span-full py-12 text-center font-mono text-xs uppercase tracking-widest text-muted">No systems match the active filter.</p>
        </div>
        {projects.length > 3 && <div className="mt-12 flex justify-center"><a href="#projects" className="border-b border-border pb-1 font-mono text-[10px] uppercase tracking-[0.4em] text-muted transition-colors hover:border-primary hover:text-primary">[ VIEW_SELECTED_SYSTEMS ]</a></div>}
      </div>
    </section>
  );
}
