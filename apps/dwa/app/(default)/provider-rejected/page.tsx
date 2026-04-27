/**
 * /provider-rejected
 * Shown when a provider application was rejected by an admin.
 */
import { headers } from 'next/headers';
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { providerProfile } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Application Not Approved | Wellness Academy' };

export default async function ProviderRejectedPage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const ctx = await requireTenantContext(
    { headers: await headers() },
    { userId: session.uid },
  );

  // Drop the `if (!db)` short-circuit — `withTenantApp` throws when
  // DATABASE_URL is unset, which is the correct semantic per Phase 7.
  const rows = await withTenantApp(ctx, async (tx) =>
    tx.select().from(providerProfile).where(eq(providerProfile.userId, session.uid))
  );
  const prof: any = rows[0] ?? null;

  if (!prof || prof.verificationStatus !== 'rejected') redirect('/provider-signup');

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-3xl">
          ✕
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Application Not Approved
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your provider application was not approved at this time.
          </p>
        </div>

        {prof.verificationNotes && (
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4 text-left">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">
              Reason
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">{prof.verificationNotes}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/provider-signup"
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
          >
            Resubmit Application
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Return to patient view
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          If you believe this was an error, please contact support.
        </p>
      </div>
    </div>
  );
}
