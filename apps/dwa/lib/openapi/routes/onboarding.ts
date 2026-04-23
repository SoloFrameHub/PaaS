import { z } from 'zod';
import { registry } from '../registry';
import {
  basicInfoSchema,
  symptomsSchema,
  crisisScreeningSchema,
  goalsSchema,
  aboutYouSchema,
  yourExperienceSchema,
  inYourWordsSchema,
  assessmentSchema,
  questionnaireSchema,
} from '@/lib/validations/onboarding';

const successData = z.object({ data: z.object({ success: z.literal(true) }) });
const tags = ['Onboarding'];

export function registerOnboardingRoutes() {
  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/basic-info',
    summary: 'Save basic info (name/display name)',
    tags,
    request: {
      body: { content: { 'application/json': { schema: basicInfoSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/symptoms',
    summary: 'Save symptom selections',
    tags,
    request: {
      body: { content: { 'application/json': { schema: symptomsSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/crisis-screening',
    summary: 'Save crisis/safety screening answers',
    tags,
    request: {
      body: { content: { 'application/json': { schema: crisisScreeningSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/goals',
    summary: 'Save wellness goals and preferences',
    tags,
    request: {
      body: { content: { 'application/json': { schema: goalsSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/about-you',
    summary: 'Save life situation and social support info',
    tags,
    request: {
      body: { content: { 'application/json': { schema: aboutYouSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/your-experience',
    summary: 'Save coping history, triggers, therapy background',
    tags,
    request: {
      body: { content: { 'application/json': { schema: yourExperienceSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/in-your-words',
    summary: 'Save free-text reflections',
    tags,
    request: {
      body: { content: { 'application/json': { schema: inYourWordsSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/questionnaire',
    summary: 'Save questionnaire data to profile',
    tags,
    request: {
      body: { content: { 'application/json': { schema: questionnaireSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/assessment',
    summary: 'Save assessment results',
    tags,
    request: {
      body: { content: { 'application/json': { schema: assessmentSchema } } },
    },
    responses: {
      200: { description: 'Saved', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/onboarding/complete',
    summary: 'Mark onboarding as complete',
    tags,
    request: {
      body: { content: { 'application/json': { schema: assessmentSchema.optional() } } },
    },
    responses: {
      200: { description: 'Onboarding completed', content: { 'application/json': { schema: successData } } },
      401: { description: 'Unauthorized' },
    },
  });
}
