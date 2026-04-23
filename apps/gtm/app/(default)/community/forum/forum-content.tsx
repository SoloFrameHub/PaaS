'use client';

import { useState } from 'react';
import ForumEntries from './forum-entries';
import { useLocale } from 'next-intl';

export default function ForumContent() {
  const locale = useLocale(); const isEs = locale === 'es';
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const SORT_OPTIONS = [
    { key: 'popular', label: isEs ? 'Popular' : 'Popular' },
    { key: 'newest', label: isEs ? 'Más reciente' : 'Newest' },
  ] as const;

  function handleSortChange(newSort: string) {
    if (newSort === sort) return;
    setSort(newSort);
    setPage(0);
  }

  return (
    <>
      {/* Sort tabs */}
      <div className="mb-4">
        <div className="w-full flex flex-wrap -space-x-px">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => handleSortChange(opt.key)}
              className={`btn grow rounded-none first:rounded-l-lg last:rounded-r-lg ${
                sort === opt.key
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-primary-500'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-700/20 text-gray-600 dark:text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Forum Entries */}
      <div className="space-y-2">
        <ForumEntries
          sort={sort}
          page={page}
          onPageChange={setPage}
          onTotalChange={setHasMore}
        />
      </div>

      {/* Pagination */}
      <div className="mt-6 text-right">
        <nav className="inline-flex" role="navigation" aria-label="Navigation">
          <ul className="flex justify-center">
            <li className="ml-3 first:ml-0">
              {page > 0 ? (
                <button
                  onClick={() => setPage(p => p - 1)}
                  className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                >
                  {isEs ? '← Anterior' : '<- Previous'}
                </button>
              ) : (
                <span className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600">
                  {isEs ? '← Anterior' : '<- Previous'}
                </span>
              )}
            </li>
            <li className="ml-3 first:ml-0">
              {hasMore ? (
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                >
                  {isEs ? 'Siguiente →' : 'Next ->'}
                </button>
              ) : (
                <span className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600">
                  {isEs ? 'Siguiente →' : 'Next ->'}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
