'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/provider/dashboard', label: 'Dashboard',    icon: '⊞' },
  { href: '/provider/patients',  label: 'Patients',     icon: '👥' },
  { href: '/provider/alerts',    label: 'Alerts',       icon: '🔔' },
  { href: '/provider/resources', label: 'Resources',    icon: '🔍' },
];

export default function ProviderSidebar() {
  const path = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Logo / brand */}
      <div className="px-5 py-5 border-b border-gray-200 dark:border-gray-800">
        <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
          Wellness Academy
        </span>
        <div className="mt-0.5 text-[11px] font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
          Provider
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(item => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer link */}
      <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/provider/profile"
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Edit provider profile
        </Link>
      </div>
    </aside>
  );
}
