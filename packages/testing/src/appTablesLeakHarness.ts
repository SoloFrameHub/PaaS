// B-009 Phase 6 — app-table leak harness.
// Companion to tenantLeakHarness.ts: instead of exercising tenant_member
// (a platform-spine table), this harness seeds rows in one app-owned table
// per first-party app and asserts cross-tenant isolation for it.
//
// - DWA representative: mood_entry (user-scoped journal entries; largest
//   class of tenant-scoped writes per Blueprint §6.1).
// - GTM representative: roleplay_session (user-scoped, plus largest class).
//
// Each app deploys to its own DB (apps/dwa and apps/gtm have non-overlapping
// user-table shapes — see B-009 plan handoff). The harness picks the right
// app via the `app` option and connects to the matching test DB.
//
// Requires migrations 0001 + 0002 + 0003 applied. If TEST_DATABASE_URL is
// missing, throws TenancyError so CI surfaces the gap rather than silently
// passing.

import { sql } from 'drizzle-orm';

import {
  TenancyError,
  withSystemAdmin,
  withTenant,
  type TenantTx,
} from '@platform/tenancy';

export type AppTablesLeakApp = 'dwa' | 'gtm';

interface AppProbe {
  /** Name of the app-owned table being probed for leaks. */
  table: string;
  /** Inserts a representative row for the given user + tenant under
   *  platform_system. Return value is the row's id (text) for cleanup. */
  seed: (
    tx: TenantTx,
    args: { userId: string; tenantId: string; rowId: string },
  ) => Promise<void>;
  /** Minimal columns to seed a user row that satisfies app FKs.
   *  user/session are excluded from RLS (§D-2) so we insert under
   *  platform_system. */
  seedUser: (tx: TenantTx, args: { userId: string }) => Promise<void>;
  /** Cross-tenant write attempt under withTenant (must fail with 42501). */
  attemptCrossWrite: (
    tx: TenantTx,
    args: { otherTenantId: string; rowId: string; userId: string },
  ) => Promise<void>;
}

const PROBES: Record<AppTablesLeakApp, AppProbe> = {
  dwa: {
    table: 'mood_entry',
    seedUser: async (tx, { userId }) => {
      await tx.execute(sql`
        INSERT INTO "user" (id, email, hashed_password, role)
        VALUES (${userId}, ${`${userId}@harness.local`}, 'x', 'user')
        ON CONFLICT (id) DO NOTHING
      `);
    },
    seed: async (tx, { userId, tenantId, rowId }) => {
      await tx.execute(sql`
        INSERT INTO mood_entry
          (id, user_id, date, mood_rating, anxiety_level, sleep_quality,
           energy_level, tenant_id)
        VALUES
          (${rowId}, ${userId}, now(), 5, 5, 5, 5, ${tenantId}::uuid)
      `);
    },
    attemptCrossWrite: async (tx, { otherTenantId, rowId, userId }) => {
      await tx.execute(sql`
        INSERT INTO mood_entry
          (id, user_id, date, mood_rating, anxiety_level, sleep_quality,
           energy_level, tenant_id)
        VALUES
          (${rowId}, ${userId}, now(), 5, 5, 5, 5, ${otherTenantId}::uuid)
      `);
    },
  },
  gtm: {
    table: 'roleplay_session',
    seedUser: async (tx, { userId }) => {
      await tx.execute(sql`
        INSERT INTO "user" (id, email, hashed_password)
        VALUES (${userId}, ${`${userId}@harness.local`}, 'x')
        ON CONFLICT (id) DO NOTHING
      `);
    },
    seed: async (tx, { userId, tenantId, rowId }) => {
      await tx.execute(sql`
        INSERT INTO roleplay_session
          (id, user_id, industry_id, role_id, disc_type, transcript,
           evaluation, tenant_id)
        VALUES
          (${rowId}, ${userId}, 'tech', 'pm', 'D',
           '[]'::jsonb,
           '{"score":0,"strengths":[],"improvements":[],"coachingMessage":""}'::jsonb,
           ${tenantId}::uuid)
      `);
    },
    attemptCrossWrite: async (tx, { otherTenantId, rowId, userId }) => {
      await tx.execute(sql`
        INSERT INTO roleplay_session
          (id, user_id, industry_id, role_id, disc_type, transcript,
           evaluation, tenant_id)
        VALUES
          (${rowId}, ${userId}, 'tech', 'pm', 'D',
           '[]'::jsonb,
           '{"score":0,"strengths":[],"improvements":[],"coachingMessage":""}'::jsonb,
           ${otherTenantId}::uuid)
      `);
    },
  },
};

export interface AppTablesLeakResult {
  app: AppTablesLeakApp;
  table: string;
  tenantA: string;
  tenantB: string;
  /** Rows visible to tenant B when reading tenant A's rows — must be 0. */
  crossReadRows: number;
  /** Rows visible to tenant B when reading its own rows — must be 1. */
  ownReadRows: number;
  /** True when RLS denied an INSERT with a foreign tenant_id (42501). */
  crossWriteDenied: boolean;
}

export interface AppTablesLeakOptions {
  app: AppTablesLeakApp;
  /** Connection string. Falls back to TEST_DATABASE_URL. */
  databaseUrl?: string;
}

export async function appTablesLeakHarness(
  opts: AppTablesLeakOptions,
): Promise<AppTablesLeakResult> {
  const probe = PROBES[opts.app];
  if (!probe) {
    throw new TenancyError(`appTablesLeakHarness: unknown app=${opts.app}`);
  }

  const url = opts.databaseUrl ?? process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new TenancyError(
      'appTablesLeakHarness: TEST_DATABASE_URL not set. The harness requires a live Postgres with migrations 0001, 0002, and 0003 applied (plus the chosen app schema).',
    );
  }
  const prevPlatform = process.env.PLATFORM_DATABASE_URL;
  const prevDatabase = process.env.DATABASE_URL;
  if (!prevPlatform && !prevDatabase) process.env.DATABASE_URL = url;

  const tenantA = crypto.randomUUID();
  const tenantB = crypto.randomUUID();
  const userA = crypto.randomUUID();
  const userB = crypto.randomUUID();
  const rowA = `harness-${opts.app}-a-${tenantA.slice(0, 8)}`;
  const rowB = `harness-${opts.app}-b-${tenantB.slice(0, 8)}`;
  const slugA = `harness-${opts.app}-a-${tenantA.slice(0, 8)}`;
  const slugB = `harness-${opts.app}-b-${tenantB.slice(0, 8)}`;

  try {
    // ─── Seed two tenants under platform_system. ─────────────────────────
    await withSystemAdmin(async (tx) => {
      await tx.execute(sql`
        INSERT INTO tenant
          (id, slug, kind, tier, manifest_version, status, region, owner_user_id)
        VALUES
          (${tenantA}::uuid, ${slugA}, 'first_party', 'pooled', '0.0.0',
           'active', 'shared-us', ${userA}::uuid),
          (${tenantB}::uuid, ${slugB}, 'first_party', 'pooled', '0.0.0',
           'active', 'shared-us', ${userB}::uuid)
      `);

      // user/session are excluded from RLS (§D-2). Seed under platform_system
      // so the FK on the app table holds.
      await probe.seedUser(tx, { userId: userA });
      await probe.seedUser(tx, { userId: userB });

      // App rows under platform_system (system_bypass policy permits writes
      // with any tenant_id; we set the column explicitly).
      await probe.seed(tx, { userId: userA, tenantId: tenantA, rowId: rowA });
      await probe.seed(tx, { userId: userB, tenantId: tenantB, rowId: rowB });
    });

    // ─── As tenant B, read app-table rows. RLS must hide tenant A's row.
    //     `probe.table` is from a closed enum (sql.raw is safe); row ids
    //     are parameterized.
    const tableExpr = sql.raw(probe.table);
    const { ownReadRows, crossReadRows } = await withTenant(
      { tenantId: tenantB, userId: userB },
      async (tx) => {
        const own = await tx.execute<{ count: string }>(
          sql`SELECT count(*)::text AS count FROM ${tableExpr} WHERE id = ${rowB}`,
        );
        const cross = await tx.execute<{ count: string }>(
          sql`SELECT count(*)::text AS count FROM ${tableExpr} WHERE id = ${rowA}`,
        );
        return {
          ownReadRows: Number(own.rows[0]?.count ?? '0'),
          crossReadRows: Number(cross.rows[0]?.count ?? '0'),
        };
      },
    );

    // ─── As tenant B, attempt to INSERT a row with tenant_id = A.
    //     Policy WITH CHECK forbids it → SQLSTATE 42501.
    let crossWriteDenied = false;
    const intruderRowId = `harness-${opts.app}-intruder-${tenantB.slice(0, 8)}`;
    try {
      await withTenant(
        { tenantId: tenantB, userId: userB },
        async (tx: TenantTx) => {
          await probe.attemptCrossWrite(tx, {
            otherTenantId: tenantA,
            rowId: intruderRowId,
            userId: userB,
          });
        },
      );
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code === '42501') {
        crossWriteDenied = true;
      } else {
        throw err;
      }
    }

    return {
      app: opts.app,
      table: probe.table,
      tenantA,
      tenantB,
      crossReadRows,
      ownReadRows,
      crossWriteDenied,
    };
  } finally {
    await cleanup(probe.table, { tenantA, tenantB, userA, userB });
    if (!prevPlatform && !prevDatabase) delete process.env.DATABASE_URL;
  }
}

async function cleanup(
  table: string,
  ids: { tenantA: string; tenantB: string; userA: string; userB: string },
): Promise<void> {
  const tableExpr = sql.raw(table);
  await withSystemAdmin(async (tx) => {
    // Delete app rows first; tenant has ON DELETE RESTRICT to mood_entry /
    // roleplay_session, so the tenant delete would fail otherwise.
    await tx.execute(
      sql`DELETE FROM ${tableExpr} WHERE tenant_id IN (${ids.tenantA}::uuid, ${ids.tenantB}::uuid)`,
    );
    await tx.execute(
      sql`DELETE FROM "user" WHERE id IN (${ids.userA}, ${ids.userB})`,
    );
    await tx.execute(
      sql`DELETE FROM tenant_member WHERE tenant_id IN (${ids.tenantA}::uuid, ${ids.tenantB}::uuid)`,
    );
    await tx.execute(
      sql`DELETE FROM tenant_audit WHERE tenant_id IN (${ids.tenantA}::uuid, ${ids.tenantB}::uuid)`,
    );
    await tx.execute(
      sql`DELETE FROM tenant WHERE id IN (${ids.tenantA}::uuid, ${ids.tenantB}::uuid)`,
    );
  });
}
