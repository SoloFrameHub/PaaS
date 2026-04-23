'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CURRICULUM } from '@/lib/data/curriculum';

// Flatten all courses for the dropdown
const ALL_COURSES = CURRICULUM.flatMap(t => t.courses.map(c => ({ id: c.id, title: c.title, trackTitle: t.title })));

export default function AssignCoursePanel({ patientId }: { patientId: string }) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const assign = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/provider/patients/${patientId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
          note: note || undefined,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setCourseId('');
        setDueDate('');
        setNote('');
        setTimeout(() => { setSuccess(false); setOpen(false); }, 1500);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
      >
        + Assign Course
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <select
        value={courseId}
        onChange={e => setCourseId(e.target.value)}
        className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        <option value="">Select a course…</option>
        {ALL_COURSES.map(c => (
          <option key={c.id} value={c.id}>{c.title}</option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400"
        placeholder="Due date (optional)"
      />
      <input
        type="text"
        value={note}
        onChange={e => setNote(e.target.value)}
        className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400"
        placeholder="Note for patient (optional)"
        maxLength={200}
      />
      <div className="flex items-center gap-2">
        <button
          onClick={assign}
          disabled={!courseId || loading}
          className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Assigning…' : success ? 'Assigned ✓' : 'Assign'}
        </button>
        <button onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
      </div>
    </div>
  );
}
