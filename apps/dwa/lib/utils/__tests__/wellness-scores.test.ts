import { describe, it, expect } from 'vitest';
import {
    normalizeAssessmentScore,
    computeAssessmentScoreForDimension,
    computeEngagementScoreForDimension,
    blendScores,
    getTier,
    getDimensionColor,
    getTierLabel,
    computeDelta,
    computeDimensionScores,
    getWeakDimensions,
    getDimensionLabel,
} from '../wellness-scores';
import type { WellnessProfile } from '@/types/wellness-profile';
import type { AssessmentResult } from '@/types/assessment';
import type { WellnessScoreSnapshot } from '@/types/wellness-scores';

// ── Mock Builder ────────────────────────────────────────────────────────────

function buildMockProfile(overrides: Partial<WellnessProfile> = {}): WellnessProfile {
    return {
        id: 'test-user',
        userId: 'test-user',
        name: 'Test User',
        email: 'test@example.com',
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString(),
        profileVersion: 3,
        assessment: null,
        progress: {
            completedCourses: [],
            completedLessons: {},
            currentCourse: null,
            xpTotal: 0,
            streakDays: 0,
            longestStreak: 0,
            badges: [],
            techniquesPracticed: {},
            favoritesTechniques: [],
            moodEntries: [],
            techniquePractices: [],
            lastActivityAt: new Date().toISOString(),
        },
        preferences: { emailReminders: false },
        has988Acknowledged: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides,
    };
}

function buildAssessmentResult(overrides: Partial<AssessmentResult> = {}): AssessmentResult {
    return {
        assessmentId: 'gad7',
        courseId: 'anxiety-management',
        lessonId: '1',
        responses: {},
        totalScore: 10,
        maxScore: 21,
        severity: 'moderate',
        severityLabel: 'Moderate',
        severityDescription: '',
        severityColor: 'orange',
        completedAt: new Date().toISOString(),
        ...overrides,
    };
}

// ── normalizeAssessmentScore ────────────────────────────────────────────────

describe('normalizeAssessmentScore', () => {
    it('inverts symptom scales (higher raw = worse)', () => {
        // GAD-7: score 0/21 = no anxiety = 100 wellness
        expect(normalizeAssessmentScore(0, 21, false)).toBe(100);
        // GAD-7: score 21/21 = severe anxiety = 0 wellness
        expect(normalizeAssessmentScore(21, 21, false)).toBe(0);
    });

    it('preserves adherence scales (higher raw = better)', () => {
        // dietary-pattern-check: 36/36 = excellent = 100
        expect(normalizeAssessmentScore(36, 36, true)).toBe(100);
        // dietary-pattern-check: 0/36 = poor = 0
        expect(normalizeAssessmentScore(0, 36, true)).toBe(0);
    });

    it('normalizes GAD-7 moderate correctly', () => {
        // Score 12 out of 21 → (21-12)/21 * 100 ≈ 43
        expect(normalizeAssessmentScore(12, 21, false)).toBe(43);
    });

    it('normalizes PSQI correctly', () => {
        // PSQI score 0/36 = perfect sleep = 100
        expect(normalizeAssessmentScore(0, 36, false)).toBe(100);
    });

    it('clamps to 0-100 range', () => {
        expect(normalizeAssessmentScore(-5, 21, false)).toBeLessThanOrEqual(100);
        expect(normalizeAssessmentScore(25, 21, false)).toBeGreaterThanOrEqual(0);
    });

    it('handles zero maxScore gracefully', () => {
        expect(normalizeAssessmentScore(5, 0, false)).toBe(0);
    });
});

// ── computeAssessmentScoreForDimension ──────────────────────────────────────

describe('computeAssessmentScoreForDimension', () => {
    it('returns null for empty history', () => {
        expect(computeAssessmentScoreForDimension('anxietyManagement', [])).toBeNull();
    });

    it('returns normalized score for matching assessment', () => {
        const history = [buildAssessmentResult({ assessmentId: 'gad7', totalScore: 7, completedAt: '2026-01-01T00:00:00Z' })];
        const result = computeAssessmentScoreForDimension('anxietyManagement', history);
        expect(result).not.toBeNull();
        expect(result!.score).toBe(67); // (21-7)/21*100 ≈ 67
        expect(result!.assessmentId).toBe('gad7');
    });

    it('uses most recent assessment when multiple exist', () => {
        const history = [
            buildAssessmentResult({ assessmentId: 'gad7', totalScore: 15, completedAt: '2026-01-01T00:00:00Z' }),
            buildAssessmentResult({ assessmentId: 'gad7', totalScore: 7, completedAt: '2026-02-01T00:00:00Z' }),
        ];
        const result = computeAssessmentScoreForDimension('anxietyManagement', history);
        expect(result!.score).toBe(67); // Uses the Feb result (score 7)
    });

    it('returns null when no assessment matches the dimension', () => {
        const history = [buildAssessmentResult({ assessmentId: 'psqi-sleep-quality', courseId: 'sleep-mastery' })];
        expect(computeAssessmentScoreForDimension('anxietyManagement', history)).toBeNull();
    });

    it('handles dietary-pattern-check as higherIsBetter', () => {
        const history = [buildAssessmentResult({
            assessmentId: 'dietary-pattern-check',
            courseId: 'dietary-patterns',
            totalScore: 27,
            maxScore: 36,
            completedAt: '2026-01-01T00:00:00Z',
        })];
        const result = computeAssessmentScoreForDimension('nutritionAwareness', history);
        expect(result).not.toBeNull();
        expect(result!.score).toBe(75); // 27/36*100 = 75
    });
});

// ── computeEngagementScoreForDimension ──────────────────────────────────────

describe('computeEngagementScoreForDimension', () => {
    it('returns null for zero engagement', () => {
        const profile = buildMockProfile();
        expect(computeEngagementScoreForDimension('anxietyManagement', profile.progress)).toBeNull();
    });

    it('scores completed lessons', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                completedLessons: { 'anxiety-management': ['1', '2', '3'] },
            },
        });
        const score = computeEngagementScoreForDimension('anxietyManagement', profile.progress);
        expect(score).not.toBeNull();
        expect(score!).toBeGreaterThan(0);
    });

    it('gives bonus for completed courses', () => {
        const withLessons = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                completedLessons: { 'anxiety-management': ['1', '2'] },
            },
        });
        const withCourse = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                completedLessons: { 'anxiety-management': ['1', '2'] },
                completedCourses: ['anxiety-management'],
            },
        });
        const scoreLessons = computeEngagementScoreForDimension('anxietyManagement', withLessons.progress)!;
        const scoreCourse = computeEngagementScoreForDimension('anxietyManagement', withCourse.progress)!;
        expect(scoreCourse).toBeGreaterThan(scoreLessons);
    });

    it('caps at 100', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                completedLessons: {
                    'anxiety-management': ['1', '2', '3', '4', '5', '6', '7', '8'],
                    'panic-disorder': ['1', '2', '3', '4', '5', '6', '7', '8'],
                    'social-anxiety': ['1', '2', '3', '4', '5', '6', '7', '8'],
                },
                completedCourses: ['anxiety-management', 'panic-disorder', 'social-anxiety'],
            },
        });
        const score = computeEngagementScoreForDimension('anxietyManagement', profile.progress);
        expect(score).toBeLessThanOrEqual(100);
    });
});

// ── blendScores ─────────────────────────────────────────────────────────────

describe('blendScores', () => {
    it('blends 70/30 when both available', () => {
        expect(blendScores(80, 60)).toBe(74); // 0.7*80 + 0.3*60 = 74
    });

    it('returns assessment score when engagement is null', () => {
        expect(blendScores(80, null)).toBe(80);
    });

    it('returns engagement score when assessment is null', () => {
        expect(blendScores(null, 60)).toBe(60);
    });

    it('returns null when both null', () => {
        expect(blendScores(null, null)).toBeNull();
    });
});

// ── getTier ─────────────────────────────────────────────────────────────────

describe('getTier', () => {
    it('returns null for null score', () => {
        expect(getTier(null)).toBeNull();
    });

    it('classifies thriving correctly', () => {
        expect(getTier(70)).toBe('thriving');
        expect(getTier(85)).toBe('thriving');
        expect(getTier(100)).toBe('thriving');
    });

    it('classifies growing correctly', () => {
        expect(getTier(40)).toBe('growing');
        expect(getTier(55)).toBe('growing');
        expect(getTier(69)).toBe('growing');
    });

    it('classifies needs-attention correctly', () => {
        expect(getTier(0)).toBe('needs-attention');
        expect(getTier(30)).toBe('needs-attention');
        expect(getTier(39)).toBe('needs-attention');
    });
});

// ── getDimensionColor ───────────────────────────────────────────────────────

describe('getDimensionColor', () => {
    it('returns teal for thriving', () => {
        const colors = getDimensionColor('thriving');
        expect(colors.bar).toContain('teal');
    });

    it('returns amber for growing', () => {
        const colors = getDimensionColor('growing');
        expect(colors.bar).toContain('amber');
    });

    it('returns rose (not red) for needs-attention', () => {
        const colors = getDimensionColor('needs-attention');
        expect(colors.bar).toContain('rose');
        expect(colors.bar).not.toContain('red');
    });

    it('returns gray for null', () => {
        const colors = getDimensionColor(null);
        expect(colors.bar).toContain('gray');
    });
});

// ── getTierLabel ────────────────────────────────────────────────────────────

describe('getTierLabel', () => {
    it('uses warm, non-judgmental language', () => {
        expect(getTierLabel('thriving')).toBe('Doing well');
        expect(getTierLabel('growing')).toBe('Making progress');
        expect(getTierLabel('needs-attention')).toBe('Getting started');
        expect(getTierLabel(null)).toBe('');
    });
});

// ── computeDelta ────────────────────────────────────────────────────────────

describe('computeDelta', () => {
    it('returns null with fewer than 2 snapshots', () => {
        expect(computeDelta('anxietyManagement', [])).toBeNull();
        expect(computeDelta('anxietyManagement', [{
            scores: { anxietyManagement: 50, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null },
            overallScore: 50,
            snapshotAt: '2026-01-01T00:00:00Z',
        }])).toBeNull();
    });

    it('computes positive delta', () => {
        const history: WellnessScoreSnapshot[] = [
            { scores: { anxietyManagement: 40, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: 40, snapshotAt: '2026-01-01T00:00:00Z' },
            { scores: { anxietyManagement: 55, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: 55, snapshotAt: '2026-02-01T00:00:00Z' },
        ];
        expect(computeDelta('anxietyManagement', history)).toBe(15);
    });

    it('computes negative delta', () => {
        const history: WellnessScoreSnapshot[] = [
            { scores: { anxietyManagement: 60, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: 60, snapshotAt: '2026-01-01T00:00:00Z' },
            { scores: { anxietyManagement: 45, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: 45, snapshotAt: '2026-02-01T00:00:00Z' },
        ];
        expect(computeDelta('anxietyManagement', history)).toBe(-15);
    });

    it('skips snapshots where dimension is null', () => {
        const history: WellnessScoreSnapshot[] = [
            { scores: { anxietyManagement: 50, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: 50, snapshotAt: '2026-01-01T00:00:00Z' },
            { scores: { anxietyManagement: null, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: null, snapshotAt: '2026-01-15T00:00:00Z' },
            { scores: { anxietyManagement: 65, moodStability: null, sleepQuality: null, stressResilience: null, nutritionAwareness: null }, overallScore: 65, snapshotAt: '2026-02-01T00:00:00Z' },
        ];
        expect(computeDelta('anxietyManagement', history)).toBe(15);
    });
});

// ── computeDimensionScores (integration) ────────────────────────────────────

describe('computeDimensionScores', () => {
    it('returns all null for empty profile', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        expect(scores.overallScore).toBeNull();
        expect(scores.dimensions.anxietyManagement.score).toBeNull();
        expect(scores.dimensions.moodStability.score).toBeNull();
        expect(scores.dimensions.sleepQuality.score).toBeNull();
        expect(scores.dimensions.stressResilience.score).toBeNull();
        expect(scores.dimensions.nutritionAwareness.score).toBeNull();
    });

    it('scores one dimension when only that assessment exists', () => {
        const profile = buildMockProfile({
            assessment: {
                overallWellnessScore: 50,
                anxietyScore: 50,
                moodScore: 50,
                sleepScore: 50,
                stressScore: 50,
                recommendedCourses: [],
                recommendedStartCourse: '',
                priorityFocus: [],
                personalizedInsight: '',
                strengthsIdentified: [],
                areasForGrowth: [],
                generatedAt: new Date().toISOString(),
                assessmentHistory: [buildAssessmentResult({ assessmentId: 'gad7', totalScore: 7 })],
            },
        });
        const scores = computeDimensionScores(profile);
        expect(scores.dimensions.anxietyManagement.score).not.toBeNull();
        expect(scores.dimensions.moodStability.score).toBeNull();
        expect(scores.overallScore).not.toBeNull();
    });

    it('blends assessment and engagement scores', () => {
        const profile = buildMockProfile({
            assessment: {
                overallWellnessScore: 50,
                anxietyScore: 50,
                moodScore: 50,
                sleepScore: 50,
                stressScore: 50,
                recommendedCourses: [],
                recommendedStartCourse: '',
                priorityFocus: [],
                personalizedInsight: '',
                strengthsIdentified: [],
                areasForGrowth: [],
                generatedAt: new Date().toISOString(),
                assessmentHistory: [buildAssessmentResult({ assessmentId: 'gad7', totalScore: 7 })],
            },
            progress: {
                ...buildMockProfile().progress,
                completedLessons: { 'anxiety-management': ['1', '2', '3', '4', '5'] },
            },
        });
        const scores = computeDimensionScores(profile);
        const dim = scores.dimensions.anxietyManagement;
        expect(dim.assessmentScore).not.toBeNull();
        expect(dim.engagementScore).not.toBeNull();
        // Blended score should differ from pure assessment
        expect(dim.score).not.toBe(dim.assessmentScore);
    });

    it('sets correct labels and track IDs', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        expect(scores.dimensions.anxietyManagement.label).toBe('Anxiety Management');
        expect(scores.dimensions.anxietyManagement.trackId).toBe('anxiety-and-fear');
        expect(scores.dimensions.moodStability.label).toBe('Mood & Emotional Health');
        expect(scores.dimensions.sleepQuality.label).toBe('Sleep Quality');
    });
});

// ── getWeakDimensions ───────────────────────────────────────────────────────

describe('getWeakDimensions', () => {
    it('returns empty for all null dimensions', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        expect(getWeakDimensions(scores)).toHaveLength(0);
    });
});

// ── getDimensionLabel ───────────────────────────────────────────────────────

describe('getDimensionLabel', () => {
    it('returns human-friendly labels', () => {
        expect(getDimensionLabel('anxietyManagement')).toBe('Anxiety Management');
        expect(getDimensionLabel('nutritionAwareness')).toBe('Nutrition & Brain Health');
    });
});
