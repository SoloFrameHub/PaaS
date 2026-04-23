// Blueprint §6.3 — tenant resolver (Node-runtime).
//
// Reads the tenant row by slug (or custom domain) via `withSystemAdmin`, so
// the request-entry middleware can identify which tenant a request belongs
// to. Result is cached in-process for a short TTL to keep per-request
// overhead low without building a real cache service on Day 1.
//
// Edge-runtime callers cannot use this — they use `resolveTenantSlugFromHost`
// from `./middleware.ts` instead, which is pure.

import { and, eq, sql } from 'drizzle-orm';

import { withSystemAdmin } from './withTenant.js';
import { schema } from './internal/db.js';

export interface ResolvedTenant {
  id: string;
  slug: string;
  manifestId: string;
  manifestVersion: string;
}

export interface TenantResolveRequest {
  host: string;
  slug?: string | null;
  path?: string;
}

export interface ResolveOptions {
  /** Bypass the in-process cache. Useful after tenant admin mutations. */
  bypassCache?: boolean;
}

interface CacheEntry {
  tenant: ResolvedTenant | null;
  expiresAt: number;
}

const DEFAULT_TTL_MS = 60_000;

// Keyed by "slug:<slug>" or "host:<host>". Stores both positive and negative
// results so repeated misses (unknown slug, marketing traffic) don't hammer
// the DB. Tests reset this via `__resetTenantResolverCache`.
const cache = new Map<string, CacheEntry>();

function now(): number {
  return Date.now();
}

function getTtlMs(): number {
  const env = parseInt(process.env.TENANT_RESOLVER_TTL_MS ?? '', 10);
  return Number.isFinite(env) && env > 0 ? env : DEFAULT_TTL_MS;
}

function readCache(key: string): ResolvedTenant | null | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= now()) {
    cache.delete(key);
    return undefined;
  }
  return entry.tenant;
}

function writeCache(key: string, tenant: ResolvedTenant | null): void {
  cache.set(key, { tenant, expiresAt: now() + getTtlMs() });
}

/** Test hook. Do not call from production code. */
export function __resetTenantResolverCache(): void {
  cache.clear();
}

function rowToTenant(row: {
  id: string;
  slug: string;
  parentManifestId: string | null;
  manifestVersion: string;
}): ResolvedTenant {
  return {
    id: row.id,
    slug: row.slug,
    // Per blueprint §7: every tenant specifies a manifest. For tenants
    // inheriting a vertical manifest, `parent_manifest_id` holds it; tenants
    // that are themselves a top-level manifest use their slug. We fall back
    // to the slug so resolution never returns an empty manifestId.
    manifestId: row.parentManifestId ?? row.slug,
    manifestVersion: row.manifestVersion,
  };
}

export async function resolveTenantBySlug(
  slug: string,
  options: ResolveOptions = {},
): Promise<ResolvedTenant | null> {
  if (!slug) return null;
  const key = `slug:${slug}`;
  if (!options.bypassCache) {
    const cached = readCache(key);
    if (cached !== undefined) return cached;
  }
  const tenant = await withSystemAdmin(async (tx) => {
    const rows = await tx
      .select({
        id: schema.tenant.id,
        slug: schema.tenant.slug,
        parentManifestId: schema.tenant.parentManifestId,
        manifestVersion: schema.tenant.manifestVersion,
        status: schema.tenant.status,
      })
      .from(schema.tenant)
      .where(and(eq(schema.tenant.slug, slug)))
      .limit(1);
    const row = rows[0];
    if (!row) return null;
    // Tenants with status != 'active' are treated as unresolved for request
    // entry — callers will 404 / show a paused page. Lifecycle beyond 'active'
    // (suspended, deleted) is v2; for now any non-active row is unresolved.
    if (row.status !== 'active') return null;
    return rowToTenant(row);
  });
  writeCache(key, tenant);
  return tenant;
}

export async function resolveTenantByHost(
  host: string,
  options: ResolveOptions = {},
): Promise<ResolvedTenant | null> {
  if (!host) return null;
  const bareHost = host.split(':', 1)[0]!.toLowerCase();
  const key = `host:${bareHost}`;
  if (!options.bypassCache) {
    const cached = readCache(key);
    if (cached !== undefined) return cached;
  }
  // tenant.domains is a JSONB we treat as `{ canonical?: string; aliases?: string[] }`.
  // The `@>` operator does an efficient containment check against either shape:
  //   {"canonical": "<host>"} or {"aliases": ["<host>"]}
  const tenant = await withSystemAdmin(async (tx) => {
    const rows = await tx
      .select({
        id: schema.tenant.id,
        slug: schema.tenant.slug,
        parentManifestId: schema.tenant.parentManifestId,
        manifestVersion: schema.tenant.manifestVersion,
        status: schema.tenant.status,
      })
      .from(schema.tenant)
      .where(
        sql`(${schema.tenant.domains} @> ${JSON.stringify({ canonical: bareHost })}::jsonb)
         OR (${schema.tenant.domains} @> ${JSON.stringify({ aliases: [bareHost] })}::jsonb)`,
      )
      .limit(1);
    const row = rows[0];
    if (!row) return null;
    if (row.status !== 'active') return null;
    return rowToTenant(row);
  });
  writeCache(key, tenant);
  return tenant;
}

/**
 * Blueprint §6.3: the primary resolver the request-entry middleware / route
 * helper calls. Prefers slug (cheap, indexed unique lookup) and falls back
 * to a custom-domain lookup when only `host` is supplied.
 */
export async function resolveTenant(
  req: TenantResolveRequest,
  options: ResolveOptions = {},
): Promise<ResolvedTenant | null> {
  if (req.slug) {
    const bySlug = await resolveTenantBySlug(req.slug, options);
    if (bySlug) return bySlug;
  }
  if (req.host) {
    return resolveTenantByHost(req.host, options);
  }
  return null;
}
