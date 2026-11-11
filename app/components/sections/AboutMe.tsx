const experiences = [
  {
    company: "HUB Network",
    role: "Internal Developer – Startup Growth / HR",
    period: "Feb 2025 – May 2026",
    highlights: [
      "Automated internal workflows using Google Apps Script and Python.",
      "Engineered operational dashboards and mentor management tools.",
      "Handled statistical data processing and recurring operational reporting.",
      "Coordinated startup program operations and community events.",
    ],
  },
  {
    company: "MINI HIPPO",
    role: "Business Tools Developer",
    period: "Sep 2025 – Feb 2026",
    highlights: [
      "Architected custom CRM system on Google Sheets and Apps Script.",
      "Managed sales and operations pipeline for an 8-member team.",
      "Developed and managed sales dashboards, heatmaps, and commission tracking.",
      "Automated reporting workflows and data collection in Google Sheets.",
    ],
  },
  {
    company: "Ho Chi Minh City Statistics Office",
    role: "Statistical Survey Assistant",
    period: "Jan 2026 – May 2026",
    highlights: [
      "Conducted statistical data collection across municipal sectors.",
      "Assisted survey execution, sampling checks, and data handling.",
      "Processed and analyzed structured statistical databases.",
      "Analyzed and verified financial statement data reports.",
    ],
  },
];

const organizations = [
  {
    name: "HUB Network",
    role: "Startup Growth / HR",
    period: "Feb 2025 – May 2026",
  },
  {
    name: "Ton Duc Thang University Startup Club",
    role: "Member / Contributor",
    period: "Active",
  },
];

const focusAreas = [
  {
    title: "Backend Engineering",
    description: "APIs & robust distributed system architecture",
    tags: ["Python", "FastAPI", "Go", "Traefik", "REST", "System Design"],
  },
  {
    title: "Data Engineering",
    description: "Scalable data pipelines & database infrastructure",
    tags: ["PostgreSQL", "Data Pipelines", "Databases", "ETL", "Supabase"],
  },
  {
    title: "AI Infrastructure",
    description: "Harnesses, model orchestration & autonomous agents",
    tags: ["MCP", "AI Agents", "Model Routing", "Harnesses", "Dev Tooling"],
  },
  {
    title: "Infrastructure",
    description: "Containerization, networking & service orchestration",
    tags: ["Linux", "Docker", "Networking", "Service Orchestration", "CI/CD"],
  },
  {
    title: "Quantitative Analytics",
    description: "Statistical modeling & data-driven algorithmic research",
    tags: ["Statistical Modeling", "Quant Research", "Data Analysis", "Python"],
  },
  {
    title: "Statistics → Engineering",
    description: "Applying rigorous mathematical thinking to software",
    tags: ["Mathematical Statistics", "Probability", "Algorithms", "Optimization"],
  },
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
                <h3 className="text-sm font-semibold text-foreground">{exp.company}</h3>
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

        {/* Organizations Section */}
        <div className="space-y-4" aria-labelledby="organizations-title">
          <div className="flex items-center justify-between">
            <h3 id="organizations-title" className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Organizations
            </h3>
            <span className="text-xs font-mono uppercase tracking-wider text-muted">Community &amp; Involvement</span>
          </div>
          <div className="space-y-4">
            {organizations.map((org) => (
              <div key={org.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 text-sm">
                <div className="w-32 sm:w-36 shrink-0 text-xs font-mono text-muted">{org.period}</div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <h4 className="text-sm font-semibold text-foreground">{org.name}</h4>
                  <p className="text-xs text-muted">{org.role}</p>
                </div>
              </div>
            ))}
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
          <div data-focus-grid className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {focusAreas.map((area) => (
              <article
                data-focus-card
                key={area.title}
                className="group relative rounded-xl border border-border/80 bg-surface/50 p-4 transition-all duration-200 hover:border-accent/50 hover:bg-surface/80 hover:shadow-sm flex flex-col justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent font-semibold select-none">›</span>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                      {area.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed pl-3.5">
                    {area.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1 pl-3.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted transition-colors group-hover:border-accent/40 group-hover:text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
