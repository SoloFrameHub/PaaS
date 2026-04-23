'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useFounderContextSafe } from '@/lib/context/FounderContext';

interface TemplateField {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'textarea';
  hint?: string;
}

interface TemplateSection {
  id: string;
  title: string;
  fields: TemplateField[];
}

interface TemplateBuilderProps {
  title: string;
  description?: string;
  fields?: TemplateField[];
  sections?: TemplateSection[];
  template?: string;
  persistKey?: string;
  useProfile?: boolean;
}

export default function TemplateBuilder({
  title,
  description,
  fields: fieldsProp,
  sections,
  template,
  persistKey,
  useProfile,
}: TemplateBuilderProps) {
  // Normalize: AI uses sections (array of {id, title, fields}) instead of flat fields
  const fields = useMemo(() => {
    if (fieldsProp && fieldsProp.length > 0) return fieldsProp;
    if (sections) {
      return sections.flatMap(s => s.fields || []);
    }
    return [];
  }, [fieldsProp, sections]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  const locale = useLocale();
  const isEs = locale === 'es';

  // Always call the hook unconditionally to satisfy Rules of Hooks
  const founderCtx = useFounderContextSafe();
  const effectiveCtx = useProfile ? founderCtx : null;

  // Load from localStorage
  useEffect(() => {
    if (!persistKey) {
      setLoaded(true);
      return;
    }
    try {
      const saved = localStorage.getItem(`template-${persistKey}`);
      if (saved) {
        setValues(JSON.parse(saved));
      }
    } catch {}
    setLoaded(true);
  }, [persistKey]);

  // Pre-populate from founder profile (best-effort, only fills empty fields)
  useEffect(() => {
    if (!useProfile || !effectiveCtx || effectiveCtx.isLoading) return;

    setValues((prev) => {
      const next = { ...prev };
      let changed = false;

      for (const field of fields) {
        if (next[field.id] && next[field.id].trim() !== '') continue;

        const id = field.id.toLowerCase();
        let matched: string | null = null;

        if (
          (id.includes('industry') || id.includes('niche') || id.includes('market')) &&
          effectiveCtx.industry
        ) {
          matched = effectiveCtx.industry.display_name;
        } else if (
          (id.includes('role') || id.includes('buyer') || id.includes('audience') || id.includes('target')) &&
          effectiveCtx.targetRoles?.length
        ) {
          matched = effectiveCtx.targetRoles[0]?.display_name || null;
        } else if (
          (id.includes('pain') || id.includes('problem') || id.includes('challenge')) &&
          effectiveCtx.industry?.pain_points?.[0]
        ) {
          matched = effectiveCtx.industry.pain_points[0].pain;
        } else if (
          id.includes('category') &&
          effectiveCtx.founderCategory
        ) {
          matched = effectiveCtx.founderCategory.display_name;
        }

        if (matched) {
          next[field.id] = matched;
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [useProfile, effectiveCtx?.isLoading, effectiveCtx?.industry, effectiveCtx?.targetRoles, effectiveCtx?.founderCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to localStorage
  useEffect(() => {
    if (!persistKey || !loaded) return;
    try {
      localStorage.setItem(`template-${persistKey}`, JSON.stringify(values));
    } catch {}
  }, [values, persistKey, loaded]);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleClear = () => {
    setValues({});
  };

  const filledCount = fields.filter((f) => values[f.id]?.trim()).length;

  // Build the live preview by substituting {fieldId} tokens
  const preview = useMemo(() => {
    if (!template) return null;

    const fieldMap = new Map(fields.map((f) => [f.id, f]));
    const parts: Array<{ text: string; isPlaceholder: boolean }> = [];
    const regex = /\{(\w+)\}/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: template.slice(lastIndex, match.index), isPlaceholder: false });
      }

      const fieldId = match[1];
      const val = values[fieldId]?.trim();
      const field = fieldMap.get(fieldId);

      if (val) {
        parts.push({ text: val, isPlaceholder: false });
      } else {
        parts.push({
          text: `[${field?.label || fieldId}]`,
          isPlaceholder: true,
        });
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < template.length) {
      parts.push({ text: template.slice(lastIndex), isPlaceholder: false });
    }

    return parts;
  }, [template, values, fields]);

  const baseInputClasses =
    'w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all';

  return (
    <div className="not-prose my-8">
      <div className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 rounded-2xl border border-primary-200 dark:border-primary-500/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                {isEs ? "Constructor de plantilla" : "Template Builder"}
              </div>
              <div className="text-white font-bold">{title}</div>
            </div>
            <div className="text-xs font-semibold text-white/70">
              {filledCount}/{fields.length} {isEs ? "completados" : "filled"}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{description}</p>
          )}

          {/* Fields */}
          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={`tb-${persistKey || 'default'}-${field.id}`}
                  className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={`tb-${persistKey || 'default'}-${field.id}`}
                    className={`${baseInputClasses} min-h-[100px] resize-y`}
                    placeholder={field.placeholder}
                    value={values[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                ) : (
                  <input
                    id={`tb-${persistKey || 'default'}-${field.id}`}
                    type="text"
                    className={baseInputClasses}
                    placeholder={field.placeholder}
                    value={values[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}
                {field.hint && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">
                    {field.hint}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Live Preview */}
          {preview && (
            <div className="mt-6 pt-5 border-t border-primary-200/50 dark:border-primary-500/20">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {isEs ? "Vista previa" : "Live Preview"}
                </span>
              </div>
              <div
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
                aria-live="polite"
                aria-label="Template preview"
              >
                {preview.map((part, i) =>
                  part.isPlaceholder ? (
                    <span
                      key={i}
                      className="inline-block bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded font-semibold text-xs mx-0.5"
                    >
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-primary-200/50 dark:border-primary-500/20">
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all"
              aria-label="Clear all fields"
            >
              {isEs ? "Limpiar todo" : "Clear All"}
            </button>
            {filledCount === fields.length && (
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {isEs ? "¡Todos los campos completados!" : "All fields completed!"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
