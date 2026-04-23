'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { getArtifactMapping, getArtifactSection, type ArtifactType, type ArtifactField } from '@/lib/data/artifact-map';

interface ArtifactExerciseProps {
    artifactType: ArtifactType;
    section: string;
}

export default function ArtifactExercise({ artifactType, section }: ArtifactExerciseProps) {
    const locale = useLocale();
    const isEs = locale === 'es';

    const mapping = getArtifactMapping(artifactType);
    const sectionDef = getArtifactSection(artifactType, section);

    const [formData, setFormData] = useState<Record<string, any>>({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    // Load existing artifact data from profile
    useEffect(() => {
        async function loadExisting() {
            try {
                const res = await fetch('/api/profile/artifacts');
                if (res.ok) {
                    const { data } = await res.json();
                    const artifact = data?.[artifactType];
                    if (artifact?.content) {
                        const existing: Record<string, any> = {};
                        sectionDef?.fields.forEach(field => {
                            const value = getNestedValue(artifact.content, field.key);
                            if (value !== undefined && value !== null) {
                                existing[field.key] = Array.isArray(value) ? value.join('\n') : value;
                            }
                        });
                        setFormData(existing);
                    }
                }
            } catch {
                // Silently fail — user can still fill in fresh
            }
            setLoaded(true);
        }
        loadExisting();
    }, [artifactType, section]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSave = useCallback(async () => {
        if (!mapping || !sectionDef) return;
        setSaving(true);
        setError(null);
        setSaved(false);

        try {
            // Convert list fields from newline-separated strings to arrays
            const processedData: Record<string, any> = {};
            sectionDef.fields.forEach(field => {
                const raw = formData[field.key];
                if (raw === undefined || raw === '') return;
                if (field.type === 'list') {
                    processedData[field.key] = String(raw).split('\n').map(s => s.trim()).filter(Boolean);
                } else {
                    processedData[field.key] = raw;
                }
            });

            const res = await fetch('/api/academy/save-artifact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    artifactType,
                    sectionId: section,
                    courseNumber: mapping.courseNumber,
                    data: processedData,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to save');
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError(isEs ? 'Error al guardar. Intenta de nuevo.' : 'Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    }, [formData, artifactType, section, mapping, sectionDef]);

    if (!mapping || !sectionDef) {
        return null;
    }

    if (!loaded) {
        return (
            <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        );
    }

    return (
        <div className="my-8 not-prose">
            <div className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 rounded-2xl border border-primary-200 dark:border-primary-500/30 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-indigo-600 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">{isEs ? `Construye tu ${mapping.artifactLabel}` : `Build Your ${mapping.artifactLabel}`}</div>
                            <div className="text-white font-bold">{sectionDef.label}</div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{sectionDef.description}</p>

                    <div className="space-y-5">
                        {sectionDef.fields.map(field => (
                            <FieldInput
                                key={field.key}
                                field={field}
                                value={formData[field.key] || ''}
                                onChange={(val) => setFormData(prev => ({ ...prev, [field.key]: val }))}
                                isEs={isEs}
                            />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-primary-200/50 dark:border-primary-500/20">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                saving
                                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                            }`}
                        >
                            {saving ? (isEs ? 'Guardando...' : 'Saving...') : (isEs ? 'Guardar en Playbook' : 'Save to Playbook')}
                        </button>
                        {saved && (
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {isEs ? "¡Guardado!" : "Saved!"}
                            </span>
                        )}
                        {error && (
                            <span className="text-sm text-red-500">{error}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Field Components ──────────────────────────────────────────────

function FieldInput({ field, value, onChange, isEs = false }: { field: ArtifactField; value: string; onChange: (val: string) => void; isEs?: boolean }) {
    const baseClasses = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all";

    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {field.type === 'textarea' ? (
                <textarea
                    className={`${baseClasses} min-h-[100px] resize-y`}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            ) : field.type === 'list' ? (
                <div>
                    <textarea
                        className={`${baseClasses} min-h-[80px] resize-y`}
                        placeholder={`${field.placeholder}\n(${isEs ? 'Un elemento por línea' : 'One item per line'})`}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                    />
                    <p className="text-xs text-gray-400 mt-1">{isEs ? 'Un elemento por línea' : 'One item per line'}</p>
                </div>
            ) : (
                <input
                    type="text"
                    className={baseClasses}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            )}
        </div>
    );
}

// ─── Helpers ───────────────────────────────────────────────────────

function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
