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
        saveBusinessInfo: vi.fn().mockResolvedValue(undefined),
    },
}));

import { profileService } from '@/lib/services/profileService';

describe('API Route: /api/onboarding/business', () => {
    const mockUserId = 'test-user-123';

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });
    });

    it('should save valid business info', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Alice',
                businessName: 'Acme Corp',
                businessModel: 'b2b-saas',
                websiteUrl: 'https://acme.com',
                elevatorPitch: 'We help teams ship faster with AI',
                targetAudience: 'B2B SaaS founders earning $5k-$20k MRR',
                stage: '0-10k',
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.success).toBe(true);
        expect(profileService.getOrCreateProfile).toHaveBeenCalledWith(mockUserId, 'test@example.com');
        expect(profileService.saveBusinessInfo).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
            name: 'Alice',
            businessName: 'Acme Corp',
        }));
    });

    it('should accept partial business info (all fields optional)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({ name: 'Bob' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        expect(profileService.saveBusinessInfo).toHaveBeenCalledWith(mockUserId, expect.objectContaining({ name: 'Bob' }));
    });

    it('should accept empty object', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
    });

    it('should reject invalid websiteUrl', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({ websiteUrl: 'not-a-url' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject elevatorPitch shorter than 10 chars', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({ elevatorPitch: 'Short' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject invalid stage value', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({ stage: 'invalid-stage' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should return 401 when not authenticated', async () => {
        mockGetServerSession.mockResolvedValue(null);

        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({ name: 'Alice' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(401);
    });

    it('should accept empty string for websiteUrl', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/business', {
            method: 'POST',
            body: JSON.stringify({ websiteUrl: '' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
    });
});
