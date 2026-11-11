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
    <footer id="connect" aria-labelledby="connect-title" className={`relative w-full ${background} ${layer}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 border-t border-dashed border-border/80">
        {/* Editorial Signature Quote */}
        <div className="mb-10 rounded-2xl border border-dashed border-border/70 bg-surface/30 p-6 sm:p-8 text-center backdrop-blur-sm">
          <p className="text-base sm:text-lg italic font-medium text-foreground/90">
            &ldquo;Precision in code, clarity in systems.&rdquo;
          </p>
          <p className="mt-2 text-xs text-muted font-mono tracking-wider uppercase">
            Ryan Tran &bull; Crafting intentional software &amp; data solutions
          </p>
        </div>

        {/* Connect Section Header */}
        <div className="min-w-0">
          <h2 id="connect-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Let’s connect
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
            Have an idea, a project, or a shared interest in data, AI or software? I’d love to hear from you.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-muted/80">
            I’m also open to internship and entry-level opportunities in these fields.
          </p>
        </div>

        {/* Contact Links Grid */}
        <ul aria-label="Contact channels" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="group flex min-h-11 items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-surface/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-muted">{contact.label}</span>
                  <span className={`mt-0.5 block font-medium text-foreground group-hover:text-primary transition-colors [overflow-wrap:anywhere] ${contact.label === "Email" ? "text-sm sm:text-base" : "text-sm"}`}>
                    {contact.value}
                  </span>
                </div>
                {contact.external && (
                  <span aria-hidden="true" className="text-muted group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                )}
                {contact.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom Colophon and Scroll to Top */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6">
          <p className="text-xs text-muted">© 2026 Ryan Tran</p>
          <button
            id="scroll-to-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
            aria-label="Scroll to top"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
