import type { Rule } from 'eslint';

// ADR 0004 / Blueprint §6.2 — apps, verticals, and adapters MUST NOT reach
// into `@platform/tenancy/internal`. That subpath exposes the privileged
// Drizzle handle (`getDb`, `schema`, `__closePool`) that bypasses the RLS
// role pinning. Tenant-scoped work goes through `withTenant` /
// `withSystemAdmin` from the package root.
//
// `packages/tenancy` itself, `packages/testing` (tenantLeakHarness),
// `tools/tenancy` (seed-tenant), and `tools/platform-ops` may use the
// internal barrel legitimately.
//
// B-035: the previous rule only caught a non-existent `db` symbol and left
// the `@platform/tenancy/internal` subpath completely open.

// Paths allowed to import the tenancy internal DB barrel. The testing
// package's harness tests drive `withSystemAdmin` + schema via the internal
// surface to prove RLS behaviour end-to-end — exempted alongside its src/.
const ALLOWED_FILE_RE =
  /(packages[\/\\]tenancy[\/\\](src|test)[\/\\]|packages[\/\\]testing[\/\\](src|test)[\/\\]|tools[\/\\]tenancy[\/\\]|tools[\/\\]platform-ops[\/\\])/;

const FORBIDDEN_INTERNAL_SOURCES = new Set([
  '@platform/tenancy/internal',
  '@platform/tenancy/dist/internal',
  '@platform/tenancy/dist/internal/index',
]);

const FORBIDDEN_ROOT_SOURCES = new Set([
  '@platform/tenancy',
  '@platform/tenancy/index',
  '@platform/tenancy/dist',
  '@platform/tenancy/dist/index',
]);

const noDirectDbAccess: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow direct access to the tenancy internal DB barrel. Use withTenant() / withSystemAdmin() instead.',
    },
    schema: [],
    messages: {
      forbiddenInternal:
        'Importing from `@platform/tenancy/internal` is forbidden outside the tenancy package and ops tools. Use withTenant() / withSystemAdmin() from @platform/tenancy instead. (ADR 0004)',
      forbiddenDb:
        'Direct `db` import from @platform/tenancy is forbidden. Use withTenant() / withSystemAdmin() instead. (ADR 0004)',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (ALLOWED_FILE_RE.test(filename)) return {};

    return {
      ImportDeclaration(node) {
        const src = String(node.source.value);

        if (FORBIDDEN_INTERNAL_SOURCES.has(src)) {
          context.report({ node, messageId: 'forbiddenInternal' });
          return;
        }

        if (FORBIDDEN_ROOT_SOURCES.has(src)) {
          for (const spec of node.specifiers) {
            if (
              spec.type === 'ImportSpecifier' &&
              spec.imported.type === 'Identifier' &&
              spec.imported.name === 'db'
            ) {
              context.report({ node: spec, messageId: 'forbiddenDb' });
            }
          }
        }
      },
    };
  },
};

export default noDirectDbAccess;
