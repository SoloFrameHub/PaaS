import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { withSystemAdminApp } from '@/lib/db/with-tenant';
import { providerProfile, user } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import AdminProviderActions from './admin-provider-actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Provider Applications | Admin' };

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  pending:       { label: 'Pending',        class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  manual_review: { label: 'Needs Review',   class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  verified:      { label: 'Verified',       class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  rejected:      { label: 'Rejected',       class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
};

export default async function AdminProvidersPage() {
  const session = await getServerSession();
  if (!session?.uid || session.role !== 'admin') redirect('/dashboard');

  // Cross-tenant view — runs as platform_system to bypass RLS on
  // `provider_profile` (D-7). The `if (!db)` short-circuit is dropped:
  // `withSystemAdminApp` throws when DATABASE_URL is unset, which is the
  // correct semantic per Phase 7 precedent.
  const applications = await withSystemAdminApp(async (tx) =>
    tx
      .select({
        userId:             providerProfile.userId,
        displayName:        providerProfile.displayName,
        credentials:        providerProfile.credentials,
        specialty:          providerProfile.specialty,
        npiNumber:          providerProfile.npiNumber,
        licenseNumber:      providerProfile.licenseNumber,
        verificationStatus: providerProfile.verificationStatus,
        verificationMethod: providerProfile.verificationMethod,
        verificationNotes:  providerProfile.verificationNotes,
        npiData:            providerProfile.npiData,
        verifiedAt:         providerProfile.verifiedAt,
        verifiedBy:         providerProfile.verifiedBy,
        createdAt:          providerProfile.createdAt,
        email:              user.email,
      })
      .from(providerProfile)
      .innerJoin(user, eq(user.id, providerProfile.userId))
      .orderBy(desc(providerProfile.createdAt))
  );

  const pending  = applications.filter(a => a.verificationStatus === 'manual_review' || a.verificationStatus === 'pending');
  const verified = applications.filter(a => a.verificationStatus === 'verified');
  const rejected = applications.filter(a => a.verificationStatus === 'rejected');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Provider Applications</h1>
        <div className="flex gap-3 text-sm">
          <span className="text-amber-600 dark:text-amber-400 font-medium">{pending.length} pending</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="text-green-600 dark:text-green-400 font-medium">{verified.length} verified</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="text-red-500 dark:text-red-400 font-medium">{rejected.length} rejected</span>
        </div>
      </div>

      {/* Pending review */}
      {pending.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-3">
            Needs Review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map(app => (
              <ApplicationCard key={app.userId} app={app} showActions />
            ))}
          </div>
        </section>
      )}

      {pending.length === 0 && (
        <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-6 text-center text-green-700 dark:text-green-300 text-sm font-medium">
          No pending applications ✓
        </div>
      )}

      {/* Verified */}
      {verified.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Verified ({verified.length})
          </h2>
          <div className="space-y-2">
            {verified.map(app => (
              <ApplicationCard key={app.userId} app={app} showActions={false} />
            ))}
          </div>
        </section>
      )}

      {/* Rejected */}
      {rejected.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Rejected ({rejected.length})
          </h2>
          <div className="space-y-2">
            {rejected.map(app => (
              <ApplicationCard key={app.userId} app={app} showActions />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ApplicationCard({ app, showActions }: { app: any; showActions: boolean }) {
  const status = STATUS_LABELS[app.verificationStatus] ?? STATUS_LABELS.pending;
  const npiInfo = app.npiData as any;
  const registryName = npiInfo?.basic
    ? [npiInfo.basic.first_name, npiInfo.basic.last_name, npiInfo.basic.credential].filter(Boolean).join(' ')
    : null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          {/* Name + credentials */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{app.displayName}</span>
            {app.credentials && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{app.credentials}</span>
            )}
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.class}`}>
              {status.label}
            </span>
          </div>

          {/* Email */}
          <div className="text-xs text-gray-400">{app.email}</div>

          {/* Details row */}
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            {app.specialty && <span>Specialty: <strong className="text-gray-700 dark:text-gray-300">{app.specialty}</strong></span>}
            {app.npiNumber && (
              <span>
                NPI: <strong className="font-mono text-gray-700 dark:text-gray-300">{app.npiNumber}</strong>
                {app.verificationMethod === 'npi_auto' && registryName && (
                  <span className="ml-1 text-gray-400">→ Registry: {registryName}</span>
                )}
              </span>
            )}
            {app.licenseNumber && <span>License: <strong className="text-gray-700 dark:text-gray-300">{app.licenseNumber}</strong></span>}
            <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Notes */}
          {app.verificationNotes && (
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded px-2 py-1 mt-2">
              {app.verificationNotes}
            </p>
          )}

          {/* NPI taxonomy if available */}
          {npiInfo?.taxonomies?.[0]?.desc && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              NPPES taxonomy: {npiInfo.taxonomies[0].desc}
              {npiInfo.addresses?.[0]?.state && ` · ${npiInfo.addresses[0].state}`}
            </p>
          )}
        </div>

        {showActions && (
          <AdminProviderActions userId={app.userId} currentStatus={app.verificationStatus} />
        )}
      </div>
    </div>
  );
}
