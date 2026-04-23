'use client'

import { useState } from 'react';

export default function SessionPrepButton({
  patientId,
  patientAlias,
}: {
  patientId: string;
  patientAlias: string;
}) {
  const [open, setOpen] = useState(false);
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/provider/session-prep/${patientId}`);
      const data = await res.json();
      if (data.brief) {
        setBrief(data.brief);
        setGeneratedAt(data.generatedAt);
        setOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={generate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <>
            <span className="animate-spin text-base">⋯</span>
            Preparing brief…
          </>
        ) : (
          <>✦ Session Prep</>
        )}
      </button>

      {open && brief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">Session Prep Brief</h2>
                <p className="text-xs text-gray-400 mt-0.5">{patientAlias} · {generatedAt ? new Date(generatedAt).toLocaleString() : ''}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {brief}
            </div>
            <p className="mt-4 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
              AI-generated from anonymized patient data. Review before your session.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
