/** Central constants - single source, no .astro imports */
export const SITE = {
  title: "Ryan Tran | Command Center",
  description: "Applied Statistics student — Quantitative Finance & System Architecture",
  site: "https://ryantr-statinops.github.io",
  base: "/my-portfolio",
} as const;

export const CATEGORY_MAP: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "data-engineering": "Data Engineering",
  "ai-engineering": "AI Engineering",
  other: "Other",
};

export const PROJECT_CATEGORIES = Object.keys(CATEGORY_MAP) as [string, ...string[]];

// NOTE: Navbar SSOT is NAV_ITEMS in components/layout/Navbar.types.ts (has sectionId for ScrollSpy).
