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
      const abs = path.join(verticalDir, relPath);
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
    const abs = path.join(verticalDir, rel);
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

async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}
