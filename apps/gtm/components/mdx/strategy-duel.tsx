'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface Strategy {
  label?: string;
  name?: string;
  description: string;
  pros: string[];
  cons: string[];
}

interface StrategyDuelProps {
  title: string;
  scenario: string;
  strategyA: Strategy;
  strategyB: Strategy;
  expertVerdict: string;
  persistKey?: string;
}

export default function StrategyDuel({ title, scenario, strategyA: rawA, strategyB: rawB, expertVerdict, persistKey }: StrategyDuelProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  // Normalize: AI uses "name" but component expects "label"
  const strategyA = { ...rawA, label: rawA.label || rawA.name || 'Strategy A' };
  const strategyB = { ...rawB, label: rawB.label || rawB.name || 'Strategy B' };
  const [selected, setSelected] = useState<'a' | 'b' | null>(null);
  const [justification, setJustification] = useState('');
  const [revealed, setRevealed] = useState(false);

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`duel-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        setSelected(data.selected || null);
        setJustification(data.justification || '');
        setRevealed(data.revealed || false);
      }
    } catch {}
  }, [persistKey]);

  const handleReveal = () => {
    setRevealed(true);
    if (persistKey) {
      try {
        localStorage.setItem(`duel-${persistKey}`, JSON.stringify({ selected, justification, revealed: true }));
      } catch {}
    }
  };

  const canReveal = selected !== null && justification.length >= 20;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
      </div>

      <div className="p-6">
        {/* Scenario */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{scenario}</p>

        {/* Strategy cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Strategy A */}
          <button
            onClick={() => !revealed && setSelected('a')}
            disabled={revealed}
            className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
              revealed && selected === 'a'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : selected === 'a'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">A</span>
              <h5 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{strategyA.label}</h5>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{strategyA.description}</p>

            {/* Pros/Cons — only shown after reveal */}
            {revealed && (
              <div className="mt-4 space-y-2">
                {strategyA.pros.map((p, i) => (
                  <div key={`p${i}`} className="flex items-start gap-2 text-xs">
                    <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                    <span className="text-gray-600 dark:text-gray-400">{p}</span>
                  </div>
                ))}
                {strategyA.cons.map((c, i) => (
                  <div key={`c${i}`} className="flex items-start gap-2 text-xs">
                    <span className="text-red-500 mt-0.5 shrink-0">-</span>
                    <span className="text-gray-600 dark:text-gray-400">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </button>

          {/* Strategy B */}
          <button
            onClick={() => !revealed && setSelected('b')}
            disabled={revealed}
            className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
              revealed && selected === 'b'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : selected === 'b'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center">B</span>
              <h5 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{strategyB.label}</h5>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{strategyB.description}</p>

            {revealed && (
              <div className="mt-4 space-y-2">
                {strategyB.pros.map((p, i) => (
                  <div key={`p${i}`} className="flex items-start gap-2 text-xs">
                    <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                    <span className="text-gray-600 dark:text-gray-400">{p}</span>
                  </div>
                ))}
                {strategyB.cons.map((c, i) => (
                  <div key={`c${i}`} className="flex items-start gap-2 text-xs">
                    <span className="text-red-500 mt-0.5 shrink-0">-</span>
                    <span className="text-gray-600 dark:text-gray-400">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Justification */}
        {selected && !revealed && (
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {isEs ? `¿Por qué elegiste ${selected === 'a' ? strategyA.label : strategyB.label}?` : `Why did you choose ${selected === 'a' ? strategyA.label : strategyB.label}?`}
            </label>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder={isEs ? 'Explica tu razonamiento (al menos 20 caracteres)...' : 'Explain your reasoning (at least 20 characters)...'}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none min-h-[80px] resize-y"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-400">{justification.length}/20 {isEs ? 'mín' : 'min'}</p>
              <button
                onClick={handleReveal}
                disabled={!canReveal}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-30 bg-primary-500 text-white hover:bg-primary-600"
              >
                {isEs ? 'Ver análisis experto' : 'See Expert Analysis'}
              </button>
            </div>
          </div>
        )}

        {/* User's justification (shown after reveal) */}
        {revealed && justification && (
          <div className="mb-6 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/80 border-l-4 border-gray-300 dark:border-gray-600">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{isEs ? 'Tu razonamiento:' : 'Your reasoning:'}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{justification}</p>
          </div>
        )}

        {/* Expert verdict */}
        {revealed && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/10 dark:to-indigo-900/10 border border-primary-200 dark:border-primary-500/20">
            <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">{isEs ? 'Veredicto del experto' : 'Expert Verdict'}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{expertVerdict}</p>
          </div>
        )}
      </div>
    </div>
  );
}
