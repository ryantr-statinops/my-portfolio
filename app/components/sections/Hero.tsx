import { Link } from "react-router";

export default function Hero() {
  function scrollToNext() {
    document.getElementById("about-me")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="main"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent px-6 pb-20 pt-28 md:px-12 md:pl-28 lg:pl-36"
    >
      <div className="relative z-10 flex min-h-[calc(70svh_-_5rem)] w-full max-w-3xl items-center">
        <div className="space-y-8 md:space-y-10 reveal">
          {/* Eyebrow / Category Tag */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted md:text-sm">
                ENGINEERING WORKSPACE
              </p>
            </div>
            <h1 className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold tracking-tight text-foreground leading-[1.08]">
              Precision in code,<br />
              <span className="text-gradient">clarity in systems</span>
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-xl text-base md:text-lg text-muted font-normal leading-relaxed">
            Dedicated to clean architecture, data-driven decisions, and building resilient tools across modern web and cloud platforms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/#projects"
              className="info-box info-box--compact info-box--interactive inline-flex min-h-11 items-center justify-center rounded-full px-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:scale-105 hover:border-accent hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
            >
              VIEW PROJECTS
            </Link>
            <Link
              to="/#connect"
              className="inline-flex min-h-11 items-center justify-center rounded-full px-6 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted hover:text-accent transition-colors"
            >
              GET IN TOUCH →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom-right "Scroll for more" Pill Badge */}
      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll for more"
        className="group absolute bottom-10 right-6 md:right-10 lg:right-12 z-20 hidden sm:inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-background/80 backdrop-blur-md px-4 py-2.5 text-xs font-mono font-medium text-foreground shadow-lg transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.25)] hover:scale-105 active:scale-95 cursor-pointer"
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-y-0.5"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        <span>Scroll for more</span>
      </button>
    </section>
  );
}
