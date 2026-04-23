import { Page, expect } from '@playwright/test';
import { testUsers, generateTestUser } from './test-data';
import type { FounderProfile } from '@/types/profile';

/**
 * E2E Test Helpers
 * Reusable functions for common E2E test operations
 */

/**
 * Create a mock profile in the mock database for testing
 * This works by calling an API endpoint that will save the profile to the mock repository
 */
export async function createMockProfile(page: Page, profile: FounderProfile) {
    // In mock mode, we need to pre-populate the profile
    // We'll do this by making an API call to save the profile
    const ok = await page.evaluate(async (profileData) => {
        try {
            const res = await fetch('/api/test/setup-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profile: profileData }),
            });
            return res.ok;
        } catch (e) {
            return false;
        }
    }, profile);

    if (!ok) {
        // Fallback for extreme cases
        await page.evaluate((profileData) => {
            sessionStorage.setItem(`mock_profile_${profileData.userId}`, JSON.stringify(profileData));
        }, profile);
    }
    // Give a tiny bit of time for file system sync in mock repo
    await page.waitForTimeout(200);
}

/**
 * Sign in with a user who has completed onboarding
 * This is the recommended helper for most authenticated tests
 */
export async function signInWithCompletedOnboarding(page: Page, userType: 'completed' | 'withProgress' | 'creator' | 'power' = 'completed') {
    const user = testUsers[userType];

    // Create the mock profile first
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await createMockProfile(page, user.profile);

    // Now sign in
    await signIn(page, user.email, user.password);

    // Verify we're NOT stuck on onboarding
    // The profile update might take a moment to be reflected in the next request
    await page.waitForURL(/\/(dashboard|academy)/, { timeout: 15000 }).catch(() => null);

    let currentUrl = page.url();

    // If still on onboarding, try one more time by navigating to academy
    if (currentUrl.includes('/onboarding') || currentUrl.includes('/founder-assessment')) {
        console.log('⚠️ Stuck on onboarding, attempting manual navigation to academy...');
        await page.goto('/academy', { waitUntil: 'networkidle', timeout: 30000 });
        currentUrl = page.url();
    }

    if (currentUrl.includes('/onboarding') || currentUrl.includes('/founder-assessment')) {
        throw new Error(`Sign in failed - stuck on onboarding/assessment despite profile having onboardingCompleted: true. URL: ${currentUrl}`);
    }

    return user;
}

/**
 * Sign in with a user who has NOT completed onboarding
 * Use this for onboarding flow tests
 */
export async function signInWithIncompleteOnboarding(page: Page) {
    const user = testUsers.incomplete;

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await createMockProfile(page, user.profile);
    await signIn(page, user.email, user.password);

    // Should be on onboarding
    await page.waitForURL(/\/onboarding/, { timeout: 10000 });

    return user;
}

/**
 * Sign up a new user with custom profile data
 */
export async function signUpWithProfile(page: Page, profileOverrides: Partial<FounderProfile> = {}) {
    const user = generateTestUser(profileOverrides);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await createMockProfile(page, user.profile);
    await signUp(page, user.email, user.password);

    return user;
}

/**
 * Sign in helper with improved error handling and timeouts
 */
export async function signIn(page: Page, email = 'test@example.com', password = 'password123') {
    // Navigate to signin page
    await page.goto('/signin', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for signin form to be ready
    await page.waitForSelector('input[type="email"]', { state: 'visible', timeout: 10000 });

    // Fill in credentials - focus and fill to ensure events are triggered
    await page.locator('#email').click();
    await page.locator('#email').fill(email);

    await page.locator('#password').click();
    await page.locator('#password').fill(password);

    // Set up response listener and click in parallel
    const [response] = await Promise.all([
        page.waitForResponse(
            resp => {
                const isMatch = resp.url().includes('/api/auth/session');
                if (isMatch) console.log(`Debug: Seen response for /api/auth/session with status ${resp.status()}`);
                return isMatch && resp.status() === 200;
            },
            { timeout: 15000 }
        ).catch((err) => {
            console.warn(`Sign in: Wait for /api/auth/session failed: ${err.message}`);
            return null;
        }),
        page.getByRole('button', { name: /sign in/i }).click({ force: true })
    ]);

    // Wait for network to be idle after signin or a short timeout
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => null);

    // Explicitly wait for the session cookie to be set in the browser context
    let hasSession = false;
    for (let i = 0; i < 20; i++) {
        const cookies = await page.context().cookies();
        if (cookies.some(c => c.name === 'session')) {
            hasSession = true;
            break;
        }
        await page.waitForTimeout(500);
    }

    // Check current state
    const currentUrl = page.url();

    // If still on signin, try waiting for redirect or manual navigation
    if (currentUrl.includes('/signin')) {
        try {
            // Wait for any legitimate redirect after signin
            await page.waitForURL(/\/(dashboard|onboarding|academy)/, { timeout: 15000 });
        } catch (e) {
            if (!hasSession) {
                const cookies = await page.context().cookies();
                console.error(`Sign in failed - no session cookie found. URL: ${page.url()}, Response received: ${!!response}`);
                console.error(`Available cookies: ${JSON.stringify(cookies.map(c => ({ name: c.name, domain: c.domain, secure: c.secure })))}`);

                // Take a screenshot for debugging
                const timestamp = Date.now();
                await page.screenshot({ path: `test-results/signin-failure-${timestamp}.png` }).catch(() => null);
                throw new Error(`Sign in failed - no session cookie. Current URL: ${page.url()}`);
            }

            // Session exists but no redirect occurred - manually navigate to dashboard
            console.log('Session exists but no redirect, manually navigating to dashboard...');
            await page.goto('/dashboard', { waitUntil: 'domcontentloaded', timeout: 30000 });
        }
    }

    // Ensure final page is stable
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
}

/**
 * Sign up helper with improved error handling
 */
export async function signUp(page: Page, email?: string, password = 'TestPassword123!') {
    const timestamp = Date.now();
    const testEmail = email || `test-${timestamp}@example.com`;

    await page.goto('/signup', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for signup form
    await page.waitForSelector('input[type="email"]', { state: 'visible', timeout: 10000 });

    // Fill in credentials
    await page.locator('input[type="email"]').fill(testEmail);
    await page.locator('input[type="password"]').fill(password);

    // Set up response listener before clicking
    const sessionPromise = page.waitForResponse(
        resp => resp.url().includes('/api/auth/session') && resp.status() === 200,
        { timeout: 15000 }
    ).catch(() => null);

    // Click sign up button
    const signUpButton = page.getByRole('button', { name: /sign up/i });
    await signUpButton.click();

    // Wait for session API call
    await sessionPromise;

    // Wait for client-side redirects
    await page.waitForTimeout(1000);

    const currentUrl = page.url();

    // If still on signup, try waiting for redirect
    if (currentUrl.includes('/signup')) {
        try {
            await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 10000 });
        } catch {
            const cookies = await page.context().cookies();
            const hasSession = cookies.some(c => c.name === 'session');

            if (!hasSession) {
                throw new Error(`Sign up failed - no session cookie. Current URL: ${currentUrl}`);
            }

            await page.goto('/dashboard', { waitUntil: 'domcontentloaded', timeout: 30000 });
        }
    }

    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });

    return { email: testEmail, password };
}

/**
 * Navigate to a page with proper waiting
 */
export async function navigateTo(page: Page, url: string) {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
}

/**
 * Wait for element with retry logic
 */
export async function waitForElement(
    page: Page,
    selector: string,
    options: { timeout?: number; state?: 'visible' | 'hidden' | 'attached' } = {}
) {
    const timeout = options.timeout || 30000;
    const state = options.state || 'visible';

    try {
        await page.waitForSelector(selector, { state, timeout });
        return true;
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return false;
    }
}

/**
 * Click element with retry logic
 */
export async function clickElement(page: Page, selector: string, options: { timeout?: number } = {}) {
    const timeout = options.timeout || 30000;

    await page.waitForSelector(selector, { state: 'visible', timeout });
    await page.locator(selector).click();

    // Wait a bit for any animations or transitions
    await page.waitForTimeout(300);
}

/**
 * Fill input with proper waiting
 */
export async function fillInput(page: Page, selector: string, value: string, options: { timeout?: number } = {}) {
    const timeout = options.timeout || 30000;

    await page.waitForSelector(selector, { state: 'visible', timeout });
    await page.locator(selector).fill(value);
}

/**
 * Wait for navigation to complete
 */
export async function waitForNavigation(page: Page, urlPattern: RegExp, options: { timeout?: number } = {}) {
    const timeout = options.timeout || 60000;

    try {
        await page.waitForURL(urlPattern, { timeout });
        await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (error) {
        const currentUrl = page.url();
        console.warn(`Navigation timeout. Current URL: ${currentUrl}, Expected pattern: ${urlPattern}`);

        // Check if we're close enough to the expected URL
        if (!urlPattern.test(currentUrl)) {
            throw error;
        }
    }
}

/**
 * Check if element exists without throwing
 */
export async function elementExists(page: Page, selector: string, timeout = 5000): Promise<boolean> {
    try {
        await page.waitForSelector(selector, { state: 'visible', timeout });
        return true;
    } catch {
        return false;
    }
}

/**
 * Get element text safely
 */
export async function getElementText(page: Page, selector: string, defaultText = ''): Promise<string> {
    try {
        const element = page.locator(selector).first();
        const text = await element.textContent({ timeout: 5000 });
        return text || defaultText;
    } catch {
        return defaultText;
    }
}

/**
 * Wait for loading to complete
 */
export async function waitForLoadingToComplete(page: Page) {
    // Wait for common loading indicators to disappear
    const loadingSelectors = [
        '[data-testid="loading"]',
        '.loading',
        '.spinner',
        'text=/loading/i'
    ];

    for (const selector of loadingSelectors) {
        try {
            await page.waitForSelector(selector, { state: 'hidden', timeout: 30000 });
        } catch {
            // Loading indicator might not exist, which is fine
        }
    }

    // Wait for network to be idle
    await page.waitForLoadState('networkidle', { timeout: 30000 });
}

/**
 * Dismiss any modals or overlays
 */
export async function dismissModals(page: Page) {
    const closeButtons = [
        '[data-testid="close-modal"]',
        '[aria-label="Close"]',
        'button:has-text("Close")',
        'button:has-text("×")'
    ];

    for (const selector of closeButtons) {
        try {
            const button = page.locator(selector).first();
            if (await button.isVisible({ timeout: 1000 })) {
                await button.click();
                await page.waitForTimeout(300);
            }
        } catch {
            // Modal might not exist
        }
    }
}

/**
 * Take screenshot with error context
 */
export async function takeScreenshotOnError(page: Page, testName: string) {
    try {
        await page.screenshot({
            path: `test-results/error-${testName}-${Date.now()}.png`,
            fullPage: true
        });
    } catch (error) {
        console.warn('Failed to take screenshot:', error);
    }
}

/**
 * Setup test with authentication
 */
export async function setupAuthenticatedTest(page: Page) {
    await signIn(page);

    // Ensure we're on dashboard or onboarding
    const currentUrl = page.url();
    if (currentUrl.includes('/onboarding')) {
        // Try to navigate to dashboard
        try {
            await page.goto('/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
        } catch {
            // If dashboard navigation fails, stay on onboarding
        }
    }
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
    fn: () => Promise<T>,
    options: { maxAttempts?: number; delay?: number } = {}
): Promise<T> {
    const maxAttempts = options.maxAttempts || 3;
    const baseDelay = options.delay || 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }

            const delay = baseDelay * Math.pow(2, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw new Error('Retry failed');
}
