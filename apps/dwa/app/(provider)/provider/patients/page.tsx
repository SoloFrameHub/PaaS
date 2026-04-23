import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerPatient, profile, distressEvent, moodEntry, patientAssignment } from '@/lib/db/schema';
import { eq, and, isNull, inArray, count, desc } from 'drizzle-orm';
import Link from 'next/link';
import InviteCodePanel from './invite-code-panel';

export const metadata = { title: 'Patients | Provider Portal' };

export default async function PatientsPage() {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');

  const db = getDb();
  if (!db) return <div className="p-8 text-gray-500 text-center">Database unavailable.</div>;

  const providerId = session.uid;

  const links = await db
    .select({
      patientId:   providerPatient.patientId,
      displayName: providerPatient.displayName,
      status:      providerPatient.status,
      linkedAt:    providerPatient.createdAt,
    })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')))
    .orderBy(desc(providerPatient.createdAt));

  const patientIds = links.map(l => l.patientId);

  // Batch-load profile data
  let profileMap = new Map<string, any>();
  let crisisMap  = new Map<string, number>();
  let moodMap    = new Map<string, any>();
  let assignMap  = new Map<string, { pending: number; total: number }>();

  if (patientIds.length > 0) {
    const profiles = await db
      .select({ userId: profile.userId, data: profile.data })
      .from(profile)
      .where(inArray(profile.userId, patientIds));
    profileMap = new Map(profiles.map(p => [p.userId, p.data]));

    const crisisRows = await db
      .select({ userId: distressEvent.userId, cnt: count() })
      .from(distressEvent)
      .where(
        and(
          inArray(distressEvent.userId, patientIds),
          eq(distressEvent.level, 'crisis'),
          isNull(distressEvent.resolvedAt),
        )
      )
      .groupBy(distressEvent.userId);
    crisisMap = new Map(crisisRows.map(r => [r.userId!, Number(r.cnt)]));

    const moods = await db
      .select({ userId: moodEntry.userId, moodRating: moodEntry.moodRating, anxietyLevel: moodEntry.anxietyLevel, date: moodEntry.date })
      .from(moodEntry)
      .where(inArray(moodEntry.userId, patientIds))
      .orderBy(desc(moodEntry.date));
    for (const m of moods) {
      if (!moodMap.has(m.userId)) moodMap.set(m.userId, m);
    }

    const allAssignments = await db
      .select({ patientId: patientAssignment.patientId, completedAt: patientAssignment.completedAt })
      .from(patientAssignment)
      .where(eq(patientAssignment.providerId, providerId));
    for (const a of allAssignments) {
      const cur = assignMap.get(a.patientId) ?? { pending: 0, total: 0 };
      cur.total++;
      if (!a.completedAt) cur.pending++;
      assignMap.set(a.patientId, cur);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Patients</h1>
        <InviteCodePanel />
      </div>

      {links.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            No patients linked yet. Use the invite code above to connect patients.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Patient</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mood</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Assignments</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Alerts</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current Course</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {links.map(link => {
                const p = (profileMap.get(link.patientId) ?? {}) as any;
                const mood = moodMap.get(link.patientId);
                const crises = crisisMap.get(link.patientId) ?? 0;
                const assign = assignMap.get(link.patientId) ?? { pending: 0, total: 0 };
                const currentCourse = p?.progress?.currentCourse ?? null;
                const displayName = link.displayName ?? `Patient ${link.patientId.slice(-4)}`;

                return (
                  <tr key={link.patientId} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {displayName}
                    </td>
                    <td className="px-4 py-3">
                      {mood ? (
                        <MoodPill rating={mood.moodRating} />
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                      {assign.total > 0 ? (
                        <span>
                          {assign.pending > 0
                            ? <span className="text-amber-600 dark:text-amber-400 font-medium">{assign.pending} pending</span>
                            : <span className="text-green-600 dark:text-green-400 font-medium">all done</span>
                          }
                          <span className="text-gray-400"> / {assign.total}</span>
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {crises > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 text-xs font-medium">
                          ⚠ {crises} crisis
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                      {currentCourse ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/provider/patients/${link.patientId}`}
                        className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function MoodPill({ rating }: { rating: number }) {
  const color =
    rating >= 7 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
    rating >= 4 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
      {rating}/10
    </span>
  );
}
