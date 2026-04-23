// Blueprint §10 Day 5 — tenant-leak harness.
// Spins up two tenants, inserts via withTenant(A), attempts read via
// withTenant(B), asserts 0 rows + audit row with outcome='denied'.
//
// This is the API. The implementation calls the real Drizzle wrapper from
// @platform/tenancy/internal once migration 0001 has been applied to a live
// Postgres. Until then the harness throws a clear "needs DB" error so CI
// surfaces it instead of silently passing.

import { TenancyError } from '@platform/tenancy';

export interface TenantLeakHarnessResult {
  tenantA: string;
  tenantB: string;
  crossReadRows: number;        // must be 0
  crossReadAuditDenied: boolean; // must be true
}

export interface TenantLeakHarnessOptions {
  /** Provide a connection string when running against a real Postgres. */
  databaseUrl?: string;
  /** Override the harness fixture table name (default: tenant_member). */
  fixtureTable?: string;
}

export async function tenantLeakHarness(
  _opts: TenantLeakHarnessOptions = {},
): Promise<TenantLeakHarnessResult> {
  const url = _opts.databaseUrl ?? process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new TenancyError(
      'tenantLeakHarness: TEST_DATABASE_URL not set. The harness requires a live Postgres with migrations 0001 and 0002 applied.',
    );
  }
  // Real implementation lands when withTenant() is wired to Drizzle (Day 4 in
  // §10). Until then, fail loud rather than silently pass.
  throw new TenancyError(
    'tenantLeakHarness: not yet implemented — pending withTenant() wiring (Implementation Blueprint §10 Day 4).',
  );
}
