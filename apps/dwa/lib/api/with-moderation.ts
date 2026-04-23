/**
 * Forum content moderation middleware.
 *
 * Wraps an authenticated handler to pre-screen content with AI moderation
 * before the request reaches Flarum. Follows the same HOF pattern as with-auth.ts.
 */

import { NextRequest, NextResponse } from 'next/server';
import type { UserContext, AuthenticatedHandler } from './with-auth';
import { moderateContent } from '@/lib/ai/forum-moderation';
import { logger } from '@/lib/logger';
import { getDb } from '@/lib/db';
import { moderationLog, distressEvent } from '@/lib/db/schema';
import { maia } from '@/lib/ai/maia-client';

const CRISIS_MESSAGE =
  'If you or someone you know is in crisis, please reach out for help:\n' +
  '- 988 Suicide & Crisis Lifeline: call or text 988\n' +
  '- Crisis Text Line: text HOME to 741741\n' +
  '- Emergency: call 911';

interface ModerationOptions {
  contentType: 'discussion' | 'post';
  extractText: (body: Record<string, unknown>) => string;
}

export function withModeration(
  options: ModerationOptions,
  handler: AuthenticatedHandler,
): AuthenticatedHandler {
  return async (request: NextRequest, user: UserContext, context: any) => {
    // Read the body once; we'll rebuild the request for the downstream handler
    let bodyText: string;
    try {
      bodyText = await request.text();
    } catch {
      return handler(request, user, context);
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(bodyText);
    } catch {
      // Let the handler deal with malformed JSON via its own validateBody
      const freshReq = new NextRequest(request.url, {
        method: request.method,
        headers: request.headers,
        body: bodyText,
      });
      return handler(freshReq, user, context);
    }

    const text = options.extractText(body);
    if (!text) {
      const freshReq = new NextRequest(request.url, {
        method: request.method,
        headers: request.headers,
        body: bodyText,
      });
      return handler(freshReq, user, context);
    }

    const result = await moderateContent(text);

    // Log all moderation decisions asynchronously
    logModerationDecision(user.userId, options.contentType, text, result);

    // Run distress classification in parallel (Finding 13)
    runDistressClassification(user.userId, options.contentType, text);

    if (result.riskLevel >= 2) {
      const message =
        result.riskLevel === 3
          ? 'Your post has been blocked because it may contain content that violates our community guidelines. ' +
            CRISIS_MESSAGE
          : 'Your post may contain sensitive content that could be harmful. ' +
            'Please review our community guidelines and consider rephrasing.';

      logger.warn('forum_moderation_blocked', {
        userId: user.userId,
        contentType: options.contentType,
        riskLevel: result.riskLevel,
        categories: result.flaggedCategories,
      });

      return NextResponse.json(
        {
          error: {
            message,
            code: 'CONTENT_MODERATION',
            details: {
              riskLevel: result.riskLevel,
              categories: result.flaggedCategories,
              crisisResources: result.crisisResourcesNeeded ? CRISIS_MESSAGE : undefined,
            },
          },
        },
        { status: 422 },
      );
    }

    // Rebuild the request with the body so downstream validateBody() can read it
    const freshReq = new NextRequest(request.url, {
      method: request.method,
      headers: request.headers,
      body: bodyText,
    });
    return handler(freshReq, user, context);
  };
}

function logModerationDecision(
  userId: string,
  contentType: 'discussion' | 'post',
  text: string,
  result: Awaited<ReturnType<typeof moderateContent>>,
) {
  const action = result.riskLevel >= 2 ? 'blocked' : result.riskLevel === 1 ? 'flagged' : 'allowed';

  // Fire-and-forget DB insert — don't block the response
  const db = getDb();
  if (db) {
    db.insert(moderationLog)
      .values({
        userId,
        contentType,
        contentSnippet: text.slice(0, 500),
        riskLevel: result.riskLevel,
        categories: result.flaggedCategories,
        action,
        reasoning: result.reasoning,
      })
      .execute()
      .catch((err) => logger.error('moderation_log_insert_error', { error: err }));
  }
}

/**
 * Run distress classification on forum content (Finding 13).
 * Fire-and-forget — never blocks the response.
 */
function runDistressClassification(
  userId: string,
  contentType: 'discussion' | 'post',
  text: string,
) {
  maia
    .distress(text)
    .then((distressResult) => {
      if (distressResult.level !== 'none') {
        const db = getDb();
        if (db) {
          db.insert(distressEvent)
            .values({
              userId,
              level: distressResult.level,
              confidence: distressResult.confidence,
              context: contentType === 'discussion' ? 'forum-discussion' : 'forum-post',
              providerAlerted: false,
            })
            .execute()
            .catch((err) =>
              logger.error('distress_event_insert_error', { context: 'forum', error: err })
            );
        }
      }
    })
    .catch((err) => logger.error('maia_distress_error', { context: 'forum', error: err }));
}
