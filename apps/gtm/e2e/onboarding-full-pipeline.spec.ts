import { test, expect, Page } from '@playwright/test';
import { signIn, createMockProfile } from './helpers';
import { generateTestUser } from './test-data';

/**
 * Full Pipeline E2E Test: Onboarding → Postgres → AI Analysis → Assessment
 *
 * This test exercises the REAL data pipeline end-to-end:
 * 1. Mock auth sign-in (creates user row in Postgres via FK fix)
 * 2. Welcome page: name, company, business model → POST /api/onboarding/business
 * 3. Business page: website, pitch, audience → POST /api/onboarding/business
 * 4. Questionnaire: all 7 sections with real answers → POST /api/onboarding/questionnaire
 * 5. Context: LinkedIn about text → POST /api/onboarding/context
 * 6. Analyzing: waits for POST /api/onboarding/analyze (or fallback)
 * 7. Assessment: verifies score and insights rendered
 * 8. Verifies data persisted to Postgres via GET /api/profile
 */

test.describe('Full Onboarding Pipeline (Postgres-backed)', () => {
    // Longer timeout for the full flow including AI analysis
    test.setTimeout(180_000);

    test('complete onboarding with all data → Postgres persistence → assessment', async ({ page }) => {
        // -------------------------------------------------------------------
        // Step 0: Create fresh user and sign in
        // -------------------------------------------------------------------
        const user = generateTestUser({ onboardingCompleted: false, onboardingCompletedAt: null });
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await createMockProfile(page, user.profile);
        await signIn(page, user.email, user.password);

        // Should land on onboarding (profile has onboardingCompleted: false)
        await page.waitForURL(/\/onboarding/, { timeout: 15000 });

        // -------------------------------------------------------------------
        // Step 1: Welcome Page
        // -------------------------------------------------------------------
        await page.goto('/onboarding/welcome');
        await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();

        // Fill required fields
        await page.locator('#user-name').fill('Pipeline Test User');
        await page.locator('#company-name').fill('Pipeline Corp');
        await page.getByText('B2B SaaS / Software').click();

        // Intercept and verify the API call
        const welcomeResponsePromise = page.waitForResponse(
            resp => resp.url().includes('/api/onboarding/business') && resp.request().method() === 'POST',
            { timeout: 10000 }
        );
        await page.getByRole('button', { name: /next step/i }).click();
        const welcomeResponse = await welcomeResponsePromise;
        expect(welcomeResponse.status()).toBeLessThan(400);

        // -------------------------------------------------------------------
        // Step 2: Business Page
        // -------------------------------------------------------------------
        await page.waitForURL(/\/onboarding\/business/, { timeout: 10000 });
        await expect(page.getByRole('heading', { name: /tell us about/i })).toBeVisible();

        // Fill business details
        await page.locator('#website-url').fill('https://pipelinecorp.example.com');
        await page.locator('#elevator-pitch').fill(
            'We build AI-powered sales tools that help B2B SaaS founders close enterprise deals faster. Our platform automates prospect research, generates personalized outreach, and provides real-time coaching during sales calls.'
        );
        await page.locator('#target-audience').fill(
            'B2B SaaS founders with $5K-$50K MRR who are transitioning from founder-led sales to a repeatable sales process. They typically have 2-5 enterprise prospects in pipeline but struggle with discovery calls and handling technical objections.'
        );

        const businessResponsePromise = page.waitForResponse(
            resp => resp.url().includes('/api/onboarding/business') && resp.request().method() === 'POST',
            { timeout: 10000 }
        );
        await page.getByRole('button', { name: /next step/i }).click();
        const businessResponse = await businessResponsePromise;
        expect(businessResponse.status()).toBeLessThan(400);

        // -------------------------------------------------------------------
        // Step 3: Questionnaire (7 sections)
        // -------------------------------------------------------------------
        await page.waitForURL(/\/onboarding\/questionnaire/, { timeout: 10000 });
        await expect(page.getByText(/Section 1 of/i)).toBeVisible();

        // --- Section 1: Business Context ---
        // Q1 pitch (textarea, already has context from business page but let's add more)
        await page.locator('#q1-pitch').fill('AI-powered sales enablement for B2B SaaS');
        // Q2 industry select
        await page.locator('#q3-industry').selectOption('saas');
        // Q3 deal size
        await page.getByText('$1K - $5K/mo (Mid-market)').click();
        await page.getByRole('button', { name: /next section/i }).click();

        // --- Section 2: Current State ---
        await expect(page.getByText(/Section 2 of/i)).toBeVisible();
        // Q4 sales journey
        await page.getByText('Getting meetings, struggling to close').click();
        // Q5 revenue range
        await page.getByText('$5K - $20K').click();
        await page.getByRole('button', { name: /next section/i }).click();

        // --- Section 3: Founder Profile ---
        await expect(page.getByText(/Section 3 of/i)).toBeVisible();
        // Q6 founder description
        await page.getByText('Technical founder - I built the product, now need to sell it').click();
        await page.getByRole('button', { name: /next section/i }).click();

        // --- Section 4: DISC Behavioral Styles ---
        await expect(page.getByText(/Section 4 of/i)).toBeVisible();
        // Must answer all 4 scenarios
        // Scenario 1
        await page.getByText('Ask clarifying questions to understand exactly what they need').click();
        // Scenario 2
        await page.getByText('Research their company and prepare specific questions').click();
        // Scenario 3
        await page.getByText('Push for a concrete next step or timeline').click();
        // Scenario 4
        await page.getByText('Provide data and logical explanations').click();
        await page.getByRole('button', { name: /next section/i }).click();

        // --- Section 5: Learning Priorities ---
        await expect(page.getByText(/Section 5 of/i)).toBeVisible();
        await page.getByText('Running better discovery calls').click();
        await page.getByRole('button', { name: /next section/i }).click();

        // --- Section 6: Engagement Capacity ---
        await expect(page.getByText(/Section 6 of/i)).toBeVisible();
        await page.getByText(/Mix of both depending on topic/i).click();
        await page.getByRole('button', { name: /next section/i }).click();

        // --- Section 7: Goals & Success ---
        await expect(page.getByText(/Section 7 of/i)).toBeVisible();
        await page.locator('#q19-success').fill(
            'Close 3 enterprise deals worth $10K+ ARR each and establish a repeatable discovery call framework that converts at 40%+'
        );

        // Submit questionnaire
        const questionnaireResponsePromise = page.waitForResponse(
            resp => resp.url().includes('/api/onboarding/questionnaire') && resp.request().method() === 'POST',
            { timeout: 15000 }
        );
        await page.getByRole('button', { name: /complete questionnaire/i }).click();
        const questionnaireResponse = await questionnaireResponsePromise;
        expect(questionnaireResponse.status()).toBeLessThan(400);

        // -------------------------------------------------------------------
        // Step 4: Context Page (LinkedIn pasted text)
        // -------------------------------------------------------------------
        await page.waitForURL(/\/onboarding\/context/, { timeout: 10000 });
        await expect(page.getByRole('heading', { name: /add more context/i })).toBeVisible();

        // Add LinkedIn about text
        await page.locator('#linkedin-about').fill(
            'VP of Sales Engineering | 12 years helping B2B SaaS companies scale from founder-led sales to $10M ARR. Previously led technical sales at Stripe and Datadog. Speaker at SaaStr Annual. Passionate about making enterprise sales accessible to technical founders.'
        );

        // Wait for permission checkbox to appear (it shows when linkedinAbout has text)
        const permissionCheckbox = page.locator('input[type="checkbox"]');
        await expect(permissionCheckbox).toBeVisible({ timeout: 3000 });
        await permissionCheckbox.check();

        const contextResponsePromise = page.waitForResponse(
            resp => resp.url().includes('/api/onboarding/context') && resp.request().method() === 'POST',
            { timeout: 10000 }
        );
        await page.getByRole('button', { name: /analyze/i }).click();
        const contextResponse = await contextResponsePromise;
        expect(contextResponse.status()).toBeLessThan(400);

        // -------------------------------------------------------------------
        // Step 5: Analyzing Page → waits for AI analysis
        // -------------------------------------------------------------------
        await page.waitForURL(/\/onboarding\/analyzing/, { timeout: 10000 });
        await expect(page.getByRole('heading', { name: /analyzing your business/i })).toBeVisible();

        // The analyze call can take up to 60s (AI calls) or fall back to mock assessment
        // Wait for either:
        // a) Redirect to /onboarding/assessment (success)
        // b) The analyze API response (then client redirects)
        await page.waitForURL(/\/onboarding\/assessment/, { timeout: 120_000 });

        // -------------------------------------------------------------------
        // Step 6: Assessment Page → verify results rendered
        // -------------------------------------------------------------------
        await expect(page.getByRole('heading', { name: /assessment/i })).toBeVisible({ timeout: 15000 });

        // Should show a score (any number visible in the gauge)
        // The score gauge renders the number in a span with text-4xl font-bold
        const scoreElement = page.locator('.text-4xl.font-bold').first();
        await expect(scoreElement).toBeVisible({ timeout: 10000 });
        const scoreText = await scoreElement.textContent();
        const score = parseInt(scoreText || '0', 10);
        expect(score).toBeGreaterThan(0);
        expect(score).toBeLessThanOrEqual(100);

        // -------------------------------------------------------------------
        // Step 7: Verify Postgres persistence via API
        // -------------------------------------------------------------------
        const profileResponse = await page.evaluate(async () => {
            const res = await fetch('/api/profile');
            if (!res.ok) return null;
            return res.json();
        });

        expect(profileResponse).not.toBeNull();
        const profile = profileResponse?.data?.profile || profileResponse?.data || profileResponse;

        // Core fields persisted
        expect(profile.name || profile.data?.name).toBe('Pipeline Test User');
        expect(profile.businessName || profile.data?.businessName).toBe('Pipeline Corp');
        expect(profile.businessModel || profile.data?.businessModel).toBe('b2b-saas');

        // Assessment generated and saved
        const assessment = profile.assessment || profile.data?.assessment;
        expect(assessment).toBeTruthy();
        expect(assessment.overallReadiness).toBeGreaterThan(0);

        // Questionnaire data persisted
        const questionnaire = profile.questionnaire || profile.data?.questionnaire;
        expect(questionnaire).toBeTruthy();
        expect(questionnaire.industry).toBe('saas');
        expect(questionnaire.deal_size).toBe('mid_market');
        expect(questionnaire.learning_style).toBe('adaptive');

        // Onboarding marked complete
        const onboardingCompleted = profile.onboardingCompleted ?? profile.data?.onboardingCompleted;
        expect(onboardingCompleted).toBe(true);
    });

    test('onboarding data survives page refresh (Postgres persistence)', async ({ page }) => {
        // Sign in and fill welcome + business
        const user = generateTestUser({ onboardingCompleted: false, onboardingCompletedAt: null });
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await createMockProfile(page, user.profile);
        await signIn(page, user.email, user.password);
        await page.waitForURL(/\/onboarding/, { timeout: 15000 });

        // Fill welcome
        await page.goto('/onboarding/welcome');
        await page.locator('#user-name').fill('Refresh Test User');
        await page.locator('#company-name').fill('Refresh Corp');
        await page.getByText('Agency / Service Business').click();
        await page.getByRole('button', { name: /next step/i }).click();
        await page.waitForURL(/\/onboarding\/business/, { timeout: 10000 });

        // Fill business
        await page.locator('#elevator-pitch').fill('We provide consulting services for scaling businesses.');
        await page.locator('#target-audience').fill('Growing mid-market companies needing operational efficiency.');
        const businessPromise = page.waitForResponse(
            resp => resp.url().includes('/api/onboarding/business') && resp.request().method() === 'POST',
            { timeout: 10000 }
        );
        await page.getByRole('button', { name: /next step/i }).click();
        await businessPromise;
        await page.waitForURL(/\/onboarding\/questionnaire/, { timeout: 10000 });

        // Now simulate a "crash" — hard refresh and go back to business page
        await page.goto('/onboarding/business', { waitUntil: 'networkidle' });

        // Wait for hydration from server profile
        await page.waitForTimeout(2000);

        // Verify the heading shows the company name we saved (hydrated from Postgres)
        const heading = page.getByRole('heading', { name: /tell us about/i });
        await expect(heading).toBeVisible({ timeout: 10000 });
        const headingText = await heading.textContent();
        // The business page shows "Tell us about {companyName}" — should be from Postgres
        expect(headingText).toContain('Refresh Corp');
    });
});
