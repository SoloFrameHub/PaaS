// Blueprint §10 Day 5 — tenant-leak harness.
// Seeds two tenants via platform_system, then exercises `withTenant` as each
// tenant and asserts cross-tenant reads see zero rows and cross-tenant writes
// are denied by RLS (42501). A denial is also written to `tenant_audit`.
//
// Requires a live Postgres with migrations 0001 + 0002 applied. If the
// TEST_DATABASE_URL env var is missing, the harness throws a clear TenancyError
// — CI surfaces it rather than silently passing.

import { sql } from 'drizzle-orm';
import {
  TenancyError,
  withSystemAdmin,
  withTenant,
  type TenantTx,
} from '@platform/tenancy';
import { schema } from '@platform/tenancy/internal';

export interface TenantLeakHarnessResult {
  tenantA: string;
  tenantB: string;
  /** Rows visible to tenant B when reading members of tenant A — must be 0. */
  crossReadRows: number;
  /** True when RLS denied a cross-tenant insert and an audit row was written. */
  crossWriteDenied: boolean;
}

export interface TenantLeakHarnessOptions {
  /** Provide a connection string when running against a real Postgres. */
  databaseUrl?: string;
}

function randomUserId(): string {
  return crypto.randomUUID();
}

async function cleanup(tenantIds: string[]): Promise<void> {
  await withSystemAdmin(async (tx) => {
    for (const id of tenantIds) {
      await tx.execute(sql`DELETE FROM tenant_audit WHERE tenant_id = ${id}`);
      await tx.execute(sql`DELETE FROM tenant WHERE id = ${id}`);
    }
  });
}

export async function tenantLeakHarness(
  opts: TenantLeakHarnessOptions = {},
): Promise<TenantLeakHarnessResult> {
  const url = opts.databaseUrl ?? process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new TenancyError(
      'tenantLeakHarness: TEST_DATABASE_URL not set. The harness requires a live Postgres with migrations 0001 and 0002 applied.',
    );
  }
  // Propagate the URL so the tenancy internal pool picks it up if the caller
  // has only set TEST_DATABASE_URL.
  const prevPlatform = process.env.PLATFORM_DATABASE_URL;
  const prevDatabase = process.env.DATABASE_URL;
  if (!prevPlatform && !prevDatabase) process.env.DATABASE_URL = url;

  const tenantA = crypto.randomUUID();
  const tenantB = crypto.randomUUID();
  const ownerA = randomUserId();
  const ownerB = randomUserId();
  const memberA = randomUserId();
  const memberB = randomUserId();

  try {
    // ─── Seed two tenants + one member each under platform_system. ───────
    await withSystemAdmin(async (tx) => {
      await tx
        .insert(schema.tenant)
        .values([
          {
            id: tenantA,
            slug: `harness-a-${tenantA.slice(0, 8)}`,
            kind: 'pooled',
            tier: 'free',
            manifestVersion: '0.0.0',
            status: 'active',
            region: 'local',
            ownerUserId: ownerA,
          },
          {
            id: tenantB,
            slug: `harness-b-${tenantB.slice(0, 8)}`,
            kind: 'pooled',
            tier: 'free',
            manifestVersion: '0.0.0',
            status: 'active',
            region: 'local',
            ownerUserId: ownerB,
          },
        ]);
      await tx.insert(schema.tenantMember).values([
        { tenantId: tenantA, userId: memberA, role: 'owner' },
        { tenantId: tenantB, userId: memberB, role: 'owner' },
      ]);
    });

    // ─── As tenant B, count tenant_member rows — must see only B's. ──────
    const crossReadRows = await withTenant(
      { tenantId: tenantB, userId: memberB },
      async (tx: TenantTx) => {
        const rows = await tx.execute<{ count: string }>(
          sql`SELECT count(*)::text AS count FROM tenant_member WHERE tenant_id = ${tenantA}`,
        );
        return Number(rows.rows[0]?.count ?? '0');
      },
    );

    // ─── As tenant B, attempt to INSERT a row claiming tenant_id = A. ────
    // RLS policy `tenant_isolation` has WITH CHECK (tenant_id = app.tenant_id),
    // so this must fail with SQLSTATE 42501.
    let crossWriteDenied = false;
    try {
      await withTenant(
        { tenantId: tenantB, userId: memberB },
        async (tx: TenantTx) => {
          await tx.execute(
            sql`INSERT INTO tenant_member (tenant_id, user_id, role) VALUES (${tenantA}, ${crypto.randomUUID()}, 'intruder')`,
          );
        },
      );
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code === '42501') {
        crossWriteDenied = true;
        // Log the denial to tenant_audit under platform_system.
        await withSystemAdmin(async (tx) => {
          await tx.execute(
            sql`INSERT INTO tenant_audit
                  (tenant_id, user_id, actor_kind, action, resource_kind, outcome, meta)
                VALUES
                  (${tenantB}, ${memberB}, 'tenant_user', 'tenant_member.insert',
                   'tenant_member', 'denied',
                   ${JSON.stringify({ attemptedTenantId: tenantA })}::jsonb)`,
          );
        });
      } else {
        throw err;
      }
    }

    return {
      tenantA,
      tenantB,
      crossReadRows,
      crossWriteDenied,
    };
  } finally {
    await cleanup([tenantA, tenantB]);
    if (!prevPlatform && !prevDatabase) delete process.env.DATABASE_URL;
  }
}
