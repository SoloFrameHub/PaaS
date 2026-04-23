'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { apiClient } from '@/lib/api/client';
import { useConfetti } from './use-confetti';
import { generateWorksheetPdf, downloadPdf } from '@/lib/pdf-worksheets';
import type { WorksheetField } from '@/lib/pdf-worksheets';
import type {
    AssessmentConfigClient,
    AssessmentResult,
    AssessmentLoadResponse,
    AssessmentSubmitResponse,
    SeverityBand,
} from '@/types/assessment';

const AssessmentHistoryChart = dynamic(
    () => import('./assessment-history-chart'),
    { ssr: false }
);

interface LikertAssessmentProps {
    courseId: string;
    lessonId: string;
}

const BAND_COLORS: Record<string, { bg: string; border: string; text: string; fill: string }> = {
    green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        border: 'border-green-200 dark:border-green-500/20',
        text: 'text-green-700 dark:text-green-400',
        fill: 'bg-green-500',
    },
    yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-950/20',
        border: 'border-yellow-200 dark:border-yellow-500/20',
        text: 'text-yellow-700 dark:text-yellow-400',
        fill: 'bg-yellow-500',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        border: 'border-orange-200 dark:border-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
        fill: 'bg-orange-500',
    },
    red: {
        bg: 'bg-red-50 dark:bg-red-950/20',
        border: 'border-red-200 dark:border-red-500/20',
        text: 'text-red-700 dark:text-red-400',
        fill: 'bg-red-500',
    },
};

export default function LikertAssessment({ courseId, lessonId }: LikertAssessmentProps) {
    const [config, setConfig] = useState<AssessmentConfigClient | null>(null);
    const [previousResults, setPreviousResults] = useState<AssessmentResult[]>([]);
    const [responses, setResponses] = useState<Record<string, number>>({});
    const [result, setResult] = useState<AssessmentSubmitResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fireConfetti } = useConfetti();
    const resultRef = useRef<HTMLElement>(null);

    // Scroll results into view when they appear
    useEffect(() => {
        if (result && resultRef.current) {
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [result]);

    useEffect(() => {
        async function load() {
            try {
                const data = await apiClient.get<AssessmentLoadResponse>(
                    `/api/academy/assessment/${courseId}/${lessonId}`
                );
                setConfig(data.config);
                setPreviousResults(data.previousResults);
            } catch {
                // No assessment for this lesson — don't render anything
                setError('none');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [courseId, lessonId]);

    const handleResponse = (questionId: string, value: number) => {
        setResponses(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        if (!config) return;

        const unanswered = config.questions.filter(q => responses[q.id] === undefined);
        if (unanswered.length > 0) {
            alert('Please answer all questions before submitting.');
            return;
        }

        setSubmitting(true);
        try {
            const data = await apiClient.post<AssessmentSubmitResponse>(
                `/api/academy/assessment/${courseId}/${lessonId}`,
                { responses }
            );
            setResult(data);
            fireConfetti({ intensity: 'medium' });
            window.dispatchEvent(new CustomEvent('exercise-completed', { detail: { type: 'assessment' } }));
        } catch (err: any) {
            alert('Failed to submit assessment: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetake = () => {
        setResponses({});
        setResult(null);
    };

    const handleDownloadResults = async () => {
        if (!config || !result) return;
        try {
            const r = result.result;
            const fields: WorksheetField[] = [
                { id: 'score', label: 'Total Score', type: 'text', value: `${r.totalScore} / ${r.maxScore}` },
                { id: 'severity', label: 'Severity Level', type: 'text', value: `${r.severityLabel} — ${r.severityDescription}` },
                ...config.questions.map((q, idx) => ({
                    id: q.id,
                    label: `${idx + 1}. ${q.text}`,
                    type: 'text' as const,
                    value: config.scale.labels[responses[q.id]] ?? String(responses[q.id] ?? ''),
                })),
            ];
            const bytes = await generateWorksheetPdf({
                title: `${config.title} — Results`,
                subtitle: `Completed ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
                instructions: `${config.instructions} (Timeframe: ${config.timeframe})`,
                disclaimer: config.disclaimer,
                fields,
            });
            downloadPdf(bytes, `${config.title.toLowerCase().replace(/\s+/g, '-')}-results.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    // Don't render if no assessment or still loading
    if (loading) {
        return (
            <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center animate-pulse">
                        <ClipboardIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Loading Self-Assessment...</h3>
                </div>
            </section>
        );
    }

    if (error || !config) return null;

    const answeredCount = Object.keys(responses).length;
    const totalQuestions = config.questions.length;
    const allAnswered = answeredCount === totalQuestions;

    // ── Results View ──
    if (result) {
        const r = result.result;
        const colors = BAND_COLORS[r.severityColor] || BAND_COLORS.green;
        const prev = result.previousResult;

        const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
        const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

        return (
            <motion.section
                ref={resultRef}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-sky-50 dark:from-primary-950/20 dark:to-sky-950/20 border border-primary-200 dark:border-primary-500/20"
            >
                <motion.div variants={stagger} initial="hidden" animate="show">
                    {/* Header */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white">
                            <ClipboardIcon />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{config.title} — Results</h3>
                            <p className="text-sm text-gray-500">
                                Score: <AnimatedScore value={r.totalScore} className={`font-bold ${colors.text}`} /> / {r.maxScore}
                            </p>
                        </div>
                    </motion.div>

                    {/* Score Bar */}
                    <motion.div variants={fadeUp}>
                        <ScoreBar
                            score={r.totalScore}
                            bands={result.scoringBands}
                            maxScore={r.maxScore}
                        />
                    </motion.div>

                    {/* Severity Result */}
                    <motion.div variants={fadeUp} className={`mt-6 p-5 rounded-2xl border ${colors.bg} ${colors.border}`}>
                        <p className={`text-lg font-bold ${colors.text}`}>{r.severityLabel}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{r.severityDescription}</p>
                    </motion.div>

                    {/* Score History Chart */}
                    {previousResults.length >= 1 && (
                        <motion.div variants={fadeUp}>
                            <AssessmentHistoryChart
                                results={previousResults}
                                bands={result.scoringBands}
                                maxScore={r.maxScore}
                                latestResult={r}
                            />
                        </motion.div>
                    )}

                    {/* Previous Comparison */}
                    {prev && (
                        <motion.div variants={fadeUp} className="mt-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Previous score:</span>{' '}
                                <span className="font-bold">{prev.totalScore}</span> / {prev.maxScore}
                                {' — '}
                                {r.totalScore < prev.totalScore ? (
                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                        Improved by {prev.totalScore - r.totalScore} points
                                    </span>
                                ) : r.totalScore > prev.totalScore ? (
                                    <span className="text-orange-600 dark:text-orange-400 font-medium">
                                        Increased by {r.totalScore - prev.totalScore} points
                                    </span>
                                ) : (
                                    <span className="text-gray-500 font-medium">No change</span>
                                )}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Taken {new Date(prev.completedAt).toLocaleDateString()}
                            </p>
                        </motion.div>
                    )}

                    {/* Crisis Banner */}
                    {r.crisisItemTriggered && (
                        <motion.div
                            variants={fadeUp}
                            animate={{ opacity: 1, scale: [1, 1.01, 1] }}
                            transition={{ scale: { repeat: 2, duration: 0.3, delay: 0.8 } }}
                        >
                            <CrisisBanner />
                        </motion.div>
                    )}

                    {/* Disclaimer */}
                    <motion.p variants={fadeUp} className="mt-6 text-xs text-gray-400 italic">{config.disclaimer}</motion.p>

                    {/* Actions */}
                    <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                        <button onClick={handleDownloadResults} className="btn bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2">
                            <DownloadIcon /> Download Results as PDF
                        </button>
                        <button onClick={handleRetake} className="btn border border-primary-300 dark:border-primary-500/30 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30">
                            Retake Assessment
                        </button>
                    </motion.div>
                </motion.div>
            </motion.section>
        );
    }

    // ── Form View ──
    return (
        <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-sky-50 dark:from-primary-950/20 dark:to-sky-950/20 border border-primary-200 dark:border-primary-500/20">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white">
                    <ClipboardIcon />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{config.title}</h3>
                    <p className="text-sm text-gray-500">{config.description}</p>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20">
                <p className="text-xs text-amber-700 dark:text-amber-400">{config.disclaimer}</p>
            </div>

            {/* Previous Results Notice */}
            {previousResults.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500">
                        You&apos;ve taken this assessment before. Last score:{' '}
                        <span className="font-bold text-gray-700 dark:text-gray-300">{previousResults[0].totalScore}</span>
                        {' / '}{previousResults[0].maxScore}
                        {' '}({previousResults[0].severityLabel})
                    </p>
                </div>
            )}

            {/* Instructions */}
            <div className="mt-6 mb-6">
                <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {config.instructions}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Timeframe: {config.timeframe}
                </p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {config.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <p className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                            {idx + 1}. {q.text}
                        </p>
                        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 gap-2">
                            {Array.from(
                                { length: config.scale.max - config.scale.min + 1 },
                                (_, i) => config.scale.min + i
                            ).map(value => (
                                <label
                                    key={value}
                                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors text-sm ${
                                        responses[q.id] === value
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={value}
                                        checked={responses[q.id] === value}
                                        onChange={() => handleResponse(q.id, value)}
                                        className="form-radio text-primary-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {config.scale.labels[value]}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress + Submit */}
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {answeredCount} / {totalQuestions} answered
                </p>
                <button
                    onClick={handleSubmit}
                    disabled={submitting || !allAnswered}
                    className="btn bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50"
                >
                    {submitting ? 'Scoring...' : 'View My Results'}
                </button>
            </div>
        </section>
    );
}

// ── Sub-components ──

function DownloadIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    );
}

function ClipboardIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
    );
}

function ScoreBar({ score, bands, maxScore }: { score: number; bands: SeverityBand[]; maxScore: number }) {
    const percentage = Math.round((score / maxScore) * 100);

    return (
        <div className="mt-4">
            {/* Bar */}
            <div className="relative h-4 rounded-full overflow-hidden flex">
                {bands.map((band) => {
                    const width = ((band.max - band.min + 1) / (maxScore + 1)) * 100;
                    const colors = BAND_COLORS[band.color] || BAND_COLORS.green;
                    return (
                        <div
                            key={band.severity}
                            className={`${colors.fill} opacity-30 h-full`}
                            style={{ width: `${width}%` }}
                        />
                    );
                })}
                {/* Animated score indicator */}
                <motion.div
                    className="absolute top-0 h-full w-1 bg-gray-800 dark:bg-white rounded-full"
                    initial={{ left: '0%' }}
                    animate={{ left: `${Math.min(percentage, 98)}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
            </div>
            {/* Labels */}
            <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">0</span>
                <span className="text-xs text-gray-400">{maxScore}</span>
            </div>
        </div>
    );
}

function AnimatedScore({ value, className }: { value: number; className?: string }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (value === 0) { setDisplay(0); return; }
        const duration = 800;
        const steps = Math.min(value, 30);
        const interval = duration / steps;
        let current = 0;
        const timer = setInterval(() => {
            current++;
            setDisplay(Math.round((current / steps) * value));
            if (current >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, [value]);

    return <span className={className}>{display}</span>;
}

function CrisisBanner() {
    return (
        <div className="mt-6 p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-500/40">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white flex-shrink-0 text-lg font-bold">
                    !
                </div>
                <div>
                    <p className="font-bold text-red-800 dark:text-red-300 text-base">
                        Your responses indicate you may need support right now
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-2">
                        Based on your answers, we want to make sure you have access to support.
                        If you are having thoughts of self-harm or suicide, please reach out:
                    </p>
                    <div className="mt-3 space-y-2">
                        <p className="text-sm font-bold text-red-800 dark:text-red-300">
                            988 Suicide & Crisis Lifeline — Call or text <span className="text-lg">988</span>
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-400">
                            Crisis Text Line — Text HOME to <span className="font-bold">741741</span>
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-400">
                            If you are in immediate danger, call <span className="font-bold">911</span>
                        </p>
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-3">
                        This educational tool is not a substitute for professional mental health care.
                    </p>
                </div>
            </div>
        </div>
    );
}
