# Stage 4: Featured Showcase & Project Catalog

> **File**: `docs/plan/refactor/stage-4-projects-showcase.md`
> **Status**: Planned (Dependencies: Stage 3)
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Rebuild `ProjectHub.tsx` into a modern project showcase featuring:
1. One prominent **Featured Project Showcase Banner** at the top with screenshot preview, comprehensive description, and primary action buttons.
2. A sleek, compact **Multi-Card Grid** for remaining projects featuring official technology badges and direct repository links.

---

## Tasks & Commit Breakdown

### Task 4.1: Featured Project Highlight Showcase
- **Scope**:
  - Build `app/components/sections/FeaturedProjectCard.tsx`:
    - Highlights the top flagship project (e.g. `HomeMatch` or `Statistical Computing Lab`).
    - Visual container with preview mockup/screenshot, domain tag (`Software Engineering` / `AI Engineering`), status badge (`Active`), detailed problem & architecture description, tech stack tags, and direct button `View Repository ↗`.
  - Integrate into `ProjectHub.tsx`.
- **Files Modified**:
  - `app/components/sections/FeaturedProjectCard.tsx` (new)
  - `app/components/sections/ProjectHub.tsx`
- **Commit Message**:
  ```
  feat(projects): introduce featured project highlight showcase banner
  ```
- **Checks**:
  - `npm run check`

---

### Task 4.2: Compact Project Grid with Tech Stack Badges
- **Scope**:
  - Reorganize the project catalog below the featured project into a responsive 2 or 3-column card grid:
    - Card: title, status badge, concise summary, domain category.
    - Technology badges with real tech labels/icons (`Python`, `FastAPI`, `Docker`, `React`, `TypeScript`, `Supabase`).
    - Direct GitHub link `Visit repo ↗`.
  - Maintain strict compatibility with `projects.json` and Zod schema validation in `app/data/project-schema.ts`.
- **Files Modified**:
  - `app/components/sections/ProjectHub.tsx`
  - `app/components/ProjectStatusBadge.tsx` (if badge styling is updated)
- **Commit Message**:
  ```
  feat(projects): redesign project catalog into compact multi-card grid with tech badges
  ```
- **Checks**:
  - `npm run check`
  - `npm run test:unit`

---

## Stage 4 Completion Criteria
- Top featured project immediately grabs attention with strong visual hierarchy.
- Secondary projects are easy to browse in a clean card grid with recognizable technology badges.
- Data integrity with `projects.json` is preserved 100%.
