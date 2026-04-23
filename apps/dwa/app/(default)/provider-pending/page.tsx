/**
 * /provider-pending
 * Shown when a provider application is in manual_review or pending state.
 */
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerProfile } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Application Under Review | Wellness Academy' };

export default async function ProviderPendingPage({ searchParams }: { searchParams: Promise<{ reauth?: string }> }) {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const { reauth } = await searchParams;
  const isReauth = reauth === '1';

  const db = getDb();
  let prof: any = null;
  if (db) {
    const [row] = await db.select().from(providerProfile).where(eq(providerProfile.userId, session.uid));
    prof = row ?? null;
  }

  // Already approved with a fresh session → send to portal
  // (but not when reauth=1 — that means the session is stale and we must NOT loop back)
  if (!isReauth && (prof?.verificationStatus === 'verified' || session.role === 'admin')) {
    redirect('/provider/dashboard');
  }

  // No application yet
  if (!prof) redirect('/provider-signup');

  const isRejected = prof.verificationStatus === 'rejected';
  if (isRejected) redirect('/provider-rejected');

  // Stale session — verified in DB but role not yet in cookie
  if (isReauth && prof?.verificationStatus === 'verified') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl">
            ✓
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              You're Approved!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your provider account has been verified. Sign out and sign back in to activate your portal access.
            </p>
          </div>
          <a
            href="/api/auth/signout"
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2.5 transition-colors"
          >
            Sign out to continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Status icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-3xl">
          ⏳
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Application Under Review
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your provider application has been received and is being reviewed.
            You'll receive an email once it's approved.
          </p>
        </div>

        {/* What was submitted */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 text-left space-y-2">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Submitted Information
          </h2>
          <Row label="Name" value={prof.displayName} />
          {prof.credentials && <Row label="Credentials" value={prof.credentials} />}
          {prof.specialty && <Row label="Specialty" value={prof.specialty} />}
          {prof.npiNumber && <Row label="NPI Number" value={prof.npiNumber} />}
          {!prof.npiNumber && (
            <div className="text-xs text-amber-600 dark:text-amber-400 pt-1">
              No NPI number was provided. Adding one can speed up verification.
            </div>
          )}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <StatusBadge status={prof.verificationStatus} />
            {prof.verificationNotes && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{prof.verificationNotes}</p>
            )}
          </div>
        </div>

        {/* If no NPI — prompt to add one */}
        {!prof.npiNumber && (
          <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/20 p-4 text-left">
            <p className="text-sm font-medium text-violet-700 dark:text-violet-300">
              Speed up your verification
            </p>
            <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">
              Adding your 10-digit NPI number allows instant automatic verification
              against the NPPES national registry.
            </p>
            <Link
              href="/provider-signup"
              className="mt-3 inline-block text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
            >
              Update application with NPI →
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ← Return to patient view
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-gray-200">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:       'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    manual_review: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    verified:      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    rejected:      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };
  const labels: Record<string, string> = {
    pending:       'Pending Submission',
    manual_review: 'Under Manual Review',
    verified:      'Verified',
    rejected:      'Rejected',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? styles.pending}`}>
      {labels[status] ?? status}
    </span>
  );
}
