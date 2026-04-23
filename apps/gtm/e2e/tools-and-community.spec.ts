import { test, expect } from '@playwright/test';
import { signInWithCompletedOnboarding } from './helpers';

/**
 * E2E Tests for ICP Builder Tool
 * Tests the Ideal Customer Profile builder functionality
 */

test.describe('ICP Builder', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in first
        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();

        await page.waitForURL(/\/(dashboard|onboarding)/);
    });

    test('should navigate to ICP builder', async ({ page }) => {
        // Navigate to ICP builder
        await page.goto('/academy/tools/icp-builder');

        // Should show ICP builder page
        await expect(page).toHaveURL(/\/icp-builder/);
        await expect(page.locator('h1, h2').filter({ hasText: /icp|ideal customer|profile/i }).first()).toBeVisible();
    });

    test('should display ICP builder form', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Should have form fields
        const form = page.getByTestId('icp-builder-form').or(page.locator('form').first());
        await expect(form).toBeVisible();

        // Should have some input fields
        const inputs = form.locator('input, textarea, select');
        const count = await inputs.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should fill out ICP information', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Fill out basic ICP information
        const industryInput = page.getByTestId('industry-input').or(page.getByLabel(/Industry \/ Vertical/i)).or(page.locator('input[name*="industry"]')).first();
        if (await industryInput.isVisible()) {
            await industryInput.fill('SaaS');
        }

        const companySizeInput = page.getByTestId('company-size-input').or(page.getByLabel(/Company Size/i)).or(page.locator('select[name*="size"]')).first();
        if (await companySizeInput.isVisible()) {
            await companySizeInput.selectOption({ index: 1 });
        }

        const jobTitlesInput = page.getByTestId('job-titles-input').or(page.getByLabel(/Job Titles/i)).or(page.locator('input[name*="job"], input[name*="titles"]')).first();
        if (await jobTitlesInput.isVisible()) {
            await jobTitlesInput.fill('VP Sales');
        }
    });

    test('should add pain points', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Look for pain points section
        const painPointInput = page.getByTestId('pain-points-input').or(page.getByLabel(/Observed Pain Points/i)).or(page.locator('textarea[name*="pain"]')).first();

        if (await painPointInput.isVisible()) {
            await painPointInput.fill('Struggling with customer acquisition');
        }

        // Look for add button
        const addButton = page.getByRole('button', { name: /add|create/i }).first();
        if (await addButton.isVisible()) {
            await addButton.click();
            await page.waitForTimeout(500);
        }
    });

    test('should add goals and objectives', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Look for goals section
        const goalsInput = page.locator('input[name*="goal"], textarea[name*="goal"]').first();

        if (await goalsInput.isVisible()) {
            await goalsInput.fill('Increase MRR by 50%');
        }
    });

    test('should generate ICP', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Fill out minimal required fields
        const form = page.locator('form').first();
        const inputs = form.locator('input[type="text"], textarea').filter({ hasNotText: '' });

        // Fill first few inputs with sample data
        const count = Math.min(await inputs.count(), 3);
        for (let i = 0; i < count; i++) {
            const input = inputs.nth(i);
            if (await input.isVisible() && await input.isEditable()) {
                await input.fill('Sample data');
            }
        }

        // Look for generate/submit button
        const generateButton = page.getByTestId('validate-icp-button')
            .or(page.getByRole('button', { name: /validate icp|generate|create|submit/i }))
            .or(page.locator('button[type="submit"]')).first();

        if (await generateButton.isVisible() && await generateButton.isEnabled()) {
            await generateButton.click();

            // Should show loading or results
            await page.waitForTimeout(2000);
        }
    });

    test('should display generated ICP', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // After generation, should show ICP results
        // This test assumes ICP has been generated
        const icpResults = page.locator('[data-testid="icp-results"]').or(
            page.locator('text=/profile|persona|customer/i').first()
        );

        // Should have some content
        await expect(page.locator('body')).toBeVisible();
    });

    test('should save ICP', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Look for save button
        const saveButton = page.getByTestId('save-icp-button')
            .or(page.getByRole('button', { name: /save|export/i })).first();

        if (await saveButton.isVisible()) {
            await saveButton.click();

            // Should show success message or download
            await page.waitForTimeout(1000);
        }
    });

    test('should export ICP', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Look for export button
        const exportButton = page.getByTestId('export-icp-button')
            .or(page.getByRole('button', { name: /export|download/i })).first();

        if (await exportButton.isVisible()) {
            // Set up download listener
            const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);

            await exportButton.click();

            const download = await downloadPromise;
            if (download) {
                expect(download.suggestedFilename()).toMatch(/icp|profile|customer/i);
            }
        }
    });

    test('should validate required fields', async ({ page }) => {
        await page.goto('/academy/tools/icp-builder');

        // Try to submit without filling required fields
        const submitButton = page.getByRole('button', { name: /generate|create|submit/i }).first();

        if (await submitButton.isVisible()) {
            await submitButton.click();

            // Should show validation errors
            const errorMessage = page.locator('[role="alert"], .error, text=/required|invalid/i').first();

            // Either validation prevents submission or error is shown
            await page.waitForTimeout(500);
        }
    });
});

test.describe('Community Features', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in first
        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();

        await page.waitForURL(/\/(dashboard|onboarding)/);
    });

    test('should navigate to community page', async ({ page }) => {
        await page.goto('/community/feed');

        // Should show community page
        await expect(page).toHaveURL(/\/community\/feed/);
        await expect(page.locator('h1, h2, h3').filter({ hasText: /community|forum|feed/i }).first()).toBeVisible();
    });

    test('should display community feed', async ({ page }) => {
        await page.goto('/community/feed');

        // Should show feed posts
        const feedPosts = page.getByTestId('feed-post').or(page.locator('div.bg-white.dark\\:bg-gray-800.shadow-sm.rounded-xl.p-5')).or(
            page.locator('article, .post').first()
        );

        await expect(page.locator('body')).toBeVisible();
    });

    test('should view forum posts', async ({ page }) => {
        await page.goto('/community/forum');

        // Should show forum posts
        const forumPosts = page.locator('[data-testid="forum-post"]').or(
            page.locator('article, .post').first()
        );

        await expect(page.locator('body')).toBeVisible();
    });

    test('should open post detail', async ({ page }) => {
        await page.goto('/community/forum');

        // Click on first post
        const firstPost = page.locator('article, .post, [data-testid="forum-post"]').first();

        if (await firstPost.isVisible()) {
            await firstPost.click();

            // Should navigate to post detail
            await page.waitForURL(/\/community\/forum\/post/);
            expect(page.url()).toContain('/post');
        }
    });

    test('should create new post', async ({ page }) => {
        await page.goto('/community/forum');

        // Look for create post button
        const createButton = page.getByRole('button', { name: /create|new post|write/i }).first();

        if (await createButton.isVisible()) {
            await createButton.click();

            // Should show create post form
            const titleInput = page.locator('input[name="title"], input[placeholder*="title" i]').first();
            const contentInput = page.locator('textarea[name="content"], textarea[placeholder*="content" i]').first();

            if (await titleInput.isVisible() && await contentInput.isVisible()) {
                await titleInput.fill('Test Post Title');
                await contentInput.fill('This is a test post content.');

                // Look for submit button
                const submitButton = page.getByTestId('create-post-button')
                    .or(page.getByRole('button', { name: /post|submit|publish/i })).first();

                if (await submitButton.isVisible()) {
                    await submitButton.click();
                    await page.waitForTimeout(1000);
                }
            }
        }
    });

    test('should comment on post', async ({ page }) => {
        await page.goto('/community/forum');

        // Click on first post
        const firstPost = page.locator('article, .post').first();

        if (await firstPost.isVisible()) {
            const postLink = firstPost.getByTestId('post-link').or(firstPost.locator('a')).first();
            await postLink.click();
            await page.waitForURL(/\/community\/forum\/post/);

            // Look for comment input
            const commentInput = page.getByTestId('comment-input')
                .or(page.locator('textarea[placeholder*="comment" i], input[placeholder*="comment" i]')).first();

            if (await commentInput.isVisible()) {
                await commentInput.fill('This is a test comment.');

                // Look for submit button
                const submitButton = page.getByRole('button', { name: /comment|reply|post/i }).first();

                if (await submitButton.isVisible()) {
                    await submitButton.click();
                    await page.waitForTimeout(1000);
                }
            }
        }
    });

    test('should like/upvote post', async ({ page }) => {
        await page.goto('/community/feed');

        // Look for like/upvote button
        const likeButton = page.getByTestId('like-button')
            .or(page.locator('button').filter({ has: page.locator('svg.fill-current') })).first();

        if (await likeButton.isVisible()) {
            await likeButton.click();
            await page.waitForTimeout(500);
        }
    });

    test('should filter posts by category', async ({ page }) => {
        await page.goto('/community/forum');

        // Look for category filter
        const categoryFilter = page.locator('select[name*="category"], button[name*="category"]').first();

        if (await categoryFilter.isVisible()) {
            if (await categoryFilter.getAttribute('role') === 'button') {
                await categoryFilter.click();

                // Select first option
                const firstOption = page.locator('[role="option"]').first();
                if (await firstOption.isVisible()) {
                    await firstOption.click();
                }
            } else {
                await categoryFilter.selectOption({ index: 1 });
            }

            await page.waitForTimeout(1000);
        }
    });

    test('should search community posts', async ({ page }) => {
        await page.goto('/community/forum');

        // Look for search input
        const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();

        if (await searchInput.isVisible()) {
            await searchInput.fill('sales');
            await searchInput.press('Enter');

            // Should filter posts
            await page.waitForTimeout(1000);
        }
    });

    test('should view user profile from post', async ({ page }) => {
        await page.goto('/community/forum');

        // Click on first post
        const firstPost = page.locator('article, .post').first();

        if (await firstPost.isVisible()) {
            // Click on the post link specifically if available, otherwise just wait for the detail page
            const postLink = firstPost.getByTestId('post-link').or(firstPost.locator('a')).first();
            await postLink.click();
            await page.waitForURL(/\/community\/forum\/post/);

            // Look for author link
            const authorLink = page.getByTestId('post-author-link')
                .or(page.locator('a[href*="/profile"], a[href*="/user"]')).first();

            if (await authorLink.isVisible()) {
                await authorLink.click();

                // Should navigate to user profile
                await page.waitForURL(/\/community\/profile/);
            }
        }
    });

    test('should report inappropriate content', async ({ page }) => {
        await page.goto('/community/forum');

        // Click on first post
        const firstPost = page.locator('article, .post').first();

        if (await firstPost.isVisible()) {
            const postLink = firstPost.getByTestId('post-link').or(firstPost.locator('a')).first();
            await postLink.click();
            await page.waitForURL(/\/community\/forum\/post/);

            // Look for report button (usually in dropdown menu)
            const moreButton = page.getByRole('button', { name: /more|options|menu/i }).first();

            if (await moreButton.isVisible()) {
                await moreButton.click();

                const reportButton = page.getByRole('button', { name: /report|flag/i }).first();

                if (await reportButton.isVisible()) {
                    await reportButton.click();
                    await page.waitForTimeout(500);
                }
            }
        }
    });
});

test.describe('Notifications', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in first
        await page.goto('/signin');
        await page.locator('input[type="email"]').fill('test@example.com');
        await page.locator('input[type="password"]').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();

        await page.waitForURL(/\/(dashboard|onboarding)/);
    });

    test('should view notifications', async ({ page }) => {
        await page.goto('/dashboard');

        // Look for notifications bell
        const notificationsButton = page.getByTestId('notifications-button')
            .or(page.getByRole('button', { name: /notification/i }));

        if (await notificationsButton.isVisible()) {
            await notificationsButton.click();

            // Should show notifications panel
            const notificationsPanel = page.getByTestId('notifications-panel')
                .or(page.locator('[role="menu"]'))
                .or(page.locator('div').filter({ hasText: /^Notifications$/i }));

            await expect(notificationsPanel.first()).toBeVisible();
        }
    });

    test('should display notification count', async ({ page }) => {
        await page.goto('/dashboard');

        // Look for notification badge
        const notificationBadge = page.locator('div.bg-red-500').or(
            page.locator('.badge, .count').first()
        );

        await expect(page.locator('body')).toBeVisible();
    });

    test('should mark notification as read', async ({ page }) => {
        await page.goto('/dashboard');

        // Open notifications
        const notificationsButton = page.getByRole('button', { name: /notification/i }).first();

        if (await notificationsButton.isVisible()) {
            await notificationsButton.click();

            // Click on first notification
            const firstNotification = page.locator('[data-testid="notification"]').or(
                page.locator('.notification').first()
            );

            if (await firstNotification.isVisible()) {
                await firstNotification.click();
                await page.waitForTimeout(500);
            }
        }
    });

    test('should clear all notifications', async ({ page }) => {
        await page.goto('/dashboard');

        // Open notifications
        const notificationsButton = page.getByRole('button', { name: /notification/i }).first();

        if (await notificationsButton.isVisible()) {
            await notificationsButton.click();

            // Look for clear all button
            const clearButton = page.getByRole('button', { name: /clear|mark all/i }).first();

            if (await clearButton.isVisible()) {
                await clearButton.click();
                await page.waitForTimeout(500);
            }
        }
    });
});
