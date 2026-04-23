# Testing Guide

## Overview

SoloFrameHub v2 has a comprehensive testing strategy covering:
- **Unit Tests** - Testing individual functions and services
- **Component Tests** - Testing React components in isolation
- **Integration Tests** - Testing service interactions
- **E2E Tests** - Testing complete user journeys
- **Load Tests** - Performance and scalability testing

---

## Quick Start

```bash
# Run all unit tests
npm test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run all tests (unit + E2E)
npm run test:all
```

---

## Unit Testing (Vitest)

### Running Unit Tests

```bash
# Run in watch mode (development)
npm test

# Run once with coverage
npm run test:coverage

# Run specific test file
npx vitest run lib/services/profileService.test.ts

# Run tests matching pattern
npx vitest run --grep "ProfileService"
```

### Test Structure

Unit tests are located alongside the code they test:

```
lib/
  services/
    profileService.ts
    profileService.test.ts      # Unit tests
  utils.ts
  utils.test.ts                 # Unit tests
components/
  ui/
    logo.tsx
    logo.test.tsx               # Component tests
```

### Writing Unit Tests

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { myFunction } from './myModule';

describe('MyModule', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should do something specific', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle edge cases', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

### Component Testing

> **Note:** Component tests require the `jsdom` environment. Add `// @vitest-environment jsdom` to the top of your test file.

```typescript
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';

import { expect, test } from 'vitest';
import MyComponent from './MyComponent';

test('renders component correctly', () => {
  render(<MyComponent title="Test" />);
  
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('handles user interaction', async () => {
  const { user } = render(<MyComponent />);
  
  await user.click(screen.getByRole('button'));
  
  expect(screen.getByText('Clicked')).toBeInTheDocument();
});
```

### Coverage Reports

After running `npm run test:coverage`, view the report:

```bash
# Open HTML coverage report
open coverage/index.html
```

**Coverage Targets:**
- Overall: 80%+
- Services: 90%+
- Utilities: 90%+
- Components: 70%+
- API Routes: 80%+

---

## E2E Testing (Playwright)

### Running E2E Tests

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run in debug mode
npm run test:e2e:debug

# Run specific browser
npm run test:e2e:chromium

# Run specific test file
npx playwright test e2e/auth.spec.ts

# View test report
npm run test:e2e:report
```

### E2E Test Structure

```
e2e/
  auth.spec.ts          # Authentication flows
  onboarding.spec.ts    # Onboarding journey
  courses.spec.ts       # Course navigation & lessons
  roleplay.spec.ts      # 3D Roleplay Matrix
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should perform user action', async ({ page }) => {
    // Navigate
    await page.goto('/some-page');
    
    // Interact
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.getByRole('button', { name: /submit/i }).click();
    
    // Assert
    await expect(page).toHaveURL('/success');
    await expect(page.getByText('Success!')).toBeVisible();
  });
});
```

### E2E Best Practices

1. **Use data-testid attributes** for stable selectors:
   ```tsx
   <button data-testid="submit-button">Submit</button>
   ```

2. **Wait for navigation** after actions:
   ```typescript
   await page.getByRole('button').click();
   await page.waitForURL('/expected-url');
   ```

3. **Use role-based selectors** when possible:
   ```typescript
   await page.getByRole('button', { name: /submit/i });
   await page.getByRole('heading', { name: /title/i });
   ```

4. **Handle async operations**:
   ```typescript
   await page.waitForTimeout(1000); // Last resort
   await page.waitForSelector('[data-testid="loaded"]'); // Better
   await expect(element).toBeVisible({ timeout: 10000 }); // Best
   ```

### Debugging E2E Tests

```bash
# Run with debug mode
npm run test:e2e:debug

# Run with headed browser
npm run test:e2e:headed

# Generate trace on failure (automatic)
# View trace:
npx playwright show-trace trace.zip
```

### CI/CD Integration

E2E tests run automatically in CI:

```yaml
# .github/workflows/ci.yml
- name: Run E2E tests
  run: npm run test:e2e
  
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

---

## Integration Testing

Integration tests verify service interactions with external dependencies (Firestore, AI APIs).

### Running Integration Tests

```bash
# Run integration tests (requires Firebase credentials)
npx vitest run --grep "integration"
```

### Writing Integration Tests

```typescript
import { describe, it, expect } from 'vitest';
import { profileService } from './profileService';

describe('ProfileService Integration', () => {
  it('should create and retrieve profile from Firestore', async () => {
    const userId = 'test-user-' + Date.now();
    
    // Create profile
    await profileService.createProfile(userId, {
      name: 'Test User',
      email: 'test@example.com'
    });
    
    // Retrieve profile
    const profile = await profileService.getProfile(userId);
    
    expect(profile).toBeDefined();
    expect(profile.name).toBe('Test User');
    
    // Cleanup
    await profileService.deleteProfile(userId);
  });
});
```

---

## Mock Authentication for Testing

For local development and testing, mock authentication is available:

```bash
# .env.local
NEXT_PUBLIC_MOCK_AUTH=true
```

**Mock Credentials:**
- Email: `test@example.com`
- Password: `password123`

**Important:** Mock auth is automatically disabled in production.

---

## Test Data Management

### Using Test Fixtures

```typescript
// tests/fixtures/users.ts
export const testUsers = {
  basic: {
    email: 'test@example.com',
    name: 'Test User'
  },
  premium: {
    email: 'premium@example.com',
    name: 'Premium User'
  }
};

// In tests
import { testUsers } from '../fixtures/users';

test('should handle basic user', () => {
  const user = testUsers.basic;
  // ...
});
```

### Cleaning Up Test Data

```typescript
afterEach(async () => {
  // Clean up test data
  await db.collection('users').doc(testUserId).delete();
});
```

---

## Performance Testing

### Running Performance Tests

```bash
# Run performance benchmarks
npx vitest bench

# Profile specific functions
npx vitest run --reporter=verbose lib/utils.test.ts
```

### Writing Performance Tests

```typescript
import { bench, describe } from 'vitest';

describe('Performance', () => {
  bench('expensive operation', () => {
    // Code to benchmark
    expensiveFunction();
  });
});
```

---

## Continuous Integration

### GitHub Actions Workflow

Tests run automatically on:
- Push to `main` branch
- Pull requests
- Manual trigger

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Test Coverage Goals

| Category | Current | Target |
|----------|---------|--------|
| Overall | ~35% | 80%+ |
| Services | ~60% | 90%+ |
| Utilities | ~45% | 90%+ |
| Components | ~25% | 70%+ |
| API Routes | ~40% | 80%+ |

---

## Troubleshooting

### Common Issues

**1. Tests fail with "Cannot find module"**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

**2. E2E tests timeout**
```typescript
// Increase timeout
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ...
});
```

**3. Flaky E2E tests**
```typescript
// Add explicit waits
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible({ timeout: 10000 });
```

**4. Coverage not updating**
```bash
# Clear coverage cache
rm -rf coverage
npm run test:coverage
```

---

## Best Practices

### General Testing

1. **Write tests first** (TDD) when possible
2. **Test behavior, not implementation**
3. **Keep tests isolated** - no dependencies between tests
4. **Use descriptive test names** - `should do X when Y`
5. **Follow AAA pattern** - Arrange, Act, Assert

### Unit Tests

1. **Mock external dependencies** (Firestore, APIs)
2. **Test edge cases** (null, undefined, empty arrays)
3. **Test error handling**
4. **Keep tests fast** (< 100ms per test)

### E2E Tests

1. **Test critical user journeys** first
2. **Use stable selectors** (data-testid, roles)
3. **Avoid hard-coded waits** - use waitFor methods
4. **Test across browsers** (Chromium, Firefox, WebKit)
5. **Keep E2E tests focused** - one journey per test

### Component Tests

1. **Test user interactions** (clicks, typing)
2. **Test accessibility** (ARIA labels, keyboard navigation)
3. **Test responsive behavior**
4. **Mock API calls**

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Test Coverage Best Practices](https://martinfowler.com/bliki/TestCoverage.html)

---

## Getting Help

If you encounter issues:

1. Check this documentation
2. Review existing tests for examples
3. Check the test output for error messages
4. Run tests in debug mode
5. Ask the team in #engineering

---

**Last Updated:** January 2, 2026
