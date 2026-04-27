import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import {
  type ManifestLock,
  ManifestLockZ,
  type VerticalManifest,
  VerticalManifestZ,
} from '@platform/contracts';
import { ManifestError, ManifestLockMismatchError } from './errors.js';
import { sha256File } from './hash.js';

export interface LoadManifestOptions {
  /** Absolute path to the directory containing manifest.json. */
  verticalDir: string;
  /** When true (default in prod), verify manifest.lock and throw on drift. */
  verifyLock?: boolean;
}

export interface LoadedManifest {
  manifest: VerticalManifest;
  lock: ManifestLock | null;
  verticalDir: string;
}

/**
 * Read + Zod-validate a vertical manifest from disk. When `verifyLock` is true
 * (the default), also verify every referenced asset's sha256 matches
 * manifest.lock — boot fails on drift, per Blueprint §7.3.
 */
export async function loadManifest(
  opts: LoadManifestOptions,
): Promise<LoadedManifest> {
  const { verticalDir } = opts;
  const verifyLock = opts.verifyLock ?? true;

  const manifestPath = path.join(verticalDir, 'manifest.json');
  const lockPath = path.join(verticalDir, 'manifest.lock');

  const raw = await readFileOr(manifestPath);
  if (!raw) {
    throw new ManifestError(
      `manifest.json not found at ${manifestPath}`,
    );
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new ManifestError(
      `manifest.json is not valid JSON at ${manifestPath}: ${(err as Error).message}`,
    );
  }
  const manifest = VerticalManifestZ.parse(parsed);

  let lock: ManifestLock | null = null;
  const lockRaw = await readFileOr(lockPath);
  if (lockRaw) {
    try {
      lock = ManifestLockZ.parse(JSON.parse(lockRaw));
    } catch (err) {
      throw new ManifestError(
        `manifest.lock is invalid at ${lockPath}: ${(err as Error).message}`,
      );
    }
  }

  if (verifyLock) {
    if (!lock) {
      throw new ManifestError(
        `manifest.lock not found at ${lockPath} — required when verifyLock=true`,
      );
    }
    if (lock.manifest.version !== manifest.version) {
      throw new ManifestError(
        `manifest.lock version (${lock.manifest.version}) != manifest.version (${manifest.version})`,
      );
    }
    for (const [relPath, expected] of Object.entries(lock.assets)) {
      const abs = resolveInside(verticalDir, relPath);
      if (!(await pathExists(abs))) {
        throw new ManifestError(
          `manifest.lock references missing asset ${relPath}`,
        );
      }
      const actual = `sha256:${await sha256File(abs)}`;
      if (actual !== expected) {
        throw new ManifestLockMismatchError(relPath, expected, actual);
      }
    }
  }

  return { manifest, lock, verticalDir };
}

/**
 * Compute a manifest.lock by hashing every asset referenced from the manifest.
 * Used by Studio publish + by `manifest-cli` during local dev.
 */
export async function computeManifestLock(
  loaded: Pick<LoadedManifest, 'manifest' | 'verticalDir'>,
  engineVersions: Record<string, string> = {},
): Promise<ManifestLock> {
  const { manifest, verticalDir } = loaded;
  const assetPaths = collectAssetPaths(manifest);
  const assets: Record<string, string> = {};
  for (const rel of assetPaths) {
    const abs = resolveInside(verticalDir, rel);
    if (!(await pathExists(abs))) continue;
    assets[rel] = `sha256:${await sha256File(abs)}`;
  }
  const manifestPath = path.join(verticalDir, 'manifest.json');
  const manifestSha = await sha256File(manifestPath);
  return {
    manifest: { version: manifest.version, sha256: manifestSha },
    engines: engineVersions,
    assets,
  };
}

/**
 * Join `verticalDir` with a manifest-supplied relative path and refuse any
 * result that escapes `verticalDir`. For first-party verticals the paths are
 * trusted, but Studio / self-serve manifests (Blueprint §9) will be
 * attacker-controlled; a `../../etc/passwd` entry would otherwise resolve
 * outside the vertical tree. (B-037)
 */
function resolveInside(verticalDir: string, relPath: string): string {
  if (path.isAbsolute(relPath)) {
    throw new ManifestError(
      `manifest path escapes vertical root (absolute): ${relPath}`,
    );
  }
  const resolvedRoot = path.resolve(verticalDir);
  const resolved = path.resolve(resolvedRoot, relPath);
  const rel = path.relative(resolvedRoot, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new ManifestError(
      `manifest path escapes vertical root: ${relPath}`,
    );
  }
  return resolved;
}

function collectAssetPaths(m: VerticalManifest): string[] {
  const out = new Set<string>();
  out.add(m.branding.themePath.replace(/^\.\//, ''));
  out.add(m.navigation.path.replace(/^\.\//, ''));
  for (const p of m.prompts) addAssetGroup(out, p.path, p.version, '.md');
  for (const p of m.knowledge) addAssetGroup(out, p.path, p.version, '');
  for (const p of m.scenarios) addAssetGroup(out, p.path, p.version, '.json');
  for (const p of m.assessments) addAssetGroup(out, p.path, p.version, '.json');
  for (const p of m.artifacts) addAssetGroup(out, p.path, p.version, '.json');
  for (const p of m.workflows) addAssetGroup(out, p.path, p.version, '.json');
  return Array.from(out);
}

function addAssetGroup(
  set: Set<string>,
  basePath: string,
  version: string,
  suffix: string,
): void {
  // Strip leading "./" — manifest paths are relative to verticalDir.
  const clean = basePath.replace(/^\.\//, '');
  set.add(`${clean}/${version}${suffix}`);
}

async function readFileOr(p: string): Promise<string | null> {
  try {
    return await readFile(p, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Resolve a manifest id (the `id` in manifest.json) to a `verticals/<id>/`
 * directory below a root. When `rootDir` is omitted, we look at
 * `MANIFEST_VERTICAL_ROOT` then fall back to `<cwd>/verticals`. Apps set
 * the env var to an absolute path at boot; dev + CI can rely on cwd.
 */
export interface GetManifestByIdOptions {
  rootDir?: string;
  verifyLock?: boolean;
  /** Bypass the in-process cache. Test hook + admin tools. */
  bypassCache?: boolean;
}

interface ManifestCacheEntry {
  loaded: LoadedManifest;
  loadedAt: number;
}

const manifestCache = new Map<string, ManifestCacheEntry>();

/** Test hook — do not call from production code. */
export function __resetManifestCache(): void {
  manifestCache.clear();
}

function resolveVerticalsRoot(rootDir: string | undefined): string {
  if (rootDir) return rootDir;
  const fromEnv = process.env.MANIFEST_VERTICAL_ROOT;
  if (fromEnv) return fromEnv;
  return path.join(process.cwd(), 'verticals');
}

export async function getManifestById(
  id: string,
  options: GetManifestByIdOptions = {},
): Promise<LoadedManifest> {
  if (!id) {
    throw new ManifestError('getManifestById: id is required');
  }
  // Manifest ids share the slug alphabet — keep consistent with
  // @platform/tenancy's slug regex so tenant.manifest_id round-trips.
  if (!/^[a-z][a-z0-9-]{1,62}$/.test(id)) {
    throw new ManifestError(
      `getManifestById: invalid id "${id}" — must match /^[a-z][a-z0-9-]{1,62}$/`,
    );
  }

  const cacheKey = `${resolveVerticalsRoot(options.rootDir)}::${id}`;
  if (!options.bypassCache) {
    const hit = manifestCache.get(cacheKey);
    if (hit) return hit.loaded;
  }

  const verticalDir = path.join(resolveVerticalsRoot(options.rootDir), id);
  const loaded = await loadManifest({
    verticalDir,
    verifyLock: options.verifyLock,
  });
  if (loaded.manifest.id !== id) {
    throw new ManifestError(
      `getManifestById: manifest.id "${loaded.manifest.id}" at ${verticalDir} does not match requested id "${id}"`,
    );
  }
  manifestCache.set(cacheKey, { loaded, loadedAt: Date.now() });
  return loaded;
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}
