type Props = {
  transparentBackground?: boolean;
};

const contacts = [
  { label: "Email", value: "trankhang2856@gmail.com", href: "mailto:trankhang2856@gmail.com", external: false },
  { label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/ryan-tr/", external: true },
  { label: "GitHub", value: "ryantr-statinops", href: "https://github.com/ryantr-statinops", external: true },
  { label: "Phone", value: "0987 357 707", href: "tel:+84987357707", external: false },
];

export default function Footer({ transparentBackground = false }: Props) {
  const background = transparentBackground ? "bg-transparent" : "bg-background";
  const layer = transparentBackground ? "z-10" : "";
  return (
    <footer id="connect" aria-labelledby="connect-title" className={`relative w-full border-t border-border ${background} ${layer}`}>
      <div className="px-6 py-16 md:px-12">
        <div data-connect-grid className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <p className="mb-4 text-xl font-semibold">Connect</p>
            <h2 id="connect-title" className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">Let’s connect.</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed">Have an idea, a project, or a shared interest in data, AI or software? I’d love to hear from you.</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">I’m also open to internship and entry-level opportunities in these fields.</p>
          </div>
          <ul aria-label="Contact channels" className="min-w-0 divide-y divide-border rounded-2xl border border-border bg-background/70 px-5 backdrop-blur-md">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined} className="block min-h-11 rounded py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  <span className="block text-xs text-muted">{contact.label}</span>
                  <span className={`mt-1 block [overflow-wrap:anywhere] underline decoration-border underline-offset-4 hover:decoration-current ${contact.label === "Email" ? "text-base font-semibold" : "text-sm"}`}>
                    {contact.value}{contact.external && <><span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
