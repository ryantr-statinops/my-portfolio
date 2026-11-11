# Stage 6: Verification, Responsive Polish & Test Suite Update

> **File**: `docs/plan/refactor/stage-6-verification-and-tests.md`
> **Status**: Planned (Dependencies: Stages 1–5)
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Update automated unit tests, component render tests, and Playwright end-to-end / visual regression test suites to reflect the redesigned component structure. Guarantee 100% CI pass rate and flawless responsiveness across desktop and mobile.

---

## Tasks & Commit Breakdown

### Task 6.1: Unit & Component Test Suite Update
- **Scope**:
  - Update tests in `tests/`:
    - `tests/footer-render.test.ts`: verify new quote, contact pills, and copyright format.
    - `tests/about-render.test.ts`: verify updated experience and education sections.
    - `tests/project-hub-render.test.ts`: verify featured card and multi-project grid assertions.
    - `tests/project-catalog.test.ts`: ensure data schema tests continue to pass.
- **Files Modified**:
  - `tests/footer-render.test.ts`
  - `tests/about-render.test.ts`
  - `tests/project-hub-render.test.ts`
- **Commit Message**:
  ```
  test(unit): update component test fixtures and assertions for redesign
  ```
- **Checks**:
  - `npm run test:unit`

---

### Task 6.2: Playwright Smoke & Visual Regression Baselines
- **Scope**:
  - Update `tests/e2e/smoke.spec.ts`: update navigation assertions and section ID selectors.
  - Run Playwright test suite to generate new visual regression snapshots for `tests/e2e/visual.spec.ts` (desktop, tablet, mobile in dark/light modes).
  - Verify static build artifact preparation (`npm run build`).
- **Files Modified**:
  - `tests/e2e/smoke.spec.ts`
  - `tests/e2e/visual.spec.ts-snapshots/*` (regenerated snapshot PNGs)
- **Commit Message**:
  ```
  test(e2e): update smoke tests and regenerate visual baselines
  ```
- **Checks**:
  - `npm run check`
  - `npm run test`
  - `npm run build`

---

## Stage 6 Completion Criteria
- All 42+ unit tests pass cleanly (`npm run test:unit`).
- Playwright E2E smoke and visual regression tests pass (`npm run test:smoke`, `npm run test:visual`).
- Production build succeeds with 0 errors (`npm run build`).
