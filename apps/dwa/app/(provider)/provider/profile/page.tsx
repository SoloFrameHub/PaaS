import { headers } from 'next/headers';
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { providerProfile } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ProviderProfileForm from './provider-profile-form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Provider Profile | Wellness Academy' };

export default async function ProviderProfilePage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const ctx = await requireTenantContext(
    { headers: await headers() },
    { userId: session.uid },
  );

  const [prof] = await withTenantApp(ctx, async (tx) =>
    tx
      .select()
      .from(providerProfile)
      .where(eq(providerProfile.userId, session.uid)),
  );

  const existing = prof ?? null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Provider Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Set up your provider profile to access the provider portal.
          Your credentials will be visible to patients you connect with.
        </p>
      </div>
      <ProviderProfileForm existing={existing} />
    </div>
  );
}
