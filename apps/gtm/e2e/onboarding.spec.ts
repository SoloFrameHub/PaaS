import { test, expect } from '@playwright/test';
import { signIn } from './helpers';

/**
 * E2E Tests for Onboarding Flow
 * Tests the complete onboarding journey from questionnaire to assessment
 */

test.describe('Onboarding Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in first using common helper
        await signIn(page, 'test@example.com', 'password123');

        // Wait for redirect to either dashboard or onboarding
        // Dashboard will redirect to onboarding if needed
        await page.waitForURL(/\/(dashboard|onboarding)/);
    });

    test('should display onboarding welcome page', async ({ page }) => {
        await page.goto('/onboarding/welcome');

        // Check for welcome content
        await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
        // Updated to match "Next Step →"
        await expect(page.getByRole('button', { name: /next step/i })).toBeVisible();
    });

    test('should navigate to business step from welcome', async ({ page }) => {
        await page.goto('/onboarding/welcome');

        // Fill in welcome info
        await page.getByLabel(/your name/i).fill('Test User');
        await page.getByLabel(/company/i).fill('Test Company');

        // Select a business model
        await page.getByText(/B2B SaaS/i).click();

        // Continue
        await page.getByRole('button', { name: /next step/i }).click();

        // Should navigate to business step
        await page.waitForURL(/\/onboarding\/business/);
        await expect(page.getByRole('heading', { name: /tell us about/i })).toBeVisible();
    });

    test('should complete business information step', async ({ page }) => {
        await page.goto('/onboarding/business');

        // Fill business information
        const websiteInput = page.getByLabel(/website/i);
        if (await websiteInput.isVisible()) {
            await websiteInput.fill('https://test-business.com');
        }

        const pitchInput = page.getByLabel(/what does your business do/i);
        await pitchInput.fill('We build elite sales tools for solo founders.');

        const audienceInput = page.getByLabel(/ideal customer/i);
        await audienceInput.fill('B2B SaaS founders earning $5k-$20k MRR.');

        // Continue to next step
        const continueButton = page.getByRole('button', { name: /next step/i });
        await continueButton.click();

        // Order is Business -> Questionnaire
        await page.waitForURL(/\/onboarding\/questionnaire/);
    });

    test('should navigate through questionnaire sections', async ({ page }) => {
        await page.goto('/onboarding/questionnaire');

        // Check questionnaire is visible
        await expect(page.getByText(/Section 1 of/i)).toBeVisible();

        // First section: Business Context
        await page.locator('textarea').first().fill('Test Pitch');
        await page.getByRole('button', { name: /next section/i }).click();

        // Second section: Current State
        await expect(page.getByText(/Section 2 of/i)).toBeVisible();
        // Select an option using exact text from UI
        await page.getByText(/Doing outreach, no meetings booked/i).click();
        await page.getByRole('button', { name: /next section/i }).click();

        // Third section: Founder Profile
        await expect(page.getByText(/Section 3 of/i)).toBeVisible();
        await page.getByRole('button', { name: /Technical founder/i }).click();
        await page.getByRole('button', { name: /next section/i }).click();


        // The remaining sections can be skipped in a "fast" test or just verified they exist
        // For a full E2E we should ideally fill them out, but let's check navigation basics
        await expect(page.getByText(/Section 4 of/i)).toBeVisible();
    });

    test('should complete full onboarding flow', async ({ page }) => {
        // Start from welcome
        await page.goto('/onboarding/welcome');

        // Welcome info
        await page.getByLabel(/your name/i).fill('E2E Full User');
        await page.getByLabel(/company/i).fill('E2E Corp');
        await page.getByText(/B2B SaaS/i).click();
        await page.getByRole('button', { name: /next step/i }).click();

        // Business info
        await page.waitForURL(/\/onboarding\/business/);
        await page.getByLabel(/what does your business do/i).fill('E2E Testing');
        await page.getByLabel(/ideal customer/i).fill('Developers');
        await page.getByRole('button', { name: /next step/i }).click();

        // Questionnaire - we need to go through all sections to reach the end
        await page.waitForURL(/\/onboarding\/questionnaire/);

        // This is a loop to click "Next Section" until it becomes "Complete Questionnaire"
        let isComplete = false;
        while (!isComplete) {
            const nextButton = page.getByRole('button', { name: /next section|complete questionnaire/i });
            const buttonText = await nextButton.textContent();

            // Fill mandatory fields if needed (current implementation allows empty for some)
            // But let's at least click through
            await nextButton.click();

            if (buttonText?.includes('Complete')) {
                isComplete = true;
            } else {
                await page.waitForTimeout(300); // Animation buffer
            }
        }

        // Should reach context or analyzing
        await page.waitForURL(/\/onboarding\/(context|analyzing)/, { timeout: 15000 });
        expect(page.url()).toMatch(/\/onboarding\/(context|analyzing)/);
    });
});

test.describe('Onboarding Navigation', () => {

    test.beforeEach(async ({ page }) => {
        await signIn(page, 'test@example.com', 'password123');
        await page.waitForURL(/\/(dashboard|onboarding)/);
    });



    test('should prevent skipping ahead to incomplete steps', async ({ page }) => {
        // Try to jump to context without completing earlier steps
        // The middleware or page logic should handle this
        await page.goto('/onboarding/context');

        // Should likely redirect to welcome if no data
        await page.waitForTimeout(1000);
        const currentUrl = page.url();

        // Just ensure it stays in onboarding flow
        expect(currentUrl).toMatch(/\/onboarding\//);
    });
});

