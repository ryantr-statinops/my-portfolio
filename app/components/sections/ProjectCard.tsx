import { Link } from "react-router";
import { CATEGORY_MAP } from "../../../src/lib/constants";
import type { Project } from "../../data/project-schema";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const year = project.date.split("-")[0];
  return (
    <article data-portfolio-project data-category={project.category} className="glass-premium group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/30 transition-all duration-500 hover:-translate-y-2 hover:border-primary reveal">
      <div className="relative aspect-video overflow-hidden border-b border-border/80 bg-muted">
        <img src={`${import.meta.env.BASE_URL}${project.thumbnail.slice(1)}`} alt={project.title} loading="lazy" className="h-full w-full object-cover opacity-40 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-border/80 bg-background/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary shadow-xl backdrop-blur-md">{CATEGORY_MAP[project.category] ?? project.category}</span>
          {project.status === "In Progress" && <span className="animate-pulse rounded-full border border-primary/30 bg-primary/20 px-3 py-1 font-mono text-[9px] font-bold uppercase text-primary">WIP</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-black uppercase leading-tight tracking-tighter text-foreground transition-colors duration-300 group-hover:text-primary">{project.title}</h3><time dateTime={project.date} className="rounded border border-border/80 bg-foreground/5 px-2 py-0.5 font-mono text-[10px] text-muted">{year}</time></div>
          <p className="line-clamp-3 text-xs font-medium leading-relaxed text-muted opacity-80 transition-opacity group-hover:opacity-100">{project.description}</p>
        </div>
        <div className="mt-auto border-t border-border/80 pt-4">
          <div className="mb-3 flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success shadow-[0_0_8px_rgba(var(--success-rgb),0.6)]" /><span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Audit_Impact</span></div>
          <p className="rounded-lg border border-success/10 bg-success/5 p-2 font-mono text-[11px] font-bold leading-snug tracking-tight text-success">// {project.impact}</p>
        </div>
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap gap-2">{project.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded border border-border/30 bg-foreground/5 px-1.5 py-0.5 font-mono text-[8px] uppercase text-muted">{tag}</span>)}</div>
          <Link to={`/projects/${project.routeSlug}/`} className="group/link flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-all hover:text-foreground"><span>DECRYPT_CASE</span><span className="transition-transform group-hover/link:translate-x-1" aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 overflow-hidden opacity-10"><div className="absolute -bottom-[15px] -right-[15px] h-10 w-10 rotate-45 border border-primary" /></div>
    </article>
  );
}
