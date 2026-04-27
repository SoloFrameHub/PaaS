/**
 * /provider-signup — accessible to any authenticated user.
 * Allows upgrading to provider role by filling in credentials.
 * After saving, redirects to /provider/dashboard (gated by provider layout).
 */
import { headers } from 'next/headers';
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
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

  // Page is read-only here — the form posts to a separate endpoint that owns
  // the insert/update. No D-8 split needed: no membership-pre-existing row
  // is written from this server component.
  const ctx = await requireTenantContext(
    { headers: await headers() },
    { userId: session.uid },
  );

  // Drop the `if (!db)` short-circuit — `withTenantApp` throws when
  // DATABASE_URL is unset, which is the correct semantic per Phase 7.
  const rows = await withTenantApp(ctx, async (tx) =>
    tx.select().from(providerProfile).where(eq(providerProfile.userId, session.uid))
  );
  const existing = rows[0] ?? null;

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
