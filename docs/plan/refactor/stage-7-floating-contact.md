# Stage 7: Floating Contact Widget & CI Finalization

> **File**: `docs/plan/refactor/stage-7-floating-contact.md`
> **Status**: Completed (100% Delivered & Verified)
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Implement an interactive floating contact controls widget modeled after the reference site, positioned fixed at the bottom-right corner with an expandable modal card containing actionable contact channels (Email, LinkedIn, Phone). Synchronize Linux CI visual regression snapshots to guarantee a 100% green pass rate in GitHub Actions.

---

## Completed Tasks & Atomic Commits

### Commit 7.1: Synchronize Linux Visual Regression Snapshots for CI
- **Commit**: `33d4f81` `test(visual): synchronize linux visual regression snapshots for CI`
- **Scope**: Synchronized all 30 baseline image snapshots for the Linux Ubuntu runner environment in `tests/e2e/visual.spec.ts-snapshots/` (`*-chromium-linux.png`) to prevent false-positive visual regression failures during GitHub Actions CI.

### Commit 7.2: Floating Contact Controls Widget & Modal
- **Commit**: `6900704` `feat(contact): implement floating contact controls widget with popup modal`
- **Scope**:
  - Created `app/components/interactive/FloatingContact.tsx` with fixed bottom-right button (`Work with Ryan` + Briefcase icon).
  - Implemented popover modal card with header, close button (`X`), and contact channels (Send an Email, Connect on LinkedIn, Call or Message).
  - Added full keyboard navigation (Escape to close, focus return to trigger) and outside-click dismissal.
  - Mounted `<FloatingContact />` in `app/components/layout/SiteShell.tsx`.
  - Added unit test prerender verification in `tests/floating-contact-render.test.ts`.

### Commit 7.3: E2E Smoke & Visual Regression Test Suite Coverage
- **Commit**: `9bc8ef0` `test(contact): add smoke test coverage and isolate floating controls in visual suite`
- **Scope**:
  - Added E2E test in `tests/e2e/smoke.spec.ts` verifying button display, modal expansion (`aria-expanded`), contact link targets, Escape key dismissal, and mobile responsiveness at 320px.
  - Isolated `.floating-controls` during section capture in `tests/e2e/visual.spec.ts` to preserve visual regression baseline stability across all viewports.

---

## Verification & Quality Gate: ALL SATISFIED
- [x] `npm run check`: 0 TypeScript / Typegen errors.
- [x] `npm run test:unit`: 43/43 tests passed.
- [x] `npm run test:smoke`: 25/25 tests passed.
- [x] `npm run test:visual`: 6/6 test suites passed (30/30 assertions).
- [x] Production build (`npm run build`): Static HTML artifact prepared with 1 page count.
- [x] GitHub Actions workflow (`.github/workflows/deploy.yml`): All steps pass 100%.
