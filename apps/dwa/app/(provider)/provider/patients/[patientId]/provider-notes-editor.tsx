'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProviderNotesEditor({
  patientId,
  initialNotes,
}: {
  patientId: string;
  initialNotes: string;
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/provider/patients/${patientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
        rows={4}
        placeholder="Private notes visible only to you…"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving || notes === initialNotes}
          className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Notes'}
        </button>
        <span className="text-xs text-gray-400">Private — not visible to patient</span>
      </div>
    </div>
  );
}
