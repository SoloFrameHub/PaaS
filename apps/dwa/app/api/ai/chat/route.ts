import { NextRequest, NextResponse } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { openaiCoachingReplyStream } from '@/lib/ai/openai-coaching';
import { profileContextService } from '@/lib/services/profileContextService';
import { withAuth } from '@/lib/api/with-auth';
import { validateBody } from '@/lib/api/response-utils';
import { chatSchema } from '@/lib/validations/ai';
import { logger } from '@/lib/logger';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';
import { getCache, setCache } from '@/lib/redis';
import type { WellnessProfile } from '@/types/wellness-profile';

/**
 * Builds the stable portion of the wellness context string for AI coach.
 * Dynamic context (current page/course) is layered on top in the route handler.
 */
function buildWellnessContextString(profile: WellnessProfile | null) {
    if (!profile) {
        return 'User context not available. Provide general wellness support.';
    }

    try {
        return buildContextFromProfile(profile);
    } catch (err) {
        // Never let a malformed profile crash the AI endpoint
        logger.error('Failed to build wellness context', { error: err instanceof Error ? err.message : err });
        return 'User context not available. Provide general wellness support.';
    }
}

function buildContextFromProfile(profile: WellnessProfile): string {
    const safeContext = profileContextService.getSafeContext(profile);
    const parts: string[] = [];

    // Primary wellness concerns
    const symptoms = safeContext.primarySymptoms ?? [];
    if (symptoms.length > 0) {
        const primary = symptoms.filter(s => s.isPrimary);
        const secondary = symptoms.filter(s => !s.isPrimary);

        if (primary.length > 0) {
            parts.push(`Primary concerns: ${primary.map(s => `${s.category} (${s.severity})`).join(', ')}`);
        }
        if (secondary.length > 0) {
            parts.push(`Additional areas: ${secondary.map(s => s.category).join(', ')}`);
        }
    }

    // Wellness goals
    const goals = safeContext.wellnessGoals ?? [];
    if (goals.length > 0) {
        parts.push(`Goals: ${goals.join(', ')}`);
    }

    // Learning preferences
    if (safeContext.learningStyle) {
        parts.push(`Learning style: ${safeContext.learningStyle}`);
    }
    if (safeContext.timeCommitment) {
        parts.push(`Available time: ${safeContext.timeCommitment}`);
    }

    // Life context
    const lifeContextParts: string[] = [];
    if (safeContext.ageRange) lifeContextParts.push(safeContext.ageRange);
    if (safeContext.lifeStage) lifeContextParts.push(safeContext.lifeStage);
    if (safeContext.livingSituation) lifeContextParts.push(`lives ${safeContext.livingSituation.replace('with-', 'with ')}`);
    if (lifeContextParts.length > 0) {
        parts.push(`Life context: ${lifeContextParts.join(', ')}`);
    }

    // Support network
    const supportParts: string[] = [];
    if (safeContext.supportNetwork) supportParts.push(`${safeContext.supportNetwork} support network`);
    if (safeContext.hasTrustedPerson !== undefined) supportParts.push(safeContext.hasTrustedPerson ? 'has trusted person' : 'no trusted person');
    if (safeContext.groupPreference) supportParts.push(safeContext.groupPreference.replace(/-/g, ' '));
    if (supportParts.length > 0) {
        parts.push(`Support: ${supportParts.join(', ')}`);
    }

    // Coping strategies & experience
    if (safeContext.currentCopingStrategies?.length) {
        parts.push(`Current coping: ${safeContext.currentCopingStrategies.join(', ')}`);
    }
    if (safeContext.unhealthyCopingToChange?.length) {
        parts.push(`Wants to change: ${safeContext.unhealthyCopingToChange.join(', ')}`);
    }
    if (safeContext.therapyHistory) {
        parts.push(`Therapy: ${safeContext.therapyHistory.replace(/-/g, ' ')}`);
    }

    // Triggers & patterns
    if (safeContext.knownTriggers?.length) {
        parts.push(`Triggers: ${safeContext.knownTriggers.join(', ')}`);
    }
    if (safeContext.worstTimeOfDay) {
        parts.push(`Worst time: ${safeContext.worstTimeOfDay}`);
    }

    // User's own words (highest-value personalization context)
    if (safeContext.goodDayDescription) {
        parts.push(`What a good day looks like: "${safeContext.goodDayDescription}"`);
    }
    if (safeContext.biggestChallenge) {
        parts.push(`Biggest challenge: "${safeContext.biggestChallenge}"`);
    }
    if (safeContext.hopedSupportDescription) {
        parts.push(`Hoped-for support: "${safeContext.hopedSupportDescription}"`);
    }
    if (safeContext.personalPatterns) {
        parts.push(`Personal patterns noticed: "${safeContext.personalPatterns}"`);
    }
    if (safeContext.anythingElse) {
        parts.push(`Additional context: "${safeContext.anythingElse}"`);
    }

    // Progress context
    if (safeContext.progress.completedCourseCount > 0) {
        parts.push(`Progress: ${safeContext.progress.completedCourseCount} courses completed, ${safeContext.progress.xpTotal} XP earned`);
    }
    if (safeContext.progress.streakDays > 0) {
        parts.push(`Current streak: ${safeContext.progress.streakDays} days`);
    }
    if (safeContext.progress.currentCourse) {
        parts.push(`Currently working on: ${safeContext.progress.currentCourse}`);
    }

    // Recommended courses
    if (safeContext.assessmentSummary?.recommendedCourses?.length) {
        parts.push(`Recommended courses: ${safeContext.assessmentSummary.recommendedCourses.join(', ')}`);
    }

    // Detect incomplete extended profile and note missing areas
    const hasExtendedProfile = !!(
        safeContext.ageRange ||
        safeContext.currentCopingStrategies?.length ||
        safeContext.goodDayDescription
    );

    if (!hasExtendedProfile && symptoms.length > 0) {
        const missingAreas: string[] = [];
        if (!safeContext.ageRange && !safeContext.lifeStage) missingAreas.push('life context');
        if (!safeContext.currentCopingStrategies?.length) missingAreas.push('coping strategies');
        if (!safeContext.knownTriggers?.length) missingAreas.push('triggers');
        if (!safeContext.goodDayDescription && !safeContext.biggestChallenge) missingAreas.push('personal reflections');

        parts.push(
            `\nNote: This user has not completed their extended wellness profile (missing: ${missingAreas.join(', ')}). ` +
            `If it comes up naturally in conversation, you may gently mention that sharing more about themselves ` +
            `in their profile settings can help you provide more personalized guidance. ` +
            `Do NOT push this — only mention it once and only if relevant to the conversation.`
        );
    }

    return parts.length > 0
        ? `User Wellness Profile:\n${parts.join('\n')}`
        : 'New user - no wellness profile data yet.';
}

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const { message, history = [], context } = await validateBody(request, chatSchema);

    const validHistory = history
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-20) as { role: 'user' | 'assistant'; content: string }[];

    try {
        const { limited, remaining, reset } = await isRateLimited(userId, AI_RATE_LIMIT, 'ai');
        if (limited) {
            return NextResponse.json(
                { error: 'You are sending messages too quickly. Please wait a moment.' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
                        'X-RateLimit-Limit': String(AI_RATE_LIMIT.limit),
                        'X-RateLimit-Remaining': String(remaining),
                        'X-RateLimit-Reset': String(reset),
                    },
                }
            );
        }
        // Stable profile context is cached (changes only when profile updates)
        // Dynamic context (current page/course) is always built fresh
        const profileCacheKey = `ai:ctx:${userId}`;
        let stableContext = await getCache<string>(profileCacheKey);
        if (!stableContext) {
            const profile = await profileService.getProfile(userId);
            stableContext = buildWellnessContextString(profile ?? null);
            // Cache for 5 min — invalidated sooner if profile updates
            await setCache(profileCacheKey, stableContext, 300);
        }

        // Layer fresh dynamic context (current page/course) on top
        const dynamicParts: string[] = [];
        if (context?.courseId) {
            const parts = [`Currently viewing: Course ${context.courseId}`];
            if (context.lessonId) parts.push(`Lesson ${context.lessonId}`);
            if (context.sectionId) parts.push(`Section ${context.sectionId}`);
            dynamicParts.push(parts.join(', '));
        } else if (context?.pageContext) {
            dynamicParts.push(`Current page: ${context.pageContext}`);
        }

        const contextString = dynamicParts.length > 0
            ? `${stableContext}\n${dynamicParts.join('\n')}`
            : stableContext;
        const { stream, crisisDetected, crisisLevel } = await openaiCoachingReplyStream({
            message,
            history: validHistory,
            contextString,
        });

        // Log crisis detection for monitoring (no PII)
        if (crisisDetected) {
            logger.warn('Crisis detected in wellness coach', { userId, crisisLevel });
        }

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'X-Crisis-Detected': String(crisisDetected),
                'X-Crisis-Level': crisisLevel,
            },
        });
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        const isGeoBlock = errorMsg.includes('Access Restricted') || errorMsg.includes('not in service area');
        const isAuthError = errorMsg.includes('401') || errorMsg.includes('Incorrect API key') || errorMsg.includes('invalid_api_key');
        const isNoKey = errorMsg.includes('No AI API key configured');
        const isModelError = errorMsg.includes('404') || errorMsg.includes('model_not_found') || errorMsg.includes('does not exist');
        const isQuota = errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('insufficient_quota') || errorMsg.includes('rate_limit');

        logger.error('Wellness Coach Error', {
            error: errorMsg,
            userId,
            provider: process.env.OPENROUTER_API_KEY ? 'openrouter' : 'openai-direct',
            hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
            hasOpenAiKey: !!process.env.OPENAI_API_KEY,
            isGeoBlock,
            isAuthError,
            isNoKey,
            isModelError,
            isQuota,
        });

        const userMessage = isNoKey
            ? 'AI service is not configured. Please set up an API key in environment variables.'
            : isGeoBlock
                ? 'The AI service is not available in this server region. Please contact support.'
                : isAuthError
                    ? 'AI service API key is invalid or expired. Please update the API key.'
                    : isModelError
                        ? 'AI model not found. Please check model configuration.'
                        : isQuota
                            ? 'AI service rate limit or quota exceeded. Please try again later.'
                            : `Wellness coach error: ${errorMsg.slice(0, 200)}`;

        return NextResponse.json(
            { error: userMessage },
            { status: 503 }
        );
    }
});
