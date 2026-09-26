import { useEffect, useState } from "react";
import { CATEGORY_MAP } from "../../../src/lib/constants";
import { projectsForCategory, resolveSelectedProject, type ProjectCategory } from "../../data/project-hub";
import type { ProjectOverview } from "../../data/project-schema";

import ProjectStatusBadge from "../ProjectStatusBadge";

type Props = { projects: readonly ProjectOverview[] };

function ProjectOverviewPanel({ project }: { project: ProjectOverview }) {
  return (
    <article data-project-overview className="min-w-0 space-y-6 break-words">
      <div className="flex flex-wrap items-center gap-3"><p className="font-mono text-xs uppercase tracking-widest text-muted">{CATEGORY_MAP[project.category]}</p><ProjectStatusBadge status={project.status} /></div>
      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h3>
      <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{project.description}</p>
      {project.stack.length > 0 && <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
        {project.stack.map((technology, index) => <li key={`${technology}-${index}`} className="max-w-full rounded border border-border px-3 py-1 font-mono text-xs">{technology}</li>)}
      </ul>}
      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded border border-primary px-4 py-3 text-sm font-semibold transition-colors hover:bg-primary hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        View repository <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
}

export default function ProjectHub({ projects }: Props) {
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const visible = projectsForCategory(projects, category);
  const selected = resolveSelectedProject(visible, selectedId);
  useEffect(() => setReady(true), []);

  function selectCategory(next: ProjectCategory) {
    const nextProjects = projectsForCategory(projects, next);
    setSelectedId(resolveSelectedProject(nextProjects, selected?.id ?? null)?.id ?? null);
    setCategory(next);
  }

  return (
    <section id="projects" data-project-hub aria-labelledby="project-hub-title" className="relative min-h-screen w-full border-t border-border/30 px-6 py-20 md:px-12">
      <span id="intelligence-hub" aria-hidden="true" className="absolute left-0 top-0" />
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">02 / Selected work</p>
          <h2 id="project-hub-title" className="text-4xl font-bold uppercase tracking-tight md:text-6xl">Project Hub.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">Explore projects by domain, read the overview and browse the source repository.</p>
        </header>
        {ready && <div role="group" aria-label="Project categories" className="mb-8 flex flex-wrap gap-2">
          {([['all', 'All'], ...Object.entries(CATEGORY_MAP)] as [ProjectCategory, string][]).map(([id, label]) => <button key={id} type="button" data-project-category={id} aria-pressed={category === id} onClick={() => selectCategory(id)} className="min-h-11 max-w-full rounded border border-border bg-background/35 px-4 py-3 text-left font-mono text-xs backdrop-blur-md transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-background">{label}</button>)}
        </div>}
        {visible.length === 0 ? <p data-project-empty role="status" className="rounded-xl border border-border bg-background/30 px-6 py-12 text-sm text-muted backdrop-blur-md">{projects.length === 0 ? "Projects are being prepared." : "No projects in this category yet."}</p> : ready ? <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
          <nav aria-label="Choose a project" className="min-w-0">
            <ul className="space-y-2">{visible.map((project) => <li key={project.id}><button type="button" data-project-select={project.id} aria-pressed={selected?.id === project.id} aria-controls="project-overview-panel" onClick={() => setSelectedId(project.id)} className="min-h-11 w-full break-words rounded border border-border bg-background/35 px-5 py-4 text-left text-sm backdrop-blur-md hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-background"><span className="flex flex-wrap items-center justify-between gap-3"><span data-project-title>{project.title}</span><ProjectStatusBadge status={project.status} /></span></button></li>)}</ul>
          </nav>
          <div id="project-overview-panel" aria-live="polite" aria-atomic="true" className="min-w-0 rounded-xl border border-border bg-background/30 p-6 backdrop-blur-md md:p-8">{selected && <ProjectOverviewPanel project={selected} />}</div>
        </div> : <div data-project-fallback className="space-y-6">{visible.map((project) => <div key={project.id} className="rounded-xl border border-border bg-background/30 p-6"><ProjectOverviewPanel project={project} /></div>)}</div>}
      </div>
    </section>
  );
}
