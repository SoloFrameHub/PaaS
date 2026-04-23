'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface ModelResponse {
  label: string;
  text: string;
  explanation?: string;
}

interface MiniRoleplayProps {
  title?: string;
  scenario: string;
  prospectMessage?: string;
  prospectName?: string;
  modelResponses?: ModelResponse[];
  modelResponse?: string;
  role?: string;
  frameworkHint?: string;
  persistKey?: string;
}

export default function MiniRoleplay({
  title: titleProp,
  scenario,
  prospectMessage: prospectMessageProp,
  prospectName = 'Prospect',
  modelResponses: modelResponsesProp,
  modelResponse,
  role,
  frameworkHint,
  persistKey,
}: MiniRoleplayProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  // Normalize: AI uses role/modelResponse (singular) instead of title/prospectMessage/modelResponses
  const title = titleProp || (isEs ? 'Ejercicio de roleplay' : 'Roleplay Exercise');
  const prospectMessage = prospectMessageProp || scenario;
  const effectiveScenario = prospectMessageProp ? scenario : (role || '');
  const modelResponses = modelResponsesProp || (modelResponse ? [{ label: 'Model Response', text: modelResponse }] : []);
  const [userResponse, setUserResponse] = useState('');
  const [revealed, setRevealed] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`roleplay-${persistKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserResponse(parsed.userResponse || '');
        setRevealed(parsed.revealed || false);
      }
    } catch {}
  }, [persistKey]);

  // Save to localStorage
  useEffect(() => {
    if (!persistKey) return;
    try {
      localStorage.setItem(
        `roleplay-${persistKey}`,
        JSON.stringify({ userResponse, revealed })
      );
    } catch {}
  }, [userResponse, revealed, persistKey]);

  const canReveal = userResponse.trim().length >= 20;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">{isEs ? 'Ejercicio de roleplay' : 'Roleplay Exercise'}</div>
            <div className="text-white font-bold">{title}</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Scenario context */}
        {effectiveScenario && (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-5 leading-relaxed">{effectiveScenario}</p>
        )}

        {/* Framework hint */}
        {frameworkHint && (
          <div className="mb-5 px-4 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
              Framework Hint: <span className="font-normal">{frameworkHint}</span>
            </p>
          </div>
        )}

        {/* Chat area */}
        <div className="space-y-4 mb-6">
          {/* Prospect message — left aligned */}
          <div className="flex items-start gap-3 max-w-[85%]">
            <div className="shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                {prospectName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{prospectName}</p>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-gray-700/60">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{prospectMessage}</p>
              </div>
            </div>
          </div>

          {/* User response — right aligned */}
          <div className="flex flex-col items-end">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 mr-1">{isEs ? 'Tu respuesta' : 'Your Response'}</p>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder={isEs ? 'Escribe tu respuesta aquí (mínimo 20 caracteres)...' : 'Type your response here (at least 20 characters)...'}
              rows={3}
              aria-label="Your roleplay response"
              className="w-full sm:w-[85%] bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-y"
            />
            <p className="text-xs text-gray-400 mt-1 mr-1">
              {userResponse.trim().length}/20 {isEs ? 'caracteres mínimo' : 'characters minimum'}
            </p>
          </div>
        </div>

        {/* Reveal button */}
        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            disabled={!canReveal}
            aria-disabled={!canReveal}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
              canReveal
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 cursor-pointer'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {isEs ? 'Mostrar respuestas modelo' : 'Show Model Responses'}
          </button>
        )}

        {/* Model responses */}
        {revealed && (
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-emerald-200 dark:bg-emerald-500/30" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {isEs ? 'Respuestas modelo' : 'Model Responses'}
              </span>
              <div className="h-px flex-1 bg-emerald-200 dark:bg-emerald-500/30" />
            </div>

            {modelResponses.map((response, idx) => (
              <div
                key={idx}
                className="rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 p-4"
              >
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  {response.label}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{response.text}</p>
                {response.explanation && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                    {response.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
