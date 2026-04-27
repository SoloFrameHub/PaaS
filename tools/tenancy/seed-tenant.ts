#!/usr/bin/env tsx
/**
 * seed-tenant — insert (or confirm) a tenant row on the platform DB.
 *
 * Idempotent by slug: re-running prints the existing tenant id. Prints a
 * shell-parseable "TENANT_ID=<uuid>" line on success.
 *
 * Usage:
 *   DATABASE_URL=postgresql://… pnpm tsx tools/tenancy/seed-tenant.ts \
 *     --slug demo \
 *     --owner-user-id <uuid?> \
 *     [--kind pooled] [--tier free] [--region local] \
 *     [--manifest-version 0.0.1] [--parent-manifest-id dwa] \
 *     [--scaffold-app dwa|gtm|both]
 *
 * Without --owner-user-id, a random UUID is used as a placeholder so the
 * NOT NULL constraint is satisfied; you can reassign ownership later via
 * a tenant_member upsert once real users exist.
 *
 * --scaffold-app runs per-app onboarding hooks after tenant insert. For
 * B-009 these hooks are no-ops (plan §D-6); the flag exists so future
 * per-app onboarding has a stable surface.
 */

import process from 'node:process';
import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';

import { withSystemAdmin } from '@platform/tenancy';
import { __closePool, schema } from '@platform/tenancy/internal';

const SCAFFOLD_APPS = ['dwa', 'gtm', 'both'] as const;
type ScaffoldApp = (typeof SCAFFOLD_APPS)[number];

interface Args {
  slug: string;
  ownerUserId: string;
  kind: string;
  tier: string;
  region: string;
  manifestVersion: string;
  parentManifestId?: string;
  scaffoldApp?: ScaffoldApp;
}

function parseArgs(argv: string[]): Args {
  const raw = new Map<string, string>();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1];
    if (!val || val.startsWith('--')) {
      throw new Error(`--${key} needs a value`);
    }
    raw.set(key, val);
    i++;
  }
  const slug = raw.get('slug');
  if (!slug) throw new Error('--slug is required');
  if (!/^[a-z][a-z0-9-]{1,62}$/.test(slug)) {
    throw new Error(`--slug ${slug} must match /^[a-z][a-z0-9-]{1,62}$/`);
  }
  // Defaults match the CHECK constraints in 0001_tenancy.sql:
  //   kind   IN ('first_party','licensed','self_serve')
  //   tier   IN ('pooled','isolated','dedicated')
  //   region IN ('shared-eu','shared-us','dedicated')
  const scaffoldRaw = raw.get('scaffold-app');
  let scaffoldApp: ScaffoldApp | undefined;
  if (scaffoldRaw !== undefined) {
    if (!(SCAFFOLD_APPS as readonly string[]).includes(scaffoldRaw)) {
      throw new Error(
        `--scaffold-app must be one of ${SCAFFOLD_APPS.join('|')}`,
      );
    }
    scaffoldApp = scaffoldRaw as ScaffoldApp;
  }
  return {
    slug,
    ownerUserId: raw.get('owner-user-id') ?? randomUUID(),
    kind: raw.get('kind') ?? 'first_party',
    tier: raw.get('tier') ?? 'pooled',
    region: raw.get('region') ?? 'shared-us',
    manifestVersion: raw.get('manifest-version') ?? '0.0.1',
    parentManifestId: raw.get('parent-manifest-id'),
    scaffoldApp,
  };
}

/**
 * Per-app onboarding hooks. No-op for B-009 (plan §D-6) — this stays in the
 * CLI rather than importing from apps/* so we don't pull a Next.js bundle
 * into the seed tool. Future per-app row-level scaffolding goes here.
 */
async function runScaffold(app: ScaffoldApp, tenantId: string): Promise<void> {
  const targets = app === 'both' ? (['dwa', 'gtm'] as const) : ([app] as const);
  for (const target of targets) {
    console.error(
      `scaffold-app[${target}]: no-op for tenant=${tenantId} (B-009 placeholder per plan §D-6)`,
    );
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  const existing = await withSystemAdmin(async (tx) => {
    const rows = await tx
      .select({ id: schema.tenant.id, status: schema.tenant.status })
      .from(schema.tenant)
      .where(eq(schema.tenant.slug, args.slug))
      .limit(1);
    return rows[0] ?? null;
  });

  if (existing) {
    console.error(`tenant with slug=${args.slug} already exists (status=${existing.status})`);
    console.log(`TENANT_ID=${existing.id}`);
    if (args.scaffoldApp) {
      await runScaffold(args.scaffoldApp, existing.id);
    }
    return;
  }

  const id = await withSystemAdmin(async (tx) => {
    const [row] = await tx
      .insert(schema.tenant)
      .values({
        slug: args.slug,
        kind: args.kind,
        tier: args.tier,
        parentManifestId: args.parentManifestId ?? null,
        manifestVersion: args.manifestVersion,
        status: 'active',
        region: args.region,
        ownerUserId: args.ownerUserId,
      })
      .returning({ id: schema.tenant.id });
    // Owner starts as their own member so future app logic (e.g. tenant
    // list views) finds them immediately. Role 'owner' by convention.
    await tx
      .insert(schema.tenantMember)
      .values({
        tenantId: row!.id,
        userId: args.ownerUserId,
        // tenant_member.role CHECK: ('super_admin','tenant_admin','operator','member','external_partner')
        role: 'tenant_admin',
      })
      .onConflictDoNothing({
        target: [schema.tenantMember.tenantId, schema.tenantMember.userId],
      });
    return row!.id;
  });

  console.error(
    `seeded tenant slug=${args.slug} id=${id} ownerUserId=${args.ownerUserId}`,
  );
  console.log(`TENANT_ID=${id}`);
  if (args.scaffoldApp) {
    await runScaffold(args.scaffoldApp, id);
  }
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.stack ?? err.message : String(err));
    process.exit(1);
  })
  .finally(async () => {
    await __closePool();
  });
