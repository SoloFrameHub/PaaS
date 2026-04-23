import { NextRequest, NextResponse } from "next/server";
import { checkAdminSecret } from "@/lib/api/admin-auth";
import { getDb, hasDatabase, schema } from "@/lib/db";
import { getResend } from "@/lib/email/resend";
import { gte, sql, desc } from "drizzle-orm";
import { logger } from "@/lib/logger";

/**
 * POST /api/admin/weekly-progress
 * Generates and sends weekly progress report emails to active users.
 * Called by OpenClaw cron (Monday 9am UTC).
 * Protected by ADMIN_API_SECRET.
 */
export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 },
    );
  }

  const db = getDb()!;

  try {
    // Find active users: logged in within last 14 days with a profile
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const activeUsers = await db
      .select({
        userId: schema.user.id,
        email: schema.user.email,
        profileData: schema.profile.data,
      })
      .from(schema.user)
      .innerJoin(
        schema.profile,
        sql`${schema.profile.userId} = ${schema.user.id}`,
      )
      .innerJoin(
        schema.session,
        sql`${schema.session.userId} = ${schema.user.id}`,
      )
      .where(gte(schema.session.expiresAt, twoWeeksAgo))
      .groupBy(schema.user.id, schema.user.email, schema.profile.data)
      .limit(500);

    if (activeUsers.length === 0) {
      return NextResponse.json({ sent: 0, message: "No active users found" });
    }

    // Get lesson completions from the past 7 days
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    let sent = 0;
    let failed = 0;
    const resend = getResend();

    for (const user of activeUsers) {
      try {
        const profile = user.profileData as Record<string, unknown>;
        const progress = profile?.progress as
          | Record<string, unknown>
          | undefined;
        const assessment = profile?.assessment as
          | Record<string, unknown>
          | undefined;

        const completedLessons = (progress?.completedLessons as string[]) || [];
        const totalXp = (progress?.totalXp as number) || 0;
        const streak = (progress?.currentStreak as number) || 0;
        const overallReadiness = (assessment?.overallReadiness as number) || 0;

        // Get this week's lesson completions
        const weekEvents = await db
          .select({ lessonId: schema.lessonEvent.lessonId })
          .from(schema.lessonEvent)
          .where(
            sql`${schema.lessonEvent.userId} = ${user.userId} AND ${schema.lessonEvent.createdAt} >= ${oneWeekAgo} AND ${schema.lessonEvent.eventType} = 'complete'`,
          );

        const lessonsThisWeek = weekEvents.length;

        // Skip users with zero activity
        if (lessonsThisWeek === 0 && streak === 0) continue;

        await resend.emails.send({
          from: "Solo GTM OS <noreply@mail.soloframehub.com>",
          to: user.email,
          subject: `Your Weekly Progress: ${lessonsThisWeek} lessons completed`,
          html: `<div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
            <h2 style="margin-bottom: 16px;">Your Weekly Progress Report</h2>
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <div style="text-align: center; padding: 16px; background: #f8f9fa; border-radius: 8px; flex: 1;">
                <div style="font-size: 32px; font-weight: bold;">${lessonsThisWeek}</div>
                <div style="font-size: 13px; color: #666;">Lessons This Week</div>
              </div>
              <div style="text-align: center; padding: 16px; background: #f8f9fa; border-radius: 8px; flex: 1;">
                <div style="font-size: 32px; font-weight: bold;">${totalXp}</div>
                <div style="font-size: 13px; color: #666;">Total XP</div>
              </div>
              <div style="text-align: center; padding: 16px; background: #f8f9fa; border-radius: 8px; flex: 1;">
                <div style="font-size: 32px; font-weight: bold;">${streak}</div>
                <div style="font-size: 13px; color: #666;">Day Streak</div>
              </div>
            </div>
            ${overallReadiness > 0 ? `<p style="color: #555;">Readiness Score: <strong>${overallReadiness}/100</strong></p>` : ""}
            <p style="color: #555;">Total lessons completed: <strong>${completedLessons.length}</strong></p>
            <a href="https://soloframehub.com/dashboard" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; margin-top: 16px;">Continue Learning</a>
            <p style="color: #888; font-size: 13px; margin-top: 24px;">— The Solo GTM OS</p>
          </div>`,
        });

        sent++;
      } catch (err) {
        failed++;
        logger.error("Weekly progress email failed", {
          userId: user.userId,
          err,
        });
      }
    }

    logger.info("Weekly progress reports sent", {
      sent,
      failed,
      total: activeUsers.length,
    });
    return NextResponse.json({ sent, failed, total: activeUsers.length });
  } catch (error) {
    logger.error("Weekly progress endpoint failed", { error });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
