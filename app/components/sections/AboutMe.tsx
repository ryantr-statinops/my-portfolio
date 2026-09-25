const journey = [
  { step: "Statistics", description: "Applied statistics — quantitative thinking as the base layer." },
  { step: "Data", description: "Data systems, pipelines and databases." },
  { step: "Software", description: "Backend engineering — Python, FastAPI, Go." },
  { step: "Systems", description: "Infrastructure and self-hosted services — Linux, Docker, networking." },
  { step: "Operations", description: "Reliable, observable systems that run themselves." },
];

const principles = [
  { title: "Systems over Tools", description: "Isolated tools decay. Connected systems compound." },
  { title: "Data-driven Action", description: "Data only matters when it creates movement." },
  { title: "Minimalist by Default", description: "Complexity is easy. Simplicity takes discipline." },
];

export default function AboutMe() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent px-8 pb-10 pt-24 md:px-12">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-20">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-accent/10 blur-[100px]" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-y-10 lg:gap-10">
        <div className="col-span-12 flex min-w-0 flex-col justify-center space-y-6 reveal lg:col-span-5">
          <h2 className="text-[clamp(2rem,8vw,3.75rem)] font-bold uppercase leading-[0.9] tracking-tighter text-foreground">I turn data<br />into <span className="italic text-primary">systems</span> that<br />run themselves.</h2>
          <div className="space-y-4 border-l border-border pl-6 text-base font-medium leading-relaxed text-muted">
            <p>Applied Statistics student building <span className="font-bold text-foreground">self-operating architectures</span> — from data pipelines to self-hosted infrastructure to AI-native tooling.</p>
            <p className="text-sm leading-relaxed opacity-80">Everything here is real. Every project runs on production hardware, not slides.</p>
          </div>
          <div className="glass-premium rounded-2xl border border-border/80 bg-foreground/[0.04] p-5">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-primary">System_Principle</p>
            <p className="font-mono text-xs italic uppercase leading-relaxed tracking-tight text-muted">Intelligence is not only prediction. It is the ability to <span className="font-bold text-primary">observe</span>, <span className="font-bold text-primary">predict</span>, <span className="font-bold text-primary">act</span> and <span className="font-bold text-primary">self-adjust</span>.</p>
          </div>
        </div>
        <div className="col-span-12 flex min-w-0 flex-col justify-center gap-8 reveal lg:col-span-7">
          <div className="space-y-1">
            <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-muted">Journey</h3>
            <div>
              {journey.map((item, index) => <div key={item.step} className="group flex items-start gap-4"><div className="flex flex-col items-center"><span className="mt-1 h-3 w-3 rounded-full border border-primary/60 bg-primary/30 transition-colors group-hover:bg-primary" />{index < journey.length - 1 && <span className="min-h-6 w-px flex-1 bg-border/60" />}</div><div className="pb-5"><h4 className="text-base font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">{item.step}</h4><p className="text-xs leading-relaxed text-muted">{item.description}</p></div></div>)}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {principles.map((principle, index) => <article key={principle.title} className="glass-premium group rounded-3xl border border-border/80 bg-card/30 p-5 transition-all duration-500 hover:border-primary/50"><div className="mb-2 flex items-center gap-2"><span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary">0{index + 1}</span><h4 className="text-sm font-bold uppercase tracking-tight transition-colors group-hover:text-primary">{principle.title}</h4></div><p className="text-xs leading-relaxed text-muted transition-colors group-hover:text-foreground/80">{principle.description}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
