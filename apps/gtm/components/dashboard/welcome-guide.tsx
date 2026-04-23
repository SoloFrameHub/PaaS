"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const GUIDE_VIEWED_KEY = "sfh-guide-viewed";
const COLLAPSED_KEY = "sfh-checklist-collapsed";

interface OnboardingChecklistProps {
  profileComplete: boolean;
  assessmentComplete: boolean;
  lessonsCompleted: number;
  roleplaysDone: number;
}

interface Step {
  id: string;
  label: string;
  doneLabel: string;
  href: string;
  description: string;
}

export default function WelcomeGuide({
  profileComplete,
  assessmentComplete,
  lessonsCompleted,
  roleplaysDone,
}: OnboardingChecklistProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const STEPS: Step[] = [
    {
      id: "profile",
      label: isEs ? "Completa tu perfil de negocio" : "Complete your business profile",
      doneLabel: isEs ? "Perfil de negocio completo" : "Business profile complete",
      href: "/onboarding/questionnaire",
      description: isEs
        ? "Cuéntanos sobre tu negocio para que la IA personalice tu currículo"
        : "Tell us about your business so the AI can personalize your curriculum",
    },
    {
      id: "assessment",
      label: isEs ? "Realiza tu evaluación de preparación" : "Run your readiness assessment",
      doneLabel: isEs ? "Evaluación de preparación completa" : "Readiness assessment complete",
      href: "/onboarding/analyzing",
      description: isEs
        ? "Obtén puntajes base en 5 dimensiones de preparación para adquisición"
        : "Get baseline scores across 5 dimensions of acquisition readiness",
    },
    {
      id: "lesson",
      label: isEs ? "Completa tu primera lección" : "Complete your first lesson",
      doneLabel: isEs ? "Primera lección completa" : "First lesson complete",
      href: "/academy",
      description: isEs
        ? "Lección interactiva de 15-30 min con ejercicios que construyen tu playbook"
        : "15-30 min interactive lesson with exercises that build your playbook",
    },
    {
      id: "roleplay",
      label: isEs ? "Practica un roleplay de ventas" : "Practice a sales roleplay",
      doneLabel: isEs ? "Primer roleplay completo" : "First roleplay complete",
      href: "/roleplay",
      description: isEs
        ? "Simula una llamada de ventas con un comprador IA y recibe puntaje"
        : "Simulate a sales call against an AI buyer persona and get scored",
    },
    {
      id: "guide",
      label: isEs ? "Lee el resumen de la plataforma" : "Read the Platform Overview",
      doneLabel: isEs ? "Resumen de plataforma leído" : "Platform overview read",
      href: "/guide",
      description: isEs
        ? "Entiende cómo funciona el sistema de 5 capas y qué hace cada cosa"
        : "Understand how the 5-layer system works and what everything does",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [guideViewed, setGuideViewed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setGuideViewed(localStorage.getItem(GUIDE_VIEWED_KEY) === "true");
    setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "true");
    setMounted(true);
  }, []);

  function isStepDone(stepId: string): boolean {
    switch (stepId) {
      case "profile":
        return profileComplete;
      case "assessment":
        return assessmentComplete;
      case "lesson":
        return lessonsCompleted > 0;
      case "roleplay":
        return roleplaysDone > 0;
      case "guide":
        return guideViewed;
      default:
        return false;
    }
  }

  const completedCount = STEPS.filter((s) => isStepDone(s.id)).length;
  const allComplete = completedCount === STEPS.length;

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(COLLAPSED_KEY, String(next));
  }

  // Avoid hydration mismatch — render nothing server-side
  if (!mounted) return null;

  // If all complete and collapsed, hide entirely
  if (allComplete && collapsed) return null;

  return (
    <div className="col-span-full">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-2xl shadow-sm overflow-hidden">
        {/* Header — always visible, toggles collapse */}
        <button
          onClick={toggleCollapse}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                allComplete
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-primary-100 dark:bg-primary-900/30"
              }`}
            >
              {allComplete ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-sm font-bold text-primary-500">
                  {completedCount}/{STEPS.length}
                </span>
              )}
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">
                {allComplete
                  ? (isEs ? "Configuración completa" : "Setup Complete")
                  : (isEs ? "Primeros pasos" : "Getting Started")}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {allComplete
                  ? (isEs ? "Has explorado todo lo esencial" : "You've explored all the essentials")
                  : isEs
                    ? `${completedCount} de ${STEPS.length} pasos completados`
                    : `${completedCount} of ${STEPS.length} steps complete`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(completedCount / STEPS.length) * 100}%`,
                }}
              />
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                collapsed ? "" : "rotate-180"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {/* Expanded checklist body */}
        {!collapsed && (
          <div className="px-6 pb-5 border-t border-gray-100 dark:border-gray-700/60">
            <div className="space-y-1 mt-4">
              {STEPS.map((step) => {
                const done = isStepDone(step.id);
                return (
                  <Link
                    key={step.id}
                    href={step.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      done
                        ? "bg-green-50/50 dark:bg-green-900/10"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        done
                          ? "bg-green-500 text-white"
                          : "border-2 border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {done && (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium ${
                          done
                            ? "text-green-700 dark:text-green-400 line-through"
                            : "text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {done ? step.doneLabel : step.label}
                      </div>
                      {!done && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {step.description}
                        </div>
                      )}
                    </div>
                    {!done && (
                      <svg
                        className="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Footer: update profile + full guide */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
              <Link
                href="/onboarding/questionnaire"
                className="text-xs font-medium text-primary-500 hover:text-primary-600"
              >
                {isEs ? "Actualizar mi perfil y evaluación" : "Update my profile & assessment"}
              </Link>
              <Link
                href="/guide"
                className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isEs ? "Resumen completo de la plataforma" : "Full platform overview"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
