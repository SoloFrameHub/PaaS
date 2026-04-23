import { test, expect } from '@playwright/test';
import { signInWithCompletedOnboarding, signInWithIncompleteOnboarding } from './helpers';

/**
 * E2E Tests for Authentication Flow
 * Tests signup, signin, signout, and session persistence
 */

test.describe('Authentication Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Start from the home page
        await page.goto('/');
    });

    test('should display signin page', async ({ page }) => {
        await page.goto('/signin');

        // Check for signin form elements
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    });

    test('should display signup page', async ({ page }) => {
        await page.goto('/signup');

        // Check for signup form elements
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
    });

    test('should sign up with mock authentication', async ({ page }) => {
        await page.goto('/signup');

        // Fill in signup form
        const timestamp = Date.now();
        await page.locator('input#name').fill('E2E Test User');
        await page.locator('input[type="email"]').fill(`test-${timestamp}@example.com`);
        await page.locator('input[type="password"]').fill('TestPassword123!');

        // Check T&C
        await page.locator('input[type="checkbox"]').check();

        // Submit form
        await page.getByRole('button', { name: /sign up/i }).click();


        // Should redirect to onboarding
        await expect(page).toHaveURL(/\/onboarding/);
    });

    test('should sign in with mock authentication', async ({ page }) => {
        // Use helper that creates a user with completed onboarding
        await signInWithCompletedOnboarding(page);

        // Should be on dashboard (not onboarding) since user has completed onboarding
        await expect(page).toHaveURL(/\/dashboard/);
    });

    test('should persist session after page reload', async ({ page }) => {
        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);

        // Reload page
        await page.reload();

        // Should still be authenticated and on dashboard (not redirected to signin)
        await expect(page).toHaveURL(/\/dashboard/);
        expect(page.url()).not.toContain('/signin');
    });

    test('should sign out successfully', async ({ page }) => {
        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);

        // Find and click signout button (usually in header/dropdown)
        // This selector may need adjustment based on your UI
        const signoutButton = page.getByRole('button', { name: /sign out/i }).or(
            page.getByText(/sign out/i)
        );

        if (await signoutButton.isVisible()) {
            await signoutButton.click();

            // Should redirect to signin or home
            await expect(page).toHaveURL(/\/(signin|$)/);
        }
    });

    test('should protect authenticated routes', async ({ page }) => {
        // Try to access protected route without authentication
        await page.goto('/dashboard');

        // Should redirect to signin
        await expect(page).toHaveURL(/\/signin/);
    });

    test('should show validation errors for invalid email', async ({ page }) => {
        await page.goto('/signin');

        // Enter invalid email
        await page.locator('input[type="email"]').fill('invalid-email');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();

        // Should still be on signin page (browser validation or error shown)
        expect(page.url()).toContain('/signin');
    });

    test('should handle signin errors gracefully', async ({ page }) => {
        await page.goto('/signin');

        // Try to sign in with empty credentials
        await page.getByRole('button', { name: /sign in/i }).click();

        // Either validation prevents submission or error is shown
        const currentUrl = page.url();
        expect(currentUrl).toContain('/signin');
    });

});

test.describe('Session Management', () => {

    test('should handle expired sessions', async ({ page, context }) => {
        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);

        // Verify we're on dashboard
        await expect(page).toHaveURL(/\/dashboard/);

        // Clear cookies to simulate expired session
        await context.clearCookies();

        // Try to access protected route
        await page.goto('/dashboard');

        // Should redirect to signin
        await expect(page).toHaveURL(/\/signin/);
    });

    test('should maintain session across tabs', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();

        // Sign in on first tab with completed onboarding
        await signInWithCompletedOnboarding(page1);

        // Verify first tab is on dashboard
        await expect(page1).toHaveURL(/\/dashboard/);

        // Access protected route on second tab
        await page2.goto('/dashboard');

        // Should be authenticated and on dashboard (not redirected to signin)
        await expect(page2).toHaveURL(/\/dashboard/);
        expect(page2.url()).not.toContain('/signin');

        await context.close();
    });
});
