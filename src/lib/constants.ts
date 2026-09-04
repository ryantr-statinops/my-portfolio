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
  { href: "/my-portfolio/#about-me", label: "[ IDENTITY ]" },
  { href: "/my-portfolio/#intelligence-hub", label: "[ STRATEGY ]" },
  { href: "/my-portfolio/#projects", label: "[ PROJECTS ]" },
  { href: "/my-portfolio/#connect", label: "[ CONNECT ]" },
] as const;
// NOTE: Navbar SSOT is NAV_ITEMS in components/layout/Navbar.types.ts (has sectionId for ScrollSpy).
// NAV_LINKS kept for non-nav usages; hrefs include SITE.base for prod.
