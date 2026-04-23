'use client';

import { useLocale } from 'next-intl';
import { useFounderContextSafe } from '@/lib/context/FounderContext';
import { ReactNode } from 'react';

interface PersonalizedExampleProps {
  children: ReactNode;
  generic?: string;
}

export default function PersonalizedExample({ children, generic }: PersonalizedExampleProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const context = useFounderContextSafe();

  if (context?.isLoading) {
    return <>{children}</>;
  }

  if (!generic) {
    return <>{children}</>;
  }

  const personalized = context?.getPersonalizedExample(generic) || generic;
  const hasUnresolvedPlaceholders = /\[.+?\]/.test(personalized);
  const hasPersonalization = !hasUnresolvedPlaceholders && personalized !== generic;

  const displayContent = hasUnresolvedPlaceholders
    ? (isEs
        ? 'Completa el cuestionario de incorporación para ver ejemplos personalizados para tu industria y clientes objetivo.'
        : 'Complete your onboarding questionnaire to see personalized examples tailored to your industry and target customers.')
    : personalized;

  return (
    <div className="not-prose my-6 p-6 bg-gradient-to-br from-primary-500/5 to-fuchsia-500/5 border border-primary-500/20 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3">
        <div
          className={`px-2 py-0.5 ${hasPersonalization ? 'bg-emerald-500' : 'bg-amber-500'} text-[10px] font-black uppercase tracking-widest text-white rounded-full`}
        >
          {hasPersonalization ? (isEs ? 'Contexto Personalizado' : 'Context-Aware') : (isEs ? 'Configuración Requerida' : 'Setup Required')}
        </div>
      </div>
      <div className="relative">
        <span className="text-xs font-black uppercase tracking-widest text-primary-500 mb-2 block">
          {isEs ? 'Ejemplo Personalizado' : 'Personalized Example'}
        </span>
        <p
          className={`leading-relaxed ${hasPersonalization ? 'text-gray-700 dark:text-gray-300 italic' : 'text-gray-500 dark:text-gray-400'}`}
        >
          {hasPersonalization ? `"${displayContent}"` : displayContent}
        </p>
        {!hasPersonalization && (
          <a
            href="/onboarding/questionnaire"
            className="inline-block mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            {isEs ? 'Completar Configuración →' : 'Complete Setup →'}
          </a>
        )}
      </div>
    </div>
  );
}
