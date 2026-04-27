import { NextRequest, NextResponse } from 'next/server';
import { hasDatabase, schema } from '@/lib/db';
import { withSystemAdminApp, withTenantApp } from '@/lib/db/with-tenant';
import { eq } from 'drizzle-orm';
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
 *
 * Pattern C (resolve-then-pin) — NodeBB doesn't carry our tenant header,
 * so we resolve the matching `pod` by its `nodebbCategoryId` under
 * platform_system, read its `tenantId`, then pin all writes via
 * withTenantApp (D-7).
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

        // Cross-tenant lookup: find the pod owning this NodeBB category id.
        const pod = await withSystemAdminApp(async (tx) => {
          const [row] = await tx
            .select()
            .from(schema.pod)
            .where(eq(schema.pod.nodebbCategoryId, categoryId));
          return row;
        });

        if (!pod) {
          // No matching pod => no tenant to attribute the event to.
          // `forum_analytics_event.tenant_id` is NOT NULL post-B-009, so we
          // can't insert an orphan analytics row. Log + drop instead. Audit
          // follow-up B-009-P9: decide whether NodeBB should reject events
          // for un-mapped categories at the edge, or whether we want a
          // platform-level "unattached forum events" surface.
          logger.warn('NodeBB webhook: no pod for category, dropping analytics insert', {
            categoryId,
            event,
            tid,
          });
          break;
        }

        // All subsequent writes are pinned to the pod's tenant.
        await withTenantApp({ tenantId: pod.tenantId }, async (tx) => {
          // Log forum analytics
          await tx.insert(schema.forumAnalyticsEvent).values({
            id: generateId('fae'),
            eventType: event === 'action:topic.post' ? 'topic_created' : 'post_created',
            podId: pod.id,
            nodebbCategoryId: categoryId,
            metadata: { tid, contentLength: content.length },
          });

          // Update pod member activity (if we can identify the user)
          // TODO: Map NodeBB uid to platform userId via SSO
          // For now, log the activity at the pod level
          await tx.insert(schema.podActivity).values({
            id: generateId('pa'),
            podId: pod.id,
            eventType: 'post_created',
            metadata: {
              nodebbUsername: data?.user?.username,
              tid,
              contentPreview: content.slice(0, 200),
            },
          });
        });

        // Trigger persona response synchronously before returning.
        // setTimeout does not survive after a serverless function returns.
        // personaService runs outside the tenant tx — it has its own DB
        // wiring; threading the tenant through it is tracked separately
        // and out of scope for this refactor.
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
