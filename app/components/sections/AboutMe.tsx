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

export default function AboutMe() {
  return (
    <section className="relative w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">01 / About me</p>
        <div data-about-profile-grid className="grid gap-6">
          <article data-about-profile className="rounded-2xl border border-border bg-background/70 p-6">
            <h2 id="about-me-title" className="text-3xl font-bold">Statistics Student<br /><span>Data · AI · Software</span></h2>
            <p className="mt-6 text-base leading-relaxed text-muted">I study Statistics and explore how mathematical ideas become practical tools across data, quantitative research and AI. Mathematics and statistics give me a foundation for understanding problems; programming and engineering help me turn that understanding into working software.</p>
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-lg font-semibold">BSc in Statistics</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">Ton Duc Thang University<br />Faculty of Mathematics &amp; Statistics · 2024–Present</p>
            </div>
          </article>
          <article data-about-contact className="rounded-2xl border border-border bg-background/70 p-6">
            <h3 className="text-3xl font-bold">Open to work</h3>
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
          <div data-focus-grid className="grid gap-4">
            {focusAreas.map((area) => (
              <article data-focus-card key={area.title} className="rounded-2xl border border-border bg-background/70 p-6">
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
