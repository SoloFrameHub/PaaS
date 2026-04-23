/**
 * Profile Service
 * Facade for profile-related operations, delegating to specialized services.
 * Part of the "Best in Class" architectural improvement.
 */

import { profileCoreService } from './profileCoreService';
import { profileContextService } from './profileContextService';
import { onboardingService } from './onboardingService';
import { profileRepository } from '@/lib/repositories/profileRepository';
import { masterDataRepository } from '@/lib/repositories/masterDataRepositoryFactory';
import { FounderProfile } from '@/types/profile';
import { FounderCategory, Industry, ClientRole } from '@/types/roleplay';
import { logger } from '@/lib/logger';

export class ProfileService {
    // Delegated Methods - Using proper method wrappers for better testability/spying
    async getOrCreateProfile(userId: string, email: string) {
        return profileCoreService.getOrCreateProfile(userId, email);
    }

    async getProfile(userId: string) {
        return profileCoreService.getProfile(userId);
    }

    async updateProfile(userId: string, updates: Record<string, any>) {
        return profileCoreService.updateProfile(userId, updates);
    }

    async updateProgress(userId: string, update: any) {
        return profileCoreService.updateProgress(userId, update);
    }

    async saveArtifact(userId: string, artifactType: string, data: Record<string, any>, courseNumber: number) {
        return profileCoreService.saveArtifact(userId, artifactType, data, courseNumber);
    }

    getSafeContext(profile: FounderProfile, options: any = {}) {
        return profileContextService.getSafeContext(profile, options);
    }

    async getExpandedProfile(userId: string) {
        const profile = await this.getProfile(userId);
        if (!profile) return null;

        try {
            const founderCategoryId = profile.questionnaire?.founder_description || 'reluctant_seller';
            const industryId = profile.questionnaire?.industry || 'saas_startup';
            const roleIds = Array.isArray(profile.questionnaire?.target_roles) ? profile.questionnaire.target_roles : [];

            // Robust fetching of master data
            const [founderCategory, industry, targetRoles] = await Promise.all([
                masterDataRepository.getFounderCategoryById(founderCategoryId).catch(() => null),
                masterDataRepository.getIndustryById(industryId).catch(() => null),
                Promise.all(roleIds.map(id => masterDataRepository.getClientRoleById(id).catch(() => null)))
            ]);

            return {
                profile,
                founderCategory,
                industry,
                targetRoles: targetRoles.filter((r): r is ClientRole => r !== null)
            };
        } catch (error) {
            logger.error('Error expanding profile context', { error });
            // Fallback: return profile with empty context
            return {
                profile,
                founderCategory: null,
                industry: null,
                targetRoles: []
            };
        }
    }

    // Onboarding Delegations
    async saveBusinessInfo(userId: string, data: any) {
        return onboardingService.saveBusinessInfo(userId, data);
    }

    async saveGoalInfo(userId: string, data: any) {
        return onboardingService.saveGoalInfo(userId, data);
    }

    async saveInferredContext(userId: string, inferred: any) {
        return onboardingService.saveInferredContext(userId, inferred);
    }

    async saveLinkedinAnalysis(userId: string, analysis: any) {
        return onboardingService.saveLinkedinAnalysis(userId, analysis);
    }

    async saveAssessment(userId: string, assessment: any) {
        return onboardingService.saveAssessment(userId, assessment);
    }

    async updateDocumentAnalysis(userId: string, documentId: string, extraction: any) {
        return onboardingService.updateDocumentAnalysis(userId, documentId, extraction);
    }

    async addDocument(userId: string, document: any): Promise<void> {
        const profile = await this.getProfile(userId);
        if (!profile) {
            throw new Error(`Cannot add document: profile not found for user ${userId}`);
        }
        // Deduplicate by fileName — replace existing doc with same name instead of appending
        const existing = profile.documents || [];
        const filtered = existing.filter((d: any) => d.fileName !== document.fileName);
        const documents = [...filtered, document];
        await profileRepository.update(userId, {
            documents,
            updatedAt: new Date().toISOString()
        });
    }

    async removeDocument(userId: string, documentId: string): Promise<void> {
        const profile = await this.getProfile(userId);
        if (!profile) {
            throw new Error(`Cannot remove document: profile not found for user ${userId}`);
        }
        const documents = (profile.documents || []).filter((d: any) => d.id !== documentId);
        await profileRepository.update(userId, {
            documents,
            updatedAt: new Date().toISOString()
        });
    }

    compressContext(profile: FounderProfile) {
        return this.getSafeContext(profile, { ultraLean: true });
    }
}

export const profileService = new ProfileService();
