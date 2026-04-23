'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

const STEPS_EN = [
  { id: 1, name: 'Welcome', path: '/onboarding/welcome' },
  { id: 2, name: 'Business', path: '/onboarding/business' },
  { id: 3, name: 'Questionnaire', path: '/onboarding/questionnaire' },
  { id: 4, name: 'Context', path: '/onboarding/context' },
  { id: 5, name: 'Analyzing', path: '/onboarding/analyzing' },
  { id: 6, name: 'Results', path: '/onboarding/assessment' },
]

const STEPS_ES = [
  { id: 1, name: 'Bienvenida', path: '/onboarding/welcome' },
  { id: 2, name: 'Negocio', path: '/onboarding/business' },
  { id: 3, name: 'Cuestionario', path: '/onboarding/questionnaire' },
  { id: 4, name: 'Contexto', path: '/onboarding/context' },
  { id: 5, name: 'Analizando', path: '/onboarding/analyzing' },
  { id: 6, name: 'Resultados', path: '/onboarding/assessment' },
]

export default function OnboardingProgress({ step = 1 }: { step?: number }) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const STEPS = isEs ? STEPS_ES : STEPS_EN

  return (
    <nav className="px-4 pt-12 pb-8" aria-label={isEs ? "Progreso de incorporación" : "Onboarding Progress"}>
      <div className="max-w-lg mx-auto w-full">
        <div className="relative">
          {/* Progress Line */}
          <div
            className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 dark:bg-gray-700/60"
            aria-hidden="true"
          />
          {/* Filled Progress Line */}
          <div
            className="absolute left-0 top-1/2 -mt-px h-0.5 bg-primary-500 transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            aria-hidden="true"
          />

          <ul className="relative flex justify-between w-full">
            {STEPS.map((s) => {
              const isCompleted = step > s.id
              const isCurrent = step === s.id
              const isClickable = step >= s.id

              return (
                <li key={s.id} className="flex flex-col items-center">
                  {isClickable ? (
                    <Link
                      href={s.path}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-label={isEs
                        ? `Paso ${s.id}: ${s.name}${isCompleted ? ' (Completado)' : ''}`
                        : `Step ${s.id}: ${s.name}${isCompleted ? ' (Completed)' : ''}`}
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all ${isCurrent || isCompleted
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </Link>
                  ) : (
                    <span
                      aria-label={isEs
                        ? `Paso ${s.id}: ${s.name} (Próximo)`
                        : `Step ${s.id}: ${s.name} (Upcoming)`}
                      className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                    >
                      {s.id}
                    </span>
                  )}
                  <span
                    className={`mt-2 text-xs transition-colors ${isCurrent ? 'text-primary-500 font-medium' : isClickable ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}
                    aria-hidden="true"
                  >
                    {s.name}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
