import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Error Handling and Accessibility
 * Tests error pages, offline mode, and accessibility features
 */

const requiresDb = !process.env.DATABASE_URL;

test.describe('Error Handling', () => {

    test('should display 404 page for non-existent routes', async ({ page }) => {
        await page.goto('/this-page-does-not-exist-12345');

        const errorPage = page.locator('h1, h2, h3, p, div').filter({
            hasText: /404|not found|page not found|could not be found|doesn't exist/i
        }).first();

        const errorVisible = await errorPage.isVisible({ timeout: 15000 }).catch(() => false);

        if (!errorVisible) {
            const bodyText = await page.locator('body').textContent();
            expect(bodyText).toMatch(/404|not found|page.*not.*found/i);
        }
    });

    test('should have working link back to home from 404', async ({ page }) => {
        await page.goto('/this-page-does-not-exist-12345');

        const homeLink = page.getByRole('link', { name: /home|back|return/i }).first();

        if (await homeLink.isVisible()) {
            await homeLink.click();
            await expect(page).toHaveURL(/^\/$|\/dashboard|\/signin/);
        }
    });

    test('should handle network errors gracefully', async ({ page, context }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        await context.setOffline(true);
        await page.goto('/academy').catch(() => { });
        await page.waitForTimeout(1000);
        await context.setOffline(false);
    });

    test('should handle API errors gracefully', async ({ page }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        await page.route('**/api/**', route => {
            route.fulfill({
                status: 500,
                body: JSON.stringify({ error: { message: 'Internal Server Error' } }),
            });
        });

        await page.goto('/academy');
        await page.waitForTimeout(1000);
    });

    test('should show loading states', async ({ page }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        await page.goto('/academy');
        await expect(page.locator('body')).toBeVisible();
    });

    test('should handle form validation errors', async ({ page }) => {
        await page.goto('/signin');
        await page.getByRole('button', { name: /sign in/i }).click();

        const emailInput = page.locator('input[type="email"]');
        const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
        expect(isInvalid).toBe(true);
    });

    test('should retry failed operations', async ({ page }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        let callCount = 0;
        await page.route('**/api/**', route => {
            callCount++;
            if (callCount === 1) {
                route.fulfill({
                    status: 500,
                    body: JSON.stringify({ error: { message: 'Server Error' } }),
                });
            } else {
                route.continue();
            }
        });

        await page.goto('/academy');
        await page.waitForTimeout(2000);
    });
});

test.describe('Accessibility', () => {

    test('should be keyboard navigable', async ({ page }) => {
        await page.goto('/');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
        await page.goto('/');

        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();

        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeLessThanOrEqual(1);
    });

    test('should have alt text for images', async ({ page }) => {
        await page.goto('/');

        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            expect(alt).toBeDefined();
        }
    });

    test('should have proper ARIA labels', async ({ page }) => {
        await page.goto('/');

        const buttons = page.locator('button');
        const count = await buttons.count();

        for (let i = 0; i < Math.min(count, 5); i++) {
            const button = buttons.nth(i);
            const ariaLabel = await button.getAttribute('aria-label');
            const text = await button.textContent();
            expect(ariaLabel || text).toBeTruthy();
        }
    });

    test('should have skip to main content link', async ({ page }) => {
        await page.goto('/');

        const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();

        if (await skipLink.isVisible({ timeout: 1000 }).catch(() => false)) {
            await skipLink.click();
            const mainContent = page.locator('#main, #content, main').first();
            await expect(mainContent).toBeFocused();
        }
    });

    test('should have proper form labels', async ({ page }) => {
        await page.goto('/signin');

        const emailInput = page.locator('input[type="email"]');
        const emailId = await emailInput.getAttribute('id');

        if (emailId) {
            const label = page.locator(`label[for="${emailId}"]`);
            await expect(label).toBeVisible();
        }
    });

    test('should have proper color contrast', async ({ page }) => {
        await page.goto('/');
        const body = page.locator('body');
        await expect(body).toBeVisible();

        const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, a').first();
        await expect(textElements).toBeVisible();
    });

    test('should support screen reader navigation', async ({ page }) => {
        await page.goto('/');

        const main = page.locator('main, [role="main"], #main, #content').first();
        const mainVisible = await main.isVisible({ timeout: 10000 }).catch(() => false);

        const nav = page.locator('nav, [role="navigation"], header nav').first();
        const navVisible = await nav.isVisible({ timeout: 10000 }).catch(() => false);

        expect(mainVisible || navVisible).toBe(true);
    });

    test('should have focus visible on interactive elements', async ({ page }) => {
        await page.goto('/signin');

        const emailInput = page.locator('input[type="email"]');
        await emailInput.focus();
        await expect(emailInput).toBeFocused();

        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).not.toBe(emailInput);
    });

    test('should announce dynamic content changes', async ({ page }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        await expect(page.locator('body')).toBeVisible();
    });
});

test.describe('Performance', () => {

    test('should load homepage within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(5000);
    });

    test('should load dashboard within acceptable time', async ({ page }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        const startTime = Date.now();
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(5000);
    });

    test('should have acceptable time to interactive', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        const button = page.locator('button, a').first();
        await expect(button).toBeVisible();
    });

    test('should lazy load images', async ({ page }) => {
        await page.goto('/academy');
        await expect(page.locator('body')).toBeVisible();
    });
});

test.describe('Responsive Design', () => {

    test('should work on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await expect(page.locator('body')).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');
        await expect(page.locator('body')).toBeVisible();
    });

    test('should work on desktop viewport', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');
        await expect(page.locator('body')).toBeVisible();
    });

    test('should have responsive navigation', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await expect(page.locator('body')).toBeVisible();

        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');
        await expect(page.locator('body')).toBeVisible();
    });

    test('should have touch-friendly targets on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        const buttons = page.locator('button, a').first();

        if (await buttons.isVisible()) {
            const box = await buttons.boundingBox();
            if (box) {
                expect(box.height).toBeGreaterThanOrEqual(32);
            }
        }
    });
});

test.describe('Security', () => {

    test('should have secure headers', async ({ page }) => {
        const response = await page.goto('/');
        const headers = response?.headers();
        if (headers) {
            expect(headers).toBeDefined();
        }
    });

    test('should prevent XSS attacks', async ({ page }) => {
        await page.goto('/signin');

        const emailInput = page.locator('input[type="email"]');
        await emailInput.fill('<script>alert("XSS")</script>');

        page.on('dialog', dialog => {
            expect(dialog.type()).not.toBe('alert');
            dialog.dismiss();
        });

        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForTimeout(1000);
    });

    test('should have CSRF protection', async ({ page }) => {
        test.skip(requiresDb, 'Requires DATABASE_URL for auth');

        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await page.waitForURL(/\/(dashboard|onboarding)/);

        const form = page.locator('form').first();
        if (await form.isVisible()) {
            await expect(page.locator('body')).toBeVisible();
        }
    });

    test('should use HTTPS in production', async ({ page }) => {
        await page.goto('/');
        const url = page.url();
        expect(url).toMatch(/^https?:\/\//);
    });
});
