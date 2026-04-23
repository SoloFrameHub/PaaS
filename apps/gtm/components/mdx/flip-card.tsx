'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

interface FlipCardProps {
  front: string;
  back: string;
  frontIcon?: string;
}

export default function FlipCard({ front, back, frontIcon }: FlipCardProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="not-prose my-4 inline-block w-full">
      <div
        className="relative w-full cursor-pointer"
        style={{ perspective: '1000px', minHeight: '180px' }}
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(!flipped); } }}
        role="button"
        aria-pressed={flipped}
        tabIndex={0}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div
            className="w-full p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-primary-500/30 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: 'hidden', minHeight: '180px' }}
          >
            {frontIcon && <span className="text-3xl mb-3" aria-hidden="true">{frontIcon}</span>}
            <p className="font-bold text-gray-800 dark:text-gray-100">{front}</p>
            <p className="text-xs text-gray-400 mt-3">{isEs ? "Haz clic para revelar" : "Click to reveal"}</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 w-full p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', minHeight: '180px' }}
          >
            <p className="leading-relaxed text-sm">{back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
