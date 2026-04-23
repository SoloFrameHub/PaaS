
import { profileService } from '../lib/services/profileService';
import { InferredContext } from '../types/profile';

async function testConcurrency() {
    console.log('🧪 Starting Concurrency Test...');
    const userId = 'test-integrity-user';
    const email = 'integrity@test.com';

    // 1. Setup profile
    await profileService.getOrCreateProfile(userId, email);

    // 2. Simulate 3 parallel updates that touch different parts of the same nested object
    console.log('🔄 Running 3 parallel atomic updates...');
    await Promise.all([
        profileService.saveInferredContext(userId, {
            icpSummary: 'ICP Updated'
        } as InferredContext),
        profileService.updateProfile(userId, {
            'inferred.valueProposition': 'Value Prop Updated'
        }),
        profileService.saveLinkedinAnalysis(userId, {
            professionalBio: 'LinkedIn Bio Updated',
            experienceHighlights: [],
            skills: [],
            authorityIndicators: [],
            perceivedExpertise: null,
            audienceFit: null,
            analyzedAt: null
        })
    ]);

    // 3. Verify
    const finalProfile = await profileService.getProfile(userId);
    console.log('📊 Verification Results:');
    console.log('- ICP Summary:', finalProfile?.inferred.icpSummary === 'ICP Updated' ? '✅ PASS' : '❌ FAIL');
    console.log('- Value Prop:', finalProfile?.inferred.valueProposition === 'Value Prop Updated' ? '✅ PASS' : '❌ FAIL');
    console.log('- LinkedIn Bio:', finalProfile?.inferred.linkedinAnalysis?.professionalBio === 'LinkedIn Bio Updated' ? '✅ PASS' : '❌ FAIL');

    if (finalProfile?.inferred.icpSummary === 'ICP Updated' &&
        finalProfile?.inferred.valueProposition === 'Value Prop Updated' &&
        finalProfile?.inferred.linkedinAnalysis?.professionalBio === 'LinkedIn Bio Updated') {
        console.log('\n✨ CONCURRENCY TEST PASSED: All atomic updates preserved.');
    } else {
        console.error('\n💥 CONCURRENCY TEST FAILED: Data was overwritten.');
    }
}

async function run() {
    try {
        await testConcurrency();
    } catch (err) {
        console.error('Test script failed:', err);
    }
}

run();
