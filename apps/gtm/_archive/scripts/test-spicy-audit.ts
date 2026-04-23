/**
 * test-spicy-audit.ts
 * Verifies the "Strategic Auditor" persona in the Assessment Generator.
 * Specifically tests cross-source contradiction detection.
 */

import { generateAssessmentFlow } from '../lib/genkit/flows/assessmentGenerator';
import fs from 'fs';
import path from 'path';

// Load environment
function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
                process.env[key.trim()] = value;
            }
        });
    }
}
loadEnv();

async function testSpicyAudit() {
    console.log('🌶️  Starting Spicy Strategic Audit Verification...\n');

    const mockProfile = {
        name: 'John Founder',
        businessName: 'EnterpriseGuard',
        businessModel: 'b2b-saas',
        stage: '0-10k',
        primaryGoal: 'first-100',
        websiteUrl: 'https://enterpriseguard.ai',

        // CONTRADICTION 1: Questionnaire says SMB/Transactional, but RAG says Enterprise
        questionnaire: {
            industry: 'Retail',
            target_roles: ['Store Manager'],
            deal_size: 'transactional',
            urgency: 'low'
        },

        inferred: {
            icpSummary: 'High-ticket cybersecurity for Fintech CEOs',
            valueProposition: 'Direct integration with SWIFT for real-time fraud prevention',
            // CONTRADICTION 2: Pitch Deck (RAG) says $50k/yr, but pricingStructure says $29/mo
            pricingStructure: '$29/month per user self-serve',
            ragSignals: {
                aggregatedInsights: 'The pitch deck emphasizes a $50,000 annual license with heavy manual implementation.',
                valuePropSignals: ['SWIFT integration', 'Custom audit logs', 'Enterprise SLA'],
                icpSignals: ['Fintech CEOs', 'CISO', 'Compliance Officers']
            }
        }
    };

    console.log('🔄 Running Strategic Auditor Flow...');

    try {
        const response: any = await generateAssessmentFlow.run({ profile: mockProfile as any });
        const assessment = response.result || response.output || response;

        console.log('\n📊 Spicy Assessment Results:');
        console.log('----------------------------');
        console.log('Score (messagingConsistency):', assessment.scores.messagingConsistency);
        console.log('Score (icpClarity):', assessment.scores.icpClarity);
        console.log('\n📝 Personalized Insight (The Mismatch Check):');
        console.log(assessment.personalizedInsight);

        console.log('\n🚨 Critical Gaps:');
        assessment.criticalGaps.forEach((gap: any, i: number) => {
            console.log(`${i + 1}. [${gap.category}] ${gap.title}: ${gap.description}`);
        });

        // Verification logic
        const insightLower = assessment.personalizedInsight.toLowerCase();
        const detectedMismatch = insightLower.includes('questionnaire') &&
            (insightLower.includes('pitch deck') || insightLower.includes('rag') || insightLower.includes('document'));

        const detectedPricingFriction = insightLower.includes('pricing') || insightLower.includes('transactional') || insightLower.includes('$50,000');

        if (detectedMismatch && detectedPricingFriction) {
            console.log('\n✨ PASS: Spicy Auditor correctly identified the strategic contradictions.');
            process.exit(0);
        } else {
            console.warn('\n⚠️  FAIL: Auditor was too "supportive" or missed the contradictions.');
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ Flow Error:', error);
        process.exit(1);
    }
}

testSpicyAudit();
