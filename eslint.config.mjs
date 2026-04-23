// Flat config root.
import tseslint from 'typescript-eslint';
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
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    plugins: {
      '@platform': platformPlugin,
    },
    rules: {
      '@platform/no-direct-db-access': 'error',
      '@platform/no-cross-vertical-import': 'error',
      // The recommended preset is strict; relax a few that fire heavily in
      // the stub/skeleton phase without adding safety.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
