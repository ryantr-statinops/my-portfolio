# Stage 3: Experience & Education Timeline (Fine-Grained Breakdown)

> **File**: `docs/plan/refactor/stage-3-experience-and-education.md`
> **Status**: Ready for execution (Dependencies: Stage 2 complete)
> **Branch**: `main`
> **Push Destination**: Local only (do not push to remote)
> **Commit Policy**: Strictly 1 single action per commit

---

## Objective
Convert the About Me & Focus section into a scannable, two-column chronological Experience and Education timeline inspired by [renlenon.vercel.app](https://renlenon.vercel.app/), while preserving full test suite compatibility.

---

## Fine-Grained Atomic Commit Sequence

### Commit 3.1: Section Container & Document Flow
- **Action**: Streamline container to `w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14`.
- **File**: `app/components/sections/AboutMe.tsx`
- **Commit Message**:
  ```
  refactor(experience): streamline about-me container to max-w-3xl document flow
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 3.2: Two-Column Chronological Timeline
- **Action**: Implement a two-column timeline for technical experience and focus areas (dates on left, role/details on right).
- **File**: `app/components/sections/AboutMe.tsx`
- **Commit Message**:
  ```
  feat(experience): implement two-column chronological experience timeline
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 3.3: Dedicated Education Block
- **Action**: Add dedicated Education timeline block (BSc in Statistics at Ton Duc Thang University).
- **File**: `app/components/sections/AboutMe.tsx`
- **Commit Message**:
  ```
  feat(education): integrate dedicated academic credentials block in timeline
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 3.4: Open to Work Status & Contact Card
- **Action**: Polish the "Open to work" active status card with modern pill targets and clean borders.
- **File**: `app/components/sections/AboutMe.tsx`
- **Commit Message**:
  ```
  feat(experience): polish open-to-work status card with modern pill targets
  ```
- **Check**: `npm run check && npm run test:unit`

---

## Stage 3 Verification & Quality Gate
1. `npm run check` passes with 0 errors.
2. `npm run test:unit` passes 42/42 tests.
3. Visual confirmation on `http://localhost:5173/my-portfolio/`.
4. All commits remain strictly local on `main`.
