/**
 * Milestone Service
 * Posts congratulatory messages in pod categories when users achieve milestones.
 * Milestones: course completion, roleplay score achievements, etc.
 */

import { getDb, hasDatabase, schema } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { nodebbClient } from '@/lib/nodebb/client';
import { podService } from './podService';
import { logger } from '@/lib/logger';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getFacilitatorUid(): number {
  const uid = process.env.FACILITATOR_BOT_UID;
  if (!uid) throw new Error('FACILITATOR_BOT_UID not configured');
  return parseInt(uid, 10);
}

// Milestone celebration templates
const MILESTONE_TEMPLATES: Record<string, (name: string, details: string) => string> = {
  course_completion: (name, details) =>
    `Milestone Alert!\n\n${name} just completed ${details}!\n\nThis is a big deal - every course completed is another tool in your sales arsenal. Drop a congrats and ask ${name} what their biggest takeaway was.`,

  roleplay_score: (name, details) =>
    `${name} just scored ${details} on a sales roleplay session!\n\nThat's the kind of practice that translates directly into real conversations. ${name}, what felt different about this one compared to earlier attempts?`,

  first_deal: (name, details) =>
    `HUGE milestone - ${name} just closed their first deal! ${details}\n\nThis is what all the practice, the frameworks, and the late nights lead to. ${name}, we want the full story - how did it happen?`,

  revenue_milestone: (name, details) =>
    `${name} just hit a revenue milestone: ${details}!\n\nConsistent effort compounds. ${name}, looking back at where you started - what was the one thing that made the biggest difference?`,
};

export class MilestoneService {
  private getDb() {
    if (!hasDatabase()) throw new Error('Database not available');
    const db = getDb();
    if (!db) throw new Error('Database connection failed');
    return db;
  }

  /**
   * Post a congratulatory message in the user's pod.
   */
  async celebrateMilestone(userId: string, milestone: {
    type: 'course_completion' | 'roleplay_score' | 'first_deal' | 'revenue_milestone';
    details: string;
  }): Promise<void> {
    const db = this.getDb();

    // Get user's active pods
    const pods = await podService.getPodsByUser(userId);
    if (pods.length === 0) {
      logger.info('No pod found for milestone celebration', { userId });
      return;
    }

    // Get user name from profile
    const [profile] = await db.select()
      .from(schema.profile)
      .where(eq(schema.profile.userId, userId));
    const profileData = (profile?.data || {}) as Record<string, any>;
    const userName = profileData.name || 'A pod member';

    // Generate celebration message
    const template = MILESTONE_TEMPLATES[milestone.type];
    if (!template) {
      logger.warn('Unknown milestone type', { type: milestone.type });
      return;
    }

    const content = template(userName, milestone.details);

    // Post to each of the user's pods
    for (const pod of pods) {
      if (!pod.nodebbCategoryId) continue;

      try {
        // Find the "Wins & Progress" thread or create one
        await nodebbClient.createTopic({
          cid: pod.nodebbCategoryId,
          title: `${userName} - ${milestone.type.replace(/_/g, ' ')}`,
          content,
          _uid: getFacilitatorUid(),
        });

        // Log analytics event
        await db.insert(schema.forumAnalyticsEvent).values({
          id: generateId('fae'),
          eventType: 'milestone_posted',
          userId,
          podId: pod.id,
          nodebbCategoryId: pod.nodebbCategoryId,
          metadata: { milestoneType: milestone.type, details: milestone.details },
        });

        // Log pod activity
        await db.insert(schema.podActivity).values({
          id: generateId('pa'),
          podId: pod.id,
          userId,
          eventType: 'milestone_achieved',
          metadata: { type: milestone.type, details: milestone.details },
        });

        logger.info('Milestone celebrated', { userId, podId: pod.id, type: milestone.type });
      } catch (err) {
        logger.error('Failed to post milestone celebration', { userId, podId: pod.id, err });
      }
    }
  }

  /**
   * Check if an event triggers a milestone celebration.
   * Called after lesson completion, roleplay evaluation, profile updates, etc.
   */
  async checkMilestoneTriggers(userId: string, event: {
    type: string;
    data: Record<string, unknown>;
  }): Promise<void> {
    switch (event.type) {
      case 'lesson_completed': {
        // Check if all lessons in a course are completed
        const courseId = event.data.courseId as string;
        const totalLessons = event.data.totalLessons as number;
        const completedLessons = event.data.completedLessons as number;

        if (completedLessons >= totalLessons) {
          const courseTitle = (event.data.courseTitle as string) || `Course ${courseId}`;
          await this.celebrateMilestone(userId, {
            type: 'course_completion',
            details: courseTitle,
          });
        }
        break;
      }

      case 'roleplay_evaluated': {
        const score = event.data.score as number;
        if (score >= 80) {
          await this.celebrateMilestone(userId, {
            type: 'roleplay_score',
            details: `${score}/100`,
          });
        }
        break;
      }

      default:
        // Unknown event type, ignore
        break;
    }
  }
}

export const milestoneService = new MilestoneService();
