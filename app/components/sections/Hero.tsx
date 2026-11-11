import { Link } from "react-router";

const avatarUrl = `${import.meta.env.BASE_URL}images/avt.webp`;

export default function Hero() {
  function scrollToNext() {
    document.getElementById("about-me")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="main"
      className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-16 sm:pb-12"
    >
      <div className="relative z-10 w-full">
        <div className="space-y-6 sm:space-y-8 reveal">
          {/* Identity Header: Avatar + Verified Name & Role */}
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={avatarUrl}
              alt="Ryan Tran"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-border/80 object-cover shadow-sm transition-transform hover:scale-105"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">Ryan Tran</h2>
                <svg
                  aria-label="Verified"
                  className="h-4 w-4 text-accent fill-accent shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-muted font-normal mt-0.5">
                Applied Statistics · Data, AI &amp; Software Engineering
              </p>
            </div>
          </div>
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
