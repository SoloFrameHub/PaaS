import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

const mockGetServerSession = vi.fn();
vi.mock('@/lib/auth', () => ({
    getServerSession: () => mockGetServerSession(),
}));

const mockCalculateFounderCategory = vi.fn();
const mockCalculateDiscProfile = vi.fn();
vi.mock('@/lib/services/onboardingService', () => ({
    onboardingService: {
        calculateFounderCategory: (...args: any[]) => mockCalculateFounderCategory(...args),
        calculateDiscProfile: (...args: any[]) => mockCalculateDiscProfile(...args),
    },
}));

vi.mock('@/lib/services/profileService', () => ({
    profileService: {
        updateProfile: vi.fn().mockResolvedValue(undefined),
    },
}));

import { profileService } from '@/lib/services/profileService';

describe('API Route: /api/onboarding/complete-assessment', () => {
    const mockUserId = 'test-user-123';

    const validBody = {
        categoryAnswers: {
            q1: "I should make the product better first",
            q2: "I'm a developer/engineer by trade",
        },
        businessContext: {
            industry: 'saas',
            company_stage: 'early-revenue',
            target_customer_type: 'b2b',
            typical_deal_size: 'mid_market',
            target_roles: ['cto', 'vp_engineering'],
        },
        discAnswers: {
            disc1: 'D',
            disc2: 'I',
            disc3: 'S',
            disc4: 'C',
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });
        mockCalculateFounderCategory.mockReturnValue({ category_id: 'technical_purist', confidence: 80 });
        mockCalculateDiscProfile.mockReturnValue({ primary: 'D', secondary: 'I' });
    });

    it('should calculate founder category and DISC profile', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify(validBody),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.success).toBe(true);
        expect(mockCalculateFounderCategory).toHaveBeenCalledWith(validBody.categoryAnswers);
        expect(mockCalculateDiscProfile).toHaveBeenCalledWith(validBody.discAnswers);
    });

    it('should save calculated results to profile', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify(validBody),
        });

        await POST(req, { params: Promise.resolve({}) });

        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
            'questionnaire.founder_description': 'technical_purist',
            'questionnaire.founder_confidence': 80,
            'questionnaire.disc_profile': { primary: 'D', secondary: 'I' },
            industry: 'saas',
            stage: 'early-revenue',
            targetAudience: 'b2b',
            'questionnaire.target_roles': ['cto', 'vp_engineering'],
        }));
    });

    it('should NOT set onboardingCompleted (done in /complete route)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify(validBody),
        });

        await POST(req, { params: Promise.resolve({}) });

        const call = (profileService.updateProfile as any).mock.calls[0][1];
        expect(call).not.toHaveProperty('onboardingCompleted');
        expect(call).not.toHaveProperty('onboardingCompletedAt');
    });

    it('should reject missing categoryAnswers', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify({
                businessContext: validBody.businessContext,
                discAnswers: validBody.discAnswers,
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject missing businessContext', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify({
                categoryAnswers: validBody.categoryAnswers,
                discAnswers: validBody.discAnswers,
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject empty target_roles in businessContext', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify({
                ...validBody,
                businessContext: { ...validBody.businessContext, target_roles: [] },
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject invalid company_stage', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify({
                ...validBody,
                businessContext: { ...validBody.businessContext, company_stage: 'invalid' },
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should return 401 when not authenticated', async () => {
        mockGetServerSession.mockResolvedValue(null);

        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify(validBody),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(401);
    });

    it('should handle null secondary DISC type', async () => {
        mockCalculateDiscProfile.mockReturnValue({ primary: 'C', secondary: null });

        const req = new NextRequest('http://localhost/api/onboarding/complete-assessment', {
            method: 'POST',
            body: JSON.stringify(validBody),
        });

        await POST(req, { params: Promise.resolve({}) });

        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
            'questionnaire.disc_profile': { primary: 'C', secondary: null },
        }));
    });
});
