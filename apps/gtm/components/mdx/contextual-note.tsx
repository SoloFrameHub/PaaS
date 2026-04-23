'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { useFounderContextSafe } from '@/lib/context/FounderContext';

interface ShowWhenCondition {
  businessModel?: string;
  stage?: string;
  founderType?: string;
}

interface ContextualNoteProps {
  showWhen?: ShowWhenCondition;
  icon?: string;
  title?: string;
  children: ReactNode;
  variant?: 'tip' | 'warning' | 'personalized';
}

const VARIANT_STYLES = {
  personalized: {
    border: 'border-l-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/10',
    badge: 'text-indigo-600 dark:text-indigo-400',
  },
  tip: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/10',
    badge: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    badge: 'text-amber-600 dark:text-amber-400',
  },
};

export default function ContextualNote({ showWhen, icon, title, children, variant = 'personalized' }: ContextualNoteProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const founderCtx = useFounderContextSafe();

  // Conditional rendering based on showWhen
  if (showWhen) {
    // If we have no context at all, don't render conditional notes
    if (!founderCtx) return null;

    const { founderCategory, businessModel, stage } = founderCtx;

    // Check founderType condition (partial match on founderCategory)
    if (showWhen.founderType) {
      const categoryId = String(
        (founderCategory as any)?.id || founderCategory || ''
      ).toLowerCase();
      if (!categoryId.includes(showWhen.founderType.toLowerCase())) {
        return null;
      }
    }

    // Check businessModel condition
    if (showWhen.businessModel && businessModel) {
      if (!businessModel.toLowerCase().includes(showWhen.businessModel.toLowerCase())) {
        return null;
      }
    }

    // Check stage condition
    if (showWhen.stage && stage) {
      if (!stage.toLowerCase().includes(showWhen.stage.toLowerCase())) {
        return null;
      }
    }
  }

  const styles = VARIANT_STYLES[variant];

  return (
    <div className={`not-prose my-6 border-l-4 ${styles.border} ${styles.bg} rounded-r-xl p-4`}>
      {showWhen && (
        <p className={`text-[10px] font-bold uppercase tracking-widest ${styles.badge} mb-1`}>
          {isEs ? "Personalizado para ti" : "Personalized for you"}
        </p>
      )}
      <div className="flex items-start gap-2">
        {icon && <span className="text-lg shrink-0" aria-hidden="true">{icon}</span>}
        <div>
          {title && <p className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-1">{title}</p>}
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
