import { test, expect } from '@playwright/test';
import { signIn } from './helpers';

/**
 * E2E Tests for Onboarding Flow
 * Tests the complete 8-step wellness onboarding journey:
 * 1. Welcome - optional display name
 * 2. Symptoms - select symptoms + severity
 * 3. Safety - crisis screening
 * 4. Goals - wellness goals + preferences
 * 5. About You - life situation (optional)
 * 6. Your Experience - coping & triggers (optional)
 * 7. In Your Words - free-text reflections (optional)
 * 8. Assessment - personalized plan + complete onboarding
 */

test.describe('Onboarding Flow', () => {
    // These tests require a database for authentication
    test.skip(!process.env.DATABASE_URL, 'Requires DATABASE_URL for auth');

    test.beforeEach(async ({ page }) => {
        // Sign in with a fresh user (no pre-existing profile)
        await signIn(page, 'onboarding-test@example.com', 'password123');
        // After sign-in, user should be redirected to onboarding
        await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 15000 });
    });

    test('should display onboarding welcome page', async ({ page }) => {
        await page.goto('/onboarding/welcome');
        await expect(page.getByRole('heading', { name: /welcome to wellness academy/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /let's get started/i })).toBeVisible();
    });

    test('should navigate from welcome to symptoms', async ({ page }) => {
        await page.goto('/onboarding/welcome');
        await page.getByRole('button', { name: /let's get started/i }).click();
        await page.waitForURL(/\/onboarding\/symptoms/);
        await expect(page.getByRole('heading', { name: /what brings you here/i })).toBeVisible();
    });

    test('should require at least one symptom to continue', async ({ page }) => {
        await page.goto('/onboarding/symptoms');

        // The continue button should be disabled with no symptoms selected
        const continueBtn = page.getByRole('button', { name: /continue/i });
        await expect(continueBtn).toBeDisabled();
    });

    test('should select symptom and show severity picker', async ({ page }) => {
        await page.goto('/onboarding/symptoms');

        // Click anxiety symptom
        await page.getByText('Anxiety / Worry').click();

        // Severity picker should appear
        await expect(page.getByText('How would you describe the intensity?')).toBeVisible();

        // Select moderate severity
        await page.getByRole('button', { name: /moderate/i }).click();

        // Continue button should now be enabled
        const continueBtn = page.getByRole('button', { name: /continue/i });
        await expect(continueBtn).toBeEnabled();
    });

    test('should complete safety screening step', async ({ page }) => {
        await page.goto('/onboarding/safety');

        await expect(page.getByRole('heading', { name: /your safety matters/i })).toBeVisible();

        // Both questions must be answered before continue is enabled
        const continueBtn = page.getByRole('button', { name: /continue/i });
        await expect(continueBtn).toBeDisabled();

        // Answer "No" to both safety questions
        const noButtons = page.locator('button:has-text("No")');
        await noButtons.nth(0).click();
        await noButtons.nth(1).click();

        // Continue should now be enabled
        await expect(continueBtn).toBeEnabled();
    });

    test('should require at least one goal to continue', async ({ page }) => {
        await page.goto('/onboarding/goals');

        const continueBtn = page.getByRole('button', { name: /continue/i });
        await expect(continueBtn).toBeDisabled();

        // Select a goal
        await page.getByText('Reduce anxiety and worry').click();
        await expect(continueBtn).toBeEnabled();
    });

    test('should allow skipping optional About You step', async ({ page }) => {
        await page.goto('/onboarding/about-you');

        await expect(page.getByRole('heading', { name: /tell us a bit about you/i })).toBeVisible();

        // Continue button should be enabled (all fields optional)
        const continueBtn = page.getByRole('button', { name: /continue/i });
        await expect(continueBtn).toBeEnabled();

        // Click continue without filling anything
        await continueBtn.click();
        await page.waitForURL(/\/onboarding\/your-experience/);
    });

    test('should allow skipping optional Your Experience step', async ({ page }) => {
        await page.goto('/onboarding/your-experience');

        await expect(page.getByRole('heading', { name: /your experience so far/i })).toBeVisible();

        const continueBtn = page.getByRole('button', { name: /continue/i });
        await expect(continueBtn).toBeEnabled();

        await continueBtn.click();
        await page.waitForURL(/\/onboarding\/in-your-words/);
    });

    test('should allow skipping optional In Your Words step', async ({ page }) => {
        await page.goto('/onboarding/in-your-words');

        await expect(page.getByRole('heading', { name: /in your own words/i })).toBeVisible();

        // Submit button should be available (all prompts optional)
        const submitBtn = page.getByRole('button', { name: /see my recommendations/i });
        await expect(submitBtn).toBeVisible();
    });

    test('should complete full onboarding flow end-to-end', async ({ page }) => {
        // Step 1: Welcome
        await page.goto('/onboarding/welcome');
        await page.getByPlaceholder(/enter a name or nickname/i).fill('Test User');
        await page.getByRole('button', { name: /let's get started/i }).click();

        // Step 2: Symptoms
        await page.waitForURL(/\/onboarding\/symptoms/);
        await page.getByText('Anxiety / Worry').click();
        // Wait for severity picker
        await page.getByText('How would you describe the intensity?').waitFor();
        await page.getByRole('button', { name: /^moderate/i }).click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 3: Safety
        await page.waitForURL(/\/onboarding\/safety/);
        const noButtons = page.locator('button:has-text("No")');
        await noButtons.nth(0).click();
        await noButtons.nth(1).click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 4: Goals
        await page.waitForURL(/\/onboarding\/goals/);
        await page.getByText('Reduce anxiety and worry').click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 5: About You (skip - all optional)
        await page.waitForURL(/\/onboarding\/about-you/);
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 6: Your Experience (skip - all optional)
        await page.waitForURL(/\/onboarding\/your-experience/);
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 7: In Your Words (skip - all optional)
        await page.waitForURL(/\/onboarding\/in-your-words/);
        await page.getByRole('button', { name: /see my recommendations/i }).click();

        // Step 8: Assessment - shows personalized plan
        await page.waitForURL(/\/onboarding\/assessment/);

        // Wait for loading to finish
        await expect(page.getByRole('heading', { name: /your wellness plan is ready/i })).toBeVisible({ timeout: 10000 });

        // Should see recommended courses heading
        await expect(page.getByRole('heading', { name: /recommended courses/i })).toBeVisible();

        // Complete onboarding
        await page.getByRole('button', { name: /start my journey/i }).click();

        // Should redirect to dashboard (uses window.location.href, so wait for full navigation)
        await page.waitForURL(/\/dashboard/, { timeout: 15000 });
        await expect(page.getByText(/welcome/i).first()).toBeVisible();
    });

    test('should complete full flow WITH optional steps filled', async ({ page }) => {
        // Step 1: Welcome
        await page.goto('/onboarding/welcome');
        await page.getByPlaceholder(/enter a name or nickname/i).fill('Full Test');
        await page.getByRole('button', { name: /let's get started/i }).click();

        // Step 2: Symptoms
        await page.waitForURL(/\/onboarding\/symptoms/);
        await page.getByText('Stress / Burnout').click();
        await page.getByText('How would you describe the intensity?').waitFor();
        await page.getByRole('button', { name: /^moderate/i }).click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 3: Safety
        await page.waitForURL(/\/onboarding\/safety/);
        const noButtons = page.locator('button:has-text("No")');
        await noButtons.nth(0).click();
        await noButtons.nth(1).click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 4: Goals
        await page.waitForURL(/\/onboarding\/goals/);
        await page.getByText('Manage stress').click();
        await page.getByText('Self-Paced').click();
        await page.getByText('5-10 minutes').click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 5: About You (fill some fields)
        await page.waitForURL(/\/onboarding\/about-you/);
        await page.getByRole('button', { name: '25-34' }).click();
        await page.getByRole('button', { name: /^Working Employed/i }).click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 6: Your Experience (fill some fields)
        await page.waitForURL(/\/onboarding\/your-experience/);
        await page.getByText('Exercise / movement').click();
        await page.getByText('Meditation / mindfulness').click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 7: In Your Words (fill one prompt)
        await page.waitForURL(/\/onboarding\/in-your-words/);
        await page.locator('#goodDayDescription').fill('A good day means feeling calm and productive.');
        await page.getByRole('button', { name: /see my recommendations/i }).click();

        // Step 8: Assessment
        await page.waitForURL(/\/onboarding\/assessment/);
        await expect(page.getByRole('heading', { name: /your wellness plan is ready/i })).toBeVisible({ timeout: 10000 });
        await page.getByRole('button', { name: /start my journey/i }).click();

        // Dashboard
        await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    });
});

test.describe('Onboarding Navigation', () => {
    // These tests require a database for authentication
    test.skip(!process.env.DATABASE_URL, 'Requires DATABASE_URL for auth');

    test.beforeEach(async ({ page }) => {
        await signIn(page, 'nav-test@example.com', 'password123');
        await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 15000 });
    });

    test('should show back buttons on all steps after welcome', async ({ page }) => {
        await page.goto('/onboarding/symptoms');
        await expect(page.getByRole('button', { name: '← Back' })).toBeVisible();

        await page.goto('/onboarding/safety');
        await expect(page.getByRole('button', { name: '← Back' })).toBeVisible();

        await page.goto('/onboarding/goals');
        await expect(page.getByRole('button', { name: '← Back' })).toBeVisible();

        await page.goto('/onboarding/about-you');
        await expect(page.getByRole('button', { name: '← Back' })).toBeVisible();
    });

    test('should show crisis resources footer on all steps', async ({ page }) => {
        await page.goto('/onboarding/welcome');
        await expect(page.getByText(/call\/text 988/i)).toBeVisible();

        await page.goto('/onboarding/symptoms');
        await expect(page.getByText(/call\/text 988/i)).toBeVisible();
    });

    test('should show progress indicator on each step', async ({ page }) => {
        await page.goto('/onboarding/welcome');
        // Progress component should be visible (step 1 of 8)
        await expect(page.locator('nav[aria-label="Onboarding Progress"]')).toBeVisible();
    });
});
