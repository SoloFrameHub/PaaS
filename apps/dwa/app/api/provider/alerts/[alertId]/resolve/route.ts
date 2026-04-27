/**
 * POST /api/provider/alerts/[alertId]/resolve — mark a distress event as resolved
 */

import { NextRequest, NextResponse } from 'next/server';
import { withProviderAuth } from '@/lib/api/with-auth';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { distressEvent, providerPatient } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const POST = withProviderAuth(async (req, { userId: providerId }, context) => {
  const alertId = parseInt(context.params.alertId as string, 10);
  if (isNaN(alertId)) return NextResponse.json({ error: 'Invalid alertId' }, { status: 400 });

  const ctx = await requireTenantContext(req, { userId: providerId });

  const result = await withTenantApp(ctx, async (tx) => {
    // Get the alert
    const [alert] = await tx
      .select({ userId: distressEvent.userId, resolvedAt: distressEvent.resolvedAt })
      .from(distressEvent)
      .where(eq(distressEvent.id, alertId));

    if (!alert) return { status: 'not_found' as const };
    if (alert.resolvedAt !== null) return { status: 'already_resolved' as const };

    // Verify this patient belongs to this provider AND the link is active.
    // An ex-provider should not be able to "resolve" alerts for a patient
    // who revoked the relationship. (B-040.)
    const [link] = await tx
      .select({ patientId: providerPatient.patientId })
      .from(providerPatient)
      .where(
        and(
          eq(providerPatient.providerId, providerId),
          eq(providerPatient.patientId, alert.userId ?? ''),
          eq(providerPatient.status, 'active'),
        )
      );

    if (!link) return { status: 'unauthorized' as const };

    await tx
      .update(distressEvent)
      .set({ resolvedAt: new Date(), providerAlerted: true })
      .where(eq(distressEvent.id, alertId));

    return { status: 'ok' as const };
  });

  if (result.status === 'not_found') return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
  if (result.status === 'already_resolved') return NextResponse.json({ success: true, alreadyResolved: true });
  if (result.status === 'unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  return NextResponse.json({ success: true });
});
