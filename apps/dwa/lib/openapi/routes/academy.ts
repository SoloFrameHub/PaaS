import { z } from 'zod';
import { registry } from '../registry';
import {
  completeLessonSchema,
  quizSubmissionSchema,
  lessonFeedbackSchema,
} from '@/lib/validations/academy';

const tags = ['Academy'];
const successData = z.object({ data: z.object({ success: z.literal(true) }) });

export function registerAcademyRoutes() {
  registry.registerPath({
    method: 'post',
    path: '/api/academy/complete-lesson',
    summary: 'Mark a lesson as completed and award XP',
    tags,
    request: {
      body: { content: { 'application/json': { schema: completeLessonSchema } } },
    },
    responses: {
      200: { description: 'Lesson completed', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/academy/quiz/{sectionId}/{courseId}/{lessonId}',
    summary: 'Get quiz questions for a lesson',
    tags,
    request: {
      params: z.object({
        sectionId: z.string(),
        courseId: z.string(),
        lessonId: z.string(),
      }),
    },
    responses: {
      200: {
        description: 'Quiz questions',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({
                questions: z.array(z.object({
                  id: z.string(),
                  question: z.string(),
                  options: z.array(z.string()),
                })),
              }),
            }),
          },
        },
      },
      401: { description: 'Unauthorized' },
      404: { description: 'Quiz not found' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/quiz/{sectionId}/{courseId}/{lessonId}',
    summary: 'Submit quiz answers',
    tags,
    request: {
      params: z.object({
        sectionId: z.string(),
        courseId: z.string(),
        lessonId: z.string(),
      }),
      body: { content: { 'application/json': { schema: quizSubmissionSchema } } },
    },
    responses: {
      200: {
        description: 'Quiz results',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({
                score: z.number(),
                passed: z.boolean(),
                correctAnswers: z.record(z.string(), z.string()),
              }),
            }),
          },
        },
      },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/feedback',
    summary: 'Submit lesson feedback',
    tags,
    request: {
      body: { content: { 'application/json': { schema: lessonFeedbackSchema } } },
    },
    responses: {
      200: { description: 'Feedback saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/academy/assessment/{courseId}/{lessonId}',
    summary: 'Get assessment for a lesson',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Assessment data' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/assessment/{courseId}/{lessonId}',
    summary: 'Submit assessment answers',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Assessment results' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/academy/tracking-log/{courseId}/{lessonId}',
    summary: 'Get tracking log for a lesson',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Tracking log data' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/tracking-log/{courseId}/{lessonId}',
    summary: 'Save tracking log entry',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Saved' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/academy/thought-record/{courseId}/{lessonId}',
    summary: 'Get thought record for a lesson',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Thought record data' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/thought-record/{courseId}/{lessonId}',
    summary: 'Save thought record entry',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Saved' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/academy/checklist/{courseId}/{lessonId}',
    summary: 'Get checklist state for a lesson',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Checklist data' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/checklist/{courseId}/{lessonId}',
    summary: 'Save checklist state',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Saved' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/academy/component-state/{courseId}/{lessonId}',
    summary: 'Get interactive component state for a lesson',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Component state data' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/academy/component-state/{courseId}/{lessonId}',
    summary: 'Save interactive component state',
    tags,
    request: {
      params: z.object({ courseId: z.string(), lessonId: z.string() }),
    },
    responses: {
      200: { description: 'Saved' },
      401: { description: 'Unauthorized' },
    },
  });
}
