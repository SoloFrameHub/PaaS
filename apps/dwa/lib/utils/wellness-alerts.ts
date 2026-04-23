/**
 * Wellness Alert System — Pure Functions
 *
 * Computes gentle, caring alerts for the dashboard.
 * Editorial standard: every string must pass "Would a caring friend say this?"
 * Never guilt, pressure, or imply failure.
 *
 * Alert types:
 *  - clinical-flag: PHQ-9 elevated + inactivity (priority 0, never suppressed)
 *  - reassess: new learning since last assessment (priority 2)
 *  - inactivity: gentle re-engagement (priority 3)
 *  - stagnation: score plateau, suggest new approach (priority 4)
 */

import type { WellnessProfile } from '@/types/wellness-profile';
import type {
    WellnessDimensionKey,
    WellnessScores,
    WellnessAlert,
} from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import { DIMENSION_ASSESSMENT_MAP, DIMENSION_COURSE_MAP } from '@/lib/data/curriculum';

// ── Helpers ─────────────────────────────────────────────────────────────────

function daysSince(isoDate: string, nowMs: number): number {
    return (nowMs - new Date(isoDate).getTime()) / 86_400_000;
}

// ── Clinical Flag ───────────────────────────────────────────────────────────

/**
 * Detect elevated PHQ-9 + inactivity — clinically important.
 * This alert is NEVER suppressed, even at the 3-alert cap.
 */
function checkClinicalFlag(
    profile: WellnessProfile,
    nowMs: number,
): WellnessAlert | null {
    const history = profile.assessment?.assessmentHistory ?? [];

    // Find most recent PHQ-9 result
    const phq9Results = history
        .filter(r => r.assessmentId === 'phq9')
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

    if (phq9Results.length === 0) return null;

    const latest = phq9Results[0];
    const severity = latest.severity;

    // Only trigger for moderately-severe or severe
    if (severity !== 'moderately-severe' && severity !== 'severe') return null;

    // Check inactivity (7+ days)
    const lastActivity = profile.progress?.lastActivityAt;
    if (!lastActivity) return null;

    const inactiveDays = daysSince(lastActivity, nowMs);
    if (inactiveDays < 7) return null;

    return {
        id: 'clinical-flag-phq9',
        kind: 'clinical-flag',
        title: 'Your wellbeing matters',
        message: 'It looks like you may have been going through a difficult time based on your recent check-in, and we haven\'t seen you for a while. Please know support is always available \u2014 your coach is here, and so is the 988 Lifeline (call or text 988) if you ever need immediate help.',
        ctaLabel: 'Talk to Your Coach',
        ctaHref: '/coach',
        dimensionKey: 'moodStability',
        priority: 0,
        isClinical: true,
    };
}

// ── Reassess Prompt ─────────────────────────────────────────────────────────

const REASSESS_TITLES: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'Ready to check in on your anxiety?',
    moodStability: 'See how your mood has shifted',
    sleepQuality: 'Time for a sleep check-in?',
    stressResilience: 'See how your resilience has grown',
    nutritionAwareness: 'Revisit your food-mood patterns',
};

/**
 * Check if a dimension has enough new learning to warrant reassessment.
 */
function checkReassess(
    dimensionKey: WellnessDimensionKey,
    profile: WellnessProfile,
    scores: WellnessScores,
    nowMs: number,
): WellnessAlert | null {
    const dim = scores.dimensions[dimensionKey];
    if (!dim || !dim.lastAssessmentAt) return null;

    const assessmentAge = daysSince(dim.lastAssessmentAt, nowMs);
    if (assessmentAge < 14) return null; // Too soon to reassess

    // Count engagement since last assessment
    const dimensionCourses = new Set(DIMENSION_COURSE_MAP[dimensionKey]);
    let lessonsCompleted = 0;

    for (const [courseId, lessonIds] of Object.entries(profile.progress?.completedLessons ?? {})) {
        if (dimensionCourses.has(courseId)) {
            lessonsCompleted += (lessonIds?.length ?? 0);
        }
    }

    if (lessonsCompleted < 3) return null;

    // Find the course with the assessment
    const assessments = DIMENSION_ASSESSMENT_MAP[dimensionKey];
    const assessmentCourse = assessments?.[0]?.courseId;
    if (!assessmentCourse) return null;

    return {
        id: `reassess-${dimensionKey}`,
        kind: 'reassess',
        title: REASSESS_TITLES[dimensionKey],
        message: 'You\'ve practiced several new techniques since your last check-in. Taking a few minutes to reassess can help you see your progress and guide what to focus on next.',
        ctaLabel: 'See How You\'re Doing',
        ctaHref: `/academy/${assessmentCourse}`,
        dimensionKey,
        priority: 2,
        isClinical: false,
    };
}

// ── Inactivity ──────────────────────────────────────────────────────────────

/**
 * Gentle re-engagement alert after periods of inactivity.
 * 5-13 days: gentle. 14+: warmer, more welcoming.
 */
function checkInactivity(
    profile: WellnessProfile,
    nowMs: number,
): WellnessAlert | null {
    const lastActivity = profile.progress?.lastActivityAt;
    if (!lastActivity) return null;

    const days = daysSince(lastActivity, nowMs);
    if (days < 5) return null;

    if (days < 14) {
        return {
            id: 'inactivity-gentle',
            kind: 'inactivity',
            title: 'A gentle reminder',
            message: 'It\'s been a few days since your last visit. Even a few minutes with your coach or a short lesson can make a real difference \u2014 there\'s no pressure to do more than you can manage today.',
            ctaLabel: 'Start Where You Are',
            ctaHref: '/coach',
            dimensionKey: null,
            priority: 3,
            isClinical: false,
        };
    }

    return {
        id: 'inactivity-warm',
        kind: 'inactivity',
        title: 'We\'re here when you\'re ready',
        message: 'It\'s been a while, and that\'s okay \u2014 life gets in the way. Your progress is still here, waiting for you. Even one lesson or a quick check-in with your coach can help you reconnect with your goals.',
        ctaLabel: 'Come Back',
        ctaHref: '/dashboard',
        dimensionKey: null,
        priority: 3,
        isClinical: false,
    };
}

// ── Stagnation ──────────────────────────────────────────────────────────────

const STAGNATION_TITLES: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'Trying something new with your anxiety?',
    moodStability: 'Exploring a different mood approach?',
    sleepQuality: 'Trying something new with your sleep?',
    stressResilience: 'A fresh perspective on stress?',
    nutritionAwareness: 'Exploring new nutrition patterns?',
};

const STAGNATION_MESSAGES: Record<WellnessDimensionKey, string> = {
    anxietyManagement: 'Your anxiety management has been fairly consistent lately. If you haven\'t tried the thought record yet, many people find it shifts their perspective within a few uses.',
    moodStability: 'Your mood patterns have been fairly steady. Sometimes exploring a different technique \u2014 like behavioral activation or a new thought exercise \u2014 can unlock a shift.',
    sleepQuality: 'Your sleep patterns have been fairly consistent lately. If you haven\'t tried the sleep diary yet, it\'s one of the most helpful tools \u2014 many people notice a shift within a week of tracking.',
    stressResilience: 'Your stress levels have been steady. Grounding exercises or a new coping strategy might offer a fresh angle.',
    nutritionAwareness: 'Your nutrition patterns have been consistent. Small changes \u2014 like adding a fermented food or reducing processed snacks \u2014 can sometimes make a noticeable difference.',
};

/**
 * Detect score plateau on a dimension that still needs improvement.
 */
function checkStagnation(
    dimensionKey: WellnessDimensionKey,
    scores: WellnessScores,
): WellnessAlert | null {
    const dim = scores.dimensions[dimensionKey];
    if (!dim || dim.score === null) return null;
    if (dim.tier !== 'needs-attention' && dim.tier !== 'growing') return null;
    if (dim.delta === null) return null;
    if (Math.abs(dim.delta) >= 3) return null; // There is meaningful change, no stagnation

    const courses = DIMENSION_COURSE_MAP[dimensionKey];
    const targetCourse = courses?.[0];
    if (!targetCourse) return null;

    return {
        id: `stagnation-${dimensionKey}`,
        kind: 'stagnation',
        title: STAGNATION_TITLES[dimensionKey],
        message: STAGNATION_MESSAGES[dimensionKey],
        ctaLabel: 'Explore a New Approach',
        ctaHref: `/academy/${targetCourse}`,
        dimensionKey,
        priority: 4,
        isClinical: false,
    };
}

// ── Main Orchestration ──────────────────────────────────────────────────────

/**
 * Compute wellness alerts for the dashboard.
 * Returns at most 3 alerts, but clinical flags are never dropped.
 *
 * @param nowMs Injectable timestamp for testability (defaults to Date.now())
 */
export function computeWellnessAlerts(
    profile: WellnessProfile,
    scores: WellnessScores,
    nowMs: number = Date.now(),
): WellnessAlert[] {
    const alerts: WellnessAlert[] = [];

    // Clinical flag — always checked, never suppressed
    const clinicalFlag = checkClinicalFlag(profile, nowMs);
    if (clinicalFlag) {
        alerts.push(clinicalFlag);
    }

    // Reassess prompts per dimension
    for (const key of DIMENSION_KEYS) {
        const reassess = checkReassess(key, profile, scores, nowMs);
        if (reassess) alerts.push(reassess);
    }

    // Inactivity — skip if clinical flag already present (it implies inactivity)
    if (!clinicalFlag) {
        const inactivity = checkInactivity(profile, nowMs);
        if (inactivity) alerts.push(inactivity);
    }

    // Stagnation for weak dimensions
    for (const key of DIMENSION_KEYS) {
        const stagnation = checkStagnation(key, scores);
        if (stagnation) alerts.push(stagnation);
    }

    // Sort by priority
    alerts.sort((a, b) => a.priority - b.priority);

    // Cap at 3 alerts, but clinical flag is always included
    if (alerts.length <= 3) return alerts;

    const clinical = alerts.filter(a => a.isClinical);
    const nonClinical = alerts.filter(a => !a.isClinical);
    const remaining = 3 - clinical.length;

    return [...clinical, ...nonClinical.slice(0, remaining)];
}
