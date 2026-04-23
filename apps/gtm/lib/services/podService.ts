/**
 * Pod Service
 * Manages pod lifecycle: creation, membership, health monitoring, and merging.
 */

import { getDb, hasDatabase, schema } from '@/lib/db';
import { eq, and, sql, gte, desc } from 'drizzle-orm';
import { forumStructureService } from './forumStructureService';
import { logger } from '@/lib/logger';
import { NotFoundError, ValidationError } from '@/lib/api/errors';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Parent "Pods" category CID on NodeBB - set after forum-setup
function getPodsParentCid(): number {
  const cid = process.env.NODEBB_PODS_PARENT_CID;
  if (!cid) throw new Error('NODEBB_PODS_PARENT_CID not configured');
  const parsed = parseInt(cid, 10);
  if (isNaN(parsed)) throw new Error('NODEBB_PODS_PARENT_CID must be a valid number');
  return parsed;
}

function getFacilitatorUid(): number {
  const uid = process.env.FACILITATOR_BOT_UID;
  if (!uid) throw new Error('FACILITATOR_BOT_UID not configured');
  const parsed = parseInt(uid, 10);
  if (isNaN(parsed)) throw new Error('FACILITATOR_BOT_UID must be a valid number');
  return parsed;
}

export class PodService {
  private getDb() {
    if (!hasDatabase()) throw new Error('Database not available');
    const db = getDb();
    if (!db) throw new Error('Database connection failed');
    return db;
  }

  // ── CRUD ───────────────────────────────────────────────────────────

  async createPod(data: {
    name: string;
    curriculumStage: string;
    dealSizeTier?: string;
    maxMembers?: number;
  }): Promise<typeof schema.pod.$inferSelect> {
    const db = this.getDb();
    const id = generateId('pod');
    const slug = slugify(data.name);

    // Create NodeBB private category
    let nodebbCategoryId: number | null = null;
    try {
      nodebbCategoryId = await forumStructureService.createPodCategory(
        data.name,
        getPodsParentCid(),
      );
      // Create initial threads
      await forumStructureService.createPodSubThreads(nodebbCategoryId, getFacilitatorUid());
    } catch (err) {
      logger.error('Failed to create NodeBB pod category', { err });
    }

    const [pod] = await db.insert(schema.pod).values({
      id,
      name: data.name,
      slug,
      status: 'active',
      curriculumStage: data.curriculumStage,
      dealSizeTier: data.dealSizeTier ?? null,
      nodebbCategoryId,
      maxMembers: data.maxMembers ?? 6,
      currentMemberCount: 0,
      weekNumber: 1,
    }).returning();

    // Log activity
    await db.insert(schema.podActivity).values({
      id: generateId('pa'),
      podId: id,
      eventType: 'pod_created',
      metadata: { name: data.name, curriculumStage: data.curriculumStage },
    });

    logger.info('Pod created', { podId: id, name: data.name });
    return pod;
  }

  async getPod(podId: string) {
    const db = this.getDb();
    const [pod] = await db.select().from(schema.pod).where(eq(schema.pod.id, podId));
    return pod ?? null;
  }

  async getPodsByUser(userId: string) {
    const db = this.getDb();
    const results = await db
      .select({ pod: schema.pod })
      .from(schema.podMember)
      .innerJoin(schema.pod, eq(schema.pod.id, schema.podMember.podId))
      .where(and(
        eq(schema.podMember.userId, userId),
        eq(schema.podMember.status, 'active'),
      ));
    return results.map((r) => r.pod);
  }

  async updatePod(podId: string, updates: Partial<{
    name: string;
    status: string;
    weekNumber: number;
  }>): Promise<void> {
    const db = this.getDb();
    await db.update(schema.pod).set({
      ...updates,
      updatedAt: new Date(),
    }).where(eq(schema.pod.id, podId));
  }

  async deletePod(podId: string): Promise<void> {
    const db = this.getDb();
    const pod = await this.getPod(podId);
    if (!pod) throw new NotFoundError('Pod not found');

    // Delete NodeBB category
    if (pod.nodebbCategoryId) {
      try {
        await forumStructureService.revokePodAccess(pod.nodebbCategoryId, 0); // cleanup
      } catch {
        // NodeBB category may already be gone
      }
    }

    await db.delete(schema.pod).where(eq(schema.pod.id, podId));
    logger.info('Pod deleted', { podId });
  }

  // ── Membership ─────────────────────────────────────────────────────

  async addMemberToPod(podId: string, userId: string): Promise<void> {
    const db = this.getDb();
    const pod = await this.getPod(podId);
    if (!pod) throw new NotFoundError('Pod not found');

    // Check if this user is already an active member (avoids double-counting on re-activate)
    const [existingMember] = await db.select()
      .from(schema.podMember)
      .where(and(
        eq(schema.podMember.podId, podId),
        eq(schema.podMember.userId, userId),
        eq(schema.podMember.status, 'active'),
      ));

    if (existingMember) {
      // Already active — no-op
      return;
    }

    // Check capacity using actual active member count (not cached counter)
    const [{ count: activeMemberCount }] = await db.select({ count: sql<number>`count(*)` })
      .from(schema.podMember)
      .where(and(
        eq(schema.podMember.podId, podId),
        eq(schema.podMember.status, 'active'),
      ));

    if (Number(activeMemberCount) >= pod.maxMembers) {
      throw new ValidationError('Pod is full');
    }

    // Insert or reactivate pod member
    await db.insert(schema.podMember).values({
      id: generateId('pm'),
      podId,
      userId,
      status: 'active',
    }).onConflictDoUpdate({
      target: [schema.podMember.podId, schema.podMember.userId],
      set: { status: 'active', joinedAt: new Date() },
    });

    // Sync member count from actual active members (avoids drift)
    await db.update(schema.pod).set({
      currentMemberCount: sql`(SELECT count(*) FROM pod_member WHERE pod_id = ${podId} AND status = 'active')`,
      updatedAt: new Date(),
    }).where(eq(schema.pod.id, podId));

    // Grant NodeBB access (user's NodeBB UID may differ from platform userId)
    // For now we use a numeric hash - SSO integration will map these properly
    if (pod.nodebbCategoryId) {
      try {
        // TODO: resolve platform userId -> NodeBB uid via SSO mapping
        // For now, this is a placeholder that will work once SSO is configured
        logger.info('Pod NodeBB access grant pending SSO mapping', { podId, userId });
      } catch (err) {
        logger.warn('Could not grant NodeBB access', { podId, userId, err });
      }
    }

    // Update matching profile
    await db.update(schema.memberMatchingProfile).set({
      matchedPodId: podId,
    }).where(eq(schema.memberMatchingProfile.userId, userId));

    // Log activity
    await db.insert(schema.podActivity).values({
      id: generateId('pa'),
      podId,
      userId,
      eventType: 'member_joined',
    });

    logger.info('Member added to pod', { podId, userId });
  }

  async removeMemberFromPod(podId: string, userId: string): Promise<void> {
    const db = this.getDb();

    await db.update(schema.podMember).set({
      status: 'removed',
    }).where(and(
      eq(schema.podMember.podId, podId),
      eq(schema.podMember.userId, userId),
    ));

    await db.update(schema.pod).set({
      currentMemberCount: sql`(SELECT count(*) FROM pod_member WHERE pod_id = ${podId} AND status = 'active')`,
      updatedAt: new Date(),
    }).where(eq(schema.pod.id, podId));

    await db.insert(schema.podActivity).values({
      id: generateId('pa'),
      podId,
      userId,
      eventType: 'member_removed',
    });

    logger.info('Member removed from pod', { podId, userId });
  }

  async getPodMembers(podId: string) {
    const db = this.getDb();
    return db.select()
      .from(schema.podMember)
      .where(and(
        eq(schema.podMember.podId, podId),
        eq(schema.podMember.status, 'active'),
      ));
  }

  // ── Health ─────────────────────────────────────────────────────────

  async getPodHealth(podId: string): Promise<{
    memberCount: number;
    activeLast7Days: number;
    totalActivities30Days: number;
    healthScore: number;
    recommendation: string;
  }> {
    const db = this.getDb();
    const pod = await this.getPod(podId);
    if (!pod) throw new NotFoundError('Pod not found');

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const members = await db.select()
      .from(schema.podMember)
      .where(and(
        eq(schema.podMember.podId, podId),
        eq(schema.podMember.status, 'active'),
      ));

    const activeLast7Days = members.filter(
      (m) => m.lastActiveAt && m.lastActiveAt >= sevenDaysAgo,
    ).length;

    const activities = await db.select({ count: sql<number>`count(*)` })
      .from(schema.podActivity)
      .where(and(
        eq(schema.podActivity.podId, podId),
        gte(schema.podActivity.createdAt, thirtyDaysAgo),
      ));

    const totalActivities30Days = Number(activities[0]?.count ?? 0);
    const memberCount = members.length;

    // Health score: weighted combination of activity ratio and member participation
    const activityPerMember = memberCount > 0 ? totalActivities30Days / memberCount : 0;
    const participationRate = memberCount > 0 ? activeLast7Days / memberCount : 0;
    const healthScore = Math.min(100, Math.round(
      (participationRate * 60) + (Math.min(activityPerMember / 10, 1) * 40),
    ));

    let recommendation = 'Healthy';
    if (healthScore < 30) recommendation = 'Critical - consider merging with another pod';
    else if (healthScore < 50) recommendation = 'Low engagement - facilitator nudge recommended';
    else if (healthScore < 70) recommendation = 'Moderate - could benefit from persona activity';

    return { memberCount, activeLast7Days, totalActivities30Days, healthScore, recommendation };
  }

  // ── Merge ──────────────────────────────────────────────────────────

  async mergePods(sourcePodId: string, targetPodId: string): Promise<void> {
    const db = this.getDb();
    const source = await this.getPod(sourcePodId);
    const target = await this.getPod(targetPodId);
    if (!source || !target) throw new NotFoundError('Pod not found');

    // Get active members from source
    const sourceMembers = await this.getPodMembers(sourcePodId);

    // Move each member to target — only remove from source after successful add
    const failedMoves: string[] = [];
    for (const member of sourceMembers) {
      try {
        await this.addMemberToPod(targetPodId, member.userId);
      } catch (err) {
        logger.error('Failed to add member to target during merge', { userId: member.userId, err });
        failedMoves.push(member.userId);
        continue; // Don't remove from source if add failed
      }
      try {
        await this.removeMemberFromPod(sourcePodId, member.userId);
      } catch (err) {
        logger.error('Failed to remove member from source during merge', { userId: member.userId, err });
      }
    }
    if (failedMoves.length > 0) {
      logger.warn('Some members could not be moved during merge', { failedMoves, sourcePodId, targetPodId });
    }

    // Archive source pod
    await this.updatePod(sourcePodId, { status: 'merged' });

    // Log activity on both pods
    const meta = { sourcePodId, targetPodId, membersMoved: sourceMembers.length };
    await db.insert(schema.podActivity).values([
      { id: generateId('pa'), podId: sourcePodId, eventType: 'pod_merged', metadata: meta },
      { id: generateId('pa'), podId: targetPodId, eventType: 'pod_merged', metadata: meta },
    ]);

    logger.info('Pods merged', meta);
  }

  // ── Activity feed ──────────────────────────────────────────────────

  async getRecentActivity(podId: string, limit = 20) {
    const db = this.getDb();
    return db.select()
      .from(schema.podActivity)
      .where(eq(schema.podActivity.podId, podId))
      .orderBy(desc(schema.podActivity.createdAt))
      .limit(limit);
  }
}

export const podService = new PodService();
