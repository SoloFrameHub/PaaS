'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Workshop, WorkshopStep } from '@/lib/data/workshops';
import type { AssessmentScores } from '@/types/profile';

interface WorkshopPlayerProps {
    workshop: Workshop;
    currentState: {
        icpSummary: string | null;
        positioningStatement: string | null;
        linkedinAnalysis: string | null;
        acquisitionPath: string | null;
        discoveryPlaybook: string | null;
        scores: AssessmentScores | null;
    };
}

export default function WorkshopPlayer({ workshop, currentState }: WorkshopPlayerProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [aiResponses, setAiResponses] = useState<Record<string, string>>({});
    const [userDrafts, setUserDrafts] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);

    const step = workshop.steps[currentStepIdx];
    const isLastStep = currentStepIdx === workshop.steps.length - 1;
    const totalSteps = workshop.steps.length;

    async function fetchAIContent(stepId: string, userDraft?: string) {
        setLoading(stepId);
        setError(null);
        try {
            const res = await fetch('/api/ai/workshop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    workshopId: workshop.id,
                    stepId,
                    userDraft,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'AI request failed');
            }
            const data = await res.json();
            setAiResponses(prev => ({ ...prev, [stepId]: data.data.content }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(null);
        }
    }

    function handleNext() {
        if (isLastStep) {
            setCompleted(true);
            return;
        }
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);

        // Auto-fetch AI content for teach-framework steps
        const nextStep = workshop.steps[nextIdx];
        if (nextStep.type === 'teach-framework' && nextStep.promptTemplate && !aiResponses[nextStep.id]) {
            fetchAIContent(nextStep.id);
        }
    }

    function handleBack() {
        if (currentStepIdx > 0) {
            setCurrentStepIdx(currentStepIdx - 1);
        }
    }

    function handleReviewDraft() {
        const draft = userDrafts[step.id] || '';
        if (draft.trim().length < 10) {
            setError(isEs ? 'Por favor escribe al menos una oración antes de solicitar una revisión.' : 'Please write at least a sentence before requesting a review.');
            return;
        }
        // Find the next ai-review step and skip to it
        const reviewStepIdx = workshop.steps.findIndex((s, idx) => idx > currentStepIdx && s.type === 'ai-review');
        if (reviewStepIdx >= 0) {
            setCurrentStepIdx(reviewStepIdx);
            fetchAIContent(workshop.steps[reviewStepIdx].id, draft);
        }
    }

    // Auto-fetch for teach-framework on first render if that's step 0
    if (step.type === 'teach-framework' && step.promptTemplate && !aiResponses[step.id] && !loading) {
        fetchAIContent(step.id);
    }

    if (completed) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700/60 text-center">
                <div className="text-4xl mb-4">&#9989;</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {isEs ? 'Taller completado' : 'Workshop Complete'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {isEs ? 'Terminaste' : 'You finished'} <strong>{workshop.title}</strong>. {isEs ? 'Tu trabajo ha sido guardado.' : 'Your work has been saved.'}
                </p>
                {workshop.outputArtifact && (
                    <p className="text-sm text-primary-500 mb-4">
                        {isEs
                            ? `Tu artefacto ${workshop.frameworkRef} ya está en tu playbook.`
                            : `Your ${workshop.frameworkRef} artifact is now in your playbook.`}
                    </p>
                )}
                <div className="flex justify-center gap-4">
                    <Link
                        href="/dashboard"
                        className="btn bg-primary-500 text-white hover:bg-primary-600 px-6"
                    >
                        {isEs ? 'Volver al panel' : 'Back to Dashboard'}
                    </Link>
                    {workshop.triggerReaudit && (
                        <Link
                            href="/dashboard"
                            className="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-6"
                        >
                            {isEs ? 'Re-evaluar puntajes' : 'Re-Assess Scores'}
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link href="/dashboard" className="text-sm text-primary-500 hover:text-primary-600 font-medium mb-1 inline-block">
                        &larr; {isEs ? 'Panel' : 'Dashboard'}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{workshop.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {workshop.frameworkRef} &middot; ~{workshop.estimatedMinutes} min
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {isEs ? 'Paso' : 'Step'} {currentStepIdx + 1} {isEs ? 'de' : 'of'} {totalSteps}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStepIdx + 1) / totalSteps) * 100}%` }}
                />
            </div>

            {/* Step content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 mb-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{step.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{step.instruction}</p>

                {/* Show-current: display relevant profile data */}
                {step.type === 'show-current' && (
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 text-sm space-y-2">
                        {workshop.assessmentDimension === 'icpClarity' && (
                            <>
                                <p><strong>{isEs ? 'ICP actual:' : 'Current ICP:'}</strong> {currentState.icpSummary || (isEs ? 'Aún no definido' : 'Not yet defined')}</p>
                                <p><strong>{isEs ? 'Puntaje de claridad ICP:' : 'ICP Clarity Score:'}</strong> {currentState.scores?.icpClarity ?? 'N/A'}%</p>
                            </>
                        )}
                        {workshop.assessmentDimension === 'positioningStrength' && (
                            <>
                                <p><strong>{isEs ? 'Posicionamiento actual:' : 'Current Positioning:'}</strong> {currentState.positioningStatement || (isEs ? 'Aún no definido' : 'Not yet defined')}</p>
                                <p><strong>{isEs ? 'Puntaje de posicionamiento:' : 'Positioning Score:'}</strong> {currentState.scores?.positioningStrength ?? 'N/A'}%</p>
                            </>
                        )}
                        {workshop.assessmentDimension === 'messagingConsistency' && (
                            <>
                                <p><strong>{isEs ? 'Auditoría LinkedIn:' : 'LinkedIn Audit:'}</strong> {currentState.linkedinAnalysis || (isEs ? 'No analizado' : 'Not analyzed')}</p>
                                <p><strong>{isEs ? 'Puntaje de mensajería:' : 'Messaging Score:'}</strong> {currentState.scores?.messagingConsistency ?? 'N/A'}%</p>
                            </>
                        )}
                        {workshop.assessmentDimension === 'channelReadiness' && (
                            <>
                                <p><strong>{isEs ? 'Camino actual:' : 'Current Path:'}</strong> {currentState.acquisitionPath || (isEs ? 'Aún no elegido' : 'Not yet chosen')}</p>
                                <p><strong>{isEs ? 'Puntaje de canal:' : 'Channel Score:'}</strong> {currentState.scores?.channelReadiness ?? 'N/A'}%</p>
                            </>
                        )}
                        {workshop.assessmentDimension === 'salesProcessMaturity' && (
                            <>
                                <p><strong>{isEs ? 'Playbook de discovery:' : 'Discovery Playbook:'}</strong> {currentState.discoveryPlaybook || (isEs ? 'Aún no creado' : 'Not yet created')}</p>
                                <p><strong>{isEs ? 'Puntaje de proceso de ventas:' : 'Sales Process Score:'}</strong> {currentState.scores?.salesProcessMaturity ?? 'N/A'}%</p>
                            </>
                        )}
                    </div>
                )}

                {/* Teach-framework & ai-review: show AI-generated content */}
                {(step.type === 'teach-framework' || step.type === 'ai-review') && (
                    <div className="mt-4">
                        {loading === step.id ? (
                            <div className="flex items-center gap-3 text-gray-500 py-8">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>
                                    {isEs
                                        ? `Tu asesor está preparando ${step.type === 'ai-review' ? 'retroalimentación' : 'la lección'}...`
                                        : `Your coach is preparing ${step.type === 'ai-review' ? 'feedback' : 'the lesson'}...`}
                                </span>
                            </div>
                        ) : aiResponses[step.id] ? (
                            <div className="prose dark:prose-invert prose-sm max-w-none bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 whitespace-pre-wrap">
                                {aiResponses[step.id]}
                            </div>
                        ) : (
                            <button
                                onClick={() => fetchAIContent(step.id, step.type === 'ai-review' ? userDrafts[workshop.steps[currentStepIdx - 1]?.id] : undefined)}
                                className="btn bg-primary-500 text-white hover:bg-primary-600 px-6"
                            >
                                {step.type === 'ai-review'
                                    ? (isEs ? 'Obtener retroalimentación' : 'Get Coach Feedback')
                                    : (isEs ? 'Cargar lección' : 'Load Lesson')}
                            </button>
                        )}
                    </div>
                )}

                {/* Guided-edit: text input for user */}
                {step.type === 'guided-edit' && (
                    <div className="mt-4">
                        <textarea
                            value={userDrafts[step.id] || ''}
                            onChange={(e) => setUserDrafts(prev => ({ ...prev, [step.id]: e.target.value }))}
                            placeholder={step.editPlaceholder || 'Write your draft here...'}
                            rows={6}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-4 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                        />
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-400">
                                {(userDrafts[step.id] || '').length} {isEs ? 'caracteres' : 'characters'}
                            </span>
                            <button
                                onClick={handleReviewDraft}
                                disabled={!userDrafts[step.id]?.trim()}
                                className="text-sm font-medium text-primary-500 hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                            >
                                {isEs ? 'Obtener revisión →' : 'Get Coach Review →'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Save-artifact: confirmation */}
                {step.type === 'save-artifact' && (
                    <div className="mt-4 bg-green-50 dark:bg-green-500/10 rounded-xl p-4 text-sm text-green-700 dark:text-green-300">
                        {workshop.outputArtifact
                            ? (isEs ? 'Haz clic en "Terminar" para guardar tu trabajo en tu playbook.' : 'Click "Finish" to save your work to your playbook.')
                            : (isEs ? 'Haz clic en "Terminar" para completar este taller.' : 'Click "Finish" to complete this workshop.')}
                    </div>
                )}
            </div>

            {/* Error display */}
            {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6 text-sm text-red-700 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleBack}
                    disabled={currentStepIdx === 0}
                    className="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &larr; {isEs ? 'Atrás' : 'Back'}
                </button>
                <button
                    onClick={handleNext}
                    className="btn bg-primary-500 text-white hover:bg-primary-600 px-6"
                >
                    {isLastStep ? (isEs ? 'Terminar' : 'Finish') : (isEs ? 'Siguiente →' : 'Next →')}
                </button>
            </div>
        </div>
    );
}
