'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminProviderActions({
  userId,
  currentStatus,
}: {
  userId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [done, setDone] = useState<'approved' | 'rejected' | null>(null);
  const router = useRouter();

  const act = async (action: 'approve' | 'reject') => {
    setLoading(action);
    try {
      const res = await fetch(`/api/admin/providers/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, notes: notes || undefined }),
      });
      if (res.ok) {
        setDone(action === 'approve' ? 'approved' : 'rejected');
        setTimeout(() => router.refresh(), 500);
      }
    } finally {
      setLoading(null);
    }
  };

  if (done) {
    return (
      <span className={`text-sm font-medium ${done === 'approved' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
        {done === 'approved' ? 'Approved ✓' : 'Rejected ✕'}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2 shrink-0">
      <div className="flex gap-2">
        <button
          onClick={() => act('approve')}
          disabled={!!loading}
          className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading === 'approve' ? 'Approving…' : 'Approve'}
        </button>
        <button
          onClick={() => setShowNotes(!showNotes)}
          disabled={!!loading}
          className="rounded-lg border border-red-200 dark:border-red-800 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-50 transition-colors"
        >
          Reject
        </button>
      </div>

      {showNotes && (
        <div className="flex flex-col gap-1.5 w-56">
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Rejection reason (optional)…"
            rows={2}
            className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1.5 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
          />
          <div className="flex gap-1.5">
            <button
              onClick={() => act('reject')}
              disabled={!!loading}
              className="flex-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading === 'reject' ? 'Rejecting…' : 'Confirm Reject'}
            </button>
            <button onClick={() => setShowNotes(false)} className="text-xs text-gray-400 hover:text-gray-600 px-1">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
