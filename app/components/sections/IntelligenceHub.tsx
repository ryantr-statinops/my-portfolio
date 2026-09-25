import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { CATEGORY_MAP } from "../../../src/lib/constants";
import type { Project } from "../../data/project-schema";
import ProjectGraph3DLazy, { type ProjectGraphNode } from "../interactive/ProjectGraph3DLazy";

type Props = {
  projects: Project[];
};

type GraphNode = ProjectGraphNode;

export default function IntelligenceHub({ projects }: Props) {
  const [utcTime, setUtcTime] = useState("00:00:00");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const categories = useMemo(() => [...new Set(projects.map((project) => project.category))], [projects]);
  const technologies = useMemo(() => new Set(projects.flatMap((project) => project.stack)).size, [projects]);
  const activeProjects = projects.filter((project) => project.status === "Production" || project.status === "In Progress").length;

  useEffect(() => {
    const updateTime = () => setUtcTime(new Date().toISOString().slice(11, 19));
    updateTime();
    const interval = window.setInterval(updateTime, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const graph = useMemo(() => {
    const center = { x: 500, y: 290 };
    const categoryNodes: GraphNode[] = categories.map((category, index) => {
      const angle = (2 * Math.PI * index) / categories.length - Math.PI / 2;
      return { id: category, label: category.replaceAll("-", "_").toUpperCase(), x: center.x + Math.cos(angle) * 170, y: center.y + Math.sin(angle) * 150, category };
    });
    const projectNodes = projects.map((project) => {
      const categoryIndex = categories.indexOf(project.category);
      const categoryNode = categoryNodes[categoryIndex];
      const siblings = projects.filter((item) => item.category === project.category);
      const projectIndex = siblings.findIndex((item) => item.routeSlug === project.routeSlug);
      const angle = (2 * Math.PI * projectIndex) / siblings.length + categoryIndex * 0.7;
      return {
        id: project.routeSlug,
        label: project.title,
        x: categoryNode.x + Math.cos(angle) * (siblings.length > 1 ? 92 : 112),
        y: categoryNode.y + Math.sin(angle) * (siblings.length > 1 ? 76 : 92),
        category: project.category,
        project,
      };
    });
    return { center, categoryNodes, projectNodes };
  }, [categories, projects]);

  const kpis = [
    { label: "Projects", value: projects.length, unit: "SYS", description: "Live, documented systems" },
    { label: "Technologies", value: technologies, unit: "STK", description: "Languages & frameworks" },
    { label: "Domains", value: categories.length, unit: "SEC", description: "AI / FinTech / Ops" },
    { label: "Active", value: activeProjects, unit: "ACT", description: "Systems in operation" },
  ];

  function beginDrag(event: React.PointerEvent<SVGSVGElement>) {
    drag.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveGraph(event: React.PointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    const deltaX = event.clientX - drag.current.x;
    const deltaY = event.clientY - drag.current.y;
    drag.current = { x: event.clientX, y: event.clientY };
    setRotation((current) => ({ x: current.x + deltaX * 0.35, y: Math.max(-35, Math.min(35, current.y - deltaY * 0.25)) }));
  }

  return (
    <section className="strategic-dashboard-section w-full overflow-hidden border-y border-border bg-transparent pb-6 pt-20">
      <div className="w-full px-4 md:px-6">
        <div className="glass mb-4 flex items-center gap-6 overflow-hidden rounded-lg border border-border bg-foreground/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-success" /><span className="text-muted">SYSTEM_MODE:</span><span>STRATEGIC_VIEW</span></div>
          <div className="hidden items-center gap-2 sm:flex"><span className="text-muted">VERSION:</span><span className="text-primary">3.2.0-STABLE</span></div>
          <div className="ml-auto hidden items-center gap-2 md:flex"><span className="text-muted">LAST_REBALANCE:</span><span>2024.05.12 14:02</span></div>
          <div className="flex items-center gap-2"><span className="text-muted">UTC:</span><time id="utc-clock">{utcTime}</time></div>
        </div>

        <header className="reveal mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-1"><h2 className="text-2xl font-bold uppercase leading-none tracking-tighter text-foreground md:text-3xl">System Management Visualization</h2><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">a systems-level view of my technical work</p></div>
          <div className="flex flex-wrap justify-end gap-3"><span className="flex items-center gap-2 rounded-full border border-success/20 bg-success/5 px-3 py-1"><span className="h-1 w-1 rounded-full bg-success" /><span className="font-mono text-[8px] font-bold uppercase tracking-widest text-success">ISO_Aligned</span></span></div>
        </header>

        <div className="reveal mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((kpi) => <article key={kpi.label} className="glass-premium group flex flex-col rounded-2xl border border-border/80 bg-card/30 p-3 transition-all hover:border-primary/50"><div className="mb-0.5 flex items-start justify-between"><span className="font-mono text-[8px] uppercase tracking-widest text-muted">{kpi.label}</span><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /></div><div className="flex items-baseline gap-1"><span data-kpi={kpi.label.toLowerCase()} className="font-mono text-2xl font-black leading-none text-foreground">{String(kpi.value).padStart(2, "0")}</span><span className="text-[9px] font-bold text-primary">{kpi.unit}</span></div><span className="mt-2 text-[8px] text-muted">{kpi.description}</span></article>)}
        </div>

        <div className="grid h-[calc(100vh-280px)] min-h-[450px] grid-cols-12 gap-3">
          <aside className="col-span-12 flex h-full flex-col gap-3 overflow-hidden lg:col-span-3">
            <section className="glass flex flex-[3] flex-col overflow-hidden rounded-xl border border-border/80 bg-card/40">
              <header className="flex items-center justify-between border-b border-border/80 bg-foreground/5 p-4"><h3 className="text-[11px] font-bold uppercase tracking-widest opacity-80">Portfolio_Asset_Registry</h3><span className="text-[9px] font-bold uppercase text-primary">{projects.length} systems</span></header>
              <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 font-mono text-[11px]">
                {categories.map((category) => <div key={category} className="space-y-2" data-filter-group={category}><div className="flex items-center gap-2"><input type="checkbox" checked readOnly aria-label={`Include ${category}`} className="h-5 w-5 accent-primary" data-filter-checkbox={category} /><span className="font-mono text-[10px] font-bold uppercase text-muted">{category.replaceAll("-", "_")}</span></div><div className="space-y-1.5 border-l border-border/80 pl-5">{projects.filter((project) => project.category === category).map((project) => <Link key={project.routeSlug} to={`/projects/${project.routeSlug}/`} data-portfolio-project data-category={category} className="group flex cursor-pointer items-center gap-2"><span className="flex h-2.5 w-2.5 items-center justify-center rounded-sm border border-primary/50 bg-primary/5 transition-all group-hover:bg-primary"><span className="text-[6px] text-primary transition-colors group-hover:text-background">✓</span></span><span className="truncate text-muted transition-colors group-hover:text-foreground">{project.title}</span></Link>)}</div></div>)}
              </div>
            </section>
            <section className="glass space-y-3 rounded-xl border border-border/80 bg-card/40 p-4"><h3 className="font-mono text-[9px] uppercase tracking-widest text-muted">Global_Exit_Nodes</h3><div className="grid grid-cols-2 gap-2"><a href="https://github.com/ryantr-statinops" target="_blank" rel="noreferrer" className="rounded border border-border/80 bg-foreground/5 py-2 text-center text-[10px] font-bold transition-all hover:bg-primary hover:text-background">GITHUB</a><a href="https://linkedin.com/in/ryan-tr" target="_blank" rel="noreferrer" className="rounded border border-border/80 bg-foreground/5 py-2 text-center text-[10px] font-bold transition-all hover:bg-primary hover:text-background">LINKEDIN</a></div></section>
          </aside>

          <section className="glass group relative col-span-12 overflow-hidden rounded-xl border border-border/80 bg-card/40 lg:col-span-9" aria-label="Interactive project intelligence graph">
            <div className="pointer-events-none absolute left-6 top-6 z-20 reveal"><div className="rounded-r-lg border-l-2 border-primary bg-background/80 px-4 py-2 shadow-2xl backdrop-blur-md"><p className="mb-1 font-mono text-[8px] uppercase tracking-[0.3em] text-primary">Neural_Network_Mapping</p><p className="text-xs font-black uppercase tracking-tighter text-foreground">PROJECT_INTELLIGENCE_GRAPH_V4</p></div></div>
            <div className="absolute bottom-4 right-4 z-20 font-mono text-[8px] uppercase tracking-widest text-muted">Drag to rotate · Scroll to zoom</div>
            <ProjectGraph3DLazy projects={projects} onAvailabilityChange={setWebglAvailable} onHoverNode={setHoveredNode} />
            {!webglAvailable && (
            <svg viewBox="0 0 1000 600" role="group" aria-label={`Graph connecting ${projects.length} projects across ${categories.length} technical domains`} className="h-full w-full touch-none cursor-move" onPointerDown={beginDrag} onPointerMove={moveGraph} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onWheel={(event) => { event.preventDefault(); setZoom((current) => Math.max(0.65, Math.min(1.8, current + (event.deltaY < 0 ? 0.08 : -0.08)))); }}>
              <g style={{ transform: `perspective(900px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg) scale(${zoom})`, transformOrigin: "50% 50%", transition: drag.current ? "none" : "transform 120ms ease-out" }}>
                {graph.categoryNodes.map((node) => <line key={`core-${node.id}`} x1={graph.center.x} y1={graph.center.y} x2={node.x} y2={node.y} className="stroke-accent/70" strokeWidth="2" />)}
                {graph.projectNodes.map((node) => { const categoryNode = graph.categoryNodes.find((item) => item.id === node.category); return categoryNode ? <line key={`${node.category}-${node.id}`} x1={categoryNode.x} y1={categoryNode.y} x2={node.x} y2={node.y} className="stroke-accent/50" strokeWidth="1.5" /> : null; })}
                {graph.categoryNodes.map((node) => <g key={node.id} role="group" aria-label={`${CATEGORY_MAP[node.category] ?? node.category} domain`} onMouseEnter={() => setHoveredNode(node)} onMouseLeave={() => setHoveredNode(null)}><circle cx={node.x} cy={node.y} r="15" fill="var(--accent)" opacity="0.9" /><text x={node.x} y={node.y + 32} textAnchor="middle" className="fill-foreground font-mono text-[12px]">{node.label}</text></g>)}
                <circle cx={graph.center.x} cy={graph.center.y} r="22" fill="var(--foreground)" /><text x={graph.center.x} y={graph.center.y + 42} textAnchor="middle" className="fill-foreground font-mono text-[12px]">SYSTEM_CORE</text>
                {graph.projectNodes.map((node) => <Link key={node.id} to={`/projects/${node.id}/`} aria-label={`Open ${node.label}`} onMouseEnter={() => setHoveredNode(node)} onMouseLeave={() => setHoveredNode(null)}><circle cx={node.x} cy={node.y} r="10" fill={node.category.includes("finance") ? "#00f2ff" : node.category.includes("ai") ? "#fb7185" : "#93f8d8"} stroke="var(--background)" strokeWidth="2" /><title>{node.label}</title></Link>)}
              </g>
            </svg>
            )}
            <ul className="sr-only" aria-label="Projects represented in the 3D graph">
              {projects.map((project) => <li key={project.routeSlug}><Link to={`/projects/${project.routeSlug}/`}>{project.title} — {CATEGORY_MAP[project.category] ?? project.category}</Link></li>)}
            </ul>
            {hoveredNode && <div role="tooltip" className="absolute bottom-12 left-4 z-30 max-w-[240px] rounded-xl border border-primary/50 bg-background/90 p-3 shadow-2xl backdrop-blur-xl"><p className="mb-1 text-[10px] font-bold uppercase text-primary">{hoveredNode.label}</p><p className="text-[9px] leading-relaxed text-muted">{hoveredNode.project?.description ?? `Technical system layer for ${hoveredNode.category} projects.`}</p><p className="mt-2 border-t border-border/80 pt-2 font-mono text-[8px] uppercase text-success">Complexity: {hoveredNode.project?.priority ? hoveredNode.project.priority * 2 + 4 : 7}</p></div>}
          </section>
        </div>
      </div>
    </section>
  );
}
