/**
 * Onboarding Assessment Utilities
 *
 * Pure functions for deriving assessment display data from onboarding symptom
 * selections. Used both at write-time (complete route) and as a read-time
 * fallback for users who onboarded before these fields were computed.
 */

import type { SymptomCategory, SymptomSelection, WellnessQuestionnaire } from '@/types/wellness-profile';

// ── Labels ────────────────────────────────────────────────────────────────────

export const SYMPTOM_AREA_LABELS: Record<SymptomCategory, string> = {
    anxiety: 'Managing anxiety and worry',
    depression: 'Lifting mood and building energy',
    sleep: 'Improving sleep quality',
    panic: 'Overcoming panic attacks',
    'social-anxiety': 'Building social confidence',
    trauma: 'Processing difficult experiences',
    stress: 'Building stress resilience',
    ocd: 'Breaking unhelpful thought-behavior cycles',
    anger: 'Managing anger and strong emotions',
    grief: 'Navigating grief and loss',
    other: 'Building overall mental wellness',
};

// ── Score Computation ─────────────────────────────────────────────────────────

/**
 * Convert symptom severity to an inverted wellness score.
 * Severe symptoms → low score (most room to grow). Higher is better.
 */
export function severityToScore(severity: string): number {
    if (severity === 'severe') return 20;
    if (severity === 'moderate') return 45;
    return 65; // mild
}

/**
 * Compute overall wellness score from all reported symptoms.
 * Averages per-symptom inverted severity scores.
 */
export function computeOverallScoreFromSymptoms(symptoms: SymptomSelection[]): number {
    if (symptoms.length === 0) return 70;
    const scores = symptoms.map(s => severityToScore(s.severity));
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

/**
 * Compute a dimension-specific score from symptoms in given categories.
 * Returns 70 (healthy baseline) when no matching symptoms are reported.
 */
export function computeDimensionScoreFromSymptoms(
    symptoms: SymptomSelection[],
    categories: SymptomCategory[],
): number {
    const matching = symptoms.filter(s => categories.includes(s.category));
    if (matching.length === 0) return 70;
    const scores = matching.map(s => severityToScore(s.severity));
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

// ── Growth Areas ──────────────────────────────────────────────────────────────

/**
 * Derive ordered growth area labels from symptoms.
 * Sorted by severity (worst first), deduplicated.
 */
export function computeAreasForGrowthFromSymptoms(symptoms: SymptomSelection[]): string[] {
    const severityOrder: Record<string, number> = { severe: 0, moderate: 1, mild: 2 };
    return [...symptoms]
        .sort((a, b) => (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3))
        .map(s => SYMPTOM_AREA_LABELS[s.category])
        .filter((v, i, arr) => arr.indexOf(v) === i);
}

// ── Strengths ─────────────────────────────────────────────────────────────────

/**
 * Identify user strengths from saved questionnaire data.
 * Always returns at least one strength so the card is never empty.
 */
export function computeStrengthsFromQuestionnaire(
    questionnaire: Partial<WellnessQuestionnaire> | null | undefined,
): string[] {
    const strengths: string[] = [];

    if ((questionnaire?.currentCopingStrategies ?? []).length > 0) {
        strengths.push('You already use active coping strategies');
    }
    if (questionnaire?.therapyHistory === 'currently-in-therapy') {
        strengths.push("You're actively working with a therapist");
    } else if (questionnaire?.therapyHistory === 'past') {
        strengths.push('You have prior experience with therapy and self-reflection');
    }
    if (
        questionnaire?.supportNetworkStrength === 'strong' ||
        questionnaire?.supportNetworkStrength === 'moderate'
    ) {
        strengths.push('You have people in your corner who support you');
    }
    if (questionnaire?.previousSelfHelpExperience) {
        strengths.push('You have experience with self-directed learning');
    }
    if ((questionnaire?.wellnessGoals ?? []).length > 0) {
        strengths.push('You have clear goals for your wellness journey');
    }
    if (strengths.length === 0) {
        strengths.push('You took the brave first step of starting this journey');
    }

    return strengths;
}

// ── Personalized Insight ──────────────────────────────────────────────────────

/**
 * Generate a short personalized insight sentence anchored to the primary symptom.
 */
export function computePersonalizedInsight(symptoms: SymptomSelection[]): string {
    const primary = symptoms.find(s => s.isPrimary) ?? symptoms[0];
    if (!primary) {
        return 'Your personalized path is ready. Each lesson builds practical skills you can use right away.';
    }
    const area = SYMPTOM_AREA_LABELS[primary.category];
    return `Your path begins with ${area.toLowerCase()}. Each step builds on the last — this is your starting point, not your endpoint.`;
}
