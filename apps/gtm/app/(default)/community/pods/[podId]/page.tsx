import { getAuthContext, getSubscriptionStatus } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PodDetail from './pod-detail';

export const metadata = {
  title: 'Pod - SoloFrameHub',
  description: 'Your peer learning pod',
};

export default async function PodPage({
  params,
}: {
  params: Promise<{ podId: string }>;
}) {
  const { podId } = await params;
  const { user, profile } = await getAuthContext();

  if (!user) redirect('/signin');
  if (!user.emailVerified) redirect('/verify-email');
  if (!profile || !profile.onboardingCompleted) redirect('/onboarding/welcome');

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== 'active') redirect('/subscribe');

  // Verify membership and get pod data
  let pod: any = null;
  let members: any[] = [];
  let health: any = null;
  let activity: any[] = [];

  try {
    const { podService } = await import('@/lib/services/podService');
    const userPods = await podService.getPodsByUser(user.uid);

    if (!userPods.some((p) => p.id === podId)) {
      redirect('/community');
    }

    pod = await podService.getPod(podId);
    members = await podService.getPodMembers(podId);
    health = await podService.getPodHealth(podId);
    activity = await podService.getRecentActivity(podId, 15);
  } catch {
    redirect('/community');
  }

  if (!pod) redirect('/community');

  return (
    <PodDetail
      pod={pod}
      members={members}
      health={health}
      activity={activity}
      userId={user.uid}
    />
  );
}
