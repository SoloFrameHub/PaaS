#!/usr/bin/env node

/**
 * Script to update all E2E test files to use signInWithCompletedOnboarding
 * This replaces the manual sign-in code in beforeEach hooks
 */

const fs = require('fs');
const path = require('path');

const testFiles = [
    'e2e/dashboard.spec.ts',
    'e2e/roleplay.spec.ts',
    'e2e/error-handling-and-accessibility.spec.ts',
    'e2e/tools-and-community.spec.ts',
];

const oldSignInPattern = /await page\.goto\('\/signin'\);\s*await page\.locator\('input\[type="email"\]'\)\.fill\('test@example\.com'\);\s*await page\.locator\('input\[type="password"\]'\)\.fill\('password123'\);\s*await page\.getByRole\('button', \{ name: \/sign in\/i \}\)\.click\(\);\s*await page\.waitForURL\(\/\\\\\/(dashboard\|onboarding)\/\);/g;

const newSignIn = 'await signInWithCompletedOnboarding(page);';

const importStatement = "import { signInWithCompletedOnboarding } from './helpers';";

testFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Add import if not present
    if (!content.includes('signInWithCompletedOnboarding')) {
        // Add after the first import line
        content = content.replace(
            /(import .* from '@playwright\/test';)/,
            `$1\n${importStatement}`
        );
        modified = true;
        console.log(`✅ Added import to ${filePath}`);
    }

    // Replace old sign-in pattern
    const matches = content.match(oldSignInPattern);
    if (matches) {
        content = content.replace(oldSignInPattern, newSignIn);
        modified = true;
        console.log(`✅ Updated ${matches.length} sign-in calls in ${filePath}`);
    }

    // Also handle variations with comments
    const variations = [
        {
            pattern: /\/\/ Sign in\s*await page\.goto\('\/signin'\);\s*await page\.locator\('input\[type="email"\]'\)\.fill\('test@example\.com'\);\s*await page\.locator\('input\[type="password"\]'\)\.fill\('password123'\);\s*await page\.getByRole\('button', \{ name: \/sign in\/i \}\)\.click\(\);\s*await page\.waitForURL\(\/\\\\\/(dashboard\|onboarding)\/\);/g,
            replacement: '// Sign in with completed onboarding\n        await signInWithCompletedOnboarding(page);'
        },
        {
            pattern: /\/\/ Sign in and complete onboarding\s*await page\.goto\('\/signin'\);\s*await page\.locator\('input\[type="email"\]'\)\.fill\('test@example\.com'\);\s*await page\.locator\('input\[type="password"\]'\)\.fill\('password123'\);\s*await page\.getByRole\('button', \{ name: \/sign in\/i \}\)\.click\(\);\s*await page\.waitForURL\(\/\\\\\/(dashboard\|onboarding)\/\);/g,
            replacement: '// Sign in with completed onboarding\n        await signInWithCompletedOnboarding(page);'
        }
    ];

    variations.forEach(({ pattern, replacement }) => {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`💾 Saved changes to ${filePath}`);
    } else {
        console.log(`ℹ️  No changes needed for ${filePath}`);
    }
});

console.log('\n✅ All test files updated!');
console.log('\nNext steps:');
console.log('1. Review the changes');
console.log('2. Run tests: npm run test:e2e');
