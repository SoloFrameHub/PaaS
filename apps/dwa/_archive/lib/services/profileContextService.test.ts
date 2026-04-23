import { describe, it, expect } from 'vitest';
import { profileContextService } from './profileContextService';
import { FounderProfile } from '@/types/profile';

describe('ProfileContextService', () => {
    const mockProfile: any = {
        name: 'Mike',
        businessName: 'SoloFrame',
        businessModel: 'b2b-saas',
        stage: 'idea',
        primaryGoal: 'Scale',
        biggestChallenge: 'Sales process is inconsistent',
        elevatorPitch: 'A short pitch that is definitely under the limit.',
        inferred: {
            icpSummary: 'Summary text',
            valueProposition: 'Value prop text',
            linkedinAnalysis: { bio: 'Test bio' },
            ragSignals: {
                aggregatedInsights: 'Deep insights from RAG',
                valuePropSignals: ['Signal 1', 'Signal 2', 'Signal 3', 'Signal 4', 'Signal 5', 'Signal 6'],
                icpSignals: ['ICP 1']
            }
        },
        questionnaire: {
            industry: 'Tech',
            target_roles: ['CEO']
        }
    };

    it('should extract safe context with default options', () => {
        const context = profileContextService.getSafeContext(mockProfile);

        expect(context.name).toBe('Mike');
        expect(context.inferred.ragSignals.valuePropSignals.length).toBe(5); // Default slice(0, 5)
        expect(typeof context.inferred.linkedinAnalysis).toBe('string');
    });

    it('should respect highFidelity option', () => {
        const context = profileContextService.getSafeContext(mockProfile, { highFidelity: true });

        expect(context.inferred.ragSignals.valuePropSignals.length).toBe(6); // highFidelity slice(0, 15)
    });

    it('should respect ultraLean option', () => {
        const profileWithNulls = {
            ...mockProfile,
            businessModel: null,
            inferred: { ...mockProfile.inferred, icpSummary: null }
        };
        const context = profileContextService.getSafeContext(profileWithNulls, { ultraLean: true }) as any;

        expect(context.businessModel).toBeUndefined();
        expect(context.inferred.icpSummary).toBeUndefined();
        expect(context.inferred.ragSignals).toBe('omitted');
    });

    it('should truncate long strings', () => {
        const longProfile = {
            ...mockProfile,
            primaryGoal: 'A'.repeat(1000)
        };
        const context = profileContextService.getSafeContext(longProfile);

        expect(context.primaryGoal?.length).toBeLessThan(1000);
        expect(context.primaryGoal).toContain('[truncated]');
    });
});
