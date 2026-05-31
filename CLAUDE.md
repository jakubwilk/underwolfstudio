# underwolfstudio — Claude context

## Project type

Next.js 16 frontend (App Router), TypeScript strict mode.

## Build & dev commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Tests: `npm test`

## Key conventions

- TypeScript strict mode — no `any`, no implicit returns
- Named exports only (except Next.js required defaults: page.tsx, layout.tsx)
- Import order enforced by ESLint (builtin → external → internal)
- Mantine UI for all components — prefer Mantine over raw HTML
- Tailwind for spacing/layout utilities only, not for component styling
- All components must have a co-located `.test.tsx` file
- Commit format: `feat|fix|chore|refactor(scope): description`

## Module architecture

Code is organised into feature modules under `src/modules/`:

- `common/` — the only module that can be imported by other modules. Contains shared components, hooks, API helpers, types, utils, and contexts.
- `<feature>/` (e.g. `auth`, `users`, `dashboard`) — self-contained domain modules. Each has: `api/`, `components/`, `context/`, `hooks/`, `models/`, `pages/`, `utils/`.

**Module boundary rule (enforced by ESLint):** modules must NOT import from each other. A module may only import from:

1. Its own files
2. `@/modules/common/**`
3. External packages

If code needs to be shared between two feature modules, move it to `common`.

## Folder conventions

- `src/app/` — Next.js routes and layouts only; no business logic here
- `src/modules/common/` — all cross-module shared code
- `src/modules/<feature>/pages/` — top-level page components, imported by `src/app/` routes
- `src/test/` — Vitest setup

## Testing

- Vitest + Testing Library
- Run: `npm test`
- Coverage: `npm run test:coverage`
