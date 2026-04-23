import { describe, it, expect, vi, beforeEach } from 'vitest';
import { profileCoreService } from './profileCoreService';

vi.mock('@/lib/repositories/profileRepository', () => ({
    profileRepository: {
        getById: vi.fn(),
        save: vi.fn(),
        update: vi.fn(),
    }
}));

import { profileRepository } from '@/lib/repositories/profileRepository';

const mockGetById = profileRepository.getById as ReturnType<typeof vi.fn>;
const mockSave = profileRepository.save as ReturnType<typeof vi.fn>;
const mockUpdate = profileRepository.update as ReturnType<typeof vi.fn>;

const makeProfile = (overrides: Record<string, any> = {}) => ({
    id: 'user-1',
    userId: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    businessName: '',
    websiteUrl: null,
    stage: null,
    businessModel: null,
    primaryGoal: null,
    biggestChallenge: null,
    elevatorPitch: null,
    targetAudience: null,
    linkedinUrl: null,
    onboardingCompleted: false,
    onboardingCompletedAt: null,
    profileVersion: 2,
    inferred: { icpSummary: null, valueProposition: null, competitivePositioning: null, pricingStructure: null, industryVertical: null, commonObjections: [], typicalUseCases: [], voiceSample: null, competitorMentions: [], confidence: { icpClarity: 0, positioningStrength: 0, messagingConsistency: 0, valueArticulation: 0 }, extractedFrom: { websiteAnalyzedAt: null, linkedinAnalyzedAt: null, documentsAnalyzed: [], lastUpdated: '' } },
    documents: [],
    artifacts: {},
    assessment: null,
    progress: { completedCourses: [], completedLessons: {}, currentCourse: null, xpTotal: 0, badges: [], lastActivityAt: '' },
    questionnaire: {},
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    ...overrides,
});

describe('ProfileCoreService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getOrCreateProfile', () => {
        it('should return existing profile when found', async () => {
            const existing = makeProfile();
            mockGetById.mockResolvedValue(existing);

            const result = await profileCoreService.getOrCreateProfile('user-1', 'test@example.com');

            expect(result.id).toBe('user-1');
            expect(mockSave).not.toHaveBeenCalled();
        });

        it('should create and save a new profile when not found', async () => {
            mockGetById.mockResolvedValue(null);

            const result = await profileCoreService.getOrCreateProfile('user-2', 'new@example.com');

            expect(mockSave).toHaveBeenCalledWith('user-2', expect.objectContaining({
                userId: 'user-2',
                email: 'new@example.com',
            }));
            expect(result.email).toBe('new@example.com');
        });
    });

    describe('getProfile', () => {
        it('should return null when profile not found', async () => {
            mockGetById.mockResolvedValue(null);
            const result = await profileCoreService.getProfile('nonexistent');
            expect(result).toBeNull();
        });

        it('should migrate old profile versions', async () => {
            const oldProfile = makeProfile({ profileVersion: 1, progress: undefined });
            mockGetById.mockResolvedValue(oldProfile);

            const result = await profileCoreService.getProfile('user-1');

            expect(result!.profileVersion).toBe(2);
            expect(result!.progress).toBeDefined();
            expect(result!.progress.completedCourses).toEqual([]);
        });
    });

    describe('updateProgress', () => {
        it('should add XP to existing total', async () => {
            mockGetById.mockResolvedValue(makeProfile({ progress: { completedCourses: [], completedLessons: {}, currentCourse: null, xpTotal: 100, badges: [], lastActivityAt: '' } }));

            await profileCoreService.updateProgress('user-1', { xpEarned: 50 });

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                'progress.xpTotal': 150,
            }));
        });

        it('should add completed lesson without duplicates', async () => {
            mockGetById.mockResolvedValue(makeProfile({
                progress: { completedCourses: [], completedLessons: { 'course-1': ['lesson-1'] }, currentCourse: null, xpTotal: 0, badges: [], lastActivityAt: '' },
            }));

            await profileCoreService.updateProgress('user-1', { completedLesson: { courseId: 'course-1', lessonId: 'lesson-2' } });

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                'progress.completedLessons.course-1': ['lesson-1', 'lesson-2'],
            }));
        });

        it('should skip duplicate completed lesson', async () => {
            mockGetById.mockResolvedValue(makeProfile({
                progress: { completedCourses: [], completedLessons: { 'course-1': ['lesson-1'] }, currentCourse: null, xpTotal: 0, badges: [], lastActivityAt: '' },
            }));

            await profileCoreService.updateProgress('user-1', { completedLesson: { courseId: 'course-1', lessonId: 'lesson-1' } });

            const updateArg = mockUpdate.mock.calls[0][1];
            expect(updateArg).not.toHaveProperty('progress.completedLessons.course-1');
        });
    });
});
