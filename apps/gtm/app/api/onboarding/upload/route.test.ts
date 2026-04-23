import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mockGetServerSession = vi.fn();
vi.mock('@/lib/auth', () => ({
    getServerSession: () => mockGetServerSession(),
}));

vi.mock('@/lib/services/profileService', () => ({
    profileService: {
        addDocument: vi.fn().mockResolvedValue(undefined),
    },
}));

vi.mock('@/lib/storage/s3', () => ({
    uploadBuffer: vi.fn(),
    hasS3: vi.fn().mockReturnValue(false),
}));

vi.mock('@/lib/logger', () => ({
    logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
}));

import { POST } from './route';
import { profileService } from '@/lib/services/profileService';

function createFileRequest(name: string, content: string | Uint8Array, type: string): NextRequest {
    const file = new File([content as BlobPart], name, { type });
    const formData = new FormData();
    formData.append('file', file);

    return new NextRequest('http://localhost/api/onboarding/upload', {
        method: 'POST',
        body: formData,
    });
}

describe('API Route: /api/onboarding/upload', () => {
    const mockUserId = 'test-user-123';

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetServerSession.mockResolvedValue({ uid: mockUserId, email: 'test@example.com' });
    });

    it('should upload a text file successfully', async () => {
        const req = createFileRequest('notes.txt', 'My ICP notes here', 'text/plain');

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.document).toBeDefined();
        expect(data.data.document.name).toBe('notes.txt');
        expect(data.data.document.content).toBe('My ICP notes here');
        expect(data.data.document.status).toBe('ready');
        expect(profileService.addDocument).toHaveBeenCalledWith(mockUserId, expect.objectContaining({
            fileName: 'notes.txt',
            mimeType: 'text/plain',
        }));
    });

    it('should upload a markdown file', async () => {
        const req = createFileRequest('icp.md', '# My ICP\n\nTarget market details...', 'text/markdown');

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.document.content).toContain('# My ICP');
    });

    it('should upload a JSON file', async () => {
        const content = JSON.stringify({ icp: 'SaaS founders', dealSize: 'mid-market' });
        const req = createFileRequest('data.json', content, 'application/json');

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
    });

    it('should reject when no file is uploaded', async () => {
        const formData = new FormData();
        const req = new NextRequest('http://localhost/api/onboarding/upload', {
            method: 'POST',
            body: formData,
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject disallowed file extensions', async () => {
        const req = createFileRequest('script.exe', 'malicious content', 'application/x-msdownload');

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject shell scripts', async () => {
        const req = createFileRequest('hack.sh', '#!/bin/bash\nrm -rf /', 'application/x-sh');

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should reject files over 10MB', async () => {
        const bigContent = new Uint8Array(11 * 1024 * 1024);
        const req = createFileRequest('huge.txt', bigContent, 'text/plain');

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(400);
    });

    it('should return 401 when not authenticated', async () => {
        mockGetServerSession.mockResolvedValue(null);

        const req = createFileRequest('notes.txt', 'content', 'text/plain');

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(401);
    });

    it('should accept markdown files with empty MIME type (browser inconsistency)', async () => {
        const file = new File(['# Heading'], 'notes.md', { type: '' });
        const formData = new FormData();
        formData.append('file', file);

        const req = new NextRequest('http://localhost/api/onboarding/upload', {
            method: 'POST',
            body: formData,
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
    });

    it('should accept markdown files with application/octet-stream MIME', async () => {
        const file = new File(['# Heading'], 'notes.md', { type: 'application/octet-stream' });
        const formData = new FormData();
        formData.append('file', file);

        const req = new NextRequest('http://localhost/api/onboarding/upload', {
            method: 'POST',
            body: formData,
        });

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);
    });

    it('should truncate content to 100k chars', async () => {
        const longContent = 'A'.repeat(150000);
        const req = createFileRequest('long.txt', longContent, 'text/plain');

        const response = await POST(req, { params: Promise.resolve({}) });
        expect(response.status).toBe(200);

        const savedDoc = (profileService.addDocument as any).mock.calls[0][1];
        expect(savedDoc.content.length).toBeLessThanOrEqual(100000);
    });

    it('should generate a unique doc ID starting with doc-', async () => {
        const req = createFileRequest('notes.txt', 'content', 'text/plain');

        await POST(req, { params: Promise.resolve({}) });

        const savedDoc = (profileService.addDocument as any).mock.calls[0][1];
        expect(savedDoc.id).toMatch(/^doc-\d+$/);
    });

    it('should use mock storage URL when S3 is not configured', async () => {
        const req = createFileRequest('notes.txt', 'content', 'text/plain');

        await POST(req, { params: Promise.resolve({}) });

        const savedDoc = (profileService.addDocument as any).mock.calls[0][1];
        expect(savedDoc.storageUrl).toMatch(/^mock-storage:\/\//);
    });

    it('should extract text content from .txt files', async () => {
        const req = createFileRequest('notes.txt', 'Hello World', 'text/plain');

        const response = await POST(req, { params: Promise.resolve({}) });
        const data = await response.json();

        expect(data.data.document.content).toBe('Hello World');
    });
});
