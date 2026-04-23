import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

const mockGetServerSession = vi.fn();
vi.mock('@/lib/auth', () => ({
    getServerSession: () => mockGetServerSession(),
}));

vi.mock('@/lib/services/profileService', () => ({
    profileService: {
        getOrCreateProfile: vi.fn().mockResolvedValue({}),
        updateProfile: vi.fn().mockResolvedValue(undefined),
    },
}));

import { profileService } from '@/lib/services/profileService';

describe('API Route: /api/onboarding/questionnaire', () => {
    const mockUserId = 'test-user-123';

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });
    });

    it('should save a fully populated questionnaire', async () => {
        const questionnaire = {
            target_roles: ['cto', 'vp_engineering'],
            industry: 'saas',
            deal_size: 'mid_market',
            sales_journey: 'outreach',
            revenue_range: '0-10k',
            customer_count: '1-5',
            founder_description: 'tech',
            barriers: ['time', 'knowledge'],
            disc_answers: { disc1: 'D', disc2: 'I', disc3: 'S', disc4: 'C' },
            urgency: 'high',
            channels: ['linkedin', 'email'],
            time_commitment: '10-15',
            learning_style: 'aggressive',
            success_90_days: 'Close 5 enterprise deals',
            has_icp_docs: 'yes',
        };

        const req = new NextRequest('http://localhost/api/onboarding/questionnaire', {
            method: 'POST',
            body: JSON.stringify({ questionnaire }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.success).toBe(true);
        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, {
            questionnaire: expect.objectContaining({
                industry: 'saas',
                target_roles: ['cto', 'vp_engineering'],
            }),
        });
    });

    it('should accept minimal questionnaire (defaults applied)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/questionnaire', {
            method: 'POST',
            body: JSON.stringify({ questionnaire: {} }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);

        // Should call with defaults filled in
        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, {
            questionnaire: expect.objectContaining({
                target_roles: [],
                industry: '',
                disc_answers: {},
                barriers: [],
                channels: [],
            }),
        });
    });

    it('should save creator economy fields', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/questionnaire', {
            method: 'POST',
            body: JSON.stringify({
                questionnaire: {
                    creator_offer_type: 'cohort',
                    creator_price_point: '997',
                    creator_acquisition: ['organic', 'paid'],
                    creator_platforms: ['youtube', 'twitter'],
                    creator_email_list_size: '5000',
                    creator_sales_call_status: 'active',
                    creator_has_value_ladder: 'yes',
                    creator_launch_model: 'evergreen',
                },
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);

        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, {
            questionnaire: expect.objectContaining({
                creator_offer_type: 'cohort',
                creator_platforms: ['youtube', 'twitter'],
            }),
        });
    });

    it('should reject missing questionnaire key', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/questionnaire', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should return 401 when not authenticated', async () => {
        mockGetServerSession.mockResolvedValue(null);

        const req = new NextRequest('http://localhost/api/onboarding/questionnaire', {
            method: 'POST',
            body: JSON.stringify({ questionnaire: {} }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(401);
    });
});
