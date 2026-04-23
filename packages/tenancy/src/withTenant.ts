// Blueprint §6.2 Layer 3 — Drizzle wrapper.
// Opens a transaction, pins the role, and sets `app.tenant_id` (and optionally
// `app.user_id`) as transaction-local GUCs. The RLS policies in migration 0002
// read `current_setting('app.tenant_id', true)::uuid` and tie visibility to
// that value; switching role to `platform_tenant` forces those policies to
// apply because `platform_tenant` has no `BYPASSRLS`. System work uses
// `platform_system` — also no `BYPASSRLS`, but tables carry `system_bypass`
// policies that grant full access to that role only.

import { sql } from 'drizzle-orm';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

import { TenancyError } from './errors.js';
import { getDb, type Schema } from './internal/db.js';

/** A Drizzle transaction pre-pinned with role + app.tenant_id GUC. */
export type TenantTx = PgTransaction<
  NodePgQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;

export interface TenantContext {
  tenantId: string;
  userId?: string | null;
  /** Defaults to 'tenant'. Use 'system' for cross-tenant admin work. */
  role?: 'system' | 'tenant';
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertUuid(label: string, value: string): void {
  if (!UUID_RE.test(value)) {
    throw new TenancyError(`${label} is not a valid UUID: ${value}`);
  }
}

export async function withTenant<T>(
  ctx: TenantContext,
  fn: (tx: TenantTx) => Promise<T>,
): Promise<T> {
  if (!ctx.tenantId) {
    throw new TenancyError('withTenant called without tenantId');
  }
  assertUuid('tenantId', ctx.tenantId);
  if (ctx.userId != null) assertUuid('userId', ctx.userId);

  const role = ctx.role === 'system' ? 'platform_system' : 'platform_tenant';

  return getDb().transaction(async (tx) => {
    // Role first so subsequent GUCs apply under the pinned identity.
    // SET LOCAL ROLE doesn't accept parameters, so the role name must be a
    // static identifier — assertion above restricts it to two literals.
    await tx.execute(sql.raw(`SET LOCAL ROLE ${role}`));
    // set_config(…, …, true) is transaction-local; parameters are safely
    // bound so UUIDs can't inject SQL.
    await tx.execute(
      sql`SELECT set_config('app.tenant_id', ${ctx.tenantId}, true)`,
    );
    if (ctx.userId != null) {
      await tx.execute(
        sql`SELECT set_config('app.user_id', ${ctx.userId}, true)`,
      );
    }
    return fn(tx as unknown as TenantTx);
  });
}

/**
 * Cross-tenant administrative work. Pins role=`platform_system` which has
 * `system_bypass` policies on every tenant-scoped table.
 */
export async function withSystemAdmin<T>(
  fn: (tx: TenantTx) => Promise<T>,
): Promise<T> {
  return getDb().transaction(async (tx) => {
    await tx.execute(sql.raw('SET LOCAL ROLE platform_system'));
    return fn(tx as unknown as TenantTx);
  });
}
