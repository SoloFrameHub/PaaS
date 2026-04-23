/**
 * Wellness Scoring Engine — Pure Functions
 *
 * Computes 5-dimension wellness scores from clinical assessments and engagement data.
 * All functions are pure (no I/O, no side effects) for testability.
 */

import type { WellnessProfile, SymptomCategory, SymptomSelection } from '@/types/wellness-profile';
import type { AssessmentResult } from '@/types/assessment';
import type {
    WellnessDimensionKey,
    WellnessDimension,
    WellnessScores,
    WellnessScoreSnapshot,
    WellnessTier,
    DimensionColors,
} from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import { DIMENSION_ASSESSMENT_MAP, DIMENSION_COURSE_MAP } from '@/lib/data/curriculum';

// ── Dimension Labels ────────────────────────────────────────────────────────

const DIMENSION_LABELS: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'Anxiety Management',
    moodStability: 'Mood & Emotional Health',
    sleepQuality: 'Sleep Quality',
    stressResilience: 'Stress & Resilience',
    nutritionAwareness: 'Nutrition & Brain Health',
};

const DIMENSION_TRACK_IDS: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'anxiety-and-fear',
    moodStability: 'mood-emotional-health',
    sleepQuality: 'sleep-recovery',
    stressResilience: 'stress-resilience',
    nutritionAwareness: 'nutrition-brain-health',
};

// ── Score Normalization ─────────────────────────────────────────────────────

/**
 * Normalize a raw assessment score to 0-100 where higher = better.
 * Clinical symptom scales (GAD-7, PHQ-9, etc.) have higherIsBetter=false:
 *   low raw score = minimal symptoms = high wellness score.
 * Adherence scales (dietary-pattern-check) have higherIsBetter=true:
 *   high raw score = good habits = high wellness score.
 */
export function normalizeAssessmentScore(
    rawScore: number,
    maxScore: number,
    higherIsBetter: boolean,
): number {
    if (maxScore <= 0) return 0;
    const ratio = higherIsBetter
        ? rawScore / maxScore
        : (maxScore - rawScore) / maxScore;
    return Math.round(Math.max(0, Math.min(100, ratio * 100)));
}

// ── Assessment Score Per Dimension ──────────────────────────────────────────

/**
 * Compute a normalized assessment score for a dimension from clinical history.
 * Uses the most recent matching assessment. Returns null if no assessment exists.
 */
export function computeAssessmentScoreForDimension(
    dimensionKey: WellnessDimensionKey,
    assessmentHistory: AssessmentResult[],
): { score: number; assessmentId: string; courseId: string; completedAt: string } | null {
    const configs = DIMENSION_ASSESSMENT_MAP[dimensionKey];
    if (!configs || configs.length === 0) return null;

    const configIds = new Set(configs.map(c => c.assessmentId));

    // Find matching results, sort by most recent
    const matches = assessmentHistory
        .filter(r => configIds.has(r.assessmentId))
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

    if (matches.length === 0) return null;

    const latest = matches[0];
    const config = configs.find(c => c.assessmentId === latest.assessmentId);
    if (!config) return null;

    const score = normalizeAssessmentScore(latest.totalScore, config.maxScore, config.higherIsBetter);
    return {
        score,
        assessmentId: latest.assessmentId,
        courseId: latest.courseId,
        completedAt: latest.completedAt,
    };
}

// ── Engagement Score Per Dimension ──────────────────────────────────────────

/**
 * Compute an engagement score (0-100) from lessons, logs, thought records, and checklists.
 * Returns null if zero engagement data exists for this dimension.
 *
 * Point system:
 *  - Completed lesson in dimension courses: 1pt
 *  - Completed course in dimension: 5pt bonus
 *  - Tracking log entry for dimension courses: 2pt
 *  - Thought record for dimension courses: 3pt
 *  - Completed checklist for dimension courses: 3pt
 *
 * Soft cap at 50 points → 100 score. Even modest engagement shows meaningful progress.
 */
export function computeEngagementScoreForDimension(
    dimensionKey: WellnessDimensionKey,
    progress: WellnessProfile['progress'] | undefined | null,
): number | null {
    if (!progress) return null;
    const dimensionCourses = new Set(DIMENSION_COURSE_MAP[dimensionKey]);
    let points = 0;

    // Completed lessons
    for (const [courseId, lessonIds] of Object.entries(progress.completedLessons ?? {})) {
        if (dimensionCourses.has(courseId)) {
            points += (lessonIds?.length ?? 0);
        }
    }

    // Completed courses
    for (const courseId of (progress.completedCourses ?? [])) {
        if (dimensionCourses.has(courseId)) {
            points += 5;
        }
    }

    // Tracking logs
    if (progress.trackingLogs) {
        for (const log of progress.trackingLogs) {
            if (dimensionCourses.has(log.courseId)) {
                points += 2;
            }
        }
    }

    // Thought records
    if (progress.thoughtRecords) {
        for (const record of progress.thoughtRecords) {
            if (dimensionCourses.has(record.courseId)) {
                points += 3;
            }
        }
    }

    // Completed checklists
    if (progress.checklists) {
        for (const checklist of progress.checklists) {
            if (dimensionCourses.has(checklist.courseId) && checklist.completedAt) {
                points += 3;
            }
        }
    }

    if (points === 0) return null;

    // Soft cap: 50 points = 100 score
    return Math.round(Math.min(points / 50, 1) * 100);
}

// ── Score Blending ──────────────────────────────────────────────────────────

/**
 * Blend assessment and engagement scores.
 * 70% assessment + 30% engagement when both available.
 * Returns whichever is available when only one exists.
 */
export function blendScores(
    assessmentScore: number | null,
    engagementScore: number | null,
): number | null {
    if (assessmentScore !== null && engagementScore !== null) {
        return Math.round(0.7 * assessmentScore + 0.3 * engagementScore);
    }
    return assessmentScore ?? engagementScore;
}

// ── Tier Classification ─────────────────────────────────────────────────────

/**
 * Classify a score into a wellness tier.
 * Thresholds: thriving (>=70), growing (>=40), needs-attention (<40).
 */
export function getTier(score: number | null): WellnessTier | null {
    if (score === null) return null;
    if (score >= 70) return 'thriving';
    if (score >= 40) return 'growing';
    return 'needs-attention';
}

/**
 * Get Tailwind color classes for a tier.
 * Uses teal (therapeutic), amber (warm), rose (gentle) — never red (crisis-only).
 */
export function getDimensionColor(tier: WellnessTier | null): DimensionColors {
    switch (tier) {
        case 'thriving':
            return { bg: 'bg-teal-50', text: 'text-teal-700', bar: 'bg-teal-500' };
        case 'growing':
            return { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-400' };
        case 'needs-attention':
            return { bg: 'bg-rose-50', text: 'text-rose-600', bar: 'bg-rose-400' };
        default:
            return { bg: 'bg-gray-50', text: 'text-gray-400', bar: 'bg-gray-200' };
    }
}

/**
 * Friendly tier label for the UI. Never clinical or judgmental.
 */
export function getTierLabel(tier: WellnessTier | null): string {
    switch (tier) {
        case 'thriving': return 'Doing well';
        case 'growing': return 'Making progress';
        case 'needs-attention': return 'Getting started';
        default: return '';
    }
}

// ── Delta Computation ───────────────────────────────────────────────────────

/**
 * Compute score change from the most recent pair of snapshots.
 * Returns null if fewer than 2 snapshots have data for this dimension.
 */
export function computeDelta(
    dimensionKey: WellnessDimensionKey,
    history: WellnessScoreSnapshot[],
): number | null {
    // Find snapshots where this dimension has a score
    const withData = history
        .filter(s => s.scores[dimensionKey] !== null && s.scores[dimensionKey] !== undefined)
        .sort((a, b) => new Date(b.snapshotAt).getTime() - new Date(a.snapshotAt).getTime());

    if (withData.length < 2) return null;

    const current = withData[0].scores[dimensionKey] ?? 0;
    const previous = withData[1].scores[dimensionKey] ?? 0;
    return Math.round((current - previous) * 10) / 10;
}

// ── Symptom Seeding ──────────────────────────────────────────────────────────

/**
 * Maps onboarding symptom categories to wellness dimension keys.
 * Used to seed initial dimension scores before any clinical assessments exist.
 */
const SYMPTOM_DIMENSION_MAP: Partial<Record<SymptomCategory, WellnessDimensionKey>> = {
    anxiety: 'anxietyManagement',
    panic: 'anxietyManagement',
    'social-anxiety': 'anxietyManagement',
    ocd: 'anxietyManagement',
    depression: 'moodStability',
    grief: 'moodStability',
    anger: 'moodStability',
    sleep: 'sleepQuality',
    stress: 'stressResilience',
    trauma: 'stressResilience',
};

/**
 * Compute an initial seed score for a dimension from onboarding symptom severity.
 * Only applied when a dimension has zero clinical assessment and zero engagement data.
 * Returns null when no symptoms map to this dimension.
 *
 * Severe   → 20  (significant challenge, most room to grow)
 * Moderate → 45  (present challenge, meaningful room to grow)
 * Mild     → 65  (mild challenge, some room to grow)
 */
function computeSymptomSeedScore(
    dimensionKey: WellnessDimensionKey,
    symptoms: SymptomSelection[],
): number | null {
    const matching = symptoms.filter(s => SYMPTOM_DIMENSION_MAP[s.category] === dimensionKey);
    if (matching.length === 0) return null;
    const scores = matching.map(s =>
        s.severity === 'severe' ? 20 : s.severity === 'moderate' ? 45 : 65,
    );
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

// ── Empty Scores Factory ──────────────────────────────────────────────────

/** Returns a valid WellnessScores with all 5 dimensions initialized to null. */
export function emptyScores(): WellnessScores {
    const dimensions = {} as Record<WellnessDimensionKey, WellnessDimension>;
    for (const key of DIMENSION_KEYS) {
        dimensions[key] = {
            key,
            label: DIMENSION_LABELS[key],
            score: null,
            assessmentScore: null,
            engagementScore: null,
            delta: null,
            lastAssessmentAt: null,
            assessmentId: null,
            courseId: null,
            trackId: DIMENSION_TRACK_IDS[key],
            tier: null,
        };
    }
    return { dimensions, overallScore: null, computedAt: new Date().toISOString() };
}

// ── Main Orchestration ──────────────────────────────────────────────────────

export function getDimensionLabel(key: WellnessDimensionKey): string {
    return DIMENSION_LABELS[key];
}

/**
 * Compute all 5 wellness dimension scores from a profile.
 * This is the top-level function called from the dashboard server component.
 */
export function computeDimensionScores(profile: WellnessProfile): WellnessScores {
    const assessmentHistory = profile.assessment?.assessmentHistory ?? [];
    const scoreHistory = profile.wellnessScoreHistory ?? [];
    const symptoms = profile.questionnaire?.primarySymptoms ?? [];

    const dimensions = {} as Record<WellnessDimensionKey, WellnessDimension>;

    for (const key of DIMENSION_KEYS) {
        const assessmentResult = computeAssessmentScoreForDimension(key, assessmentHistory);
        const engagementScore = computeEngagementScoreForDimension(key, profile.progress);

        // Seed from onboarding symptom severity only when no clinical data exists yet.
        // Once a user completes an in-course clinical assessment or engages with lessons,
        // the real data takes over naturally.
        const seedScore =
            assessmentResult === null && engagementScore === null
                ? computeSymptomSeedScore(key, symptoms)
                : null;

        const assessmentScore = assessmentResult?.score ?? null;
        const score = blendScores(assessmentScore ?? seedScore, engagementScore);
        const tier = getTier(score);
        const delta = computeDelta(key, scoreHistory);

        dimensions[key] = {
            key,
            label: DIMENSION_LABELS[key],
            score,
            assessmentScore,
            engagementScore,
            delta,
            lastAssessmentAt: assessmentResult?.completedAt ?? null,
            assessmentId: assessmentResult?.assessmentId ?? null,
            courseId: assessmentResult?.courseId ?? null,
            trackId: DIMENSION_TRACK_IDS[key],
            tier,
        };
    }

    // Overall score: mean of non-null dimension scores
    const scoredDimensions = DIMENSION_KEYS
        .map(k => dimensions[k].score)
        .filter((s): s is number => s !== null);

    const overallScore = scoredDimensions.length > 0
        ? Math.round(scoredDimensions.reduce((a, b) => a + b, 0) / scoredDimensions.length)
        : null;

    return {
        dimensions,
        overallScore,
        computedAt: new Date().toISOString(),
    };
}

/**
 * Get dimensions that need attention, sorted by score ascending (weakest first).
 */
export function getWeakDimensions(scores: WellnessScores): WellnessDimension[] {
    return DIMENSION_KEYS
        .map(k => scores.dimensions[k])
        .filter((d): d is WellnessDimension => !!d && d.score !== null && d.tier === 'needs-attention')
        .sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
}
