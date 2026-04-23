/**
 * Outreach Log Service
 * Tracks manual outreach activity (emails sent, calls made, meetings booked).
 */

import { getDb, schema } from "@/lib/db";
import { eq, and, desc, gte, lte } from "drizzle-orm";
import { activityFeedService } from "./activityFeedService";
import type {
  OutreachStats,
  OutreachChannel,
  OutreachAction,
  OutreachOutcome,
} from "@/types/execute";

function generateId(): string {
  return `ol_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function createOutreachLog(
  userId: string,
  data: {
    prospectName: string;
    prospectCompany?: string;
    channel: OutreachChannel;
    action: OutreachAction;
    notes?: string;
    outcome?: OutreachOutcome;
    dealId?: string;
    loggedAt?: string;
  },
) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const id = generateId();
  const loggedAt = data.loggedAt ? new Date(data.loggedAt) : new Date();

  await db.insert(schema.outreachLog).values({
    id,
    userId,
    prospectName: data.prospectName,
    prospectCompany: data.prospectCompany || null,
    channel: data.channel,
    action: data.action,
    notes: data.notes || null,
    outcome: data.outcome || null,
    dealId: data.dealId || null,
    loggedAt,
  });

  // Fire-and-forget activity event
  activityFeedService
    .insertEvent(
      userId,
      "outreach_logged",
      `${data.action.replace(/_/g, " ")} — ${data.prospectName}`,
      data.prospectCompany ? `at ${data.prospectCompany}` : undefined,
      { channel: data.channel, action: data.action, outcome: data.outcome },
    )
    .catch(() => {});

  return { id, ...data, loggedAt: loggedAt.toISOString() };
}

async function getUserOutreachLogs(
  userId: string,
  filters: {
    from?: string;
    to?: string;
    channel?: OutreachChannel;
    limit?: number;
  } = {},
) {
  const db = getDb();
  if (!db) return [];

  const conditions = [eq(schema.outreachLog.userId, userId)];
  if (filters.from)
    conditions.push(gte(schema.outreachLog.loggedAt, new Date(filters.from)));
  if (filters.to)
    conditions.push(lte(schema.outreachLog.loggedAt, new Date(filters.to)));
  if (filters.channel)
    conditions.push(eq(schema.outreachLog.channel, filters.channel));

  const rows = await db
    .select()
    .from(schema.outreachLog)
    .where(and(...conditions))
    .orderBy(desc(schema.outreachLog.loggedAt))
    .limit(filters.limit || 50);

  return rows.map((r) => ({
    id: r.id,
    userId: r.userId,
    prospectName: r.prospectName,
    prospectCompany: r.prospectCompany,
    channel: r.channel as OutreachChannel,
    action: r.action as OutreachAction,
    notes: r.notes,
    outcome: r.outcome as OutreachOutcome | null,
    dealId: r.dealId,
    metadata: r.metadata as Record<string, unknown> | null,
    loggedAt: r.loggedAt.toISOString(),
    createdAt: r.createdAt.toISOString(),
  }));
}

async function getOutreachStats(
  userId: string,
  periodDays: number = 7,
): Promise<OutreachStats> {
  const db = getDb();
  const empty: OutreachStats = {
    totalActions: 0,
    byChannel: {
      whatsapp: 0,
      instagram_dm: 0,
      email: 0,
      phone: 0,
      linkedin: 0,
      event: 0,
      facebook_messenger: 0,
      twitter: 0,
      sms: 0,
      other: 0,
    },
    byAction: {
      initial_outreach: 0,
      follow_up: 0,
      meeting_booked: 0,
      meeting_held: 0,
      proposal_sent: 0,
      voice_note: 0,
      other: 0,
    },
    byOutcome: { positive: 0, neutral: 0, negative: 0, pending: 0 },
  };
  if (!db) return empty;

  const since = new Date();
  since.setDate(since.getDate() - periodDays);

  const rows = await db
    .select()
    .from(schema.outreachLog)
    .where(
      and(
        eq(schema.outreachLog.userId, userId),
        gte(schema.outreachLog.loggedAt, since),
      ),
    );

  const stats = { ...empty };
  for (const r of rows) {
    stats.totalActions++;
    const ch = r.channel as OutreachChannel;
    const act = r.action as OutreachAction;
    const out = (r.outcome as OutreachOutcome) || "pending";
    if (ch in stats.byChannel) stats.byChannel[ch]++;
    if (act in stats.byAction) stats.byAction[act]++;
    stats.byOutcome[out]++;
  }
  return stats;
}

async function updateOutreachLog(
  userId: string,
  logId: string,
  updates: Partial<{
    prospectName: string;
    prospectCompany: string;
    channel: OutreachChannel;
    action: OutreachAction;
    notes: string;
    outcome: OutreachOutcome;
    dealId: string;
  }>,
) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const [existing] = await db
    .select({ userId: schema.outreachLog.userId })
    .from(schema.outreachLog)
    .where(eq(schema.outreachLog.id, logId))
    .limit(1);

  if (!existing || existing.userId !== userId) {
    throw new Error("Outreach log not found");
  }

  await db
    .update(schema.outreachLog)
    .set(updates)
    .where(eq(schema.outreachLog.id, logId));
}

async function deleteOutreachLog(userId: string, logId: string) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const [existing] = await db
    .select({ userId: schema.outreachLog.userId })
    .from(schema.outreachLog)
    .where(eq(schema.outreachLog.id, logId))
    .limit(1);

  if (!existing || existing.userId !== userId) {
    throw new Error("Outreach log not found");
  }

  await db.delete(schema.outreachLog).where(eq(schema.outreachLog.id, logId));
}

export const outreachService = {
  createOutreachLog,
  getUserOutreachLogs,
  getOutreachStats,
  updateOutreachLog,
  deleteOutreachLog,
};
