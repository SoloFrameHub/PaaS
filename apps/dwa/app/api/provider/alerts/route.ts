/**
 * GET /api/provider/alerts — unresolved distress events for the provider's patients
 */

import { NextRequest, NextResponse } from 'next/server';
import { withProviderAuth } from '@/lib/api/with-auth';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { distressEvent, providerPatient } from '@/lib/db/schema';
import { eq, and, isNull, inArray, desc } from 'drizzle-orm';

export const GET = withProviderAuth(async (req, { userId: providerId }) => {
  const ctx = await requireTenantContext(req, { userId: providerId });

  const result = await withTenantApp(ctx, async (tx) => {
    // Get all patient IDs for this provider
    const links = await tx
      .select({ patientId: providerPatient.patientId, displayName: providerPatient.displayName })
      .from(providerPatient)
      .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')));

    if (links.length === 0) return { links, alerts: [] };

    const patientIds = links.map(l => l.patientId);

    // Unresolved crisis or mild events
    const alerts = await tx
      .select()
      .from(distressEvent)
      .where(
        and(
          inArray(distressEvent.userId, patientIds),
          isNull(distressEvent.resolvedAt),
          inArray(distressEvent.level, ['crisis', 'mild']),
        )
      )
      .orderBy(desc(distressEvent.createdAt))
      .limit(100);

    return { links, alerts };
  });

  if (result.links.length === 0) return NextResponse.json({ alerts: [] });

  const nameMap = new Map(
    result.links.map(l => [l.patientId, l.displayName ?? `Patient ${l.patientId.slice(-4)}`]),
  );

  return NextResponse.json({
    alerts: result.alerts.map(a => ({
      ...a,
      patientAlias: nameMap.get(a.userId ?? '') ?? 'Unknown',
    })),
  });
});
