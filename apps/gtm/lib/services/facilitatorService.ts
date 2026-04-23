/**
 * AI Facilitator Service
 * Manages weekly facilitation rhythm: Monday kickoff, Wednesday nudge, Friday synthesis.
 * Uses OpenAI to generate personalized posts, then posts to NodeBB via the bot account.
 */

import { getDb, hasDatabase, schema } from "@/lib/db";
import { eq, and, gte, sql, desc } from "drizzle-orm";
import { nodebbClient } from "@/lib/nodebb/client";
import { podService } from "./podService";
import {
  buildWeeklyKickoffPrompt,
  type WeeklyKickoffContext,
} from "@/lib/prompts/facilitator/weekly-kickoff";
import {
  buildMidWeekNudgePrompt,
  type MidWeekNudgeContext,
} from "@/lib/prompts/facilitator/mid-week-nudge";
import {
  buildFridaySynthesisPrompt,
  type FridaySynthesisContext,
} from "@/lib/prompts/facilitator/friday-synthesis";
import { logger } from "@/lib/logger";
import { aiClient, anthropicClient, getProvider } from "@/lib/ai/client";
import { resolveModel, logTokenUsage } from "@/lib/ai/models";

const MAX_BOT_POSTS_PER_DAY = 10;

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getFacilitatorUid(): number {
  const uid = process.env.FACILITATOR_BOT_UID;
  if (!uid) throw new Error("FACILITATOR_BOT_UID not configured");
  const parsed = parseInt(uid, 10);
  if (isNaN(parsed))
    throw new Error("FACILITATOR_BOT_UID must be a valid number");
  return parsed;
}

// Stage theme cycles for weekly focus
const STAGE_THEMES: Record<string, string[]> = {
  foundation: [
    "defining your ideal customer profile with razor precision",
    "understanding the psychology behind why people buy",
    "crafting a positioning statement that stops prospects mid-scroll",
    "identifying your unique differentiators vs competitors",
    "mapping your customer's decision-making journey",
  ],
  lead_gen: [
    "writing cold emails that actually get replies",
    "building a LinkedIn presence that attracts inbound",
    "creating a prospecting system that runs on autopilot",
    "qualifying leads before you waste time on calls",
    "testing subject lines and CTAs with real data",
  ],
  sales_conv: [
    "running discovery calls that uncover real pain",
    'handling the "we don\'t have budget" objection',
    "moving from demo to close without being pushy",
    "building urgency without artificial deadlines",
    "asking for the close when the moment is right",
  ],
};

export class FacilitatorService {
  private getDb() {
    if (!hasDatabase()) throw new Error("Database not available");
    const db = getDb();
    if (!db) throw new Error("Database connection failed");
    return db;
  }

  /**
   * Check rate limit: max bot posts per category per day.
   */
  private async checkRateLimit(podId: string): Promise<boolean> {
    const db = this.getDb();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.podActivity)
      .where(
        and(
          eq(schema.podActivity.podId, podId),
          eq(schema.podActivity.eventType, "bot_posted"),
          gte(schema.podActivity.createdAt, today),
        ),
      );

    return Number(result?.count ?? 0) < MAX_BOT_POSTS_PER_DAY;
  }

  /**
   * Generate content via AI provider (OpenAI or Anthropic).
   */
  private async generateContent(systemPrompt: string): Promise<string> {
    const model = resolveModel("facilitator");

    if (getProvider() === "anthropic") {
      const response = await anthropicClient.messages.create({
        model,
        max_tokens: 500,
        temperature: 0.75,
        system: systemPrompt,
        messages: [{ role: "user", content: "Write the forum post now." }],
      });
      logTokenUsage("facilitator", model, response.usage);
      const textBlock = response.content.find((b) => b.type === "text");
      return textBlock?.text?.trim() || "";
    }

    const response = await aiClient.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Write the forum post now." },
      ],
      temperature: 0.75,
      max_tokens: 500,
    });

    logTokenUsage("facilitator", model, response.usage ?? undefined);
    return response.choices[0]?.message?.content?.trim() || "";
  }

  /**
   * Build member contexts for a pod by joining pod_member with profiles.
   */
  private async buildMemberContexts(podId: string): Promise<
    Record<
      string,
      {
        name: string;
        curriculumProgress: string;
        recentActivity: string;
        engagementLevel: string;
        postsThisWeek: number;
        lastPostSummary: string;
        keyContributions: string[];
      }
    >
  > {
    const db = this.getDb();
    const members = await podService.getPodMembers(podId);
    const contexts: Record<string, any> = {};

    const weekStart = new Date();
    const dayOfWeek = weekStart.getDay() || 7; // Treat Sunday as 7
    weekStart.setDate(weekStart.getDate() - dayOfWeek + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);

    for (const member of members) {
      // Get profile data
      const [profile] = await db
        .select()
        .from(schema.profile)
        .where(eq(schema.profile.userId, member.userId));

      const profileData = (profile?.data || {}) as Record<string, any>;
      const name = profileData.name || member.userId.slice(0, 8);
      const currentCourse = profileData.progress?.currentCourse ?? "starting";

      // Get recent activity count
      const [activityCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.podActivity)
        .where(
          and(
            eq(schema.podActivity.podId, podId),
            eq(schema.podActivity.userId, member.userId),
            gte(schema.podActivity.createdAt, weekStart),
          ),
        );

      const postsThisWeek = Number(activityCount?.count ?? 0);
      const engagementLevel =
        postsThisWeek >= 3 ? "high" : postsThisWeek >= 1 ? "moderate" : "quiet";

      contexts[member.userId] = {
        name,
        curriculumProgress: `Course ${currentCourse}`,
        recentActivity:
          postsThisWeek > 0
            ? `${postsThisWeek} posts this week`
            : "no posts this week",
        engagementLevel,
        postsThisWeek,
        lastPostSummary: "",
        keyContributions: [],
      };
    }

    return contexts;
  }

  /**
   * Post weekly kickoff (Monday).
   */
  async postWeeklyKickoff(podId: string): Promise<boolean> {
    if (!(await this.checkRateLimit(podId))) {
      logger.warn("Rate limit reached for pod", { podId });
      return false;
    }

    const db = this.getDb();
    const pod = await podService.getPod(podId);
    if (!pod || pod.status !== "active") return false;

    const memberContexts = await this.buildMemberContexts(podId);
    const themes = STAGE_THEMES[pod.curriculumStage] || STAGE_THEMES.foundation;
    const weeklyTheme =
      themes[Math.abs((Math.max(1, pod.weekNumber) - 1) % themes.length)];

    const prompt = buildWeeklyKickoffPrompt({
      podName: pod.name,
      weekNumber: pod.weekNumber,
      curriculumStage: pod.curriculumStage,
      memberContexts,
      lastWeekHighlights:
        pod.weekNumber > 1 ? ["(continuing from last week)"] : [],
    });

    const content = await this.generateContent(prompt);
    if (!content) {
      logger.error("Empty content from OpenAI for weekly kickoff", { podId });
      return false;
    }

    // Post to NodeBB
    if (pod.nodebbCategoryId) {
      try {
        await nodebbClient.createTopic({
          cid: pod.nodebbCategoryId,
          title: `Week ${pod.weekNumber} - ${weeklyTheme.slice(0, 60)}`,
          content,
          _uid: getFacilitatorUid(),
        });
      } catch (err) {
        logger.error("Failed to post weekly kickoff to NodeBB", { podId, err });
      }
    }

    // Log activity
    await db.insert(schema.podActivity).values({
      id: generateId("pa"),
      podId,
      eventType: "bot_posted",
      metadata: { type: "weekly_kickoff", weekNumber: pod.weekNumber },
    });

    // Increment week number
    await podService.updatePod(podId, { weekNumber: pod.weekNumber + 1 });

    logger.info("Weekly kickoff posted", { podId, weekNumber: pod.weekNumber });
    return true;
  }

  /**
   * Post mid-week nudge (Wednesday).
   */
  async postMidWeekNudge(podId: string): Promise<boolean> {
    if (!(await this.checkRateLimit(podId))) return false;

    const pod = await podService.getPod(podId);
    if (!pod || pod.status !== "active") return false;

    const memberContexts = await this.buildMemberContexts(podId);
    const themes = STAGE_THEMES[pod.curriculumStage] || STAGE_THEMES.foundation;
    const weeklyTheme = themes[((pod.weekNumber || 1) - 1) % themes.length];

    const prompt = buildMidWeekNudgePrompt({
      podName: pod.name,
      weekNumber: pod.weekNumber,
      curriculumStage: pod.curriculumStage,
      weeklyTheme,
      memberContexts,
      activeThreads: [],
    });

    const content = await this.generateContent(prompt);
    if (!content) return false;

    if (pod.nodebbCategoryId) {
      try {
        await nodebbClient.createTopic({
          cid: pod.nodebbCategoryId,
          title: `Mid-week check-in - Week ${pod.weekNumber}`,
          content,
          _uid: getFacilitatorUid(),
        });
      } catch (err) {
        logger.error("Failed to post mid-week nudge", { podId, err });
      }
    }

    const db = this.getDb();
    await db.insert(schema.podActivity).values({
      id: generateId("pa"),
      podId,
      eventType: "bot_posted",
      metadata: { type: "mid_week_nudge", weekNumber: pod.weekNumber },
    });

    logger.info("Mid-week nudge posted", { podId });
    return true;
  }

  /**
   * Post Friday synthesis.
   */
  async postFridaySynthesis(podId: string): Promise<boolean> {
    if (!(await this.checkRateLimit(podId))) return false;

    const pod = await podService.getPod(podId);
    if (!pod || pod.status !== "active") return false;

    const memberContexts = await this.buildMemberContexts(podId);
    const themes = STAGE_THEMES[pod.curriculumStage] || STAGE_THEMES.foundation;
    const weeklyTheme = themes[((pod.weekNumber || 1) - 1) % themes.length];
    const nextWeekTheme = themes[(pod.weekNumber || 1) % themes.length];

    const prompt = buildFridaySynthesisPrompt({
      podName: pod.name,
      weekNumber: pod.weekNumber,
      curriculumStage: pod.curriculumStage,
      weeklyTheme,
      memberContexts,
      weekHighlights: [],
      nextWeekTheme,
    });

    const content = await this.generateContent(prompt);
    if (!content) return false;

    if (pod.nodebbCategoryId) {
      try {
        await nodebbClient.createTopic({
          cid: pod.nodebbCategoryId,
          title: `Week ${pod.weekNumber} Wrap-up`,
          content,
          _uid: getFacilitatorUid(),
        });
      } catch (err) {
        logger.error("Failed to post Friday synthesis", { podId, err });
      }
    }

    const db = this.getDb();
    await db.insert(schema.podActivity).values({
      id: generateId("pa"),
      podId,
      eventType: "bot_posted",
      metadata: { type: "friday_synthesis", weekNumber: pod.weekNumber },
    });

    logger.info("Friday synthesis posted", { podId });
    return true;
  }

  /**
   * Run weekly rhythm for ALL active pods.
   */
  async runWeeklyRhythm(dayOfWeek: "monday" | "wednesday" | "friday"): Promise<{
    podsProcessed: number;
    postsCreated: number;
    errors: string[];
  }> {
    const db = this.getDb();
    const activePods = await db
      .select()
      .from(schema.pod)
      .where(eq(schema.pod.status, "active"));

    let postsCreated = 0;
    const errors: string[] = [];

    for (const pod of activePods) {
      try {
        let posted = false;
        switch (dayOfWeek) {
          case "monday":
            posted = await this.postWeeklyKickoff(pod.id);
            break;
          case "wednesday":
            posted = await this.postMidWeekNudge(pod.id);
            break;
          case "friday":
            posted = await this.postFridaySynthesis(pod.id);
            break;
        }
        if (posted) postsCreated++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Pod ${pod.id}: ${msg}`);
        logger.error("Facilitator failed for pod", {
          podId: pod.id,
          dayOfWeek,
          err,
        });
      }
    }

    logger.info("Weekly rhythm complete", {
      dayOfWeek,
      podsProcessed: activePods.length,
      postsCreated,
      errors: errors.length,
    });
    return { podsProcessed: activePods.length, postsCreated, errors };
  }

  /**
   * Update facilitator context snapshot for a pod.
   */
  async updateFacilitatorContext(podId: string): Promise<void> {
    const db = this.getDb();
    const pod = await podService.getPod(podId);
    if (!pod) return;

    const memberContexts = await this.buildMemberContexts(podId);
    const health = await podService.getPodHealth(podId);

    await db
      .insert(schema.facilitatorContext)
      .values({
        id: generateId("fc"),
        podId,
        weekNumber: pod.weekNumber,
        memberContexts,
        podHealthScore: health.healthScore,
        aiSummary: health.recommendation,
      })
      .onConflictDoUpdate({
        target: [
          schema.facilitatorContext.podId,
          schema.facilitatorContext.weekNumber,
        ],
        set: {
          memberContexts,
          podHealthScore: health.healthScore,
          aiSummary: health.recommendation,
        },
      });
  }
}

export const facilitatorService = new FacilitatorService();
