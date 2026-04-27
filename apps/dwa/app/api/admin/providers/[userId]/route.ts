/**
 * POST /api/admin/providers/[userId]
 * Body: { action: 'approve' | 'reject', notes?: string }
 *
 * Cross-tenant view — runs as platform_system to bypass RLS on
 * `provider_profile` (D-7). `user` is RLS-excluded (D-2) but is reachable
 * under the system role too, so both updates run inside the same wrapper.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdminAuth } from '@/lib/api/with-auth';
import { withSystemAdminApp } from '@/lib/db/with-tenant';
import { providerProfile, user } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { logger } from '@/lib/logger';

const actionSchema = z.object({
  action: z.enum(['approve', 'reject']),
  notes:  z.string().max(500).optional(),
});

export const POST = withAdminAuth(async (req, { userId: adminId }, context) => {
  const targetUserId = context.params.userId as string;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { action, notes } = parsed.data;

  const result = await withSystemAdminApp(async (tx) => {
    const [prof] = await tx
      .select({ userId: providerProfile.userId, displayName: providerProfile.displayName })
      .from(providerProfile)
      .where(eq(providerProfile.userId, targetUserId));

    if (!prof) return { ok: false as const, status: 404 };

    if (action === 'approve') {
      await tx
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
      await tx.update(user).set({ role: 'provider' }).where(eq(user.id, targetUserId));

      logger.info('provider_admin_approved', { targetUserId, adminId, displayName: prof.displayName });
    } else {
      await tx
        .update(providerProfile)
        .set({
          verificationStatus: 'rejected',
          verificationNotes:  notes ?? 'Application not approved.',
          verifiedBy:         adminId,
        })
        .where(eq(providerProfile.userId, targetUserId));

      // Only downgrade role if the user currently claims to be a provider.
      // (slice 01 fix) Unconditional `role='user'` would demote admins and
      // any other role if they happened to have a pending provider
      // application.
      await tx
        .update(user)
        .set({ role: 'user' })
        .where(and(eq(user.id, targetUserId), eq(user.role, 'provider')));

      logger.info('provider_admin_rejected', { targetUserId, adminId, notes });
    }

    return { ok: true as const };
  });

  if (!result.ok) {
    return NextResponse.json({ error: 'Provider application not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, action });
});
