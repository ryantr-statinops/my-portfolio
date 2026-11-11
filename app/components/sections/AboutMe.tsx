const experiences = [
  {
    number: "01",
    company: "HUB Network",
    role: "Internal Developer – Startup Growth / HR",
    period: "Feb 2025 – May 2026",
    highlights: [
      "Workflow automation bằng Google Apps Script và Python.",
      "Internal dashboards và mentor management tools.",
      "Data processing và operational reporting.",
      "Startup operations và event coordination.",
    ],
  },
  {
    number: "02",
    company: "MINI HIPPO",
    role: "Business Tools Developer",
    period: "Sep 2025 – Feb 2026",
    highlights: [
      "Xây dựng CRM trên Google Sheets và Apps Script.",
      "Quản lý pipeline cho đội ngũ 8 người.",
      "Develop and Manage Sales dashboards, heatmaps và commission tracking.",
      "Automate reporting and data collection in Google Sheets.",
    ],
  },
];

const focusAreas = [
  { title: "Backend Engineering", description: "Python, FastAPI, Go, Traefik, APIs & system architecture" },
  { title: "Data Engineering", description: "data pipelines, databases & data infrastructure" },
  { title: "AI Infrastructure", description: "MCP, agents, harnesses, model routing & developer tooling" },
  { title: "Infrastructure", description: "Linux, Docker, networking & service orchestration" },
  { title: "Quantitative Analytics", description: "statistical modeling, quantitative research & trading systems" },
  { title: "Statistics → Engineering", description: "applying quantitative thinking to software systems" },
];

const contacts = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ryan-tr/", external: true },
  { label: "GitHub", href: "https://github.com/ryantr-statinops", external: true },
  { label: "trankhang2856@gmail.com", href: "mailto:trankhang2856@gmail.com", external: false },
  { label: "0987 357 707", href: "tel:+84987357707", external: false },
];

export default function AboutMe() {
  return (
    <section id="about-me" aria-labelledby="about-me-title" className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="w-full space-y-12">
        {/* Section Header: Experience */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 id="about-me-title" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Experience
            </h2>
            <span className="text-xs font-mono text-muted">2024–Present</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-muted">
            <span className="text-foreground font-semibold">Statistics Student</span> · <span className="text-gradient font-semibold">Data · AI · Software</span>
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 text-sm">
              <div className="w-32 sm:w-36 shrink-0 text-xs font-mono text-muted">{exp.period}</div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-accent">{exp.number}.</span>
                  <h3 className="text-sm font-semibold text-foreground">{exp.company}</h3>
                </div>
                <div className="text-xs font-medium text-muted">{exp.role}</div>
                <ul className="space-y-1 pt-1 text-xs sm:text-sm text-muted leading-relaxed list-disc list-inside">
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Education
            </h3>
            <span className="text-xs font-mono text-muted">Undergraduate</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 text-sm">
            <div className="w-32 sm:w-36 shrink-0 text-xs font-mono text-muted">2024–Present</div>
            <div className="min-w-0 flex-1 space-y-1">
              <h4 className="text-sm font-semibold text-foreground">BSc in Statistics</h4>
              <p className="text-xs text-muted">
                Ton Duc Thang University<br />Faculty of Mathematics &amp; Statistics · 2024–Present
              </p>
              <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">
                Curriculum focused on mathematical statistics, probability theory, computational analytics, and data-driven systems.
              </p>
            </div>
          </div>
        </div>

        {/* Current Focus Grid */}
        <div className="space-y-4" aria-labelledby="current-focus-title">
          <div className="flex items-center justify-between">
            <h3 id="current-focus-title" className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Current Focus
            </h3>
            <span className="text-xs text-muted">Specialization Areas</span>
          </div>
          <div data-focus-grid className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusAreas.map((area) => (
              <article data-focus-card key={area.title} className="info-box info-box--compact p-3 sm:p-4 rounded-xl border border-border/80 bg-surface/50 transition-all hover:border-accent/40">
                <h4 className="text-sm font-semibold text-foreground">{area.title}</h4>
                <p className="mt-1 text-xs text-muted leading-relaxed">{area.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Active Status & Contact Card */}
        <article data-about-contact className="info-box p-4 sm:p-5 rounded-xl border border-border/80 bg-surface/50 space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">Active Status</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">Open to work</h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Open to internship and entry-level opportunities in data, AI and software engineering.
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {contacts.map((contact) => (
              <li key={contact.href} className="min-w-0 max-w-full">
                <a
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border/80 bg-background/60 px-3.5 py-1.5 text-xs text-muted hover:text-foreground hover:border-accent transition-all hover:scale-105"
                >
                  <span className="break-all">{contact.label}</span>
                  {contact.external && (
                    <>
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
