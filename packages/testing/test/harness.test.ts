import { afterAll, describe, expect, it } from 'vitest';
import { tenantLeakHarness } from '../src/index.js';
import { TenancyError } from '@platform/tenancy';
import { __closePool } from '@platform/tenancy/internal';

describe('tenantLeakHarness — pre-flight', () => {
  it('throws when TEST_DATABASE_URL is not set', async () => {
    const prev = process.env.TEST_DATABASE_URL;
    delete process.env.TEST_DATABASE_URL;
    try {
      await expect(tenantLeakHarness()).rejects.toBeInstanceOf(TenancyError);
    } finally {
      if (prev !== undefined) process.env.TEST_DATABASE_URL = prev;
    }
  });
});

// Integration: runs only when TEST_DATABASE_URL is set. This is how CI + local
// devs opt in. Without a live Postgres (migrations 0001+0002 applied, roles
// platform_system / platform_tenant created), we cannot prove RLS works.
describe.runIf(Boolean(process.env.TEST_DATABASE_URL))(
  'tenantLeakHarness — live',
  () => {
    afterAll(async () => {
      await __closePool();
    });

    it('blocks cross-tenant reads and RLS-rejects cross-tenant writes', async () => {
      const result = await tenantLeakHarness();

      expect(result.crossReadRows).toBe(0);
      expect(result.crossWriteDenied).toBe(true);
      expect(result.tenantA).not.toBe(result.tenantB);
    }, 30_000);
  },
);
