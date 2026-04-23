import { describe, expect, it } from 'vitest';
import { tenantLeakHarness } from '../src/index.js';
import { TenancyError } from '@platform/tenancy';

describe('tenantLeakHarness', () => {
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
