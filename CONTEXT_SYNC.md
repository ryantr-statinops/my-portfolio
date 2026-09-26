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
- The project collection is currently empty and generates two pages (`/` and `/projects/`).
- The homepage Strategy section is a four-domain Frame/Test/Build scaffold; its content is intentionally unpublished.
- Project category IDs are `software-engineering`, `data-engineering`, `ai-engineering` and `other`.
- Portfolio runtime terminology is neutral: Strategy, Project Registry, Portfolio Runtime and Build System.
- A future Cluster startup project is content, not infrastructure branding, and is outside the current release.

When changing code, update the relevant document in `docs/` in the same release series and preserve the atomic commit policy.
