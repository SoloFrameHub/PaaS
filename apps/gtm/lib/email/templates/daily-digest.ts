/**
 * Daily Digest Email Template
 * Inline-styled HTML for maximum email client compatibility.
 */

import type { DigestContext } from "@/types/execute";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://ai-solo-gtm-os.soloframehub.com";

export function buildDigestEmailHtml(
  context: DigestContext,
  aiNudge: string,
): string {
  const { userName, recentLessons, outreachStats, pipelineStats, streak } =
    context;
  const activeDeals =
    pipelineStats.totalDeals -
    pipelineStats.byStage.won.count -
    pipelineStats.byStage.lost.count;
  const xpYesterday = recentLessons.reduce((s, l) => s + l.xpEarned, 0);

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:24px;">
      <h1 style="font-size:18px;color:#111827;margin:0;">Your Daily Briefing</h1>
      <p style="font-size:13px;color:#6b7280;margin:4px 0 0;">${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
    </div>

    <!-- AI Nudge -->
    <div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:16px;border-radius:8px;margin-bottom:20px;">
      <p style="font-size:13px;color:#3b82f6;font-weight:600;margin:0 0 6px;">AI Coach</p>
      <p style="font-size:14px;color:#1e3a5f;margin:0;line-height:1.5;">${escapeHtml(aiNudge)}</p>
    </div>

    <!-- Stats Grid -->
    <div style="display:flex;gap:12px;margin-bottom:20px;">
      <div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:24px;font-weight:700;color:#111827;margin:0;">${recentLessons.length}</p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Lessons</p>
      </div>
      <div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:24px;font-weight:700;color:#111827;margin:0;">${outreachStats.totalActions}</p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Outreach</p>
      </div>
      <div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:24px;font-weight:700;color:#111827;margin:0;">${activeDeals}</p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Active Deals</p>
      </div>
    </div>

    ${
      streak.current > 0
        ? `
    <!-- Streak -->
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:20px;text-align:center;">
      <span style="font-size:14px;color:#111827;">Day ${streak.current} streak ${streak.current >= 7 ? "🔥" : ""}</span>
      ${xpYesterday > 0 ? `<span style="font-size:13px;color:#6b7280;margin-left:12px;">+${xpYesterday} XP yesterday</span>` : ""}
    </div>
    `
        : ""
    }

    ${
      activeDeals > 0
        ? `
    <!-- Pipeline -->
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:20px;">
      <p style="font-size:13px;font-weight:600;color:#374151;margin:0 0 8px;">Pipeline</p>
      <table style="width:100%;font-size:13px;color:#4b5563;">
        ${pipelineStats.byStage.meeting.count > 0 ? `<tr><td style="padding:2px 0;">In Meeting</td><td style="text-align:right;font-weight:600;">${pipelineStats.byStage.meeting.count}</td></tr>` : ""}
        ${pipelineStats.byStage.proposal.count > 0 ? `<tr><td style="padding:2px 0;">Proposal</td><td style="text-align:right;font-weight:600;">${pipelineStats.byStage.proposal.count}</td></tr>` : ""}
        ${pipelineStats.totalValue > 0 ? `<tr><td style="padding:2px 0;border-top:1px solid #e5e7eb;padding-top:6px;">Total Value</td><td style="text-align:right;font-weight:600;border-top:1px solid #e5e7eb;padding-top:6px;">$${(pipelineStats.totalValue / 100).toLocaleString()}</td></tr>` : ""}
      </table>
    </div>
    `
        : ""
    }

    <!-- CTA -->
    <div style="text-align:center;margin:24px 0;">
      <a href="${APP_URL}/dashboard" style="display:inline-block;background:#3b82f6;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Open Your OS</a>
    </div>

    <!-- Footer -->
    <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:32px;">
      SoloFrameHub — Solo GTM OS<br>
      <a href="${APP_URL}/settings" style="color:#9ca3af;">Manage email preferences</a>
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
