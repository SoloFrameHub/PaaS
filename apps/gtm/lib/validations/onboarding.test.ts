import { describe, it, expect } from 'vitest';
import {
    welcomeSchema,
    businessInfoSchema,
    businessContextSchema,
    completeAssessmentSchema,
    questionnaireSchema,
    goalSchema,
    contextWithDocsSchema,
    analysisSchema,
} from './onboarding';

describe('Onboarding Validation Schemas', () => {

    // =========================================================================
    // welcomeSchema
    // =========================================================================
    describe('welcomeSchema', () => {
        it('should accept valid welcome data', () => {
            const result = welcomeSchema.safeParse({
                name: 'Alice',
                businessName: 'Acme Corp',
                businessModel: 'b2b-saas',
            });
            expect(result.success).toBe(true);
        });

        it('should accept all valid business models', () => {
            const models = ['b2b-saas', 'creator-coach', 'service', 'marketplace', 'other'];
            for (const model of models) {
                const result = welcomeSchema.safeParse({
                    name: 'Test',
                    businessName: 'Test Co',
                    businessModel: model,
                });
                expect(result.success).toBe(true);
            }
        });

        it('should reject empty name', () => {
            const result = welcomeSchema.safeParse({
                name: '',
                businessName: 'Acme Corp',
                businessModel: 'b2b-saas',
            });
            expect(result.success).toBe(false);
        });

        it('should reject empty businessName', () => {
            const result = welcomeSchema.safeParse({
                name: 'Alice',
                businessName: '',
                businessModel: 'b2b-saas',
            });
            expect(result.success).toBe(false);
        });

        it('should reject invalid businessModel', () => {
            const result = welcomeSchema.safeParse({
                name: 'Alice',
                businessName: 'Acme Corp',
                businessModel: 'invalid-model',
            });
            expect(result.success).toBe(false);
        });

        it('should reject missing fields', () => {
            expect(welcomeSchema.safeParse({}).success).toBe(false);
            expect(welcomeSchema.safeParse({ name: 'Alice' }).success).toBe(false);
            expect(welcomeSchema.safeParse({ name: 'Alice', businessName: 'Acme' }).success).toBe(false);
        });
    });

    // =========================================================================
    // businessInfoSchema
    // =========================================================================
    describe('businessInfoSchema', () => {
        it('should accept valid partial business info', () => {
            const result = businessInfoSchema.safeParse({
                name: 'Bob',
                websiteUrl: 'https://example.com',
            });
            expect(result.success).toBe(true);
        });

        it('should accept empty object (all fields optional)', () => {
            const result = businessInfoSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should accept empty string for websiteUrl', () => {
            const result = businessInfoSchema.safeParse({ websiteUrl: '' });
            expect(result.success).toBe(true);
        });

        it('should reject invalid URL for websiteUrl', () => {
            const result = businessInfoSchema.safeParse({ websiteUrl: 'not-a-url' });
            expect(result.success).toBe(false);
        });

        it('should reject elevatorPitch shorter than 10 chars', () => {
            const result = businessInfoSchema.safeParse({ elevatorPitch: 'Too short' });
            expect(result.success).toBe(false);
        });

        it('should accept elevatorPitch of 10+ chars', () => {
            const result = businessInfoSchema.safeParse({ elevatorPitch: 'A valid pitch with enough characters' });
            expect(result.success).toBe(true);
        });

        it('should reject targetAudience shorter than 10 chars', () => {
            const result = businessInfoSchema.safeParse({ targetAudience: 'Short' });
            expect(result.success).toBe(false);
        });

        it('should accept all valid stage values', () => {
            const stages = ['idea', 'pre-launch', 'pre-revenue', '0-10k', '10k-100k', 'scaling'];
            for (const stage of stages) {
                const result = businessInfoSchema.safeParse({ stage });
                expect(result.success).toBe(true);
            }
        });

        it('should reject invalid stage value', () => {
            const result = businessInfoSchema.safeParse({ stage: 'invalid' });
            expect(result.success).toBe(false);
        });
    });

    // =========================================================================
    // businessContextSchema
    // =========================================================================
    describe('businessContextSchema', () => {
        it('should accept valid business context', () => {
            const result = businessContextSchema.safeParse({
                industry: 'saas',
                company_stage: 'early-revenue',
                target_customer_type: 'b2b',
                typical_deal_size: 'mid_market',
                target_roles: ['cto', 'vp_engineering'],
            });
            expect(result.success).toBe(true);
        });

        it('should reject empty target_roles array', () => {
            const result = businessContextSchema.safeParse({
                industry: 'saas',
                company_stage: 'mvp',
                target_customer_type: 'b2b',
                typical_deal_size: 'smb',
                target_roles: [],
            });
            expect(result.success).toBe(false);
        });

        it('should reject missing industry', () => {
            const result = businessContextSchema.safeParse({
                company_stage: 'mvp',
                target_customer_type: 'b2b',
                typical_deal_size: 'smb',
                target_roles: ['cto'],
            });
            expect(result.success).toBe(false);
        });

        it('should accept all valid company stages', () => {
            const stages = ['idea', 'mvp', 'early-revenue', 'scaling', 'pre-launch', 'pre-revenue', '0-10k', '10k-100k'];
            for (const stage of stages) {
                const result = businessContextSchema.safeParse({
                    industry: 'test',
                    company_stage: stage,
                    target_customer_type: 'b2b',
                    typical_deal_size: 'smb',
                    target_roles: ['founder'],
                });
                expect(result.success).toBe(true);
            }
        });

        it('should accept all valid deal sizes', () => {
            const sizes = ['transactional', 'smb', 'mid_market', 'enterprise'];
            for (const size of sizes) {
                const result = businessContextSchema.safeParse({
                    industry: 'test',
                    company_stage: 'mvp',
                    target_customer_type: 'b2b',
                    typical_deal_size: size,
                    target_roles: ['founder'],
                });
                expect(result.success).toBe(true);
            }
        });
    });

    // =========================================================================
    // questionnaireSchema
    // =========================================================================
    describe('questionnaireSchema', () => {
        it('should accept a fully populated questionnaire', () => {
            const result = questionnaireSchema.safeParse({
                questionnaire: {
                    target_roles: ['cto', 'vp_engineering'],
                    industry: 'saas',
                    deal_size: 'mid_market',
                    sales_journey: 'outreach',
                    revenue_range: '0-10k',
                    customer_count: '1-5',
                    founder_description: 'tech',
                    barriers: ['time', 'knowledge'],
                    disc_answers: { disc1: 'D', disc2: 'I', disc3: 'S', disc4: 'C' },
                    urgency: 'high',
                    channels: ['linkedin', 'email'],
                    time_commitment: '10-15',
                    learning_style: 'aggressive',
                    success_90_days: 'Close 5 enterprise deals',
                    has_icp_docs: 'yes',
                    creator_offer_type: 'course',
                    creator_price_point: '997',
                    creator_acquisition: ['organic', 'paid'],
                    creator_platforms: ['youtube', 'twitter'],
                    creator_email_list_size: '5000',
                    creator_sales_call_status: 'active',
                    creator_has_value_ladder: 'yes',
                    creator_launch_model: 'evergreen',
                },
            });
            expect(result.success).toBe(true);
        });

        it('should accept empty questionnaire (all fields have defaults)', () => {
            const result = questionnaireSchema.safeParse({
                questionnaire: {},
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.questionnaire.target_roles).toEqual([]);
                expect(result.data.questionnaire.industry).toBe('');
                expect(result.data.questionnaire.disc_answers).toEqual({});
                expect(result.data.questionnaire.channels).toEqual([]);
                expect(result.data.questionnaire.barriers).toEqual([]);
            }
        });

        it('should reject when questionnaire key is missing', () => {
            const result = questionnaireSchema.safeParse({});
            expect(result.success).toBe(false);
        });

        it('should default creator economy fields to empty', () => {
            const result = questionnaireSchema.safeParse({
                questionnaire: { industry: 'saas' },
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.questionnaire.creator_offer_type).toBe('');
                expect(result.data.questionnaire.creator_platforms).toEqual([]);
                expect(result.data.questionnaire.creator_acquisition).toEqual([]);
            }
        });
    });

    // =========================================================================
    // completeAssessmentSchema
    // =========================================================================
    describe('completeAssessmentSchema', () => {
        it('should accept valid complete assessment data', () => {
            const result = completeAssessmentSchema.safeParse({
                categoryAnswers: { q1: 'I should make the product better first', q2: "I'm a developer/engineer by trade" },
                businessContext: {
                    industry: 'saas',
                    company_stage: 'early-revenue',
                    target_customer_type: 'b2b',
                    typical_deal_size: 'mid_market',
                    target_roles: ['cto'],
                },
                discAnswers: { disc1: 'D', disc2: 'I', disc3: 'S', disc4: 'C' },
            });
            expect(result.success).toBe(true);
        });

        it('should reject missing categoryAnswers', () => {
            const result = completeAssessmentSchema.safeParse({
                businessContext: {
                    industry: 'saas',
                    company_stage: 'mvp',
                    target_customer_type: 'b2b',
                    typical_deal_size: 'smb',
                    target_roles: ['founder'],
                },
                discAnswers: { disc1: 'D' },
            });
            expect(result.success).toBe(false);
        });

        it('should reject missing discAnswers', () => {
            const result = completeAssessmentSchema.safeParse({
                categoryAnswers: { q1: 'test' },
                businessContext: {
                    industry: 'saas',
                    company_stage: 'mvp',
                    target_customer_type: 'b2b',
                    typical_deal_size: 'smb',
                    target_roles: ['founder'],
                },
            });
            expect(result.success).toBe(false);
        });

        it('should accept empty records for answers', () => {
            const result = completeAssessmentSchema.safeParse({
                categoryAnswers: {},
                businessContext: {
                    industry: 'saas',
                    company_stage: 'mvp',
                    target_customer_type: 'b2b',
                    typical_deal_size: 'smb',
                    target_roles: ['founder'],
                },
                discAnswers: {},
            });
            expect(result.success).toBe(true);
        });
    });

    // =========================================================================
    // goalSchema
    // =========================================================================
    describe('goalSchema', () => {
        it('should accept valid goal', () => {
            const result = goalSchema.safeParse({
                primaryGoal: 'Get first 10 customers',
                timeframe: '90 days',
            });
            expect(result.success).toBe(true);
        });

        it('should accept goal without timeframe', () => {
            const result = goalSchema.safeParse({
                primaryGoal: 'Scale revenue',
            });
            expect(result.success).toBe(true);
        });

        it('should reject empty primaryGoal', () => {
            const result = goalSchema.safeParse({ primaryGoal: '' });
            expect(result.success).toBe(false);
        });

        it('should reject missing primaryGoal', () => {
            const result = goalSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });

    // =========================================================================
    // contextWithDocsSchema
    // =========================================================================
    describe('contextWithDocsSchema', () => {
        it('should accept valid context with docs', () => {
            const result = contextWithDocsSchema.safeParse({
                linkedinUrl: 'https://linkedin.com/in/testuser',
                linkedinAbout: 'I build SaaS tools for developers',
                documents: [
                    { id: 'doc-1', name: 'pitch-deck.pdf' },
                    { id: 'doc-2', name: 'icp-notes.txt' },
                ],
            });
            expect(result.success).toBe(true);
        });

        it('should accept empty object', () => {
            const result = contextWithDocsSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should accept empty string for linkedinUrl', () => {
            const result = contextWithDocsSchema.safeParse({ linkedinUrl: '' });
            expect(result.success).toBe(true);
        });

        it('should reject invalid URL for linkedinUrl', () => {
            const result = contextWithDocsSchema.safeParse({ linkedinUrl: 'not-a-url' });
            expect(result.success).toBe(false);
        });

        it('should accept documents without id', () => {
            const result = contextWithDocsSchema.safeParse({
                documents: [{ name: 'pitch.pdf' }],
            });
            expect(result.success).toBe(true);
        });

        it('should reject documents with empty name', () => {
            const result = contextWithDocsSchema.safeParse({
                documents: [{ id: 'doc-1', name: '' }],
            });
            expect(result.success).toBe(false);
        });
    });

    // =========================================================================
    // analysisSchema
    // =========================================================================
    describe('analysisSchema', () => {
        it('should accept empty object', () => {
            const result = analysisSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should accept full onboarding data', () => {
            const result = analysisSchema.safeParse({
                onboardingData: {
                    userName: 'Alice',
                    companyName: 'Acme Corp',
                    businessModel: 'b2b-saas',
                    website: 'https://acme.com',
                    pitch: 'We do stuff',
                    targetAudience: 'Developers',
                    revenueGoal: 'first-10',
                    stage: '0-10k',
                    linkedinUrl: 'https://linkedin.com/in/alice',
                    linkedinAbout: 'Builder of things',
                    linkedinPermission: true,
                    questionnaire: {
                        industry: 'saas',
                        target_roles: ['cto', 'vp'],
                        disc_answers: { disc1: 'D', disc2: 'I' },
                    },
                    uploadedDocuments: [
                        { id: 'doc-1', name: 'pitch.pdf', content: 'some content' },
                    ],
                },
            });
            expect(result.success).toBe(true);
        });

        it('should accept partial onboarding data', () => {
            const result = analysisSchema.safeParse({
                onboardingData: {
                    userName: 'Bob',
                },
            });
            expect(result.success).toBe(true);
        });

        it('should accept questionnaire with mixed types (string, array, record)', () => {
            const result = analysisSchema.safeParse({
                onboardingData: {
                    questionnaire: {
                        industry: 'saas',
                        target_roles: ['cto', 'vp'],
                        disc_answers: { disc1: 'D', disc2: 'I' },
                    },
                },
            });
            expect(result.success).toBe(true);
        });
    });
});
