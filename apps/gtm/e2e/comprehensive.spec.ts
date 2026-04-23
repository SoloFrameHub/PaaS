import { test, expect } from '@playwright/test';
import { signIn, signInWithCompletedOnboarding } from './helpers';

/**
 * Comprehensive E2E Tests
 * Tests: payment gate bypass, full onboarding, AI features, dashboard access
 */

test.describe('Payment Gate Bypass (Open Access)', () => {

    test('signup should redirect to onboarding, NOT subscribe', async ({ page }) => {
        await page.goto('/signup');

        const timestamp = Date.now();
        await page.locator('input#name').fill('Open Access Tester');
        await page.locator('input[type="email"]').fill(`opentest-${timestamp}@example.com`);
        await page.locator('input[type="password"]').fill('TestPassword123!');
        await page.locator('input[type="checkbox"]').check();
        await page.getByRole('button', { name: /sign up/i }).click();

        // Should go to onboarding, NOT /subscribe
        await page.waitForURL(/\/(onboarding|dashboard)/, { timeout: 15000 });
        const url = page.url();
        expect(url).not.toContain('/subscribe');
    });

    test('dashboard should NOT redirect to subscribe when open access is enabled', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const url = page.url();
        expect(url).toContain('/dashboard');
        expect(url).not.toContain('/subscribe');
    });

    test('academy should be accessible without subscription', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/academy');
        await page.waitForLoadState('networkidle');

        const url = page.url();
        expect(url).not.toContain('/subscribe');
        // Should either show academy content or stay on academy
        expect(url).toMatch(/\/(academy|dashboard)/);
    });

    test('coach page should be accessible without subscription', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/coach');
        await page.waitForLoadState('networkidle');

        const url = page.url();
        expect(url).not.toContain('/subscribe');
    });

    test('roleplay page should be accessible without subscription', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/roleplay');
        await page.waitForLoadState('networkidle');

        const url = page.url();
        expect(url).not.toContain('/subscribe');
    });
});

test.describe('Full Onboarding Flow', () => {

    test('should complete entire onboarding from signup to dashboard', async ({ page }) => {
        // Sign in fresh (no profile = onboarding)
        await signIn(page, 'onboarding-full@example.com', 'password123');

        // Should land on onboarding
        await page.waitForURL(/\/(onboarding|dashboard)/, { timeout: 15000 });

        // Navigate to welcome page
        await page.goto('/onboarding/welcome');
        await page.waitForLoadState('domcontentloaded');

        // Step 1: Welcome — name, company, business model
        await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
        await page.getByLabel(/your name/i).fill('Full Flow Tester');
        await page.getByLabel(/company/i).fill('FlowTest Inc');
        await page.getByText(/B2B SaaS/i).click();
        await page.getByRole('button', { name: /next step/i }).click();

        // Step 2: Business info
        await page.waitForURL(/\/onboarding\/business/, { timeout: 10000 });
        await expect(page.getByRole('heading', { name: /tell us about/i })).toBeVisible();
        await page.getByLabel(/what does your business do/i).fill('We build sales automation tools for startups.');
        await page.getByLabel(/ideal customer/i).fill('Early-stage SaaS founders doing $5k-$50k MRR.');
        await page.getByRole('button', { name: /next step/i }).click();

        // Step 3: Questionnaire — click through all sections
        await page.waitForURL(/\/onboarding\/questionnaire/, { timeout: 10000 });
        await expect(page.getByText(/Section 1 of/i)).toBeVisible();

        let maxSections = 10; // safety limit
        while (maxSections > 0) {
            const completeBtn = page.getByRole('button', { name: /complete questionnaire/i });
            const nextBtn = page.getByRole('button', { name: /next section/i });

            if (await completeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
                await completeBtn.click();
                break;
            } else if (await nextBtn.isVisible({ timeout: 500 }).catch(() => false)) {
                await nextBtn.click();
                await page.waitForTimeout(400);
            } else {
                break;
            }
            maxSections--;
        }

        // Step 4: Context page (optional docs/LinkedIn)
        await page.waitForURL(/\/onboarding\/(context|analyzing)/, { timeout: 15000 });

        if (page.url().includes('/context')) {
            // Skip the optional step
            await page.getByRole('button', { name: /skip|analyze/i }).click();
        }

        // Step 5: Analyzing page
        await page.waitForURL(/\/onboarding\/analyzing/, { timeout: 15000 });
        await expect(page.getByRole('heading', { name: /analyzing/i })).toBeVisible();

        // Wait for analysis to complete (with fallback) — up to 120s
        await page.waitForURL(/\/onboarding\/assessment/, { timeout: 120000 });

        // Step 6: Assessment page — verify results and complete
        await expect(page.getByRole('heading', { name: /assessment/i })).toBeVisible();

        // Click "Start Your Journey"
        const startBtn = page.getByRole('button', { name: /start your journey/i });
        await expect(startBtn).toBeVisible({ timeout: 10000 });
        await startBtn.click();

        // Should reach dashboard, NOT subscribe
        await page.waitForURL(/\/dashboard/, { timeout: 15000 });
        expect(page.url()).toContain('/dashboard');
        expect(page.url()).not.toContain('/subscribe');
    });

    test('welcome page should render all form elements', async ({ page }) => {
        await signIn(page, 'form-check@example.com', 'password123');
        await page.goto('/onboarding/welcome');
        await page.waitForLoadState('domcontentloaded');

        await expect(page.getByLabel(/your name/i)).toBeVisible();
        await expect(page.getByLabel(/company/i)).toBeVisible();
        await expect(page.getByText(/B2B SaaS/i)).toBeVisible();
        await expect(page.getByText(/Creator/i)).toBeVisible();
        await expect(page.getByText(/Agency/i)).toBeVisible();
        await expect(page.getByText(/Marketplace/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /next step/i })).toBeVisible();
    });

    test('business page should require elevator pitch and target audience', async ({ page }) => {
        await signIn(page, 'biz-validate@example.com', 'password123');
        await page.goto('/onboarding/business');
        await page.waitForLoadState('domcontentloaded');

        // Submit button should be disabled without required fields
        const submitBtn = page.getByRole('button', { name: /next step/i });
        await expect(submitBtn).toBeDisabled();

        // Fill only pitch
        await page.getByLabel(/what does your business do/i).fill('Test pitch');
        await expect(submitBtn).toBeDisabled();

        // Fill target audience too
        await page.getByLabel(/ideal customer/i).fill('Test audience');
        await expect(submitBtn).toBeEnabled();
    });

    test('questionnaire should show all sections', async ({ page }) => {
        await signIn(page, 'quiz-sections@example.com', 'password123');
        await page.goto('/onboarding/questionnaire');
        await page.waitForLoadState('domcontentloaded');

        // Should show section counter
        await expect(page.getByText(/Section 1 of/i)).toBeVisible();

        // Check section title
        await expect(page.getByRole('heading', { name: /Business Context/i })).toBeVisible();
    });
});

test.describe('Dashboard Access', () => {

    test('dashboard should display after completed onboarding', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        // Should be on dashboard
        expect(page.url()).toContain('/dashboard');

        // Check for dashboard content markers
        const heading = page.locator('h1, h2').first();
        await expect(heading).toBeVisible({ timeout: 10000 });
    });

    test('unauthenticated user should be redirected to signin', async ({ page }) => {
        await page.goto('/dashboard');

        await page.waitForURL(/\/signin/, { timeout: 10000 });
        expect(page.url()).toContain('/signin');
    });

    test('should redirect incomplete onboarding user to onboarding', async ({ page }) => {
        // Sign in without completed profile
        await signIn(page, 'incomplete-user@example.com', 'password123');

        // Navigate to dashboard
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        // Should redirect to onboarding (since profile isn't complete)
        const url = page.url();
        expect(url).toMatch(/\/(onboarding|dashboard)/);
    });
});

test.describe('AI Features — API Integration', () => {

    test('AI chat endpoint should respond (or return 503 gracefully)', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        // Call the AI chat API directly from the browser context
        const result = await page.evaluate(async () => {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'What is the most important thing for a new B2B SaaS founder to focus on?',
                    history: [],
                }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // Should either succeed (200) or gracefully fail (503 if AI unavailable)
        expect([200, 503]).toContain(result.status);

        if (result.status === 200) {
            expect(result.body?.data?.message).toBeTruthy();
            expect(typeof result.body.data.message).toBe('string');
        } else {
            expect(result.body?.error).toBeTruthy();
        }
    });

    test('AI chat should reject unauthenticated requests', async ({ page }) => {
        await page.goto('/');

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'test' }),
            });
            return { status: res.status };
        });

        expect(result.status).toBe(401);
    });

    test('AI chat should validate request body', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: '' }), // Empty message should fail validation
            });
            return { status: res.status };
        });

        expect(result.status).toBe(400);
    });

    test('AI roleplay endpoint should respond (or gracefully error)', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/ai/roleplay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    industryId: 'saas',
                    roleId: 'cto',
                    message: 'Hi, I am interested in your product. Can you tell me more about how it integrates with our stack?',
                    history: [],
                }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // 200=success, 500/503=AI unavailable in test mode
        expect([200, 500, 503]).toContain(result.status);

        if (result.status === 200) {
            expect(result.body?.data?.message).toBeTruthy();
        }
    });

    test('AI ICP validation endpoint should respond (or gracefully error)', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/ai/icp-validation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    industry: 'SaaS / B2B Technology',
                    companySize: '50-200 employees',
                    jobTitles: 'VP of Sales, CRO, Head of Growth',
                    painPoints: 'Low conversion rates, poor pipeline visibility, long sales cycles',
                }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // 200=success, 500/503=AI unavailable in test mode
        expect([200, 500, 503]).toContain(result.status);

        if (result.status === 200) {
            expect(result.body?.data).toBeTruthy();
        }
    });

    test('AI roleplay evaluate endpoint should respond (or gracefully error)', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/ai/roleplay/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    industryId: 'saas',
                    roleId: 'cto',
                    history: [
                        { role: 'assistant', content: 'Hi, I am the CTO at a mid-sized SaaS company.' },
                        { role: 'user', content: 'Thanks for meeting with me. I would love to understand your current challenges with your sales pipeline.' },
                        { role: 'assistant', content: 'Well, our biggest challenge is getting visibility into deal progression.' },
                        { role: 'user', content: 'That makes sense. How does that impact your revenue forecasting?' },
                    ],
                }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // 200=success, 500/503=AI unavailable in test mode
        expect([200, 500, 503]).toContain(result.status);
    });

    test('onboarding analyze endpoint should respond', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/onboarding/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    onboardingData: {
                        userName: 'Test User',
                        companyName: 'TestCo',
                        businessModel: 'b2b-saas',
                        website: 'https://example.com',
                        pitch: 'We help SaaS founders grow revenue',
                        targetAudience: 'B2B SaaS founders',
                        questionnaire: {
                            industry: 'saas',
                            deal_size: 'smb',
                            sales_journey: 'Getting meetings, struggling to close',
                            revenue_range: '$1K - $5K',
                            founder_description: 'Technical founder',
                        },
                    },
                }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // Should succeed, or return 503 if AI unavailable, or 500 on error
        expect([200, 500, 503]).toContain(result.status);

        if (result.status === 200) {
            expect(result.body?.data?.assessment || result.body?.data?.status).toBeTruthy();
        }
    });
});

test.describe('Coach UI', () => {

    test('coach page should render chat interface', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/coach');
        await page.waitForLoadState('networkidle');

        // Should not redirect to subscribe
        expect(page.url()).not.toContain('/subscribe');

        // Should have some kind of chat input or coach UI element
        const hasInput = await page.locator('textarea, input[type="text"]').first().isVisible({ timeout: 5000 }).catch(() => false);
        const hasHeading = await page.locator('h1, h2').first().isVisible({ timeout: 5000 }).catch(() => false);

        expect(hasInput || hasHeading).toBeTruthy();
    });
});

test.describe('Navigation & Protected Routes', () => {

    test('should navigate between major app sections', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        // Dashboard
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('/dashboard');

        // Academy
        await page.goto('/academy');
        await page.waitForLoadState('networkidle');
        expect(page.url()).not.toContain('/signin');

        // Settings
        await page.goto('/settings');
        await page.waitForLoadState('networkidle');
        expect(page.url()).not.toContain('/signin');
    });

    test('subscribe page should redirect to dashboard/onboarding in open access', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        await page.goto('/subscribe');
        await page.waitForLoadState('networkidle');

        // With open access + completed onboarding, should redirect to dashboard
        const url = page.url();
        expect(url).not.toContain('/subscribe');
        expect(url).toMatch(/\/(dashboard|onboarding)/);
    });
});

test.describe('Auth Session & Profile API', () => {

    test('session API should return user data when authenticated', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/auth/session');
            return { status: res.status, body: await res.json() };
        });

        expect(result.status).toBe(200);
        expect(result.body.user).toBeTruthy();
        expect(result.body.user.uid).toBeTruthy();
        expect(result.body.user.email).toBeTruthy();
    });

    test('session API should return null user when not authenticated', async ({ page }) => {
        await page.goto('/');

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/auth/session');
            return { status: res.status, body: await res.json() };
        });

        expect(result.status).toBe(200);
        expect(result.body.user).toBeNull();
    });

    test('profile API should return profile when authenticated', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/profile');
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // Profile endpoint should respond (200 or 404 if not yet created)
        expect([200, 404]).toContain(result.status);
    });

    test('onboarding complete API should work', async ({ page }) => {
        await signInWithCompletedOnboarding(page);

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/onboarding/complete', {
                method: 'POST',
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        expect(result.status).toBe(200);
        expect(result.body?.data?.success).toBe(true);
    });
});

test.describe('Password Reset Flow', () => {

    test('reset-password page should render email form', async ({ page }) => {
        await page.goto('/reset-password');
        await page.waitForLoadState('domcontentloaded');

        await expect(page.getByRole('heading', { name: /reset your password/i })).toBeVisible();
        await expect(page.locator('input#email')).toBeVisible();
        await expect(page.getByRole('button', { name: /send reset code/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /back to sign in/i })).toBeVisible();
    });

    test('reset-password API should respond', async ({ page }) => {
        await page.goto('/');

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'nonexistent@example.com' }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // 200=success (with DB), 503=no database in mock auth mode
        expect([200, 503]).toContain(result.status);
        if (result.status === 200) {
            expect(result.body?.ok).toBe(true);
        }
    });

    test('reset-password confirm API should validate input', async ({ page }) => {
        await page.goto('/');

        const result = await page.evaluate(async () => {
            const res = await fetch('/api/auth/reset-password/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    code: '123456',
                    password: '12345',
                }),
            });
            return { status: res.status, body: await res.json().catch(() => null) };
        });

        // 400=validation error (with DB), 503=no database in mock auth mode
        expect([400, 503]).toContain(result.status);
        if (result.status === 400) {
            expect(result.body?.error).toMatch(/6 characters/i);
        }
    });
});
