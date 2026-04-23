import type { WellnessProfile } from '@/types/wellness-profile';

/**
 * E2E Test Data Fixtures
 * Provides realistic test user data for the wellness platform
 */

const now = new Date().toISOString();

/**
 * Generate userId in the same format as mock authentication
 * Mock auth creates userId as: `mock-${email.replace(/[^a-zA-Z0-9]/g, '')}`
 */
const createMockUserId = (email: string) => `mock-${email.replace(/[^a-zA-Z0-9]/g, '')}`;

/**
 * Base wellness profile template with all required fields
 */
const createBaseProfile = (email: string, overrides: Partial<WellnessProfile> = {}): WellnessProfile => {
    const userId = createMockUserId(email);

    return {
        id: userId,
        userId,
        name: 'Test User',
        email,
        onboardingCompleted: false,
        onboardingCompletedAt: null,
        profileVersion: 2,
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
            lastActivityAt: now,
        },
        preferences: {
            emailReminders: false,
        },
        has988Acknowledged: false,
        createdAt: now,
        updatedAt: now,
        ...overrides,
    };
};

/**
 * Test user with completed onboarding (full wellness profile)
 */
export const completedOnboardingUser = {
    email: 'test@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Alex Thompson',
            displayName: 'Alex',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            questionnaire: {
                primarySymptoms: [
                    { category: 'anxiety', severity: 'moderate', duration: '1-3-months', isPrimary: true },
                    { category: 'sleep', severity: 'mild', duration: '2-4-weeks', isPrimary: false },
                ],
                otherSymptomDescription: '',
                symptomDuration: '1-3-months',
                impactOnDailyLife: 'somewhat',
                currentlyReceivingTreatment: false,
                wellnessGoals: ['reduce-anxiety', 'sleep-better', 'develop-coping-skills'],
                personalGoalDescription: 'I want to feel more at peace',
                learningStyle: 'guided',
                timeCommitment: '15-20-min',
                preferredContentTypes: ['reading', 'interactive'],
                crisisScreeningCompleted: true,
                completedAt: now,
            },
            assessment: {
                overallWellnessScore: 55,
                anxietyScore: 40,
                moodScore: 60,
                sleepScore: 45,
                stressScore: 50,
                recommendedCourses: ['understanding-anxiety', 'cbt-basics', 'sleep-hygiene'],
                recommendedStartCourse: 'understanding-anxiety',
                priorityFocus: ['anxiety'],
                personalizedInsight: 'Focus on anxiety management techniques',
                strengthsIdentified: ['Self-awareness', 'Motivation to improve'],
                areasForGrowth: ['Sleep hygiene', 'Anxiety management'],
                generatedAt: now,
            },
        });
    },
};

/**
 * Test user with incomplete onboarding
 */
export const incompleteOnboardingUser = {
    email: 'newuser@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: '',
            onboardingCompleted: false,
            onboardingCompletedAt: null,
        });
    },
};

/**
 * Test user with completed onboarding + expanded profile (new steps 5-7)
 */
export const expandedProfileUser = {
    email: 'expanded@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Jordan Lee',
            displayName: 'Jordan',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            questionnaire: {
                primarySymptoms: [
                    { category: 'stress', severity: 'moderate', duration: '3-6-months', isPrimary: true },
                ],
                symptomDuration: '3-6-months',
                impactOnDailyLife: 'significant',
                currentlyReceivingTreatment: false,
                wellnessGoals: ['manage-stress', 'improve-mood'],
                learningStyle: 'self-paced',
                timeCommitment: '5-10-min',
                preferredContentTypes: ['reading'],
                crisisScreeningCompleted: true,
                completedAt: now,
                // Expanded profile fields
                ageRange: '25-34',
                lifeStage: 'working',
                livingSituation: 'with-partner',
                supportNetworkStrength: 'moderate',
                hasTrustedPerson: true,
                comfortWithGroupActivities: 'prefer-individual',
                currentCopingStrategies: ['exercise', 'meditation'],
                unhealthyCopingToChange: ['avoidance'],
                therapyHistory: 'past',
                knownTriggers: ['work-school', 'financial'],
                worstTimeOfDay: 'evening',
                goodDayDescription: 'I wake up feeling rested and have energy throughout the day.',
                biggestChallenge: 'Work stress bleeds into my personal life.',
            },
            assessment: {
                overallWellnessScore: 45,
                anxietyScore: 55,
                moodScore: 50,
                sleepScore: 60,
                stressScore: 35,
                recommendedCourses: ['stress-management', 'mindfulness-basics'],
                recommendedStartCourse: 'stress-management',
                priorityFocus: ['stress'],
                personalizedInsight: 'Focus on work-life boundaries',
                strengthsIdentified: ['Has support network'],
                areasForGrowth: ['Stress management', 'Work-life balance'],
                generatedAt: now,
            },
        });
    },
};

/**
 * Test user with progress in courses
 */
export const userWithProgress = {
    email: 'progress@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Sam Rivera',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            questionnaire: {
                primarySymptoms: [
                    { category: 'depression', severity: 'moderate', duration: '3-6-months', isPrimary: true },
                ],
                symptomDuration: '3-6-months',
                impactOnDailyLife: 'significant',
                currentlyReceivingTreatment: false,
                wellnessGoals: ['improve-mood'],
                learningStyle: 'guided',
                timeCommitment: '15-20-min',
                preferredContentTypes: ['interactive'],
                crisisScreeningCompleted: true,
                completedAt: now,
            },
            assessment: {
                overallWellnessScore: 40,
                anxietyScore: 50,
                moodScore: 35,
                sleepScore: 55,
                stressScore: 45,
                recommendedCourses: ['understanding-depression', 'behavioral-activation', 'cbt-basics'],
                recommendedStartCourse: 'understanding-depression',
                priorityFocus: ['depression'],
                personalizedInsight: 'Building positive activities will help lift your mood',
                strengthsIdentified: ['Willingness to learn'],
                areasForGrowth: ['Mood management', 'Activity engagement'],
                generatedAt: now,
            },
            progress: {
                completedCourses: ['understanding-depression'],
                completedLessons: {
                    'understanding-depression': ['lesson-1', 'lesson-2', 'lesson-3'],
                    'behavioral-activation': ['lesson-1'],
                },
                currentCourse: 'behavioral-activation',
                xpTotal: 450,
                streakDays: 3,
                longestStreak: 7,
                badges: ['first-lesson', 'first-course'],
                techniquesPracticed: {},
                favoritesTechniques: [],
                moodEntries: [],
                techniquePractices: [],
                lastActivityAt: now,
            },
        });
    },
};

/**
 * Collection of all test users
 */
export const testUsers = {
    completed: completedOnboardingUser,
    incomplete: incompleteOnboardingUser,
    expanded: expandedProfileUser,
    withProgress: userWithProgress,
};

/**
 * Helper to generate a unique test user on the fly
 */
export const generateTestUser = (overrides: Partial<WellnessProfile> = {}) => {
    const timestamp = Date.now();
    const email = `test-${timestamp}@example.com`;

    return {
        email,
        password: 'TestPassword123!',
        get userId() { return createMockUserId(email); },
        get profile() {
            return createBaseProfile(email, {
                onboardingCompleted: true,
                onboardingCompletedAt: now,
                ...overrides,
            });
        },
    };
};
