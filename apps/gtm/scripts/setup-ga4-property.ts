/**
 * GA4 Property Configuration Script
 *
 * One-time setup script that configures the GA4 property via the Admin API:
 * - Custom dimensions (event + user scoped)
 * - Custom metrics
 * - Key events (conversions)
 * - Audiences
 * - Data retention (14 months)
 * - Search Console link
 *
 * Prerequisites:
 *   1. npm install --save-dev @google-analytics/admin
 *   2. Set GOOGLE_APPLICATION_CREDENTIALS=scripts/ga4-service-account.json
 *   3. Set GA4_PROPERTY_ID=<numeric property ID>
 *   4. Service account must have Editor role on the GA4 property
 *
 * Usage:
 *   npx tsx scripts/setup-ga4-property.ts
 */

import { AnalyticsAdminServiceClient } from '@google-analytics/admin';

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
if (!PROPERTY_ID) {
  console.error('❌ GA4_PROPERTY_ID env var is required (numeric ID, not G- measurement ID)');
  process.exit(1);
}

const PROPERTY_NAME = `properties/${PROPERTY_ID}`;
const client = new AnalyticsAdminServiceClient();

// ─── Helpers ──────────────────────────────────────────────────────────

function log(emoji: string, msg: string) {
  console.log(`${emoji}  ${msg}`);
}

async function safeCreate<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    const result = await fn();
    log('✅', label);
    return result;
  } catch (err: any) {
    if (err.code === 6) {
      // ALREADY_EXISTS
      log('⏭️', `${label} (already exists)`);
      return null;
    }
    log('❌', `${label}: ${err.message}`);
    return null;
  }
}

// ─── 1. Custom Dimensions ─────────────────────────────────────────────

async function createCustomDimensions() {
  console.log('\n── Custom Dimensions ──');

  const eventDimensions = [
    { parameterName: 'content_type', displayName: 'Content Type', description: 'Type of content (lesson, quiz, roleplay, coaching, book, tool)' },
    { parameterName: 'course_id', displayName: 'Course ID', description: 'Academy course identifier' },
    { parameterName: 'lesson_id', displayName: 'Lesson ID', description: 'Academy lesson identifier' },
    { parameterName: 'onboarding_step', displayName: 'Onboarding Step', description: 'Current onboarding step name' },
    { parameterName: 'chapter_id', displayName: 'Chapter ID', description: 'Book chapter identifier' },
    { parameterName: 'industry', displayName: 'Roleplay Industry', description: 'Industry selected for roleplay' },
    { parameterName: 'role_type', displayName: 'Roleplay Role', description: 'Role type in roleplay session' },
    { parameterName: 'methodology', displayName: 'Roleplay Methodology', description: 'Sales methodology used in roleplay' },
  ];

  for (const dim of eventDimensions) {
    await safeCreate(`Event dimension: ${dim.displayName}`, () =>
      client.createCustomDimension({
        parent: PROPERTY_NAME,
        customDimension: {
          parameterName: dim.parameterName,
          displayName: dim.displayName,
          description: dim.description,
          scope: 'EVENT',
        },
      }) as any
    );
  }

  // User-scoped dimension
  await safeCreate('User dimension: User Type', () =>
    client.createCustomDimension({
      parent: PROPERTY_NAME,
      customDimension: {
        parameterName: 'user_type',
        displayName: 'User Type',
        description: 'Type of user (free, paid, trial)',
        scope: 'USER',
      },
    }) as any
  );
}

// ─── 2. Custom Metrics ────────────────────────────────────────────────

async function createCustomMetrics() {
  console.log('\n── Custom Metrics ──');

  const metrics = [
    { parameterName: 'quiz_score', displayName: 'Quiz Score', description: 'Score achieved on academy quiz', measurementUnit: 'STANDARD' },
    { parameterName: 'roleplay_score', displayName: 'Roleplay Score', description: 'Overall score from roleplay evaluation', measurementUnit: 'STANDARD' },
    { parameterName: 'session_duration', displayName: 'Session Duration', description: 'Duration of coaching/roleplay session in seconds', measurementUnit: 'SECONDS' },
    { parameterName: 'message_count', displayName: 'Message Count', description: 'Number of messages in coaching/roleplay session', measurementUnit: 'STANDARD' },
    { parameterName: 'fields_filled', displayName: 'Fields Filled', description: 'Number of fields completed in ICP builder', measurementUnit: 'STANDARD' },
  ];

  for (const metric of metrics) {
    await safeCreate(`Custom metric: ${metric.displayName}`, () =>
      client.createCustomMetric({
        parent: PROPERTY_NAME,
        customMetric: {
          parameterName: metric.parameterName,
          displayName: metric.displayName,
          description: metric.description,
          scope: 'EVENT',
          measurementUnit: metric.measurementUnit as any,
        },
      }) as any
    );
  }
}

// ─── 3. Key Events (Conversions) ──────────────────────────────────────

async function createKeyEvents() {
  console.log('\n── Key Events (Conversions) ──');

  const keyEvents = [
    { eventName: 'sign_up', counting: 'ONCE_PER_EVENT' },
    { eventName: 'purchase', counting: 'ONCE_PER_EVENT' },
    { eventName: 'lesson_completed', counting: 'ONCE_PER_EVENT' },
    { eventName: 'onboarding_completed', counting: 'ONCE_PER_EVENT' },
    { eventName: 'coaching_session_started', counting: 'ONCE_PER_EVENT' },
    { eventName: 'roleplay_completed', counting: 'ONCE_PER_EVENT' },
  ];

  for (const ke of keyEvents) {
    await safeCreate(`Key event: ${ke.eventName}`, () =>
      client.createKeyEvent({
        parent: PROPERTY_NAME,
        keyEvent: {
          eventName: ke.eventName,
          countingMethod: ke.counting as any,
        },
      }) as any
    );
  }
}

// ─── 4. Audiences ─────────────────────────────────────────────────────

async function createAudiences() {
  console.log('\n── Audiences ──');

  // GA4 API requires: andGroup > orGroup > eventFilter
  const makeEventFilter = (eventName: string, scope: string) => ({
    clauseType: 'INCLUDE',
    simpleFilter: {
      scope,
      filterExpression: {
        andGroup: {
          filterExpressions: [
            {
              orGroup: {
                filterExpressions: [
                  { eventFilter: { eventName } },
                ],
              },
            },
          ],
        },
      },
    },
  });

  const audiences = [
    {
      displayName: 'Book Readers',
      description: 'Users who have read at least one book chapter',
      membershipDurationDays: 90,
      filterClauses: [makeEventFilter('book_chapter_read', 'AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS')],
    },
    {
      displayName: 'Academy Users',
      description: 'Users who have completed at least one lesson',
      membershipDurationDays: 90,
      filterClauses: [makeEventFilter('lesson_completed', 'AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS')],
    },
    {
      displayName: 'Onboarding Completers',
      description: 'Users who completed the full onboarding flow',
      membershipDurationDays: 540,
      filterClauses: [makeEventFilter('onboarding_completed', 'AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS')],
    },
    {
      displayName: 'Active Learners',
      description: 'Users who completed a lesson or roleplay in the last 7 days',
      membershipDurationDays: 7,
      filterClauses: [
        {
          clauseType: 'INCLUDE',
          simpleFilter: {
            scope: 'AUDIENCE_FILTER_SCOPE_WITHIN_SAME_SESSION',
            filterExpression: {
              andGroup: {
                filterExpressions: [
                  {
                    orGroup: {
                      filterExpressions: [
                        { eventFilter: { eventName: 'lesson_completed' } },
                        { eventFilter: { eventName: 'roleplay_completed' } },
                        { eventFilter: { eventName: 'quiz_completed' } },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  ];

  for (const audience of audiences) {
    await safeCreate(`Audience: ${audience.displayName}`, () =>
      client.createAudience({
        parent: PROPERTY_NAME,
        audience: audience as any,
      }) as any
    );
  }
}

// ─── 5. Data Retention ────────────────────────────────────────────────

async function setDataRetention() {
  console.log('\n── Data Retention ──');

  try {
    await client.updateDataRetentionSettings({
      dataRetentionSettings: {
        name: `${PROPERTY_NAME}/dataRetentionSettings`,
        eventDataRetention: 'FOURTEEN_MONTHS',
        resetUserDataOnNewActivity: true,
      },
      updateMask: {
        paths: ['event_data_retention', 'reset_user_data_on_new_activity'],
      },
    });
    log('✅', 'Data retention: 14 months, reset on new activity');
  } catch (err: any) {
    log('❌', `Data retention: ${err.message}`);
  }
}

// ─── 6. Search Console Link ───────────────────────────────────────────

async function linkSearchConsole() {
  console.log('\n── Search Console Link ──');

  try {
    // Check existing Search Console links
    const [links] = await client.listSearchAds360Links({
      parent: PROPERTY_NAME,
    });

    if (links && links.length > 0) {
      log('⏭️', 'Search Ads 360 links already exist');
    }
  } catch {
    // Expected — Search Console linking is not available via the Admin API.
    // It must be done manually through the GA4 UI.
  }

  log('ℹ️', 'Search Console must be linked manually (not supported by Admin API):');
  log('ℹ️', '  GA4 Admin > Product Links > Search Console Links > Link');
  log('ℹ️', '  Select: sc-domain:soloframehub.com');
}

// ─── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🔧 GA4 Property Configuration');
  console.log(`   Property: ${PROPERTY_NAME}`);
  console.log('');

  await createCustomDimensions();
  await createCustomMetrics();
  await createKeyEvents();
  await createAudiences();
  await setDataRetention();
  await linkSearchConsole();

  console.log('\n─────────────────────────────────');
  console.log('✅ GA4 property configuration complete!');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Verify in GA4 Admin > Custom definitions');
  console.log('  2. Verify in GA4 Admin > Key events');
  console.log('  3. Verify in GA4 Admin > Audiences');
  console.log('  4. If Search Console link failed, link manually:');
  console.log('     GA4 Admin > Product Links > Search Console Links');
  console.log('  5. Enable GA4 DebugView to test events');
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
