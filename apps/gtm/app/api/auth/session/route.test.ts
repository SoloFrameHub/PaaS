import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, DELETE } from './route';
import { NextRequest } from 'next/server';

// Mock mocks
const mockSet = vi.fn();
const mockDelete = vi.fn();
const mockCookies = {
    set: mockSet,
    delete: mockDelete,
};

vi.mock('next/headers', () => ({
    cookies: vi.fn(() => Promise.resolve(mockCookies)),
}));
vi.mock('@/lib/auth', () => ({
    getServerSession: vi.fn().mockResolvedValue(null),
}));

describe('API Route: /api/auth/session', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubEnv('NEXT_PUBLIC_MOCK_AUTH', 'false');
        vi.stubEnv('NODE_ENV', 'test');
    });

    describe('POST', () => {
        it('should create a mock session when mock auth is enabled', async () => {
            vi.stubEnv('NEXT_PUBLIC_MOCK_AUTH', 'true');

            const req = new NextRequest('http://localhost/api/auth/session', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: 'mock-token',
                    uid: 'test-user',
                    email: 'test@example.com'
                }),
            });

            const response = await POST(req);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.data.success).toBe(true);
            expect(mockSet).toHaveBeenCalledWith(
                'session',
                expect.stringContaining('"mock":true'),
                expect.any(Object)
            );
        });

        it('should block mock session in production', async () => {
            vi.stubEnv('NEXT_PUBLIC_MOCK_AUTH', 'true');
            vi.stubEnv('NODE_ENV', 'production');

            const req = new NextRequest('http://localhost/api/auth/session', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: 'mock-token',
                    uid: 'test-user',
                    email: 'test@example.com'
                }),
            });

            const response = await POST(req);
            // It might return 500 based on the code I read
            expect(response.status).toBe(500);
            expect(mockSet).not.toHaveBeenCalled();
        });

        it('should return 400 when mock auth is disabled (use signin or configure DB)', async () => {
            vi.stubEnv('NEXT_PUBLIC_MOCK_AUTH', 'false');
            delete process.env.DATABASE_URL;

            const req = new NextRequest('http://localhost/api/auth/session', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: 'valid-token',
                }),
            });

            const response = await POST(req);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBe('Auth not configured');
            expect(mockSet).not.toHaveBeenCalled();
        });

        it('should return 400 when DATABASE_URL set and idToken is sent (use signin)', async () => {
            vi.stubEnv('NEXT_PUBLIC_MOCK_AUTH', 'false');
            process.env.DATABASE_URL = 'postgres://local';

            const req = new NextRequest('http://localhost/api/auth/session', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: 'valid-token',
                }),
            });

            const response = await POST(req);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toContain('signin');
            expect(mockSet).not.toHaveBeenCalled();

            delete process.env.DATABASE_URL;
        });
    });

    describe('DELETE', () => {
        it('should delete the session cookie', async () => {
            const req = new NextRequest('http://localhost/api/auth/session', {
                method: 'DELETE',
            });

            const response = await DELETE();
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.data.success).toBe(true);
            expect(mockDelete).toHaveBeenCalledWith('session');
        });
    });
});
