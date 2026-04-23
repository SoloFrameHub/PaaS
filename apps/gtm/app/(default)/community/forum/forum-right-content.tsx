'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface PopularTopic {
  tid: number;
  title: string;
  postCount: number;
  timestampISO: string;
  author: { username: string };
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

export default function ForumRightContent() {
  const locale = useLocale(); const isEs = locale === 'es';
  const [popular, setPopular] = useState<PopularTopic[]>([]);

  useEffect(() => {
    fetch('/api/community/feed?page=0&sort=popular')
      .then(res => res.json())
      .then(({ data }) => setPopular((data.posts || []).slice(0, 5)))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full hidden xl:block xl:w-[18rem]">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          {/* Create Post Button */}
          <div className="mb-6">
            <Link
              href="/community/feed"
              className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white text-center block"
            >
              {isEs ? 'Crear post' : 'Create Post'}
            </Link>
          </div>

          <div className="space-y-4">

            {/* Popular Stories */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">{isEs ? 'Historias populares' : 'Popular Stories'}</div>
              {popular.length > 0 ? (
                <ul className="space-y-3">
                  {popular.map(topic => (
                    <li key={topic.tid}>
                      <div className="text-sm mb-1">
                        <Link
                          href={`/community/feed/${topic.tid}`}
                          className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white transition duration-150 ease-in-out"
                        >
                          {topic.title}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          {topic.author?.username}
                        </span>
                        {' · '}
                        {timeAgo(topic.timestampISO)}
                        {' · '}
                        {topic.postCount > 1 ? `${topic.postCount - 1} ${isEs ? 'comentarios' : 'comments'}` : (isEs ? '0 comentarios' : '0 comments')}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">{isEs ? 'Aún no hay historias populares.' : 'No popular stories yet.'}</p>
              )}
              {popular.length > 0 && (
                <div className="mt-4">
                  <Link
                    href="/community/feed"
                    className="btn-sm w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 text-center block"
                  >
                    {isEs ? 'Ver todo' : 'View All'}
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
