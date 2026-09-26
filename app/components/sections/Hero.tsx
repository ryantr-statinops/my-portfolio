import { Link } from "react-router";

export default function Hero() {
  return (
    <section id="main" className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent px-6 pb-20 pt-20 md:px-12">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="space-y-10">
          <div className="space-y-4 reveal">
            <h1 className="text-[clamp(2rem,8vw,5rem)] font-bold uppercase leading-[0.9] tracking-tighter">SYSTEMS.<br />OPERATIONS.<br /><span className="text-gradient">INFRASTRUCTURE.</span></h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-muted md:text-2xl">An Math - Statistics student building<br /><span className="font-semibold italic text-primary">software</span>, <span className="font-semibold italic text-primary">data systems</span>, and <span className="font-semibold italic text-primary">infrastructure</span><br />across <span className="text-gradient">quantitative research</span> and <span className="font-semibold italic text-primary">AI-native</span> tooling.</p>
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
