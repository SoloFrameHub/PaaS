import { headers } from 'next/headers';
import { getAuthContext, getSubscriptionStatus } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
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
  let alreadyMatched = false;
  try {
    const { schema } = await import('@/lib/db');
    const { eq } = await import('drizzle-orm');
    const ctx = await requireTenantContext(
      { headers: await headers() },
      { userId: user.uid },
    );
    const [mp] = await withTenantApp(ctx, async (tx) =>
      tx
        .select()
        .from(schema.memberMatchingProfile)
        .where(eq(schema.memberMatchingProfile.userId, user.uid)),
    );
    alreadyMatched = Boolean(mp);
  } catch {
    // Continue to survey
  }

  // `redirect` throws — must be called outside the try/catch above so it
  // isn't swallowed by the DB-availability fallback.
  if (alreadyMatched) {
    redirect('/community');
  }

  return <EntranceSurveyFlow />;
}
