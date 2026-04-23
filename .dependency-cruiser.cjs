// Implementation Blueprint §3.1 — only allowed arrows in the dep graph.
// Reverse arrows are CI failures.

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-package-imports-app-or-vertical',
      severity: 'error',
      comment:
        'packages/* MUST NOT import from apps/* or verticals/* (Blueprint §3.1).',
      from: { path: '^packages/' },
      to:   { path: '^(apps|verticals)/' },
    },
    {
      name: 'no-cross-vertical',
      severity: 'error',
      comment:
        'verticals/<a> MUST NOT import from verticals/<b> (Blueprint §3.1).',
      from: { path: '^verticals/([^/]+)/' },
      to:   { path: '^verticals/(?!\\1/)' },
    },
    {
      name: 'no-adapter-imports-engine-or-app',
      severity: 'error',
      comment:
        'adapters/* are leaves — they MUST NOT import from packages/* or apps/* (Blueprint §3.1).',
      from: { path: '^adapters/' },
      to:   { path: '^(packages|apps)/' },
    },
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies break tree-shaking and load order.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'Orphans likely dead code.',
      from: {
        orphan: true,
        pathNot: [
          '\\.d\\.ts$',
          '\\.config\\.(ts|js|cjs|mjs)$',
          'eslint\\.config\\.',
          '\\.dependency-cruiser\\.cjs$',
        ],
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.base.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      mainFields: ['main', 'types'],
    },
    reporterOptions: {
      dot: { theme: { graph: { rankdir: 'TB' } } },
    },
  },
};
