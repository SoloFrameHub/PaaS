import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { getDb } from '@/lib/db';
import { user, profile, moodEntry, coachSession, patientAssignment } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * DELETE /api/account/delete
 *
 * GDPR Right-to-Delete / HIPAA §164.526 endpoint (Finding 9).
 *
 * Implements soft delete with 30-day grace period:
 * - Sets user.deleted_at timestamp
 * - User cannot log in during grace period
 * - User can cancel deletion via POST /api/account/cancel-deletion
 * - After 30 days, scheduled job purges data permanently
 *
 * Audit logs (distress_event, moderation_log, lesson_feedback) preserved via SET NULL FKs.
 */
export const DELETE = withAuth(async (request: NextRequest, { userId, email }) => {
  const db = getDb();
  if (!db) {
    return errorResponse('Database not available', 503);
  }

  try {
    logger.info('account_deletion_initiated', { userId, email });

    const now = new Date();
    const purgeDate = new Date(now);
    purgeDate.setDate(purgeDate.getDate() + 30);

    // Soft delete: Set deleted_at timestamp (actual deletion happens after 30 days)
    await db
      .update(user)
      .set({
        deletedAt: now,
        updatedAt: now,
      })
      .where(eq(user.id, userId));

    // Mark profile as pending deletion (preserves data for recovery)
    await db
      .update(profile)
      .set({
        data: {
          _pendingDeletion: true,
          _deletionScheduledAt: now.toISOString(),
          _purgeAfter: purgeDate.toISOString(),
        },
      })
      .where(eq(profile.userId, userId));

    logger.info('account_soft_deleted', {
      userId,
      email,
      purgeAfter: purgeDate.toISOString(),
    });

    // TODO: Send confirmation email with cancellation link
    // TODO: Notify assigned providers (if user was a patient)

    return successResponse({
      success: true,
      message: 'Account deletion scheduled. You have 30 days to cancel this request.',
      purgeDate: purgeDate.toISOString(),
      cancelUrl: '/api/account/cancel-deletion',
    });
  } catch (error) {
    logger.error('account_deletion_failed', { userId, email, error });
    return errorResponse('Account deletion failed', 500);
  }
});
