import { FounderProfile } from '@/types/profile';

/**
 * E2E Test Data Fixtures
 * Provides realistic test user data for different scenarios
 */

const now = new Date().toISOString();

/**
 * Generate userId in the same format as mock authentication
 * Mock auth creates userId as: `mock-${email.replace(/[@.]/g, '')}`
 */
const createMockUserId = (email: string) => `mock-${email.replace(/[^a-zA-Z0-9]/g, '')}`;

/**
 * Base profile template with all required fields
 */
const createBaseProfile = (email: string, overrides: Partial<FounderProfile> = {}): FounderProfile => {
    const userId = createMockUserId(email);

    return {
        id: userId,
        userId,
        name: 'Test User',
        email,
        businessName: 'Test Company',
        websiteUrl: 'https://testcompany.com',
        stage: '0-10k',
        businessModel: 'b2b-saas',
        primaryGoal: 'first-10',
        biggestChallenge: 'Finding qualified leads',
        elevatorPitch: 'We help B2B SaaS companies accelerate their sales pipeline',
        targetAudience: 'B2B SaaS founders and sales teams',
        linkedinUrl: 'https://linkedin.com/in/testuser',
        linkedinAbout: null,
        onboardingCompleted: false,
        onboardingCompletedAt: null,
        profileVersion: 2,
        inferred: {
            icpSummary: 'B2B SaaS companies with 10-50 employees',
            valueProposition: 'Accelerate sales pipeline with AI-powered insights',
            competitivePositioning: 'More affordable than enterprise solutions',
            pricingStructure: 'Subscription-based, $99-499/month',
            industryVertical: 'SaaS',
            commonObjections: ['Too expensive', 'Already have a solution'],
            typicalUseCases: ['Lead generation', 'Sales automation'],
            voiceSample: 'Professional, consultative',
            competitorMentions: ['Salesforce', 'HubSpot'],
            confidence: {
                icpClarity: 75,
                positioningStrength: 70,
                messagingConsistency: 80,
                valueArticulation: 75,
            },
            extractedFrom: {
                websiteAnalyzedAt: now,
                linkedinAnalyzedAt: now,
                documentsAnalyzed: [],
                lastUpdated: now,
            },
        },
        documents: [],
        artifacts: {
            icpDocument: null,
            positioningStatement: null,
            valuePropositionCanvas: null,
            acquisitionPath: null,
            listBuildingCriteria: null,
            discProfile: null,
            discoveryPlaybook: null,
            objectionLibrary: null,
            emailSequences: null,
            personalPlaybook: null,
        },
        assessment: null,
        progress: {
            completedCourses: [],
            completedLessons: {},
            currentCourse: null,
            xpTotal: 0,
            badges: [],
            currentStreak: 0,
            longestStreak: 0,
            streakUpdatedAt: now,
            lastActivityAt: now,
        },
        createdAt: now,
        updatedAt: now,
        ...overrides,
    };
};

/**
 * Test user with completed onboarding
 * Use this for most authenticated tests
 */
export const completedOnboardingUser = {
    email: 'test@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Alex Thompson',
            businessName: 'SalesFlow AI',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            assessment: {
                overallReadiness: 75,
                scores: {
                    icpClarity: 80,
                    positioningStrength: 70,
                    messagingConsistency: 75,
                    channelReadiness: 70,
                    salesProcessMaturity: 75,
                },
                scoreReasoning: {
                    icpClarity: 'Good understanding of target market',
                    positioningStrength: 'Positioning needs refinement',
                    messagingConsistency: 'Consistent messaging across channels',
                    channelReadiness: 'Channels identified but need optimization',
                    salesProcessMaturity: 'Basic sales process in place',
                },
                quickWins: [
                    {
                        category: 'Positioning',
                        title: 'Clarify value proposition',
                        description: 'Your value prop needs more specificity',
                        impact: 'high',
                        addressedInCourse: 1,
                        actionableStep: 'Complete the positioning canvas exercise',
                    },
                ],
                criticalGaps: [
                    {
                        category: 'ICP',
                        title: 'Define ideal customer profile',
                        description: 'ICP is too broad',
                        impact: 'high',
                        addressedInCourse: 0,
                        actionableStep: 'Use the ICP builder tool',
                    },
                ],
                recommendedPath: 'hybrid',
                recommendedStartCourse: 0,
                journeyMap: [
                    {
                        phase: 'Foundation',
                        courses: [0, 1],
                        estimatedWeeks: 2,
                    },
                ],
                personalizedInsight: 'You have strong positioning but need to narrow your ICP',
                generatedAt: now,
            },
            questionnaire: {
                target_roles: ['ceo_founder_high_d', 'vp_sales_high_d'],
                industry: 'saas_startup',
                deal_size: 'smb',
                sales_journey: 'Have some customers, looking to scale',
                revenue_range: '0-10k',
                customer_count: '1-5',
                founder_description: 'reluctant_seller',
                barriers: ['Not enough leads', 'Conversion rate too low'],
                disc_answers: {},
                disc_profile: {
                    primary: 'D',
                    secondary: 'I',
                },
                urgency: 'high',
                channels: ['LinkedIn', 'Email'],
                time_commitment: '5-10 hours/week',
                learning_style: 'adaptive',
                success_90_days: 'Close 5 new customers',
                has_icp_docs: 'no',
            },
        });
    },
};

/**
 * Test user with incomplete onboarding
 * Use this for onboarding flow tests
 */
export const incompleteOnboardingUser = {
    email: 'newuser@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: '',
            businessName: '',
            onboardingCompleted: false,
            onboardingCompletedAt: null,
        });
    },
};

/**
 * Test user with progress in courses
 * Use this for progress tracking tests
 */
export const userWithProgress = {
    email: 'progress@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Jordan Lee',
            businessName: 'Growth Labs',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            progress: {
                completedCourses: [0],
                completedLessons: {
                    '0': ['lesson-1', 'lesson-2', 'lesson-3'],
                    '1': ['lesson-1'],
                },
                currentCourse: 1,
                xpTotal: 450,
                badges: [{ id: 'first-lesson', earnedAt: now }, { id: 'first-course', earnedAt: now }],
                currentStreak: 0,
                longestStreak: 3,
                streakUpdatedAt: now,
                roleplayStats: {
                    totalSessions: 5,
                    avgScore: 78,
                    byDiscType: {
                        'D': { sessions: 2, avgScore: 80 },
                        'I': { sessions: 3, avgScore: 76 },
                    },
                },
                lastActivityAt: now,
            },
        });
    },
};

/**
 * Creator/Coach test user
 * Use this for creator-specific tests
 */
export const creatorUser = {
    email: 'creator@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Sam Rivera',
            businessName: 'Creator Academy',
            businessModel: 'creator-coach',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            questionnaire: {
                target_roles: ['Entrepreneurs', 'Solopreneurs'],
                industry: 'Creator Economy',
                deal_size: 'transactional',
                sales_journey: 'Building audience, starting to monetize',
                revenue_range: '0-10k',
                customer_count: '10-50',
                founder_description: 'Content creator transitioning to coaching',
                barriers: ['Converting followers to customers', 'Pricing strategy'],
                disc_answers: {},
                disc_profile: {
                    primary: 'I',
                    secondary: 'S',
                },
                urgency: 'medium',
                channels: ['Instagram', 'YouTube', 'Email'],
                time_commitment: '10-15 hours/week',
                learning_style: 'assistive',
                success_90_days: 'Launch first paid program',
                has_icp_docs: 'no',
                creator_offer_type: 'coaching-group',
                creator_price_point: 'mid-ticket',
                creator_acquisition: ['Social media', 'Content marketing'],
                creator_platforms: ['Instagram', 'YouTube'],
                creator_email_list_size: '500-2000',
                creator_sales_call_status: 'want-to-start',
                creator_has_value_ladder: 'no',
                creator_launch_model: 'live',
            },
        });
    },
};

/**
 * Admin/Power user for testing advanced features
 */
export const powerUser = {
    email: 'power@example.com',
    password: 'password123',
    get userId() { return createMockUserId(this.email); },
    get profile() {
        return createBaseProfile(this.email, {
            name: 'Morgan Chen',
            businessName: 'Enterprise Solutions Inc',
            stage: 'scaling',
            businessModel: 'b2b-saas',
            onboardingCompleted: true,
            onboardingCompletedAt: now,
            progress: {
                completedCourses: [0, 1, 2, 3],
                completedLessons: {
                    '0': ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5'],
                    '1': ['lesson-1', 'lesson-2', 'lesson-3'],
                    '2': ['lesson-1', 'lesson-2'],
                    '3': ['lesson-1'],
                },
                currentCourse: 4,
                xpTotal: 2500,
                badges: [
                    { id: 'first-lesson', earnedAt: now },
                    { id: 'first-course', earnedAt: now },
                    { id: 'streak-7', earnedAt: now },
                    { id: 'roleplay-master', earnedAt: now },
                ],
                currentStreak: 7,
                longestStreak: 14,
                streakUpdatedAt: now,
                roleplayStats: {
                    totalSessions: 25,
                    avgScore: 85,
                    byDiscType: {
                        'D': { sessions: 8, avgScore: 87 },
                        'I': { sessions: 7, avgScore: 84 },
                        'S': { sessions: 6, avgScore: 83 },
                        'C': { sessions: 4, avgScore: 86 },
                    },
                },
                lastActivityAt: now,
            },
            artifacts: {
                icpDocument: {
                    version: 1,
                    content: {
                        summary: 'Mid-market B2B SaaS companies',
                        decisionMaker: {
                            title: 'VP of Sales',
                            responsibilities: ['Team management', 'Revenue growth'],
                            painPoints: ['Pipeline visibility', 'Team productivity'],
                            goals: ['Hit quota', 'Scale team'],
                        },
                        company: {
                            size: '50-200 employees',
                            industry: ['SaaS', 'Technology'],
                            characteristics: ['Growth stage', 'VC-backed'],
                        },
                        buyingProcess: {
                            triggers: ['Missing quota', 'Team expansion'],
                            stakeholders: ['VP Sales', 'CRO', 'CFO'],
                            timeline: '30-60 days',
                            budget: '$50k-200k annually',
                        },
                    },
                    createdInCourse: 0,
                    createdAt: now,
                    history: [],
                },
                positioningStatement: null,
                valuePropositionCanvas: null,
                acquisitionPath: {
                    primary: 'hybrid',
                    channels: ['LinkedIn', 'Email', 'Events'],
                    selectedAt: now,
                },
                listBuildingCriteria: null,
                discProfile: {
                    selfType: 'D',
                    secondaryType: 'I',
                    prospectPreferences: {
                        mostComfortable: 'D',
                        mostChallenging: 'S',
                    },
                    assessedAt: now,
                },
                discoveryPlaybook: null,
                objectionLibrary: null,
                emailSequences: null,
                personalPlaybook: null,
            },
        });
    },
};

/**
 * Collection of all test users
 */
export const testUsers = {
    completed: completedOnboardingUser,
    incomplete: incompleteOnboardingUser,
    withProgress: userWithProgress,
    creator: creatorUser,
    power: powerUser,
};

/**
 * Helper to generate a unique test user on the fly
 */
export const generateTestUser = (overrides: Partial<FounderProfile> = {}) => {
    const timestamp = Date.now();
    const email = `test-${timestamp}@example.com`;

    return {
        email,
        password: 'TestPassword123!',
        get userId() { return createMockUserId(email); },
        get profile() {
            return createBaseProfile(email, {
                onboardingCompleted: true,
                onboardingCompletedAt: now,
                ...overrides,
            });
        },
    };
};
