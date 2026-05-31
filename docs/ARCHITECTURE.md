# Architecture

## Routing

Uses Next.js App Router. All routes live in `src/app/`. Routes should be thin — they import page components from the relevant module's `pages/` folder and render them.

Example:

```tsx
// src/app/auth/login/page.tsx
import { LoginPage } from '@/modules/auth/pages/LoginPage';
export default LoginPage;
```

## Module structure

All business logic lives in `src/modules/`. Each module is a self-contained domain slice:

```
src/modules/
├── common/             # Shared across ALL modules — the only permitted cross-module import
│   ├── api/            # Shared fetch helpers, API client setup
│   ├── components/     # Design-system-level shared components
│   ├── context/        # App-wide React contexts (e.g. AuthContext, ThemeContext)
│   ├── hooks/          # Shared hooks (e.g. useDebounce, useLocalStorage)
│   ├── models/         # Shared TypeScript types/interfaces
│   └── utils/          # Shared pure utilities
└── <feature>/          # One directory per domain (auth, users, dashboard, …)
    ├── api/            # React Query hooks or fetch functions for this module's endpoints
    ├── components/     # UI components used only within this module
    ├── context/        # Module-scoped React context (e.g. WizardContext)
    ├── hooks/          # Custom hooks specific to this module
    ├── models/         # TypeScript types/interfaces for this module
    ├── pages/          # Top-level page components; imported by src/app/ routes
    └── utils/          # Pure utilities specific to this module
```

### Module boundary rule

**Modules may only import from `common` or from within themselves.**

```
✅ src/modules/auth/components/LoginForm.tsx
     → imports from @/modules/auth/hooks/useLogin        (same module — OK)
     → imports from @/modules/common/components/Button   (common — OK)

❌ src/modules/auth/components/LoginForm.tsx
     → imports from @/modules/users/hooks/useUser        (cross-module — LINT ERROR)
```

This is enforced automatically by the `no-restricted-imports` ESLint rule. If two modules need the same piece of code, move it to `common`.

## State management

- Local state: `useState` / `useReducer`
- Module-scoped shared state: React Context in `<module>/context/`
- App-wide shared state: React Context in `common/context/`
- Server state / data fetching: React Query (add `@tanstack/react-query` if needed)

## Data fetching

- Server Components for initial SSR data
- React Query hooks in `<module>/api/` for client-side fetching and caching

## Styling strategy

- **Mantine UI** — primary component library for all interactive UI
- **Tailwind CSS** — utility classes for layout and spacing only
- Do not mix Mantine's `sx` prop with Tailwind on the same element

## Environment variables

Store in `.env.local` (gitignored). Prefix public vars with `NEXT_PUBLIC_`.
