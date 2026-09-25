type Props = {
  transparentBackground?: boolean;
};

export default function Footer({ transparentBackground = false }: Props) {
  const background = transparentBackground ? "bg-transparent" : "bg-background";
  const layer = transparentBackground ? "z-10" : "";
  const spacing = transparentBackground ? "pt-24 pb-12" : "py-12";
  return (
    <footer id="connect" className={`relative flex min-h-screen w-full flex-col overflow-hidden border-t border-border ${background} ${layer}`}>
      <div className={`flex flex-1 items-center justify-center px-8 md:px-12 ${spacing}`}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-y-10 lg:gap-10">
          <div className="col-span-12 flex flex-col justify-center space-y-10 reveal lg:col-span-5">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold uppercase leading-[0.85] tracking-tighter text-foreground md:text-6xl">Ready to <br /><span className="italic text-primary">Connect.</span></h2>
              <div className="flex w-fit items-center gap-3 rounded-full border border-success/20 bg-success/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-success">System Status: Online</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="group cursor-pointer"><p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Communication_Channel</p><a href="mailto:trankhang2856@gmail.com" className="text-xl font-bold transition-all duration-300 hover:text-primary">trankhang2856@gmail.com</a></div>
              <div className="group cursor-pointer"><p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Global_Base</p><p className="text-xl font-bold">Ho Chi Minh City, Vietnam</p></div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.linkedin.com/in/ryan-tr/" target="_blank" rel="noreferrer" className="rounded-xl border border-border/50 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-500 hover:border-primary hover:bg-primary hover:text-background">LinkedIn</a>
              <a href="https://github.com/ryantr-statinops" target="_blank" rel="noreferrer" className="rounded-xl border border-border/50 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-500 hover:border-primary hover:bg-primary hover:text-background">GitHub</a>
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-center reveal lg:col-span-7" style={{ animationDelay: "0.1s" }}>
            <div className="glass-premium relative w-full overflow-hidden rounded-[2rem] border border-border/40 bg-card/10 p-8 md:p-10">
              <div className="relative z-10 space-y-6">
                <div className="space-y-2"><p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">For_Systems_Data_Infra</p><p className="text-sm leading-relaxed text-muted">Statistics-trained systems builder — open to quantitative finance, data engineering and infrastructure work.</p></div>
                <div className="group"><p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Direct_Channel</p><a href="mailto:trankhang2856@gmail.com" className="text-xl font-bold transition-all duration-300 hover:text-primary">trankhang2856@gmail.com</a></div>
                <div><p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Global_Base</p><p className="text-xl font-bold">Ho Chi Minh City, Vietnam</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-border/30 bg-foreground/[0.01] px-8 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-border/50 bg-muted/10 p-1"><img src={`${import.meta.env.BASE_URL}images/avt.webp`} alt="Ryan Tran" className="h-full w-full rounded-full object-cover" /></div>
            <div><p className="mb-1 font-mono text-[9px] font-bold uppercase leading-none tracking-widest text-foreground">© 2026 Ryan Tran</p><p className="font-mono text-[8px] uppercase tracking-tighter text-muted">Precision_Systems_Specialist</p></div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end"><p className="mb-1 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">Deployment: v4.2.0-Production</p><p className="font-mono text-[8px] font-bold uppercase text-success">Protocol_Secure</p></div>
            <button id="scroll-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} aria-label="Scroll to top" className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-background"><span className="text-lg transition-transform group-hover:-translate-y-1" aria-hidden="true">↑</span></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
