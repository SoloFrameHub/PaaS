import { describe, it, expect } from 'vitest';
import { profileContextService } from './profileContextService';

describe('ProfileContextService', () => {
    const mockProfile: any = {
        name: 'Mike',
        businessName: 'SoloFrame',
        businessModel: 'b2b-saas',
        stage: 'idea',
        websiteUrl: 'https://soloframe.com',
        linkedinUrl: 'https://linkedin.com/in/mike',
        primaryGoal: 'Scale',
        biggestChallenge: 'Sales process is inconsistent',
        elevatorPitch: 'A short pitch that is definitely under the limit.',
        targetAudience: 'B2B SaaS founders earning $5k-$20k MRR',
        questionnaire: {
            industry: 'Tech',
            target_roles: ['CEO'],
            deal_size: 'mid_market',
            urgency: 'high',
            sales_journey: 'outreach',
            revenue_range: '0-10k',
            customer_count: '1-5',
            founder_description: 'tech',
            barriers: ['time', 'knowledge'],
            disc_profile: { primary: 'D', secondary: 'I' },
            channels: ['linkedin', 'email'],
            time_commitment: '10-15',
            learning_style: 'aggressive',
            success_90_days: 'Close 5 enterprise deals',
            creator_offer_type: 'course',
            creator_price_point: '997',
            creator_acquisition: ['organic'],
        },
        inferred: {
            icpSummary: 'Summary text',
            valueProposition: 'Value prop text',
            competitivePositioning: 'Best in class',
            pricingStructure: '$99-499/mo',
            linkedinAnalysis: { bio: 'Test bio', headline: 'SaaS Founder' },
            ragSignals: {
                aggregatedInsights: 'Deep insights from RAG',
                valuePropSignals: ['Signal 1', 'Signal 2', 'Signal 3', 'Signal 4', 'Signal 5', 'Signal 6'],
                icpSignals: ['ICP 1', 'ICP 2', 'ICP 3'],
                competitiveSignals: ['Comp 1', 'Comp 2'],
                documentSummaries: [
                    {
                        fileName: 'pitch.pdf',
                        summary: 'A pitch deck for B2B SaaS',
                        keySignals: ['PMF', 'Pricing', 'Traction', 'Team'],
                        relevantTo: ['ICP', 'Positioning'],
                    },
                ],
            },
        },
        artifacts: {
            icpDocument: { content: { summary: 'ICP: Mid-market SaaS' }, version: 1 },
            positioningStatement: { content: 'We help teams ship faster', version: 1 },
            valuePropositionCanvas: { content: { pains: ['churn'], gains: ['retention'] }, version: 1 },
            acquisitionPath: { primary: 'outbound', channels: ['linkedin', 'email'] },
            discoveryPlaybook: { content: { questions: ['What is your biggest pain?'] }, version: 1 },
        },
    };

    // =========================================================================
    // Default mode
    // =========================================================================
    describe('default options', () => {
        it('should extract safe context with core fields', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.name).toBe('Mike');
            expect(context.businessName).toBe('SoloFrame');
            expect(context.businessModel).toBe('b2b-saas');
            expect(context.stage).toBe('idea');
            expect(context.websiteUrl).toBe('https://soloframe.com');
            expect(context.linkedinUrl).toBe('https://linkedin.com/in/mike');
        });

        it('should include basic questionnaire fields', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.questionnaire.industry).toBe('Tech');
            expect(context.questionnaire.target_roles).toEqual(['CEO']);
            expect(context.questionnaire.deal_size).toBe('mid_market');
            expect(context.questionnaire.urgency).toBe('high');
        });

        it('should NOT include extended questionnaire fields in default mode', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.questionnaire.sales_journey).toBeUndefined();
            expect(context.questionnaire.founder_description).toBeUndefined();
            expect(context.questionnaire.disc_profile).toBeUndefined();
            expect(context.questionnaire.learning_style).toBeUndefined();
            expect(context.questionnaire.creator_offer_type).toBeUndefined();
        });

        it('should slice ragSignals.valuePropSignals to 5 in default mode', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.inferred.ragSignals.valuePropSignals.length).toBe(5);
        });

        it('should slice icpSignals to 5 max (3 available)', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.inferred.ragSignals.icpSignals.length).toBe(3);
        });

        it('should NOT include documentSummaries in default mode', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.inferred.ragSignals.documentSummaries).toBeUndefined();
        });

        it('should stringify linkedinAnalysis', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(typeof context.inferred.linkedinAnalysis).toBe('string');
            expect(context.inferred.linkedinAnalysis).toContain('Test bio');
        });

        it('should include artifact summaries in default mode', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.artifacts).toBeDefined();
            expect(context.artifacts?.icpDocument).toContain('Mid-market SaaS');
        });
    });

    // =========================================================================
    // highFidelity mode
    // =========================================================================
    describe('highFidelity option', () => {
        it('should include all ragSignals (up to 15)', () => {
            const context = profileContextService.getSafeContext(mockProfile, { highFidelity: true });

            expect(context.inferred.ragSignals.valuePropSignals.length).toBe(6); // Only 6 available
        });

        it('should include extended questionnaire fields', () => {
            const context = profileContextService.getSafeContext(mockProfile, { highFidelity: true });

            expect(context.questionnaire.sales_journey).toBe('outreach');
            expect(context.questionnaire.revenue_range).toBe('0-10k');
            expect(context.questionnaire.customer_count).toBe('1-5');
            expect(context.questionnaire.founder_description).toBe('tech');
            expect(context.questionnaire.barriers).toEqual(['time', 'knowledge']);
            expect(context.questionnaire.disc_profile).toEqual({ primary: 'D', secondary: 'I' });
            expect(context.questionnaire.channels).toEqual(['linkedin', 'email']);
            expect(context.questionnaire.time_commitment).toBe('10-15');
            expect(context.questionnaire.learning_style).toBe('aggressive');
            expect(context.questionnaire.success_90_days).toBe('Close 5 enterprise deals');
        });

        it('should include creator economy fields', () => {
            const context = profileContextService.getSafeContext(mockProfile, { highFidelity: true });

            expect(context.questionnaire.creator_offer_type).toBe('course');
            expect(context.questionnaire.creator_price_point).toBe('997');
            expect(context.questionnaire.creator_acquisition).toEqual(['organic']);
        });

        it('should include documentSummaries', () => {
            const context = profileContextService.getSafeContext(mockProfile, { highFidelity: true });

            expect(context.inferred.ragSignals.documentSummaries).toBeDefined();
            expect(context.inferred.ragSignals.documentSummaries).toHaveLength(1);
            expect(context.inferred.ragSignals.documentSummaries[0].fileName).toBe('pitch.pdf');
            // Should truncate keySignals to 3
            expect(context.inferred.ragSignals.documentSummaries[0].keySignals).toHaveLength(3);
        });

        it('should allow longer truncation limits for ICP and value prop', () => {
            const longProfile = {
                ...mockProfile,
                inferred: {
                    ...mockProfile.inferred,
                    icpSummary: 'A'.repeat(700),
                    valueProposition: 'B'.repeat(700),
                },
            };

            const defaultCtx = profileContextService.getSafeContext(longProfile);
            const hfCtx = profileContextService.getSafeContext(longProfile, { highFidelity: true });

            // Default truncates at 400, highFidelity at 800
            expect(defaultCtx.inferred.icpSummary!.length).toBeLessThan(500);
            expect(hfCtx.inferred.icpSummary!.length).toBe(700); // 700 < 800, no truncation
        });
    });

    // =========================================================================
    // coaching mode
    // =========================================================================
    describe('coaching option', () => {
        it('should include extended questionnaire fields', () => {
            const context = profileContextService.getSafeContext(mockProfile, { coaching: true });

            expect(context.questionnaire.founder_description).toBe('tech');
            expect(context.questionnaire.disc_profile).toEqual({ primary: 'D', secondary: 'I' });
            expect(context.questionnaire.learning_style).toBe('aggressive');
        });

        it('should include documentSummaries', () => {
            const context = profileContextService.getSafeContext(mockProfile, { coaching: true });

            expect(context.inferred.ragSignals.documentSummaries).toBeDefined();
        });

        it('should slice ragSignals to 10 (coaching middle ground)', () => {
            const manySignals = {
                ...mockProfile,
                inferred: {
                    ...mockProfile.inferred,
                    ragSignals: {
                        ...mockProfile.inferred.ragSignals,
                        valuePropSignals: Array.from({ length: 20 }, (_, i) => `Signal ${i}`),
                    },
                },
            };

            const context = profileContextService.getSafeContext(manySignals, { coaching: true });
            expect(context.inferred.ragSignals.valuePropSignals.length).toBe(10);
        });

        it('should include artifacts', () => {
            const context = profileContextService.getSafeContext(mockProfile, { coaching: true });

            expect(context.artifacts).toBeDefined();
            expect(context.artifacts?.acquisitionPath).toContain('outbound');
            expect(context.artifacts?.acquisitionPath).toContain('linkedin');
        });
    });

    // =========================================================================
    // ultraLean mode
    // =========================================================================
    describe('ultraLean option', () => {
        it('should set ragSignals to null', () => {
            const context = profileContextService.getSafeContext(mockProfile, { ultraLean: true }) as any;

            // ragSignals is set to null, then stripped by null-removal
            expect(context.inferred.ragSignals).toBeUndefined();
        });

        it('should strip null values from top level', () => {
            const profileWithNulls = {
                ...mockProfile,
                primaryGoal: null,
                biggestChallenge: null,
            };
            const context = profileContextService.getSafeContext(profileWithNulls, { ultraLean: true }) as any;

            expect(context.primaryGoal).toBeUndefined();
            expect(context.biggestChallenge).toBeUndefined();
        });

        it('should strip null values from nested inferred', () => {
            const profileWithNulls = {
                ...mockProfile,
                inferred: {
                    ...mockProfile.inferred,
                    icpSummary: null,
                    competitivePositioning: null,
                },
            };
            const context = profileContextService.getSafeContext(profileWithNulls, { ultraLean: true }) as any;

            expect(context.inferred.icpSummary).toBeUndefined();
            expect(context.inferred.competitivePositioning).toBeUndefined();
        });

        it('should preserve non-null values', () => {
            const context = profileContextService.getSafeContext(mockProfile, { ultraLean: true }) as any;

            expect(context.name).toBe('Mike');
            expect(context.businessName).toBe('SoloFrame');
            expect(context.inferred.icpSummary).toBe('Summary text');
        });
    });

    // =========================================================================
    // Truncation
    // =========================================================================
    describe('string truncation', () => {
        it('should truncate long primaryGoal', () => {
            const longProfile = {
                ...mockProfile,
                primaryGoal: 'A'.repeat(1000),
            };
            const context = profileContextService.getSafeContext(longProfile);

            expect(context.primaryGoal!.length).toBeLessThan(1000);
            expect(context.primaryGoal).toContain('[truncated]');
        });

        it('should truncate long elevatorPitch at 300 chars', () => {
            const longProfile = {
                ...mockProfile,
                elevatorPitch: 'B'.repeat(500),
            };
            const context = profileContextService.getSafeContext(longProfile);

            expect(context.elevatorPitch!.length).toBeLessThanOrEqual(320); // 300 + "... [truncated]"
            expect(context.elevatorPitch).toContain('[truncated]');
        });

        it('should not truncate short strings', () => {
            const context = profileContextService.getSafeContext(mockProfile);

            expect(context.primaryGoal).toBe('Scale');
            expect(context.primaryGoal).not.toContain('[truncated]');
        });

        it('should handle null strings gracefully', () => {
            const nullProfile = {
                ...mockProfile,
                primaryGoal: null,
                biggestChallenge: null,
                elevatorPitch: null,
            };
            const context = profileContextService.getSafeContext(nullProfile);

            expect(context.primaryGoal).toBeNull();
            expect(context.biggestChallenge).toBeNull();
            expect(context.elevatorPitch).toBeNull();
        });
    });

    // =========================================================================
    // Edge cases
    // =========================================================================
    describe('edge cases', () => {
        it('should handle profile with no questionnaire', () => {
            const noQuestionnaire = {
                ...mockProfile,
                questionnaire: undefined,
            };
            const context = profileContextService.getSafeContext(noQuestionnaire);

            expect(context.questionnaire.industry).toBeUndefined();
            expect(context.questionnaire.target_roles).toBeUndefined();
        });

        it('should handle profile with no ragSignals', () => {
            const noRag = {
                ...mockProfile,
                inferred: {
                    ...mockProfile.inferred,
                    ragSignals: null,
                },
            };
            const context = profileContextService.getSafeContext(noRag);

            expect(context.inferred.ragSignals).toBeNull();
        });

        it('should handle profile with empty ragSignals arrays', () => {
            const emptyRag = {
                ...mockProfile,
                inferred: {
                    ...mockProfile.inferred,
                    ragSignals: {
                        aggregatedInsights: '',
                        valuePropSignals: [],
                        icpSignals: [],
                        competitiveSignals: [],
                    },
                },
            };
            const context = profileContextService.getSafeContext(emptyRag);

            expect(context.inferred.ragSignals.valuePropSignals).toEqual([]);
            expect(context.inferred.ragSignals.icpSignals).toEqual([]);
        });

        it('should handle profile with no artifacts', () => {
            const noArtifacts = {
                ...mockProfile,
                artifacts: undefined,
            };
            const context = profileContextService.getSafeContext(noArtifacts);

            expect(context.artifacts).toBeUndefined();
        });

        it('should handle artifacts with null content', () => {
            const nullArtifacts = {
                ...mockProfile,
                artifacts: {
                    icpDocument: null,
                    positioningStatement: null,
                    valuePropositionCanvas: null,
                    acquisitionPath: null,
                    discoveryPlaybook: null,
                },
            };
            const context = profileContextService.getSafeContext(nullArtifacts);

            expect(context.artifacts?.icpDocument).toBeNull();
            expect(context.artifacts?.positioningStatement).toBeNull();
        });
    });
});
