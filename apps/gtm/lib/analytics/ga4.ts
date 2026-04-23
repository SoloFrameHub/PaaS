/**
 * Google Analytics 4 Event Tracking
 *
 * Client-side GA4 event tracking via gtag.js.
 * Mirrors the structure of umami.ts for consistency.
 *
 * gtag.js is loaded in app/layout.tsx (Next.js pages)
 * and deferred in static HTML pages via window.onload.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA4_MEASUREMENT_ID = 'G-SFYRWNQKZG';

/**
 * Track a custom event in GA4
 */
export function trackGA4Event(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
  } catch (error) {
    console.warn('[GA4] Event tracking failed:', eventName, error);
  }
}

/**
 * Set user-scoped properties (e.g., user_type after login)
 */
export function setGA4UserProperties(
  properties: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', properties);
    }
  } catch (error) {
    console.warn('[GA4] Set user properties failed:', error);
  }
}

/**
 * Set the GA4 user ID for cross-device tracking
 */
export function setGA4UserId(userId: string): void {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA4_MEASUREMENT_ID, { user_id: userId });
    }
  } catch (error) {
    console.warn('[GA4] Set user ID failed:', error);
  }
}

// GA4 event helpers — mirrors AcademyEvents in umami.ts

export const GA4Events = {
  // Auth events
  signUp: (method: string = 'email') => {
    trackGA4Event('sign_up', { method });
  },

  login: (method: string = 'email') => {
    trackGA4Event('login', { method });
  },

  // E-commerce
  beginCheckout: (value: number = 49, currency: string = 'USD') => {
    trackGA4Event('begin_checkout', { currency, value });
  },

  // Lesson events
  lessonStarted: (courseId: string, lessonId: string, lessonTitle: string) => {
    trackGA4Event('lesson_started', {
      content_type: 'lesson',
      course_id: courseId,
      lesson_id: lessonId,
      lesson_title: lessonTitle,
    });
  },

  lessonCompleted: (courseId: string, lessonId: string, lessonTitle: string) => {
    trackGA4Event('lesson_completed', {
      content_type: 'lesson',
      course_id: courseId,
      lesson_id: lessonId,
      lesson_title: lessonTitle,
    });
  },

  // Quiz events
  quizStarted: (courseId: string, lessonId: string) => {
    trackGA4Event('quiz_started', {
      content_type: 'quiz',
      course_id: courseId,
      lesson_id: lessonId,
    });
  },

  quizCompleted: (
    courseId: string,
    lessonId: string,
    score: number,
    totalQuestions: number,
    passed: boolean
  ) => {
    trackGA4Event('quiz_completed', {
      content_type: 'quiz',
      course_id: courseId,
      lesson_id: lessonId,
      quiz_score: score,
      total_questions: totalQuestions,
      passed,
    });
  },

  // Roleplay events
  roleplayStarted: (industry: string, roleType: string, methodology: string) => {
    trackGA4Event('roleplay_started', {
      content_type: 'roleplay',
      industry,
      role_type: roleType,
      methodology,
    });
  },

  roleplayCompleted: (
    industry: string,
    roleType: string,
    messageCount: number,
    durationSeconds: number,
    overallScore?: number
  ) => {
    trackGA4Event('roleplay_completed', {
      content_type: 'roleplay',
      industry,
      role_type: roleType,
      message_count: messageCount,
      session_duration: durationSeconds,
      ...(overallScore !== undefined && { roleplay_score: overallScore }),
    });
  },

  // Coaching events
  coachingSessionStarted: () => {
    trackGA4Event('coaching_session_started', { content_type: 'coaching' });
  },

  coachingSessionEnded: (messageCount: number, durationSeconds: number) => {
    trackGA4Event('coaching_session_ended', {
      content_type: 'coaching',
      message_count: messageCount,
      session_duration: durationSeconds,
    });
  },

  // Book events
  bookChapterRead: (chapterId: string, chapterTitle?: string) => {
    trackGA4Event('book_chapter_read', {
      content_type: 'book',
      chapter_id: chapterId,
      ...(chapterTitle && { chapter_title: chapterTitle }),
    });
  },

  // Onboarding events
  onboardingStepCompleted: (step: string, stepNumber: number) => {
    trackGA4Event('onboarding_step_completed', {
      onboarding_step: step,
      step_number: stepNumber,
    });
  },

  onboardingCompleted: (assessmentScore: number) => {
    trackGA4Event('onboarding_completed', {
      assessment_score: assessmentScore,
    });
  },

  // ICP Builder
  icpBuilderUsed: (fieldsFilled: number) => {
    trackGA4Event('icp_builder_used', {
      content_type: 'tool',
      fields_filled: fieldsFilled,
    });
  },
};

export default GA4Events;
