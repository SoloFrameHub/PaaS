/**
 * POST /api/provider/alerts/[alertId]/resolve — mark a distress event as resolved
 */

import { NextRequest, NextResponse } from 'next/server';
import { withProviderAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { distressEvent, providerPatient } from '@/lib/db/schema';
import { eq, and, isNull } from 'drizzle-orm';

export const POST = withProviderAuth(async (_req, { userId: providerId }, context) => {
  const alertId = parseInt(context.params.alertId as string, 10);
  if (isNaN(alertId)) return NextResponse.json({ error: 'Invalid alertId' }, { status: 400 });

  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // Get the alert
  const [alert] = await db
    .select({ userId: distressEvent.userId, resolvedAt: distressEvent.resolvedAt })
    .from(distressEvent)
    .where(eq(distressEvent.id, alertId));

  if (!alert) return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
  if (alert.resolvedAt !== null) return NextResponse.json({ success: true, alreadyResolved: true });

  // Verify this patient belongs to this provider AND the link is active.
  // An ex-provider should not be able to "resolve" alerts for a patient
  // who revoked the relationship. (B-040.)
  const [link] = await db
    .select({ patientId: providerPatient.patientId })
    .from(providerPatient)
    .where(
      and(
        eq(providerPatient.providerId, providerId),
        eq(providerPatient.patientId, alert.userId ?? ''),
        eq(providerPatient.status, 'active'),
      )
    );

  if (!link) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  await db
    .update(distressEvent)
    .set({ resolvedAt: new Date(), providerAlerted: true })
    .where(eq(distressEvent.id, alertId));

  return NextResponse.json({ success: true });
});
