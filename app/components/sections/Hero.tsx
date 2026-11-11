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
              {/* Quick Social Link Icons */}
              <div className="mt-2 flex items-center gap-3 text-muted">
                <a
                  href="https://github.com/ryantr-statinops"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ryan-tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="mailto:trankhang2856@gmail.com"
                  aria-label="Email"
                  className="transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Precision in code,<br />
              <span className="text-gradient">clarity in systems.</span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-muted font-normal leading-relaxed">
              Applied Statistics student at Ton Duc Thang University exploring the intersection of quantitative research, data engineering, and resilient software architecture.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/#projects"
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-foreground px-6 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all hover:scale-105 hover:bg-foreground/90 shadow-sm"
            >
              VIEW PROJECTS
            </Link>
            <Link
              to="/#connect"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-border/80 bg-background/50 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground hover:border-accent transition-all hover:scale-105 backdrop-blur-sm"
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
