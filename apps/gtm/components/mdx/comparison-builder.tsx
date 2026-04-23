'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';

interface ComparisonRow {
  id: string;
  label: string;
  expertValue: string;
  placeholder?: string;
  type?: 'text' | 'textarea';
}

interface ComparisonBuilderProps {
  title: string;
  expertTitle?: string;
  builderTitle?: string;
  rows?: ComparisonRow[];
  prompt?: string;
  expertExample?: string;
  criteria?: string[];
  persistKey?: string;
}

export default function ComparisonBuilder({
  title,
  expertTitle: expertTitleProp,
  builderTitle: builderTitleProp,
  rows: rowsProp,
  prompt,
  expertExample,
  criteria,
  persistKey,
}: ComparisonBuilderProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const expertTitle = expertTitleProp ?? (isEs ? 'Ejemplo experto' : 'Expert Example');
  const builderTitle = builderTitleProp ?? (isEs ? 'Tu versión' : 'Your Version');
  // Normalize: AI uses prompt/expertExample/criteria instead of rows
  const rows = useMemo(() => {
    if (rowsProp && rowsProp.length > 0) return rowsProp;
    if (prompt) {
      const result: ComparisonRow[] = [{
        id: 'main',
        label: prompt,
        expertValue: expertExample || '',
        type: 'textarea',
      }];
      // Add criteria as additional reference rows if provided
      if (criteria && criteria.length > 0) {
        result.push({
          id: 'criteria',
          label: 'Evaluation Criteria',
          expertValue: criteria.map((c, i) => `${i + 1}. ${c}`).join('\n'),
          type: 'textarea',
        });
      }
      return result;
    }
    return [];
  }, [rowsProp, prompt, expertExample, criteria]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [expertVisible, setExpertVisible] = useState(true);

  // Load from localStorage
  useEffect(() => {
    if (!persistKey) {
      setLoaded(true);
      return;
    }
    try {
      const saved = localStorage.getItem(`comparison-${persistKey}`);
      if (saved) {
        setValues(JSON.parse(saved));
      }
    } catch {}
    setLoaded(true);
  }, [persistKey]);

  // Save to localStorage
  useEffect(() => {
    if (!persistKey || !loaded) return;
    try {
      localStorage.setItem(`comparison-${persistKey}`, JSON.stringify(values));
    } catch {}
  }, [values, persistKey, loaded]);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const filledCount = rows.filter((r) => values[r.id]?.trim()).length;
  const total = rows.length;
  const progress = total > 0 ? (filledCount / total) * 100 : 0;

  const baseInputClasses =
    'w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all';

  return (
    <div className="not-prose my-8">
      <div className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 rounded-2xl border border-primary-200 dark:border-primary-500/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                {isEs ? 'Constructor de comparación' : 'Comparison Builder'}
              </div>
              <div className="text-white font-bold">{title}</div>
            </div>
            <div className="text-xs font-semibold text-white/70">
              {filledCount}/{total} {isEs ? 'filas completadas' : 'rows filled'}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 pt-4">
          {/* Expert toggle */}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={() => setExpertVisible((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-expanded={expertVisible}
              aria-controls="cb-expert-column"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expertVisible ? '' : '-rotate-90'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {expertVisible ? (isEs ? 'Ocultar' : 'Hide') : (isEs ? 'Mostrar' : 'Show')} {isEs ? 'ejemplo experto' : 'Expert Example'}
            </button>
          </div>

          {/* Column Headers (lg+) */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4 mb-3">
            {expertVisible && (
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {expertTitle}
              </div>
            )}
            <div
              className={`text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 ${
                !expertVisible ? 'lg:col-span-2' : ''
              }`}
            >
              {builderTitle}
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {rows.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Row label */}
                <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {row.label}
                  </span>
                </div>

                {/* Two-column content */}
                <div
                  className={`grid gap-0 ${
                    expertVisible ? 'lg:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {/* Expert column */}
                  {expertVisible && (
                    <div
                      id="cb-expert-column"
                      className="p-4 bg-blue-50 dark:bg-blue-900/10 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700"
                    >
                      <div className="lg:hidden text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                        {expertTitle}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {row.expertValue}
                      </p>
                    </div>
                  )}

                  {/* User input column */}
                  <div className="p-4 bg-white dark:bg-gray-800/30">
                    <div className="lg:hidden text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2">
                      {builderTitle}
                    </div>
                    {row.type === 'textarea' ? (
                      <textarea
                        className={`${baseInputClasses} min-h-[80px] resize-y`}
                        placeholder={row.placeholder || (isEs ? `Escribe tu ${row.label.toLowerCase()}...` : `Write your ${row.label.toLowerCase()}...`)}
                        value={values[row.id] || ''}
                        onChange={(e) => handleChange(row.id, e.target.value)}
                        aria-label={`Your ${row.label}`}
                      />
                    ) : (
                      <input
                        type="text"
                        className={baseInputClasses}
                        placeholder={row.placeholder || (isEs ? `Escribe tu ${row.label.toLowerCase()}...` : `Write your ${row.label.toLowerCase()}...`)}
                        value={values[row.id] || ''}
                        onChange={(e) => handleChange(row.id, e.target.value)}
                        aria-label={`Your ${row.label}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion state */}
          {filledCount === total && total > 0 && (
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-primary-200/50 dark:border-primary-500/20">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {isEs ? '¡Todas las filas completadas! Buen trabajo.' : 'All rows completed! Great work.'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
