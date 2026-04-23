/**
 * Activity Feed Service
 *
 * Aggregates platform events (lesson completions, badge earns, artifact saves,
 * streak milestones) and NodeBB posts into a unified activity feed.
 */

import { getDb, schema } from "@/lib/db";
import { desc } from "drizzle-orm";
import { communityService } from "./communityService";

// ── Types ───────────────────────────────────────────────────────────

export type ActivityEventType =
  | "lesson_completed"
  | "badge_earned"
  | "course_completed"
  | "artifact_created"
  | "streak_milestone"
  | "community_post"
  | "outreach_logged"
  | "deal_created"
  | "deal_stage_changed"
  | "deal_won"
  | "deal_lost"
  | "artifact_exported";

export interface ActivityFeedItem {
  id: string;
  type: ActivityEventType;
  userId: string;
  title: string;
  description: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string; // ISO string
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Insert an activity event into the database.
 */
async function insertEvent(
  userId: string,
  eventType: ActivityEventType,
  title: string,
  description?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  const db = getDb();
  if (!db) return;

  const id = crypto.randomUUID();
  await db.insert(schema.activityEvent).values({
    id,
    userId,
    eventType,
    title,
    description: description || null,
    metadata: metadata || null,
  });
}

/**
 * Get a unified activity feed — combines platform events with NodeBB posts.
 * Returns items sorted by most recent first.
 */
async function getActivityFeed(
  limit: number = 20,
): Promise<ActivityFeedItem[]> {
  const items: ActivityFeedItem[] = [];

  // 1. Platform activity events from DB
  const db = getDb();
  if (db) {
    const events = await db
      .select()
      .from(schema.activityEvent)
      .orderBy(desc(schema.activityEvent.createdAt))
      .limit(limit);

    for (const e of events) {
      items.push({
        id: e.id,
        type: e.eventType as ActivityEventType,
        userId: e.userId,
        title: e.title,
        description: e.description,
        metadata: e.metadata as Record<string, unknown> | null,
        createdAt: e.createdAt.toISOString(),
      });
    }
  }

  // 2. Recent NodeBB posts (enriches the feed with community content)
  try {
    const { posts } = await communityService.getRecentTopics(0);
    for (const post of posts.slice(0, 10)) {
      items.push({
        id: `nodebb-topic-${post.tid}`,
        type: "community_post",
        userId: `nodebb-${post.author.uid}`,
        title: post.title,
        description: post.content?.substring(0, 200) || null,
        metadata: {
          tid: post.tid,
          author: post.author.displayname,
          authorPicture: post.author.picture,
          authorIconBg: post.author.iconBgColor,
          authorIconText: post.author.iconText,
          postCount: post.postCount,
          votes: post.votes,
          category: post.category.name,
        },
        createdAt: post.timestampISO,
      });
    }
  } catch {
    // NodeBB might be down — feed still works with platform events
  }

  // Sort all items by date descending
  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return items.slice(0, limit);
}

/**
 * Get activity events for a specific user.
 */
async function getUserActivity(
  userId: string,
  limit: number = 20,
): Promise<ActivityFeedItem[]> {
  const db = getDb();
  if (!db) return [];

  const { eq } = await import("drizzle-orm");
  const events = await db
    .select()
    .from(schema.activityEvent)
    .where(eq(schema.activityEvent.userId, userId))
    .orderBy(desc(schema.activityEvent.createdAt))
    .limit(limit);

  return events.map((e) => ({
    id: e.id,
    type: e.eventType as ActivityEventType,
    userId: e.userId,
    title: e.title,
    description: e.description,
    metadata: e.metadata as Record<string, unknown> | null,
    createdAt: e.createdAt.toISOString(),
  }));
}

export const activityFeedService = {
  insertEvent,
  getActivityFeed,
  getUserActivity,
};
