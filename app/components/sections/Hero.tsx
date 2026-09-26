import { Link } from "react-router";

const focusAreas = [
  { title: "Backend Engineering", description: "Python, FastAPI, Go, Traefik, APIs & system architecture" },
  { title: "Data Engineering", description: "data pipelines, databases & data infrastructure" },
  { title: "Infrastructure", description: "Linux, Docker, networking & service orchestration" },
  { title: "AI Infrastructure", description: "MCP, agents, harnesses, model routing & developer tooling" },
  { title: "Quantitative Analytics", description: "statistical modeling, quantitative research & trading systems" },
  { title: "Statistics → Engineering", description: "applying quantitative thinking to software systems" },
];

export default function Hero() {
  return (
    <section id="main" className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent px-6 pb-20 pt-20 md:px-12">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="space-y-10">
          <div className="space-y-4 reveal">
            <h1 className="text-[clamp(2rem,8vw,5rem)] font-bold uppercase leading-[0.9] tracking-tighter">SYSTEMS.<br />OPERATIONS.<br /><span className="text-gradient">INFRASTRUCTURE.</span></h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-muted md:text-2xl">An Math - Statistics student building<br /><span className="font-semibold italic text-primary">software</span>, <span className="font-semibold italic text-primary">data systems</span>, and <span className="font-semibold italic text-primary">infrastructure</span><br />across <span className="text-gradient">quantitative research</span> and <span className="font-semibold italic text-primary">AI-native</span> tooling.</p>
          </div>
          <div className="space-y-2 reveal">
            <p className="text-[16px] font-bold uppercase tracking-tighter text-primary">CURRENT FOCUS</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {focusAreas.map((area) => <div key={area.title} className="glass flex flex-col gap-1.5 rounded-xl border border-border bg-foreground/[0.03] p-4 transition-colors hover:border-primary/30"><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">{area.title}</span><span className="font-mono text-xs leading-relaxed text-muted">{area.description}</span></div>)}
            </div>
          </div>
          <div className="space-y-2 pt-2 reveal">
            <p className="text-[16px] font-bold uppercase tracking-tighter text-primary">EXPLORE</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/#about-me" className="glass inline-flex items-center justify-center rounded-xl border border-border bg-foreground/[0.03] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">VIEW PROFILE</Link>
              <Link to="/#projects" className="glass inline-flex items-center justify-center rounded-xl border border-border bg-foreground/[0.03] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">VIEW PROJECTS</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
