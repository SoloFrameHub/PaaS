import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildRoleplayContext, saveRoleplaySession } from './roleplayService.server';
import { profileService } from './profileService';

// Mock Dependencies
vi.mock('./profileService', () => ({
    profileService: {
        getProfile: vi.fn(),
        updateProfile: vi.fn(),
        getSafeContext: vi.fn(() => ({ inferred: { ragSignals: 'mock-rag' } })),
    }
}));

vi.mock('@/lib/repositories/masterDataRepositoryFactory', () => ({
    masterDataRepository: {
        getFounderCategoryById: vi.fn(),
        getIndustryById: vi.fn(),
        getClientRoleById: vi.fn(),
        getDiscPatternById: vi.fn(),
    }
}));

vi.mock('@/lib/db', () => ({
    getDb: vi.fn(() => null),
    hasDatabase: vi.fn(() => false),
    schema: { roleplaySession: {} }
}));

import { masterDataRepository } from '@/lib/repositories/masterDataRepositoryFactory';

describe('RoleplayService Server', () => {
    const mockUserId = 'user-123';
    const mockIndustryId = 'saas';
    const mockRoleId = 'vp_sales_high_d';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('buildRoleplayContext', () => {
        it('should throw error if profile not found', async () => {
            (profileService.getProfile as any).mockResolvedValue(null);
            await expect(buildRoleplayContext(mockUserId, mockIndustryId, mockRoleId))
                .rejects.toThrow('Profile not found');
        });

        it('should build context correctly with all data present', async () => {
            const mockProfile = {
                userId: mockUserId,
                questionnaire: { founder_description: 'reluctant_seller' }
            };
            (profileService.getProfile as any).mockResolvedValue(mockProfile);

            (masterDataRepository.getFounderCategoryById as any).mockResolvedValue({
                name: 'Reluctant Seller',
                struggle_disc_types: [],
                default_difficulty: 'beginner'
            });
            (masterDataRepository.getIndustryById as any).mockResolvedValue({
                display_name: 'SaaS',
                scenario_templates: [],
                typical_company_sizes: [],
                pain_points: [],
                buying_triggers: []
            });
            (masterDataRepository.getClientRoleById as any).mockResolvedValue({
                display_name: 'VP Sales',
                seniority_level: 'vp'
            });
            (masterDataRepository.getDiscPatternById as any).mockResolvedValue({
                pattern: 'Drivers'
            });

            const context = await buildRoleplayContext(mockUserId, mockIndustryId, mockRoleId);

            expect(context.founder).toBeDefined();
            expect(context.industry).toBeDefined();
            expect(context.clientRole).toBeDefined();
            expect(context.difficulty).toBeDefined();
            expect(context.ragSignals).toBe('mock-rag');
        });
    });

    describe('saveRoleplaySession', () => {
        it('should update profile stats after session', async () => {
            const mockProfile = {
                progress: {
                    roleplayStats: {
                        totalSessions: 1,
                        avgScore: 80,
                        byDiscType: { 'D': { sessions: 1, avgScore: 80 } }
                    }
                }
            };
            (profileService.getProfile as any).mockResolvedValue(mockProfile);

            const sessionData = {
                industryId: mockIndustryId,
                roleId: mockRoleId,
                discType: 'D',
                transcript: [{ role: 'user' as const, content: 'Hello' }],
                evaluation: {
                    score: 90,
                    strengths: ['Clear'],
                    improvements: ['More empathy'],
                    coachingMessage: 'Good job'
                }
            };

            await saveRoleplaySession(mockUserId, sessionData);

            expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
                'progress.roleplayStats': expect.objectContaining({
                    totalSessions: 2,
                    avgScore: 85 // (80 + 90) / 2
                })
            }));
        });
    });
});
