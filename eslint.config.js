// Flat config root. Per-package overrides live in each package's
// eslint.config.js when needed.

import platformPlugin from './tools/eslint-plugin-platform/dist/index.js';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/coverage/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    plugins: {
      '@platform': platformPlugin,
    },
    rules: {
      '@platform/no-direct-db-access': 'error',
      '@platform/no-cross-vertical-import': 'error',
    },
  },
];
