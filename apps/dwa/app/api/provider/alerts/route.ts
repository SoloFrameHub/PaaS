/**
 * GET /api/provider/alerts — unresolved distress events for the provider's patients
 */

import { NextRequest, NextResponse } from 'next/server';
import { withProviderAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { distressEvent, providerPatient } from '@/lib/db/schema';
import { eq, and, isNull, inArray, desc } from 'drizzle-orm';

export const GET = withProviderAuth(async (_req, { userId: providerId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // Get all patient IDs for this provider
  const links = await db
    .select({ patientId: providerPatient.patientId, displayName: providerPatient.displayName })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')));

  if (links.length === 0) return NextResponse.json({ alerts: [] });

  const patientIds = links.map(l => l.patientId);
  const nameMap = new Map(links.map(l => [l.patientId, l.displayName ?? `Patient ${l.patientId.slice(-4)}`]));

  // Unresolved crisis or mild events
  const alerts = await db
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

  return NextResponse.json({
    alerts: alerts.map(a => ({
      ...a,
      patientAlias: nameMap.get(a.userId ?? '') ?? 'Unknown',
    })),
  });
});
