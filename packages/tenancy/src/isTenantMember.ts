// Membership gate. Blueprint §6.2 Layer 3 addendum — before handing out a
// tenant context, verify the authenticated userId is actually a member of
// the tenant. Without this gate, any signed-in user could submit any
// x-tenant-slug header and claim that tenant — RLS would still stop
// cross-tenant DATA access, but the session-identity binding would be
// wrong for audit + per-tenant authz logic.
//
// No cache (yet): a revoked membership should take effect immediately. One
// extra SELECT per request on the indexed (tenant_id, user_id) PK is cheap.

import { and, eq } from 'drizzle-orm';

import { schema } from './internal/db.js';
import { withSystemAdmin } from './withTenant.js';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * True when `(tenantId, userId)` is a row in `tenant_member`. Goes through
 * `withSystemAdmin` because the row may belong to a different tenant scope
 * than whatever the caller is in.
 */
export async function isTenantMember(
  tenantId: string,
  userId: string,
): Promise<boolean> {
  if (!UUID_RE.test(tenantId) || !UUID_RE.test(userId)) return false;
  return withSystemAdmin(async (tx) => {
    const rows = await tx
      .select({ tenantId: schema.tenantMember.tenantId })
      .from(schema.tenantMember)
      .where(
        and(
          eq(schema.tenantMember.tenantId, tenantId),
          eq(schema.tenantMember.userId, userId),
        ),
      )
      .limit(1);
    return rows.length > 0;
  });
}
