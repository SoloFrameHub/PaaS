// Node-runtime helper for API routes / server components.
//
// Ties the three layers together in one call: reads `x-tenant-slug` (or
// `x-tenant-id`) that middleware set, looks up the tenant row via
// `resolveTenantBySlug`, and returns a `TenantContext` ready to pass to
// `withTenant(ctx, tx => …)`.

import { NotATenantMemberError, TenancyError } from './errors.js';
import { isTenantMember } from './isTenantMember.js';
import {
  resolveTenantByHost,
  resolveTenantBySlug,
  type ResolveOptions,
  type ResolvedTenant,
} from './resolveTenant.js';
import type { TenantContext } from './withTenant.js';

export interface RequireTenantContextOptions {
  /** Authenticated user id, if known. Pinned to `app.user_id` GUC. */
  userId?: string | null;
  /** Role for the transaction. Defaults to 'tenant'. */
  role?: 'system' | 'tenant';
  /** Forwarded to the resolver — bypass the in-process cache. */
  bypassCache?: boolean;
  /**
   * When true (default), `userId` — if present — must be in
   * `tenant_member` for the resolved tenant. Non-member access throws
   * `NotATenantMemberError`. Pass `false` for public routes that take a
   * tenant slug but don't yet have an authenticated user (signup, checkout
   * pre-auth), but keep this `true` for anything behind auth.
   */
  requireMembership?: boolean;
}

function getHeader(
  headers: Headers | Record<string, string | undefined>,
  name: string,
): string | null {
  if (typeof (headers as Headers).get === 'function') {
    return (headers as Headers).get(name);
  }
  const rec = headers as Record<string, string | undefined>;
  return rec[name] ?? rec[name.toLowerCase()] ?? null;
}

/**
 * Resolve a TenantContext from a request. Throws a TenancyError if no
 * tenant header is set or the slug/host does not resolve to an active tenant.
 * Callers that want the "no tenant" case to be a redirect or 404 should call
 * `maybeTenantContext` instead.
 */
export async function requireTenantContext(
  request: Request | { headers: Headers | Record<string, string | undefined> },
  options: RequireTenantContextOptions = {},
): Promise<TenantContext & { tenant: ResolvedTenant }> {
  const resolved = await maybeTenantContext(request, options);
  if (!resolved) {
    throw new TenancyError(
      'requireTenantContext: no x-tenant-slug / x-tenant-id header set by middleware, and host did not match a custom-domain tenant.',
    );
  }
  return resolved;
}

export async function maybeTenantContext(
  request: Request | { headers: Headers | Record<string, string | undefined> },
  options: RequireTenantContextOptions = {},
): Promise<(TenantContext & { tenant: ResolvedTenant }) | null> {
  const headers = request.headers as
    | Headers
    | Record<string, string | undefined>;

  const resolveOpts: ResolveOptions = options.bypassCache
    ? { bypassCache: true }
    : {};

  const slug = getHeader(headers, 'x-tenant-slug');
  let tenant: ResolvedTenant | null = null;
  if (slug) tenant = await resolveTenantBySlug(slug, resolveOpts);

  // Fall back to custom-domain resolution if the slug header is absent or
  // didn't resolve. This lets apps mounted on external hostnames work
  // without the middleware having to know the DB.
  if (!tenant) {
    const host = getHeader(headers, 'host');
    if (host) tenant = await resolveTenantByHost(host, resolveOpts);
  }

  if (!tenant) return null;

  // Membership gate. Defaults to on; can be opted out for pre-auth routes
  // (signup, public tenant checkout preview) via requireMembership:false.
  const gate = options.requireMembership ?? true;
  if (gate && options.userId) {
    const member = await isTenantMember(tenant.id, options.userId);
    if (!member) {
      throw new NotATenantMemberError(tenant.id, options.userId);
    }
  }

  return {
    tenantId: tenant.id,
    userId: options.userId ?? null,
    role: options.role ?? 'tenant',
    tenant,
  };
}
