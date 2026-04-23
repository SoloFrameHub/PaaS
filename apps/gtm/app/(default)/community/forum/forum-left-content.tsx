'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

interface Pod {
  id: string;
  name: string;
  curriculumStage: string;
}

const stageColors: Record<string, string> = {
  foundation: 'text-blue-500',
  lead_gen: 'text-emerald-500',
  sales_conv: 'text-amber-500',
};

export default function ForumLeftContent() {
  const pathname = usePathname();
  const locale = useLocale(); const isEs = locale === 'es';
  const [pods, setPods] = useState<Pod[]>([]);

  const navItems = [
    { href: '/community', label: isEs ? 'Inicio' : 'Home', icon: 'M4.904 10.114a.98.98 0 0 1 0-1.961h5.886a.98.98 0 0 1 0 1.961H4.904ZM2.863 5.166a1.962 1.962 0 0 0-.901 1.651v5.26c0 1.083.878 1.961 1.961 1.961h7.85a1.962 1.962 0 0 0 1.961-1.961v-5.26c0-.668-.34-1.29-.901-1.65L7.848 1.961 2.863 5.166ZM6.786.312a1.962 1.962 0 0 1 2.123 0l4.985 3.204a3.923 3.923 0 0 1 1.802 3.301v5.26A3.923 3.923 0 0 1 11.772 16H3.923A3.923 3.923 0 0 1 0 12.077v-5.26c0-1.335.679-2.579 1.802-3.3L6.786.311Z' },
    { href: '/community/feed', label: isEs ? 'Actividad' : 'Feed', icon: 'M8 3.414V6a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1h5a1 1 0 0 1 0 2H9.414l6.293 6.293a1 1 0 1 1-1.414 1.414L8 3.414Zm0 9.172V10a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h2.586L.293 7.707a1 1 0 0 1 1.414-1.414L8 12.586Z' },
    { href: '/community/forum', label: isEs ? 'Foro' : 'Forum', icon: 'M5 9a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2H5ZM1 4a1 1 0 1 1 0-2h14a1 1 0 0 1 0 2H1Zm0 10a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2H1Z' },
  ];

  useEffect(() => {
    fetch('/api/community/pods')
      .then(res => res.json())
      .then(({ data }) => setPods(data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full md:w-[15rem] mb-8 md:mb-0">
      <div className="md:sticky md:top-16 md:h-[calc(100dvh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          <div className="flex justify-between items-center md:block">
            {/* Title */}
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">{isEs ? 'Foro' : 'Forum'}</h1>
            </header>

            {/* Create Post button (mobile) */}
            <div className="xl:hidden mb-6">
              <Link
                href="/community/feed"
                className="btn md:w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                {isEs ? 'Crear post' : 'Create Post'}
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-4 md:space-y-3 -mx-4">
            <div>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 md:sr-only">Menu</div>
              <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                {navItems.map(item => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href} className="mr-0.5 md:mr-0 md:mb-0.5">
                      <Link
                        href={item.href}
                        className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${
                          active ? 'bg-white dark:bg-gray-800' : ''
                        }`}
                      >
                        <svg className={`shrink-0 fill-current mr-2 ${active ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} width="16" height="16" viewBox="0 0 16 16">
                          <path d={item.icon} />
                        </svg>
                        <span className={`text-sm font-medium ${active ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300'}`}>
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* My Pods */}
            {pods.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3">{isEs ? 'Mis Pods' : 'My Pods'}</div>
                <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                  {pods.map(pod => (
                    <li key={pod.id} className="mr-0.5 md:mr-0 md:mb-0.5">
                      <Link
                        href={`/community/pods/${pod.id}`}
                        className="flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap"
                      >
                        <svg className={`w-3 h-3 shrink-0 fill-current ${stageColors[pod.curriculumStage] || 'text-gray-500'} mr-3`} viewBox="0 0 12 12">
                          <path d="M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2A6 6 0 1 1 6 0a6 6 0 0 1 0 12Z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{pod.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
