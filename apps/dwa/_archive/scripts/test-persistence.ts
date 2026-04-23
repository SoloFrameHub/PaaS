import { profileService } from '../lib/services/profileService';
import fs from 'fs';

async function testPersistence() {
    console.log('🧪 Starting Logic & Persistence Tests...');

    const userId = 'test-user-' + Date.now();
    const email = 'test@example.com';

    // Test 1: Profile Creation & Migration
    console.log('1. Testing Profile Creation...');
    const profile = await profileService.getOrCreateProfile(userId, email);
    if (profile.userId === userId && profile.profileVersion === 2) {
        console.log('✅ Profile created and migrated to v2');
    } else {
        console.error('❌ Profile creation/migration failed', profile);
    }

    // Test 2: Progress Update Persistence
    console.log('2. Testing Progress Updates...');
    await profileService.updateProgress(userId, { xpEarned: 50, currentCourse: 1 });
    const updatedProfile = await profileService.getProfile(userId);
    if (updatedProfile?.progress.xpTotal === 50 && updatedProfile.progress.currentCourse === 1) {
        console.log('✅ Progress updates persisted in mock mode');
    } else {
        console.error('❌ Progress update persistence failed', updatedProfile?.progress);
    }

    // Test 3: Artifact Versioning
    console.log('3. Testing Artifact Versioning...');
    const artifactContent = 'Test positioning statement';
    await profileService.saveArtifact(userId, 'positioningStatement', artifactContent, 1);
    const artifactProfile = await profileService.getProfile(userId);
    const artifact = artifactProfile?.artifacts.positioningStatement;
    if (artifact?.content === artifactContent && artifact.version === 1) {
        console.log('✅ Artifact saved with version 1');
    } else {
        console.error('❌ Artifact save failed', artifact);
    }

    // Test 4: Atomicity Simulation (Dot Notation)
    console.log('4. Testing Dot Notation Updates...');
    await profileService.updateProfile(userId, { 'progress.currentCourse': 2 });
    const atomicProfile = await profileService.getProfile(userId);
    if (atomicProfile?.progress.currentCourse === 2 && atomicProfile.progress.xpTotal === 50) {
        console.log('✅ Dot notation update succeeded without data loss');
    } else {
        console.error('❌ Dot notation update failed or caused data loss', atomicProfile?.progress);
    }

    console.log('🏁 Persistence tests complete.');
}

testPersistence().catch(console.error);
