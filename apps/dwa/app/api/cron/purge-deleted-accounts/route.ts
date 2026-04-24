import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { getDb } from '@/lib/db';
import { user, profile, moodEntry, coachSession, patientAssignment, session } from '@/lib/db/schema';
import { eq, lt, and, isNotNull } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { getClientIp } from '@/lib/security';

/**
 * GET /api/cron/purge-deleted-accounts
 *
 * Automated cleanup job for soft-deleted accounts (Finding 9).
 *
 * Purges user data for accounts where:
 * - deleted_at is set
 * - More than 30 days have passed since deletion
 *
 * Should be called by a cron service (e.g., Vercel Cron, GitHub Actions, n8n).
 *
 * Authentication: Requires CRON_SECRET header to prevent unauthorized purges.
 *
 * Schedule: Run daily at 2 AM UTC
 *
 * Example cron expression: 0 2 * * *
 */
export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized purges.
  // Use constant-time compare — the old `!==` leaks the secret via timing.
  // (slice 01 / B-036 class.)
  const authHeader = request.headers.get('authorization') ?? '';
  const cronSecret = process.env.CRON_SECRET || process.env.ADMIN_API_SECRET;
  const expected = `Bearer ${cronSecret ?? ''}`;

  const authorized =
    !!cronSecret &&
    authHeader.length === expected.length &&
    (() => {
      try { return timingSafeEqual(Buffer.from(authHeader), Buffer.from(expected)); }
      catch { return false; }
    })();

  if (!authorized) {
    logger.warn('unauthorized_purge_attempt', { ip: getClientIp(request) });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }

  try {
    // Calculate cutoff date (30 days ago)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find users eligible for purge
    const eligibleUsers = await db
      .select({ id: user.id, email: user.email, deletedAt: user.deletedAt })
      .from(user)
      .where(
        and(
          isNotNull(user.deletedAt),
          lt(user.deletedAt, thirtyDaysAgo)
        )
      );

    if (eligibleUsers.length === 0) {
      logger.info('purge_job_no_accounts', { thirtyDaysAgo: thirtyDaysAgo.toISOString() });
      return NextResponse.json({
        success: true,
        purged: 0,
        message: 'No accounts eligible for purge',
      });
    }

    const purgedAccounts: Array<{ userId: string; email: string; deletedAt: Date }> = [];

    // Purge each user's data.
    // Wrap each user's six-step delete in a transaction so a mid-loop crash
    // doesn't leave an account half-purged (e.g. sessions + mood wiped but
    // user row still present). (slice 01 finding.)
    for (const eligibleUser of eligibleUsers) {
      try {
        logger.info('purging_account', {
          userId: eligibleUser.id,
          email: eligibleUser.email,
          deletedAt: eligibleUser.deletedAt,
        });

        await db.transaction(async (tx) => {
          // 1. Delete sessions (logout all devices)
          await tx.delete(session).where(eq(session.userId, eligibleUser.id));

          // 2. Scrub profile data (replace with anonymized stub)
          await tx
            .update(profile)
            .set({
              data: {
                _purged: true,
                _purgedAt: new Date().toISOString(),
              },
            })
            .where(eq(profile.userId, eligibleUser.id));

          // 3. Delete mood entries (non-audit PHI)
          await tx.delete(moodEntry).where(eq(moodEntry.userId, eligibleUser.id));

          // 4. Delete coach sessions (non-audit PHI)
          await tx.delete(coachSession).where(eq(coachSession.userId, eligibleUser.id));

          // 5. Delete patient assignments (if they were a patient)
          await tx.delete(patientAssignment).where(eq(patientAssignment.patientId, eligibleUser.id));

          // 6. Delete user row last (FKs with SET NULL preserve audit logs)
          // Audit logs (distress_event, moderation_log, lesson_feedback) remain with user_id=null
          await tx.delete(user).where(eq(user.id, eligibleUser.id));
        });

        purgedAccounts.push({
          userId: eligibleUser.id,
          email: eligibleUser.email,
          deletedAt: eligibleUser.deletedAt!,
        });

        logger.info('account_purged', {
          userId: eligibleUser.id,
          email: eligibleUser.email,
        });
      } catch (error) {
        logger.error('account_purge_failed', {
          userId: eligibleUser.id,
          email: eligibleUser.email,
          error: error instanceof Error ? error.message : String(error),
        });
        // Continue to next user even if one fails
      }
    }

    logger.info('purge_job_complete', {
      totalPurged: purgedAccounts.length,
      totalEligible: eligibleUsers.length,
    });

    return NextResponse.json({
      success: true,
      purged: purgedAccounts.length,
      accounts: purgedAccounts.map(a => ({
        userId: a.userId,
        // Redact email in response for privacy
        email: a.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
        deletedAt: a.deletedAt,
      })),
    });
  } catch (error) {
    logger.error('purge_job_error', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Purge job failed' }, { status: 500 });
  }
}
