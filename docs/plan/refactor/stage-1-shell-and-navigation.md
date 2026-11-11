# Stage 1: Foundation Layout Shell & Minimalist Navigation (Fine-Grained Breakdown)

> **File**: `docs/plan/refactor/stage-1-shell-and-navigation.md`
> **Status**: Ready for execution
> **Branch**: `main`
> **Push Destination**: Local only (do not push to remote)
> **Commit Policy**: Strictly 1 single action per commit

---

## Objective
Convert the current terminal/cyber layout into a clean, centered `max-w-3xl` document container. Replace the heavy header and floating left vertical stepper with a sleek, sticky blurred header featuring a monogram logo `RT`, direct navigation links, and a theme toggle.

---

## Fine-Grained Atomic Commit Sequence

### Commit 1.1: Content Width Token
- **Action**: Update `--desktop-content-width` to `48rem` (768px / `max-w-3xl`) in global CSS.
- **File**: `src/styles/global.css`
- **Commit Message**:
  ```
  refactor(styles): configure desktop content width token to max-w-3xl
  ```
- **Check**: `npm run check`

---

### Commit 1.2: Surface & Border Style Tokens
- **Action**: Refine `--box-radius`, border opacity, and add `.content-container` utility in `boxes.css`.
- **File**: `src/styles/boxes.css`
- **Commit Message**:
  ```
  refactor(styles): refine card surface and border tokens for minimalist aesthetic
  ```
- **Check**: `npm run check`

---

### Commit 1.3: Unmount Left Vertical Stepper
- **Action**: Remove `<VerticalStepper />` from `SiteShell.tsx` to eliminate sidebar collision on desktop.
- **File**: `app/components/layout/SiteShell.tsx`
- **Commit Message**:
  ```
  refactor(shell): unmount left vertical stepper from desktop layout
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 1.4: Streamline Background Canvas
- **Action**: Deactivate homepage video class toggle on default home flow in `SiteShell.tsx` and `root.tsx` for a clean canvas.
- **Files**:
  - `app/components/layout/SiteShell.tsx`
  - `app/root.tsx`
- **Commit Message**:
  ```
  refactor(shell): streamline background presentation for minimalist document canvas
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 1.5: RT Monogram Brand Logo
- **Action**: In `Navbar.tsx`, replace the heavy `RYAN TRAN` text with the minimalist `RT` monogram link.
- **File**: `app/components/layout/Navbar.tsx`
- **Commit Message**:
  ```
  feat(nav): introduce minimal RT monogram brand logo in navbar
  ```
- **Check**: `npm run check`

---

### Commit 1.6: Inline Section Navigation Links
- **Action**: In `Navbar.tsx`, add the inline desktop navigation links (`Projects`, `Experience`, `Contact`) with subtle divider.
- **File**: `app/components/layout/Navbar.tsx`
- **Commit Message**:
  ```
  feat(nav): add direct inline section navigation links in header
  ```
- **Check**: `npm run check && npm run test:unit`

---

### Commit 1.7: Sticky Blurred Header Container
- **Action**: In `Navbar.tsx`, convert outer header to sticky, blurred backdrop bounded by `max-w-3xl mx-auto`.
- **File**: `app/components/layout/Navbar.tsx`
- **Commit Message**:
  ```
  feat(nav): convert navbar to sticky backdrop-blur header container
  ```
- **Check**: `npm run check && npm run test:unit`

---

## Stage 1 Verification & Quality Gate
1. `npm run check` (TypeScript verification & typegen) passes with 0 errors.
2. `npm run test:unit` passes 100%.
3. Visual verification on `http://localhost:5173/my-portfolio/`:
   - Header is sticky, blurred, with `RT`, inline links, and theme toggle.
   - Stepper on the left is removed.
   - Layout is cleanly centered at `max-w-3xl`.
4. All commits remain strictly local on `main` (no push).
