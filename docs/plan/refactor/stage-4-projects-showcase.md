# Stage 4: Featured Showcase & Project Catalog (Fine-Grained Breakdown)

> **File**: `docs/plan/refactor/stage-4-projects-showcase.md`
> **Status**: Ready for execution (Dependencies: Stage 3 complete)
> **Branch**: `main`
> **Push Destination**: Local only (do not push to remote)
> **Commit Policy**: Strictly 1 single action per commit

---

## Objective
Rebuild `ProjectHub.tsx` into a modern project showcase featuring:
1. One prominent **Featured Project Showcase Banner** at the top with badges, comprehensive description, tech stack tags, and primary action buttons.
2. A sleek, compact **Project Card Grid** with category filtering, technology badges, and repository links, preserving 100% test compatibility.

---

## Fine-Grained Atomic Commit Sequence

### Commit 4.1: Section Container & Document Flow
- **Action**: Streamline container to `w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14`, removing `min-h-screen` and legacy desktop padding.
- **File**: `app/components/sections/ProjectHub.tsx`
- **Commit Message**:
  ```
  refactor(projects): streamline project-hub container to max-w-3xl document flow
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 4.2: Featured Project Showcase Banner
- **Action**: Add high-contrast Featured Project showcase banner highlighting the flagship project (`HomeMatch`) above the catalog.
- **File**: `app/components/sections/ProjectHub.tsx`
- **Commit Message**:
  ```
  feat(projects): introduce featured project showcase banner
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 4.3: Modern Project Card Grid & Filter
- **Action**: Redesign the project browsing catalog into a clean card grid with tech stack badges, retaining `data-project-category`, `data-project-select`, and `data-project-overview` compatibility.
- **File**: `app/components/sections/ProjectHub.tsx`
- **Commit Message**:
  ```
  feat(projects): redesign project catalog into modern card grid with tech badges
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 4.4: Refine Empty State & Status Badges
- **Action**: Polish empty state message and badge styling with soft rounded pill aesthetics.
- **File**: `app/components/sections/ProjectHub.tsx`
- **Commit Message**:
  ```
  refactor(projects): refine empty state and status badge styling
  ```
- **Check**: `npm run check && npm run test:unit`

---

## Stage 4 Verification & Quality Gate
1. `npm run check` passes with 0 errors.
2. `npm run test:unit` passes 42/42 tests.
3. Visual confirmation on `http://localhost:5173/my-portfolio/`.
4. All commits remain strictly local on `main`.
