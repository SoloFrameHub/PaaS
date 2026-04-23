'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useFounderContextSafe } from '@/lib/context/FounderContext';

interface Lens {
  id: string;
  label: string;
  icon?: string;
  content?: string;
  explanation?: string;
}

interface ConceptReframeProps {
  concept: string;
  defaultLens?: string;
  lenses: Lens[];
}

export default function ConceptReframe({ concept, defaultLens, lenses }: ConceptReframeProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const founderCtx = useFounderContextSafe();
  const [activeLensId, setActiveLensId] = useState<string>(defaultLens || lenses[0]?.id || '');

  // Auto-select lens based on founder profile
  useEffect(() => {
    if (!founderCtx?.founderCategory) return;
    const categoryId = String(founderCtx.founderCategory.id || founderCtx.founderCategory || '').toLowerCase();
    const match = lenses.find((l) => {
      const lid = l.id.toLowerCase();
      const llabel = l.label.toLowerCase();
      return (
        (categoryId.includes('technical') && (lid.includes('technical') || lid.includes('engineer') || lid.includes('saas'))) ||
        (categoryId.includes('creator') && (lid.includes('creator') || lid.includes('coach'))) ||
        (categoryId.includes('service') && (lid.includes('consultant') || lid.includes('agency') || lid.includes('service'))) ||
        llabel.toLowerCase().includes(categoryId)
      );
    });
    if (match) setActiveLensId(match.id);
  }, [founderCtx?.founderCategory, lenses]);

  const activeLens = lenses.find((l) => l.id === activeLensId) || lenses[0];

  return (
    <div className="not-prose my-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          {isEs ? `Comprender: ${concept}` : `Understand: ${concept}`}
        </p>
        {/* Lens selector */}
        <div className="flex flex-wrap gap-2">
          {lenses.map((lens) => (
            <button
              key={lens.id}
              onClick={() => setActiveLensId(lens.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                lens.id === activeLensId
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              role="tab"
              aria-selected={lens.id === activeLensId}
            >
              {lens.icon && <span className="mr-1">{lens.icon}</span>}
              {lens.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4" role="tabpanel" aria-live="polite">
        <div
          key={activeLens.id}
          className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/80 text-sm text-gray-700 dark:text-gray-300 leading-relaxed animate-[fadeIn_0.25s_ease-in]"
        >
          {activeLens.content || activeLens.explanation}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
