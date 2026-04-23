'use client';

import Link from 'next/link';
import { BOOK_STRUCTURE } from '@/lib/data/book-structure';
import type { BookChapter } from '@/types/book';

export default function ChapterSidebar({
  currentSlug,
  completedChapterIds,
}: {
  currentSlug: string;
  completedChapterIds?: Set<string>;
}) {
  return (
    <aside className="lg:w-80 border-r border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/50 p-6 hidden lg:block overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
      <div className="mb-6">
        <Link
          href="/book"
          className="text-sm font-bold text-gray-400 hover:text-primary-500 flex items-center gap-2 mb-4"
        >
          &larr; Table of Contents
        </Link>
      </div>

      <div className="space-y-6">
        {BOOK_STRUCTURE.map((part) => {
          // Skip empty front/back matter labels
          if (part.id === 'front-matter') {
            return (
              <div key={part.id} className="space-y-1">
                {part.chapters.map((ch) => (
                  <ChapterLink
                    key={ch.id}
                    chapter={ch}
                    isActive={ch.slug === currentSlug}
                    isCompleted={completedChapterIds?.has(ch.id) ?? false}
                  />
                ))}
              </div>
            );
          }

          return (
            <div key={part.id}>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                {part.number > 0 && `Part ${part.number}: `}
                {part.title}
              </h3>
              <div className="space-y-1">
                {part.chapters.map((ch) => (
                  <ChapterLink
                    key={ch.id}
                    chapter={ch}
                    isActive={ch.slug === currentSlug}
                    isCompleted={completedChapterIds?.has(ch.id) ?? false}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function ChapterLink({
  chapter,
  isActive,
  isCompleted,
}: {
  chapter: BookChapter;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <Link
      href={`/book/${chapter.slug}`}
      className={`flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {/* Status indicator */}
      <span className="shrink-0 w-5 h-5 flex items-center justify-center">
        {isCompleted ? (
          <svg
            className={`w-4 h-4 ${isActive ? 'text-white' : 'text-green-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : !chapter.isFree ? (
          <svg
            className={`w-3.5 h-3.5 ${isActive ? 'text-white/70' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
      </span>
      <span className="truncate">{chapter.title}</span>
      {chapter.isFree && !isActive && (
        <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded">
          Free
        </span>
      )}
    </Link>
  );
}
