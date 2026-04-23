/**
 * Umami Analytics Integration
 *
 * Tracks page views automatically and provides custom event tracking for:
 * - Lesson completion
 * - Course completion
 * - Quiz results
 * - AI chat sessions
 * - Roleplay sessions
 */

// Type definitions for Umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

/**
 * Track a custom event in Umami
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
}

// Academy-specific tracking events

export const AcademyEvents = {
  // Lesson events
  lessonStarted: (courseId: string, lessonId: string, lessonTitle: string) => {
    trackEvent('lesson_started', { courseId, lessonId, lessonTitle });
  },

  lessonCompleted: (courseId: string, lessonId: string, lessonTitle: string, timeSpentSeconds: number) => {
    trackEvent('lesson_completed', { courseId, lessonId, lessonTitle, timeSpentSeconds });
  },

  // Course events
  courseStarted: (courseId: string, courseTitle: string) => {
    trackEvent('course_started', { courseId, courseTitle });
  },

  courseCompleted: (courseId: string, courseTitle: string, totalTimeSeconds: number) => {
    trackEvent('course_completed', { courseId, courseTitle, totalTimeSeconds });
  },

  // Quiz events
  quizStarted: (courseId: string, lessonId: string) => {
    trackEvent('quiz_started', { courseId, lessonId });
  },

  quizCompleted: (courseId: string, lessonId: string, score: number, totalQuestions: number, passed: boolean) => {
    trackEvent('quiz_completed', { courseId, lessonId, score, totalQuestions, passed });
  },

  // AI Coaching events
  coachingSessionStarted: () => {
    trackEvent('coaching_session_started');
  },

  coachingMessageSent: (messageLength: number) => {
    trackEvent('coaching_message_sent', { messageLength });
  },

  coachingSessionEnded: (messageCount: number, durationSeconds: number) => {
    trackEvent('coaching_session_ended', { messageCount, durationSeconds });
  },

  // Roleplay events
  roleplayStarted: (industry: string, roleType: string, scenarioType: string) => {
    trackEvent('roleplay_started', { industry, roleType, scenarioType });
  },

  roleplayMessageSent: (messageNumber: number) => {
    trackEvent('roleplay_message_sent', { messageNumber });
  },

  roleplayCompleted: (
    industry: string,
    roleType: string,
    messageCount: number,
    durationSeconds: number,
    overallScore?: number
  ) => {
    trackEvent('roleplay_completed', {
      industry,
      roleType,
      messageCount,
      durationSeconds,
      ...(overallScore !== undefined && { overallScore }),
    });
  },

  // Onboarding events
  onboardingStepCompleted: (step: string, stepNumber: number) => {
    trackEvent('onboarding_step', { step, stepNumber });
  },

  onboardingCompleted: (totalTimeSeconds: number) => {
    trackEvent('onboarding_completed', { totalTimeSeconds });
  },

  assessmentGenerated: (recommendedPath: string) => {
    trackEvent('assessment_generated', { recommendedPath });
  },

  // ICP Builder events
  icpBuilderUsed: (fieldsFilled: number) => {
    trackEvent('icp_builder_used', { fieldsFilled });
  },

  icpGenerated: () => {
    trackEvent('icp_generated');
  },

  // Forum events (can be tracked from forum embed or SSO redirect)
  forumVisited: () => {
    trackEvent('forum_visited');
  },
};

export default AcademyEvents;
