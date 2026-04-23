'use client';

import { useState, useEffect, Children, type ReactNode } from 'react';
import { useLocale } from 'next-intl';

// ─── RevealSection ────────────────────────────────────────
interface GateOption {
  id: string;
  text: string;
}

interface RevealSectionProps {
  title: string;
  children: ReactNode;
  gateQuestion?: string;
  gateOptions?: GateOption[];
  gateCorrectId?: string;
}

export function RevealSection({ title, children }: RevealSectionProps) {
  // This component is just a data container — rendering is handled by ProgressiveReveal
  return (
    <div>
      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h4>
      <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// ─── ProgressiveReveal ────────────────────────────────────
interface ProgressiveRevealProps {
  title: string;
  description?: string;
  children: ReactNode;
  persistKey?: string;
  allowSkip?: boolean;
}

export function ProgressiveReveal({ title, description, children, persistKey, allowSkip = false }: ProgressiveRevealProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const sections = Children.toArray(children) as React.ReactElement<RevealSectionProps>[];
  const total = sections.length;

  const [unlockedUpTo, setUnlockedUpTo] = useState(0); // index of the furthest unlocked section
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [gateAnswers, setGateAnswers] = useState<Record<number, string>>({});
  const [gateFeedback, setGateFeedback] = useState<Record<number, 'correct' | 'wrong' | null>>({});

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`reveal-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        setUnlockedUpTo(data.unlockedUpTo ?? 0);
        setExpandedSections(new Set([data.unlockedUpTo ?? 0]));
      }
    } catch {}
  }, [persistKey]);

  // Save state
  useEffect(() => {
    if (!persistKey) return;
    try {
      localStorage.setItem(`reveal-${persistKey}`, JSON.stringify({ unlockedUpTo }));
    } catch {}
  }, [persistKey, unlockedUpTo]);

  const toggleExpanded = (idx: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleGateAnswer = (sectionIdx: number, optionId: string) => {
    const section = sections[sectionIdx];
    const correctId = section.props.gateCorrectId;

    setGateAnswers((prev) => ({ ...prev, [sectionIdx]: optionId }));

    if (correctId && optionId !== correctId) {
      setGateFeedback((prev) => ({ ...prev, [sectionIdx]: 'wrong' }));
      return;
    }

    setGateFeedback((prev) => ({ ...prev, [sectionIdx]: 'correct' }));
    setTimeout(() => unlockNext(sectionIdx), 600);
  };

  const unlockNext = (sectionIdx: number) => {
    if (sectionIdx + 1 < total && sectionIdx >= unlockedUpTo) {
      setUnlockedUpTo(sectionIdx + 1);
      setExpandedSections((prev) => {
        const next = new Set(prev);
        next.delete(sectionIdx);
        next.add(sectionIdx + 1);
        return next;
      });
    }
  };

  const skipToEnd = () => {
    setUnlockedUpTo(total - 1);
    setExpandedSections(new Set([total - 1]));
  };

  const progress = total > 0 ? ((unlockedUpTo + 1) / total) * 100 : 0;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-700">
        <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{isEs ? 'Sección' : 'Section'} {Math.min(unlockedUpTo + 1, total)}/{total}</span>
            {allowSkip && unlockedUpTo < total - 1 && (
              <button onClick={skipToEnd} className="text-xs text-primary-500 hover:underline">{isEs ? 'Saltar al final' : 'Skip to end'}</button>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {sections.map((section, idx) => {
          const isUnlocked = idx <= unlockedUpTo;
          const isActive = idx === unlockedUpTo;
          const isCompleted = idx < unlockedUpTo;
          const isExpanded = expandedSections.has(idx);
          const hasGate = !!section.props.gateQuestion;
          const gateAnswered = gateAnswers[idx] !== undefined;

          return (
            <div key={idx} className={`transition-all duration-300 ${!isUnlocked ? 'opacity-40' : ''}`}>
              {/* Section header */}
              <button
                onClick={() => isUnlocked && toggleExpanded(idx)}
                disabled={!isUnlocked}
                className={`w-full flex items-center gap-3 p-4 text-left transition-all ${
                  isUnlocked ? 'hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer' : 'cursor-not-allowed'
                }`}
                aria-expanded={isExpanded}
              >
                {/* Status icon */}
                <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : isActive
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : !isUnlocked ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </span>
                <span className={`font-bold text-sm ${isUnlocked ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}`}>
                  {section.props.title}
                </span>
                {isUnlocked && (
                  <svg className={`ml-auto w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Section content */}
              {isUnlocked && isExpanded && (
                <div className="px-4 pb-4 pl-14">
                  {/* Content */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.props.children}
                  </div>

                  {/* Gate question */}
                  {hasGate && isActive && !isCompleted && (
                    <div className="mt-6 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-500/20">
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-3">{section.props.gateQuestion}</p>
                      {section.props.gateOptions && (
                        <div className="space-y-2">
                          {section.props.gateOptions.map((opt) => {
                            const isSelected = gateAnswers[idx] === opt.id;
                            const fb = gateFeedback[idx];
                            let style = 'border-gray-200 dark:border-gray-600 hover:border-primary-300';
                            if (isSelected && fb === 'correct') style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
                            else if (isSelected && fb === 'wrong') style = 'border-red-400 bg-red-50 dark:bg-red-900/20';
                            else if (isSelected) style = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';

                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleGateAnswer(idx, opt.id)}
                                className={`w-full text-left p-3 rounded-lg text-sm border transition-all duration-200 ${style}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {gateFeedback[idx] === 'wrong' && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">{isEs ? 'No exactamente — intenta de nuevo' : 'Not quite — try again'}</p>
                      )}
                    </div>
                  )}

                  {/* Continue button (when no gate) */}
                  {!hasGate && isActive && !isCompleted && idx < total - 1 && (
                    <button
                      onClick={() => unlockNext(idx)}
                      className="mt-4 px-5 py-2.5 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-colors"
                    >
                      Continue to next section
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
