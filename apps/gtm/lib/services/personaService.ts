/**
 * AI Persona Service
 * Manages AI persona responses in pod discussion threads.
 * Handles rate limiting, persona selection, and fade-out logic.
 */

import { getDb, hasDatabase, schema } from "@/lib/db";
import { eq, and, gte, sql } from "drizzle-orm";
import { nodebbClient } from "@/lib/nodebb/client";
import { getPersonaById, FORUM_PERSONAS } from "@/lib/data/personas-forum";
import { FORUM_BOTS } from "@/lib/data/forum-bots";
import { buildAlexPrompt } from "@/lib/prompts/personas/alex";
import { buildJordanPrompt } from "@/lib/prompts/personas/jordan";
import { buildMorganPrompt } from "@/lib/prompts/personas/morgan";
import { buildSamPrompt } from "@/lib/prompts/personas/sam";
import { podService } from "./podService";
import { logger } from "@/lib/logger";
import { aiClient, anthropicClient, getProvider } from "@/lib/ai/client";
import { resolveModel, logTokenUsage } from "@/lib/ai/models";

const MIN_COOLDOWN_HOURS = 4;
const MAX_BOT_THREAD_RATIO = 0.2;

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Map persona id -> NodeBB bot UID env var
function getPersonaUid(personaId: string): number | null {
  const envKey = `PERSONA_${personaId.toUpperCase().replace(/-/g, "_")}_UID`;
  const uid = process.env[envKey] || process.env.FACILITATOR_BOT_UID;
  if (!uid) return null;
  const parsed = parseInt(uid, 10);
  return isNaN(parsed) ? null : parsed;
}

export class PersonaService {
  private getDb() {
    if (!hasDatabase()) throw new Error("Database not available");
    const db = getDb();
    if (!db) throw new Error("Database connection failed");
    return db;
  }

  /**
   * Check if bot posts are under 20% of thread posts.
   */
  private async checkThreadBotRatio(tid: number): Promise<boolean> {
    try {
      const posts = await nodebbClient.getTopicPosts(tid);
      if (posts.length < 2) return true; // Allow first bot post

      const botUsernames = FORUM_BOTS.map((b) => b.username);
      const botPosts = posts.filter(
        (p) => p.user && botUsernames.includes(p.user.username),
      );
      return botPosts.length / posts.length < MAX_BOT_THREAD_RATIO;
    } catch {
      return true; // Allow on error
    }
  }

  /**
   * Check if a persona has cooled down (min 4hr gap).
   */
  private async checkPersonaCooldown(
    podId: string,
    personaId: string,
  ): Promise<boolean> {
    const db = this.getDb();
    const [activity] = await db
      .select()
      .from(schema.personaActivity)
      .where(
        and(
          eq(schema.personaActivity.podId, podId),
          eq(schema.personaActivity.personaId, personaId),
        ),
      );

    if (!activity?.lastPostedAt) return true;

    const hoursSince =
      (Date.now() - activity.lastPostedAt.getTime()) / (1000 * 60 * 60);
    return hoursSince >= MIN_COOLDOWN_HOURS;
  }

  /**
   * Check if persona is in fade-out mode.
   */
  private async isPersonaActive(
    podId: string,
    personaId: string,
  ): Promise<boolean> {
    const db = this.getDb();
    const [activity] = await db
      .select()
      .from(schema.personaActivity)
      .where(
        and(
          eq(schema.personaActivity.podId, podId),
          eq(schema.personaActivity.personaId, personaId),
        ),
      );

    return !activity || activity.fadeOutStatus === "active";
  }

  /**
   * Build persona-specific prompt.
   */
  private buildPrompt(
    personaId: string,
    context: {
      threadTopic: string;
      threadContent: string;
      recentPosts: string[];
      podCurriculumStage: string;
      memberNames: string[];
    },
  ): string {
    switch (personaId) {
      case "alex-skeptic":
        return buildAlexPrompt(context);
      case "jordan-builder":
        return buildJordanPrompt({
          ...context,
          memberNames: context.memberNames,
        });
      case "morgan-perfectionist":
        return buildMorganPrompt(context);
      case "sam-mentor":
        return buildSamPrompt(context);
      default:
        throw new Error(`Unknown persona: ${personaId}`);
    }
  }

  /**
   * Generate and post a persona response to a thread.
   */
  async generatePersonaResponse(params: {
    personaId: string;
    podId: string;
    threadId: number;
  }): Promise<boolean> {
    const { personaId, podId, threadId } = params;
    const persona = getPersonaById(personaId);
    if (!persona) {
      logger.warn("Unknown persona", { personaId });
      return false;
    }

    // Check all rate limits
    if (!(await this.isPersonaActive(podId, personaId))) {
      logger.info("Persona in fade-out, skipping", { personaId, podId });
      return false;
    }
    if (!(await this.checkPersonaCooldown(podId, personaId))) {
      logger.info("Persona on cooldown", { personaId, podId });
      return false;
    }
    if (!(await this.checkThreadBotRatio(threadId))) {
      logger.info("Thread bot ratio exceeded", { personaId, threadId });
      return false;
    }

    // Get thread context
    const topic = await nodebbClient.getTopic(threadId);
    const posts = topic.posts || [];
    const recentPosts = posts
      .slice(-5)
      .map(
        (p) =>
          `${p.user?.username || "unknown"}: ${(p.content || "").slice(0, 300)}`,
      );
    const latestPost = posts[posts.length - 1];

    // Get pod for context
    const pod = await podService.getPod(podId);
    if (!pod) return false;

    // Get member names
    const members = await podService.getPodMembers(podId);
    const memberNames = members.map((m) => m.userId.slice(0, 8)); // Placeholder until profile names

    // Build prompt
    const prompt = this.buildPrompt(personaId, {
      threadTopic: topic.title,
      threadContent: latestPost?.content?.slice(0, 500) || "",
      recentPosts,
      podCurriculumStage: pod.curriculumStage,
      memberNames,
    });

    // Generate via centralized AI client (OpenAI or Anthropic)
    const model = resolveModel("persona");
    let content: string | undefined;

    if (getProvider() === "anthropic") {
      const response = await anthropicClient.messages.create({
        model,
        max_tokens: 300,
        temperature: persona.postingBehavior.temperature,
        system: prompt,
        messages: [{ role: "user", content: "Write your response now." }],
      });
      logTokenUsage("persona", model, response.usage);
      const textBlock = response.content.find((b) => b.type === "text");
      content = textBlock?.text?.trim();
    } else {
      const response = await aiClient.chat.completions.create({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: "Write your response now." },
        ],
        temperature: persona.postingBehavior.temperature,
        max_tokens: 300,
      });
      logTokenUsage("persona", model, response.usage ?? undefined);
      content = response.choices[0]?.message?.content?.trim();
    }
    if (!content) {
      logger.error("Empty persona response", { personaId, podId });
      return false;
    }

    // Post to NodeBB
    const uid = getPersonaUid(personaId);
    if (!uid) {
      logger.error("No UID configured for persona", { personaId });
      return false;
    }

    await nodebbClient.createPost({
      tid: threadId,
      content,
      _uid: uid,
    });

    // Update persona activity
    const db = this.getDb();
    await db
      .insert(schema.personaActivity)
      .values({
        id: generateId("pact"),
        podId,
        personaId,
        postCount: 1,
        lastPostedAt: new Date(),
        fadeOutStatus: "active",
      })
      .onConflictDoUpdate({
        target: [
          schema.personaActivity.podId,
          schema.personaActivity.personaId,
        ],
        set: {
          postCount: sql`${schema.personaActivity.postCount} + 1`,
          lastPostedAt: new Date(),
          updatedAt: new Date(),
        },
      });

    // Log activity
    await db.insert(schema.podActivity).values({
      id: generateId("pa"),
      podId,
      eventType: "bot_posted",
      metadata: { personaId, threadId, type: "persona_response" },
    });

    logger.info("Persona response posted", { personaId, podId, threadId });
    return true;
  }

  /**
   * Select which persona should respond to a new post.
   * Returns null if no persona should respond.
   */
  async selectRespondingPersona(
    podId: string,
    threadContent: string,
  ): Promise<string | null> {
    const db = this.getDb();

    // Get all active personas for this pod
    const podPersonas = await db
      .select()
      .from(schema.personaActivity)
      .where(
        and(
          eq(schema.personaActivity.podId, podId),
          eq(schema.personaActivity.fadeOutStatus, "active"),
        ),
      );

    if (podPersonas.length === 0) return null;

    // Filter by cooldown
    const available: { personaId: string; relevanceScore: number }[] = [];

    for (const pa of podPersonas) {
      if (!(await this.checkPersonaCooldown(podId, pa.personaId))) continue;

      const persona = getPersonaById(pa.personaId);
      if (!persona) continue;

      // Score relevance: check if thread content matches persona's topic preferences
      const contentLower = threadContent.toLowerCase();
      const matchingTopics = persona.personality.topicPreferences.filter(
        (topic) => contentLower.includes(topic.toLowerCase()),
      );
      const relevanceScore =
        persona.personality.topicPreferences.length > 0
          ? matchingTopics.length / persona.personality.topicPreferences.length
          : 0;

      // Add some randomness to prevent always picking the same persona
      const finalScore = relevanceScore * 0.7 + Math.random() * 0.3;

      available.push({ personaId: pa.personaId, relevanceScore: finalScore });
    }

    if (available.length === 0) return null;

    // Sort by relevance score
    available.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Only respond 40% of the time to keep things natural
    if (Math.random() > 0.4) return null;

    return available[0].personaId;
  }

  /**
   * Evaluate if a pod's AI personas should fade out.
   * Called periodically (weekly).
   */
  async evaluateFadeOut(podId: string): Promise<void> {
    const db = this.getDb();
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    // Count human vs bot posts in last 2 weeks
    const activities = await db
      .select()
      .from(schema.podActivity)
      .where(
        and(
          eq(schema.podActivity.podId, podId),
          gte(schema.podActivity.createdAt, twoWeeksAgo),
        ),
      );

    const botPosts = activities.filter(
      (a) => a.eventType === "bot_posted",
    ).length;
    const totalPosts = activities.filter(
      (a) => a.eventType === "bot_posted" || a.eventType === "post_created",
    ).length;

    if (totalPosts === 0) return;

    const humanRatio = 1 - botPosts / totalPosts;

    // Get all personas for this pod
    const personas = await db
      .select()
      .from(schema.personaActivity)
      .where(eq(schema.personaActivity.podId, podId));

    for (const persona of personas) {
      let newStatus = persona.fadeOutStatus;

      if (humanRatio > 0.9) {
        newStatus = "silent";
      } else if (humanRatio > 0.8) {
        newStatus = "fading";
      } else {
        newStatus = "active";
      }

      if (newStatus !== persona.fadeOutStatus) {
        await db
          .update(schema.personaActivity)
          .set({
            fadeOutStatus: newStatus,
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(schema.personaActivity.podId, podId),
              eq(schema.personaActivity.personaId, persona.personaId),
            ),
          );
        logger.info("Persona fade-out updated", {
          podId,
          personaId: persona.personaId,
          oldStatus: persona.fadeOutStatus,
          newStatus,
        });
      }
    }
  }
}

export const personaService = new PersonaService();
