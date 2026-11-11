type TechCategory = {
  name: string;
  items: readonly string[];
};

const techCategories: readonly TechCategory[] = [
  {
    name: "Languages & Backend",
    items: ["Python", "Go", "TypeScript", "JavaScript", "SQL", "R", "FastAPI", "Node.js"],
  },
  {
    name: "Data & AI Infrastructure",
    items: ["Pandas", "NumPy", "Scikit-Learn", "Model Context Protocol (MCP)", "Agent Harnesses", "LLM Routing"],
  },
  {
    name: "Cloud & Systems",
    items: ["Linux", "Docker", "Traefik", "Git", "GitHub Actions", "Supabase", "Tailwind CSS", "Vite"],
  },
];

export default function Technologies() {
  return (
    <section id="skills" aria-labelledby="technologies-title" className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 id="technologies-title" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Technologies
            </h2>
            <span className="text-xs font-mono text-muted">Core Stack &amp; Tooling</span>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Technologies and frameworks I use for building data pipelines, AI infrastructure, and software systems.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-5 pt-1">
          {techCategories.map((cat) => (
            <div key={cat.name} className="space-y-2.5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/50 px-3 py-1 font-mono text-xs text-foreground transition-all hover:border-accent hover:scale-105 shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
