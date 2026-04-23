import { describe, it, expect } from 'vitest';
import { buildRoleplaySystemPrompt, buildCoachingPrompt } from './roleplayPromptBuilder';
import { RoleplayContext } from './roleplayService';

describe('roleplayPromptBuilder', () => {
    const mockContext: any = {
        founder: {
            display_name: 'Reluctant Seller',
            natural_disc_affinity: ['S', 'C'],
            struggle_disc_types: ['D'],
            objection_patterns: ['Pricing transparency', 'Technical debt'],
            core_belief: 'Quality speaks for itself',
            fear: 'Being pushy',
            coaching_tone: 'Encouraging but firm',
            avoid_phrases: ['Just close it'],
            motivating_phrases: ['You have value to offer']
        },
        industry: {
            display_name: 'Cybersecurity',
            regulatory_concerns: ['GDPR', 'HIPAA'],
            risk_tolerance: 'low',
            common_objections: [
                { objection: 'Too complex', underlying_concern: 'Implementation' }
            ],
            terminology: [{ term: 'Zero Trust', definition: 'Never trust' }]
        },
        clientRole: {
            display_name: 'CISO',
            seniority_level: 'c_suite',
            disc_type: 'D',
            measured_on: ['Security posture'],
            gets_fired_for: ['Data breach'],
            role_specific_pains: ['Budget freezes'],
            hidden_concerns: ['Political infighting'],
            disc_overlay: {
                behavioral_description: 'Direct and assertive.',
                communication_tips: ['Be direct'],
                email_style: 'Punchy',
                meeting_behavior: 'Interrupts',
                buying_signals: ['Pricing questions'],
                warning_signs: ['Checking watch'],
                objection_style: 'Blunt'
            }
        },
        discPattern: {
            type: 'D',
            description: 'Dominant'
        },
        scenario: 'Testing scenario description.',
        difficulty: 'intermediate',
        ragSignals: {
            aggregatedInsights: 'RAG Insights here',
            valuePropSignals: ['Signal A'],
            icpSignals: ['Signal B']
        }
    };

    describe('buildRoleplaySystemPrompt', () => {
        it('should build a prompt containing all key dimensions', () => {
            const prompt = buildRoleplaySystemPrompt(mockContext);

            expect(prompt).toContain('ROLE DEFINITION');
            expect(prompt).toContain('CISO');
            expect(prompt).toContain('Cybersecurity');
            expect(prompt).toContain('Direct and assertive');
            expect(prompt).toContain('RAG Insights here');
            expect(prompt).toContain('Reluctant Seller');
            expect(prompt).toContain('INTERMEDIATE');
        });

        it('should use default disc overlay if not provided', () => {
            const contextWithoutOverlay = {
                ...mockContext,
                clientRole: {
                    ...mockContext.clientRole,
                    disc_overlay: undefined
                }
            };
            const prompt = buildRoleplaySystemPrompt(contextWithoutOverlay as any);
            expect(prompt).toContain('You embody D personality traits');
        });

        it('should handle missing RAG signals gracefully', () => {
            const contextWithoutRag = {
                ...mockContext,
                ragSignals: undefined
            };
            const prompt = buildRoleplaySystemPrompt(contextWithoutRag as any);
            expect(prompt).toContain('No specific RAG document context provided');
        });

        it('should include difficulty instructions', () => {
            const prompt = buildRoleplaySystemPrompt(mockContext);
            expect(prompt).toContain('Be moderately skeptical');
            expect(prompt).toContain('Raise 2-3 objections');
        });
    });

    describe('buildCoachingPrompt', () => {
        const history = [
            { role: 'user', content: 'Hello' },
            { role: 'assistant', content: 'Hi there' }
        ];

        it('should build a coaching prompt with founder context and conversation history', () => {
            const prompt = buildCoachingPrompt(mockContext, history);

            expect(prompt).toContain('sales coach');
            expect(prompt).toContain('Reluctant Seller');
            expect(prompt).toContain('Quality speaks for itself');
            expect(prompt).toContain('Encouraging but firm');
            expect(prompt).toContain('USER: Hello');
            expect(prompt).toContain('ASSISTANT: Hi there');
            expect(prompt).toContain('RAG STRATEGIC SIGNALS');
        });

        it('should include specific coaching instructions', () => {
            const prompt = buildCoachingPrompt(mockContext, history);
            expect(prompt).toContain('What they did well');
            expect(prompt).toContain('What to improve');
            expect(prompt).toContain('Cross-reference the user\'s pitches');
        });
    });
});
