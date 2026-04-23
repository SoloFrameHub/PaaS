'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePersistedState } from '@/lib/hooks/usePersistedState';

interface PersonaBuilderProps {
  personaId: string;
  title?: string;
  dimensions: string[];
}

export default function PersonaBuilder({ personaId, title, dimensions }: PersonaBuilderProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [values, setValues, { loaded }] = usePersistedState<Record<string, string>>(
    'persona',
    personaId,
    {},
  );
  const [editing, setEditing] = useState(true);

  // Switch to read-only when all dimensions are filled
  useEffect(() => {
    if (!loaded) return;
    const filled = dimensions.every((d) => values[d]?.trim());
    if (filled) setEditing(false);
  }, [loaded, dimensions, values]);

  const handleChange = (dim: string, val: string) => {
    setValues((prev) => ({ ...prev, [dim]: val }));
  };

  const filledCount = dimensions.filter((d) => values[d]?.trim()).length;
  const total = dimensions.length;
  const isComplete = filledCount === total;

  if (!loaded) return null;

  const displayName = title || personaId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100">{displayName}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{filledCount}/{total} {isEs ? "dimensiones definidas" : "dimensions defined"}</p>
            </div>
          </div>
          {isComplete && (
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              {editing ? (isEs ? 'Ver tarjeta' : 'View Card') : (isEs ? 'Editar' : 'Edit')}
            </button>
          )}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${(filledCount / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {editing ? (
          <div className="space-y-3">
            {dimensions.map((dim) => (
              <div key={dim}>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{dim}</label>
                <input
                  type="text"
                  value={values[dim] || ''}
                  onChange={(e) => handleChange(dim, e.target.value)}
                  placeholder={isEs ? `Define ${dim.toLowerCase()}...` : `Define ${dim.toLowerCase()}...`}
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
            ))}
            {isComplete && (
              <button
                onClick={() => setEditing(false)}
                className="mt-2 w-full py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {isEs ? "Guardar persona" : "Save Persona"}
              </button>
            )}
          </div>
        ) : (
          /* Read-only persona card */
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white text-lg font-bold">
                {(values[dimensions[0]] || displayName).charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100">{values[dimensions[0]] || displayName}</p>
                <p className="text-xs text-violet-600 dark:text-violet-400">{displayName}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dimensions.slice(1).map((dim) => (
                <div key={dim} className="bg-white/60 dark:bg-gray-800/40 rounded-lg p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">{dim}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{values[dim] || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
