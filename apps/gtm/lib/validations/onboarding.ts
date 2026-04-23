import { z } from 'zod';

// Schema for the first step (Welcome)
export const welcomeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    businessName: z.string().min(1, "Company name is required"),
    businessModel: z.enum(['b2b-saas', 'creator-coach', 'service', 'marketplace', 'other']),
});

// Primary schema for business information (supports partial updates)
export const businessInfoSchema = z.object({
    name: z.string().min(1).optional(),
    businessName: z.string().min(1).optional(),
    businessModel: z.enum(['b2b-saas', 'creator-coach', 'service', 'marketplace', 'other']).optional(),
    websiteUrl: z.string().url("Invalid website URL").optional().or(z.literal('')),
    elevatorPitch: z.string().min(10, "Pitch must be at least 10 characters").optional(),
    targetAudience: z.string().min(10, "Target audience must be at least 10 characters").optional(),
    stage: z.enum(['idea', 'pre-launch', 'pre-revenue', '0-10k', '10k-100k', 'scaling']).optional(),
});

export const businessContextSchema = z.object({
    industry: z.string().min(1, "Industry is required"),
    company_stage: z.enum(['idea', 'mvp', 'early-revenue', 'scaling', 'pre-launch', 'pre-revenue', '0-10k', '10k-100k']),
    target_customer_type: z.enum(['b2b', 'b2c', 'other']),
    typical_deal_size: z.enum(['transactional', 'smb', 'mid_market', 'enterprise']),
    target_roles: z.array(z.string()).min(1, "At least one target role is required"),
});


export const completeAssessmentSchema = z.object({
    categoryAnswers: z.record(z.string(), z.string()),
    businessContext: businessContextSchema,
    discAnswers: z.record(z.string(), z.string()),
});

export const questionnaireSchema = z.object({
    questionnaire: z.object({
        // Section 1-3
        target_roles: z.array(z.string()).default([]),
        industry: z.string().default(''),
        deal_size: z.string().default(''),
        sales_journey: z.string().default(''),
        revenue_range: z.string().default(''),
        customer_count: z.string().default(''),
        founder_description: z.string().default(''),
        barriers: z.array(z.string()).default([]),
        // Section 4: DISC
        disc_answers: z.record(z.string(), z.string()).default({}),
        // Section 5-7
        urgency: z.string().default(''),
        channels: z.array(z.string()).default([]),
        time_commitment: z.string().default(''),
        learning_style: z.string().default(''),
        success_90_days: z.string().default(''),
        has_icp_docs: z.string().default(''),
        // Section 8: Creator Economy
        creator_offer_type: z.string().optional().default(''),
        creator_price_point: z.string().optional().default(''),
        creator_acquisition: z.array(z.string()).optional().default([]),
        creator_platforms: z.array(z.string()).optional().default([]),
        creator_email_list_size: z.string().optional().default(''),
        creator_sales_call_status: z.string().optional().default(''),
        creator_has_value_ladder: z.string().optional().default(''),
        creator_launch_model: z.string().optional().default(''),
    })
});


export const goalSchema = z.object({
    primaryGoal: z.string().min(1, "Primary goal is required"),
    timeframe: z.string().optional(),
});

export const contextWithDocsSchema = z.object({
    linkedinUrl: z.string().url().optional().or(z.literal('')),
    linkedinAbout: z.string().optional().or(z.literal('')),
    linkedinPermission: z.boolean().optional(),
    documents: z.array(z.object({
        id: z.string().optional(),
        name: z.string().min(1),
    })).optional(),
});

export const analysisSchema = z.object({
    onboardingData: z.object({
        userName: z.string().optional(),
        companyName: z.string().optional(),
        businessModel: z.string().optional(),
        website: z.string().optional(),
        pitch: z.string().optional(),
        targetAudience: z.string().optional(),
        revenueGoal: z.string().optional(),
        stage: z.string().optional(),
        linkedinUrl: z.string().optional(),
        linkedinAbout: z.string().optional(),
        linkedinPermission: z.boolean().optional(),
        // Questionnaire can have strings, arrays, or nested objects (for DISC answers)
        questionnaire: z.record(z.string(), z.union([
            z.string(),
            z.array(z.string()),
            z.record(z.string(), z.string())
        ])).optional(),
        uploadedDocuments: z.array(z.object({
            id: z.string(),
            name: z.string(),
            content: z.string().optional(),
        })).optional(),
    }).optional(),
});
