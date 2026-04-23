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
 *     [--manifest-version 0.0.1] [--parent-manifest-id dwa]
 *
 * Without --owner-user-id, a random UUID is used as a placeholder so the
 * NOT NULL constraint is satisfied; you can reassign ownership later via
 * a tenant_member upsert once real users exist.
 */

import process from 'node:process';
import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';

import { withSystemAdmin } from '@platform/tenancy';
import { __closePool, schema } from '@platform/tenancy/internal';

interface Args {
  slug: string;
  ownerUserId: string;
  kind: string;
  tier: string;
  region: string;
  manifestVersion: string;
  parentManifestId?: string;
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
  return {
    slug,
    ownerUserId: raw.get('owner-user-id') ?? randomUUID(),
    kind: raw.get('kind') ?? 'pooled',
    tier: raw.get('tier') ?? 'free',
    region: raw.get('region') ?? 'local',
    manifestVersion: raw.get('manifest-version') ?? '0.0.1',
    parentManifestId: raw.get('parent-manifest-id'),
  };
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
        role: 'owner',
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
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.stack ?? err.message : String(err));
    process.exit(1);
  })
  .finally(async () => {
    await __closePool();
  });
