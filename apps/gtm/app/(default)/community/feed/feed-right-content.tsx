'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface ForumCategory {
  cid: number;
  name: string;
  topicCount: number;
  postCount: number;
  icon: string;
  bgColor: string;
  children: ForumCategory[];
}

interface TrendingTopic {
  tid: number;
  title: string;
  postCount: number;
  author: { username: string };
}

export default function FeedRightContent() {
  const locale = useLocale(); const isEs = locale === 'es';
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>([]);

  useEffect(() => {
    // Fetch categories
    fetch('/api/community/forum')
      .then(res => res.json())
      .then(({ data }) => setCategories(data || []))
      .catch(() => {});

    // Fetch popular topics for trending
    fetch('/api/community/feed?page=0&sort=popular')
      .then(res => res.json())
      .then(({ data }) => setTrending((data.posts || []).slice(0, 5)))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full hidden xl:block xl:w-[18rem]">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">

          {/* Search form */}
          <div className="mb-6">
            <form className="relative">
              <label htmlFor="feed-search-desktop" className="sr-only">Search</label>
              <input id="feed-search-desktop" className="form-input w-full pl-9 bg-white dark:bg-gray-800" type="search" placeholder={isEs ? 'Buscar...' : 'Search...'} />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-3 mr-2" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="space-y-4">

            {/* Forum Categories */}
            {categories.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">{isEs ? 'Categorías del foro' : 'Forum Categories'}</div>
                <ul className="space-y-3">
                  {categories.slice(0, 6).map(cat => (
                    <li key={cat.cid}>
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center min-w-0">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3 text-white text-xs"
                            style={{ backgroundColor: cat.bgColor || '#6366f1' }}
                          >
                            {cat.name.charAt(0)}
                          </div>
                          <div className="truncate">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{cat.name}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 shrink-0 ml-2">{cat.topicCount}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    href="/community/forum"
                    className="btn-sm w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 text-center block"
                  >
                    {isEs ? 'Ver todo' : 'View All'}
                  </Link>
                </div>
              </div>
            )}

            {/* Trending Topics */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">{isEs ? 'Tendencia' : 'Trending'}</div>
              {trending.length > 0 ? (
                <ul className="space-y-3">
                  {trending.map(topic => (
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
                        <span className="font-medium text-primary-500">{topic.author?.username}</span>
                        {' · '}
                        {topic.postCount > 1 ? `${topic.postCount - 1} ${isEs ? 'comentarios' : 'comments'}` : (isEs ? '0 comentarios' : '0 comments')}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">{isEs ? 'Aún no hay tendencias.' : 'No trending topics yet.'}</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
