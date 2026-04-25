import { NextRequest, NextResponse } from "next/server";
import { checkAdminSecret } from "@/lib/api/admin-auth";
import { hasDatabase, schema } from "@/lib/db";
import { withSystemAdminApp } from "@/lib/db/with-tenant";
import { getResend } from "@/lib/email/resend";
import { gte, sql } from "drizzle-orm";
import { logger } from "@/lib/logger";
import { generateDigestContext } from "@/lib/services/digestService";
import { generateDigestNudge } from "@/lib/ai/digest-nudge";
import { buildDigestEmailHtml } from "@/lib/email/templates/daily-digest";
import type { FounderProfile } from "@/types/profile";

/**
 * POST /api/admin/daily-digest
 * Generates and sends daily digest emails to active users.
 * Called by OpenClaw/n8n cron (daily 8am UTC).
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

  try {
    // Find active users: logged in within last 7 days with a profile.
    // Cross-tenant scan — runs as platform_system to bypass RLS on `profile`.
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const activeUsers = await withSystemAdminApp(async (tx) =>
      tx
        .select({
          userId: schema.profile.userId,
          profileData: schema.profile.data,
          email: schema.user.email,
        })
        .from(schema.profile)
        .innerJoin(schema.user, sql`${schema.user.id} = ${schema.profile.userId}`)
        .innerJoin(
          schema.session,
          sql`${schema.session.userId} = ${schema.user.id}`,
        )
        .where(gte(schema.session.expiresAt, oneWeekAgo))
        .groupBy(schema.profile.userId, schema.profile.data, schema.user.email)
    );

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    const resend = getResend();

    for (const row of activeUsers) {
      try {
        const profile = row.profileData as unknown as FounderProfile;
        if (!profile?.onboardingCompleted) {
          skipped++;
          continue;
        }

        const context = await generateDigestContext(row.userId, profile);
        if (!context) {
          skipped++;
          continue;
        }

        context.email = row.email;

        // Generate AI nudge (fire-and-forget fallback if AI fails)
        let aiNudge: string;
        try {
          aiNudge = await generateDigestNudge(context);
        } catch {
          aiNudge =
            "Keep building your acquisition engine today. Every action compounds.";
        }

        const html = buildDigestEmailHtml(context, aiNudge);

        await resend.emails.send({
          from: "SoloFrameHub <noreply@mail.soloframehub.com>",
          to: row.email,
          subject: `Day ${context.streak.current > 0 ? context.streak.current + " " : ""}| Your Daily Briefing`,
          html,
        });

        sent++;
      } catch (err) {
        failed++;
        logger.error("Daily digest failed for user", {
          userId: row.userId,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    logger.info("Daily digest complete", {
      sent,
      skipped,
      failed,
      total: activeUsers.length,
    });

    return NextResponse.json({
      data: { sent, skipped, failed, total: activeUsers.length },
    });
  } catch (err) {
    logger.error("Daily digest cron error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
