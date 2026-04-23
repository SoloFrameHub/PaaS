import type { Rule } from 'eslint';
import path from 'node:path';

// Blueprint §3.1 — `verticals/<a>` MUST NOT import `verticals/<b>`.

const VERTICAL_RE = /verticals[\/\\]([^\/\\]+)[\/\\]/;

const noCrossVerticalImport: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports across verticals/.',
    },
    schema: [],
    messages: {
      forbidden:
        'Cross-vertical import is forbidden ({{from}} -> {{to}}). Move shared code into a @platform/* engine. (Blueprint §3.1)',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    const fromMatch = filename.match(VERTICAL_RE);
    if (!fromMatch) return {};
    const fromVertical = fromMatch[1];

    return {
      ImportDeclaration(node) {
        const src = String(node.source.value);
        if (!src.startsWith('.')) return;
        const resolved = path.resolve(path.dirname(filename), src);
        const toMatch = resolved.match(VERTICAL_RE);
        if (!toMatch) return;
        const toVertical = toMatch[1];
        if (toVertical !== fromVertical) {
          context.report({
            node,
            messageId: 'forbidden',
            data: { from: String(fromVertical), to: String(toVertical) },
          });
        }
      },
    };
  },
};

export default noCrossVerticalImport;
