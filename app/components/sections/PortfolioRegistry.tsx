import { Link } from "react-router";
import { CATEGORY_MAP } from "../../../src/lib/constants";
import type { Project } from "../../data/project-schema";
import "./portfolio-registry.css";

type Props = {
  projects: Project[];
};

const statusClasses: Record<string, string> = {
  Production: "border-success/20 bg-success/10 text-success",
  "In Progress": "border-primary/20 bg-primary/10 text-primary",
  Archived: "border-border bg-muted/10 text-muted",
  "Research & Development": "border-accent/20 bg-accent/10 text-accent",
  "Audit Pending": "border-accent/20 bg-accent/10 text-accent",
};

export default function PortfolioRegistry({ projects }: Props) {
  return (
    <section id="portfolio-registry" className="relative flex min-h-screen w-full items-center overflow-hidden bg-background py-12">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <header className="reveal mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2"><div className="flex items-center gap-2"><span className="h-px w-10 bg-primary" /><span className="font-mono text-[9px] uppercase tracking-[0.5em] text-primary">Global_Asset_Inventory</span></div><h1 className="text-4xl font-bold uppercase leading-none tracking-tighter md:text-5xl">STRATEGIC.<br /><span className="text-primary">REGISTRY_</span></h1></div>
          <div className="flex flex-col items-end gap-1 text-right"><p className="font-mono text-[9px] uppercase tracking-widest text-muted">// Total_Assets: {projects.length}</p><p className="font-mono text-[9px] uppercase tracking-widest text-muted">// Integrity_Check: PASSED</p></div>
        </header>

        <div className="glass-premium reveal overflow-hidden rounded-2xl border border-border/80 bg-card/20">
          {projects.length > 0 ? <div className="custom-scrollbar overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead><tr className="border-b border-border/80 bg-foreground/[0.02]"><th scope="col" className="px-5 py-4 font-mono text-[9px] uppercase tracking-widest text-muted">ID / Asset_Name</th><th scope="col" className="px-5 py-4 font-mono text-[9px] uppercase tracking-widest text-muted">Category</th><th scope="col" className="px-5 py-4 font-mono text-[9px] uppercase tracking-widest text-muted">Tech_Ecosystem</th><th scope="col" className="px-5 py-4 font-mono text-[9px] uppercase tracking-widest text-muted">Status</th><th scope="col" className="px-5 py-4 text-right font-mono text-[9px] uppercase tracking-widest text-muted">Audit_Impact</th></tr></thead>
              <tbody className="divide-y divide-border/30">
                {projects.map((project, index) => <tr key={project.routeSlug} data-portfolio-project data-category={project.category} className="group border-b border-border/40 transition-colors hover:bg-primary/[0.05]">
                  <td className="px-5 py-3.5"><Link to={`/projects/${project.routeSlug}/`} className="flex items-center gap-3"><span className="font-mono text-[9px] text-muted opacity-40">{String(index + 1).padStart(2, "0")}</span><span className="space-y-0.5"><span className="block text-xs font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">{project.title}</span><span className="block font-mono text-[8px] text-muted opacity-50">UID: {project.routeSlug.slice(0, 8)}</span></span></Link></td>
                  <td className="px-5 py-3.5"><span className="rounded border border-border/80 bg-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase text-foreground">{CATEGORY_MAP[project.category]}</span></td>
                  <td className="px-5 py-3.5"><div className="flex flex-wrap gap-1">{project.stack.slice(0, 3).map((technology) => <span key={technology} className="border-l border-primary/30 pl-2 font-mono text-[8px] text-muted">{technology}</span>)}</div></td>
                  <td className="px-5 py-3.5"><span className={`rounded-full border px-2 py-0.5 font-mono text-[8px] font-bold ${statusClasses[project.status]}`}>{project.status.toUpperCase()}</span></td>
                  <td className="px-5 py-3.5 text-right"><span className="font-mono text-[10px] font-bold tracking-tight text-success">{project.impact}</span></td>
                </tr>)}
              </tbody>
            </table>
          </div> : <p data-project-empty className="px-5 py-12 text-center font-mono text-xs uppercase tracking-widest text-muted">Projects are being rebuilt.</p>}
        </div>
        <div className="reveal mt-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted"><div className="flex items-center gap-4"><span>{projects.length > 0 ? "[ SCANNING_COMPLETE ]" : "[ REBUILD_IN_PROGRESS ]"}</span><span className="animate-pulse">_</span></div>{projects.length > 0 && <div className="flex gap-8"><span>Integrity: 100% Verified</span><span>Encryption: AES-256</span></div>}</div>
      </div>
    </section>
  );
}
