import { headers } from 'next/headers';
import { getAuthContext, getSubscriptionStatus } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import CommunityHub from './community-hub';

export const metadata = {
  title: 'Community - SoloFrameHub',
  description: 'Your Cohort Pods & Community',
};

export default async function CommunityPage() {
  const { user, profile } = await getAuthContext();

  if (!user) redirect('/signin');
  if (!user.emailVerified) redirect('/verify-email');
  if (!profile || !profile.onboardingCompleted) redirect('/onboarding/welcome');

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== 'active') redirect('/subscribe');

  // Check if user has completed the entrance survey
  let hasMatchingProfile = false;
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
    hasMatchingProfile = Boolean(mp);
  } catch {
    // DB not available, proceed without check
  }

  if (!hasMatchingProfile) {
    redirect('/community/entrance-survey');
  }

  // Get user's pods
  let pods: any[] = [];
  try {
    const { podService } = await import('@/lib/services/podService');
    pods = await podService.getPodsByUser(user.uid);
  } catch {
    // Service not available
  }

  return <CommunityHub userId={user.uid} userName={profile.name || ''} pods={pods} />;
}
