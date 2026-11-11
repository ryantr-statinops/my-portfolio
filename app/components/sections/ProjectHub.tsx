import { useEffect, useRef, useState } from "react";
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
        {project.stack.map((technology, index) => <li key={`${technology}-${index}`} className="max-w-full rounded border border-border/80 bg-surface/50 px-3 py-1 font-mono text-xs text-muted hover:border-accent hover:text-accent transition-colors">{technology}</li>)}
      </ul>}
      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border/80 px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-foreground transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        View repository <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
}

export default function ProjectHub({ projects }: Props) {
  const listRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const visible = projectsForCategory(projects, category);
  const selected = resolveSelectedProject(visible, selectedId);
  const featured = projects.find((p) => p.id === "homematch") || projects[0];
  useEffect(() => setReady(true), []);

  useEffect(() => {
    const list = listRef.current;
    const button = list?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (!list || !button) return;
    const viewport = list.getBoundingClientRect();
    const item = button.getBoundingClientRect();
    if (item.top < viewport.top) list.scrollTop -= viewport.top - item.top;
    else if (item.bottom > viewport.bottom) list.scrollTop += item.bottom - viewport.bottom;
  }, [ready, category, selected?.id]);

  function selectProject(id: string) {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      }));
    }
  }


  function selectCategory(next: ProjectCategory) {
    const nextProjects = projectsForCategory(projects, next);
    setSelectedId(resolveSelectedProject(nextProjects, selected?.id ?? null)?.id ?? null);
    setCategory(next);
  }

  return (
    <section id="projects" data-project-hub aria-labelledby="project-hub-title" className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <span id="intelligence-hub" aria-hidden="true" className="absolute left-0 top-0" />
      <div className="w-full space-y-6 sm:space-y-8">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 id="project-hub-title" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Projects
            </h2>
            <span className="text-xs font-mono text-muted">{projects.length} Repositories</span>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Explore projects by domain, read the overview and browse the source repository.
          </p>
        </header>

        {/* Featured Project Showcase Banner */}
        {featured && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
                Featured Work
              </h3>
              <span className="text-xs font-mono text-accent">Flagship Platform</span>
            </div>
            <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6 transition-all hover:border-accent/40">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {CATEGORY_MAP[featured.category]}
                </span>
                <ProjectStatusBadge status={featured.status} />
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {featured.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                {featured.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {featured.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border/70 bg-background/60 px-2.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                <a
                  href={featured.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 font-mono text-xs font-bold text-background transition-all hover:scale-105 hover:bg-foreground/90"
                >
                  View repository <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </article>
          </div>
        )}

        {ready && <div role="group" aria-label="Project categories" className="mb-8 flex flex-wrap gap-2">
          {([['all', 'All'], ...Object.entries(CATEGORY_MAP)] as [ProjectCategory, string][]).map(([id, label]) => <button key={id} type="button" data-project-category={id} aria-pressed={category === id} onClick={() => selectCategory(id)} className="info-box info-box--filter info-box--interactive min-h-11 max-w-full text-left font-mono text-xs">{label}</button>)}
        </div>}
        {visible.length === 0 ? <p data-project-empty role="status" className="info-box info-box--panel text-sm text-muted">{projects.length === 0 ? "Projects are being prepared." : "No projects in this category yet."}</p> : ready ? <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
          <nav ref={listRef} aria-label="Choose a project" className="info-box info-box--scroll-list h-[min(240px,40svh)] lg:h-[min(480px,60svh)]">
            <ul className="space-y-2 p-3">{visible.map((project) => <li key={project.id}><button type="button" data-project-select={project.id} aria-pressed={selected?.id === project.id} aria-controls="project-overview-panel" onClick={() => selectProject(project.id)} className="info-box info-box--compact info-box--interactive min-h-11 w-full break-words text-left text-sm"><span className="flex flex-wrap items-center justify-between gap-3"><span data-project-title>{project.title}</span><ProjectStatusBadge status={project.status} /></span></button></li>)}</ul>
          </nav>
          <div ref={panelRef} id="project-overview-panel" aria-live="polite" aria-atomic="true" className="info-box info-box--panel scroll-mt-24 lg:h-[min(480px,60svh)] lg:overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]">{selected && <ProjectOverviewPanel project={selected} />}</div>
        </div> : <div data-project-fallback className="space-y-6">{visible.map((project) => <div key={project.id} className="info-box info-box--panel"><ProjectOverviewPanel project={project} /></div>)}</div>}
      </div>
    </section>
  );
}
