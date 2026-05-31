# underwolfstudio

Next.js 16 frontend with TypeScript strict mode, Mantine UI, and Tailwind CSS.

## Tech stack

- **Next.js 16** — App Router
- **TypeScript** — strict mode
- **Mantine UI** — component library
- **Tailwind CSS** — spacing & layout utilities
- **Vitest + Testing Library** — unit tests
- **ESLint + Prettier** — linting & formatting
- **Husky + lint-staged** — pre-commit hooks

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Production build               |
| `npm run lint`          | Lint and auto-fix              |
| `npm run format`        | Format all files with Prettier |
| `npm test`              | Run tests                      |
| `npm run test:coverage` | Run tests with coverage report |

## Project structure

```
src/
├── app/               # Next.js routes and layouts only
├── modules/
│   ├── common/        # Shared components, hooks, utils (importable by all modules)
│   └── <feature>/     # Self-contained domain modules
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── models/
│       ├── pages/
│       └── utils/
└── test/              # Vitest setup
```

## Module rules

- Feature modules must **not** import from each other
- Shared code belongs in `common/`
- Page components live in `<feature>/pages/` and are imported by `src/app/` routes

## VS Code

Open the project in VS Code — format-on-save is pre-configured via `.vscode/settings.json`.
Required extensions: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
