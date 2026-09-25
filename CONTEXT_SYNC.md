# CONTEXT_SYNC.md — Project Knowledge Base

Use the repository documents under `docs/` as the source of truth. Former agent-specific paths are not part of this repository.

## Read first

- `docs/STRATEGY.md` — professional/minimal brand and legitimate project strategy context.
- `docs/ARCHITECTURE_V2.md` — canonical React runtime, routes and deployment artifact.
- `docs/CONTENT_GUIDE.md` — project JSON metadata and Markdown body authoring standards.
- `docs/DESIGN_SYSTEM.md` — visual tokens and interaction language.
- `docs/ROADMAP.md` — release status and remaining work.
- `docs/plan/README.md` — L1/L2/L3 QA status.

## Implementation facts

- Production is GitHub Pages at `/my-portfolio/`.
- `/projects/` is the canonical Project Registry; `/cluster/` is removed.
- The current catalog has five project IDs and five stable route slugs; the static build generates seven pages.
- Portfolio runtime terminology is neutral: Project Registry, Portfolio Runtime, Project Graph and Build System.
- Runtime: React 19, React Router 7 Framework Mode and Vite; detail content is Markdown and all deployed pages are prerendered.
- Architecture cutover on `refactor/react-completion` is locally QA-complete and ready for a PR to `dev`. Promotion to `main` remains a separate PR.
- Pull requests to `dev` and `main` validate only; production Pages deployment is restricted to `main`.
- A future Cluster startup project is content, not infrastructure branding, and is outside the current release.

When changing code, update the relevant document in `docs/` in the same release series and preserve the atomic commit policy.
