# Plan: Fix E2E test failures caused by App Router migration

The recent migration to Next.js App Router has introduced route groups and structure changes that broke several E2E tests. This plan details the updates required to align the test suite with the current routing structure.

## Proposed Changes

### E2E Tests

#### [MODIFY] [tools-and-community.spec.ts](file:///Volumes/ext-data/github/soloframehub-v2/e2e/tools-and-community.spec.ts)
- Update navigation calls for ICP Builder to use the correct path.
- Update Community feature tests to hit specific endpoints (`/community/feed`, `/community/forum`) instead of the now-404 `/community` root.
- Fix selector mismatches caused by URL changes.

#### [MODIFY] [courses.spec.ts](file:///Volumes/ext-data/github/soloframehub-v2/e2e/courses.spec.ts)
- Verify and update academy URLs if necessary.
- Ensure lesson navigation patterns (`/academy/:courseId/:lessonId`) are correctly handled.

#### [MODIFY] [roleplay.spec.ts](file:///Volumes/ext-data/github/soloframehub-v2/e2e/roleplay.spec.ts)
- Update entry point to `/roleplay`.

#### [MODIFY] [dashboard.spec.ts](file:///Volumes/ext-data/github/soloframehub-v2/e2e/dashboard.spec.ts)
- Update any navigation verification that relies on redirected homepages.

## Verification Plan

### Automated Tests
- Run `npx playwright test e2e/tools-and-community.spec.ts`
- Run `npx playwright test e2e/courses.spec.ts`
- Run `npx playwright test e2e/roleplay.spec.ts`
- Run `npx playwright test e2e/dashboard.spec.ts`
- Execute full foundational suite cross-check: `npx playwright test e2e/auth.spec.ts e2e/onboarding.spec.ts`

### Manual Verification
- Manually click through the updated routes in the browser to ensure no silent redirects are obfuscated by the tests.
