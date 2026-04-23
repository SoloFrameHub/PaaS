import { TenancyError } from './errors.js';

// Blueprint §6.2 Layer 3 — Drizzle wrapper.
// Full implementation (transaction + SET LOCAL app.tenant_id/app.user_id +
// SET LOCAL ROLE platform_tenant|platform_system) lands in Commit 5 / Day 4
// of §10 once the Drizzle schema and Postgres roles exist. This stub defines
// the public API shape the engines will depend on so they can be written
// against it today.

export interface TenantContext {
  tenantId: string;
  userId: string | null;
  role?: 'system' | 'tenant';
}

/**
 * Placeholder `TenantTx`. The real one is the Drizzle transaction type, exposed
 * from `@platform/tenancy/internal` once migrations land. Engines MUST import
 * this alias — never `db` directly.
 */
export type TenantTx = {
  readonly __tenantTxBrand: unique symbol;
};

export async function withTenant<T>(
  ctx: TenantContext,
  _fn: (tx: TenantTx) => Promise<T>,
): Promise<T> {
  if (!ctx.tenantId && ctx.role !== 'system') {
    throw new TenancyError('withTenant called without tenantId');
  }
  throw new TenancyError(
    'withTenant stub: DB transaction not wired yet — lands with migration 0001 (§10 Day 3).',
  );
}

export async function withSystemAdmin<T>(
  _fn: (tx: TenantTx) => Promise<T>,
): Promise<T> {
  throw new TenancyError(
    'withSystemAdmin stub: DB transaction not wired yet — lands with migration 0001 (§10 Day 3).',
  );
}
