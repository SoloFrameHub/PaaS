/**
 * Per-app tenant transaction wrapper. Mirrors @platform/tenancy.withTenant
 * but operates on the DWA-local Drizzle pool so the transaction is typed
 * against the DWA schema (apps/dwa/lib/db/schema.ts).
 *
 * Both this wrapper and @platform/tenancy.withTenant connect to the same
 * Postgres database via the same DATABASE_URL. RLS only sees the SET LOCAL
 * ROLE and the app.tenant_id GUC — it doesn't care which pool drove the
 * transaction.
 *
 * Rationale in docs/Paas/B-009-migration-plan.md §D-1.
 */

import { sql } from 'drizzle-orm';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

import { TenancyError, type TenantContext } from '@platform/tenancy';

import { getDb, schema } from './index';

type AppSchema = typeof schema;

/** Drizzle transaction pre-pinned with role + app.tenant_id GUC, typed
 *  against the DWA schema. */
export type AppTenantTx = PgTransaction<
  NodePgQueryResultHKT,
  AppSchema,
  ExtractTablesWithRelations<AppSchema>
>;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertUuid(label: string, value: string): void {
  if (!UUID_RE.test(value)) {
    throw new TenancyError(`${label} is not a valid UUID: ${value}`);
  }
}

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new TenancyError(
      'withTenantApp called without DATABASE_URL — no Drizzle pool available',
    );
  }
  return db;
}

export async function withTenantApp<T>(
  ctx: TenantContext,
  fn: (tx: AppTenantTx) => Promise<T>,
): Promise<T> {
  if (!ctx.tenantId) {
    throw new TenancyError('withTenantApp called without tenantId');
  }
  assertUuid('tenantId', ctx.tenantId);
  if (ctx.userId != null) assertUuid('userId', ctx.userId);

  const role = ctx.role === 'system' ? 'platform_system' : 'platform_tenant';

  return requireDb().transaction(async (tx) => {
    // Role first so subsequent GUCs apply under the pinned identity.
    // SET LOCAL ROLE doesn't accept parameters; the role name is restricted
    // to two literals by the branch above.
    await tx.execute(sql.raw(`SET LOCAL ROLE ${role}`));
    // set_config(…, …, true) is transaction-local; UUIDs are bound, not
    // interpolated.
    await tx.execute(
      sql`SELECT set_config('app.tenant_id', ${ctx.tenantId}, true)`,
    );
    if (ctx.userId != null) {
      await tx.execute(
        sql`SELECT set_config('app.user_id', ${ctx.userId}, true)`,
      );
    }
    return fn(tx as unknown as AppTenantTx);
  });
}

/**
 * Cross-tenant administrative work. Pins role=`platform_system` which has
 * `system_bypass` policies on every tenant-scoped table. Reserved for the
 * routes listed in plan §D-7 (cron sweeps, admin views, webhooks that
 * resolve tenant from external IDs before pinning).
 */
export async function withSystemAdminApp<T>(
  fn: (tx: AppTenantTx) => Promise<T>,
): Promise<T> {
  return requireDb().transaction(async (tx) => {
    await tx.execute(sql.raw('SET LOCAL ROLE platform_system'));
    return fn(tx as unknown as AppTenantTx);
  });
}
