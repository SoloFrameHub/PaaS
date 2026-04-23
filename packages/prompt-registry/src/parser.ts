// Minimal YAML-frontmatter parser for prompt packs.
// Format:
//   ---
//   key: value
//   list:
//     - item
//   ---
//   <prompt body>
//
// We deliberately accept only the small subset we need for v1 prompt packs
// (string scalars, boolean, number, flat string lists). Avoids pulling in
// js-yaml for a pkg that's loaded at boot of every app.

export interface PromptFrontmatter {
  task?: string;
  model?: string;
  temperature?: number;
  vars?: string[];
  evals?: string[];
  notes?: string;
  [k: string]: unknown;
}

export interface ParsedPrompt {
  frontmatter: PromptFrontmatter;
  body: string;
}

const FRONT_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/;

export function parsePrompt(raw: string): ParsedPrompt {
  const m = raw.match(FRONT_RE);
  if (!m) {
    return { frontmatter: {}, body: raw.trim() };
  }
  const fm = parseSimpleYaml(m[1] ?? '');
  return { frontmatter: fm, body: (m[2] ?? '').trim() };
}

function parseSimpleYaml(src: string): PromptFrontmatter {
  const out: PromptFrontmatter = {};
  let currentList: { key: string; arr: string[] } | null = null;

  for (const rawLine of src.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;

    if (currentList && /^\s+-\s+/.test(line)) {
      const item = line.replace(/^\s+-\s+/, '').trim();
      currentList.arr.push(stripQuotes(item));
      continue;
    }
    currentList = null;

    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const key = kv[1]!;
    const valRaw = (kv[2] ?? '').trim();
    if (valRaw === '') {
      // start of a list block
      const arr: string[] = [];
      out[key] = arr;
      currentList = { key, arr };
      continue;
    }
    out[key] = coerce(valRaw);
  }
  return out;
}

function coerce(v: string): unknown {
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (/^-?\d+$/.test(v)) return Number.parseInt(v, 10);
  if (/^-?\d+\.\d+$/.test(v)) return Number.parseFloat(v);
  return stripQuotes(v);
}

function stripQuotes(v: string): string {
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  return v;
}
