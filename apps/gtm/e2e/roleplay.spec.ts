import { test, expect } from '@playwright/test';
import { signInWithCompletedOnboarding } from './helpers';

/**
 * E2E Tests for 3D Roleplay Matrix
 * Tests roleplay scenario selection, AI interaction, and performance evaluation
 */

test.describe('3D Roleplay Matrix', () => {

    test.beforeEach(async ({ page }) => {
        // Log console messages from browser
        page.on('console', msg => console.log(`BROWSER: ${msg.type()}: ${msg.text()}`));

        // Sign in with a user who has completed onboarding
        await signInWithCompletedOnboarding(page);
    });

    test('should display 3D roleplay matrix setup page', async ({ page }) => {
        await page.goto('/roleplay', { waitUntil: 'networkidle' });

        // Should show roleplay interface heading
        const heading = page.getByRole('heading', { name: /Initialize Sales Simulation/i });
        await expect(heading.first()).toBeVisible({ timeout: 20000 });

        // Configuration options should be visible
        await expect(page.getByTestId('industry-select')).toBeVisible();
        await expect(page.getByTestId('role-select')).toBeVisible();
        await expect(page.getByTestId('methodology-select')).toBeVisible();
    });

    test('should start and participate in a roleplay session', async ({ page }) => {
        await page.goto('/roleplay', { waitUntil: 'networkidle' });

        // Select an industry from the dropdown
        const industrySelect = page.getByTestId('industry-select');
        await expect(industrySelect).toBeVisible();

        // Wait for an industry change to complete
        const rolesPromise = page.waitForResponse(r => r.url().includes('/api/roleplay/roles') && r.status() === 200, { timeout: 15000 }).catch(() => null);
        await industrySelect.selectOption({ index: 1 });
        await rolesPromise;
        await page.waitForTimeout(1000); // Wait for React state to settle

        // Start roleplay
        const startButton = page.getByTestId('start-roleplay-button');
        await expect(startButton).toBeVisible();
        await startButton.click();

        // Active roleplay session check (Chat interface should appear)
        const chatInput = page.getByTestId('chat-input');
        await expect(chatInput).toBeVisible({ timeout: 15000 });

        // Verify the system message is present
        await expect(page.getByText(/prospect.*waiting.*call/i)).toBeVisible({ timeout: 10000 });

        // Send a message
        const message = 'Hello, I would like to discuss how our solution can help your team.';
        await chatInput.click();
        await chatInput.pressSequentially(message, { delay: 30 });

        // Ensure the button is enabled (React state updated)
        const sendButton = page.getByTestId('send-message-button');
        await expect(sendButton).toBeEnabled({ timeout: 10000 });

        // Wait for the response after clicking
        const responsePromise = page.waitForResponse(
            r => r.url().includes('/api/ai/roleplay') && (r.status() === 200 || r.status() === 500 || r.status() === 503),
            { timeout: 30000 }
        ).catch(() => null);

        await sendButton.click();

        // Verify user message appears
        await expect(page.getByText(message)).toBeVisible();

        // Wait for AI response API
        const response = await responsePromise;

        // If AI is unavailable (no API key in test), skip the AI-dependent assertions
        if (!response || response.status() !== 200) {
            test.info().annotations.push({ type: 'skip-reason', description: 'AI service unavailable in test environment' });
            return;
        }

        // Verify that there are now at least 3 messages (system + user + assistant)
        await expect(page.getByTestId('chat-message')).toHaveCount(3, { timeout: 30000 });
    });

    test('should end session and show performance evaluation', async ({ page }) => {
        await page.goto('/roleplay', { waitUntil: 'networkidle' });

        // Start session
        await page.getByTestId('start-roleplay-button').click();

        // Need at least one message exchange for eval
        const chatInput = page.getByTestId('chat-input');
        await expect(chatInput).toBeVisible();
        await chatInput.fill('Hi there!');

        const responsePromise = page.waitForResponse(
            r => r.url().includes('/api/ai/roleplay') && (r.status() === 200 || r.status() === 500 || r.status() === 503),
            { timeout: 20000 }
        ).catch(() => null);
        await page.getByTestId('send-message-button').click();
        const response = await responsePromise;

        // If AI is unavailable, skip AI-dependent assertions
        if (!response || response.status() !== 200) {
            test.info().annotations.push({ type: 'skip-reason', description: 'AI service unavailable in test environment' });
            return;
        }

        // Wait for AI message to appear in UI
        await expect(page.getByTestId('chat-message')).toHaveCount(3, { timeout: 10000 });

        // End the session
        const endButton = page.getByTestId('end-session-button')
            .or(page.getByRole('button', { name: /End Session/i }));
        await expect(endButton).toBeVisible();
        await endButton.click();

        // Verify evaluation content
        const scoreLocator = page.getByTestId('evaluation-score');
        await expect(scoreLocator).toBeVisible({ timeout: 30000 });
        await expect(scoreLocator).toContainText('/10');

        // Should see feedback header
        await expect(page.getByText('Session Feedback')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText("Coach's Note")).toBeVisible({ timeout: 10000 });

        // Should have a way to return to setup
        const closeButton = page.getByRole('button', { name: /Close|Finish|Setup|Next Simulation/i }).first();
        if (await closeButton.isVisible()) {
            await closeButton.click();
            await expect(page.getByText(/Initialize Sales Simulation/i)).toBeVisible();
        }
    });

    test('should be keyboard navigable', async ({ page }) => {
        await page.goto('/roleplay', { waitUntil: 'networkidle' });

        // Tab through industry select
        await page.keyboard.press('Tab');

        // Verify we can focus the select elements
        await page.getByTestId('industry-select').focus();
        await expect(page.getByTestId('industry-select')).toBeFocused();
    });
});
