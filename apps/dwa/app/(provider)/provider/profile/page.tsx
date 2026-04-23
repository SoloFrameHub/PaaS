import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerProfile } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ProviderProfileForm from './provider-profile-form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Provider Profile | Wellness Academy' };

export default async function ProviderProfilePage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const db = getDb();

  let existing: any = null;
  if (db) {
    const [prof] = await db
      .select()
      .from(providerProfile)
      .where(eq(providerProfile.userId, session.uid));
    existing = prof ?? null;
  }

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
