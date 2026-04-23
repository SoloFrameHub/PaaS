import { describe, it, expect } from 'vitest';
import { computeWellnessAlerts } from '../wellness-alerts';
import { computeDimensionScores } from '../wellness-scores';
import type { WellnessProfile } from '@/types/wellness-profile';
import type { AssessmentResult } from '@/types/assessment';
import type { WellnessScores, WellnessDimension, WellnessDimensionKey } from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';

// ── Mock Builders ───────────────────────────────────────────────────────────

const NOW = new Date('2026-02-15T12:00:00Z').getTime();

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

function buildAssessmentBlock(history: AssessmentResult[] = []) {
    return {
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
        assessmentHistory: history,
    };
}

function daysAgo(days: number): string {
    return new Date(NOW - days * 86_400_000).toISOString();
}

function buildNullDimension(key: WellnessDimensionKey): WellnessDimension {
    return {
        key,
        label: key,
        score: null,
        assessmentScore: null,
        engagementScore: null,
        delta: null,
        lastAssessmentAt: null,
        assessmentId: null,
        courseId: null,
        trackId: '',
        tier: null,
    };
}

function buildEmptyScores(): WellnessScores {
    return {
        dimensions: Object.fromEntries(
            DIMENSION_KEYS.map(k => [k, buildNullDimension(k)])
        ) as Record<WellnessDimensionKey, WellnessDimension>,
        overallScore: null,
        computedAt: new Date(NOW).toISOString(),
    };
}

// ── Clinical Flag Tests ─────────────────────────────────────────────────────

describe('clinical flag alert', () => {
    it('triggers for PHQ-9 severe + 8 days inactive', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'phq9',
                    courseId: 'depression-action',
                    totalScore: 22,
                    maxScore: 27,
                    severity: 'severe',
                    completedAt: daysAgo(10),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(8),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        const clinical = alerts.find(a => a.kind === 'clinical-flag');
        expect(clinical).toBeDefined();
        expect(clinical!.priority).toBe(0);
        expect(clinical!.isClinical).toBe(true);
        expect(clinical!.message).toContain('988');
    });

    it('triggers for PHQ-9 moderately-severe + 7 days inactive', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'phq9',
                    courseId: 'depression-action',
                    totalScore: 18,
                    maxScore: 27,
                    severity: 'moderately-severe',
                    completedAt: daysAgo(10),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(7),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'clinical-flag')).toBe(true);
    });

    it('does NOT trigger for PHQ-9 moderate (not severe enough)', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'phq9',
                    courseId: 'depression-action',
                    totalScore: 12,
                    maxScore: 27,
                    severity: 'moderate',
                    completedAt: daysAgo(10),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(8),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'clinical-flag')).toBe(false);
    });

    it('does NOT trigger for severe PHQ-9 with recent activity (3 days)', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'phq9',
                    courseId: 'depression-action',
                    totalScore: 22,
                    maxScore: 27,
                    severity: 'severe',
                    completedAt: daysAgo(10),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(3),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'clinical-flag')).toBe(false);
    });

    it('is never dropped even when at 3-alert cap', () => {
        // Build a scenario that generates clinical flag + many other alerts
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'phq9',
                    courseId: 'depression-action',
                    totalScore: 22,
                    maxScore: 27,
                    severity: 'severe',
                    completedAt: daysAgo(10),
                }),
                buildAssessmentResult({
                    assessmentId: 'gad7',
                    courseId: 'anxiety-management',
                    totalScore: 7,
                    maxScore: 21,
                    completedAt: daysAgo(20),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(8),
                completedLessons: {
                    'anxiety-management': ['1', '2', '3', '4'],
                },
            },
        });

        // Build scores with stagnation signals
        const scores = buildEmptyScores();
        scores.dimensions.anxietyManagement = {
            ...scores.dimensions.anxietyManagement,
            score: 35,
            tier: 'needs-attention',
            delta: 1,
            lastAssessmentAt: daysAgo(20),
            assessmentId: 'gad7',
            courseId: 'anxiety-management',
        };
        scores.dimensions.moodStability = {
            ...scores.dimensions.moodStability,
            score: 30,
            tier: 'needs-attention',
            delta: 0,
        };

        const alerts = computeWellnessAlerts(profile, scores, NOW);

        // Should be capped at 3
        expect(alerts.length).toBeLessThanOrEqual(3);
        // Clinical flag must be present
        expect(alerts.some(a => a.isClinical)).toBe(true);
    });
});

// ── Inactivity Tests ────────────────────────────────────────────────────────

describe('inactivity alert', () => {
    it('does NOT trigger for 3 days of inactivity', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(3),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'inactivity')).toBe(false);
    });

    it('triggers gentle alert for 6 days of inactivity', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(6),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        const inactivity = alerts.find(a => a.kind === 'inactivity');
        expect(inactivity).toBeDefined();
        expect(inactivity!.id).toBe('inactivity-gentle');
        expect(inactivity!.priority).toBe(3);
    });

    it('triggers warm/stronger alert for 15 days of inactivity', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(15),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        const inactivity = alerts.find(a => a.kind === 'inactivity');
        expect(inactivity).toBeDefined();
        expect(inactivity!.id).toBe('inactivity-warm');
    });

    it('is suppressed when clinical flag is present (avoids double-alerting)', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'phq9',
                    courseId: 'depression-action',
                    totalScore: 22,
                    maxScore: 27,
                    severity: 'severe',
                    completedAt: daysAgo(10),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(10),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'clinical-flag')).toBe(true);
        expect(alerts.some(a => a.kind === 'inactivity')).toBe(false);
    });

    it('uses warm, non-judgmental language', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(15),
            },
        });
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        const inactivity = alerts.find(a => a.kind === 'inactivity');
        expect(inactivity).toBeDefined();
        // No guilt, pressure, or judgmental language
        expect(inactivity!.message).not.toMatch(/you (should|must|need to|failed)/i);
        expect(inactivity!.message).toContain('okay');
    });
});

// ── Reassess Tests ──────────────────────────────────────────────────────────

describe('reassess alert', () => {
    it('triggers when assessment is 14+ days old and 3+ lessons completed', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'gad7',
                    courseId: 'anxiety-management',
                    totalScore: 10,
                    completedAt: daysAgo(16),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                completedLessons: {
                    'anxiety-management': ['1', '2', '3'],
                },
                lastActivityAt: daysAgo(1),
            },
        });

        // Build scores reflecting the assessment
        const scores = computeDimensionScores(profile);

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        const reassess = alerts.find(a => a.kind === 'reassess');
        expect(reassess).toBeDefined();
        expect(reassess!.dimensionKey).toBe('anxietyManagement');
        expect(reassess!.priority).toBe(2);
    });

    it('does NOT trigger when assessment is only 10 days old', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'gad7',
                    courseId: 'anxiety-management',
                    totalScore: 10,
                    completedAt: daysAgo(10),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                completedLessons: {
                    'anxiety-management': ['1', '2', '3', '4'],
                },
                lastActivityAt: daysAgo(1),
            },
        });
        const scores = computeDimensionScores(profile);
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'reassess')).toBe(false);
    });

    it('does NOT trigger when fewer than 3 lessons completed', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'gad7',
                    courseId: 'anxiety-management',
                    totalScore: 10,
                    completedAt: daysAgo(20),
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                completedLessons: {
                    'anxiety-management': ['1', '2'],
                },
                lastActivityAt: daysAgo(1),
            },
        });
        const scores = computeDimensionScores(profile);
        const alerts = computeWellnessAlerts(profile, scores, NOW);

        expect(alerts.some(a => a.kind === 'reassess')).toBe(false);
    });
});

// ── Stagnation Tests ────────────────────────────────────────────────────────

describe('stagnation alert', () => {
    it('triggers when delta is small and tier is needs-attention or growing', () => {
        const scores = buildEmptyScores();
        scores.dimensions.sleepQuality = {
            ...scores.dimensions.sleepQuality,
            score: 35,
            tier: 'needs-attention',
            delta: 1,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(1),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        const stagnation = alerts.find(a => a.kind === 'stagnation');
        expect(stagnation).toBeDefined();
        expect(stagnation!.dimensionKey).toBe('sleepQuality');
        expect(stagnation!.priority).toBe(4);
    });

    it('does NOT trigger when delta >= 3 (meaningful change)', () => {
        const scores = buildEmptyScores();
        scores.dimensions.sleepQuality = {
            ...scores.dimensions.sleepQuality,
            score: 35,
            tier: 'needs-attention',
            delta: 5,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(1),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        expect(alerts.some(a => a.kind === 'stagnation' && a.dimensionKey === 'sleepQuality')).toBe(false);
    });

    it('does NOT trigger for thriving dimensions', () => {
        const scores = buildEmptyScores();
        scores.dimensions.sleepQuality = {
            ...scores.dimensions.sleepQuality,
            score: 85,
            tier: 'thriving',
            delta: 0,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(1),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        expect(alerts.some(a => a.kind === 'stagnation' && a.dimensionKey === 'sleepQuality')).toBe(false);
    });

    it('does NOT trigger when delta is null', () => {
        const scores = buildEmptyScores();
        scores.dimensions.sleepQuality = {
            ...scores.dimensions.sleepQuality,
            score: 35,
            tier: 'needs-attention',
            delta: null,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(1),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        expect(alerts.some(a => a.kind === 'stagnation' && a.dimensionKey === 'sleepQuality')).toBe(false);
    });
});

// ── Orchestration Tests ─────────────────────────────────────────────────────

describe('computeWellnessAlerts orchestration', () => {
    it('returns empty array for a fresh profile', () => {
        const profile = buildMockProfile();
        const scores = buildEmptyScores();
        const alerts = computeWellnessAlerts(profile, scores, NOW);
        expect(alerts).toEqual([]);
    });

    it('returns at most 3 alerts', () => {
        // Build scenario with many alerts: stagnation across multiple dimensions + inactivity
        const scores = buildEmptyScores();
        for (const key of DIMENSION_KEYS) {
            scores.dimensions[key] = {
                ...scores.dimensions[key],
                score: 30,
                tier: 'needs-attention',
                delta: 0,
            };
        }

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(6),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        expect(alerts.length).toBeLessThanOrEqual(3);
    });

    it('sorts alerts by priority (lower first)', () => {
        // Build scenario with multiple alert types
        const scores = buildEmptyScores();
        scores.dimensions.anxietyManagement = {
            ...scores.dimensions.anxietyManagement,
            score: 30,
            tier: 'needs-attention',
            delta: 1,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(6),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        for (let i = 1; i < alerts.length; i++) {
            expect(alerts[i].priority).toBeGreaterThanOrEqual(alerts[i - 1].priority);
        }
    });

    it('all alerts have required fields', () => {
        const scores = buildEmptyScores();
        scores.dimensions.anxietyManagement = {
            ...scores.dimensions.anxietyManagement,
            score: 30,
            tier: 'needs-attention',
            delta: 0,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(6),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        for (const alert of alerts) {
            expect(alert.id).toBeTruthy();
            expect(alert.kind).toBeTruthy();
            expect(alert.title).toBeTruthy();
            expect(alert.message).toBeTruthy();
            expect(alert.ctaLabel).toBeTruthy();
            expect(alert.ctaHref).toBeTruthy();
            expect(typeof alert.priority).toBe('number');
            expect(typeof alert.isClinical).toBe('boolean');
        }
    });

    it('uses caring language across all alert messages', () => {
        // Generate all types of alerts
        const scores = buildEmptyScores();
        scores.dimensions.anxietyManagement = {
            ...scores.dimensions.anxietyManagement,
            score: 30,
            tier: 'needs-attention',
            delta: 1,
        };

        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                lastActivityAt: daysAgo(6),
            },
        });

        const alerts = computeWellnessAlerts(profile, scores, NOW);
        for (const alert of alerts) {
            expect(alert.message).not.toMatch(/you (failed|are failing|should have|must)/i);
            expect(alert.message).not.toMatch(/lazy|unmotivated|behind/i);
        }
    });
});
