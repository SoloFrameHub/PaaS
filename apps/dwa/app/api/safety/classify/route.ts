/**
 * POST /api/safety/classify
 *
 * Called by the client when a user submits text that needs distress screening:
 *   - Journal / reflection entry saves
 *   - Assessment free-text responses
 *   - Check-in prompts
 *
 * Flow:
 *   1. Validate request
 *   2. Call Python classifier service
 *   3. Fire-and-forget audit log to distress_event table (never stores text)
 *   4. If crisis level + user has provider → queue provider alert
 *   5. Return classification to client
 *
 * The client decides what to show (crisis modal vs gentle prompt) based on
 * the response. Text is never forwarded to the database — only the result.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api/with-auth';
import { checkDistress } from '@/lib/safety/checkDistress';
import { getDb } from '@/lib/db';
import { distressEvent } from '@/lib/db/schema';
import { logger } from '@/lib/logger';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

const classifySchema = z.object({
  text:      z.string().min(1).max(2000),
  context:   z.enum(['journal', 'assessment', 'forum', 'checkin']),
  courseId:  z.string().optional(),
  lessonId:  z.string().optional(),
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  // Finding 12: Rate limit distress classification (cost-sensitive: DistilBERT inference + DB insert)
  const rateLimitResult = await isRateLimited(userId, AI_RATE_LIMIT, 'ai');
  if (rateLimitResult.limited) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(rateLimitResult.reset),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = classifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { text, context, courseId, lessonId } = parsed.data;

  // Call the Python classifier — fails safe (returns 'none') if service is down
  const result = await checkDistress(text, { context, userId, courseId, lessonId });

  // Only log events where distress was actually detected — skip 'none' to avoid noise
  if (result.level !== 'none') {
    logDistressEvent({ userId, result, context, courseId, lessonId });
  }

  // Log crisis events always for HIPAA audit trail, regardless of level
  if (result.crisis) {
    logger.warn('distress_crisis_detected', {
      userId,
      context,
      confidence: result.confidence,
      courseId,
      lessonId,
      // Never log the text itself
    });
  }

  return NextResponse.json(result);
});

/**
 * Fire-and-forget database write.
 * Follows the same pattern as logModerationDecision in with-moderation.ts.
 * Does NOT store text — only the classification metadata.
 */
function logDistressEvent({
  userId,
  result,
  context,
  courseId,
  lessonId,
}: {
  userId: string;
  result: { level: string; confidence: number; crisis: boolean };
  context: string;
  courseId?: string;
  lessonId?: string;
}) {
  const db = getDb();
  if (!db) return;

  db.insert(distressEvent)
    .values({
      userId,
      level:           result.level,
      confidence:      result.confidence,
      context,
      courseId:        courseId ?? null,
      lessonId:        lessonId ?? null,
      providerAlerted: false,
    })
    .execute()
    .catch((err) => logger.error('distress_event_insert_error', { error: err }));
}
