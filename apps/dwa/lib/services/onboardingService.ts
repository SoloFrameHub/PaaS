import { profileRepository } from '@/lib/repositories/profileRepository';
import type {
    WellnessProfile,
    WellnessAssessment,
    CrisisScreening,
    SymptomSelection,
    WellnessGoal,
} from '@/types/wellness-profile';
import { SYMPTOM_COURSE_MAPPING } from '@/types/wellness-profile';

/**
 * Specialized service for wellness onboarding operations.
 * Handles symptom selection, crisis screening, and assessment.
 */
export class OnboardingService {
    /**
     * Save user's symptom selections
     */
    async saveSymptomSelection(
        userId: string,
        data: {
            primarySymptoms: SymptomSelection[];
            otherSymptomDescription?: string;
        }
    ): Promise<void> {
        const updates: Record<string, unknown> = {
            'questionnaire.primarySymptoms': data.primarySymptoms,
        };
        if (data.otherSymptomDescription !== undefined) {
            updates['questionnaire.otherSymptomDescription'] = data.otherSymptomDescription;
        }
        await profileRepository.update(userId, updates);
    }

    /**
     * Save user's wellness goals
     */
    async saveWellnessGoals(
        userId: string,
        data: {
            goals: WellnessGoal[];
            personalGoalDescription?: string;
            learningStyle?: string;
            timeCommitment?: string;
        }
    ): Promise<void> {
        const updates: Record<string, unknown> = {};

        if (data.goals !== undefined) updates['questionnaire.wellnessGoals'] = data.goals;
        if (data.personalGoalDescription !== undefined) updates['questionnaire.personalGoalDescription'] = data.personalGoalDescription;
        if (data.learningStyle !== undefined) updates['questionnaire.learningStyle'] = data.learningStyle;
        if (data.timeCommitment !== undefined) updates['questionnaire.timeCommitment'] = data.timeCommitment;

        await profileRepository.update(userId, updates);
    }

    /**
     * Save user's life situation and social support info
     */
    async saveAboutYou(
        userId: string,
        data: {
            ageRange?: string;
            lifeStage?: string;
            livingSituation?: string;
            supportNetworkStrength?: string;
            hasTrustedPerson?: boolean | null;
            comfortWithGroupActivities?: string;
        }
    ): Promise<void> {
        const updates: Record<string, unknown> = {};

        if (data.ageRange !== undefined) updates['questionnaire.ageRange'] = data.ageRange;
        if (data.lifeStage !== undefined) updates['questionnaire.lifeStage'] = data.lifeStage;
        if (data.livingSituation !== undefined) updates['questionnaire.livingSituation'] = data.livingSituation;
        if (data.supportNetworkStrength !== undefined) updates['questionnaire.supportNetworkStrength'] = data.supportNetworkStrength;
        if (data.hasTrustedPerson !== undefined) updates['questionnaire.hasTrustedPerson'] = data.hasTrustedPerson;
        if (data.comfortWithGroupActivities !== undefined) updates['questionnaire.comfortWithGroupActivities'] = data.comfortWithGroupActivities;

        await profileRepository.update(userId, updates);
    }

    /**
     * Save user's coping history, triggers, and patterns
     */
    async saveYourExperience(
        userId: string,
        data: {
            currentCopingStrategies?: string[];
            unhealthyCopingToChange?: string[];
            therapyHistory?: string;
            previousSelfHelpExperience?: boolean | null;
            knownTriggers?: string[];
            worstTimeOfDay?: string;
        }
    ): Promise<void> {
        const updates: Record<string, unknown> = {};

        if (data.currentCopingStrategies !== undefined) updates['questionnaire.currentCopingStrategies'] = data.currentCopingStrategies;
        if (data.unhealthyCopingToChange !== undefined) updates['questionnaire.unhealthyCopingToChange'] = data.unhealthyCopingToChange;
        if (data.therapyHistory !== undefined) updates['questionnaire.therapyHistory'] = data.therapyHistory;
        if (data.previousSelfHelpExperience !== undefined) updates['questionnaire.previousSelfHelpExperience'] = data.previousSelfHelpExperience;
        if (data.knownTriggers !== undefined) updates['questionnaire.knownTriggers'] = data.knownTriggers;
        if (data.worstTimeOfDay !== undefined) updates['questionnaire.worstTimeOfDay'] = data.worstTimeOfDay;

        await profileRepository.update(userId, updates);
    }

    /**
     * Save user's free-text reflections
     */
    async saveInYourWords(
        userId: string,
        data: {
            goodDayDescription?: string;
            biggestChallenge?: string;
            hopedSupportDescription?: string;
            personalPatterns?: string;
            anythingElse?: string;
        }
    ): Promise<void> {
        const updates: Record<string, unknown> = {};

        if (data.goodDayDescription !== undefined) updates['questionnaire.goodDayDescription'] = data.goodDayDescription;
        if (data.biggestChallenge !== undefined) updates['questionnaire.biggestChallenge'] = data.biggestChallenge;
        if (data.hopedSupportDescription !== undefined) updates['questionnaire.hopedSupportDescription'] = data.hopedSupportDescription;
        if (data.personalPatterns !== undefined) updates['questionnaire.personalPatterns'] = data.personalPatterns;
        if (data.anythingElse !== undefined) updates['questionnaire.anythingElse'] = data.anythingElse;

        await profileRepository.update(userId, updates);
    }

    /**
     * Save crisis screening results - critical for safety
     */
    async saveCrisisScreening(
        userId: string,
        crisisScreening: CrisisScreening
    ): Promise<void> {
        await profileRepository.update(userId, {
            'questionnaire.crisisScreeningCompleted': true,
            'questionnaire.crisisScreeningResult': crisisScreening,
            has988Acknowledged: crisisScreening.acknowledged988Resources,
            lastCrisisScreeningAt: crisisScreening.screenedAt,
        });
    }

    /**
     * Save wellness assessment results
     */
    async saveAssessment(
        userId: string,
        assessment: Omit<WellnessAssessment, 'generatedAt'>
    ): Promise<void> {
        await profileRepository.update(userId, {
            assessment: { ...assessment, generatedAt: new Date().toISOString() },
        });
    }

    /**
     * Mark onboarding as complete
     */
    async completeOnboarding(userId: string): Promise<void> {
        await profileRepository.update(userId, {
            onboardingCompleted: true,
            onboardingCompletedAt: new Date().toISOString(),
            'questionnaire.completedAt': new Date().toISOString(),
        });
    }

    /**
     * Save user's basic info during onboarding
     */
    async saveBasicInfo(
        userId: string,
        data: {
            name?: string;
            displayName?: string;
        }
    ): Promise<void> {
        const updates: Record<string, unknown> = {};

        if (data.name !== undefined) updates.name = data.name;
        if (data.displayName !== undefined) updates.displayName = data.displayName;

        await profileRepository.update(userId, updates);
    }

    /**
     * Calculate recommended courses based on symptom selections
     */
    calculateRecommendedCourses(symptoms: SymptomSelection[]): string[] {
        const courseScores: Record<string, number> = {};

        for (const symptom of symptoms) {
            const courses = SYMPTOM_COURSE_MAPPING[symptom.category] || [];
            const severityMultiplier = symptom.severity === 'severe' ? 3 : symptom.severity === 'moderate' ? 2 : 1;
            const primaryMultiplier = symptom.isPrimary ? 2 : 1;

            for (const course of courses) {
                courseScores[course] = (courseScores[course] || 0) + severityMultiplier * primaryMultiplier;
            }
        }

        // Sort by score and return top courses
        return Object.entries(courseScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([course]) => course);
    }

    /**
     * Evaluate crisis risk level based on screening responses
     */
    evaluateCrisisRisk(screening: {
        hasCurrentSuicidalThoughts: boolean;
        hasSelfHarmThoughts: boolean;
        hasImmediateDangerConcern: boolean;
        hasPlanOrMeans: boolean;
    }): CrisisScreening['riskLevel'] {
        // Immediate crisis indicators
        if (screening.hasPlanOrMeans || screening.hasImmediateDangerConcern) {
            return 'immediate';
        }

        // High risk
        if (screening.hasCurrentSuicidalThoughts && screening.hasSelfHarmThoughts) {
            return 'high';
        }

        // Moderate risk
        if (screening.hasCurrentSuicidalThoughts || screening.hasSelfHarmThoughts) {
            return 'moderate';
        }

        // Low risk - some concerning but not immediate
        if (screening.hasImmediateDangerConcern) {
            return 'low';
        }

        return 'none';
    }

    /**
     * Calculate GAD-7 severity from scores
     */
    calculateGAD7Severity(totalScore: number): 'minimal' | 'mild' | 'moderate' | 'severe' {
        if (totalScore <= 4) return 'minimal';
        if (totalScore <= 9) return 'mild';
        if (totalScore <= 14) return 'moderate';
        return 'severe';
    }

    /**
     * Calculate PHQ-9 severity from scores
     */
    calculatePHQ9Severity(totalScore: number): 'minimal' | 'mild' | 'moderate' | 'moderately-severe' | 'severe' {
        if (totalScore <= 4) return 'minimal';
        if (totalScore <= 9) return 'mild';
        if (totalScore <= 14) return 'moderate';
        if (totalScore <= 19) return 'moderately-severe';
        return 'severe';
    }
}

export const onboardingService = new OnboardingService();

// Export helper functions for use in API routes
export const calculateRecommendedCourses = onboardingService.calculateRecommendedCourses.bind(onboardingService);
export const evaluateCrisisRisk = onboardingService.evaluateCrisisRisk.bind(onboardingService);
export const calculateGAD7Severity = onboardingService.calculateGAD7Severity.bind(onboardingService);
export const calculatePHQ9Severity = onboardingService.calculatePHQ9Severity.bind(onboardingService);
