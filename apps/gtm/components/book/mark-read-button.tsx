'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GA4Events } from '@/lib/analytics/ga4';

export default function MarkReadButton({
  chapterId,
  nextSlug,
  isCompleted,
}: {
  chapterId: string;
  nextSlug: string | null;
  isCompleted?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(isCompleted ?? false);

  async function handleClick() {
    setLoading(true);
    try {
      await fetch('/api/book/reading-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, eventType: 'completed' }),
      });
      setDone(true);
      GA4Events.bookChapterRead(chapterId);
      if (nextSlug) {
        window.location.href = `/book/${nextSlug}`;
      }
    } catch {
      // Silent fail — non-critical feature
    } finally {
      setLoading(false);
    }
  }

  if (done && !nextSlug) {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Completed
      </div>
    );
  }

  if (done && nextSlug) {
    return (
      <Link
        href={`/book/${nextSlug}`}
        className="flex flex-col p-4 rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all text-right group"
      >
        <span className="text-xs font-bold uppercase tracking-widest mb-1 text-white/70">
          Next Chapter
        </span>
        <span className="font-bold">Continue Reading &rarr;</span>
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex flex-col p-4 rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all text-right group disabled:opacity-50"
    >
      <span className="text-xs font-bold uppercase tracking-widest mb-1 text-white/70">
        {nextSlug ? 'Mark Complete & Continue' : 'Mark as Complete'}
      </span>
      <span className="font-bold">
        {loading ? 'Saving...' : nextSlug ? 'Next Chapter →' : 'Finish Book'}
      </span>
    </button>
  );
}
