import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerPatient, distressEvent, patientAssignment, providerProfile } from '@/lib/db/schema';
import { eq, and, isNull, inArray, count, desc } from 'drizzle-orm';
import Link from 'next/link';

export const metadata = { title: 'Provider Dashboard | Wellness Academy' };

export default async function ProviderDashboardPage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const db = getDb();
  if (!db) {
    return (
      <div className="p-8 text-center text-gray-500">
        Database not available. Check your DATABASE_URL environment variable.
      </div>
    );
  }

  const providerId = session.uid;

  // Provider profile
  const [prof] = await db.select().from(providerProfile).where(eq(providerProfile.userId, providerId));

  // Patient count
  const [{ total: patientCount }] = await db
    .select({ total: count() })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')));

  // Patient IDs
  const links = await db
    .select({ patientId: providerPatient.patientId, displayName: providerPatient.displayName })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')));

  const patientIds = links.map(l => l.patientId);
  const nameMap = new Map(links.map(l => [l.patientId, l.displayName ?? `Patient ${l.patientId.slice(-4)}`]));

  // Unresolved alerts
  let unresolvedAlerts: any[] = [];
  let pendingCount = 0;

  if (patientIds.length > 0) {
    unresolvedAlerts = await db
      .select()
      .from(distressEvent)
      .where(
        and(
          inArray(distressEvent.userId, patientIds),
          isNull(distressEvent.resolvedAt),
          inArray(distressEvent.level, ['crisis', 'mild']),
        )
      )
      .orderBy(desc(distressEvent.createdAt))
      .limit(5);

    const [{ total }] = await db
      .select({ total: count() })
      .from(patientAssignment)
      .where(
        and(
          eq(patientAssignment.providerId, providerId),
          isNull(patientAssignment.completedAt),
        )
      );
    pendingCount = Number(total);
  }

  const crisisAlerts = unresolvedAlerts.filter(a => a.level === 'crisis');
  const mildAlerts   = unresolvedAlerts.filter(a => a.level === 'mild');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {prof ? `Welcome, ${prof.displayName}` : 'Provider Dashboard'}
        </h1>
        {prof?.credentials && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {prof.credentials}{prof.specialty ? ` · ${prof.specialty}` : ''}
          </p>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Active Patients"
          value={Number(patientCount)}
          color="violet"
          href="/provider/patients"
        />
        <StatCard
          label="Crisis Alerts"
          value={crisisAlerts.length}
          color={crisisAlerts.length > 0 ? 'red' : 'green'}
          href="/provider/alerts"
        />
        <StatCard
          label="Mild Alerts"
          value={mildAlerts.length}
          color={mildAlerts.length > 0 ? 'amber' : 'green'}
          href="/provider/alerts"
        />
        <StatCard
          label="Pending Assignments"
          value={pendingCount}
          color="blue"
          href="/provider/patients"
        />
      </div>

      {/* Crisis alerts — shown prominently if any */}
      {crisisAlerts.length > 0 && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-red-600 dark:text-red-400 text-lg">⚠</span>
            <h2 className="font-semibold text-red-700 dark:text-red-300">
              Crisis Alerts Require Attention
            </h2>
          </div>
          <div className="space-y-2">
            {crisisAlerts.map(a => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <span className="text-red-700 dark:text-red-300 font-medium">
                  {nameMap.get(a.userId) ?? 'Unknown'}
                </span>
                <span className="text-red-500 dark:text-red-400 text-xs">
                  {new Date(a.createdAt).toLocaleDateString()} · {a.context}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/provider/alerts"
            className="mt-3 inline-block text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
          >
            View all alerts →
          </Link>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickLink
          href="/provider/patients"
          title="Patient Panel"
          description="View progress, assign courses, and manage your patient list."
          icon="👥"
        />
        <QuickLink
          href="/provider/resources"
          title="Clinical Resources"
          description="Search course content and clinical references using AI-powered RAG."
          icon="🔍"
        />
        <QuickLink
          href="/provider/alerts"
          title="Alert History"
          description="Review and resolve distress flags from your patients."
          icon="🔔"
        />
      </div>

      {/* No patients onboarding nudge */}
      {Number(patientCount) === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            No patients linked yet. Share an invite code to connect patients to your account.
          </p>
          <Link
            href="/provider/patients"
            className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
          >
            Generate invite code →
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, href }: { label: string; value: number; color: string; href: string }) {
  const colors: Record<string, string> = {
    violet: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300',
    red:    'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    amber:  'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
    blue:   'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    green:  'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
  };
  return (
    <Link href={href} className={`rounded-xl border p-4 transition-opacity hover:opacity-80 ${colors[color] ?? colors.violet}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-medium mt-0.5 opacity-80">{label}</div>
    </Link>
  );
}

function QuickLink({ href, title, description, icon }: { href: string; title: string; description: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{title}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{description}</span>
    </Link>
  );
}
