import { describe, expect, it } from 'vitest';

import { TenancyError, withTenant } from '../src/index.js';

const noop = async () => {
  throw new Error('fn should not run');
};

describe('withTenant — pre-connection validation', () => {
  it('throws TenancyError when tenantId is missing', async () => {
    await expect(
      // @ts-expect-error — exercising the runtime guard
      withTenant({}, noop),
    ).rejects.toBeInstanceOf(TenancyError);
  });

  it('throws TenancyError when tenantId is not a UUID', async () => {
    await expect(
      withTenant({ tenantId: 'not-a-uuid' }, noop),
    ).rejects.toBeInstanceOf(TenancyError);
  });

  it('throws TenancyError when userId is not a UUID', async () => {
    await expect(
      withTenant(
        {
          tenantId: '00000000-0000-0000-0000-000000000001',
          userId: 'not-a-uuid',
        },
        noop,
      ),
    ).rejects.toBeInstanceOf(TenancyError);
  });
});
