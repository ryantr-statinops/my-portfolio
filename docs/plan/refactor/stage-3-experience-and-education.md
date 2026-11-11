# Stage 3: Experience & Education Timeline

> **File**: `docs/plan/refactor/stage-3-experience-and-education.md`
> **Status**: Planned (Dependencies: Stage 2)
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Replace unstructured focus cards with a clean, scannable two-column chronological timeline covering experience, research, independent engineering projects, and formal academic education at Ton Duc Thang University.

---

## Tasks & Commit Breakdown

### Task 3.1: Chronological Experience Timeline
- **Scope**:
  - Create `app/components/sections/Experience.tsx` (or refactor `AboutMe.tsx` into a dedicated timeline section):
    - Section header: `Experience` with subtle right-aligned link or badge.
    - Two-column timeline layout:
      - Left column: Time period (`2024 - Present`, `2023 - 2024`, etc.) in muted monospace font.
      - Right column: Role title, organization/context, role type (`Academic · Research`, `Open Source Builder`), and concise bullet points / summary of technical achievements.
- **Files Modified**:
  - `app/components/sections/Experience.tsx` (new or refactored from `AboutMe.tsx`)
  - `app/routes/home.tsx`
- **Commit Message**:
  ```
  feat(experience): create clean two-column chronological experience timeline
  ```
- **Checks**:
  - `npm run check`

---

### Task 3.2: Education & Academic Credentials
- **Scope**:
  - Add a dedicated Education block in the timeline:
    - Degree: `Bachelor of Science in Statistics` (Faculty of Mathematics & Statistics, Ton Duc Thang University).
    - Curriculum focus: Statistical modeling, probability theory, computational math, data structures & algorithms.
    - Academic affiliations and certifications.
- **Files Modified**:
  - `app/components/sections/Experience.tsx` (or `app/components/sections/Education.tsx`)
- **Commit Message**:
  ```
  feat(education): integrate dedicated education and academic credentials section
  ```
- **Checks**:
  - `npm run check`
  - `npm run test:unit`

---

## Stage 3 Completion Criteria
- Two-column timeline clearly outlines Ryan's academic journey and technical experience.
- Clean typography and clear vertical rhythm matching the Renlenon aesthetic.
