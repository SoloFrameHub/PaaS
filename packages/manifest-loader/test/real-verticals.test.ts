import { describe, expect, it } from 'vitest';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  computeManifestLock,
  loadManifest,
} from '../src/index.js';
import { PromptRegistry } from '@platform/prompt-registry';

// Repo root is two levels up from packages/manifest-loader/.
const ROOT = path.resolve(__dirname, '..', '..', '..');

describe.each(['gtm', 'dwa'])('vertical %s', (id) => {
  const dir = path.join(ROOT, 'verticals', id);

  it('manifest parses and locks consistently', async () => {
    const { manifest } = await loadManifest({
      verticalDir: dir,
      verifyLock: false,
    });
    expect(manifest.id).toBe(id);
    const lock = await computeManifestLock(
      { manifest, verticalDir: dir },
      { '@platform/manifest-loader': '0.0.0' },
    );
    // Write the lock so subsequent runs can verify drift detection works.
    await writeFile(
      path.join(dir, 'manifest.lock'),
      JSON.stringify(lock, null, 2) + '\n',
    );
    const reloaded = await loadManifest({ verticalDir: dir });
    expect(reloaded.lock?.manifest.version).toBe(manifest.version);
  });

  it('prompt-registry resolves the active coaching prompt', async () => {
    const reg = new PromptRegistry({
      promptsDir: path.join(dir, 'prompts'),
    });
    const rec = await reg.resolveActive('coaching');
    expect(rec.key.task).toBe('coaching');
    expect(rec.frontmatter.task).toBe('coaching');
    expect(rec.body.length).toBeGreaterThan(20);
  });
});
