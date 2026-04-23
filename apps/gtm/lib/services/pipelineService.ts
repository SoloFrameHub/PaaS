/**
 * Pipeline Deal Service
 * Manages the Kanban deal tracker. Later syncs with Attio CRM.
 */

import { getDb, schema } from "@/lib/db";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import { activityFeedService } from "./activityFeedService";
import type { DealStage, PipelineStats, DEAL_STAGES } from "@/types/execute";

function generateId(): string {
  return `pd_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function createDeal(
  userId: string,
  data: {
    prospectName: string;
    prospectCompany?: string;
    prospectEmail?: string;
    prospectLinkedin?: string;
    stage?: DealStage;
    dealValue?: number;
    currency?: string;
    probability?: number;
    expectedCloseDate?: string;
    notes?: string;
  },
) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const id = generateId();
  const now = new Date();

  await db.insert(schema.pipelineDeal).values({
    id,
    userId,
    prospectName: data.prospectName,
    prospectCompany: data.prospectCompany || null,
    prospectEmail: data.prospectEmail || null,
    prospectLinkedin: data.prospectLinkedin || null,
    stage: data.stage || "lead",
    dealValue: data.dealValue || null,
    currency: data.currency || "USD",
    probability: data.probability || null,
    expectedCloseDate: data.expectedCloseDate
      ? new Date(data.expectedCloseDate)
      : null,
    notes: data.notes || null,
    stageChangedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  activityFeedService
    .insertEvent(
      userId,
      "deal_created",
      `New deal: ${data.prospectName}`,
      data.prospectCompany ? `at ${data.prospectCompany}` : undefined,
      { stage: data.stage || "lead", dealValue: data.dealValue },
    )
    .catch(() => {});

  return {
    id,
    ...data,
    stage: data.stage || "lead",
    createdAt: now.toISOString(),
  };
}

async function moveDealToStage(
  userId: string,
  dealId: string,
  newStage: DealStage,
  lossReason?: string,
) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const [deal] = await db
    .select()
    .from(schema.pipelineDeal)
    .where(eq(schema.pipelineDeal.id, dealId))
    .limit(1);

  if (!deal || deal.userId !== userId) {
    throw new Error("Deal not found");
  }

  const oldStage = deal.stage;
  const now = new Date();

  const updates: Record<string, unknown> = {
    stage: newStage,
    stageChangedAt: now,
    updatedAt: now,
  };
  if (newStage === "lost" && lossReason) {
    updates.lossReason = lossReason;
  }

  await db
    .update(schema.pipelineDeal)
    .set(updates)
    .where(eq(schema.pipelineDeal.id, dealId));

  // Specific events for won/lost
  const eventType =
    newStage === "won"
      ? ("deal_won" as const)
      : newStage === "lost"
        ? ("deal_lost" as const)
        : ("deal_stage_changed" as const);

  activityFeedService
    .insertEvent(
      userId,
      eventType,
      `Deal ${newStage}: ${deal.prospectName}`,
      `Moved from ${oldStage} to ${newStage}`,
      { dealId, oldStage, newStage, dealValue: deal.dealValue },
    )
    .catch(() => {});
}

async function getUserDeals(
  userId: string,
  filters: { stage?: DealStage; limit?: number } = {},
) {
  const db = getDb();
  if (!db) return [];

  const conditions = [eq(schema.pipelineDeal.userId, userId)];
  if (filters.stage)
    conditions.push(eq(schema.pipelineDeal.stage, filters.stage));

  const rows = await db
    .select()
    .from(schema.pipelineDeal)
    .where(and(...conditions))
    .orderBy(desc(schema.pipelineDeal.updatedAt))
    .limit(filters.limit || 100);

  return rows.map((r) => ({
    id: r.id,
    userId: r.userId,
    prospectName: r.prospectName,
    prospectCompany: r.prospectCompany,
    prospectEmail: r.prospectEmail,
    prospectLinkedin: r.prospectLinkedin,
    stage: r.stage as DealStage,
    dealValue: r.dealValue,
    currency: r.currency,
    probability: r.probability,
    expectedCloseDate: r.expectedCloseDate?.toISOString() || null,
    lossReason: r.lossReason,
    attioRecordId: r.attioRecordId,
    notes: r.notes,
    metadata: r.metadata as Record<string, unknown> | null,
    stageChangedAt: r.stageChangedAt.toISOString(),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

async function getDealsByStage(
  userId: string,
): Promise<
  Record<
    DealStage,
    ReturnType<typeof getUserDeals> extends Promise<infer T> ? T : never
  >
> {
  const deals = await getUserDeals(userId, { limit: 200 });
  const grouped = {
    lead: [] as typeof deals,
    contacted: [] as typeof deals,
    meeting: [] as typeof deals,
    proposal: [] as typeof deals,
    won: [] as typeof deals,
    lost: [] as typeof deals,
  };
  for (const deal of deals) {
    grouped[deal.stage].push(deal);
  }
  return grouped;
}

async function getPipelineStats(userId: string): Promise<PipelineStats> {
  const deals = await getUserDeals(userId, { limit: 200 });

  const stats: PipelineStats = {
    totalDeals: deals.length,
    totalValue: 0,
    byStage: {
      lead: { count: 0, value: 0 },
      contacted: { count: 0, value: 0 },
      meeting: { count: 0, value: 0 },
      proposal: { count: 0, value: 0 },
      won: { count: 0, value: 0 },
      lost: { count: 0, value: 0 },
    },
    conversionRate: 0,
  };

  for (const deal of deals) {
    const value = deal.dealValue || 0;
    stats.totalValue += value;
    stats.byStage[deal.stage].count++;
    stats.byStage[deal.stage].value += value;
  }

  const closed = stats.byStage.won.count + stats.byStage.lost.count;
  stats.conversionRate = closed > 0 ? stats.byStage.won.count / closed : 0;

  return stats;
}

async function updateDeal(
  userId: string,
  dealId: string,
  updates: Partial<{
    prospectName: string;
    prospectCompany: string;
    prospectEmail: string;
    prospectLinkedin: string;
    dealValue: number;
    currency: string;
    probability: number;
    expectedCloseDate: string;
    lossReason: string;
    notes: string;
  }>,
) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const [existing] = await db
    .select({ userId: schema.pipelineDeal.userId })
    .from(schema.pipelineDeal)
    .where(eq(schema.pipelineDeal.id, dealId))
    .limit(1);

  if (!existing || existing.userId !== userId) {
    throw new Error("Deal not found");
  }

  const dbUpdates: Record<string, unknown> = {
    ...updates,
    updatedAt: new Date(),
  };
  if (updates.expectedCloseDate) {
    dbUpdates.expectedCloseDate = new Date(updates.expectedCloseDate);
  }

  await db
    .update(schema.pipelineDeal)
    .set(dbUpdates)
    .where(eq(schema.pipelineDeal.id, dealId));
}

async function deleteDeal(userId: string, dealId: string) {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const [existing] = await db
    .select({ userId: schema.pipelineDeal.userId })
    .from(schema.pipelineDeal)
    .where(eq(schema.pipelineDeal.id, dealId))
    .limit(1);

  if (!existing || existing.userId !== userId) {
    throw new Error("Deal not found");
  }

  await db
    .delete(schema.pipelineDeal)
    .where(eq(schema.pipelineDeal.id, dealId));
}

/** Channel activity recency per deal — for the channel activity bar */
export interface ChannelActivity {
  channel: string;
  lastContact: string; // ISO timestamp
}

/**
 * Get the most recent outreach contact per channel for a list of deals.
 * Returns a map of dealId -> ChannelActivity[]
 */
async function getChannelActivityForDeals(
  dealIds: string[],
): Promise<Record<string, ChannelActivity[]>> {
  const db = getDb();
  if (!db || dealIds.length === 0) return {};

  const rows = await db
    .select({
      dealId: schema.outreachLog.dealId,
      channel: schema.outreachLog.channel,
      lastContact: sql<string>`MAX(${schema.outreachLog.loggedAt})`.as(
        "last_contact",
      ),
    })
    .from(schema.outreachLog)
    .where(inArray(schema.outreachLog.dealId, dealIds))
    .groupBy(schema.outreachLog.dealId, schema.outreachLog.channel);

  const result: Record<string, ChannelActivity[]> = {};
  for (const row of rows) {
    if (!row.dealId) continue;
    if (!result[row.dealId]) result[row.dealId] = [];
    result[row.dealId].push({
      channel: row.channel,
      lastContact:
        typeof row.lastContact === "string"
          ? row.lastContact
          : new Date(row.lastContact).toISOString(),
    });
  }
  return result;
}

/**
 * Get the last WhatsApp contact timestamp for a list of deals.
 * Returns a map of dealId -> ISO timestamp or null.
 */
async function getLastWhatsAppContact(
  dealIds: string[],
): Promise<Record<string, string | null>> {
  const db = getDb();
  if (!db || dealIds.length === 0) return {};

  const rows = await db
    .select({
      dealId: schema.outreachLog.dealId,
      lastWa: sql<string>`MAX(${schema.outreachLog.loggedAt})`.as("last_wa"),
    })
    .from(schema.outreachLog)
    .where(
      and(
        inArray(schema.outreachLog.dealId, dealIds),
        eq(schema.outreachLog.channel, "whatsapp"),
      ),
    )
    .groupBy(schema.outreachLog.dealId);

  const result: Record<string, string | null> = {};
  for (const row of rows) {
    if (!row.dealId) continue;
    result[row.dealId] =
      typeof row.lastWa === "string"
        ? row.lastWa
        : new Date(row.lastWa).toISOString();
  }
  return result;
}

export const pipelineService = {
  createDeal,
  moveDealToStage,
  getUserDeals,
  getDealsByStage,
  getPipelineStats,
  updateDeal,
  deleteDeal,
  getChannelActivityForDeals,
  getLastWhatsAppContact,
};
