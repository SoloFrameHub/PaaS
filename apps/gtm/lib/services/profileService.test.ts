import { describe, it, expect, vi, beforeEach } from 'vitest';
import { profileService } from './profileService';

vi.mock('./profileCoreService', () => ({
    profileCoreService: {
        getOrCreateProfile: vi.fn(),
        getProfile: vi.fn(),
        updateProfile: vi.fn(),
        updateProgress: vi.fn(),
        saveArtifact: vi.fn(),
    }
}));

vi.mock('./profileContextService', () => ({
    profileContextService: {
        getSafeContext: vi.fn().mockReturnValue({ name: 'Test', businessName: 'Acme' }),
    }
}));

vi.mock('./onboardingService', () => ({
    onboardingService: {
        saveBusinessInfo: vi.fn(),
        saveGoalInfo: vi.fn(),
        saveInferredContext: vi.fn(),
        saveLinkedinAnalysis: vi.fn(),
        saveAssessment: vi.fn(),
        updateDocumentAnalysis: vi.fn(),
    }
}));

vi.mock('@/lib/repositories/profileRepository', () => ({
    profileRepository: {
        update: vi.fn(),
    }
}));

vi.mock('@/lib/repositories/masterDataRepositoryFactory', () => ({
    masterDataRepository: {
        getFounderCategoryById: vi.fn().mockResolvedValue({ id: 'reluctant_seller', name: 'Reluctant Seller' }),
        getIndustryById: vi.fn().mockResolvedValue({ id: 'saas_startup', name: 'SaaS Startup' }),
        getClientRoleById: vi.fn().mockResolvedValue({ id: 'cto', name: 'CTO' }),
    }
}));

import { profileCoreService } from './profileCoreService';
import { onboardingService } from './onboardingService';

const mockGetProfile = profileCoreService.getProfile as ReturnType<typeof vi.fn>;
const mockGetOrCreate = profileCoreService.getOrCreateProfile as ReturnType<typeof vi.fn>;

describe('ProfileService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('delegation', () => {
        it('should delegate getOrCreateProfile to profileCoreService', async () => {
            mockGetOrCreate.mockResolvedValue({ id: 'user-1' });

            const result = await profileService.getOrCreateProfile('user-1', 'test@example.com');

            expect(profileCoreService.getOrCreateProfile).toHaveBeenCalledWith('user-1', 'test@example.com');
            expect(result).toEqual({ id: 'user-1' });
        });

        it('should delegate saveBusinessInfo to onboardingService', async () => {
            await profileService.saveBusinessInfo('user-1', { name: 'Alice' });
            expect(onboardingService.saveBusinessInfo).toHaveBeenCalledWith('user-1', { name: 'Alice' });
        });
    });

    describe('getExpandedProfile', () => {
        it('should return null when no profile exists', async () => {
            mockGetProfile.mockResolvedValue(null);

            const result = await profileService.getExpandedProfile('nonexistent');

            expect(result).toBeNull();
        });

        it('should return profile with expanded master data', async () => {
            mockGetProfile.mockResolvedValue({
                id: 'user-1',
                questionnaire: {
                    founder_description: 'reluctant_seller',
                    industry: 'saas_startup',
                    target_roles: ['cto'],
                },
            });

            const result = await profileService.getExpandedProfile('user-1');

            expect(result).toBeDefined();
            expect(result!.profile.id).toBe('user-1');
            expect(result!.founderCategory).toEqual({ id: 'reluctant_seller', name: 'Reluctant Seller' });
            expect(result!.industry).toEqual({ id: 'saas_startup', name: 'SaaS Startup' });
            expect(result!.targetRoles).toHaveLength(1);
        });
    });

    describe('compressContext', () => {
        it('should return ultra-lean safe context', () => {
            const result = profileService.compressContext({ id: 'user-1' } as any);
            expect(result).toEqual({ name: 'Test', businessName: 'Acme' });
        });
    });
});
