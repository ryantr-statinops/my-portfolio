export const SITE = {
  title: "Ryan Tran | Command Center",
  description: "Applied Statistics student — Quantitative Finance & System Architecture",
  site: "https://ryantr-statinops.github.io",
  base: "/my-portfolio",
} as const;

export const CATEGORY_IDS = [
  "software-engineering",
  "data-engineering",
  "ai-engineering",
  "other",
] as const;

export const CATEGORY_MAP: Record<(typeof CATEGORY_IDS)[number], string> = {
  "software-engineering": "Software Engineering",
  "data-engineering": "Data Engineering",
  "ai-engineering": "AI Engineering",
  other: "Other",
};
