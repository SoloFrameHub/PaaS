import { ragIndexerFlow } from '../lib/genkit/flows/ragIndexer';
import { generateAssessmentFlow } from '../lib/genkit/flows/assessmentGenerator';
import { quizReflectionFlow } from '../lib/genkit/flows/quizReflection';
import type { FounderProfile } from '../types/profile';

async function testRagFlows() {
    console.log('🚀 Starting RAG-Awareness Logic Verification...\n');

    const getOutput = (res: any) => {
        // Genkit flows can return the result in .result, .output, or directly
        return res.result || res.output || res;
    };

    // 1. Test RAG Indexer & Signal Extraction
    console.log('--- Test 1: RAG Signal Extraction ---');
    const mockDocs = [{
        id: 'doc1',
        name: 'strategy.md',
        content: 'Our core focus is selling high-ticket enterprise AI security software specifically to Chief Information Security Officers (CISOs) in the Fintech industry. Our unique differentiator is our direct integration with the Plaid API for automated security auditing.'
    }];

    try {
        const response = await ragIndexerFlow.run({
            documents: mockDocs,
            businessModel: 'b2b-saas'
        }) as any;

        const signals = getOutput(response);

        console.log('✅ Signals Extracted:', JSON.stringify(signals, null, 2));
        const hasFintech = signals.icpSignals?.some((s: string) => s.toLowerCase().includes('fintech'));
        const hasPlaid = signals.valuePropSignals?.some((s: string) => s.toLowerCase().includes('plaid'));

        if (hasFintech && hasPlaid) {
            console.log('✨ PASS: High-density signals correctly extracted.\n');
        } else {
            console.warn('⚠️ FAIL: Expected signals (Fintech/Plaid) missing.\n');
        }

        // 2. Test Assessment Generator Unification
        console.log('--- Test 2: Assessment Generator Unification ---');
        const assessmentResponse = await generateAssessmentFlow.run({
            profile: {
                name: 'Test Founder',
                businessName: 'FinSecure AI',
                businessModel: 'b2b-saas',
                inferred: {
                    ragSignals: signals
                } as any
            }
        }) as any;

        const assessment = getOutput(assessmentResponse);
        console.log('📊 Assessment Summary:', assessment.personalizedInsight);

        const insightText = assessment.personalizedInsight || '';
        const mentionsFintech = insightText.toLowerCase().includes('fintech') ||
            insightText.toLowerCase().includes('enterprise') ||
            insightText.toLowerCase().includes('security');

        if (mentionsFintech) {
            console.log('✨ PASS: Assessment correctly incorporated RAG signals into the strategy.\n');
        } else {
            console.warn('⚠️ FAIL: Assessment ignored the specific RAG context.\n');
        }

        // 3. Test Contradiction in Quiz Reflection
        console.log('--- Test 3: Quiz Reflection Contradiction (RAG-Awareness) ---');
        const reflectionResponse = await quizReflectionFlow.run({
            reflection: "I am building a cheap, mass-market consumer app for teenagers to share photos.",
            aiPrompt: "Evaluate if the student is focused on their core ICP and value prop.",
            founderContext: {
                industry: 'Fintech',
                ragSignals: signals
            }
        }) as any;

        const reflectionResult = getOutput(reflectionResponse);
        console.log('📝 Reflection Feedback:', reflectionResult.feedback);

        const feedbackText = reflectionResult.feedback || '';
        const detectsContradiction = feedbackText.toLowerCase().includes('contradict') ||
            feedbackText.toLowerCase().includes('enterprise') ||
            feedbackText.toLowerCase().includes('fintech') ||
            feedbackText.toLowerCase().includes('b2b');

        if (detectsContradiction) {
            console.log('✨ PASS: AI detected the contradiction between consumer pitch and enterprise RAG context.\n');
        } else {
            console.warn('⚠️ FAIL: AI did not flag the mismatch between reflection and RAG data.\n');
        }

    } catch (error) {
        console.error('❌ Flow Execution Error:', error);
    }
}

testRagFlows().catch(console.error);
