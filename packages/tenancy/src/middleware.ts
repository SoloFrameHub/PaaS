// Edge-safe helpers for the tenant-resolution boundary at request entry.
//
// Blueprint §6.3 calls for `middleware.ts` in each app to identify the tenant
// and stash it on the request so downstream handlers don't have to reason
// about it. The real DB-backed lookup lives in `resolveTenant`, but that's
// Node-runtime only (pg.Pool doesn't work in Edge). So this file exposes:
//
//   - resolveTenantSlugFromHost(host): pure regex-based slug extraction,
//     Edge-safe, used in the app middleware / proxy to set `x-tenant-slug`.
//   - getTenantContextFromHeaders(headers): Node-runtime helper that API
//     routes call to turn the forwarded headers into a `TenantContext`.
//
// The Node-runtime resolver (by slug or custom domain) stays exported as
// `resolveTenant` via the package root; tomorrow's work fills it in to do the
// DB lookup and cache per-request.

import type { TenantContext } from './withTenant.js';

// IMPORTANT — this subpath is the Edge-runtime entry point.
// Do NOT runtime-re-export from ./resolveTenant.js: that module imports from
// ./internal/db.js → pg → Node `crypto`, which crashes in Edge. Type-only
// re-exports are erased at compile time, so they're safe.
export type { ResolvedTenant, TenantResolveRequest } from './resolveTenant.js';

export interface ResolveTenantSlugOptions {
  /**
   * Root domains this app serves from. A host of `<slug>.<root>` is the
   * subdomain-tenant pattern. Anything else (marketing, apex, custom
   * domain) returns null and lets the Node-runtime lookup handle it.
   */
  rootDomains?: readonly string[];
  /**
   * Reserved subdomain labels that are platform-owned, not tenants
   * (e.g., 'www', 'api', 'n8n', 'metabase', 'docs'). Case-insensitive.
   */
  reservedSubdomains?: readonly string[];
}

const DEFAULT_RESERVED: readonly string[] = [
  'www',
  'api',
  'admin',
  'n8n',
  'metabase',
  'docs',
  'status',
  'assets',
  'static',
  'cdn',
  'mail',
  'auth',
];

const SLUG_RE = /^[a-z][a-z0-9-]{1,62}$/;

/**
 * Parse a tenant slug out of a host header. Pure; no network or DB.
 *
 * Returns the subdomain when `host` is `<slug>.<rootDomain>`, the subdomain
 * is not reserved, and looks like a well-formed slug. Otherwise returns null
 * and callers should treat the request as unscoped (marketing or custom
 * domain — the latter is resolved by the Node-runtime DB lookup).
 */
export function resolveTenantSlugFromHost(
  host: string | null | undefined,
  options: ResolveTenantSlugOptions = {},
): string | null {
  if (!host) return null;

  // Strip port. `localhost:3000` → `localhost`.
  const bareHost = host.split(':', 1)[0]!.toLowerCase().trim();
  if (!bareHost) return null;

  // Local dev: no tenant on bare loopback. Explicit `.localhost` pattern
  // (e.g., `acme.localhost`) is supported so devs can test multi-tenancy
  // without DNS — that path falls through to the generic logic below.
  if (bareHost === 'localhost' || bareHost === '127.0.0.1') return null;

  const reserved = new Set(
    (options.reservedSubdomains ?? DEFAULT_RESERVED).map((s) =>
      s.toLowerCase(),
    ),
  );

  const roots = (options.rootDomains ?? []).map((r) => r.toLowerCase());

  // Try each root. A root of `soloframehub.com` matches `x.soloframehub.com`
  // but not `soloframehub.com` itself (the apex is not a tenant subdomain).
  for (const root of roots) {
    if (bareHost === root) return null;
    const suffix = `.${root}`;
    if (bareHost.endsWith(suffix)) {
      const sub = bareHost.slice(0, -suffix.length);
      // Only single-label subdomains are tenant slugs. `foo.bar.root` has
      // two labels and is not a canonical tenant host for us.
      if (sub.includes('.')) return null;
      if (reserved.has(sub)) return null;
      return SLUG_RE.test(sub) ? sub : null;
    }
  }

  // `<sub>.localhost` dev pattern: accept any non-reserved valid slug.
  if (bareHost.endsWith('.localhost')) {
    const sub = bareHost.slice(0, -'.localhost'.length);
    if (sub.includes('.')) return null;
    if (reserved.has(sub)) return null;
    return SLUG_RE.test(sub) ? sub : null;
  }

  // No root matched and it's not a custom localhost. Could still be a custom
  // domain — that's the Node-runtime DB lookup's job.
  return null;
}

/**
 * Node-runtime only. Reads the headers that middleware forwarded
 * (`x-tenant-id` and `x-tenant-slug`) and assembles a TenantContext.
 *
 * Returns null when no tenant header is present (unscoped request). Throws
 * when only a slug is present — that means resolution is incomplete; the
 * caller should run the async DB resolver before constructing a context.
 */
export function getTenantContextFromHeaders(
  headers: Headers | Record<string, string | undefined>,
  userId?: string | null,
): TenantContext | null {
  const get = (name: string): string | null => {
    if (typeof (headers as Headers).get === 'function') {
      return (headers as Headers).get(name);
    }
    const rec = headers as Record<string, string | undefined>;
    return rec[name] ?? rec[name.toLowerCase()] ?? null;
  };

  const tenantId = get('x-tenant-id');
  if (!tenantId) return null;
  return {
    tenantId,
    userId: userId ?? null,
    role: 'tenant',
  };
}
