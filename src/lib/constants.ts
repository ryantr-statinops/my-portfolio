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

// NOTE: Navbar SSOT is NAV_ITEMS in components/layout/Navbar.types.ts (has sectionId for ScrollSpy).
