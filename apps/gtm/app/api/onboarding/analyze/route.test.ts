import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// --- Mocks ---

// Mock Cookie Store
const mockCookieStore = {
    get: vi.fn(),
};

vi.mock('next/headers', () => ({
    cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

// Mock server auth (used by withAuth)
const mockGetServerSession = vi.fn();
vi.mock('@/lib/auth', () => ({
    getServerSession: () => mockGetServerSession(),
}));

// Mock Profile Service
vi.mock('@/lib/services/profileService', () => ({
    profileService: {
        getOrCreateProfile: vi.fn(),
        getProfile: vi.fn(),
        updateProfile: vi.fn(),
        saveInferredContext: vi.fn(),
        saveLinkedinAnalysis: vi.fn(),
        saveAssessment: vi.fn(),
        getSafeContext: vi.fn(),
        addDocument: vi.fn(),
    },
}));

// Mock Profile Repository (used for atomic analysis lock)
vi.mock('@/lib/repositories/profileRepository', () => ({
    profileRepository: {
        acquireAnalysisLock: vi.fn().mockResolvedValue(true),
    },
}));

// Mock OpenAI flows and fetch helpers
const mockOpenaiWebsiteAnalysis = vi.fn();
const mockOpenaiLinkedinAnalysis = vi.fn();
const mockOpenaiRagIndexer = vi.fn();
const mockOpenaiAssessment = vi.fn();
vi.mock('@/lib/ai/openai-flows', () => ({
    openaiWebsiteAnalysis: (...args: unknown[]) => mockOpenaiWebsiteAnalysis(...args),
    openaiLinkedinAnalysis: (...args: unknown[]) => mockOpenaiLinkedinAnalysis(...args),
    openaiRagIndexer: (...args: unknown[]) => mockOpenaiRagIndexer(...args),
    openaiAssessment: (...args: unknown[]) => mockOpenaiAssessment(...args),
}));
vi.mock('@/lib/ai/fetch-helpers', () => ({
    fetchWebsiteText: vi.fn().mockResolvedValue('mock website text'),
    fetchLinkedinSnippet: vi.fn().mockResolvedValue({ title: '', description: '', rawSnippet: '' }),
}));

// Import mocked modules
import { profileService } from '@/lib/services/profileService';
import { profileRepository } from '@/lib/repositories/profileRepository';

describe('API Route: /api/onboarding/analyze', () => {
    const mockUserId = 'test-user-123';
    const mockProfile = {
        userId: mockUserId,
        analysisStatus: 'idle',
        businessName: 'Test Biz',
        businessModel: 'B2B',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        process.env.NEXT_PUBLIC_MOCK_AUTH = 'true';

        // Default: authenticated session (mock mode uses cookie; withAuth uses getServerSession)
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });
        mockCookieStore.get.mockReturnValue({
            value: JSON.stringify({ uid: mockUserId, email: 'test@example.com' })
        });

        // Setup default profile service responses
        (profileService.getOrCreateProfile as any).mockResolvedValue({ ...mockProfile });
        (profileService.getProfile as any).mockResolvedValue({ ...mockProfile });
        (profileService.getSafeContext as any).mockReturnValue({ ...mockProfile });
    });

    it('should return cached assessment if already completed', async () => {
        const completedProfile = { ...mockProfile, assessment: { overallReadiness: 80 }, onboardingCompleted: true };
        (profileService.getOrCreateProfile as any).mockResolvedValue(completedProfile);

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.fromCache).toBe(true);
        expect(data.data.assessment).toBeDefined();
        // profileService.updateProfile NOT called because no onboardingData provided
    });

    it('should handle "analyzing" state concurrency', async () => {
        // Simulate lock already held by another request
        (profileRepository.acquireAnalysisLock as any).mockResolvedValueOnce(false);

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(data.data.status).toBe('analyzing');
        expect(mockOpenaiAssessment).not.toHaveBeenCalled();
    });

    it('should run assessment flow when idle', async () => {
        // Mock flow output
        mockOpenaiAssessment.mockResolvedValue({
            overallReadiness: 90,
            recommendedPath: 'fast-track',
            scores: {},
            scoreReasoning: {},
            quickWins: [],
            criticalGaps: [],
            journeyMap: [],
            personalizedInsight: '',
            sourceAudits: [],
        });

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({ onboardingData: { companyName: 'New Name' } }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        // Lock is acquired atomically via profileRepository — status set to 'completed' after success
        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
            analysisStatus: 'completed'
        }));
        expect(profileService.saveAssessment).toHaveBeenCalled();
        expect(data.data.assessment.overallReadiness).toBe(90);
    });

    it('should trigger website analysis if URL provided', async () => {
        // Profile has website
        const websiteProfile = { ...mockProfile, websiteUrl: 'https://example.com' };
        (profileService.getOrCreateProfile as any).mockResolvedValue(websiteProfile);
        (profileService.getProfile as any).mockResolvedValue(websiteProfile); // Re-fetch returns website

        // Mock OpenAI flows
        mockOpenaiWebsiteAnalysis.mockResolvedValue({ analysis: 'good' });
        mockOpenaiAssessment.mockResolvedValue({
            overallReadiness: 10,
            recommendedPath: 'fast-track',
            scores: {},
            scoreReasoning: {},
            quickWins: [],
            criticalGaps: [],
            journeyMap: [],
            personalizedInsight: '',
            sourceAudits: [],
        });

        process.env.NEXT_PUBLIC_MOCK_AUTH = 'false';
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({ onboardingData: { website: 'https://example.com' } }),
        });

        await POST(req, { params: Promise.resolve({}) });

        expect(mockOpenaiWebsiteAnalysis).toHaveBeenCalled();
    });

    it('should use fallback mock assessment on flow failure', async () => {
        // Make flows fail
        mockOpenaiAssessment.mockRejectedValue(new Error('AI invalid'));

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.assessment).toBeDefined();
        // Check for fallback structure
        expect(data.data.assessment.scores.icpClarity).toBeDefined();
        expect(profileService.saveAssessment).toHaveBeenCalled(); // It saves the result even if fallback? 
        // Code says: if (assessment) { saveAssessment... }
        // runFlowWithFallback returns fallbackResult if fail.
        // So yes, it should save.
    });

    it('should throw error on flow failure when NOT in mock mode', async () => {
        process.env.NEXT_PUBLIC_MOCK_AUTH = 'false';
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });

        // Make flows fail
        mockOpenaiAssessment.mockRejectedValue(new Error('AI invalid'));

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        // Expect it to throw
        // Expect it to return 500
        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(500);

        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, { analysisStatus: 'failed' });
    });

    it('should handle unauthorized access', async () => {
        mockGetServerSession.mockResolvedValue(null);

        const req = new NextRequest('http://localhost/api/onboarding/analyze', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(401);
    });
});
