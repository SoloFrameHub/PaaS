import { NextRequest, NextResponse } from 'next/server';
import { getDb, hasDatabase, schema } from '@/lib/db';
import { eq, and, sql } from 'drizzle-orm';
import { personaService } from '@/lib/services/personaService';
import { FORUM_BOTS } from '@/lib/data/forum-bots';
import { logger } from '@/lib/logger';
import { timingSafeEqual } from 'crypto';

const WEBHOOK_SECRET = process.env.NODEBB_WEBHOOK_SECRET;

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * POST /api/webhooks/nodebb
 * Receives webhook events from NodeBB.
 * On new human post in a pod category:
 *   1. Logs forum analytics event
 *   2. Updates pod member activity
 *   3. Optionally triggers a persona response
 */
export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get('x-nodebb-webhook-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!WEBHOOK_SECRET || !secret || secret.length !== WEBHOOK_SECRET.length ||
      !timingSafeEqual(Buffer.from(secret), Buffer.from(WEBHOOK_SECRET))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasDatabase()) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
  }

  try {
    const payload = await request.json();
    const { event, data } = payload;

    // Skip bot posts
    const botUsernames = FORUM_BOTS.map((b) => b.username);
    if (data?.user?.username && botUsernames.includes(data.user.username)) {
      return NextResponse.json({ received: true, action: 'skipped_bot' });
    }

    switch (event) {
      case 'action:post.save':
      case 'action:topic.post': {
        const categoryId = data?.cid || data?.category?.cid;
        const tid = data?.tid;
        const content = data?.content || '';

        // Find the pod by NodeBB category ID
        const [pod] = await db.select()
          .from(schema.pod)
          .where(eq(schema.pod.nodebbCategoryId, categoryId));

        if (!pod) {
          // Not a pod category, just log analytics
          await db.insert(schema.forumAnalyticsEvent).values({
            id: generateId('fae'),
            eventType: event === 'action:topic.post' ? 'topic_created' : 'post_created',
            nodebbCategoryId: categoryId,
            metadata: { tid },
          });
          break;
        }

        // Log forum analytics
        await db.insert(schema.forumAnalyticsEvent).values({
          id: generateId('fae'),
          eventType: event === 'action:topic.post' ? 'topic_created' : 'post_created',
          podId: pod.id,
          nodebbCategoryId: categoryId,
          metadata: { tid, contentLength: content.length },
        });

        // Update pod member activity (if we can identify the user)
        // TODO: Map NodeBB uid to platform userId via SSO
        // For now, log the activity at the pod level
        await db.insert(schema.podActivity).values({
          id: generateId('pa'),
          podId: pod.id,
          eventType: 'post_created',
          metadata: {
            nodebbUsername: data?.user?.username,
            tid,
            contentPreview: content.slice(0, 200),
          },
        });

        // Trigger persona response synchronously before returning.
        // setTimeout does not survive after a serverless function returns.
        if (tid) {
          try {
            const personaId = await personaService.selectRespondingPersona(pod.id, content);
            if (personaId) {
              await personaService.generatePersonaResponse({
                personaId,
                podId: pod.id,
                threadId: tid,
              });
            }
          } catch (err) {
            logger.error('Persona response failed', { podId: pod.id, err });
          }
        }

        break;
      }

      default:
        logger.info('Unhandled NodeBB webhook event', { event });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('NodeBB webhook processing failed', { error });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 500 },
    );
  }
}
