'use client';

import { useLocale } from 'next-intl';

interface TakeawayBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function TakeawayBox({ title, children }: TakeawayBoxProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const resolvedTitle = title ?? (isEs ? 'Conclusión clave' : 'Key Takeaway');

  return (
    <div className="not-prose my-8">
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500">
        <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm uppercase tracking-wider mb-2">{resolvedTitle}</h4>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
