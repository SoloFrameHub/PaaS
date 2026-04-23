import { test, expect, Page } from '@playwright/test';

/**
 * E2E Tests for Wellness Coach (AI Chat)
 *
 * Tests the /coach page: chat UI, AI responses, crisis detection, error handling.
 * Uses route mocking for the /api/ai/chat endpoint (no real AI calls).
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MOCK_EMAIL = 'coach-test@example.com';
const MOCK_UID = 'mock-coachtestexamplecom';

/** Wellness profile that satisfies server-side getAuthContext + onboarding check. */
const MOCK_WELLNESS_PROFILE = {
    id: MOCK_UID,
    userId: MOCK_UID,
    name: 'Test User',
    email: MOCK_EMAIL,
    displayName: 'Tester',
    onboardingCompleted: true,
    onboardingCompletedAt: new Date().toISOString(),
    profileVersion: 2,
    questionnaire: {
        primarySymptoms: [
            { category: 'anxiety', severity: 'moderate', duration: '1-3-months', isPrimary: true },
            { category: 'sleep', severity: 'mild', duration: 'less-than-2-weeks', isPrimary: false },
        ],
        symptomDuration: '1-3-months',
        impactOnDailyLife: 'somewhat',
        currentlyReceivingTreatment: false,
        wellnessGoals: ['reduce-anxiety', 'sleep-better'],
        learningStyle: 'self-paced',
        timeCommitment: '15-20-min',
        preferredContentTypes: ['reading', 'interactive'],
        crisisScreeningCompleted: true,
        completedAt: new Date().toISOString(),
    },
    assessment: null,
    progress: {
        completedCourses: [],
        completedLessons: {},
        currentCourse: null,
        xpTotal: 0,
        streakDays: 0,
        longestStreak: 0,
        badges: [],
        techniquesPracticed: {},
        favoritesTechniques: [],
        moodEntries: [],
        techniquePractices: [],
        lastActivityAt: new Date().toISOString(),
    },
    preferences: {
        emailReminders: false,
    },
    has988Acknowledged: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

/** Write the mock profile so the server can read it. */
async function seedMockProfile(page: Page) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.evaluate(async (profile) => {
        const res = await fetch('/api/test/setup-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile }),
        });
        if (!res.ok) throw new Error('setup-profile failed');
    }, MOCK_WELLNESS_PROFILE);
}

/** Create a mock session cookie so the server sees us as authenticated. */
async function setMockSession(page: Page) {
    await page.evaluate(
        async ({ uid, email }) => {
            const r = await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: 'mock-token', uid, email }),
            });
            if (!r.ok) throw new Error('mock session failed');
        },
        { uid: MOCK_UID, email: MOCK_EMAIL },
    );
}

// The coach input specifically (disambiguates from "Quick Advisor AI" widget)
const COACH_INPUT_PLACEHOLDER = "Share what's on your mind...";

/** Navigate to /coach and wait for the chat UI to be interactive. */
async function goToCoach(page: Page) {
    await page.goto('/coach', { waitUntil: 'networkidle' });
    await page.getByPlaceholder(COACH_INPUT_PLACEHOLDER).waitFor({ state: 'visible', timeout: 15000 });
}

/** Get the wellness coach chat input (not the Quick Advisor widget input). */
function coachInput(page: Page) {
    return page.getByPlaceholder(COACH_INPUT_PLACEHOLDER);
}

/** Standard mock for /api/ai/chat. */
function mockChatAPI(page: Page, overrides: Record<string, unknown> = {}) {
    return page.route('**/api/ai/chat', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: {
                    message: "It sounds like you're experiencing some anxiety. That's completely valid. Would you like to try a quick breathing exercise together?",
                    crisisDetected: false,
                    crisisLevel: 'none',
                    ...overrides,
                },
            }),
        });
    });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Wellness Coach', () => {
    // These tests require a database for authentication
    test.skip(!process.env.DATABASE_URL, 'Requires DATABASE_URL for auth');

    test.beforeEach(async ({ page }) => {
        await seedMockProfile(page);
        await setMockSession(page);
    });

    test('should display coach page with greeting and UI elements', async ({ page }) => {
        await goToCoach(page);

        // Header: "Wellness Coach" text — use text selector since h2 is in a gradient div
        await expect(page.locator('h2').filter({ hasText: 'Wellness Coach' })).toBeVisible();

        // 988 Crisis Line link in the header
        await expect(page.locator('a[href="tel:988"]').first()).toBeVisible();

        // Greeting message references the user by displayName and their primary symptom
        await expect(page.getByText(/Hello Tester/)).toBeVisible();
        await expect(page.getByText(/managing anxiety/)).toBeVisible();

        // Input field and send button
        await expect(coachInput(page)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send' }).first()).toBeVisible();

        // Disclaimer text
        await expect(page.getByText(/educational support, not therapy/)).toBeVisible();
    });

    test('should send a message and receive AI response', async ({ page }) => {
        await mockChatAPI(page);
        await goToCoach(page);

        await coachInput(page).fill('I have been feeling anxious lately');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // User message appears
        await expect(page.getByText('I have been feeling anxious lately')).toBeVisible();

        // AI response appears
        await expect(page.getByText(/breathing exercise/)).toBeVisible({ timeout: 10000 });
    });

    test('should clear input after sending', async ({ page }) => {
        await mockChatAPI(page);
        await goToCoach(page);

        await coachInput(page).fill('Hello coach');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // Input should be cleared immediately after send
        await expect(coachInput(page)).toHaveValue('');
    });

    test('should disable send button when input is empty', async ({ page }) => {
        await goToCoach(page);

        // The first Send button (coach's) should be disabled when empty
        await expect(page.getByRole('button', { name: 'Send' }).first()).toBeDisabled();
    });

    test('should disable input and button while loading', async ({ page }) => {
        await page.route('**/api/ai/chat', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        message: 'Delayed response.',
                        crisisDetected: false,
                        crisisLevel: 'none',
                    },
                }),
            });
        });
        await goToCoach(page);

        await coachInput(page).fill('Test loading state');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // Button should show "Thinking..." while loading
        await expect(page.getByRole('button', { name: /thinking/i })).toBeVisible();
        await expect(coachInput(page)).toBeDisabled();

        // Wait for response to finish
        await expect(page.getByText('Delayed response.')).toBeVisible({ timeout: 10000 });
    });

    test('should handle crisis detection response', async ({ page }) => {
        await mockChatAPI(page, {
            message: 'I hear how much pain you\'re in. Please reach out to the 988 Suicide & Crisis Lifeline immediately.',
            crisisDetected: true,
            crisisLevel: 'immediate',
        });
        await goToCoach(page);

        await coachInput(page).fill('I am feeling overwhelmed');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // Crisis response should appear with special styling (red border)
        const crisisMessage = page.locator('[class*="border-red"]').first();
        await expect(crisisMessage).toBeVisible({ timeout: 10000 });
        await expect(crisisMessage).toContainText(/988/);
    });

    test('should handle API error gracefully', async ({ page }) => {
        await page.route('**/api/ai/chat', async (route) => {
            await route.fulfill({
                status: 503,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Wellness coach temporarily unavailable. Please try again in a moment.',
                }),
            });
        });
        await goToCoach(page);

        await coachInput(page).fill('Hello');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // Should show an error message
        await expect(
            page.getByText(/having trouble/).first(),
        ).toBeVisible({ timeout: 10000 });
    });

    test('should handle network error gracefully', async ({ page }) => {
        await page.route('**/api/ai/chat', async (route) => {
            await route.abort('connectionrefused');
        });
        await goToCoach(page);

        await coachInput(page).fill('Hello');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // Should show the network-error fallback
        await expect(page.getByText('Connection lost')).toBeVisible({ timeout: 10000 });
    });

    test('should handle rate-limit (429) error', async ({ page }) => {
        await page.route('**/api/ai/chat', async (route) => {
            await route.fulfill({
                status: 429,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'You are sending messages too quickly. Please wait a moment.',
                }),
            });
        });
        await goToCoach(page);

        await coachInput(page).fill('Hello');
        await page.getByRole('button', { name: 'Send' }).first().click();

        // Should show rate limit message
        await expect(
            page.getByText(/too quickly/).first(),
        ).toBeVisible({ timeout: 10000 });
    });

    test('should maintain conversation history in the UI', async ({ page }) => {
        let callCount = 0;
        await page.route('**/api/ai/chat', async (route) => {
            callCount++;
            const message =
                callCount === 1
                    ? 'First response from the coach.'
                    : 'Second response, building on our conversation.';
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: { message, crisisDetected: false, crisisLevel: 'none' },
                }),
            });
        });
        await goToCoach(page);

        const input = coachInput(page);

        // Send first message
        await input.fill('First message');
        await page.getByRole('button', { name: 'Send' }).first().click();
        await expect(page.getByText('First response from the coach.')).toBeVisible({ timeout: 10000 });

        // Send second message
        await input.fill('Second message');
        await page.getByRole('button', { name: 'Send' }).first().click();
        await expect(page.getByText('Second response, building on our conversation.')).toBeVisible({
            timeout: 10000,
        });

        // All messages should still be visible (history preserved)
        await expect(page.getByText('First message')).toBeVisible();
        await expect(page.getByText('First response from the coach.')).toBeVisible();
        await expect(page.getByText('Second message')).toBeVisible();
    });

    test('should send conversation history to the API', async ({ page }) => {
        let capturedHistory: unknown[] = [];
        let callCount = 0;

        await page.route('**/api/ai/chat', async (route) => {
            callCount++;
            const body = JSON.parse(route.request().postData() || '{}');
            capturedHistory = body.history || [];
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        message: `Response ${callCount}`,
                        crisisDetected: false,
                        crisisLevel: 'none',
                    },
                }),
            });
        });
        await goToCoach(page);

        const input = coachInput(page);

        // Send first message
        await input.fill('Hello');
        await page.getByRole('button', { name: 'Send' }).first().click();
        await expect(page.getByText('Response 1')).toBeVisible({ timeout: 10000 });

        // Send second message — history should include previous messages
        await input.fill('Follow up');
        await page.getByRole('button', { name: 'Send' }).first().click();
        await expect(page.getByText('Response 2')).toBeVisible({ timeout: 10000 });

        // The history sent on the second call should contain previous messages
        expect(capturedHistory.length).toBeGreaterThan(0);
    });

    test('should have 988 crisis line link in header', async ({ page }) => {
        await goToCoach(page);

        const crisisLink = page.locator('a[href="tel:988"]').first();
        await expect(crisisLink).toBeVisible();
        await expect(crisisLink).toContainText('988');
    });

    test('should not send empty messages', async ({ page }) => {
        let apiCalled = false;
        await page.route('**/api/ai/chat', async (route) => {
            apiCalled = true;
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: { message: 'Should not see this.', crisisDetected: false, crisisLevel: 'none' },
                }),
            });
        });
        await goToCoach(page);

        // Send button should be disabled when input is empty
        await expect(page.getByRole('button', { name: 'Send' }).first()).toBeDisabled();

        // Fill with whitespace-only — button should remain disabled
        await coachInput(page).fill('   ');
        await expect(page.getByRole('button', { name: 'Send' }).first()).toBeDisabled();

        // Wait a moment to ensure no API call was made
        await page.waitForTimeout(1000);
        expect(apiCalled).toBe(false);
    });
});

test.describe('Wellness Coach - Auth guard', () => {
    // These tests require a database for authentication
    test.skip(!process.env.DATABASE_URL, 'Requires DATABASE_URL for auth');

    test('should redirect unauthenticated users to signin', async ({ page }) => {
        await page.goto('/coach');

        // Should redirect to signin
        await page.waitForURL(/\/signin/, { timeout: 15000 });
        expect(page.url()).toContain('/signin');
    });
});
