import { readdirSync } from 'node:fs';

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const MODULES_DIR = './src/modules';

const featureModules = readdirSync(MODULES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'common')
  .map((entry) => entry.name);

// Module boundaries: a feature module may import only from itself and `common`;
// `common` may not import from any feature module.
const moduleBoundaryZones = [
  ...featureModules.map((name) => ({
    target: `${MODULES_DIR}/${name}`,
    from: MODULES_DIR,
    except: [`./${name}`, './common'],
    message: 'Cross-module imports are forbidden. Shared code belongs in @/modules/common.',
  })),
  {
    target: `${MODULES_DIR}/common`,
    from: MODULES_DIR,
    except: ['./common'],
    message: '@/modules/common must not depend on feature modules.',
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-restricted-paths': ['error', { zones: moduleBoundaryZones }],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
  ]),
]);

export default eslintConfig;
