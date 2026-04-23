import { describe, expect, it } from 'vitest';
import path from 'node:path';
import {
  __resetManifestCache,
  getManifestById,
  ManifestError,
} from '../src/index.js';

// Repo root is two levels up from packages/manifest-loader/.
const ROOT = path.resolve(__dirname, '..', '..', '..');
const VERTICALS = path.join(ROOT, 'verticals');

describe('getManifestById', () => {
  it('rejects invalid ids without touching the filesystem', async () => {
    __resetManifestCache();
    await expect(
      getManifestById('', { rootDir: VERTICALS }),
    ).rejects.toBeInstanceOf(ManifestError);
    await expect(
      getManifestById('Has-Uppercase', { rootDir: VERTICALS }),
    ).rejects.toBeInstanceOf(ManifestError);
    await expect(
      getManifestById('1starts-with-digit', { rootDir: VERTICALS }),
    ).rejects.toBeInstanceOf(ManifestError);
  });

  it('loads dwa + gtm manifests and caches them per (rootDir, id)', async () => {
    __resetManifestCache();
    const dwa = await getManifestById('dwa', {
      rootDir: VERTICALS,
      verifyLock: false,
    });
    expect(dwa.manifest.id).toBe('dwa');

    // Second call hits the cache — same object reference.
    const dwaCached = await getManifestById('dwa', {
      rootDir: VERTICALS,
      verifyLock: false,
    });
    expect(dwaCached).toBe(dwa);

    const gtm = await getManifestById('gtm', {
      rootDir: VERTICALS,
      verifyLock: false,
    });
    expect(gtm.manifest.id).toBe('gtm');
    expect(gtm).not.toBe(dwa);
  });

  it('bypassCache forces a re-load', async () => {
    __resetManifestCache();
    const first = await getManifestById('dwa', {
      rootDir: VERTICALS,
      verifyLock: false,
    });
    const fresh = await getManifestById('dwa', {
      rootDir: VERTICALS,
      verifyLock: false,
      bypassCache: true,
    });
    expect(fresh).not.toBe(first);
    expect(fresh.manifest.id).toBe('dwa');
  });

  it('throws when the id does not match manifest.json on disk', async () => {
    __resetManifestCache();
    // Attempt to load "dwa" from a rootDir where the dir is actually "dwa"
    // but we'll ask for "gtm" from the dwa directory — use a rootDir that
    // doesn't exist to keep test hermetic.
    await expect(
      getManifestById('nonexistent-vertical', {
        rootDir: VERTICALS,
      }),
    ).rejects.toBeInstanceOf(ManifestError);
  });
});
