/**
 * AI-generated daily digest nudge.
 * 2-3 sentence personalized coaching nudge using DISC tone.
 */

import OpenAI from "openai";
import { aiClient, anthropicClient, getProvider } from "@/lib/ai/client";
import { resolveModel, logTokenUsage } from "@/lib/ai/models";
import type { DigestContext } from "@/types/execute";

const DISC_TONES: Record<string, string> = {
  D: "Direct and results-focused. Lead with the action, skip the preamble.",
  I: "Enthusiastic and encouraging. Highlight wins and social proof.",
  S: "Supportive and steady. Reassure and give clear next step.",
  C: "Analytical and precise. Use data and specific numbers.",
};

export async function generateDigestNudge(
  context: DigestContext,
): Promise<string> {
  const discTone = context.discPrimary
    ? DISC_TONES[context.discPrimary] || ""
    : "";
  const model = resolveModel("daily-digest");

  const systemPrompt = `You are an AI sales coach for solo founders. Generate a 2-3 sentence daily coaching nudge.
${discTone ? `\nTONE: ${discTone}` : ""}

Rules:
- Reference specific data from the context (lessons completed, outreach count, pipeline state)
- Suggest ONE concrete action for today
- Be warm but not fluffy. No generic motivation.
- Under 100 words total.`;

  const userPrompt = buildUserPrompt(context);

  if (getProvider() === "anthropic") {
    const response = await anthropicClient.messages.create({
      model,
      max_tokens: 200,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    logTokenUsage("daily-digest", model, response.usage);
    const textBlock = response.content.find((b) => b.type === "text");
    return textBlock?.text || "Keep pushing forward today.";
  }

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const completion = await aiClient.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 200,
  });

  logTokenUsage("daily-digest", model, completion.usage ?? undefined);
  return (
    completion.choices[0]?.message?.content || "Keep pushing forward today."
  );
}

function buildUserPrompt(ctx: DigestContext): string {
  const parts: string[] = [`Founder: ${ctx.userName}`];

  if (ctx.recentLessons.length > 0) {
    parts.push(
      `Yesterday: completed ${ctx.recentLessons.length} lesson(s), earned ${ctx.recentLessons.reduce((s, l) => s + l.xpEarned, 0)} XP`,
    );
  } else {
    parts.push("Yesterday: no lessons completed");
  }

  if (ctx.outreachStats.totalActions > 0) {
    parts.push(
      `Outreach yesterday: ${ctx.outreachStats.totalActions} actions (${Object.entries(
        ctx.outreachStats.byChannel,
      )
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${v} ${k}`)
        .join(", ")})`,
    );
  } else {
    parts.push("Outreach yesterday: none");
  }

  const activeDeals =
    ctx.pipelineStats.totalDeals -
    ctx.pipelineStats.byStage.won.count -
    ctx.pipelineStats.byStage.lost.count;
  if (activeDeals > 0) {
    parts.push(
      `Pipeline: ${activeDeals} active deals, ${ctx.pipelineStats.byStage.meeting.count} in meeting stage`,
    );
    if (ctx.pipelineStats.totalValue > 0) {
      parts.push(
        `Total pipeline value: $${(ctx.pipelineStats.totalValue / 100).toFixed(0)}`,
      );
    }
  }

  if (ctx.streak.current > 0) {
    parts.push(`Streak: ${ctx.streak.current} days`);
  }

  if (ctx.assessmentScores) {
    const scores = ctx.assessmentScores;
    const weakest = Object.entries(scores)
      .filter(([k]) => k !== "overallReadiness")
      .sort(([, a], [, b]) => a - b)[0];
    if (weakest) {
      parts.push(`Weakest dimension: ${weakest[0]} (${weakest[1]}%)`);
    }
  }

  return parts.join("\n");
}
