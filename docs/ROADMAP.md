# Release Roadmap — React Runtime and Strategy Rebuild

> Current runtime source of truth. Production target: GitHub Pages under `/my-portfolio/`.

## Current release model

- React 19, React Router 7 Framework Mode, TypeScript, Vite and Tailwind CSS 4.
- Two static pages are published while the portfolio is rebuilt: `/` and `/projects/`.
- The five legacy project entries, their detail routes and their dedicated media have been removed.
- `main` deploys to GitHub Pages after its validation workflow succeeds.

## Current scaffold

- The project catalog is intentionally empty. Future entries are validated by Zod and receive static detail routes.
- Homepage project filtering has been removed. `/projects/` retains its All plus four-category filter.
- Strategy provides four capability tracks and Frame/Test/Build selection; copy, decisions, trade-offs and related project links remain empty for the next content phase.
- The build generates `2 + project count` route pages plus a real 404 page, robots and sitemap files.

## Verification

`npm ci`, `npm run check`, `npm run build`, unit, smoke and visual tests cover the current scaffold. Direct route loads use prerendered HTML beneath `/my-portfolio/`; unknown project paths return 404. The terminal, theme, navigation, keyboard behavior and reduced-motion handling remain covered by automated checks.

## Future work

Write the twelve Strategy stage entries and add case studies in the four categories in a separate content phase. Optional analytics remain deferred until a public endpoint and privacy requirements are approved.
