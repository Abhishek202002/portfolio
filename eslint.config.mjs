import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    rules: {
      // Disallow `any` — use `unknown` + type guards instead
      '@typescript-eslint/no-explicit-any': 'error',
      // Unused vars — allow underscore-prefixed intentional ignores
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Consistent imports
      'import/order': 'off', // handled by prettier-plugin-sort-imports if needed
      // React not needed in scope (Next.js auto-imports)
      'react/react-in-jsx-scope': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
