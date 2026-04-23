import { test, expect } from '@playwright/test';

/**
 * E2E Tests for API Endpoints
 * Tests health checks, auth guards, and error handling for key API routes.
 * Uses page.request (APIRequestContext) which shares the browser context cookies.
 */

test.describe('API - Health Endpoint', () => {

    test('should return 200 with status ok', async ({ request }) => {
        const response = await request.get('/api/health');
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.status).toBe('ok');
        expect(body.service).toBe('wellness-academy');
        expect(body.checks).toBeDefined();
        expect(body.checks.app).toBe('ok');
    });

    test('should include AI diagnostics when diag=ai is passed', async ({ request }) => {
        const response = await request.get('/api/health?diag=ai');
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.checks).toBeDefined();
        // These fields should be present when diag=ai
        expect(body.checks).toHaveProperty('openrouter_key');
        expect(body.checks).toHaveProperty('openai_key');
        expect(body.checks).toHaveProperty('ai_model_coaching');
    });
});

test.describe('API - AI Health Endpoint', () => {

    test('should return 403 without admin key', async ({ request }) => {
        const response = await request.get('/api/health/ai');
        expect(response.status()).toBe(403);

        const body = await response.json();
        expect(body.error).toBe('Forbidden');
    });

    test('should return 403 with wrong admin key', async ({ request }) => {
        const response = await request.get('/api/health/ai?key=wrong-key');
        expect(response.status()).toBe(403);

        const body = await response.json();
        expect(body.error).toBe('Forbidden');
    });
});

test.describe('API - Auth Guard on Protected Endpoints', () => {

    test('should reject unauthenticated POST to /api/ai/chat', async ({ request }) => {
        const response = await request.post('/api/ai/chat', {
            data: { message: 'hello', history: [] },
        });

        // Should return 401 or 403 (depending on middleware)
        expect([401, 403]).toContain(response.status());
    });

    test('should reject unauthenticated POST to /api/profile', async ({ request }) => {
        const response = await request.post('/api/profile', {
            data: { displayName: 'Hacker' },
        });

        // 401/403 = auth guard caught it, 405 = method not allowed (also secure)
        expect([401, 403, 405]).toContain(response.status());
    });

    test('should reject unauthenticated POST to /api/academy/complete-lesson', async ({ request }) => {
        const response = await request.post('/api/academy/complete-lesson', {
            data: { courseId: 'test', lessonId: '1' },
        });

        expect([401, 403]).toContain(response.status());
    });

    test('should reject unauthenticated POST to /api/onboarding/questionnaire', async ({ request }) => {
        const response = await request.post('/api/onboarding/questionnaire', {
            data: {},
        });

        expect([401, 403]).toContain(response.status());
    });
});

test.describe('API - Non-existent Endpoints', () => {

    test('should return 404 for /api/debug', async ({ request }) => {
        const response = await request.get('/api/debug');
        expect(response.status()).toBe(404);
    });

    test('should return 404 for /api/nonexistent', async ({ request }) => {
        const response = await request.get('/api/nonexistent');
        expect(response.status()).toBe(404);
    });
});

test.describe('API - Auth Endpoints', () => {

    test('should have signin endpoint accessible', async ({ request }) => {
        // POST without body should return 400 (bad request), not 404
        const response = await request.post('/api/auth/signin', {
            data: {},
        });

        // Should not be 404 — endpoint exists
        expect(response.status()).not.toBe(404);
    });

    test('should have signup endpoint accessible', async ({ request }) => {
        const response = await request.post('/api/auth/signup', {
            data: {},
        });

        expect(response.status()).not.toBe(404);
    });

    test('should have signout endpoint accessible', async ({ request }) => {
        const response = await request.post('/api/auth/signout');

        // Should not be 404 — endpoint exists
        expect(response.status()).not.toBe(404);
    });
});
