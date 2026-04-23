'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfetti } from './use-confetti';
import { useComponentState } from './use-component-state';

/* ------------------------------------------------------------------ */
/*  Grounding steps                                                    */
/* ------------------------------------------------------------------ */

interface GroundingStep {
    count: number;
    sense: string;
    prompt: string;
    icon: ReactNode;
    color: string;
    bgColor: string;
}

const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const HandIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 0-.668-.668 1.667 1.667 0 0 1-1.667-1.667V5.25a1.575 1.575 0 1 0-3.15 0v4.5" />
    </svg>
);

const EarIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const NoseIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9m0 0c-2 2-4 3.5-5 5.5C6 19 8 21 12 21s6-2 5-3.5c-1-2-3-3.5-5-5.5Z" />
    </svg>
);

const TasteIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
);

const STEPS: GroundingStep[] = [
    { count: 5, sense: 'See', prompt: 'Look around and name 5 things you can see right now', icon: <EyeIcon />, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/40' },
    { count: 4, sense: 'Touch', prompt: 'Notice 4 things you can physically feel or touch', icon: <HandIcon />, color: 'text-teal-600 dark:text-teal-400', bgColor: 'bg-teal-100 dark:bg-teal-900/40' },
    { count: 3, sense: 'Hear', prompt: 'Listen carefully for 3 sounds around you', icon: <EarIcon />, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-100 dark:bg-cyan-900/40' },
    { count: 2, sense: 'Smell', prompt: 'Identify 2 things you can smell (or imagine smelling)', icon: <NoseIcon />, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/40' },
    { count: 1, sense: 'Taste', prompt: 'Notice 1 thing you can taste right now', icon: <TasteIcon />, color: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/40' },
];

const STORAGE_KEY = 'guided-grounding-exercise';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const COMPONENT_KEY = 'grounding';

export default function GuidedGrounding() {
    const [currentStep, setCurrentStep] = useState(-1); // -1 = intro
    const [inputs, setInputs] = useState<string[][]>(() =>
        STEPS.map(s => Array(s.count).fill(''))
    );
    const [completed, setCompleted] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { fireConfetti } = useConfetti();
    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);

    // Load persisted state: prefer server, fallback to localStorage
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('groundingExercises', COMPONENT_KEY);
        if (serverData && Array.isArray(serverData.inputs)) {
            setInputs(serverData.inputs);
            if (typeof serverData.step === 'number') {
                setCurrentStep(serverData.step);
            }
            return;
        }

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                if (Array.isArray(data.inputs)) {
                    setInputs(data.inputs);
                }
            }
        } catch { /* ignore */ }
    }, [serverLoading, getComponentData]);

    const persist = useCallback((newInputs: string[][], step?: number) => {
        // Save to server
        saveComponentData('groundingExercises', COMPONENT_KEY, {
            step: step ?? currentStep,
            inputs: newInputs,
        });
        // Fallback: also save to localStorage
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                inputs: newInputs,
                savedAt: new Date().toISOString(),
            }));
        } catch { /* storage full */ }
    }, [currentStep, saveComponentData]);

    const handleInput = useCallback((stepIdx: number, inputIdx: number, value: string) => {
        setInputs(prev => {
            const next = prev.map(arr => [...arr]);
            next[stepIdx][inputIdx] = value;
            persist(next);
            return next;
        });
    }, [persist]);

    const stepHasInput = currentStep >= 0 && currentStep < STEPS.length
        ? inputs[currentStep].some(v => v.trim().length > 0)
        : false;

    const goNext = useCallback(() => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setCompleted(true);
            fireConfetti({ intensity: 'medium' });
        }
    }, [currentStep, fireConfetti]);

    const goPrev = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const reset = useCallback(() => {
        const emptyInputs = STEPS.map(s => Array(s.count).fill(''));
        setCurrentStep(-1);
        setInputs(emptyInputs);
        setCompleted(false);
        // Clear server state
        saveComponentData('groundingExercises', COMPONENT_KEY, { step: -1, inputs: emptyInputs });
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }, [saveComponentData]);

    const step = currentStep >= 0 && currentStep < STEPS.length ? STEPS[currentStep] : null;

    // Focus first input when step changes
    useEffect(() => {
        if (currentStep >= 0 && !completed) {
            const timer = setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 350);
            return () => clearTimeout(timer);
        }
    }, [currentStep, completed]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="not-prose my-8"
        >
            <div className="max-w-sm mx-auto rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 overflow-hidden">
                {/* Header */}
                <div className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Grounding Exercise
                        </span>
                        {currentStep >= 0 && !completed && (
                            <span className="text-xs text-emerald-400 dark:text-emerald-500">
                                Step {currentStep + 1} of {STEPS.length}
                            </span>
                        )}
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-base">
                        5-4-3-2-1 Sensory Grounding
                    </p>
                </div>

                {/* Progress dots */}
                {currentStep >= 0 && !completed && (
                    <div className="flex justify-center gap-2 px-5 pb-3">
                        {STEPS.map((s, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i < currentStep
                                        ? 'bg-emerald-500 w-8'
                                        : i === currentStep
                                            ? 'bg-emerald-400 w-10'
                                            : 'bg-emerald-200 dark:bg-emerald-800 w-6'
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* Content area */}
                <div className="px-5 pb-5">
                    <AnimatePresence mode="wait">
                        {/* Intro screen */}
                        {currentStep === -1 && !completed && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-6"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xs mx-auto">
                                    This exercise anchors you in the present moment using your five senses.
                                    Take your time with each step — there is no rush.
                                </p>
                                <motion.button
                                    onClick={() => setCurrentStep(0)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Begin Exercise
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Active step */}
                        {step && !completed && (
                            <motion.div
                                key={`step-${currentStep}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* Count + sense */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center ${step.color}`}>
                                        {step.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-3xl font-black ${step.color}`}>
                                                {step.count}
                                            </span>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                                                things you {step.sense.toLowerCase()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {step.prompt}
                                        </p>
                                    </div>
                                </div>

                                {/* Input fields */}
                                <div className="space-y-2 mb-5">
                                    {Array.from({ length: step.count }).map((_, i) => (
                                        <input
                                            key={i}
                                            ref={el => { inputRefs.current[i] = el; }}
                                            type="text"
                                            value={inputs[currentStep][i]}
                                            onChange={e => handleInput(currentStep, i, e.target.value)}
                                            placeholder={`${i + 1}.`}
                                            className="w-full rounded-lg border border-emerald-200 dark:border-emerald-800
                                                bg-white dark:bg-gray-900 px-3 py-2 text-sm
                                                text-gray-800 dark:text-gray-200
                                                placeholder:text-gray-400 dark:placeholder:text-gray-600
                                                focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400
                                                transition-colors"
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    const nextInput = inputRefs.current[i + 1];
                                                    if (nextInput) {
                                                        nextInput.focus();
                                                    } else if (stepHasInput) {
                                                        goNext();
                                                    }
                                                }
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={goPrev}
                                        disabled={currentStep === 0}
                                        className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Back
                                    </button>
                                    <motion.button
                                        onClick={goNext}
                                        disabled={!stepHasInput}
                                        className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        whileTap={stepHasInput ? { scale: 0.95 } : undefined}
                                    >
                                        {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Completed screen */}
                        {completed && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <p className="font-bold text-gray-800 dark:text-gray-100 text-base mb-2">
                                    You are here. You are safe.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xs mx-auto">
                                    You just anchored yourself in the present moment through all five senses.
                                    This technique becomes more powerful the more you practice it.
                                </p>
                                <motion.button
                                    onClick={reset}
                                    className="px-5 py-2 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Practice Again
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
