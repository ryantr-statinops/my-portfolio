# Stage 2: Hero Section & Personal Identity (Fine-Grained Breakdown)

> **File**: `docs/plan/refactor/stage-2-hero-and-identity.md`
> **Status**: Ready for execution (Dependencies: Stage 1 complete)
> **Branch**: `main`
> **Push Destination**: Local only (do not push to remote)
> **Commit Policy**: Strictly 1 single action per commit

---

## Objective
Establish Ryan Tran's personal brand identity immediately at the top of the page: circular avatar, verified badge, clear role definition, quick social links, bold editorial catchphrase, and 3 high-impact summary metric cards.

---

## Fine-Grained Atomic Commit Sequence

### Commit 2.1: Section Container & Document Flow
- **Action**: Streamline hero container padding and width to `max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-16 sm:pb-12`.
- **File**: `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  refactor(hero): streamline hero section container to centered document flow
  ```
- **Check**: `npm run check`

---

### Commit 2.2: Circular Avatar with Verified Badge
- **Action**: Add top identity row with circular image (`images/avt.webp`), verified blue check badge SVG, and role subtitle.
- **File**: `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  feat(hero): add circular avatar with verified badge and role description
  ```
- **Check**: `npm run check`

---

### Commit 2.3: Quick Social Links
- **Action**: Add minimal SVG stroke icons for GitHub, LinkedIn, and Email in the identity row.
- **File**: `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  feat(hero): integrate quick social link icons in identity row
  ```
- **Check**: `npm run check`

---

### Commit 2.4: Editorial Headline, Bio & Action Buttons
- **Action**: Refine `h1` typography, update bio paragraph, and convert action buttons to clean pill format.
- **File**: `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  feat(hero): refine hero headline, bio narrative, and call-to-action buttons
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 2.5: 3-Column Summary Metric Cards
- **Action**: Add 3 metric cards (`BSc Statistics`, `8+ Projects`, `Data & AI`) below the bio.
- **File**: `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  feat(hero): implement 3-column summary metric cards
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 2.6: Remove Legacy Floating Scroll Badge
- **Action**: Remove the absolute-positioned "Scroll for more" button and its click handler.
- **File**: `app/components/sections/Hero.tsx`
- **Commit Message**:
  ```
  refactor(hero): remove legacy floating scroll badge
  ```
- **Check**: `npm run check && npm run test:unit`

---

## Stage 2 Verification & Quality Gate
1. `npm run check` passes with 0 errors.
2. `npm run test:unit` passes 100%.
3. Visual confirmation on `http://localhost:5173/my-portfolio/`.
4. All commits remain strictly local on `main`.
