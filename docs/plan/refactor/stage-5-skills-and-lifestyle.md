# Stage 5: Skills & Human Touch ("Outside the IDE")

> **File**: `docs/plan/refactor/stage-5-skills-and-lifestyle.md`
> **Status**: Planned (Dependencies: Stage 4)
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Present engineering capabilities through categorized technology pills with official icons, add a personal "Outside the IDE" lifestyle/hobbies block, and finish with an editorial quote footer and direct contact pills.

---

## Tasks & Commit Breakdown

### Task 5.1: Categorized Technologies Badge Grid
- **Scope**:
  - Build `app/components/sections/Technologies.tsx`:
    - Section header: `Technologies` with subtle right-aligned link or count.
    - Grouped into domains:
      - **Languages & Backend**: Python, Go, FastAPI, Node.js, C++
      - **Data & AI Infrastructure**: Pandas, NumPy, Scikit-Learn, MCP, Model Routing, LLM Harnesses
      - **Infrastructure & Tools**: Linux, Docker, Traefik, Git, GitHub Actions, Vite
    - Badges styled as clickable or interactive pills with clean tech labels.
- **Files Modified**:
  - `app/components/sections/Technologies.tsx` (new)
  - `app/routes/home.tsx`
- **Commit Message**:
  ```
  feat(skills): implement categorized technologies badge grid with tech icons
  ```
- **Checks**:
  - `npm run check`

---

### Task 5.2: "Outside the IDE" Lifestyle & Editorial Quote Footer
- **Scope**:
  - Add "Outside the IDE" section:
    - Brief human-touch bio describing how Ryan recharges away from screens.
    - Interactive interest pills: `Gym / Strength Training`, `Quantitative Reading`, `Music`, `Chess`.
  - Rebuild `app/components/layout/Footer.tsx`:
    - Top dashed divider line (`border-t border-dashed border-border/80`).
    - Signature quote: *"Precision in code, clarity in systems."*
    - Direct contact action pills (`Email: trankhang2856@gmail.com`, `Schedule a Chat / LinkedIn`).
    - Clean copyright notice and back-to-top button.
- **Files Modified**:
  - `app/components/sections/OutsideTheIDE.tsx` (or integrated in footer/bio)
  - `app/components/layout/Footer.tsx`
  - `app/routes/home.tsx`
- **Commit Message**:
  ```
  feat(footer): add outside-the-ide lifestyle section and quote footer with direct contact pills
  ```
- **Checks**:
  - `npm run check`
  - `npm run test:unit`

---

## Stage 5 Completion Criteria
- Complete tech stack visually organized by domain.
- Lifestyle and personal interests give Ryan a memorable, professional, and authentic personality.
- Footer provides prominent, frictionless contact touchpoints.
