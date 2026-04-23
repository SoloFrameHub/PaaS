/**
 * /provider-signup — accessible to any authenticated user.
 * Allows upgrading to provider role by filling in credentials.
 * After saving, redirects to /provider/dashboard (gated by provider layout).
 */
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerProfile } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ProviderProfileForm from '@/app/(provider)/provider/profile/provider-profile-form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Become a Provider | Wellness Academy' };

export default async function ProviderSignupPage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  // Already a verified provider → go straight to portal
  if (session.role === 'admin') redirect('/provider/dashboard');

  const db = getDb();
  let existing = null;
  if (db) {
    const [prof] = await db.select().from(providerProfile).where(eq(providerProfile.userId, session.uid));
    existing = prof ?? null;
  }

  if (session.role === 'provider') {
    if (existing?.verificationStatus === 'verified') redirect('/provider/dashboard');
    if (existing?.verificationStatus === 'manual_review' || existing?.verificationStatus === 'pending') redirect('/provider-pending');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Set Up Your Provider Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Fill in your credentials to unlock the provider portal — patient panel, alerts, RAG resources, and session prep.
          </p>
        </div>
        <ProviderProfileForm existing={existing} />
      </div>
    </div>
  );
}
