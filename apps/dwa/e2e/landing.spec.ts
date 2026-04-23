import { test, expect } from '@playwright/test';
import { signInWithCompletedOnboarding } from './helpers';

/**
 * E2E Tests for Landing Page
 * Tests the public-facing marketing page at /
 * Covers hero, navigation, course tracks, features, FAQ, footer, and crisis resources.
 */

test.describe('Landing Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should load with correct title', async ({ page }) => {
        // Page should have a title (set by Next.js metadata)
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);
    });

    test('should render hero section with headline', async ({ page }) => {
        // Main headline
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('mental health');
    });

    test('should render hero description text', async ({ page }) => {
        // Sub-headline describing the platform
        await expect(page.getByText(/Free.*Evidence-based.*Self-paced/i)).toBeVisible();
    });

    test('should show hero description with course topics', async ({ page }) => {
        await expect(page.getByText(/Free courses on anxiety/i)).toBeVisible();
    });

    test('should have primary CTA button linking to signup', async ({ page }) => {
        const cta = page.getByRole('link', { name: /start learning/i });
        await expect(cta).toBeVisible();
        await expect(cta).toHaveAttribute('href', '/signup');
    });

    test('should show stats section with courses, lessons, and tracks', async ({ page }) => {
        await expect(page.getByText('Courses').first()).toBeVisible();
        await expect(page.getByText('Lessons').first()).toBeVisible();
        await expect(page.getByText('Wellness Tracks').first()).toBeVisible();
        await expect(page.getByText('Evidence-Based').first()).toBeVisible();
    });

    test('should display navigation links', async ({ page }) => {
        // Sign In link
        const signInLink = page.getByRole('link', { name: /sign in/i });
        await expect(signInLink).toBeVisible();
        await expect(signInLink).toHaveAttribute('href', '/signin');

        // Get Started / Sign Up link
        const getStartedLink = page.getByRole('link', { name: /get started/i }).first();
        await expect(getStartedLink).toBeVisible();
        await expect(getStartedLink).toHaveAttribute('href', '/signup');

        // Courses anchor link
        const coursesLink = page.getByRole('link', { name: /^courses$/i });
        await expect(coursesLink).toBeVisible();
    });

    test('should render Wellness Academy logo text', async ({ page }) => {
        await expect(page.getByText('Wellness Academy').first()).toBeVisible();
    });
});

test.describe('Landing Page - Features Section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should display features section heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /built for your wellness journey/i })).toBeVisible();
    });

    test('should list all four feature cards', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Structured Courses' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'AI Wellness Coach' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Interactive Exercises' })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Private.*Safe/ })).toBeVisible();
    });
});

test.describe('Landing Page - Course Tracks Section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should display wellness tracks heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /five wellness tracks/i })).toBeVisible();
    });

    test('should show course catalog heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /browse our courses/i })).toBeVisible();
    });

    test('should display track sections with course cards', async ({ page }) => {
        // Each track section should have course links
        const courseLinks = page.locator('a[href^="/academy/"]');
        const count = await courseLinks.count();
        // Should have at least 5 courses across tracks
        expect(count).toBeGreaterThanOrEqual(5);
    });

    test('should show lesson counts on course cards', async ({ page }) => {
        // Course cards display "X lessons" text
        const lessonLabels = page.getByText(/\d+ lessons/);
        const count = await lessonLabels.count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe('Landing Page - FAQ Section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should display common questions heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /common questions/i })).toBeVisible();
    });

    test('should show FAQ items', async ({ page }) => {
        await expect(page.getByText('Is this a replacement for therapy?')).toBeVisible();
        await expect(page.getByText('Is it really free?')).toBeVisible();
        await expect(page.getByText('Is my information private?')).toBeVisible();
        await expect(page.getByText('What topics are covered?')).toBeVisible();
        await expect(page.getByText(/what if I.*m in crisis/i)).toBeVisible();
        await expect(page.getByText('How long do courses take?')).toBeVisible();
    });
});

test.describe('Landing Page - Footer and Crisis Resources', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should display footer with copyright', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        await expect(footer.getByText(/wellness academy/i)).toBeVisible();
    });

    test('should show crisis support phone link in footer', async ({ page }) => {
        const crisisLink = page.locator('footer a[href="tel:988"]');
        await expect(crisisLink).toBeVisible();
        await expect(crisisLink).toContainText('988');
    });

    test('should show crisis support label in footer', async ({ page }) => {
        await expect(page.locator('footer').getByText(/crisis support/i)).toBeVisible();
    });
});

test.describe('Landing Page - Final CTA Section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should display final CTA heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /you.*re in the right place/i })).toBeVisible();
    });

    test('should have final CTA button linking to signup', async ({ page }) => {
        const ctaLink = page.getByRole('link', { name: /get started/i }).last();
        await expect(ctaLink).toBeVisible();
        await expect(ctaLink).toHaveAttribute('href', '/signup');
    });
});

test.describe('Landing Page - Navigation', () => {

    test('should navigate to signin page when clicking Sign In', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await page.getByRole('link', { name: /sign in/i }).click();
        await page.waitForURL(/\/signin/);
        expect(page.url()).toContain('/signin');
    });

    test('should navigate to signup page when clicking Get Started', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await page.getByRole('link', { name: /get started/i }).first().click();
        await page.waitForURL(/\/signup/);
        expect(page.url()).toContain('/signup');
    });

    // Skip: requires DATABASE_URL for signin API to work
    test.skip('should redirect authenticated users to dashboard', async ({ page }) => {
        await signInWithCompletedOnboarding(page);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForURL(/\/dashboard/, { timeout: 10000 });
        expect(page.url()).toContain('/dashboard');
    });
});
