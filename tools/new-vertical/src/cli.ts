#!/usr/bin/env node
// pnpm new-vertical <id> [--display "..."]
// Copies verticals/_template -> verticals/<id> with placeholders replaced.

import { cp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ID_RE = /^[a-z][a-z0-9-]{1,30}$/;

async function main() {
  const args = process.argv.slice(2);
  const id = args[0];
  const displayIdx = args.indexOf('--display');
  const display =
    displayIdx >= 0 && args[displayIdx + 1] ? args[displayIdx + 1]! : id;

  if (!id || !ID_RE.test(id)) {
    console.error(
      'usage: new-vertical <id> [--display "Name"]\n  id must match /^[a-z][a-z0-9-]{1,30}$/',
    );
    process.exit(1);
  }

  // Find the monorepo root by walking up looking for pnpm-workspace.yaml.
  const root = await findRepoRoot(process.cwd());
  if (!root) {
    console.error('error: not inside a solofame-platform monorepo');
    process.exit(1);
  }
  const src = path.join(root, 'verticals', '_template');
  const dst = path.join(root, 'verticals', id);

  if (await pathExists(dst)) {
    console.error(`error: ${dst} already exists`);
    process.exit(1);
  }

  await cp(src, dst, { recursive: true });

  // Replace placeholders in every file.
  const replacements: Array<[RegExp, string]> = [
    [/__VERTICAL_ID__/g, id],
    [/__DISPLAY_NAME__/g, display!],
  ];
  await walkAndReplace(dst, replacements);

  console.log(`✓ created ${dst}`);
  console.log(`  next: edit verticals/${id}/manifest.json and add prompts/<task>/v1.md`);
}

async function findRepoRoot(start: string): Promise<string | null> {
  let dir = start;
  for (let i = 0; i < 20; i++) {
    if (await pathExists(path.join(dir, 'pnpm-workspace.yaml'))) return dir;
    const next = path.dirname(dir);
    if (next === dir) return null;
    dir = next;
  }
  return null;
}

async function walkAndReplace(
  dir: string,
  replacements: Array<[RegExp, string]>,
): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walkAndReplace(p, replacements);
      continue;
    }
    if (!e.isFile()) continue;
    if (isBinaryByExt(e.name)) continue;
    let body = await readFile(p, 'utf8');
    let changed = false;
    for (const [re, val] of replacements) {
      if (re.test(body)) {
        body = body.replace(re, val);
        changed = true;
      }
    }
    if (changed) await writeFile(p, body, 'utf8');
  }
}

function isBinaryByExt(name: string): boolean {
  return /\.(png|jpe?g|gif|ico|pdf|zip|woff2?|ttf|otf|svg)$/i.test(name);
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
