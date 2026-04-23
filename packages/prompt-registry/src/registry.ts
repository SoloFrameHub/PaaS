import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { type ParsedPrompt, parsePrompt } from './parser.js';

export interface PromptKey {
  task: string;
  version: string; // e.g. "v3"
}

export interface PromptRecord extends ParsedPrompt {
  key: PromptKey;
  filePath: string;
}

export interface PromptRegistryOptions {
  /** Absolute path to a vertical's prompts/ directory. */
  promptsDir: string;
  /** Skip cache (always re-read from disk). Used in dev hot-reload. */
  noCache?: boolean;
}

export class PromptRegistry {
  readonly promptsDir: string;
  private readonly noCache: boolean;
  private readonly cache = new Map<string, PromptRecord>();

  constructor(opts: PromptRegistryOptions) {
    this.promptsDir = opts.promptsDir;
    this.noCache = opts.noCache ?? false;
  }

  async list(): Promise<PromptKey[]> {
    const tasks = await readDirOr(this.promptsDir);
    const out: PromptKey[] = [];
    for (const task of tasks) {
      const taskDir = path.join(this.promptsDir, task);
      if (!(await isDir(taskDir))) continue;
      const files = await readDirOr(taskDir);
      for (const f of files) {
        const m = /^(v\d+)\.md$/.exec(f);
        if (!m) continue;
        out.push({ task, version: m[1]! });
      }
    }
    return out;
  }

  /**
   * Resolve the active version for a task by reading `_active.txt` (one line),
   * falling back to the highest `vN`.
   */
  async resolveActive(task: string): Promise<PromptRecord> {
    const taskDir = path.join(this.promptsDir, task);
    const activePath = path.join(taskDir, '_active.txt');
    let active: string | null = null;
    try {
      active = (await readFile(activePath, 'utf8')).trim();
    } catch {
      // fall through
    }
    if (!active) {
      const versions = (await this.list())
        .filter((k) => k.task === task)
        .map((k) => k.version)
        .sort(byVersionDesc);
      active = versions[0] ?? null;
    }
    if (!active) {
      throw new Error(`prompt-registry: no versions found for task '${task}'`);
    }
    return this.get({ task, version: active });
  }

  async get(key: PromptKey): Promise<PromptRecord> {
    const cacheKey = `${key.task}@${key.version}`;
    if (!this.noCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    const filePath = path.join(this.promptsDir, key.task, `${key.version}.md`);
    const raw = await readFile(filePath, 'utf8');
    const parsed = parsePrompt(raw);
    const record: PromptRecord = { key, filePath, ...parsed };
    if (!this.noCache) this.cache.set(cacheKey, record);
    return record;
  }

  /**
   * Diff two versions of the same task — body unified-ish diff (line-level).
   * Used by Studio review UI / `manifest-cli diff`. Returns null when versions
   * are identical.
   */
  async diff(
    task: string,
    fromVersion: string,
    toVersion: string,
  ): Promise<{ added: string[]; removed: string[] } | null> {
    const a = await this.get({ task, version: fromVersion });
    const b = await this.get({ task, version: toVersion });
    if (a.body === b.body) return null;
    const aLines = new Set(a.body.split('\n'));
    const bLines = new Set(b.body.split('\n'));
    const added = [...bLines].filter((l) => !aLines.has(l));
    const removed = [...aLines].filter((l) => !bLines.has(l));
    return { added, removed };
  }
}

function byVersionDesc(a: string, b: string): number {
  const an = Number.parseInt(a.replace(/^v/, ''), 10);
  const bn = Number.parseInt(b.replace(/^v/, ''), 10);
  return bn - an;
}

async function readDirOr(p: string): Promise<string[]> {
  try {
    return await readdir(p);
  } catch {
    return [];
  }
}

async function isDir(p: string): Promise<boolean> {
  try {
    const s = await stat(p);
    return s.isDirectory();
  } catch {
    return false;
  }
}
