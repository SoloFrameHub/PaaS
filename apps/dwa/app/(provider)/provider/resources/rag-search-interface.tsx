'use client'

import { useState, useEffect } from 'react';

interface RAGResult {
  answer: string;
  sources: Array<{
    title: string;
    sourceId: string;
    sourceType: string;
    score: number;
  }>;
  model: string;
}

type SourceFilter = 'all' | 'course' | 'assessment' | 'clinical';

export default function RAGSearchInterface() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SourceFilter>('all');
  const [result, setResult] = useState<RAGResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noEmbeddings, setNoEmbeddings] = useState(false);

  // Listen for example chip clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const chip = target.closest('[data-query]') as HTMLElement | null;
      if (chip?.dataset.query) {
        setQuery(chip.dataset.query);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const search = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setNoEmbeddings(false);

    try {
      const res = await fetch('/api/provider/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          sourceFilter: filter === 'all' ? undefined : filter,
          topK: 6,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Search failed');
        return;
      }

      const data: RAGResult = await res.json();

      if (data.answer.includes('No relevant content found')) {
        setNoEmbeddings(true);
      }

      setResult(data);
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      search();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a clinical question about course content, assessments, or treatment approaches…"
            rows={2}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400"
          />
        </div>
        <button
          onClick={search}
          disabled={!query.trim() || loading}
          className="self-start rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'course', 'assessment', 'clinical'] as SourceFilter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f === 'all' ? 'All Sources' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="animate-pulse">⋯</span>
            Searching knowledge base and synthesizing answer…
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* No embeddings warning */}
      {noEmbeddings && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-700 dark:text-amber-300">
          <strong>Knowledge base is empty.</strong> Run the seeding script to index course content:
          <code className="block mt-2 bg-amber-100 dark:bg-amber-900/30 rounded px-3 py-2 text-xs font-mono">
            npx tsx scripts/seed-embeddings.ts
          </code>
        </div>
      )}

      {/* Result */}
      {result && !noEmbeddings && (
        <div className="space-y-4">
          {/* Answer */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-violet-500 text-lg">✦</span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                AI Answer · {result.model}
              </span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {result.answer}
            </div>
          </div>

          {/* Sources */}
          {result.sources.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                Retrieved Sources
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.sources.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-snug">{s.title}</span>
                      <span className="shrink-0 text-[10px] text-gray-400 font-mono">{(s.score * 100).toFixed(0)}%</span>
                    </div>
                    <span className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                      s.sourceType === 'course'      ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' :
                      s.sourceType === 'assessment'  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                                       'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {s.sourceType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Answer is synthesized from indexed course content. Always apply clinical judgment.
          </p>
        </div>
      )}
    </div>
  );
}
