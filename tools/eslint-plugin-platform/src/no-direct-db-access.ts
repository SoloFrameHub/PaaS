import type { Rule } from 'eslint';

// ADR 0004 / Blueprint §6.2 — block direct `db` import outside the
// `@platform/tenancy/internal` barrel. All tenant-scoped DB work goes through
// `withTenant` / `withSystemAdmin`.

const ALLOWED_FILE_RE =
  /packages\/tenancy\/src\/internal\//;

const FORBIDDEN_SOURCES = new Set([
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
        'Disallow importing `db` from @platform/tenancy outside the internal barrel.',
    },
    schema: [],
    messages: {
      forbidden:
        'Direct `db` import from @platform/tenancy is forbidden. Use withTenant() / withSystemAdmin() instead. (ADR 0004)',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (ALLOWED_FILE_RE.test(filename)) return {};

    return {
      ImportDeclaration(node) {
        const src = String(node.source.value);
        if (!FORBIDDEN_SOURCES.has(src)) return;
        for (const spec of node.specifiers) {
          if (
            spec.type === 'ImportSpecifier' &&
            spec.imported.type === 'Identifier' &&
            spec.imported.name === 'db'
          ) {
            context.report({ node: spec, messageId: 'forbidden' });
          }
        }
      },
    };
  },
};

export default noDirectDbAccess;
