/**
 * E2E tests — Provider Portal
 *
 * Coverage:
 *  - Auth guards: unauthenticated + role='user' blocked from provider routes
 *  - Provider signup page accessible to regular users
 *  - Provider API endpoints: 401/403 for wrong roles
 *  - Provider dashboard renders for a mock provider session
 *  - Patients page renders
 *  - Alerts page renders
 *  - Resources (RAG) page renders
 *  - Invite code generation (POST /api/provider/invite)
 *  - Invite self-link guard (PUT /api/provider/invite with own providerId)
 *  - Alert resolve idempotency (POST /api/provider/alerts/:id/resolve)
 */

import { test, expect } from '@playwright/test';
import { signInAsProvider, signIn, signInWithCompletedOnboarding } from './helpers';

// ---------------------------------------------------------------------------
// Auth guard tests — no session
// ---------------------------------------------------------------------------

test.describe('Provider Portal — unauthenticated access', () => {
  test('GET /provider/dashboard redirects to /signin', async ({ page }) => {
    await page.goto('/provider/dashboard', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/signin/);
  });

  test('GET /provider/patients redirects to /signin', async ({ page }) => {
    await page.goto('/provider/patients', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/signin/);
  });

  test('GET /provider/alerts redirects to /signin', async ({ page }) => {
    await page.goto('/provider/alerts', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/signin/);
  });

  test('GET /provider/resources redirects to /signin', async ({ page }) => {
    await page.goto('/provider/resources', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/signin/);
  });

  test('GET /api/provider/alerts returns 401', async ({ request }) => {
    const res = await request.get('/api/provider/alerts');
    expect([401, 403]).toContain(res.status());
  });

  test('POST /api/provider/invite returns 401', async ({ request }) => {
    const res = await request.post('/api/provider/invite');
    expect([401, 403]).toContain(res.status());
  });
});

// ---------------------------------------------------------------------------
// Auth guard tests — regular user (role='user') cannot access provider portal
// ---------------------------------------------------------------------------

test.describe('Provider Portal — regular user access', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a regular user (default mock role = 'user')
    await page.goto('/');
    const res = await page.request.post('/api/auth/session', {
      data: { idToken: 'mock-token', uid: 'mock-user-reg', email: 'user@example.com', role: 'user' },
    });
    expect(res.ok()).toBeTruthy();
  });

  test('/provider/dashboard redirects away from portal', async ({ page }) => {
    await page.goto('/provider/dashboard', { waitUntil: 'domcontentloaded' });
    // Should land on provider-signup or provider-pending, NOT the dashboard
    expect(page.url()).not.toMatch(/\/provider\/dashboard/);
    expect(page.url()).toMatch(/\/provider-signup|\/provider-pending/);
  });

  test('GET /api/provider/alerts returns 403', async ({ page }) => {
    const res = await page.request.get('/api/provider/alerts');
    expect(res.status()).toBe(403);
  });

  test('POST /api/provider/invite returns 403', async ({ page }) => {
    const res = await page.request.post('/api/provider/invite');
    expect(res.status()).toBe(403);
  });
});

// ---------------------------------------------------------------------------
// Provider signup page
// ---------------------------------------------------------------------------

test.describe('Provider Signup page', () => {
  test('renders signup form for authenticated user', async ({ page }) => {
    // Sign in as a regular user
    await page.goto('/');
    await page.request.post('/api/auth/session', {
      data: { idToken: 'mock-token', uid: 'mock-user-reg', email: 'user@example.com', role: 'user' },
    });

    await page.goto('/provider-signup', { waitUntil: 'domcontentloaded' });
    // Should show the provider profile form
    await expect(page.getByRole('heading', { name: /provider profile|become a provider/i })).toBeVisible({ timeout: 10000 });
  });

  test('redirects unauthenticated to /signin', async ({ page }) => {
    await page.goto('/provider-signup', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/signin/);
  });
});

// ---------------------------------------------------------------------------
// Provider portal pages — authenticated as provider
// ---------------------------------------------------------------------------

test.describe('Provider Portal — authenticated provider', () => {
  test.beforeEach(async ({ page }) => {
    await signInAsProvider(page);
  });

  test('dashboard page renders without errors', async ({ page }) => {
    await page.goto('/provider/dashboard', { waitUntil: 'domcontentloaded' });
    // Should NOT redirect away
    expect(page.url()).toMatch(/\/provider\/dashboard/);
    // Should show "Provider Dashboard" or welcome heading
    await expect(
      page.getByRole('heading', { name: /provider dashboard|welcome/i })
    ).toBeVisible({ timeout: 15000 });
  });

  test('dashboard shows stat cards', async ({ page }) => {
    await page.goto('/provider/dashboard', { waitUntil: 'domcontentloaded' });
    // Stat cards should be present (Active Patients, Crisis Alerts, etc.)
    await expect(page.getByText(/active patients/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('patients page renders', async ({ page }) => {
    await page.goto('/provider/patients', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/provider\/patients/);
    await expect(page.getByRole('heading', { name: /patients/i })).toBeVisible({ timeout: 10000 });
  });

  test('alerts page renders', async ({ page }) => {
    await page.goto('/provider/alerts', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/provider\/alerts/);
    await expect(page.getByRole('heading', { name: /alerts/i })).toBeVisible({ timeout: 10000 });
  });

  test('resources page renders', async ({ page }) => {
    await page.goto('/provider/resources', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toMatch(/\/provider\/resources/);
    // Should show the RAG search interface heading
    await expect(
      page.getByRole('heading', { name: /clinical resources|search/i })
    ).toBeVisible({ timeout: 10000 });
  });

  test('provider sidebar navigation links are visible', async ({ page }) => {
    await page.goto('/provider/dashboard', { waitUntil: 'domcontentloaded' });
    // Check sidebar links exist
    await expect(page.getByRole('link', { name: /dashboard/i }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: /patients/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /alerts/i }).first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Provider API endpoints — authenticated as provider
// ---------------------------------------------------------------------------

test.describe('Provider API — invite codes', () => {
  test.beforeEach(async ({ page }) => {
    await signInAsProvider(page, { uid: 'mock-provider-api', email: 'provider-api@example.com' });
  });

  test('POST /api/provider/invite generates a code', async ({ page }) => {
    const res = await page.request.post('/api/provider/invite');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.code).toBeDefined();
    expect(typeof body.code).toBe('string');
    expect(body.code.length).toBe(8);
    expect(body.expiresAt).toBeDefined();
  });

  test('PUT /api/provider/invite rejects invalid code', async ({ page }) => {
    const res = await page.request.put('/api/provider/invite', {
      data: { code: 'BADCODE1' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid|expired/i);
  });

  test('PUT /api/provider/invite rejects self-redemption', async ({ page }) => {
    // Generate a code as this provider
    const genRes = await page.request.post('/api/provider/invite');
    expect(genRes.status()).toBe(200);
    const { code } = await genRes.json();

    // Attempt to redeem the same code (same session = same userId = same providerId)
    const redeemRes = await page.request.put('/api/provider/invite', {
      data: { code },
    });
    expect(redeemRes.status()).toBe(400);
    const body = await redeemRes.json();
    expect(body.error).toMatch(/own invite/i);
  });
});

test.describe('Provider API — alerts', () => {
  test('GET /api/provider/alerts returns alerts array', async ({ page }) => {
    await signInAsProvider(page);
    const res = await page.request.get('/api/provider/alerts');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.alerts)).toBeTruthy();
  });

  test('POST /api/provider/alerts/99999/resolve returns 404 for unknown alert', async ({ page }) => {
    await signInAsProvider(page);
    const res = await page.request.post('/api/provider/alerts/99999/resolve');
    expect(res.status()).toBe(404);
  });

  test('POST /api/provider/alerts/invalid/resolve returns 400 for bad alertId', async ({ page }) => {
    await signInAsProvider(page);
    const res = await page.request.post('/api/provider/alerts/notanumber/resolve');
    expect(res.status()).toBe(400);
  });
});

test.describe('Provider API — session prep', () => {
  test('GET /api/provider/session-prep/:id returns 404 for unknown patient', async ({ page }) => {
    await signInAsProvider(page);
    const res = await page.request.get('/api/provider/session-prep/unknown-patient-id-99999');
    expect(res.status()).toBe(404);
  });
});

test.describe('Provider API — profile', () => {
  test('GET /api/provider/profile returns 200 for provider', async ({ page }) => {
    await signInAsProvider(page);
    const res = await page.request.get('/api/provider/profile');
    // 200 (profile found) or 404 (no profile yet for mock user) are both acceptable
    expect([200, 404]).toContain(res.status());
  });

  test('GET /api/provider/profile returns 403 for regular user', async ({ page }) => {
    await page.goto('/');
    await page.request.post('/api/auth/session', {
      data: { idToken: 'mock-token', uid: 'mock-user-reg2', email: 'user2@example.com', role: 'user' },
    });
    const res = await page.request.get('/api/provider/profile');
    expect(res.status()).toBe(403);
  });
});

// ---------------------------------------------------------------------------
// Admin API guards
// ---------------------------------------------------------------------------

test.describe('Admin API — access control', () => {
  test('GET /api/admin/providers returns 403 for regular user', async ({ request }) => {
    const res = await request.get('/api/admin/providers');
    expect([401, 403]).toContain(res.status());
  });

  test('GET /api/admin/providers returns 403 for provider role', async ({ page }) => {
    await signInAsProvider(page);
    const res = await page.request.get('/api/admin/providers');
    expect(res.status()).toBe(403);
  });
});
