# MIGRATION_PLAN (v1.0) - High-Speed Legacy Migration

## GOAL
Transform legacy files from `/archive` into a modern, scalable Astro-MDX Portfolio. Focus on Data Integrity, System Thinking, and UI/UX optimization using available Skills.

## STAGE 1: DATA LAYER (The Core)
- [Action] Initialize `src/content/config.ts`. 
- [Spec] Define 'projects' schema: title, date, category, tags, impact (string), thumbnail (path).
- [Migrate] Scan `/archive/projects/` -> Convert each to `.mdx` in `src/content/projects/`.
- [Content] Extract raw data from legacy HTML/JS and enrich using `skills/ui-ux-pro-max`.

## STAGE 2: ASSET OPTIMIZATION
- [Action] Move `/archive/assets/images/*` to `/public/images/`.
- [Update] Refactor all image paths in MDX to absolute root paths (e.g., `/images/filename.png`).

## STAGE 3: UI & ARCHITECTURE
- [Theme] Sync `archive/style.css` colors to `tailwind.config.mjs` (Dark Mode focus).
- [Layout] Create `src/layouts/MainLayout.astro` using `Meslo Nerd Font`.
- [Logic] Move critical JS from `archive/script.js` to `src/lib/utils.ts` (TypeScript).

## EXECUTION RULES
1. Use Tailwind CSS for all new styling.
2. Maintain "Professional & Minimalist" tone per `STRATEGY.md`.
3. Auto-fix LaTeX formatting for Math/Quant projects.