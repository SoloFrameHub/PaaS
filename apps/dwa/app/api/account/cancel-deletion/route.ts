import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { getDb } from '@/lib/db';
import { user, profile } from '@/lib/db/schema';
import { eq, isNotNull } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * POST /api/account/cancel-deletion
 *
 * Cancels a pending account deletion (within 30-day grace period).
 * Clears the deleted_at timestamp and restores full account access.
 *
 * Finding 9: Grace period recovery endpoint.
 */
export const POST = withAuth(async (request: NextRequest, { userId, email }) => {
  const db = getDb();
  if (!db) {
    return errorResponse('Database not available', 503);
  }

  try {
    // Check if account is actually marked for deletion
    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!userRecord?.deletedAt) {
      return errorResponse('No pending deletion found', 400);
    }

    // Calculate if still within grace period (30 days)
    const deletedAt = new Date(userRecord.deletedAt);
    const now = new Date();
    const daysSinceDeletion = (now.getTime() - deletedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceDeletion > 30) {
      logger.warn('deletion_cancellation_too_late', { userId, email, daysSinceDeletion });
      return errorResponse(
        'Grace period expired. Account data has been purged and cannot be recovered.',
        410
      );
    }

    // Restore account: Clear deleted_at timestamp
    await db
      .update(user)
      .set({
        deletedAt: null,
        updatedAt: now,
      })
      .where(eq(user.id, userId));

    // Clear pending deletion flag from profile
    const [currentProfile] = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));

    if (currentProfile) {
      const profileData = currentProfile.data as Record<string, unknown>;
      delete profileData._pendingDeletion;
      delete profileData._deletionScheduledAt;
      delete profileData._purgeAfter;

      await db
        .update(profile)
        .set({
          data: profileData,
          updatedAt: now,
        })
        .where(eq(profile.userId, userId));
    }

    logger.info('deletion_cancelled', { userId, email, daysSinceDeletion: daysSinceDeletion.toFixed(1) });

    return successResponse({
      success: true,
      message: 'Account deletion cancelled. Your account has been restored.',
    });
  } catch (error) {
    logger.error('deletion_cancellation_failed', { userId, email, error });
    return errorResponse('Failed to cancel deletion', 500);
  }
});
