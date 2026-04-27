// Admin endpoint for tenant onboarding. Gated behind
// `Authorization: Bearer $ADMIN_API_SECRET` (timing-safe compare). Idempotent
// by slug — re-POSTing with the same slug returns the existing tenant id.
//
// See docs/Paas/B-009-migration-plan.md §D-6 for rationale. Tenant + member
// rows are created via @platform/tenancy.withSystemAdmin so RLS and roles
// stay coherent. Per-app scaffolding (D-6) is currently a no-op.

import { NextResponse, type NextRequest } from 'next/server';
import { randomUUID, timingSafeEqual } from 'node:crypto';
import { sql } from 'drizzle-orm';

import { withSystemAdmin } from '@platform/tenancy';

export const runtime = 'nodejs';

const SLUG_RE = /^[a-z][a-z0-9-]{1,62}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const KIND_VALUES = ['first_party', 'licensed', 'self_serve'] as const;
const TIER_VALUES = ['pooled', 'isolated', 'dedicated'] as const;
const REGION_VALUES = ['shared-eu', 'shared-us', 'dedicated'] as const;

type Kind = (typeof KIND_VALUES)[number];
type Tier = (typeof TIER_VALUES)[number];
type Region = (typeof REGION_VALUES)[number];

interface CreateTenantBody {
  slug: string;
  ownerUserId?: string;
  kind?: Kind;
  tier?: Tier;
  region?: Region;
  manifestVersion?: string;
  parentManifestId?: string | null;
}

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function checkAdminSecret(request: NextRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return false;
  const header = request.headers.get('authorization') ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  const presented = match?.[1] ?? '';
  // B-036: length-guarded timing-safe compare.
  if (!presented || presented.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(presented), Buffer.from(secret));
}

export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) return unauthorized();

  let body: Partial<CreateTenantBody>;
  try {
    body = (await request.json()) as Partial<CreateTenantBody>;
  } catch {
    return badRequest('invalid JSON body');
  }

  const slug = body.slug;
  if (typeof slug !== 'string' || !SLUG_RE.test(slug)) {
    return badRequest('slug must match /^[a-z][a-z0-9-]{1,62}$/');
  }
  const ownerUserId = body.ownerUserId ?? randomUUID();
  if (!UUID_RE.test(ownerUserId)) {
    return badRequest('ownerUserId is not a valid UUID');
  }
  const kind: Kind = body.kind ?? 'first_party';
  if (!KIND_VALUES.includes(kind)) return badRequest(`kind must be one of ${KIND_VALUES.join(',')}`);
  const tier: Tier = body.tier ?? 'pooled';
  if (!TIER_VALUES.includes(tier)) return badRequest(`tier must be one of ${TIER_VALUES.join(',')}`);
  const region: Region = body.region ?? 'shared-us';
  if (!REGION_VALUES.includes(region)) return badRequest(`region must be one of ${REGION_VALUES.join(',')}`);
  const manifestVersion = body.manifestVersion ?? '0.0.1';
  if (!/^\d+\.\d+\.\d+$/.test(manifestVersion)) {
    return badRequest('manifestVersion must be semver MAJOR.MINOR.PATCH');
  }
  const parentManifestId = body.parentManifestId ?? null;

  try {
    const result = await withSystemAdmin(async (tx) => {
      const existing = await tx.execute<{ id: string }>(
        sql`SELECT id::text FROM tenant WHERE slug = ${slug} LIMIT 1`,
      );
      if (existing.rows.length > 0) {
        return { id: existing.rows[0]!.id, created: false };
      }

      const inserted = await tx.execute<{ id: string }>(sql`
        INSERT INTO tenant
          (slug, kind, tier, parent_manifest_id, manifest_version, status, region, owner_user_id)
        VALUES
          (${slug}, ${kind}, ${tier}, ${parentManifestId}, ${manifestVersion}, 'active', ${region}, ${ownerUserId})
        RETURNING id::text
      `);
      const id = inserted.rows[0]!.id;

      await tx.execute(sql`
        INSERT INTO tenant_member (tenant_id, user_id, role)
        VALUES (${id}::uuid, ${ownerUserId}::uuid, 'tenant_admin')
        ON CONFLICT (tenant_id, user_id) DO NOTHING
      `);

      // Per-app scaffolding hook (plan §D-6). Intentionally empty for B-009;
      // future per-tenant DWA bootstrapping (e.g. starter content rows) hangs
      // off this point.
      return { id, created: true };
    });

    return NextResponse.json(
      { tenantId: result.id, slug, created: result.created, ownerUserId },
      { status: result.created ? 201 : 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
