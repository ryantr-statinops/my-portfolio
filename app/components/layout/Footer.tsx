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
      <div className="px-6 py-16 md:px-12 lg:px-8">
        <div data-connect-grid className="mx-auto grid max-w-6xl lg:max-w-[var(--desktop-content-width)] items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <h2 id="connect-title" className="text-gradient origin-left scale-y-110 text-[clamp(2.5rem,5.5vw,5rem)] font-black uppercase leading-[1.1] tracking-tighter [-webkit-text-stroke:0.5px_#38bdf8]">Let’s connect.</h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed">Have an idea, a project, or a shared interest in data, AI or software? I’d love to hear from you.</p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">I’m also open to internship and entry-level opportunities in these fields.</p>
          </div>
          <ul aria-label="Contact channels" className="info-box info-box--list">
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
      <div className="border-t border-border/30 px-6 py-4 md:px-12 lg:px-8">
        <div className="mx-auto flex max-w-6xl lg:max-w-[var(--desktop-content-width)] flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-xs text-muted">© 2026 Ryan Tran</p>
          <button id="scroll-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} aria-label="Scroll to top" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
