export type ContentStatus = 'published' | 'coming-soon' | 'draft';

/**
 * Maps courseId to content availability status.
 * IDs must match curriculum.ts and disk directory names exactly.
 * All tracks (1-7) + Creator Track have full content.
 */
export const CONTENT_STATUS: Record<string, ContentStatus> = {
    // Track 1: Foundations (published)
    'sales-psychology': 'published',
    'icp-builder': 'published',
    'positioning-value': 'published',
    'choose-path': 'published',
    'list-building': 'published',

    // Track 2: Marketing Engine (published)
    'technical-content': 'published',
    'seo-aeo': 'published',
    'linkedin-engine': 'published',
    'cold-email-mastery': 'published',
    'community-lead-gen': 'published',
    'email-nurture': 'published',
    'course-11-social-proof-referral': 'published',
    'course-12-marketing-automation-analytics': 'published',

    // Track 3: Sales Methodology (published)
    'disc-personas': 'published',
    'discovery-framework': 'published',
    'course-15-discovery-simulations': 'published',
    'demo-architecture': 'published',
    'objection-handling': 'published',
    'proposals-pricing': 'published',
    'closing-closing': 'published',
    'pipeline-management': 'published',

    // Track 4: AI-Powered Acquisition (published)
    'ai-acquisition-strategy': 'published',
    'email-deliverability': 'published',
    'ai-lead-research': 'published',
    'ai-outreach-automation': 'published',
    'linkedin-ai': 'published',
    'autonomous-sdr': 'published',
    'custom-ai-agents': 'published',

    // Track 5: Creator Economy (published)
    'creator-sales-mindset': 'published',
    'audience-to-buyer': 'published',
    'webinar-challenge-funnels': 'published',
    'creator-sales-conversations': 'published',
    'dm-selling-social-commerce': 'published',
    'creator-metrics': 'published',
    'scaling-creator-sales': 'published',
    'community-led-sales': 'published',

    // Track 6: Customer Success (published)
    'onboarding': 'published',
    'retention': 'published',
    'expansion': 'published',
    'advocacy': 'published',

    // Track 7: Operations & Systems (published)
    'crm-setup': 'published',
    'analytics': 'published',
    'automation': 'published',
    'outsourcing': 'published',
    'playbook': 'published',
    'scale': 'published',
    'legal': 'published',
    'finance': 'published',
    'capstone': 'published',
};

export function getContentStatus(courseId: string): ContentStatus {
    return CONTENT_STATUS[courseId] || 'coming-soon';
}

export function isContentPublished(courseId: string): boolean {
    return getContentStatus(courseId) === 'published';
}
