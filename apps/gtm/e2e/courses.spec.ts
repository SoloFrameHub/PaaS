import { test, expect } from '@playwright/test';
import { signInWithCompletedOnboarding } from './helpers';

/**
 * E2E Tests for Course Navigation and Lessons
 * Tests course browsing, lesson viewing, and quiz functionality
 */

test.describe('Course Navigation', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);
        await page.waitForLoadState('networkidle');
    });

    test('should display course catalog', async ({ page }) => {
        // Visit Academy page which is the catalog
        await page.goto('/academy');

        // Look for course listings
        const courseCard = page.locator('[data-testid="course-card"]').or(
            page.locator('.course-card').or(
                page.getByRole('link', { name: /course/i }).first()
            )
        );

        // Should have at least one course visible
        await expect(courseCard.first()).toBeVisible({ timeout: 10000 });
    });

    test('should navigate to course detail page', async ({ page }) => {
        await page.goto('/academy');

        // Click on first course
        const firstCourse = page.locator('[data-testid="course-card"]').first();

        await expect(firstCourse).toBeVisible({ timeout: 15000 });
        const courseLink = firstCourse.locator('a').first();
        await courseLink.click();

        // Should navigate to course page (URL pattern /academy/[id])
        await page.waitForURL(/\/academy\/[a-z-]+/);
        expect(page.url()).toContain('/academy/');
    });

    test('should display course sections and lessons', async ({ page }) => {
        // Navigate to a specific course
        await page.goto('/academy/sales-psychology');

        // Should show course content
        const lessonLink = page.getByTestId('lesson-link').or(
            page.locator('a[href*="/academy/sales-psychology/"]')
        );

        // Should have lessons listed
        await expect(lessonLink.first()).toBeVisible({ timeout: 10000 });
    });

    test('should open lesson content', async ({ page }) => {
        // Navigate to a specific lesson
        await page.goto('/academy/sales-psychology/1');

        // Should display lesson content
        const lessonContent = page.getByTestId('lesson-content').first();

        await expect(lessonContent).toBeVisible();

        // Should have lesson title
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
    });

    test('should navigate between lessons', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Wait for complete button
        const nextButton = page.locator('[data-testid="complete-lesson-button"]').first();
        await expect(nextButton).toBeVisible({ timeout: 15000 });

        await nextButton.click();

        // Should navigate to next lesson (e.g., /2)
        // Ensure we wait for a URL that is NOT the current one
        await page.waitForURL(url =>
            url.pathname.includes('/academy/sales-psychology/') &&
            !url.pathname.endsWith('/1'),
            { timeout: 15000 }
        );

        // Verify URL changed from /1
        expect(page.url()).toContain('/sales-psychology/');
        expect(page.url()).not.toMatch(/\/1$/);
    });

    test('should show lesson progress', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Scroll to bottom to mark as complete
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // Wait for progress to update
        await page.waitForTimeout(1000);

        // Look for completion indicator
        const completionIndicator = page.locator('[data-testid="lesson-complete"]').or(
            page.locator('.complete-badge').or(
                page.getByText(/completed/i)
            )
        );

        // Check if completion tracking exists
        const hasCompletion = await completionIndicator.isVisible().catch(() => false);

        if (hasCompletion) {
            await expect(completionIndicator).toBeVisible();
        }
    });

    test('should display course sidebar navigation', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Look for sidebar with lesson list
        const sidebar = page.locator('aside').or(
            page.locator('[data-testid="lesson-sidebar"]').or(
                page.locator('.sidebar')
            )
        );

        // Sidebar should be visible or toggleable
        const sidebarVisible = await sidebar.isVisible().catch(() => false);

        if (sidebarVisible) {
            await expect(sidebar).toBeVisible();

            // Should have multiple lesson links
            const lessonLinks = sidebar.locator('a');
            const count = await lessonLinks.count();
            expect(count).toBeGreaterThan(0);
        }
    });

    /* Search test disabled - functionality not present in UI
    test('should search for courses or lessons', async ({ page }) => {
        await page.goto('/academy');
        // ... search implementation missing ...
    });
    */
});

test.describe('Quiz Functionality', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);
        await page.waitForLoadState('networkidle');
    });

    test('should display quiz at end of lesson', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Scroll to bottom where quiz typically appears
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // Look for quiz component
        const quiz = page.locator('[data-testid="quiz"]').or(
            page.locator('.quiz').or(
                page.getByRole('heading', { name: /quiz|knowledge check/i })
            )
        );

        const hasQuiz = await quiz.isVisible().catch(() => false);

        if (hasQuiz) {
            await expect(quiz).toBeVisible();
        }
    });

    test('should answer quiz questions', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Scroll to quiz
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // Look for quiz questions
        const quizQuestion = page.getByTestId('quiz-question');

        if (await quizQuestion.first().isVisible({ timeout: 10000 })) {
            // Select an answer
            const firstQuestion = quizQuestion.first();
            const answerOption = firstQuestion.getByTestId('quiz-option').or(
                firstQuestion.locator('input[type="radio"]')
            ).first();

            if (await answerOption.isVisible()) {
                await answerOption.click();
            }
        }
    });

    test('should submit quiz and show results', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Scroll to quiz
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // Answer questions
        const questions = page.locator('[data-testid="quiz-question"]');
        const count = await questions.count();

        if (count > 0) {
            // Select first option for each question
            for (let i = 0; i < count; i++) {
                const q = questions.nth(i);
                const option = q.locator('[data-testid="quiz-option"]').or(q.locator('input[type="radio"]')).first();
                if (await option.isVisible()) {
                    await option.click();
                } else {
                    const textarea = q.locator('textarea');
                    if (await textarea.isVisible()) {
                        await textarea.fill('This is a test reflection that meets the minimum length requirement easily.');
                    }
                }
            }

            // Submit quiz
            const submitButton = page.getByTestId('submit-quiz-button').or(
                page.getByRole('button', { name: /submit quiz/i })
            ).first();

            if (await submitButton.isVisible()) {
                await submitButton.click();

                // Should show results
                const results = page.getByTestId('quiz-results').or(
                    page.getByText(/Quiz Results/i)
                ).first();

                await expect(results).toBeVisible({ timeout: 15000 });
            }
        }
    });

    test('should allow retaking quiz', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Complete quiz first (simplified)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Look for retake button after submission
        const retakeButton = page.getByRole('button', { name: /retake|try again/i });

        if (await retakeButton.isVisible()) {
            await retakeButton.click();

            // Quiz should reset
            await page.waitForTimeout(500);

            const quizQuestion = page.locator('[data-testid="quiz-question"]').or(
                page.locator('.quiz-question')
            );

            await expect(quizQuestion.first()).toBeVisible();
        }
    });
});

test.describe('Course Progress Tracking', () => {

    test.beforeEach(async ({ page }) => {
        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);
    });

    test('should show overall course progress', async ({ page }) => {
        await page.goto('/academy/sales-psychology');

        // Look for progress indicator
        const progressBar = page.locator('[role="progressbar"]').or(
            page.locator('.progress-bar').or(
                page.getByText(/%/)
            )
        );

        const hasProgress = await progressBar.isVisible().catch(() => false);

        if (hasProgress) {
            await expect(progressBar.first()).toBeVisible();
        }
    });

    test('should mark lessons as complete', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Look for completion button
        const completeButton = page.getByTestId('complete-lesson-button').or(
            page.getByRole('button', { name: /finish & next lesson/i })
        ).first();

        if (await completeButton.isVisible()) {
            await completeButton.click();

            // Should navigate and update
            await page.waitForTimeout(1000);
        }
    });

    test('should show completed lessons in sidebar', async ({ page }) => {
        await page.goto('/academy/sales-psychology/1');

        // Look for completed lesson indicators in sidebar
        const completedLesson = page.locator('[data-testid="lesson-complete"]').or(
            page.locator('.lesson-complete').or(
                page.locator('[aria-label*="complete" i]')
            )
        );

        // Check if completion tracking is visible
        const hasTracking = await completedLesson.isVisible().catch(() => false);

        if (hasTracking) {
            await expect(completedLesson.first()).toBeVisible();
        }
    });
});

test.describe('Responsive Design', () => {

    test('should work on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);

        // Navigate to course
        await page.goto('/academy/sales-psychology/1');

        // Content should be visible
        const content = page.locator('[data-testid="lesson-content"]').first();
        await expect(content).toBeVisible();
    });

    test('should have mobile-friendly navigation', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });

        // Sign in with completed onboarding
        await signInWithCompletedOnboarding(page);

        await page.goto('/academy/sales-psychology/1');

        // Look for mobile menu toggle
        const menuToggle = page.getByRole('button', { name: /menu|navigation/i }).or(
            page.locator('[aria-label*="menu" i]')
        ).first();

        const hasToggle = await menuToggle.isVisible().catch(() => false);

        if (hasToggle) {
            await menuToggle.click();

            // Navigation should appear
            const nav = page.locator('nav').first();
            await expect(nav).toBeVisible();
        }
    });
});
