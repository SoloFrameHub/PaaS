'use client';

import { useLocale } from 'next-intl';

interface ExampleCardProps {
  label?: string;
  children: React.ReactNode;
}

export default function ExampleCard({ label, children }: ExampleCardProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const resolvedLabel = label ?? (isEs ? 'Ejemplo real' : 'Real-World Example');

  return (
    <div className="not-prose my-8">
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 relative">
        <span className="absolute -top-3 left-4 px-3 py-0.5 bg-gray-800 dark:bg-gray-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
          {resolvedLabel}
        </span>
        <div className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
