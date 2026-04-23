/**
 * Smart Wellness Actions — Pure Functions
 *
 * Builds prioritized next-step actions for the dashboard based on
 * wellness scores, assessment state, and user progress.
 *
 * Language is warm and encouraging — suitable for mental health seekers.
 */

import type { WellnessProfile, SymptomCategory } from '@/types/wellness-profile';
import type {
    WellnessDimensionKey,
    WellnessScores,
    PrioritizedWellnessAction,
} from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import { DIMENSION_ASSESSMENT_MAP, DIMENSION_COURSE_MAP, getCourse } from '@/lib/data/curriculum';

// ── Symptom → Dimension Mapping ─────────────────────────────────────────────

const SYMPTOM_TO_DIMENSION: Record<SymptomCategory, WellnessDimensionKey> = {
    'anxiety': 'anxietyManagement',
    'panic': 'anxietyManagement',
    'social-anxiety': 'anxietyManagement',
    'ocd': 'anxietyManagement',
    'depression': 'moodStability',
    'anger': 'moodStability',
    'grief': 'moodStability',
    'sleep': 'sleepQuality',
    'stress': 'stressResilience',
    'trauma': 'stressResilience',
    'other': 'anxietyManagement',
};

// ── Warm Titles for Assessment Prompts ──────────────────────────────────────

const ASSESSMENT_PROMPT_TITLES: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'Check in on your anxiety levels',
    moodStability: 'Explore what\'s affecting your mood',
    sleepQuality: 'Understand your sleep patterns',
    stressResilience: 'Check your stress and burnout levels',
    nutritionAwareness: 'Explore the food-mood connection',
};

const ASSESSMENT_PROMPT_DESCRIPTIONS: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'A quick self-check at the start of the anxiety course helps you see where you\'re starting from.',
    moodStability: 'Understanding how you\'re feeling right now gives us a foundation to build on together.',
    sleepQuality: 'A brief sleep quality check-in helps identify what to focus on first.',
    stressResilience: 'A short check-in on stress and burnout helps us tailor your learning path.',
    nutritionAwareness: 'Discover how your eating patterns might be affecting your mental health.',
};

// ── Action Builders ─────────────────────────────────────────────────────────

/**
 * Build an action prompting the user to take their first assessment for a dimension.
 */
function buildAssessmentAction(
    dimensionKey: WellnessDimensionKey,
    isPrimary: boolean,
): PrioritizedWellnessAction | null {
    const assessments = DIMENSION_ASSESSMENT_MAP[dimensionKey];
    if (!assessments || assessments.length === 0) return null;

    // Use the first assessment as the entry point
    const entry = assessments[0];
    const course = getCourse(entry.courseId);
    if (!course) return null;

    return {
        id: `assess-${dimensionKey}`,
        title: ASSESSMENT_PROMPT_TITLES[dimensionKey],
        description: ASSESSMENT_PROMPT_DESCRIPTIONS[dimensionKey],
        source: 'deep-dive',
        urgency: isPrimary ? 'primary' : 'secondary',
        href: `/academy/${entry.courseId}`,
        durationLabel: '~10 min',
        dimensionKey,
        badgeLabel: 'Explore',
    };
}

/**
 * Build a "continue your current course" action.
 */
function buildContinueCourseAction(
    profile: WellnessProfile,
): PrioritizedWellnessAction | null {
    const currentCourseId = profile.progress?.currentCourse;
    if (!currentCourseId) return null;

    const course = getCourse(currentCourseId);
    if (!course) return null;

    const completedLessons = profile.progress?.completedLessons?.[currentCourseId]?.length ?? 0;
    const totalLessons = course.lessons.length;
    const remaining = totalLessons - completedLessons;

    return {
        id: `continue-${currentCourseId}`,
        title: `Continue: ${course.title.replace(/^Course \d+: /, '')}`,
        description: remaining > 0
            ? `You have ${remaining} lesson${remaining === 1 ? '' : 's'} to go \u2014 consistency is what makes these techniques work.`
            : 'Review and practice what you\'ve learned so far.',
        source: 'practice',
        urgency: 'primary',
        href: `/academy/${currentCourseId}`,
        durationLabel: course.lessons[completedLessons]?.duration ?? '~25 min',
        dimensionKey: null,
        badgeLabel: 'Practice',
    };
}

/**
 * Build a "recommend first course" action for users with no current course.
 */
function buildRecommendCourseAction(
    profile: WellnessProfile,
    scores: WellnessScores,
): PrioritizedWellnessAction | null {
    // Find the weakest dimension with a score, or the primary symptom's dimension
    let targetDimension: WellnessDimensionKey | null = null;

    // Prefer weakest scored dimension
    for (const key of DIMENSION_KEYS) {
        const dim = scores.dimensions[key];
        if (dim?.score !== null && dim?.tier === 'needs-attention') {
            if (!targetDimension || (dim.score < (scores.dimensions[targetDimension]?.score ?? 100))) {
                targetDimension = key;
            }
        }
    }

    // Fallback to primary symptom's dimension
    if (!targetDimension) {
        const primary = profile.questionnaire?.primarySymptoms?.find(s => s.isPrimary);
        if (primary) {
            targetDimension = SYMPTOM_TO_DIMENSION[primary.category] ?? null;
        }
    }

    if (!targetDimension) return null;

    // Get the first course in that dimension
    const courses = DIMENSION_COURSE_MAP[targetDimension];
    if (!courses || courses.length === 0) return null;

    const course = getCourse(courses[0]);
    if (!course) return null;

    return {
        id: `start-${courses[0]}`,
        title: `Start: ${course.title.replace(/^Course \d+: /, '')}`,
        description: 'Begin with the foundations \u2014 small steps lead to meaningful change.',
        source: 'deep-dive',
        urgency: 'primary',
        href: `/academy/${courses[0]}`,
        durationLabel: course.lessons[0]?.duration ?? '~25 min',
        dimensionKey: targetDimension,
        badgeLabel: 'Explore',
    };
}

/**
 * Build a coaching action. Always present.
 */
function buildCoachAction(
    profile: WellnessProfile,
): PrioritizedWellnessAction {
    const lastMoodEntry = profile.progress?.moodEntries?.at(-1);
    const daysSinceLastMood = lastMoodEntry
        ? (Date.now() - new Date(lastMoodEntry.date).getTime()) / 86_400_000
        : Infinity;

    const isRecentlyActive = daysSinceLastMood <= 2;

    return {
        id: 'coach',
        title: isRecentlyActive ? 'Talk to your wellness coach' : 'Check in with your coach',
        description: isRecentlyActive
            ? 'Get personalized guidance on your current learning or talk through what\'s on your mind.'
            : 'A quick check-in can help you stay connected to your wellness goals.',
        source: 'talk-to-coach',
        urgency: 'secondary',
        href: '/coach',
        durationLabel: '5 min',
        dimensionKey: null,
        badgeLabel: 'Coaching',
    };
}

/**
 * Build a "reassess" action for a dimension with stale assessment data.
 */
function buildReassessAction(
    dimensionKey: WellnessDimensionKey,
    scores: WellnessScores,
    profile: WellnessProfile,
): PrioritizedWellnessAction | null {
    const dim = scores.dimensions[dimensionKey];
    if (!dim || !dim.lastAssessmentAt || !dim.courseId) return null;

    // Check if user has completed lessons in this dimension since last assessment
    const assessmentDate = new Date(dim.lastAssessmentAt).getTime();
    const dimensionCourses = new Set(DIMENSION_COURSE_MAP[dimensionKey]);
    let lessonsCompletedSince = 0;

    for (const [courseId, lessonIds] of Object.entries(profile.progress?.completedLessons ?? {})) {
        if (dimensionCourses.has(courseId)) {
            lessonsCompletedSince += (lessonIds?.length ?? 0);
        }
    }

    // Threshold: at least 3 lessons worth of new learning
    if (lessonsCompletedSince < 3) return null;

    // Also check that assessment is at least 7 days old
    const daysSinceAssessment = (Date.now() - assessmentDate) / 86_400_000;
    if (daysSinceAssessment < 7) return null;

    return {
        id: `reassess-${dimensionKey}`,
        title: `See how your ${dim.label.toLowerCase()} has shifted`,
        description: 'You\'ve practiced new techniques since your last check-in. A quick reassessment helps you see your progress.',
        source: 'quick-checkin',
        urgency: 'secondary',
        href: `/academy/${dim.courseId}`,
        durationLabel: '~5 min',
        dimensionKey,
        badgeLabel: 'Quick Check-in',
    };
}

/**
 * Build an "explore another track" action for filling remaining slots.
 */
function buildExploreAction(
    dimensionKey: WellnessDimensionKey,
    scores: WellnessScores,
): PrioritizedWellnessAction | null {
    const dim = scores.dimensions[dimensionKey];
    if (!dim || dim.score === null) return null;

    const courses = DIMENSION_COURSE_MAP[dimensionKey];
    if (!courses || courses.length === 0) return null;

    const course = getCourse(courses[0]);
    if (!course) return null;

    return {
        id: `explore-${dimensionKey}`,
        title: `Deepen your ${dim.label.toLowerCase()} skills`,
        description: 'Building on what you know opens up new tools for your wellness journey.',
        source: 'deep-dive',
        urgency: 'secondary',
        href: `/academy/${courses[0]}`,
        durationLabel: course.lessons[0]?.duration ?? '~25 min',
        dimensionKey,
        badgeLabel: 'Explore',
    };
}

// ── Main Orchestration ──────────────────────────────────────────────────────

/**
 * Build exactly 4 prioritized wellness actions for the dashboard.
 *
 * Priority:
 * 1. Assessment prompt for unscored dimension (primary)
 * 2. Continue/start course (primary)
 * 3. Reassess stale dimension (secondary)
 * 4. Coach action (secondary, always present)
 */
export function buildWellnessActions(
    profile: WellnessProfile,
    scores: WellnessScores,
): PrioritizedWellnessAction[] {
    const actions: PrioritizedWellnessAction[] = [];
    const usedHrefs = new Set<string>();

    function addAction(action: PrioritizedWellnessAction | null): boolean {
        if (!action) return false;
        if (usedHrefs.has(action.href)) return false;
        actions.push(action);
        usedHrefs.add(action.href);
        return true;
    }

    // Slot 1: Assessment prompt for the most relevant unscored dimension
    const unscoredDimensions = DIMENSION_KEYS.filter(k => !scores.dimensions[k] || scores.dimensions[k].score === null);
    if (unscoredDimensions.length > 0) {
        // Prioritize by primary symptom alignment
        const primarySymptom = profile.questionnaire?.primarySymptoms?.find(s => s.isPrimary);
        const primaryDimension = primarySymptom ? SYMPTOM_TO_DIMENSION[primarySymptom.category] : null;

        const targetDim = primaryDimension && unscoredDimensions.includes(primaryDimension)
            ? primaryDimension
            : unscoredDimensions[0];

        addAction(buildAssessmentAction(targetDim, true));
    }

    // Slot 2: Continue current course or recommend one
    const continueAction = buildContinueCourseAction(profile);
    if (!addAction(continueAction)) {
        addAction(buildRecommendCourseAction(profile, scores));
    }

    // Slot 3: Reassess a dimension with stale data
    for (const key of DIMENSION_KEYS) {
        if (actions.length >= 3) break;
        const reassess = buildReassessAction(key, scores, profile);
        if (addAction(reassess)) break;
    }

    // Slot 4: Coach action (always present)
    addAction(buildCoachAction(profile));

    // Fill remaining slots with explore actions for growing dimensions
    if (actions.length < 4) {
        const growingDimensions = DIMENSION_KEYS.filter(
            k => scores.dimensions[k]?.tier === 'growing'
        );
        for (const key of growingDimensions) {
            if (actions.length >= 4) break;
            addAction(buildExploreAction(key, scores));
        }
    }

    // If still under 4, add assessment prompts for remaining unscored dimensions
    if (actions.length < 4) {
        for (const key of unscoredDimensions) {
            if (actions.length >= 4) break;
            addAction(buildAssessmentAction(key, false));
        }
    }

    return actions.slice(0, 4);
}
