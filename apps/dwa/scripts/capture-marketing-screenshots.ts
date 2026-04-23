/**
 * Capture marketing screenshots for the "For Practices" page
 *
 * Run with: npx tsx scripts/capture-marketing-screenshots.ts
 *
 * Prerequisites:
 * - App running locally (npm run dev)
 * - Test provider account created
 * - Test patient accounts with sample data
 */

import { chromium } from '@playwright/test'
import { join } from 'path'

const SCREENSHOT_DIR = join(process.cwd(), 'public/images/practices')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

// Test credentials (mock auth enabled in .env.local)
const PROVIDER_EMAIL = process.env.PROVIDER_EMAIL || 'provider@test.com'
const PROVIDER_PASSWORD = process.env.PROVIDER_PASSWORD || 'test123'
const STUDENT_EMAIL = 'student@test.com'
const STUDENT_PASSWORD = 'test123'

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  })
  const page = await context.newPage()

  try {
    // Sign in first
    console.log('🔐 Signing in as provider...')
    await page.goto(`${BASE_URL}/signin`)
    await page.fill('input[type="email"]', PROVIDER_EMAIL)
    await page.fill('input[type="password"]', PROVIDER_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)

    // Navigate past any onboarding if present
    const currentUrl = page.url()
    if (currentUrl.includes('onboarding') || currentUrl.includes('signup')) {
      console.log('⏭️  Skipping onboarding/setup...')
      await page.goto(`${BASE_URL}/provider/dashboard`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)
    }

    // 1. Provider Dashboard - navigate directly
    console.log('📸 Capturing provider dashboard...')
    await page.goto(`${BASE_URL}/provider/dashboard`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000) // Let animations settle and content load
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '01-provider-dashboard.png'),
      fullPage: false,
    })

    // 2. Provider Patients List (with roster)
    console.log('📸 Capturing provider patients roster...')
    await page.goto(`${BASE_URL}/provider/patients`)
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '02-provider-patients.png'),
      fullPage: false,
    })

    // 3. Distress Alerts
    console.log('📸 Capturing distress alerts...')
    await page.goto(`${BASE_URL}/provider/alerts`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '03-distress-alerts.png'),
      fullPage: false,
    })

    // 4. Individual Patient Detail (if exists)
    console.log('📸 Capturing patient detail page...')
    // Try to click on first patient in roster
    await page.goto(`${BASE_URL}/provider/patients`)
    await page.waitForTimeout(500)
    const firstPatientLink = await page.locator('a[href*="/provider/patients/"]').first()
    if (await firstPatientLink.count() > 0) {
      await firstPatientLink.click()
      await page.waitForTimeout(1000)
      await page.screenshot({
        path: join(SCREENSHOT_DIR, '04-patient-detail.png'),
        fullPage: false,
      })
    }

    // 5. Provider Resources/RAG
    console.log('📸 Capturing provider resources...')
    await page.goto(`${BASE_URL}/provider/resources`)
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '05-provider-resources.png'),
      fullPage: false,
    })

    // 6. Student Dashboard (Two-School Architecture)
    console.log('📸 Capturing student dashboard...')
    // Navigate directly (already authenticated)
    await page.goto(`${BASE_URL}/dashboard`)
    await page.waitForTimeout(2000)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '06-student-dashboard.png'),
      fullPage: false,
    })

    // 7. Interactive Lesson Example
    console.log('📸 Capturing interactive lesson...')
    // Navigate to a course page (which shows interactive components)
    await page.goto(`${BASE_URL}/academy/anxiety-management`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000)
    // Scroll down a bit to show lesson content/interactive elements
    await page.evaluate(() => window.scrollBy(0, 400))
    await page.waitForTimeout(500)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '07-interactive-lesson.png'),
      fullPage: false,
    })

    // 8. AI Coach Interface
    console.log('📸 Capturing AI coach...')
    await page.goto(`${BASE_URL}/coach`)
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '08-ai-coach.png'),
      fullPage: false,
    })

    // 9. Course Catalog (Two Schools)
    console.log('📸 Capturing course catalog...')
    await page.goto(`${BASE_URL}/courses`)
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '09-course-catalog.png'),
      fullPage: false,
    })

    // 10. Analytics Page - use provider's patient analytics view
    console.log('📸 Capturing analytics...')
    // Go back to provider context and capture patient analytics from provider dashboard
    await page.goto(`${BASE_URL}/provider/patients`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000)
    // Scroll to show any charts/metrics if present
    await page.evaluate(() => window.scrollBy(0, 300))
    await page.waitForTimeout(500)
    await page.screenshot({
      path: join(SCREENSHOT_DIR, '10-analytics.png'),
      fullPage: false,
    })

    console.log('✅ All screenshots captured successfully!')
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`)
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error)
    throw error
  } finally {
    await browser.close()
  }
}

// Run if called directly
if (require.main === module) {
  captureScreenshots().catch((error) => {
    console.error('Failed to capture screenshots:', error)
    process.exit(1)
  })
}

export { captureScreenshots }
