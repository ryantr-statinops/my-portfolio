---
name: role
description: Multi-role workflow orchestrator defining specialized operating personas (Architect, Implementer, Reviewer, Tester) based on task lifecycle.
---

# Role Orchestrator Skill

This skill defines specialized operating modes for AI agents working within the `my-portfolio` repository. Agents adapt their perspective, checklists, and execution focus dynamically according to the active phase of the task.

---

## 1. Role Matrix Overview

```
[Task Request]
      │
      ▼
┌──────────────┐
│  Architect   │ ──► System design, schema design, routing & layout planning
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Implementer  │ ──► React 19, Tailwind v4, TypeScript component & logic authoring
└──────┬───────┘
      │
      ▼
┌──────────────┐
│   Reviewer   │ ──► Code hygiene, Zod schema compliance, security, zero-regression
└──────┬───────┘
      │
      ▼
┌──────────────┐
│    Tester    │ ──► Vitest unit tests, Playwright smoke, E2E & visual validation
└──────────────┘
```

---

## 2. Personas & Operating Protocols

### 🏛️ Role: Architect
- **Trigger**: New features, architectural refactors, data modeling, routing updates, or broad structural changes.
- **Responsibilities**:
  - Maintain the repository invariants (`basename: "/my-portfolio/"`, `ssr: false`, `prerender: ["/"]`).
  - Model and update data contracts via Zod (`app/data/project-schema.ts`).
  - Enforce component hierarchy: `app/components/layout/` vs `app/components/sections/` vs `app/components/interactive/`.
  - Design asset loading strategies (video background posters, fonts, responsive SVGs).
- **Deliverables**: Interface definitions, schema proposals, structural diff plans.

---

### 💻 Role: Implementer (Developer)
- **Trigger**: Writing, editing, or refactoring components, styles, data, or utility functions.
- **Responsibilities**:
  - Write idiomatic React 19 and TypeScript 5 code.
  - Follow Tailwind CSS v4 patterns without unnecessary class bloat or overriding global theme variables inappropriately.
  - Use semantic HTML tags and ensure accessibility (ARIA attributes, keyboard navigation).
  - Adhere to the project's single-source-of-truth for catalog items (`app/data/projects.json`).
  - Avoid dead code, obsolete shims, and unused imports.
- **Deliverables**: Clean, surgical, compilable code changes.

---

### 🔍 Role: Reviewer (Code Auditor)
- **Trigger**: Post-implementation verification or pre-commit checks.
- **Responsibilities**:
  - Run type checking: `npm run check`.
  - Verify that `projects.json` strictly passes Zod validation during build/runtime.
  - Audit for edge cases: empty project lists, broken image/video fallback links, mobile overlay behavior, theme toggle states (Dark / Light).
  - Ensure no sensitive information or unoptimized large binaries are introduced.
- **Deliverables**: Actionable review feedback, code refinements, and validation approvals.

---

### 🧪 Role: Tester (QA Engineer)
- **Trigger**: Verification of bug fixes, features, or UI layout changes.
- **Responsibilities**:
  - Run unit tests: `npm run test:unit` (Vitest).
  - Run smoke & static artifact tests: `npm run test:smoke` (Playwright).
  - Run visual regression tests when UI styling changes: `npm run test:visual`.
  - Validate production preview builds: `npm run build && npm run preview` checking `http://127.0.0.1:4173/my-portfolio/`.
- **Deliverables**: Test execution results, regression reports, and snapshot updates when intentional.

---

## 3. Dynamic Switching Protocol

When handling a user request, proceed through the roles in sequential gates:

1. **Inception / Planning**: Assume **Architect** to evaluate scope, constraints, and impact on contracts.
2. **Execution**: Assume **Implementer** to execute surgical edits adhering to the stack.
3. **Auditing**: Assume **Reviewer** to inspect types, styling consistency, and schema rules.
4. **Verification**: Assume **Tester** to run tests and smoke verification before completion.
