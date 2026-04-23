'use client'

import { useState } from 'react';

export default function InviteCodePanel() {
  const [code, setCode] = useState<string | null>(null);
  const [expires, setExpires] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/provider/invite', { method: 'POST' });
      const data = await res.json();
      if (data.code) {
        setCode(data.code);
        setExpires(new Date(data.expiresAt).toLocaleDateString());
      }
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      {code ? (
        <div className="flex items-center gap-2">
          <code className="rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-mono font-bold tracking-wider text-violet-600 dark:text-violet-400">
            {code}
          </code>
          <span className="text-xs text-gray-400">expires {expires}</span>
          <button
            onClick={copy}
            className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={() => setCode(null)} className="text-xs text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Generating…' : '+ Generate Invite Code'}
        </button>
      )}
    </div>
  );
}
