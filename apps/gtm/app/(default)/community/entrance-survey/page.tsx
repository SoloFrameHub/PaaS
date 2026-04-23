import { getAuthContext, getSubscriptionStatus } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EntranceSurveyFlow from './entrance-survey-flow';

export const metadata = {
  title: 'Community Entrance Survey - SoloFrameHub',
  description: 'Tell us about yourself so we can match you with the right pod',
};

export default async function EntranceSurveyPage() {
  const { user, profile } = await getAuthContext();

  if (!user) redirect('/signin');
  if (!user.emailVerified) redirect('/verify-email');
  if (!profile || !profile.onboardingCompleted) redirect('/onboarding/welcome');

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== 'active') redirect('/subscribe');

  // Check if already has matching profile
  try {
    const { getDb, hasDatabase, schema } = await import('@/lib/db');
    if (hasDatabase()) {
      const db = getDb();
      if (db) {
        const { eq } = await import('drizzle-orm');
        const [mp] = await db.select()
          .from(schema.memberMatchingProfile)
          .where(eq(schema.memberMatchingProfile.userId, user.uid));
        if (mp) redirect('/community');
      }
    }
  } catch {
    // Continue to survey
  }

  return <EntranceSurveyFlow />;
}
