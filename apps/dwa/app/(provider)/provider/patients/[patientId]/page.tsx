import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { providerPatient, profile, distressEvent, moodEntry, patientAssignment } from '@/lib/db/schema';
import { eq, and, desc, isNull } from 'drizzle-orm';
import Link from 'next/link';
import { CURRICULUM } from '@/lib/data/curriculum';
import AssignCoursePanel from './assign-course-panel';
import SessionPrepButton from './session-prep-button';
import ProviderNotesEditor from './provider-notes-editor';

export const dynamic = 'force-dynamic';

function courseTitle(id: string) {
  for (const t of CURRICULUM) {
    const c = t.courses.find(c => c.id === id);
    if (c) return c.title;
  }
  return id;
}

export default async function PatientDetailPage({ params }: { params: Promise<{ patientId: string }> }) {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');
  if (session.role !== 'provider' && session.role !== 'admin') redirect('/provider-signup');

  const { patientId } = await params;
  const db = getDb();
  if (!db) return <div className="p-8 text-gray-500 text-center">Database unavailable.</div>;

  const providerId = session.uid;

  const [link] = await db
    .select()
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.patientId, patientId)));

  if (!link) redirect('/provider/patients');

  const displayName = link.displayName ?? `Patient ${patientId.slice(-4)}`;

  // Profile
  const [patientProfile] = await db.select({ data: profile.data }).from(profile).where(eq(profile.userId, patientId));
  const p = (patientProfile?.data ?? {}) as any;

  // Moods (last 10)
  const moods = await db
    .select()
    .from(moodEntry)
    .where(eq(moodEntry.userId, patientId))
    .orderBy(desc(moodEntry.date))
    .limit(10);

  // Distress events (last 10)
  const distressEvents = await db
    .select()
    .from(distressEvent)
    .where(eq(distressEvent.userId, patientId))
    .orderBy(desc(distressEvent.createdAt))
    .limit(10);

  // Assignments
  const assignments = await db
    .select()
    .from(patientAssignment)
    .where(and(eq(patientAssignment.providerId, providerId), eq(patientAssignment.patientId, patientId)))
    .orderBy(desc(patientAssignment.createdAt));

  const completedCourses: string[] = p?.progress?.completedCourses ?? [];
  const completedLessonsMap: Record<string, string[]> = p?.progress?.completedLessons ?? {};
  const currentCourse: string | null = p?.progress?.currentCourse ?? null;
  const wellnessScore: number | null = p?.assessment?.overallWellnessScore ?? null;
  const symptoms: any[] = p?.questionnaire?.primarySymptoms ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/provider/patients" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              ← Patients
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{displayName}</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Linked {new Date(link.createdAt).toLocaleDateString()}
          </p>
        </div>
        <SessionPrepButton patientId={patientId} patientAlias={displayName} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat label="Wellness Score" value={wellnessScore !== null ? `${wellnessScore}/100` : '—'} />
        <MiniStat label="Courses Completed" value={String(completedCourses.length)} />
        <MiniStat label="Current Course" value={currentCourse ? courseTitle(currentCourse) : 'None'} small />
        <MiniStat label="Latest Mood" value={moods[0] ? `${moods[0].moodRating}/10` : '—'} />
      </div>

      {/* Symptom profile */}
      {symptoms.length > 0 && (
        <Section title="Symptom Profile">
          <div className="flex flex-wrap gap-2">
            {symptoms.map((s: any) => (
              <span
                key={s.category}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  s.isPrimary
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {s.category.replace(/-/g, ' ')}
                {s.severity ? ` · ${s.severity}` : ''}
                {s.isPrimary ? ' ★' : ''}
              </span>
            ))}
          </div>
        </Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent mood entries */}
        <Section title="Recent Mood Check-ins">
          {moods.length === 0 ? (
            <p className="text-gray-400 text-sm">No mood entries yet.</p>
          ) : (
            <div className="space-y-2">
              {moods.slice(0, 5).map(m => (
                <div key={m.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {new Date(m.date).toLocaleDateString()}
                  </span>
                  <div className="flex gap-3 text-xs">
                    <RatingBadge label="Mood" value={m.moodRating} />
                    <RatingBadge label="Anxiety" value={m.anxietyLevel} invert />
                    <RatingBadge label="Sleep" value={m.sleepQuality} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Distress events */}
        <Section title="Distress Events">
          {distressEvents.length === 0 ? (
            <p className="text-gray-400 text-sm">No distress events recorded.</p>
          ) : (
            <div className="space-y-2">
              {distressEvents.map(e => (
                <div key={e.id} className="flex items-center justify-between text-xs">
                  <span className={`rounded-full px-2 py-0.5 font-medium ${
                    e.level === 'crisis' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                    e.level === 'mild'   ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                                          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {e.level}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{e.context}</span>
                  <span className="text-gray-400">{new Date(e.createdAt).toLocaleDateString()}</span>
                  {e.resolvedAt ? (
                    <span className="text-green-500 text-[10px]">resolved</span>
                  ) : (
                    <Link href="/provider/alerts" className="text-violet-500 text-[10px] hover:underline">resolve</Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      {/* Course progress */}
      <Section title="Course Progress">
        {completedCourses.length === 0 && !currentCourse ? (
          <p className="text-gray-400 text-sm">No course activity yet.</p>
        ) : (
          <div className="space-y-1.5">
            {currentCourse && (
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 text-xs font-medium">In Progress</span>
                <span className="text-gray-700 dark:text-gray-300">{courseTitle(currentCourse)}</span>
                <span className="text-xs text-gray-400">
                  {completedLessonsMap[currentCourse]?.length ?? 0} lessons done
                </span>
              </div>
            )}
            {completedCourses.map(id => (
              <div key={id} className="flex items-center gap-2 text-sm">
                <span className="rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 text-xs font-medium">Completed</span>
                <span className="text-gray-700 dark:text-gray-300">{courseTitle(id)}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Assignments */}
      <Section title="Assignments" action={<AssignCoursePanel patientId={patientId} />}>
        {assignments.length === 0 ? (
          <p className="text-gray-400 text-sm">No assignments yet.</p>
        ) : (
          <div className="space-y-2">
            {assignments.map(a => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {courseTitle(a.courseId)}{a.lessonId ? ` — Lesson ${a.lessonId}` : ''}
                </span>
                <div className="flex items-center gap-3">
                  {a.dueDate && (
                    <span className="text-xs text-gray-400">Due {new Date(a.dueDate).toLocaleDateString()}</span>
                  )}
                  {a.completedAt ? (
                    <span className="rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 text-xs font-medium">Done</span>
                  ) : (
                    <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 text-xs font-medium">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Provider notes */}
      <Section title="Private Notes">
        <ProviderNotesEditor patientId={patientId} initialNotes={link.notes ?? ''} />
      </Section>
    </div>
  );
}

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function MiniStat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <div className={`font-bold text-gray-900 dark:text-gray-100 ${small ? 'text-sm truncate' : 'text-xl'}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

function RatingBadge({ label, value, invert }: { label: string; value: number; invert?: boolean }) {
  const good = invert ? value <= 4 : value >= 7;
  const bad  = invert ? value >= 7 : value <= 4;
  const color = good ? 'text-green-600 dark:text-green-400' : bad ? 'text-red-500 dark:text-red-400' : 'text-amber-600 dark:text-amber-400';
  return (
    <span className={`${color} font-medium`}>{label}: {value}</span>
  );
}

