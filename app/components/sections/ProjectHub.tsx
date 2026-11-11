import { useEffect, useRef, useState } from "react";
import { CATEGORY_MAP } from "../../../src/lib/constants";
import { projectsForCategory, resolveSelectedProject, type ProjectCategory } from "../../data/project-hub";
import type { ProjectOverview } from "../../data/project-schema";

import ProjectStatusBadge from "../ProjectStatusBadge";

type Props = {
  projects: readonly ProjectOverview[];
  defaultExpanded?: boolean;
};

function ProjectOverviewPanel({ project }: { project: ProjectOverview }) {
  return (
    <article data-project-overview className="min-w-0 space-y-4 break-words">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">{CATEGORY_MAP[project.category]}</p>
        <ProjectStatusBadge status={project.status} />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{project.title}</h3>
      <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-muted">{project.description}</p>
      {project.stack.length > 0 && (
        <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((technology, index) => (
            <li
              key={`${technology}-${index}`}
              className="max-w-full rounded border border-border/80 bg-background/60 px-2.5 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {technology}
            </li>
          ))}
        </ul>
      )}
      <div className="pt-2">
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 font-mono text-xs font-bold text-background transition-all hover:scale-105 hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          View repository <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

const FEATURED_IDS = ["factorsbt", "lattice-terminal", "fundamental-ranking-lab"] as const;

export default function ProjectHub({ projects, defaultExpanded = false }: Props) {
  const listRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const visible = projectsForCategory(projects, category);
  const selected = resolveSelectedProject(visible, selectedId);
  const featuredProjects = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter((p): p is ProjectOverview => Boolean(p));
  const count = featuredProjects.length || 1;
  const currentFeatured = featuredProjects[featuredIndex % count] ?? projects[0];

  useEffect(() => {
    setReady(true);
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#projects") {
        setIsExpanded(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("popstate", checkHash);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("popstate", checkHash);
    };
  }, []);

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
    <section id="projects" data-project-hub aria-labelledby="project-hub-title" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
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

        {/* Featured Work Showcase - Compact Flagship Card */}
        {currentFeatured && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
                Featured Work
              </h3>
              <span className="text-xs font-mono text-accent">Flagship Spotlight</span>
            </div>

            <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-5 transition-all hover:border-accent/40 shadow-sm">
              {/* Header: Category + Flagship tag + Status + Interactive Tab Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {CATEGORY_MAP[currentFeatured.category]}
                  </span>
                  <span className="rounded-full bg-accent/10 border border-accent/25 px-2 py-0.5 font-mono text-[10px] text-accent font-medium">
                    FLAGSHIP 0{featuredIndex + 1}
                  </span>
                  <ProjectStatusBadge status={currentFeatured.status} />
                </div>

                {/* Tab Navigation Pill Switcher */}
                <div
                  className="flex items-center gap-1 rounded-full border border-border/70 bg-background/60 p-0.5"
                  role="tablist"
                  aria-label="Featured projects navigation"
                >
                  {featuredProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === featuredIndex}
                      aria-label={`Show ${p.title}`}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-medium transition-all cursor-pointer ${
                        idx === featuredIndex
                          ? "bg-foreground text-background font-bold shadow-sm"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      0{idx + 1}<span className="hidden sm:inline"> {p.title.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Content Body */}
              <div
                key={currentFeatured.id}
                className="pt-3.5 space-y-2.5 transition-all duration-300 ease-out animate-in fade-in"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {currentFeatured.title}
                  </h3>
                  <a
                    href={currentFeatured.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 shrink-0 items-center gap-1.5 self-start sm:self-auto rounded-full bg-foreground px-3.5 py-1 font-mono text-xs font-bold text-background transition-all hover:scale-105 hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    View repository <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                  {currentFeatured.description}
                </p>

                {currentFeatured.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {currentFeatured.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
        )}

        {/* Project Catalog Archive & Explorer Header */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border/80 pt-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                All Projects Archive
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                {isExpanded
                  ? `Exploring all ${projects.length} repositories across engineering domains`
                  : `Browse ${projects.length} repositories in software, data, and AI`}
              </p>
            </div>
            {ready && (
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls="all-projects-explorer"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-border/80 bg-surface/50 px-4 py-2 font-mono text-xs font-medium text-foreground transition-all hover:border-accent hover:bg-surface-elevated active:scale-95 cursor-pointer shadow-sm"
              >
                <span>{isExpanded ? "Collapse Archive" : `View All Projects (${projects.length})`}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </div>

          {ready && isExpanded && (
            <div id="all-projects-explorer" className="space-y-6 pt-2">
              <div role="group" aria-label="Project categories" className="flex flex-wrap gap-2 pt-1">
                {([['all', 'All'], ...Object.entries(CATEGORY_MAP)] as [ProjectCategory, string][]).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    data-project-category={id}
                    aria-pressed={category === id}
                    onClick={() => selectCategory(id)}
                    className={`min-h-9 max-w-full rounded-full border px-3.5 py-1 text-left font-mono text-xs transition-all hover:scale-105 cursor-pointer ${
                      category === id
                        ? "border-foreground bg-foreground text-background font-bold shadow-sm"
                        : "border-border/80 bg-surface/50 text-muted hover:border-accent hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {visible.length === 0 ? (
                <p
                  data-project-empty
                  role="status"
                  className="rounded-2xl border border-border/80 bg-surface/50 p-6 text-sm text-muted"
                >
                  {projects.length === 0 ? "Projects are being prepared." : "No projects in this category yet."}
                </p>
              ) : (
                <div className="grid min-w-0 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
                  <nav
                    ref={listRef}
                    aria-label="Choose a project"
                    className="rounded-2xl border border-border/80 bg-surface/40 p-2 sm:p-3 h-[min(280px,45svh)] lg:h-[min(460px,58svh)] overflow-y-auto scrollbar-thin [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]"
                  >
                    <ul className="space-y-1.5">
                      {visible.map((project) => {
                        const isCurrent = selected?.id === project.id;
                        return (
                          <li key={project.id}>
                            <button
                              type="button"
                              data-project-select={project.id}
                              aria-pressed={isCurrent}
                              aria-controls="project-overview-panel"
                              onClick={() => selectProject(project.id)}
                              className={`w-full rounded-xl border px-3.5 py-2.5 text-left transition-all cursor-pointer ${
                                isCurrent
                                  ? "border-accent/60 bg-surface shadow-sm"
                                  : "border-transparent hover:border-border/60 hover:bg-surface/50"
                              }`}
                            >
                              <span className="flex flex-wrap items-center justify-between gap-2">
                                <span data-project-title className="text-xs sm:text-sm font-medium text-foreground">
                                  {project.title}
                                </span>
                                <ProjectStatusBadge status={project.status} />
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <div
                    ref={panelRef}
                    id="project-overview-panel"
                    aria-live="polite"
                    aria-atomic="true"
                    className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6 scroll-mt-24 lg:h-[min(460px,58svh)] lg:overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]"
                  >
                    {selected && <ProjectOverviewPanel project={selected} />}
                  </div>
                </div>
              )}
            </div>
          )}

          {!ready && (
            visible.length === 0 ? (
              <p
                data-project-empty
                role="status"
                className="rounded-2xl border border-border/80 bg-surface/50 p-6 text-sm text-muted"
              >
                {projects.length === 0 ? "Projects are being prepared." : "No projects in this category yet."}
              </p>
            ) : (
              <div data-project-fallback className="space-y-4">
                {visible.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-6">
                    <ProjectOverviewPanel project={project} />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
