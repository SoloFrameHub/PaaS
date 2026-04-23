/**
 * Profile Service
 * Facade for profile-related operations, delegating to specialized services.
 * Adapted for Wellness Academy platform.
 */

import { profileCoreService } from './profileCoreService';
import { profileContextService } from './profileContextService';
import { onboardingService } from './onboardingService';
import type {
    WellnessProfile,
    WellnessAssessment,
    CrisisScreening,
    SymptomSelection,
    WellnessGoal
} from '@/types/wellness-profile';

// Backward compatibility alias
type FounderProfile = WellnessProfile;

export class ProfileService {
    // Delegated Methods - Using proper method wrappers for better testability/spying
    async getOrCreateProfile(userId: string, email: string) {
        return profileCoreService.getOrCreateProfile(userId, email);
    }

    async getProfile(userId: string) {
        return profileCoreService.getProfile(userId);
    }

    async updateProfile(userId: string, updates: Record<string, unknown>) {
        return profileCoreService.updateProfile(userId, updates);
    }

    async updateProgress(userId: string, update: {
        completedCourse?: string;
        completedLesson?: { courseId: string; lessonId: string };
        currentCourse?: string;
        xpEarned?: number;
        badge?: string;
    }) {
        return profileCoreService.updateProgress(userId, update);
    }

    getSafeContext(profile: WellnessProfile) {
        return profileContextService.getSafeContext(profile);
    }

    /**
     * Get profile with expanded wellness context
     */
    async getExpandedProfile(userId: string) {
        const profile = await this.getProfile(userId);
        if (!profile) return null;

        // Extract primary symptoms and recommendations
        const primarySymptoms = profile.questionnaire?.primarySymptoms?.filter(s => s.isPrimary) || [];
        const recommendedCourses = profile.assessment?.recommendedCourses || [];

        return {
            profile,
            primarySymptoms,
            recommendedCourses,
            wellnessScore: profile.assessment?.overallWellnessScore || null,
        };
    }

    // Onboarding Delegations - Updated for wellness flow
    async saveBasicInfo(userId: string, data: { name?: string; displayName?: string }) {
        return onboardingService.saveBasicInfo(userId, data);
    }

    async saveSymptomSelection(userId: string, data: { primarySymptoms: SymptomSelection[]; otherSymptomDescription?: string }) {
        return onboardingService.saveSymptomSelection(userId, data);
    }

    async saveWellnessGoals(userId: string, data: { goals: WellnessGoal[]; personalGoalDescription?: string; learningStyle?: string; timeCommitment?: string }) {
        return onboardingService.saveWellnessGoals(userId, data);
    }

    async saveCrisisScreening(userId: string, crisisScreening: CrisisScreening) {
        return onboardingService.saveCrisisScreening(userId, crisisScreening);
    }

    async saveAboutYou(userId: string, data: {
        ageRange?: string; lifeStage?: string; livingSituation?: string;
        supportNetworkStrength?: string; hasTrustedPerson?: boolean | null;
        comfortWithGroupActivities?: string;
    }) {
        return onboardingService.saveAboutYou(userId, data);
    }

    async saveYourExperience(userId: string, data: {
        currentCopingStrategies?: string[]; unhealthyCopingToChange?: string[];
        therapyHistory?: string; previousSelfHelpExperience?: boolean | null;
        knownTriggers?: string[]; worstTimeOfDay?: string;
    }) {
        return onboardingService.saveYourExperience(userId, data);
    }

    async saveInYourWords(userId: string, data: {
        goodDayDescription?: string; biggestChallenge?: string;
        hopedSupportDescription?: string; personalPatterns?: string;
        anythingElse?: string;
    }) {
        return onboardingService.saveInYourWords(userId, data);
    }

    async saveAssessment(userId: string, assessment: Omit<WellnessAssessment, 'generatedAt'>) {
        return onboardingService.saveAssessment(userId, assessment);
    }

    async completeOnboarding(userId: string) {
        return onboardingService.completeOnboarding(userId);
    }

    /**
     * @deprecated Use specific methods instead
     */
    compressContext(profile: FounderProfile) {
        return this.getSafeContext(profile);
    }
}

export const profileService = new ProfileService();
