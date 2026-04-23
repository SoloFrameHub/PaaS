/**
 * AI-powered content moderation for the community forum.
 *
 * Pre-screens user-submitted content before it reaches Flarum.
 * Mental-health-aware: distinguishes recovery discussion from harmful promotion.
 */

import { createHash } from 'crypto';
import { z } from 'zod';
import { aiClient, hasAIKey } from './client';
import { resolveModel, logTokenUsage } from './models';
import { logger } from '@/lib/logger';
import { getCache, setCache } from '@/lib/redis';
import type { ModerationResult } from '@/types/forum';

// Zod schema for strict AI output validation
const ModerationResultSchema = z.object({
  riskLevel: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  flaggedCategories: z.array(
    z.enum(['self-harm', 'violence', 'harassment', 'misinformation', 'spam', 'crisis-signals'])
  ),
  reasoning: z.string(),
  crisisResourcesNeeded: z.boolean(),
});

const SYSTEM_PROMPT = `You are a content moderator for a mental health education platform's community forum.

Your job is to assess user-submitted content for safety. This platform serves people discussing anxiety, depression, trauma, self-harm recovery, and other mental health topics.

IMPORTANT CONTEXT:
- Users often share personal experiences with self-harm, suicidal thoughts, or trauma as part of their RECOVERY journey. This is acceptable and therapeutic.
- Distinguish between someone DISCUSSING their struggles (allowed) vs. PROMOTING or INSTRUCTING harmful behavior (not allowed).
- Peer support language like "I've been there" or "I used to cut" in a recovery context is Level 0-1, NOT Level 2-3.

Assess the content and return a JSON object with these fields:
- riskLevel: 0 (safe), 1 (sensitive but ok), 2 (concerning - needs review), 3 (severe - block immediately)
- flaggedCategories: array of applicable categories: "self-harm", "violence", "harassment", "misinformation", "spam", "crisis-signals"
- reasoning: brief explanation (1-2 sentences)
- crisisResourcesNeeded: true if the person appears to be in active crisis and should see hotline info

Risk level guidelines:
- Level 0: General discussion, questions, support, wellness tips
- Level 1: Mentions of personal mental health struggles in recovery context, mild language
- Level 2: Graphic descriptions of self-harm methods, bullying/targeting other users, medical misinformation that could cause harm
- Level 3: Active suicidal intent with plan, instructions for self-harm, threats of violence, content encouraging others to harm themselves

Respond with ONLY the JSON object, no markdown fences or extra text.`;

const FALLBACK_SAFE: ModerationResult = {
  riskLevel: 0,
  flaggedCategories: [],
  reasoning: 'Moderation unavailable — defaulting to allow.',
  crisisResourcesNeeded: false,
};

function moderationCacheKey(text: string): string {
  const hash = createHash('sha256').update(text.slice(0, 2000)).digest('hex');
  return `mod:v1:${hash}`;
}

export async function moderateContent(text: string): Promise<ModerationResult> {
  if (!hasAIKey) {
    logger.warn('forum_moderation_skip', { reason: 'no_ai_key' });
    return FALLBACK_SAFE;
  }

  // Check cache — same text gets same safety classification
  const cacheKey = moderationCacheKey(text);
  const cached = await getCache<ModerationResult>(cacheKey);
  if (cached) {
    logger.info('forum_moderation_cache_hit', { riskLevel: cached.riskLevel });
    return cached;
  }

  try {
    const model = resolveModel('forum-moderation');
    const response = await aiClient.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text.slice(0, 2000) },
      ],
      temperature: 0,
      max_tokens: 200,
    });

    logTokenUsage('forum-moderation', model, response.usage ?? undefined);

    const raw = response.choices[0]?.message?.content?.trim();
    if (!raw) {
      logger.warn('forum_moderation_empty_response');
      return FALLBACK_SAFE;
    }

    // Parse and validate with Zod
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      logger.warn('forum_moderation_json_parse_error', { error: parseError, raw: raw.slice(0, 200) });
      return FALLBACK_SAFE;
    }

    // Validate schema with Zod
    const validation = ModerationResultSchema.safeParse(parsed);
    if (!validation.success) {
      logger.warn('forum_moderation_validation_failed', {
        errors: validation.error.errors,
        raw: raw.slice(0, 200)
      });
      return FALLBACK_SAFE;
    }

    const result: ModerationResult = validation.data;

    // Cache for 10 minutes — same text doesn't need re-moderation
    await setCache(cacheKey, result, 600);

    return result;
  } catch (error) {
    logger.error('forum_moderation_error', { error });
    // Fail open — don't block users if moderation service is down
    return FALLBACK_SAFE;
  }
}
