import type { WellnessProfile, SymptomCategory, Severity } from '@/types/wellness-profile';

/**
 * Safe context for AI prompts - excludes PII and compresses data
 */
export interface SafeWellnessContext {
    // Anonymous identifier only
    hasName: boolean;

    // Symptom information (de-identified)
    primarySymptoms: {
        category: SymptomCategory;
        severity: Severity;
        isPrimary: boolean;
    }[];

    // Goals and preferences
    wellnessGoals: string[];
    learningStyle?: string;
    timeCommitment?: string;

    // Life context (demographic, no PII)
    ageRange?: string;
    lifeStage?: string;
    livingSituation?: string;
    supportNetwork?: string;
    hasTrustedPerson?: boolean;
    groupPreference?: string;

    // Coping & experience
    currentCopingStrategies?: string[];
    unhealthyCopingToChange?: string[];
    therapyHistory?: string;
    knownTriggers?: string[];
    worstTimeOfDay?: string;

    // Free-text reflections (user's own words)
    goodDayDescription?: string;
    biggestChallenge?: string;
    hopedSupportDescription?: string;
    personalPatterns?: string;
    anythingElse?: string;

    // Assessment summary (no raw scores)
    assessmentSummary?: {
        overallWellnessScore: number;
        priorityFocus: SymptomCategory[];
        recommendedCourses: string[];
    };

    // Progress (anonymized)
    progress: {
        completedCourseCount: number;
        currentCourse: string | null;
        streakDays: number;
        xpTotal: number;
    };
}

// Legacy alias for backward compatibility
export type SafeContext = SafeWellnessContext;

/**
 * Strips potential prompt injection patterns from user-provided text
 * and truncates to a safe length.
 */
function sanitizeUserText(text: string | undefined, maxLength: number = 500): string | undefined {
    if (!text) return text;

    // Regex patterns that look like prompt injection attempts
    const injectionPatterns = /^(you are|ignore|forget|disregard|override|new instructions|system prompt|act as|pretend|from now on)\b/gim;

    let sanitized = text
        // Remove lines that start with injection-like instructions
        .split('\n')
        .filter(line => !injectionPatterns.test(line.trim()))
        .join('\n')
        .trim();

    // Truncate to max length
    if (sanitized.length > maxLength) {
        sanitized = sanitized.slice(0, maxLength);
    }

    return sanitized;
}

export class ProfileContextService {
    /**
     * Extracts ONLY wellness-relevant data for AI prompts, stripping PII.
     * This is used for AI coaching to understand user context without personal info.
     */
    getSafeContext(profile: WellnessProfile): SafeWellnessContext {
        return {
            hasName: !!profile.name,

            primarySymptoms: (profile.questionnaire?.primarySymptoms || []).map(s => ({
                category: s.category,
                severity: s.severity,
                isPrimary: s.isPrimary,
            })),

            wellnessGoals: profile.questionnaire?.wellnessGoals || [],
            learningStyle: profile.questionnaire?.learningStyle,
            timeCommitment: profile.questionnaire?.timeCommitment,

            // Life context
            ageRange: profile.questionnaire?.ageRange,
            lifeStage: profile.questionnaire?.lifeStage,
            livingSituation: profile.questionnaire?.livingSituation,
            supportNetwork: profile.questionnaire?.supportNetworkStrength,
            hasTrustedPerson: profile.questionnaire?.hasTrustedPerson,
            groupPreference: profile.questionnaire?.comfortWithGroupActivities,

            // Coping & experience
            currentCopingStrategies: profile.questionnaire?.currentCopingStrategies,
            unhealthyCopingToChange: profile.questionnaire?.unhealthyCopingToChange,
            therapyHistory: profile.questionnaire?.therapyHistory,
            knownTriggers: profile.questionnaire?.knownTriggers,
            worstTimeOfDay: profile.questionnaire?.worstTimeOfDay,

            // Free-text reflections (sanitized to prevent prompt injection)
            goodDayDescription: sanitizeUserText(profile.questionnaire?.goodDayDescription),
            biggestChallenge: sanitizeUserText(profile.questionnaire?.biggestChallenge),
            hopedSupportDescription: sanitizeUserText(profile.questionnaire?.hopedSupportDescription),
            personalPatterns: sanitizeUserText(profile.questionnaire?.personalPatterns),
            anythingElse: sanitizeUserText(profile.questionnaire?.anythingElse),

            assessmentSummary: profile.assessment ? {
                overallWellnessScore: profile.assessment.overallWellnessScore,
                priorityFocus: profile.assessment.priorityFocus,
                recommendedCourses: profile.assessment.recommendedCourses,
            } : undefined,

            progress: {
                completedCourseCount: profile.progress?.completedCourses?.length ?? 0,
                currentCourse: profile.progress?.currentCourse ?? null,
                streakDays: profile.progress?.streakDays ?? 0,
                xpTotal: profile.progress?.xpTotal ?? 0,
            },
        };
    }

    /**
     * Build a prompt-friendly summary of user's wellness context
     */
    buildContextSummary(profile: WellnessProfile): string {
        const ctx = this.getSafeContext(profile);
        const parts: string[] = [];

        // Symptom context
        if (ctx.primarySymptoms.length > 0) {
            const primary = ctx.primarySymptoms.filter(s => s.isPrimary);
            if (primary.length > 0) {
                parts.push(`Primary concerns: ${primary.map(s => `${s.category} (${s.severity})`).join(', ')}`);
            }

            const secondary = ctx.primarySymptoms.filter(s => !s.isPrimary);
            if (secondary.length > 0) {
                parts.push(`Additional concerns: ${secondary.map(s => s.category).join(', ')}`);
            }
        }

        // Goals
        if (ctx.wellnessGoals.length > 0) {
            parts.push(`Goals: ${ctx.wellnessGoals.join(', ')}`);
        }

        // Learning preferences
        if (ctx.learningStyle) {
            parts.push(`Learning style: ${ctx.learningStyle}`);
        }
        if (ctx.timeCommitment) {
            parts.push(`Time commitment: ${ctx.timeCommitment}`);
        }

        // Life context
        const lifeContextParts: string[] = [];
        if (ctx.ageRange) lifeContextParts.push(ctx.ageRange);
        if (ctx.lifeStage) lifeContextParts.push(ctx.lifeStage);
        if (ctx.livingSituation) lifeContextParts.push(`lives ${ctx.livingSituation.replace('with-', 'with ')}`);
        if (lifeContextParts.length > 0) {
            parts.push(`Life context: ${lifeContextParts.join(', ')}`);
        }

        // Support network
        const supportParts: string[] = [];
        if (ctx.supportNetwork) supportParts.push(`${ctx.supportNetwork} support network`);
        if (ctx.hasTrustedPerson !== undefined) supportParts.push(ctx.hasTrustedPerson ? 'has trusted person' : 'no trusted person');
        if (ctx.groupPreference) supportParts.push(ctx.groupPreference.replace(/-/g, ' '));
        if (supportParts.length > 0) {
            parts.push(`Support: ${supportParts.join(', ')}`);
        }

        // Coping strategies
        if (ctx.currentCopingStrategies?.length) {
            parts.push(`Current coping: ${ctx.currentCopingStrategies.join(', ')}`);
        }
        if (ctx.unhealthyCopingToChange?.length) {
            parts.push(`Wants to change: ${ctx.unhealthyCopingToChange.join(', ')}`);
        }
        if (ctx.therapyHistory) {
            parts.push(`Therapy: ${ctx.therapyHistory.replace(/-/g, ' ')}`);
        }

        // Triggers & patterns
        if (ctx.knownTriggers?.length) {
            parts.push(`Triggers: ${ctx.knownTriggers.join(', ')}`);
        }
        if (ctx.worstTimeOfDay) {
            parts.push(`Worst time: ${ctx.worstTimeOfDay}`);
        }

        // User's own words (high-value context for personalization)
        if (ctx.goodDayDescription) {
            parts.push(`What a good day looks like: "${ctx.goodDayDescription}"`);
        }
        if (ctx.biggestChallenge) {
            parts.push(`Biggest challenge: "${ctx.biggestChallenge}"`);
        }
        if (ctx.hopedSupportDescription) {
            parts.push(`Hoped-for support: "${ctx.hopedSupportDescription}"`);
        }
        if (ctx.personalPatterns) {
            parts.push(`Personal patterns noticed: "${ctx.personalPatterns}"`);
        }
        if (ctx.anythingElse) {
            parts.push(`Additional context: "${ctx.anythingElse}"`);
        }

        // Progress
        if (ctx.progress.completedCourseCount > 0) {
            parts.push(`Progress: ${ctx.progress.completedCourseCount} courses completed, ${ctx.progress.xpTotal} XP`);
        }
        if (ctx.progress.streakDays > 0) {
            parts.push(`Current streak: ${ctx.progress.streakDays} days`);
        }

        return parts.join('\n');
    }
}

export const profileContextService = new ProfileContextService();
