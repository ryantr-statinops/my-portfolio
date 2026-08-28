/** Central constants - single source, no .astro imports */
export const SITE = {
  title: "Ryan Tran | Command Center",
  description: "Applied Statistics student — Quantitative Finance & System Architecture",
  site: "https://ryantr-statinops.github.io",
  base: "/my-portfolio",
} as const;

export const CATEGORY_MAP: Record<string, string> = {
  "finance-quant": "Quant",
  "ops-automation": "Ops",
  "data-math": "Data",
  "system-ui": "System",
  "ai-implementation": "AI",
  "software-engineering": "Software",
};

export const NAV_LINKS = [
  { href: "/#about-me", label: "[ IDENTITY ]" },
  { href: "/#intelligence-hub", label: "[ STRATEGY ]" },
  { href: "/#projects", label: "[ PROJECTS ]" },
  { href: "/#connect", label: "[ CONNECT ]" },
] as const;
// governance hidden until FrameworksHub re-enabled (see index.astro comment)
