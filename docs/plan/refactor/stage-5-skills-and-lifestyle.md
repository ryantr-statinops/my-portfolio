# Stage 5: Skills & Editorial Quote Footer (Updated Breakdown)

> **File**: `docs/plan/refactor/stage-5-skills-and-lifestyle.md`
> **Status**: Ready for execution (Dependencies: Stage 4 complete)
> **Branch**: `main`
> **Push Destination**: Local only (do not push to remote)
> **Commit Policy**: Strictly 1 single action per commit

---

## Objective
Present engineering capabilities through a categorized technology badge grid (Languages, Backend, Data & AI, Cloud & Tools), and polish the Connect footer with a centered layout, signature quote, top dashed border, and modern contact pills (omitting personal lifestyle/hobbies per user preference).

---

## Fine-Grained Atomic Commit Sequence

### Commit 5.1: Technologies Badge Component
- **Action**: Build `app/components/sections/Technologies.tsx` displaying organized tech pills by engineering domain.
- **File**: `app/components/sections/Technologies.tsx` (new)
- **Commit Message**:
  ```
  feat(skills): implement categorized technologies badge grid component
  ```
- **Check**: `npm run check`

---

### Commit 5.2: Mount Technologies Section on Homepage
- **Action**: Mount `<Technologies />` in `app/routes/home.tsx` below ProjectHub.
- **File**: `app/routes/home.tsx`
- **Commit Message**:
  ```
  feat(home): mount technologies section on homepage flow
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 5.3: Streamline Footer Container Flow
- **Action**: Streamline outer footer container in `app/components/layout/Footer.tsx` to `max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14`.
- **File**: `app/components/layout/Footer.tsx`
- **Commit Message**:
  ```
  refactor(footer): streamline footer to centered max-w-3xl document flow
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 5.4: Signature Quote & Dashed Border in Footer
- **Action**: Add top dashed divider line, signature quote (*"Precision in code, clarity in systems"*), and refine contact pill links while preserving all 4 test targets.
- **File**: `app/components/layout/Footer.tsx`
- **Commit Message**:
  ```
  feat(footer): add signature quote and dashed border separator in footer
  ```
- **Check**: `npm run check && npm run test:unit`

---

## Stage 5 Verification & Quality Gate
1. `npm run check` passes with 0 errors.
2. `npm run test:unit` passes 42/42 tests.
3. Visual confirmation on `http://localhost:5173/my-portfolio/`.
4. All commits remain strictly local on `main`.
