# AI Agent Operating Guidelines

This repository (`my-portfolio`) is a personal Command Center Portfolio built with React 19, TypeScript, React Router v7, Tailwind CSS v4, and Vite.

## Repository Tech Stack & Invariants
- **Runtime**: Node.js `>= 22.12.0`.
- **Framework**: React 19 + React Router v7 (configured with `ssr: false`, `prerender: ["/"]`, `basename: "/my-portfolio/"`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + custom scoped box styling (`src/styles/boxes.css`).
- **Data Validation**: Zod schema (`app/data/project-schema.ts`) validated during import.
- **Routing & Base Path**: All internal navigation and asset references MUST respect the `/my-portfolio/` basename (GitHub Pages deployment target).
- **Testing**: Vitest for unit tests (`tests/*.test.ts`), Playwright for E2E, smoke, and visual regression (`tests/e2e/*.spec.ts`).

## Directory Layout
- `app/` — Application source code (routes, components, data stores).
  - `app/components/sections/` — Main landing sections (`Hero`, `ProjectHub`, `AboutMe`).
  - `app/components/interactive/` — Dynamic widgets (e.g. `VideoBackground`).
  - `app/components/layout/` — Shell, Navbar, Footer, Theme toggle.
  - `app/data/` — Static project catalog (`projects.json`), Zod schema, and catalog helpers.
- `docs/` — Architecture, design, data authoring, and operational guides.
- `tests/` — Test suites and baseline snapshots.
- `.agents/` — Custom agent workspace definitions:
  - `.agents/skills/` — Reusable domain skills and instructions.
  - `.agents/mcp/` — Model Context Protocol configurations and integration hooks.

## Development Workflow
```sh
npm ci         # Install exact dependencies
npm run dev    # Start dev server -> http://localhost:5173/my-portfolio/
npm run check  # Typegen and TypeScript verification
npm run build  # Static build + asset preparation
npm run preview # Preview production build -> http://127.0.0.1:4173/my-portfolio/
npm run test   # Run unit, smoke, and visual tests
```

## Agent Rules of Engagement
1. **Never break deployment pathing**: Always preserve `basename: "/my-portfolio/"`.
2. **Schema Integrity**: Any changes to `app/data/projects.json` must strictly satisfy `app/data/project-schema.ts`.
3. **Verified Changes**: Run `npm run check` after modifying TypeScript files or routes.
4. **Skills & MCPs**: Reference `.agents/skills/` and `.agents/mcp/` for modular capabilities and environment integrations.
5. **Shared MCP Configuration**: Treat `.agents/mcp/servers.json` as the source of truth. After changing it, run `npm run mcp:sync` and `npm run mcp:check`. Read `.agents/mcp/README.md` for client setup and credential handling. Preserve unrelated client settings; do not edit generated MCP entries directly or commit secrets.
