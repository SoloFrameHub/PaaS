import { describe, expect, it } from 'vitest';

import {
  TenancyError,
  isTenantMember,
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

describe('isTenantMember — UUID validation without DB', () => {
  it('returns false fast for non-UUID tenantId', async () => {
    await expect(isTenantMember('not-a-uuid', '00000000-0000-0000-0000-000000000001')).resolves.toBe(false);
  });

  it('returns false fast for non-UUID userId', async () => {
    await expect(isTenantMember('00000000-0000-0000-0000-000000000001', 'not-a-uuid')).resolves.toBe(false);
  });
});

// B-034 regression — membership gate must fail closed when the caller asks
// for membership enforcement but forgets to pass userId. Previously the gate
// was silently skipped, leaving the resolver trusting whatever x-tenant-slug
// was on the request.
describe('requireTenantContext — membership gate with no userId', () => {
  it('rejects when requireMembership defaults to true and userId is absent', async () => {
    const headers = new Headers({ 'x-tenant-slug': 'harness-pre-db' });
    // No DB is available in this test; we still expect the fail-closed path
    // to kick in before any DB call.
    await expect(
      requireTenantContext({ headers }),
    ).rejects.toBeInstanceOf(TenancyError);
  });

  it('does not throw up-front when requireMembership is explicitly false', async () => {
    const headers = new Headers();
    // With no header set at all, the function returns null/throws for a
    // different reason (no tenant). We only want to confirm the membership
    // gate itself does not pre-throw when it's opted out.
    await expect(
      requireTenantContext({ headers }, { requireMembership: false }),
    ).rejects.toThrow(/no x-tenant-slug/);
  });
});
