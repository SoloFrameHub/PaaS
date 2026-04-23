'use client';

import { useState, useCallback, Children, type ReactNode } from 'react';
import { useLocale } from 'next-intl';

interface SlideProps {
  title?: string;
  children: ReactNode;
}

export function Slide({ title, children }: SlideProps) {
  return (
    <div>
      {title && <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h4>}
      <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

interface SlideNavigationProps {
  children: ReactNode;
  showDots?: boolean;
}

export function SlideNavigation({ children, showDots = true }: SlideNavigationProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const slides = Children.toArray(children);
  const total = slides.length;
  const [current, setCurrent] = useState(0);

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((c) => Math.max(0, Math.min(total - 1, c + dir)));
  }, [total]);

  return (
    <div
      className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-700">
        <div
          className="h-full bg-primary-500 transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Slide content */}
      <div className="p-6" role="tabpanel" aria-live="polite">
        {slides[current]}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 pb-5">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isEs ? "Anterior" : "Previous"}
        </button>

        {showDots && (
          <div className="flex gap-2" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === current ? 'bg-primary-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => go(1)}
          disabled={current === total - 1}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white disabled:opacity-30 hover:bg-primary-600 transition-colors"
        >
          {isEs ? "Siguiente" : "Next"}
        </button>
      </div>
    </div>
  );
}
