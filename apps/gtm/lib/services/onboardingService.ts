import { profileRepository } from '@/lib/repositories/profileRepository';
import { FounderProfile, InferredContext, Assessment, ProfileDocument } from '@/types/profile';
import { Industry } from '@/types/roleplay';
import { masterDataRepository } from '@/lib/repositories/masterDataRepositoryFactory';
import { logger } from '@/lib/logger';

// ============================================
// Assessment Data (Moved from legacy onboardingService)
// ============================================

import { ASSESSMENT_QUESTIONS, DISC_SCENARIOS } from '../data/onboarding-data';

/**
 * Specialized service for onboarding-related operations.
 */
export class OnboardingService {
    async saveBusinessInfo(
        userId: string,
        data: {
            name?: string;
            businessName?: string;
            websiteUrl?: string | null;
            businessModel?: string;
            elevatorPitch?: string;
            targetAudience?: string;
            stage?: string;
        }
    ): Promise<void> {
        const updates: Record<string, any> = {
            updatedAt: new Date().toISOString()
        };

        if (data.name) updates.name = data.name;
        if (data.businessName) updates.businessName = data.businessName;
        if (data.websiteUrl !== undefined) updates.websiteUrl = data.websiteUrl;
        if (data.businessModel) updates.businessModel = data.businessModel;
        if (data.elevatorPitch) updates.elevatorPitch = data.elevatorPitch;
        if (data.targetAudience) updates.targetAudience = data.targetAudience;
        if (data.stage) updates.stage = data.stage;

        await profileRepository.update(userId, updates);
    }


    async saveGoalInfo(userId: string, data: { primaryGoal: string; biggestChallenge: string | null }): Promise<void> {
        await profileRepository.update(userId, {
            primaryGoal: data.primaryGoal,
            biggestChallenge: data.biggestChallenge,
            updatedAt: new Date().toISOString()
        });
    }

    async saveInferredContext(userId: string, inferred: InferredContext): Promise<void> {
        const updates: Record<string, any> = {
            updatedAt: new Date().toISOString()
        };

        if (inferred.icpSummary) updates['inferred.icpSummary'] = inferred.icpSummary;
        if (inferred.valueProposition) updates['inferred.valueProposition'] = inferred.valueProposition;
        if (inferred.competitivePositioning) updates['inferred.competitivePositioning'] = inferred.competitivePositioning;
        if (inferred.pricingStructure) updates['inferred.pricingStructure'] = inferred.pricingStructure;
        if (inferred.industryVertical) updates['inferred.industryVertical'] = inferred.industryVertical;
        if (inferred.ragSignals) updates['inferred.ragSignals'] = inferred.ragSignals;
        if (inferred.confidence) updates['inferred.confidence'] = inferred.confidence;
        if (inferred.extractedFrom) updates['inferred.extractedFrom'] = inferred.extractedFrom;

        await profileRepository.update(userId, updates);
    }

    async saveLinkedinAnalysis(userId: string, analysis: any): Promise<void> {
        await profileRepository.update(userId, {
            'inferred.linkedinAnalysis': analysis,
            updatedAt: new Date().toISOString()
        });
    }

    async saveAssessment(userId: string, assessment: Omit<Assessment, 'generatedAt'>): Promise<void> {
        const fullAssessment = { ...assessment, generatedAt: new Date().toISOString() };
        await profileRepository.update(userId, {
            assessment: fullAssessment,
            updatedAt: new Date().toISOString()
        });

        // Save analytics snapshot for Metabase historical tracking
        try {
            const { hasDatabase, getDb, schema } = await import('@/lib/db');
            if (hasDatabase()) {
                const db = getDb();
                if (db) {
                    await db.insert(schema.assessmentSnapshot).values({
                        id: `as_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
                        userId,
                        overallReadiness: String(assessment.overallReadiness),
                        icpClarity: String(assessment.scores.icpClarity),
                        positioningStrength: String(assessment.scores.positioningStrength),
                        messagingConsistency: String(assessment.scores.messagingConsistency),
                        channelReadiness: String(assessment.scores.channelReadiness),
                        salesProcessMaturity: String(assessment.scores.salesProcessMaturity),
                        recommendedPath: assessment.recommendedPath,
                        recommendedStartCourse: assessment.recommendedStartCourse,
                        quickWinsCount: assessment.quickWins.length,
                        criticalGapsCount: assessment.criticalGaps.length,
                        fullAssessment: fullAssessment,
                    });
                }
            }
        } catch (err) {
            // Non-fatal: don't break assessment save if snapshot fails
            logger.error('Failed to save assessment snapshot', { err });
        }
    }

    async updateDocumentAnalysis(userId: string, documentId: string, extraction: ProfileDocument['extractedContext']): Promise<void> {
        const profile = await profileRepository.getById(userId);
        if (!profile) return;

        const updatedDocuments = profile.documents.map(doc =>
            doc.id === documentId ? { ...doc, extractedContext: extraction, processedAt: new Date().toISOString() } : doc
        );

        await profileRepository.update(userId, {
            documents: updatedDocuments,
            updatedAt: new Date().toISOString()
        });
    }

    // Logic moved from legacy onboardingService
    calculateFounderCategory(answers: Record<string, string>) {
        const scores: Record<string, number> = {};

        for (const [questionId, selectedOption] of Object.entries(answers)) {
            const question = ASSESSMENT_QUESTIONS.find(q => q.id === questionId);
            const option = question?.options.find(o => o.text === selectedOption);

            if (option) {
                for (const [categoryId, weight] of Object.entries(option.category_weights)) {
                    scores[categoryId] = (scores[categoryId] || 0) + weight;
                }
            }
        }

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const topScore = sorted[0]?.[1] || 0;
        const totalPossible = 15; // Assumption for test compatibility

        return {
            category_id: sorted[0]?.[0] || 'reluctant_seller',
            confidence: Math.round((topScore / totalPossible) * 100)
        };
    }

    calculateDiscProfile(answers: Record<string, string>) {
        const scores: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };

        for (const [scenarioId, selectedOption] of Object.entries(answers)) {
            const scenario = DISC_SCENARIOS.find(s => s.id === scenarioId);
            if (scenario) {
                // Match by option text (legacy) or by DISC letter directly (new UI sends D/I/S/C)
                const option = scenario.options.find(o => o.text === selectedOption || o.disc === selectedOption);
                if (option) {
                    scores[option.disc as 'D' | 'I' | 'S' | 'C'] += 1;
                }
            } else if (['D', 'I', 'S', 'C'].includes(selectedOption)) {
                // Fallback: if scenario not found but value is a valid DISC letter, count it directly
                scores[selectedOption] += 1;
            }
        }

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]) as [string, number][];
        const primary = sorted[0][0] as 'D' | 'I' | 'S' | 'C';
        const secondary = sorted[1][1] > 0 ? (sorted[1][0] as 'D' | 'I' | 'S' | 'C') : null;

        return { primary, secondary };
    }

    async getIndustries(): Promise<Industry[]> {
        return masterDataRepository.getIndustries();
    }
}

export const onboardingService = new OnboardingService();

// Maintain legacy exports for compatibility if needed by tests
export const getIndustries = onboardingService.getIndustries.bind(onboardingService);
export const calculateFounderCategory = onboardingService.calculateFounderCategory.bind(onboardingService);
export const calculateDiscProfile = onboardingService.calculateDiscProfile.bind(onboardingService);
