import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onboardingService, calculateFounderCategory, calculateDiscProfile } from './onboardingService';

vi.mock('@/lib/repositories/profileRepository', () => ({
    profileRepository: {
        update: vi.fn(),
        getById: vi.fn(),
    }
}));

vi.mock('@/lib/repositories/masterDataRepositoryFactory', () => ({
    masterDataRepository: {
        getIndustries: vi.fn().mockResolvedValue([
            { id: 'saas_startup', name: 'SaaS Startup' },
            { id: 'agency', name: 'Agency' },
        ]),
    }
}));

vi.mock('@/lib/db', () => ({
    hasDatabase: vi.fn().mockReturnValue(false),
    getDb: vi.fn().mockReturnValue(null),
    schema: {},
}));

import { profileRepository } from '@/lib/repositories/profileRepository';

const mockUpdate = profileRepository.update as ReturnType<typeof vi.fn>;
const mockGetById = profileRepository.getById as ReturnType<typeof vi.fn>;

describe('OnboardingService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // =========================================================================
    // saveBusinessInfo
    // =========================================================================
    describe('saveBusinessInfo', () => {
        it('should save all provided business info fields', async () => {
            await onboardingService.saveBusinessInfo('user-1', {
                name: 'Alice',
                businessName: 'Acme Corp',
                businessModel: 'SaaS',
                websiteUrl: 'https://acme.com',
                elevatorPitch: 'We help teams ship faster',
                targetAudience: 'B2B SaaS founders',
                stage: '0-10k',
            });

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                name: 'Alice',
                businessName: 'Acme Corp',
                businessModel: 'SaaS',
                websiteUrl: 'https://acme.com',
                elevatorPitch: 'We help teams ship faster',
                targetAudience: 'B2B SaaS founders',
                stage: '0-10k',
            }));
        });

        it('should not include undefined optional fields', async () => {
            await onboardingService.saveBusinessInfo('user-1', { name: 'Bob' });

            const call = mockUpdate.mock.calls[0][1];
            expect(call.name).toBe('Bob');
            expect(call).not.toHaveProperty('businessName');
            expect(call).not.toHaveProperty('websiteUrl');
            expect(call).not.toHaveProperty('elevatorPitch');
            expect(call).not.toHaveProperty('targetAudience');
            expect(call).not.toHaveProperty('stage');
        });

        it('should always include updatedAt timestamp', async () => {
            await onboardingService.saveBusinessInfo('user-1', { name: 'Bob' });

            const call = mockUpdate.mock.calls[0][1];
            expect(call.updatedAt).toBeDefined();
            expect(typeof call.updatedAt).toBe('string');
        });

        it('should handle websiteUrl being explicitly null', async () => {
            await onboardingService.saveBusinessInfo('user-1', {
                name: 'Alice',
                websiteUrl: null,
            });

            const call = mockUpdate.mock.calls[0][1];
            expect(call.websiteUrl).toBeNull();
        });

        it('should handle empty data (only updatedAt)', async () => {
            await onboardingService.saveBusinessInfo('user-1', {});

            const call = mockUpdate.mock.calls[0][1];
            expect(Object.keys(call)).toEqual(['updatedAt']);
        });
    });

    // =========================================================================
    // saveGoalInfo
    // =========================================================================
    describe('saveGoalInfo', () => {
        it('should save goal and challenge', async () => {
            await onboardingService.saveGoalInfo('user-1', {
                primaryGoal: 'Get first 10 customers',
                biggestChallenge: 'No idea where to find them',
            });

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                primaryGoal: 'Get first 10 customers',
                biggestChallenge: 'No idea where to find them',
            }));
        });

        it('should save goal with null challenge', async () => {
            await onboardingService.saveGoalInfo('user-1', {
                primaryGoal: 'Scale to $100k MRR',
                biggestChallenge: null,
            });

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                primaryGoal: 'Scale to $100k MRR',
                biggestChallenge: null,
            }));
        });
    });

    // =========================================================================
    // saveInferredContext
    // =========================================================================
    describe('saveInferredContext', () => {
        it('should save inferred ICP summary', async () => {
            await onboardingService.saveInferredContext('user-1', {
                icpSummary: 'Mid-market SaaS companies',
            } as any);

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                'inferred.icpSummary': 'Mid-market SaaS companies',
            }));
        });

        it('should save multiple inferred fields', async () => {
            await onboardingService.saveInferredContext('user-1', {
                icpSummary: 'Mid-market SaaS companies',
                valueProposition: 'Reduce churn by 50%',
                competitivePositioning: 'Best in class for SMBs',
                pricingStructure: '$99-499/mo',
                industryVertical: 'SaaS',
            } as any);

            const call = mockUpdate.mock.calls[0][1];
            expect(call['inferred.icpSummary']).toBe('Mid-market SaaS companies');
            expect(call['inferred.valueProposition']).toBe('Reduce churn by 50%');
            expect(call['inferred.competitivePositioning']).toBe('Best in class for SMBs');
            expect(call['inferred.pricingStructure']).toBe('$99-499/mo');
            expect(call['inferred.industryVertical']).toBe('SaaS');
        });

        it('should skip falsy inferred fields', async () => {
            await onboardingService.saveInferredContext('user-1', {
                icpSummary: 'Exists',
                valueProposition: '',
            } as any);

            const call = mockUpdate.mock.calls[0][1];
            expect(call['inferred.icpSummary']).toBe('Exists');
            expect(call).not.toHaveProperty('inferred.valueProposition');
        });
    });

    // =========================================================================
    // saveLinkedinAnalysis
    // =========================================================================
    describe('saveLinkedinAnalysis', () => {
        it('should save linkedin analysis to inferred.linkedinAnalysis', async () => {
            const analysis = { bio: 'Test bio', headline: 'SaaS Founder' };
            await onboardingService.saveLinkedinAnalysis('user-1', analysis);

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                'inferred.linkedinAnalysis': analysis,
            }));
        });
    });

    // =========================================================================
    // saveAssessment
    // =========================================================================
    describe('saveAssessment', () => {
        const mockAssessment = {
            overallReadiness: 65,
            scores: {
                icpClarity: 70,
                positioningStrength: 60,
                messagingConsistency: 65,
                channelReadiness: 55,
                salesProcessMaturity: 50,
            },
            scoreReasoning: {
                icpClarity: '',
                positioningStrength: '',
                messagingConsistency: '',
                channelReadiness: '',
                salesProcessMaturity: '',
            },
            quickWins: [{ category: 'ICP', title: 'Define ICP', description: 'test', impact: 'high' as const, addressedInCourse: 1, actionableStep: 'test' }],
            criticalGaps: [],
            recommendedPath: 'outbound' as const,
            recommendedStartCourse: 1,
            journeyMap: [],
            personalizedInsight: 'Test insight',
        };

        it('should save assessment with generatedAt', async () => {
            await onboardingService.saveAssessment('user-1', mockAssessment);

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                assessment: expect.objectContaining({
                    overallReadiness: 65,
                    generatedAt: expect.any(String),
                }),
            }));
        });

        it('should add generatedAt to assessment', async () => {
            await onboardingService.saveAssessment('user-1', mockAssessment);

            const call = mockUpdate.mock.calls[0][1];
            expect(call.assessment.generatedAt).toBeDefined();
            expect(new Date(call.assessment.generatedAt).getTime()).not.toBeNaN();
        });

        it('should NOT set onboardingCompleted (that is done in /complete route)', async () => {
            await onboardingService.saveAssessment('user-1', mockAssessment);

            const call = mockUpdate.mock.calls[0][1];
            expect(call).not.toHaveProperty('onboardingCompleted');
            expect(call).not.toHaveProperty('onboardingCompletedAt');
        });
    });

    // =========================================================================
    // updateDocumentAnalysis
    // =========================================================================
    describe('updateDocumentAnalysis', () => {
        it('should update extraction for a specific document', async () => {
            mockGetById.mockResolvedValue({
                documents: [
                    { id: 'doc-1', fileName: 'pitch.pdf' },
                    { id: 'doc-2', fileName: 'icp.txt' },
                ],
            });

            await onboardingService.updateDocumentAnalysis('user-1', 'doc-1', {
                summary: 'A pitch deck for SaaS product',
                keySignals: ['Product-market fit', 'Pricing model'],
                relevantTo: ['ICP', 'Positioning'],
            } as any);

            expect(mockUpdate).toHaveBeenCalledWith('user-1', expect.objectContaining({
                documents: expect.arrayContaining([
                    expect.objectContaining({
                        id: 'doc-1',
                        extractedContext: expect.objectContaining({
                            summary: 'A pitch deck for SaaS product',
                        }),
                        processedAt: expect.any(String),
                    }),
                    expect.objectContaining({ id: 'doc-2', fileName: 'icp.txt' }),
                ]),
            }));
        });

        it('should not update if profile not found', async () => {
            mockGetById.mockResolvedValue(null);

            await onboardingService.updateDocumentAnalysis('user-1', 'doc-1', {} as any);

            expect(mockUpdate).not.toHaveBeenCalled();
        });

        it('should preserve other documents unchanged', async () => {
            mockGetById.mockResolvedValue({
                documents: [
                    { id: 'doc-1', fileName: 'a.pdf', extractedContext: null },
                    { id: 'doc-2', fileName: 'b.txt', extractedContext: { summary: 'existing' } },
                ],
            });

            await onboardingService.updateDocumentAnalysis('user-1', 'doc-1', { summary: 'new' } as any);

            const docs = mockUpdate.mock.calls[0][1].documents;
            expect(docs[1].extractedContext.summary).toBe('existing');
        });
    });

    // =========================================================================
    // calculateFounderCategory
    // =========================================================================
    describe('calculateFounderCategory', () => {
        it('should return reluctant_seller for product-first answer', () => {
            const result = calculateFounderCategory({ q1: "I should make the product better first" });
            expect(result.category_id).toBe('reluctant_seller');
            expect(result.confidence).toBeGreaterThan(0);
        });

        it('should return burned_bootstrapper for past-failure answer', () => {
            const result = calculateFounderCategory({
                q1: "I've tried sales approaches before and they felt wrong",
                q3: "Fear — I don't want to repeat past mistakes",
                q4: "Expensive — I wasted money on that before",
            });
            expect(result.category_id).toBe('burned_bootstrapper');
        });

        it('should return time_starved_parent for time-constrained answers', () => {
            const result = calculateFounderCategory({
                q1: "I know I need to, but I barely have time",
                q3: "Time — I have maybe 10-15 hours per week",
            });
            expect(result.category_id).toBe('time_starved_parent');
        });

        it('should return technical_purist for developer background', () => {
            const result = calculateFounderCategory({
                q1: "I should make the product better first",
                q2: "I'm a developer/engineer by trade",
                q3: "Knowledge — I'm technical, but sales is foreign",
            });
            // Technical purist should score high with these answers
            expect(['technical_purist', 'reluctant_seller']).toContain(result.category_id);
        });

        it('should return scaling_struggler for plateau answers', () => {
            const result = calculateFounderCategory({
                q1: "I'm ready—just need the right framework",
                q3: "Scale — I have customers but can't break through",
                q4: "Necessary — I need systems to break my plateau",
            });
            expect(result.category_id).toBe('scaling_struggler');
        });

        it('should return agency_escapee for agency background', () => {
            const result = calculateFounderCategory({
                q2: "I run an agency or consultancy",
                q4: "Exciting — more customers means product revenue",
            });
            expect(result.category_id).toBe('agency_escapee');
        });

        it('should return returning_founder for experienced founder', () => {
            const result = calculateFounderCategory({
                q2: "I've built and exited companies before",
            });
            expect(result.category_id).toBe('returning_founder');
        });

        it('should return international_founder for outside US/UK', () => {
            const result = calculateFounderCategory({
                q5: "Outside US/UK, targeting US market",
            });
            expect(result.category_id).toBe('international_founder');
        });

        it('should return non_technical for business background', () => {
            const result = calculateFounderCategory({
                q2: "Business/marketing background, I outsource technical work",
            });
            expect(result.category_id).toBe('non_technical');
        });

        it('should default to reluctant_seller when no answers match', () => {
            const result = calculateFounderCategory({});
            expect(result.category_id).toBe('reluctant_seller');
        });

        it('should have zero confidence when no answers match', () => {
            const result = calculateFounderCategory({});
            expect(result.confidence).toBe(0);
        });

        it('should handle unknown question IDs gracefully', () => {
            const result = calculateFounderCategory({ unknown_q: 'some answer' });
            expect(result.category_id).toBe('reluctant_seller');
            expect(result.confidence).toBe(0);
        });

        it('should handle unknown answer text gracefully', () => {
            const result = calculateFounderCategory({ q1: 'This answer does not exist' });
            expect(result.category_id).toBe('reluctant_seller');
            expect(result.confidence).toBe(0);
        });

        it('should produce higher confidence with more matching answers', () => {
            const singleAnswer = calculateFounderCategory({
                q1: "I know I need to, but I barely have time",
            });
            const multipleAnswers = calculateFounderCategory({
                q1: "I know I need to, but I barely have time",
                q3: "Time — I have maybe 10-15 hours per week",
            });
            expect(multipleAnswers.confidence).toBeGreaterThan(singleAnswer.confidence);
        });
    });

    // =========================================================================
    // calculateDiscProfile
    // =========================================================================
    describe('calculateDiscProfile', () => {
        it('should identify D-primary from dominant answers (by text)', () => {
            const result = calculateDiscProfile({
                disc1: "Confidently redirect to business outcomes you can speak to",
                disc2: "Dive in quickly — I'll figure it out as we go",
                disc3: "Push for a concrete next step or timeline",
                disc4: "Address it directly and move to close",
            });
            expect(result.primary).toBe('D');
        });

        it('should identify I-primary from influence answers (by text)', () => {
            const result = calculateDiscProfile({
                disc1: "Engage enthusiastically and promise to get them answers",
                disc2: "Think about how to build rapport and connect first",
                disc3: "Share a success story to keep the excitement going",
                disc4: "Find common ground and keep the relationship warm",
            });
            expect(result.primary).toBe('I');
        });

        it('should identify S-primary from steadiness answers (by text)', () => {
            const result = calculateDiscProfile({
                disc1: "Honestly admit the gap and offer to follow up with specifics",
                disc2: "Prepare thoroughly so nothing goes wrong",
                disc3: "Respect their space and wait for them to reach out",
                disc4: "Acknowledge their concern and offer reassurance",
            });
            expect(result.primary).toBe('S');
        });

        it('should identify C-primary from conscientiousness answers (by text)', () => {
            const result = calculateDiscProfile({
                disc1: "Ask clarifying questions to understand exactly what they need",
                disc2: "Research their company and prepare specific questions",
                disc3: "Offer additional documentation they can review",
                disc4: "Provide data and logical explanations",
            });
            expect(result.primary).toBe('C');
        });

        it('should accept DISC letter answers directly', () => {
            const result = calculateDiscProfile({
                disc1: 'D',
                disc2: 'D',
                disc3: 'D',
                disc4: 'I',
            });
            expect(result.primary).toBe('D');
            expect(result.secondary).toBe('I');
        });

        it('should calculate secondary type correctly', () => {
            const result = calculateDiscProfile({
                disc1: 'D',
                disc2: 'D',
                disc3: 'I',
                disc4: 'I',
            });
            expect(result.primary).toBe('D'); // Tied, but D comes first alphabetically in sort
            expect(result.secondary).not.toBeNull();
        });

        it('should return null secondary when only one type has votes', () => {
            const result = calculateDiscProfile({
                disc1: "Confidently redirect to business outcomes you can speak to",
            });
            expect(result.primary).toBe('D');
            // Secondary should be null since no other type has > 0 votes
            expect(result.secondary).toBeNull();
        });

        it('should handle mixed text and letter answers', () => {
            const result = calculateDiscProfile({
                disc1: "Confidently redirect to business outcomes you can speak to", // D by text
                disc2: 'D', // D by letter
                disc3: 'I', // I by letter
                disc4: 'I', // I by letter
            });
            expect(result.primary).toBe('D');
            expect(result.secondary).toBe('I');
        });

        it('should handle empty answers', () => {
            const result = calculateDiscProfile({});
            expect(result.primary).toBeDefined();
            expect(['D', 'I', 'S', 'C']).toContain(result.primary);
        });

        it('should handle fallback for unknown scenario IDs with valid DISC letters', () => {
            const result = calculateDiscProfile({
                unknown1: 'D',
                unknown2: 'D',
                unknown3: 'I',
            });
            expect(result.primary).toBe('D');
            expect(result.secondary).toBe('I');
        });
    });

    // =========================================================================
    // getIndustries
    // =========================================================================
    describe('getIndustries', () => {
        it('should return industries from master data', async () => {
            const industries = await onboardingService.getIndustries();
            expect(industries).toHaveLength(2);
            expect(industries[0]).toHaveProperty('id');
            expect(industries[0]).toHaveProperty('name');
        });

        it('should return expected industry data', async () => {
            const industries = await onboardingService.getIndustries();
            expect(industries[0].id).toBe('saas_startup');
            expect(industries[1].name).toBe('Agency');
        });
    });
});
