# Stage 2: Hero Section & Personal Identity

> **File**: `docs/plan/refactor/stage-2-hero-and-identity.md`
> **Status**: Planned (Dependencies: Stage 1)
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Establish Ryan Tran's personal brand identity immediately at the top of the page: circular avatar, verified badge, clear role definition, quick social links, bold editorial catchphrase, and 3 high-impact summary metric cards.

---

## Tasks & Commit Breakdown

### Task 2.1: Avatar, Verified Badge, Role & Social Icons
- **Scope**:
  - Rebuild `app/components/sections/Hero.tsx`:
    - Top identity row: Circular avatar image (`/images/avt.webp`) with delicate border and hover interaction.
    - Verified badge (blue check icon SVG) next to the full name **Ryan Tran**.
    - Subtitle/Role: `Statistics Student · Data, AI & Software Engineering`.
    - Minimal social links row: GitHub, LinkedIn, Email with crisp stroke icons.
    - Catchphrase headline: `Precision in code, ` + accent gradient `clarity in systems.`
    - Bio paragraph highlighting mathematics/statistics foundation combined with modern software engineering.
    - Action CTAs: pill button `View Projects ↓` and `Get in touch →`.
- **Files Modified**:
  - `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  feat(hero): implement modern editorial hero with avatar, role tags, and quick socials
  ```
- **Checks**:
  - `npm run check`

---

### Task 2.2: 3-Column Summary Stats Cards
- **Scope**:
  - Add 3 concise metric/stat cards directly below the bio in `Hero.tsx`:
    1. **BSc in Statistics** — Ton Duc Thang University (2024–Present)
    2. **8+ Projects** — Open Source & Applied Systems
    3. **Data & AI Infra** — Core Engineering Focus
  - Cards feature clean rounded corners (`rounded-xl`), soft borders, high contrast numbers, and responsive 1-column (mobile) to 3-column (desktop) layout.
- **Files Modified**:
  - `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  feat(hero): add quick stats metric cards below hero description
  ```
- **Checks**:
  - `npm run check`
  - `npm run test:unit`

---

## Stage 2 Completion Criteria
- Hero section presents face, verified identity, social links, value proposition, and 3 key metrics within the first screen view.
- Fully responsive on mobile (375px) without awkward text wraps.
