'use client';

import { useFounderContextSafe } from '@/lib/context/FounderContext';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';

interface PersonalizedExampleProps {
    children: ReactNode;
    generic?: string;
}

/**
 * Component that personalizes a teaching example based on the 3D Matrix context.
 * It uses the getPersonalizedExample helper from FounderContext.
 *
 * Usage:
 * <PersonalizedExample generic="If you are selling [terminology] to [buyer role]...">
 *   If you are selling software to managers... (Fallback if no context)
 * </PersonalizedExample>
 */
export default function PersonalizedExample({ children, generic }: PersonalizedExampleProps) {
    const context = useFounderContextSafe();
    const locale = useLocale();
    const isEs = locale === 'es';

    // Show loading state while context is loading
    if (context?.isLoading) {
        return <>{children}</>;
    }

    // If no generic template provided, show children
    if (!generic) {
        return <>{children}</>;
    }

    // Get personalized content - uses generic as fallback if context incomplete
    const personalized = context?.getPersonalizedExample(generic) || generic;

    // Check if personalization actually happened (no remaining placeholders)
    // Must check for brackets to catch any unresolved placeholders
    const hasUnresolvedPlaceholders = /\[.+?\]/.test(personalized);

    // Only show as personalized if we have data AND placeholders were actually replaced
    const hasPersonalization = !hasUnresolvedPlaceholders && personalized !== generic;

    // If there are unresolved placeholders, show a helpful message instead of raw template
    const displayContent = hasUnresolvedPlaceholders
        ? (isEs
            ? "Completa tu cuestionario de bienvenida para ver ejemplos personalizados para tu industria y clientes objetivo."
            : "Complete your onboarding questionnaire to see personalized examples tailored to your industry and target customers.")
        : personalized;

    return (
        <div className="my-6 p-6 bg-gradient-to-br from-primary-500/5 to-fuchsia-500/5 border border-primary-500/20 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3">
                <div className={`px-2 py-0.5 ${hasPersonalization ? 'bg-emerald-500' : 'bg-amber-500'} text-[10px] font-black uppercase tracking-widest text-white rounded-full`}>
                    {hasPersonalization ? (isEs ? 'Personalizado' : 'Context-Aware') : (isEs ? 'Configuración necesaria' : 'Setup Required')}
                </div>
            </div>
            <div className="relative">
                <span className="text-xs font-black uppercase tracking-widest text-primary-500 mb-2 block">
                    {isEs ? 'Ejemplo personalizado' : 'Personalized Example'}
                </span>
                <p className={`leading-relaxed ${hasPersonalization ? 'text-gray-700 dark:text-gray-300 italic' : 'text-gray-500 dark:text-gray-400'}`}>
                    {hasPersonalization ? `"${displayContent}"` : displayContent}
                </p>
                {!hasPersonalization && (
                    <a href="/onboarding/questionnaire" className="inline-block mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium">
                        {isEs ? 'Completar configuración →' : 'Complete Setup →'}
                    </a>
                )}
            </div>
        </div>
    );
}
