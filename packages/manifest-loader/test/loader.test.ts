import { describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {
  computeManifestLock,
  loadManifest,
  ManifestLockMismatchError,
} from '../src/index.js';

async function fixture() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'manifest-test-'));
  await mkdir(path.join(dir, 'branding'), { recursive: true });
  await mkdir(path.join(dir, 'prompts', 'coaching'), { recursive: true });
  await writeFile(
    path.join(dir, 'branding', 'theme.json'),
    JSON.stringify({ name: 'x' }),
  );
  await writeFile(
    path.join(dir, 'navigation.json'),
    JSON.stringify({ version: 1, tree: [] }),
  );
  await writeFile(
    path.join(dir, 'prompts', 'coaching', 'v1.md'),
    '---\ntask: coaching\n---\nhello',
  );
  await writeFile(
    path.join(dir, 'manifest.json'),
    JSON.stringify({
      $schema: 'https://platform.tld/schemas/vertical-manifest/v1',
      id: 'xtest',
      version: '0.1.0',
      kind: 'first_party',
      displayName: 'X',
      modules: { content: { rootPath: './content' } },
      compliance: {
        phi: false,
        gdpr: true,
        dataRetentionDays: 395,
        redactPromptsInAudit: false,
      },
      ai: { modelOverrides: {}, temperature: {}, guardrails: [] },
      branding: { themePath: './branding/theme.json' },
      navigation: { path: './navigation.json' },
      prompts: [
        { task: 'coaching', path: './prompts/coaching', version: 'v1' },
      ],
      knowledge: [],
      scenarios: [],
      assessments: [],
      artifacts: [],
      workflows: [],
      events: ['session.created'],
      roles: ['super_admin', 'tenant_admin', 'member'],
      billingPlans: [],
      features: {},
      extensions: [],
    }),
  );
  return dir;
}

describe('loadManifest', () => {
  it('parses + validates manifest.json', async () => {
    const dir = await fixture();
    try {
      const { manifest } = await loadManifest({
        verticalDir: dir,
        verifyLock: false,
      });
      expect(manifest.id).toBe('xtest');
      expect(manifest.version).toBe('0.1.0');
      expect(manifest.modules.content?.rootPath).toBe('./content');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('compute + verify lock round-trips', async () => {
    const dir = await fixture();
    try {
      const { manifest } = await loadManifest({
        verticalDir: dir,
        verifyLock: false,
      });
      const lock = await computeManifestLock(
        { manifest, verticalDir: dir },
        { '@platform/manifest-loader': '0.0.0' },
      );
      await writeFile(
        path.join(dir, 'manifest.lock'),
        JSON.stringify(lock, null, 2),
      );
      const reloaded = await loadManifest({ verticalDir: dir });
      expect(reloaded.lock).not.toBeNull();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('throws ManifestLockMismatchError on asset drift', async () => {
    const dir = await fixture();
    try {
      const { manifest } = await loadManifest({
        verticalDir: dir,
        verifyLock: false,
      });
      const lock = await computeManifestLock(
        { manifest, verticalDir: dir },
        {},
      );
      await writeFile(
        path.join(dir, 'manifest.lock'),
        JSON.stringify(lock, null, 2),
      );
      // Tamper with a referenced asset.
      await writeFile(
        path.join(dir, 'prompts', 'coaching', 'v1.md'),
        '---\ntask: coaching\n---\ntampered',
      );
      await expect(loadManifest({ verticalDir: dir })).rejects.toBeInstanceOf(
        ManifestLockMismatchError,
      );
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
