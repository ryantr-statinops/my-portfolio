# CONTEXT_SYNC.md — Project Knowledge Base

Use the repository documents under `docs/` as the source of truth. Former agent-specific paths are not part of this repository.

## Read first

- `docs/STRATEGY.md` — professional/minimal brand and legitimate project strategy context.
- `docs/ARCHITECTURE_V2.md` — current Astro boundaries and route model.
- `docs/CONTENT_GUIDE.md` — MDX content contract and writing standards.
- `docs/DESIGN_SYSTEM.md` — visual tokens and interaction language.
- `docs/ROADMAP.md` — release status and remaining work.
- `docs/plan/README.md` — L1/L2/L3 QA status.

## Implementation facts

- Production is GitHub Pages at `/my-portfolio/`.
- `/projects/` is the canonical Project Registry; `/cluster/` is removed.
- The current collection contains five MDX projects and generates seven pages.
- Portfolio runtime terminology is neutral: Project Registry, Portfolio Runtime, Project Graph and Build System.
- A future Cluster startup project is content, not infrastructure branding, and is outside the current release.

When changing code, update the relevant document in `docs/` in the same release series and preserve the atomic commit policy.
