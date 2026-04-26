import { NextRequest, NextResponse } from "next/server";
import { checkAdminSecret } from "@/lib/api/admin-auth";
import { hasDatabase, schema } from "@/lib/db";
import { withSystemAdminApp } from "@/lib/db/with-tenant";
import { getResend } from "@/lib/email/resend";
import { eq, sql } from "drizzle-orm";
import { logger } from "@/lib/logger";

/**
 * POST /api/admin/readiness-followup
 * Sends follow-up emails to readiness score quiz takers who haven't signed up.
 * Targets submissions from ~24h ago that haven't converted.
 * Called by OpenClaw cron (daily 10am UTC).
 * Protected by ADMIN_API_SECRET.
 *
 * Cross-tenant cron sweep — scans all tenants' `form_submission` rows and
 * runs as platform_system to bypass RLS (D-7, Pattern B).
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
    // Find readiness-score submissions from 20-28 hours ago (window around 24h)
    const windowStart = new Date(Date.now() - 28 * 60 * 60 * 1000);
    const windowEnd = new Date(Date.now() - 20 * 60 * 60 * 1000);

    const { unconverted } = await withSystemAdminApp(async (tx) => {
      const submissions = await tx
        .select({
          id: schema.formSubmission.id,
          email: schema.formSubmission.email,
          name: schema.formSubmission.name,
          score: schema.formSubmission.score,
          scoreBreakdown: schema.formSubmission.scoreBreakdown,
        })
        .from(schema.formSubmission)
        .where(
          sql`${schema.formSubmission.formSlug} = 'readiness-score'
            AND ${schema.formSubmission.createdAt} >= ${windowStart}
            AND ${schema.formSubmission.createdAt} <= ${windowEnd}
            AND ${schema.formSubmission.status} = 'new'`,
        )
        .limit(100);

      if (submissions.length === 0) {
        return { unconverted: [] as typeof submissions };
      }

      // Filter out emails that already have a user account
      const existingUsers = await tx
        .select({ email: schema.user.email })
        .from(schema.user)
        .where(
          sql`${schema.user.email} IN (${sql.join(
            submissions.map((s) => sql`${s.email}`),
            sql`, `,
          )})`,
        );

      const existingEmails = new Set(existingUsers.map((u) => u.email));
      return {
        unconverted: submissions.filter((s) => !existingEmails.has(s.email)),
      };
    });

    if (unconverted.length === 0) {
      return NextResponse.json({
        sent: 0,
        message: "No unconverted submissions found",
      });
    }

    const resend = getResend();
    let sent = 0;
    let failed = 0;

    const DIMENSION_LABELS: Record<string, string> = {
      icpClarity: "ICP Clarity",
      positioningStrength: "Positioning",
      contentEngine: "Content Engine",
      channelReadiness: "Channel Readiness",
      salesProcessMaturity: "Sales Process",
      objectionHandling: "Objection Handling",
      aiReadiness: "AI Readiness",
      pipelineTracking: "Pipeline Tracking",
    };

    for (const sub of unconverted) {
      try {
        const breakdown = (sub.scoreBreakdown || {}) as Record<string, number>;
        const maxPossible = 866;
        const overallPct = Math.min(
          100,
          Math.round(((sub.score || 0) / maxPossible) * 100),
        );

        // Find the 2 lowest-scoring dimensions
        const sorted = Object.entries(breakdown)
          .filter(([k]) => k in DIMENSION_LABELS)
          .sort(([, a], [, b]) => a - b)
          .slice(0, 2);

        const blindSpotHtml = sorted
          .map(
            ([key]) =>
              `<li style="margin-bottom: 4px;">${DIMENSION_LABELS[key] || key}</li>`,
          )
          .join("");

        await resend.emails.send({
          from: "Solo GTM OS <noreply@mail.soloframehub.com>",
          to: sub.email,
          subject: `${sub.name || "Hey"}, your acquisition blind spots are costing you deals`,
          html: `<div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
            <h2 style="margin-bottom: 8px;">Your score: ${overallPct}/100</h2>
            <p style="color: #555; margin-bottom: 16px;">Yesterday you took the Customer Acquisition Readiness assessment. Here's what stood out:</p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="font-weight: 600; color: #991b1b; margin: 0 0 8px;">Your biggest blind spots:</p>
              <ul style="margin: 0; padding-left: 20px; color: #7f1d1d;">${blindSpotHtml}</ul>
            </div>
            <p style="color: #555; margin-bottom: 20px;">These gaps are likely costing you qualified leads every week. The Solo GTM OS has a specific 90-day path to fix them — starting with a 30-minute sprint.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://ai-solo-gtm-os.soloframehub.com"}/subscribe" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Start Your 90-Day Fix — Free During Beta</a>
            <p style="color: #888; font-size: 13px; margin-top: 24px;">— The Solo GTM OS</p>
          </div>`,
        });

        // Mark as followed up
        await withSystemAdminApp(async (tx) => {
          await tx
            .update(schema.formSubmission)
            .set({ status: "followed_up" })
            .where(eq(schema.formSubmission.id, sub.id));
        });

        sent++;
      } catch (err) {
        failed++;
        logger.error("Readiness follow-up email failed", {
          submissionId: sub.id,
          err,
        });
      }
    }

    logger.info("Readiness follow-ups sent", {
      sent,
      failed,
      total: unconverted.length,
    });
    return NextResponse.json({ sent, failed, total: unconverted.length });
  } catch (error) {
    logger.error("Readiness follow-up endpoint failed", { error });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
