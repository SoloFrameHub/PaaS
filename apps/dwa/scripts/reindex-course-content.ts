/**
 * Course content verification at container start (Coolify).
 * Run: npx tsx scripts/reindex-course-content.ts && npm run start
 *
 * No Google/Vertex products. Course content is served from server/data/content at runtime.
 * AI is provided via OpenAI API. This script only verifies lesson files exist and exits 0.
 *
 * Usage: npx tsx scripts/reindex-course-content.ts
 */

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'server/data/content');

function collectMdFiles(dir: string, baseDir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...collectMdFiles(full, baseDir));
    } else if (e.isFile() && e.name.endsWith('.md')) {
      out.push(path.relative(baseDir, full));
    }
  }
  return out;
}

function main() {
  console.log('[reindex-course-content] Checking course content (no Google/Vertex; AI is OpenAI API).');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('[reindex-course-content] Content dir not found:', CONTENT_DIR);
    process.exit(0);
  }

  const relativePaths = collectMdFiles(CONTENT_DIR, CONTENT_DIR);
  console.log('[reindex-course-content] Found', relativePaths.length, 'lesson files. Content served from server/data/content.');
  process.exit(0);
}

main();
