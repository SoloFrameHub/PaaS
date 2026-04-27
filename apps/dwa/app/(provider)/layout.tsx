import { headers } from 'next/headers';
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ProviderSidebar from './provider-sidebar';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { providerProfile } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function ProviderLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session?.uid) redirect('/signin');

  // Admins bypass all checks
  if (session.role === 'admin') {
    // fall through to render
  } else {
    const ctx = await requireTenantContext(
      { headers: await headers() },
      { userId: session.uid },
    );

    const [prof] = await withTenantApp(ctx, async (tx) =>
      tx
        .select({ verificationStatus: providerProfile.verificationStatus })
        .from(providerProfile)
        .where(eq(providerProfile.userId, session.uid)),
    );

    if (session.role === 'provider') {
      // Verify the profile is actually approved (role alone isn't sufficient)
      if (!prof) redirect('/provider-signup');
      if (prof.verificationStatus === 'pending' || prof.verificationStatus === 'manual_review') {
        redirect('/provider-pending');
      }
      if (prof.verificationStatus === 'rejected') {
        redirect('/provider-rejected');
      }
    } else {
      // role = 'user' — check application status before redirecting
      if (prof?.verificationStatus === 'pending' || prof?.verificationStatus === 'manual_review') {
        redirect('/provider-pending');
      }
      if (prof?.verificationStatus === 'rejected') {
        redirect('/provider-rejected');
      }
      // verificationStatus='verified' but role still 'user' means the session is stale
      // (role was elevated in DB but not yet reflected in cookie). Send to pending page
      // which will prompt them to re-authenticate rather than looping back through signup.
      if (prof?.verificationStatus === 'verified') {
        redirect('/provider-pending?reauth=1');
      }
      redirect('/provider-signup');
    }
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50 dark:bg-gray-950">
      <ProviderSidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wide uppercase">
            Provider Portal
          </span>
          <Link
            href="/dashboard"
            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Back to Patient View →
          </Link>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
