import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerPatient, distressEvent } from '@/lib/db/schema';
import { eq, and, isNull, isNotNull, inArray, desc } from 'drizzle-orm';
import Link from 'next/link';
import ResolveAlertButton from './resolve-alert-button';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Alerts | Provider Portal' };

export default async function AlertsPage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const db = getDb();
  if (!db) return <div className="p-8 text-gray-500 text-center">Database unavailable.</div>;

  const providerId = session.uid;

  const links = await db
    .select({ patientId: providerPatient.patientId, displayName: providerPatient.displayName })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')));

  const patientIds = links.map(l => l.patientId);
  const nameMap = new Map(links.map(l => [l.patientId, l.displayName ?? `Patient ${l.patientId.slice(-4)}`]));

  let alerts: any[] = [];
  let resolved: any[] = [];

  if (patientIds.length > 0) {
    alerts = await db
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
      .limit(50);

    resolved = await db
      .select()
      .from(distressEvent)
      .where(
        and(
          inArray(distressEvent.userId, patientIds),
          isNotNull(distressEvent.resolvedAt),
          inArray(distressEvent.level, ['crisis', 'mild']),
        )
      )
      .orderBy(desc(distressEvent.createdAt))
      .limit(20);
  }

  const crisis = alerts.filter(a => a.level === 'crisis');
  const mild   = alerts.filter(a => a.level === 'mild');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Alerts</h1>

      {/* Crisis */}
      {crisis.length > 0 && (
        <AlertSection
          title="Crisis Alerts"
          colorClass="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20"
          titleColorClass="text-red-700 dark:text-red-300"
          alerts={crisis}
          nameMap={nameMap}
        />
      )}

      {/* Mild */}
      {mild.length > 0 && (
        <AlertSection
          title="Mild Distress Flags"
          colorClass="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20"
          titleColorClass="text-amber-700 dark:text-amber-300"
          alerts={mild}
          nameMap={nameMap}
        />
      )}

      {alerts.length === 0 && (
        <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-8 text-center">
          <p className="text-green-700 dark:text-green-300 font-medium">No active alerts ✓</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">All patients are in the clear.</p>
        </div>
      )}

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Recently Resolved</h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {resolved.map(a => (
              <div key={a.id} className="flex items-center justify-between px-5 py-3 text-sm opacity-60">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {nameMap.get(a.userId) ?? 'Unknown'}
                </span>
                <span className="text-gray-500">{a.level} · {a.context}</span>
                <span className="text-gray-400 text-xs">
                  Resolved {new Date(a.resolvedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AlertSection({
  title,
  colorClass,
  titleColorClass,
  alerts,
  nameMap,
}: {
  title: string;
  colorClass: string;
  titleColorClass: string;
  alerts: any[];
  nameMap: Map<string, string>;
}) {
  return (
    <div className={`rounded-xl border p-5 ${colorClass}`}>
      <h2 className={`font-semibold text-sm uppercase tracking-wide mb-4 ${titleColorClass}`}>{title}</h2>
      <div className="space-y-3">
        {alerts.map(a => (
          <div key={a.id} className="flex items-center justify-between bg-white/60 dark:bg-gray-900/40 rounded-lg px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <Link
                href={`/provider/patients/${a.userId}`}
                className="font-medium text-sm text-gray-900 dark:text-gray-100 hover:underline"
              >
                {nameMap.get(a.userId) ?? 'Unknown'}
              </Link>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {a.context} · {new Date(a.createdAt).toLocaleString()}
                {a.courseId && ` · ${a.courseId}`}
              </span>
              <span className="text-xs text-gray-400">Confidence: {Math.round(a.confidence * 100)}%</span>
            </div>
            <ResolveAlertButton alertId={a.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
