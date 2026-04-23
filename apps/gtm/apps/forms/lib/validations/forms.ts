/**
 * Zod validation schemas for all native forms, keyed by form slug.
 *
 * Each schema validates the `data` field of a form submission.
 * The submit API route looks up the schema by slug and validates.
 */

import { z } from 'zod';

const betaTesterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  businessModel: z.enum(['b2b-saas', 'creator-coach', 'service', 'marketplace', 'other']),
  stage: z.enum(['pre-revenue', 'early', 'growing', 'scaling']),
  salesJourney: z.enum(['not-started', 'outreach', 'meetings', 'closing']),
  biggestChallenge: z.string().min(1, 'Please describe your challenge'),
  weeklyHours: z.enum(['2-5', '5-10', '10+']),
  bookReviewer: z.array(z.string()).optional().default([]),
  referralSource: z.string().optional().default(''),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  anything: z.string().optional().default(''),
});

const caaWaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  businessModel: z.enum(['b2b-saas', 'creator-coach', 'service', 'ecommerce', 'other']),
  stage: z.enum(['pre-revenue', '0-5k', '5k-20k', '20k+']),
  biggestChallenge: z.string().min(1, 'Please describe your challenge'),
});

const academyWaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  academyInterest: z.enum(['startup', 'gtm', 'both']),
  stage: z.enum(['idea', 'building', 'launched', 'growing']),
});

const bookInterestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  bookInterest: z.enum(['playbook', 'revolution', 'dominance', 'all']),
  format: z.enum(['ebook', 'paperback', 'both']).optional().default('ebook'),
});

const communityApplySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  businessModel: z.enum(['b2b-saas', 'creator-coach', 'service', 'marketplace', 'other']),
  stage: z.enum(['pre-revenue', 'early', 'growing', 'scaling']),
  whyJoin: z.string().min(1, 'Please tell us why you want to join'),
  commitment: z.enum(['1-3h', '3-5h', '5-10h', '10h+']),
  contribution: z.array(z.string()).optional().default([]),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
});

const bookReviewerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  reviewPlatform: z.array(z.string()).min(1, 'Select at least one platform'),
  turnaround: z.enum(['1-week', '2-weeks', '1-month']),
  audienceSize: z.enum(['small', 'medium', 'large', 'xlarge']).optional(),
  format: z.enum(['pdf', 'kindle', 'either']).optional().default('either'),
  notes: z.string().optional().default(''),
});

const foundingMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  revenue: z.enum(['pre-revenue', '0-5k', '5k-20k', '20k-50k', '50k+']),
  teamSize: z.enum(['solo', 'small', 'larger']),
  goals: z.array(z.string()).min(1, 'Select at least one goal'),
  budget: z.enum(['under-200', '200-500', '500-1000', '1000+']),
  testimonial: z.array(z.string()).optional().default([]),
});

const partnershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  companyUrl: z.string().url('Valid URL is required'),
  partnershipType: z.enum(['affiliate', 'content', 'integration', 'reseller', 'other']),
  audienceSize: z.enum(['small', 'medium', 'large', 'xlarge']),
  proposal: z.string().min(1, 'Please describe your partnership idea'),
});

const feedbackSchema = z.object({
  name: z.string().optional().default(''),
  email: z.string().email('Valid email is required'),
  category: z.enum(['feature', 'improvement', 'bug', 'content', 'general']),
  description: z.string().min(20, 'Please provide at least 20 characters of detail'),
  painLevel: z.enum(['1', '2', '3', '4']).optional(),
});

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.enum(['general', 'support', 'billing', 'content', 'media', 'other']),
  message: z.string().min(10, 'Please provide at least 10 characters'),
});

/** Map form slug to its Zod schema */
export const FORM_SCHEMAS: Record<string, z.ZodSchema> = {
  'beta-tester': betaTesterSchema,
  'caa-waitlist': caaWaitlistSchema,
  'academy-waitlist': academyWaitlistSchema,
  'book-interest': bookInterestSchema,
  'community-apply': communityApplySchema,
  'book-reviewer': bookReviewerSchema,
  'founding-member': foundingMemberSchema,
  'partnership': partnershipSchema,
  'feedback': feedbackSchema,
  'contact': contactSchema,
};
