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

const cardClassName = "min-w-0 rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-md";

export default function AboutMe() {
  return (
    <section id="about-me" aria-labelledby="about-me-title" className="relative w-full border-t border-border/30 px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <h2 id="about-me-title" className="mb-4 text-xl font-semibold">About Me</h2>
          <div data-about-profile-grid className="grid gap-4">
            <article data-about-profile className={cardClassName}>
              <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-tight">Statistics Student<span className="mt-2 block text-xl text-muted">Data · AI · Software</span></h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">I study Statistics and explore how mathematical ideas become practical tools across data, quantitative research and AI. Mathematics and statistics give me a foundation for understanding problems; programming and engineering help me turn that understanding into working software.</p>
              <div className="mt-5 border-t border-border pt-4">
                <h4 className="text-base font-semibold">BSc in Statistics</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">Ton Duc Thang University<br />Faculty of Mathematics &amp; Statistics · 2024–Present</p>
              </div>
            </article>
            <article data-about-contact className={cardClassName}>
              <h3 className="text-2xl font-bold leading-tight tracking-tight">Open to work</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">Open to internship and entry-level opportunities in data, AI and software engineering.</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {contacts.map((contact) => (
                  <li key={contact.href} className="min-w-0 max-w-full">
                    <a href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg px-2 py-2 text-sm underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                      <span className="[overflow-wrap:anywhere]">{contact.label}</span>
                      {contact.external && <><span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></>}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
        <div className="min-w-0" aria-labelledby="current-focus-title">
          <h3 id="current-focus-title" className="mb-4 text-xl font-semibold">Current Focus</h3>
          <div data-focus-grid className="grid gap-3">
            {focusAreas.map((area) => (
              <article data-focus-card key={area.title} className="min-w-0 rounded-2xl border border-border bg-background/70 px-5 py-3 backdrop-blur-md">
                <h4 className="text-base font-semibold">{area.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
