import { describe, expect, it } from 'vitest';

import {
  TenancyError,
  maybeTenantContext,
  requireTenantContext,
  resolveTenantBySlug,
  __resetTenantResolverCache,
} from '../src/index.js';

describe('resolveTenantBySlug — pre-DB', () => {
  it('returns null for an empty slug without calling the DB', async () => {
    await expect(resolveTenantBySlug('')).resolves.toBe(null);
  });
});

describe('maybeTenantContext — without a live DB', () => {
  it('returns null when no tenant header is set', async () => {
    const fakeRequest = { headers: new Headers() };
    await expect(maybeTenantContext(fakeRequest)).resolves.toBe(null);
  });
});

describe('requireTenantContext — without a live DB', () => {
  it('throws TenancyError when no tenant header is set', async () => {
    const fakeRequest = { headers: new Headers() };
    await expect(requireTenantContext(fakeRequest)).rejects.toBeInstanceOf(
      TenancyError,
    );
  });
});

describe('__resetTenantResolverCache', () => {
  it('is a no-op when the cache is empty', () => {
    expect(() => __resetTenantResolverCache()).not.toThrow();
  });
});
