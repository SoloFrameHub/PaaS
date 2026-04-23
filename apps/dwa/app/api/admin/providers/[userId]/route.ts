/**
 * POST /api/admin/providers/[userId]
 * Body: { action: 'approve' | 'reject', notes?: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdminAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { providerProfile, user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';

const actionSchema = z.object({
  action: z.enum(['approve', 'reject']),
  notes:  z.string().max(500).optional(),
});

export const POST = withAdminAuth(async (req, { userId: adminId }, context) => {
  const targetUserId = context.params.userId as string;
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { action, notes } = parsed.data;

  const [prof] = await db
    .select({ userId: providerProfile.userId, displayName: providerProfile.displayName })
    .from(providerProfile)
    .where(eq(providerProfile.userId, targetUserId));

  if (!prof) return NextResponse.json({ error: 'Provider application not found' }, { status: 404 });

  if (action === 'approve') {
    await db
      .update(providerProfile)
      .set({
        verificationStatus: 'verified',
        verificationMethod: 'admin_manual',
        verificationNotes:  notes ?? 'Approved by admin.',
        verifiedAt:         new Date(),
        verifiedBy:         adminId,
      })
      .where(eq(providerProfile.userId, targetUserId));

    // Elevate role
    await db.update(user).set({ role: 'provider' }).where(eq(user.id, targetUserId));

    logger.info('provider_admin_approved', { targetUserId, adminId, displayName: prof.displayName });
  } else {
    await db
      .update(providerProfile)
      .set({
        verificationStatus: 'rejected',
        verificationNotes:  notes ?? 'Application not approved.',
        verifiedBy:         adminId,
      })
      .where(eq(providerProfile.userId, targetUserId));

    // Ensure role stays 'user'
    await db.update(user).set({ role: 'user' }).where(eq(user.id, targetUserId));

    logger.info('provider_admin_rejected', { targetUserId, adminId, notes });
  }

  return NextResponse.json({ success: true, action });
});
