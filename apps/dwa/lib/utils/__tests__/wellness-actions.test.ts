import { describe, it, expect } from 'vitest';
import { buildWellnessActions } from '../wellness-actions';
import { computeDimensionScores } from '../wellness-scores';
import type { WellnessProfile } from '@/types/wellness-profile';
import type { AssessmentResult } from '@/types/assessment';

// ── Mock Builders ───────────────────────────────────────────────────────────

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

// ── Tests ───────────────────────────────────────────────────────────────────

describe('buildWellnessActions', () => {
    it('returns at most 4 actions', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        expect(actions.length).toBeLessThanOrEqual(4);
    });

    it('always includes a coach action', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        const coachAction = actions.find(a => a.source === 'talk-to-coach');
        expect(coachAction).toBeDefined();
        expect(coachAction!.href).toBe('/coach');
        expect(coachAction!.badgeLabel).toBe('Coaching');
    });

    it('has no duplicate hrefs', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({ assessmentId: 'gad7', totalScore: 10 }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                currentCourse: 'anxiety-management',
                completedLessons: { 'anxiety-management': ['1', '2', '3'] },
            },
        });
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        const hrefs = actions.map(a => a.href);
        expect(new Set(hrefs).size).toBe(hrefs.length);
    });

    it('prompts assessment for unscored dimensions', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        const assessmentAction = actions.find(a => a.id.startsWith('assess-'));
        expect(assessmentAction).toBeDefined();
    });

    it('prioritizes primary symptom dimension for assessment', () => {
        const profile = buildMockProfile({
            questionnaire: {
                primarySymptoms: [
                    { category: 'sleep', isPrimary: true, severity: 'moderate', duration: '1-3-months' },
                ],
            } as unknown as WellnessProfile['questionnaire'],
        });
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        const assessmentAction = actions.find(a => a.id.startsWith('assess-'));
        expect(assessmentAction).toBeDefined();
        expect(assessmentAction!.dimensionKey).toBe('sleepQuality');
    });

    it('includes continue action when user has current course', () => {
        const profile = buildMockProfile({
            progress: {
                ...buildMockProfile().progress,
                currentCourse: 'anxiety-management',
                completedLessons: { 'anxiety-management': ['1'] },
            },
        });
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        const continueAction = actions.find(a => a.id.startsWith('continue-'));
        expect(continueAction).toBeDefined();
        expect(continueAction!.source).toBe('practice');
        expect(continueAction!.urgency).toBe('primary');
    });

    it('uses warm, non-clinical language for titles', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);

        for (const action of actions) {
            // No clinical jargon in user-facing titles
            expect(action.title).not.toMatch(/GAD-7|PHQ-9|PSQI|PDSS|SPIN/i);
            expect(action.title).not.toMatch(/Take.*Assessment/i);
        }
    });

    it('assigns correct source badge labels', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);

        for (const action of actions) {
            expect(['Quick Check-in', 'Practice', 'Explore', 'Coaching']).toContain(action.badgeLabel);
        }
    });

    it('provides actions even for a fully empty profile', () => {
        const profile = buildMockProfile();
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        // Should have at least the coach action
        expect(actions.length).toBeGreaterThanOrEqual(1);
        expect(actions.some(a => a.source === 'talk-to-coach')).toBe(true);
    });

    it('includes reassess action when assessment is stale + lessons completed', () => {
        const eightDaysAgo = new Date(Date.now() - 8 * 86_400_000).toISOString();
        // Use sleep dimension so the reassess href (/academy/sleep-mastery)
        // doesn't collide with slot 1's assessment prompt href
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({
                    assessmentId: 'psqi-sleep-quality',
                    courseId: 'sleep-mastery',
                    lessonId: '2',
                    totalScore: 10,
                    maxScore: 36,
                    completedAt: eightDaysAgo,
                }),
            ]),
            progress: {
                ...buildMockProfile().progress,
                completedLessons: { 'sleep-insomnia': ['1', '2', '3', '4'] },
            },
        });
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);
        const reassess = actions.find(a => a.id.startsWith('reassess-'));
        expect(reassess).toBeDefined();
        expect(reassess!.source).toBe('quick-checkin');
    });

    it('each action has all required fields', () => {
        const profile = buildMockProfile({
            assessment: buildAssessmentBlock([
                buildAssessmentResult({ assessmentId: 'gad7', totalScore: 7 }),
            ]),
        });
        const scores = computeDimensionScores(profile);
        const actions = buildWellnessActions(profile, scores);

        for (const action of actions) {
            expect(action.id).toBeTruthy();
            expect(action.title).toBeTruthy();
            expect(action.description).toBeTruthy();
            expect(action.href).toBeTruthy();
            expect(action.durationLabel).toBeTruthy();
            expect(action.badgeLabel).toBeTruthy();
            expect(['primary', 'secondary']).toContain(action.urgency);
            expect(['quick-checkin', 'practice', 'deep-dive', 'talk-to-coach']).toContain(action.source);
        }
    });
});
