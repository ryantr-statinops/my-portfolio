import { Link } from "react-router";

export default function Hero() {
  return (
    <section id="main" className="relative flex min-h-screen w-full items-start overflow-hidden bg-transparent px-6 pb-20 pt-20 md:px-12">
      <div className="relative z-10 flex min-h-[calc(70svh_-_5rem)] w-full max-w-5xl items-center">
        <div className="space-y-12 md:space-y-16">
          <div className="space-y-8 reveal md:space-y-12">
            <h1 className="text-[clamp(2rem,8vw,5rem)] font-bold uppercase leading-[0.9] tracking-tighter">SYSTEMS<br />OPERATIONS<br /><span className="text-gradient">INFRASTRUCTURE</span></h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-muted md:text-2xl">An Math - Statistics student building<br /><span className="font-semibold italic text-primary">software</span>, <span className="font-semibold italic text-primary">data systems</span>, and <span className="font-semibold italic text-primary">infrastructure</span><br />across <span className="text-gradient">quantitative research</span> and <span className="font-semibold italic text-primary">AI-native</span> tooling.</p>
          </div>
          <div className="space-y-4 pt-2 reveal">
            <p className="text-[22px] font-bold uppercase tracking-tight text-primary">EXPLORE</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/#about-me" className="info-box info-box--compact info-box--interactive inline-flex min-h-11 items-center justify-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">VIEW PROFILE</Link>
              <Link to="/#projects" className="info-box info-box--compact info-box--interactive inline-flex min-h-11 items-center justify-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">VIEW PROJECTS</Link>
              <Link to="/#connect" className="info-box info-box--compact info-box--interactive inline-flex min-h-11 items-center justify-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">CONTACT</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
