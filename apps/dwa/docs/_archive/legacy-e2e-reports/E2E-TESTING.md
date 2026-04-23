# E2E Testing Guide

## Overview

This document describes the End-to-End (E2E) testing strategy for SoloFrameHub using Playwright. Our E2E tests validate critical user journeys across the entire application stack.

## Current Test Coverage

### Test Files (4 files, 56 unique tests)
1. **`e2e/auth.spec.ts`** - Authentication & Session Management (11 tests)
2. **`e2e/onboarding.spec.ts`** - Onboarding Flow (12 tests)
3. **`e2e/courses.spec.ts`** - Course Navigation & Quizzes (17 tests)
4. **`e2e/roleplay.spec.ts`** - 3D Roleplay Matrix (16 tests)

**Total: 280 test executions** (56 tests × 5 browser configurations)

## Test Categories

### 1. Authentication Flow (`auth.spec.ts`)

#### Core Authentication
- ✅ Display signin page
- ✅ Display signup page
- ✅ Sign up with mock authentication
- ✅ Sign in with mock authentication
- ✅ Persist session after page reload
- ✅ Sign out successfully
- ✅ Protect authenticated routes

#### Validation & Error Handling
- ✅ Show validation errors for invalid email
- ✅ Handle signin errors gracefully

#### Session Management
- ✅ Handle expired sessions
- ✅ Maintain session across tabs

### 2. Onboarding Flow (`onboarding.spec.ts`)

#### Core Onboarding Journey
- ✅ Display onboarding welcome page
- ✅ Navigate through questionnaire
- ✅ Complete business information step
- ✅ Upload documents in context step
- ✅ Show analyzing page with progress
- ✅ Display assessment results
- ✅ Complete full onboarding flow

#### Onboarding Features
- ✅ Allow skipping optional steps
- ✅ Validate required fields
- ✅ Save progress and allow resuming

#### Navigation
- ✅ Show progress indicator
- ✅ Prevent skipping ahead to incomplete steps

### 3. Course Navigation & Learning (`courses.spec.ts`)

#### Course Discovery & Navigation
- ✅ Display course catalog
- ✅ Navigate to course detail page
- ✅ Display course sections and lessons
- ✅ Open lesson content
- ✅ Navigate between lessons
- ✅ Show lesson progress
- ✅ Display course sidebar navigation
- ✅ Search for courses or lessons

#### Quiz Functionality
- ✅ Display quiz at end of lesson
- ✅ Answer quiz questions
- ✅ Submit quiz and show results
- ✅ Allow retaking quiz

#### Progress Tracking
- ✅ Show overall course progress
- ✅ Mark lessons as complete
- ✅ Show completed lessons in sidebar

#### Responsive Design
- ✅ Work on mobile viewport
- ✅ Have mobile-friendly navigation

### 4. 3D Roleplay Matrix (`roleplay.spec.ts`)

#### Matrix Interaction
- ✅ Display 3D roleplay matrix page
- ✅ Display scenario configuration options
- ✅ Select roleplay scenario
- ✅ Start roleplay session

#### Roleplay Session
- ✅ Send message in roleplay chat
- ✅ Receive AI response
- ✅ Display conversation history
- ✅ End roleplay session
- ✅ Show roleplay feedback/scoring

#### Session Management
- ✅ View past roleplay sessions
- ✅ Replay past session
- ✅ Filter sessions by scenario type

#### Difficulty & Accessibility
- ✅ Select difficulty level
- ✅ Show difficulty-appropriate responses
- ✅ Be keyboard navigable
- ✅ Have proper ARIA labels

## Running E2E Tests

### Prerequisites

1. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

2. **Ensure environment is configured:**
   - `.env.local` with `NEXT_PUBLIC_MOCK_AUTH=true`
   - Redis is optional (tests should work without it)

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests for specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test e2e/auth.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Debug tests
npx playwright test --debug

# Generate test report
npx playwright show-report
```

### CI/CD Integration

E2E tests are configured to run in CI with:
- 2 retries on failure
- Single worker (sequential execution)
- HTML and JSON reports
- Screenshots and videos on failure

## Browser Coverage

Tests run on 5 browser configurations:
1. **Desktop Chrome** (Chromium)
2. **Desktop Firefox**
3. **Desktop Safari** (WebKit)
4. **Mobile Chrome** (Pixel 5)
5. **Mobile Safari** (iPhone 12)

## Test Configuration

### Timeouts
- Default test timeout: 30 seconds
- Navigation timeout: 30 seconds
- Action timeout: 10 seconds

### Retries
- CI: 2 retries
- Local: 0 retries

### Artifacts
- Screenshots: On failure only
- Videos: Retained on failure
- Traces: On first retry

## Known Issues & Limitations

### Current Issues

1. **Redis Connection Warnings**
   - Tests show Redis connection errors but should still pass
   - Redis is optional for E2E tests in mock mode
   - Consider adding Redis mock or disabling Redis in test environment

2. **Timeout Issues**
   - Some tests may timeout if UI elements take too long to load
   - Consider increasing timeouts for slower operations
   - May need to add explicit waits for dynamic content

3. **Mock Authentication**
   - Tests rely on `NEXT_PUBLIC_MOCK_AUTH=true`
   - Real Firebase authentication not tested in E2E
   - Consider adding separate E2E suite for production auth

### Limitations

1. **AI Interactions**
   - AI responses are mocked in E2E tests
   - Real AI flow testing requires integration tests
   - Consider adding AI integration test suite

2. **File Uploads**
   - Document upload tests use mock files
   - Real file processing not fully tested
   - Consider adding file upload integration tests

3. **Database State**
   - Tests assume clean state or mock data
   - No database seeding/cleanup between tests
   - Consider adding test data fixtures

## Writing New E2E Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
    test.beforeEach(async ({ page }) => {
        // Setup: Navigate to starting page
        await page.goto('/');
    });

    test('should do something', async ({ page }) => {
        // Arrange: Set up test conditions
        
        // Act: Perform user actions
        await page.click('button');
        
        // Assert: Verify expected outcomes
        await expect(page.locator('.result')).toBeVisible();
    });
});
```

### Best Practices

1. **Use Data Test IDs**
   ```typescript
   // Prefer data-testid over CSS selectors
   await page.locator('[data-testid="submit-button"]').click();
   ```

2. **Wait for Network Idle**
   ```typescript
   // Wait for page to fully load
   await page.waitForLoadState('networkidle');
   ```

3. **Use Explicit Waits**
   ```typescript
   // Wait for specific elements
   await page.waitForSelector('.loading', { state: 'hidden' });
   ```

4. **Test User Journeys, Not Implementation**
   ```typescript
   // Good: Test what user sees/does
   await page.getByRole('button', { name: 'Submit' }).click();
   
   // Bad: Test implementation details
   await page.locator('#form-submit-btn-id-123').click();
   ```

5. **Keep Tests Independent**
   - Each test should be able to run in isolation
   - Don't rely on test execution order
   - Clean up after each test if needed

## Additional Test Coverage Needed

### High Priority

1. **Profile Management**
   - View profile
   - Edit profile information
   - Update preferences
   - View progress dashboard

2. **Community Features**
   - View forum posts
   - Create new post
   - Comment on posts
   - Like/upvote content

3. **ICP Builder Tool**
   - Access ICP builder
   - Fill out ICP form
   - Generate ICP
   - Save/export ICP

4. **Settings & Preferences**
   - Access settings page
   - Update account settings
   - Change notification preferences
   - Manage billing (if applicable)

### Medium Priority

5. **Search Functionality**
   - Global search
   - Filter results
   - Navigate to search results

6. **Notifications**
   - View notifications
   - Mark as read
   - Notification preferences

7. **Error Handling**
   - 404 page
   - 500 error page
   - Network error handling
   - Offline mode

### Low Priority

8. **Accessibility**
   - Keyboard navigation across all pages
   - Screen reader compatibility
   - Focus management
   - ARIA labels verification

9. **Performance**
   - Page load times
   - Time to interactive
   - Largest contentful paint

## Troubleshooting

### Tests Failing Locally

1. **Check environment variables**
   ```bash
   # Ensure NEXT_PUBLIC_MOCK_AUTH is set
   echo $NEXT_PUBLIC_MOCK_AUTH
   ```

2. **Clear browser state**
   ```bash
   # Remove Playwright state
   rm -rf playwright/.auth
   ```

3. **Update browsers**
   ```bash
   npx playwright install --force
   ```

### Tests Timing Out

1. **Increase timeout**
   ```typescript
   test('slow test', async ({ page }) => {
       test.setTimeout(60000); // 60 seconds
   });
   ```

2. **Add explicit waits**
   ```typescript
   await page.waitForSelector('.element', { timeout: 10000 });
   ```

### Flaky Tests

1. **Add retry logic**
   ```typescript
   test.describe.configure({ retries: 2 });
   ```

2. **Use more stable selectors**
   ```typescript
   // Use role-based selectors
   await page.getByRole('button', { name: 'Submit' });
   ```

3. **Wait for network idle**
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

## Metrics & Goals

### Current Status
- ✅ 56 unique E2E tests
- ✅ 280 total test executions (5 browsers)
- ✅ 4 critical user journeys covered
- ⏳ ~50% pass rate (needs investigation)

### Goals
- 🎯 90%+ pass rate
- 🎯 15+ critical user journeys
- 🎯 <5 minute total execution time
- 🎯 Zero flaky tests

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)
