import { test as base, Page } from '@playwright/test';
import { signInWithCompletedOnboarding } from './helpers';

/**
 * E2E Test Fixtures
 * Provides reusable test setup and teardown logic
 */

type TestFixtures = {
    authenticatedPage: Page;
};

/**
 * Extended test with authenticated page fixture
 * Usage: test('my test', async ({ authenticatedPage }) => { ... })
 * 
 * This fixture provides a page with a user who has completed onboarding,
 * so tests can immediately access protected routes like /dashboard, /academy, etc.
 */
export const test = base.extend<TestFixtures>({
    authenticatedPage: async ({ page }, use) => {
        // Setup: Sign in with completed onboarding before test
        await signInWithCompletedOnboarding(page);

        // Provide page to test
        await use(page);

        // Teardown: Sign out after test (optional)
        // await signOut(page);
    },
});

export { expect } from '@playwright/test';
