'use client';

import { useLocale } from 'next-intl';
import { usePersistedState } from '@/lib/hooks/usePersistedState';

interface InteractiveChecklistProps {
  title?: string;
  items: string[];
  persistKey?: string;
}

export default function InteractiveChecklist({ title, items, persistKey }: InteractiveChecklistProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [checkedArray, setCheckedArray, { loaded }] = usePersistedState<number[]>(
    'checklist',
    persistKey || '_no_persist',
    [],
  );

  const checked = new Set(checkedArray);

  const toggle = (idx: number) => {
    setCheckedArray((prev) => {
      const set = new Set(prev);
      if (set.has(idx)) set.delete(idx);
      else set.add(idx);
      return Array.from(set);
    });
  };

  const completedCount = checked.size;
  const total = items.length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  if (!loaded) return null;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          {title && <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>}
          <span className="text-xs text-gray-500 dark:text-gray-500">{completedCount}/{total} {isEs ? 'completados' : 'completed'}</span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {items.map((item, idx) => {
          const isChecked = checked.has(idx);
          return (
            <button
              key={idx}
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => toggle(idx)}
              className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                isChecked ? 'opacity-60' : ''
              }`}
            >
              <span
                className={`shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  isChecked
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {isChecked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm leading-relaxed ${isChecked ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
