import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Testing Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './e2e',

    /* Run tests in files in parallel */
    fullyParallel: false,

    /* Fail the build on CI if you accidentally left test.only in the source code */
    forbidOnly: !!process.env.CI,

    /* Retry on first failure */
    retries: 2,

    /* Opt out of parallel tests to avoid race conditions with mock storage */
    workers: 1,

    /* Reporter to use */
    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'playwright-report/results.json' }],
        ['list']
    ],

    /* Shared settings for all the projects below */
    use: {
        /* Base URL to use in actions like `await page.goto('/')` */
        baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test */
        trace: 'on-first-retry',

        /* Screenshot on failure */
        screenshot: 'only-on-failure',

        /* Video on failure */
        video: 'retain-on-failure',

        /* Increased timeouts for slower operations */
        actionTimeout: 15000,
        navigationTimeout: 60000,
    },

    /* Global timeout for each test */
    timeout: 90000,

    /* Expect timeout */
    expect: {
        timeout: 10000,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        // Disable other browsers for faster testing during development
        // Uncomment for full cross-browser testing
        /*
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
        */
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        env: {
            // Enable mock authentication for E2E tests
            NEXT_PUBLIC_MOCK_AUTH: 'true',
            // Bypass subscription checks for E2E tests
            OPEN_ACCESS: 'true',
            // Suppress Redis connection warnings in tests
            REDIS_ENABLED: 'false',
            // Set to test environment
            NODE_ENV: 'test',
        },
        // Suppress Redis error logs
        stderr: 'pipe',
        stdout: 'pipe',
    },
});
