const focusAreas = [
  { title: "Backend Engineering", description: "Building APIs and backend services with Python, FastAPI and Go, with a focus on system architecture." },
  { title: "Data Engineering", description: "Working with data pipelines, databases and infrastructure to collect, transform and organize data." },
  { title: "AI Engineering", description: "Exploring agents, MCP, agent harnesses and model routing to integrate AI into practical tools and workflows." },
  { title: "Infrastructure", description: "Working with Linux, Docker, networking and service orchestration to run and connect applications." },
  { title: "Quantitative Analytics", description: "Applying statistical modeling and programming to quantitative research and trading systems." },
  { title: "Statistics → Engineering", description: "Using mathematical and statistical reasoning to frame problems, then implementing solutions through code." },
];

const contacts = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ryan-tr/", external: true },
  { label: "GitHub", href: "https://github.com/ryantr-statinops", external: true },
  { label: "trankhang2856@gmail.com", href: "mailto:trankhang2856@gmail.com", external: false },
  { label: "0987 357 707", href: "tel:+84987357707", external: false },
];

const cardClassName = "min-w-0 rounded-2xl border border-border bg-background/70 p-6 backdrop-blur-md md:p-8";

export default function AboutMe() {
  return (
    <section id="about-me" aria-labelledby="about-me-title" className="relative w-full border-t border-border/30 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">01 / About me</p>
        <div data-about-profile-grid className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <article data-about-profile className={cardClassName}>
            <h2 id="about-me-title" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-tight tracking-tight">Statistics Student<span className="mt-2 block text-[clamp(1.25rem,3vw,2.25rem)] text-muted">Data · AI · Software</span></h2>
            <p className="mt-6 text-base leading-relaxed text-muted">I study Statistics and explore how mathematical ideas become practical tools across data, quantitative research and AI. Mathematics and statistics give me a foundation for understanding problems; programming and engineering help me turn that understanding into working software.</p>
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-lg font-semibold">BSc in Statistics</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">Ton Duc Thang University<br />Faculty of Mathematics &amp; Statistics · 2024–Present</p>
            </div>
          </article>
          <article data-about-contact className={cardClassName}>
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">Open to work</h3>
            <p className="mt-4 text-base leading-relaxed text-muted">Open to internship and entry-level opportunities in data, AI and software engineering.</p>
            <ul className="mt-6 space-y-2">
              {contacts.map((contact) => (
                <li key={contact.href}>
                  <a href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg px-2 py-2 text-sm underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    <span className="[overflow-wrap:anywhere]">{contact.label}</span>
                    {contact.external && <><span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></>}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <div aria-labelledby="current-focus-title">
          <h3 id="current-focus-title" className="mb-5 text-xl font-semibold">Current Focus</h3>
          <div data-focus-grid className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <article data-focus-card key={area.title} className={cardClassName}>
                <h4 className="text-lg font-semibold">{area.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
