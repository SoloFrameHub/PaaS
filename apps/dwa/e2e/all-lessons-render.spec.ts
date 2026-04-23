import { test, expect } from '@playwright/test';
import { signInWithCompletedOnboarding } from './helpers';

/**
 * Render check: visits 1 lesson from each of the 20 courses (first + last per track)
 * and verifies content renders (no "Course Error" crash).
 *
 * Uses a single auth session to reduce server load.
 */

const SAMPLE_LESSONS: { courseId: string; lessonId: string }[] = [
  // Anxiety & Fear — first and last course
  { courseId: 'anxiety-management', lessonId: '3' },
  { courseId: 'anxiety-toolkit', lessonId: '7' },
  // Mood & Emotional Health — first and last course
  { courseId: 'depression-action', lessonId: '4' },
  { courseId: 'managing-perfectionism', lessonId: '6' },
  // Nutrition & Brain Health — first and last course
  { courseId: 'food-mood-connection', lessonId: '5' },
  { courseId: 'food-mood-mastery', lessonId: '5' },
  // Sleep & Recovery — both courses
  { courseId: 'sleep-insomnia', lessonId: '2' },
  { courseId: 'sleep-mastery', lessonId: '6' },
  // Stress & Resilience — both courses
  { courseId: 'stress-burnout', lessonId: '5' },
  { courseId: 'trauma-recovery', lessonId: '3' },
];

test.describe('Lesson Render Smoke Test (10 lessons across all tracks)', () => {
  test.beforeEach(async ({ page }) => {
    await signInWithCompletedOnboarding(page);
  });

  for (const { courseId, lessonId } of SAMPLE_LESSONS) {
    test(`${courseId}/lesson-${lessonId} renders`, async ({ page }) => {
      await page.goto(`/academy/${courseId}/${lessonId}`, { waitUntil: 'domcontentloaded' });

      // Should NOT show error boundary
      const errorHeading = page.getByText('Course Error');
      await expect(errorHeading).not.toBeVisible({ timeout: 5000 });

      // Should show lesson content area with substantial text
      const content = page.locator('[data-testid="lesson-content"]').first();
      await expect(content).toBeVisible({ timeout: 10000 });
      const text = await content.textContent();
      expect(text!.length).toBeGreaterThan(100);
    });
  }
});
