'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResolveAlertButton({ alertId }: { alertId: number }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const resolve = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/provider/alerts/${alertId}/resolve`, { method: 'POST' });
      if (res.ok) {
        setDone(true);
        setTimeout(() => router.refresh(), 500);
      }
    } finally {
      setLoading(false);
    }
  };

  if (done) return <span className="text-green-600 dark:text-green-400 text-xs font-medium">Resolved ✓</span>;

  return (
    <button
      onClick={resolve}
      disabled={loading}
      className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
    >
      {loading ? 'Resolving…' : 'Mark Resolved'}
    </button>
  );
}
