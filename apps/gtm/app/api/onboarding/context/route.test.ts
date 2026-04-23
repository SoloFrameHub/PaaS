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
        addDocument: vi.fn().mockResolvedValue(undefined),
    },
}));

import { profileService } from '@/lib/services/profileService';

describe('API Route: /api/onboarding/context', () => {
    const mockUserId = 'test-user-123';

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });
    });

    it('should save LinkedIn URL and about text', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({
                linkedinUrl: 'https://linkedin.com/in/testuser',
                linkedinAbout: 'I build SaaS tools for developers',
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.success).toBe(true);
        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, {
            linkedinUrl: 'https://linkedin.com/in/testuser',
            linkedinAbout: 'I build SaaS tools for developers',
        });
    });

    it('should accept documents without re-creating them (docs saved by upload route)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({
                documents: [
                    { id: 'doc-1', name: 'pitch-deck.pdf' },
                    { id: 'doc-2', name: 'icp-notes.txt' },
                ],
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        // Documents are already saved by the /upload route — context route no longer re-creates them
        expect(profileService.addDocument).not.toHaveBeenCalled();
    });

    it('should accept empty object (all fields optional)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        // No updateProfile call for linkedin since nothing provided
        expect(profileService.updateProfile).not.toHaveBeenCalled();
        expect(profileService.addDocument).not.toHaveBeenCalled();
    });

    it('should accept empty string for linkedinUrl', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({ linkedinUrl: '' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        // Empty string is falsy, so no update
        expect(profileService.updateProfile).not.toHaveBeenCalled();
    });

    it('should reject invalid URL for linkedinUrl', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({ linkedinUrl: 'not-a-url' }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject documents with empty name', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({
                documents: [{ id: 'doc-1', name: '' }],
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should accept documents without ID (no re-creation)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({
                documents: [{ name: 'my-file.pdf' }],
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        // Documents are already saved by the /upload route
        expect(profileService.addDocument).not.toHaveBeenCalled();
    });

    it('should return 401 when not authenticated', async () => {
        mockGetServerSession.mockResolvedValue(null);

        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(401);
    });

    it('should save linkedinPermission flag', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({
                linkedinUrl: 'https://linkedin.com/in/testuser',
                linkedinPermission: true,
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, {
            linkedinUrl: 'https://linkedin.com/in/testuser',
            linkedinPermission: true,
        });
    });

    it('should handle LinkedIn URL only (no about text)', async () => {
        const req = new NextRequest('http://localhost/api/onboarding/context', {
            method: 'POST',
            body: JSON.stringify({
                linkedinUrl: 'https://linkedin.com/in/testuser',
            }),
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
        expect(profileService.updateProfile).toHaveBeenCalledWith(mockUserId, {
            linkedinUrl: 'https://linkedin.com/in/testuser',
        });
    });
});
