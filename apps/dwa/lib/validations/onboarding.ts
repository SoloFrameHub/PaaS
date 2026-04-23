/**
 * Onboarding Zod schemas — SINGLE SOURCE OF TRUTH
 *
 * Both API routes and client pages import from here.
 * If you change what a client page sends, update the schema here
 * and the API route picks it up automatically (and vice versa).
 *
 * Rule: every field the client might send must be listed here.
 * If the client never sends a field, do NOT put it in the schema.
 */

import { z } from 'zod';

// ─── Shared enums (reused across schemas) ─────────────────────────

export const symptomCategoryEnum = z.enum([
    'anxiety', 'depression', 'sleep', 'panic', 'social-anxiety',
    'trauma', 'stress', 'ocd', 'anger', 'grief', 'other',
]);

export const severityEnum = z.enum(['mild', 'moderate', 'severe']);

export const wellnessGoalEnum = z.enum([
    'reduce-anxiety', 'improve-mood', 'sleep-better', 'manage-stress',
    'build-confidence', 'understand-feelings', 'develop-coping-skills',
    'improve-relationships', 'increase-motivation', 'practice-self-care',
    // Legacy aliases kept for backward compatibility
    'better-sleep', 'manage-panic', 'social-confidence', 'process-trauma',
    'manage-thoughts', 'anger-management', 'cope-with-grief',
    'general-wellness', 'learn-coping-skills',
]);

// ─── Step 1: Welcome / Basic Info ──────────────────────────────────

export const basicInfoSchema = z.object({
    name: z.string().max(100).optional(),
    displayName: z.string().max(100),
});

export type BasicInfoInput = z.infer<typeof basicInfoSchema>;

// ─── Step 2: Symptoms ──────────────────────────────────────────────

export const symptomsSchema = z.object({
    primarySymptoms: z.array(z.object({
        category: symptomCategoryEnum,
        severity: severityEnum,
        duration: z.enum([
            'less-than-2-weeks', '2-4-weeks', '1-3-months',
            '3-6-months', '6-12-months', 'more-than-1-year',
        ]).optional(),
        isPrimary: z.boolean(),
    })).max(20).default([]),
    otherSymptomDescription: z.string().max(500).optional(),
});

export type SymptomsInput = z.infer<typeof symptomsSchema>;

// ─── Step 3: Crisis / Safety Screening ─────────────────────────────

export const crisisScreeningSchema = z.object({
    hasCurrentSuicidalThoughts: z.boolean().default(false),
    hasSelfHarmThoughts: z.boolean().default(false),
    hasImmediateDangerConcern: z.boolean().default(false),
    hasPlanOrMeans: z.boolean().default(false),
    riskLevel: z.enum(['none', 'low', 'moderate', 'high', 'immediate']).default('none'),
    acknowledged988Resources: z.boolean().default(false),
    safetyPlanOffered: z.boolean().optional(),
});

export type CrisisScreeningInput = z.infer<typeof crisisScreeningSchema>;

// ─── Step 4: Goals ─────────────────────────────────────────────────

export const goalsSchema = z.object({
    goals: z.array(wellnessGoalEnum).max(10).default([]),
    personalGoalDescription: z.string().max(500).optional(),
    learningStyle: z.string().max(100).optional(),
    timeCommitment: z.string().max(100).optional(),
});

export type GoalsInput = z.infer<typeof goalsSchema>;

// ─── Step 5: About You ─────────────────────────────────────────────

export const aboutYouSchema = z.object({
    ageRange: z.string().max(50).optional(),
    lifeStage: z.string().max(100).optional(),
    livingSituation: z.string().max(100).optional(),
    supportNetworkStrength: z.string().max(100).optional(),
    hasTrustedPerson: z.boolean().nullable().optional(),
    comfortWithGroupActivities: z.string().max(100).optional(),
});

export type AboutYouInput = z.infer<typeof aboutYouSchema>;

// ─── Step 6: Your Experience ────────────────────────────────────────

export const yourExperienceSchema = z.object({
    currentCopingStrategies: z.array(z.string().max(200)).max(20).optional(),
    unhealthyCopingToChange: z.array(z.string().max(200)).max(20).optional(),
    therapyHistory: z.string().max(200).optional(),
    previousSelfHelpExperience: z.boolean().nullable().optional(),
    knownTriggers: z.array(z.string().max(200)).max(20).optional(),
    worstTimeOfDay: z.string().max(100).optional(),
});

export type YourExperienceInput = z.infer<typeof yourExperienceSchema>;

// ─── Step 7: In Your Words ─────────────────────────────────────────

export const inYourWordsSchema = z.object({
    goodDayDescription: z.string().max(2000).optional(),
    biggestChallenge: z.string().max(2000).optional(),
    hopedSupportDescription: z.string().max(2000).optional(),
    personalPatterns: z.string().max(2000).optional(),
    anythingElse: z.string().max(2000).optional(),
});

export type InYourWordsInput = z.infer<typeof inYourWordsSchema>;

// ─── Step 8: Assessment ─────────────────────────────────────────────

export const assessmentSchema = z.object({
    recommendedCourses: z.array(z.string().max(200)).max(30).default([]),
    priorityFocus: z.array(symptomCategoryEnum).max(10).default([]),
    overallWellnessScore: z.number().min(0).max(100).default(50),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;

// ─── Questionnaire (legacy, used by /api/onboarding/questionnaire) ──

export const questionnaireSchema = z.object({
    questionnaire: z.object({
        primarySymptoms: z.array(z.string()).default([]),
        wellnessGoals: z.array(z.string()).default([]),
        learning_style: z.string().default(''),
        time_commitment: z.string().default(''),
    })
});
