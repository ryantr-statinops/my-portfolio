# Stage 1: Foundation Layout Shell & Minimalist Navigation

> **File**: `docs/plan/refactor/stage-1-shell-and-navigation.md`
> **Status**: Ready for execution
> **Branch**: `main`
> **Reference**: [renlenon.vercel.app](https://renlenon.vercel.app/)

---

## Objective
Convert the current terminal/cyber layout into a clean, centered `max-w-3xl` document container. Replace the top heavy navbar and floating left vertical stepper with a sleek, sticky blurred header featuring a monogram logo `RT`, direct navigation links, and a theme toggle.

---

## Tasks & Commit Breakdown

### Task 1.1: Centralized Layout Container & Theme Design Tokens
- **Scope**:
  - Update `src/styles/boxes.css` and Tailwind CSS v4 variables for subtle border colors, soft card backgrounds, and clean backdrop blur (`backdrop-blur-xl`).
  - Introduce layout tokens targeting `max-w-3xl` (approx 768px) centered column with `px-4 sm:px-6` responsive gutters.
- **Files Modified**:
  - `src/styles/boxes.css`
  - `app/root.tsx` (if global body classes need adjustment)
- **Commit Message**:
  ```
  refactor(layout): introduce centralized max-w-3xl document layout and typography tokens
  ```
- **Checks**:
  - `npm run check`

---

### Task 1.2: Minimalist Sticky Navbar
- **Scope**:
  - Rebuild `app/components/layout/Navbar.tsx`:
    - Left: Monogram mark `RT` with subtle hover accent.
    - Right: Inline navigation links (`Projects`, `Experience`, `Skills`, `Contact`), a vertical divider line, and a compact theme toggle (`ThemeToggle.tsx`).
    - Responsive mobile menu trigger with minimal drawer/sheet for viewports under 640px.
- **Files Modified**:
  - `app/components/layout/Navbar.tsx`
  - `app/components/layout/ThemeToggle.tsx` (if styling adjusted)
- **Commit Message**:
  ```
  feat(nav): rebuild sticky header with minimal monogram and inline section links
  ```
- **Checks**:
  - `npm run check`
  - `npm run test:unit`

---

### Task 1.3: Shell Streamlining & Vertical Stepper Removal
- **Scope**:
  - In `app/components/layout/SiteShell.tsx`, decommission the fixed desktop `VerticalStepper` on the home route.
  - Simplify the background: deactivate the intense homepage video loop on standard desktop flow, providing a clean, subtle ambient canvas.
- **Files Modified**:
  - `app/components/layout/SiteShell.tsx`
  - `app/components/layout/VerticalStepper.tsx` (unmounted or removed from default flow)
- **Commit Message**:
  ```
  refactor(shell): remove left vertical stepper and streamline background presentation
  ```
- **Checks**:
  - `npm run check`
  - `npm run test:unit`

---

## Stage 1 Completion Criteria
- Page body is cleanly bounded at `max-w-3xl mx-auto`.
- Top header stays sticky with minimal height, clean backdrop blur, monogram, and functional section jump links.
- Left edge has no overlapping stepper widget.
- `npm run check` passes with 0 errors.
