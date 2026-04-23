'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
    { label: 'Breathe In', duration: 4, instruction: 'Inhale slowly through your nose' },
    { label: 'Hold', duration: 4, instruction: 'Hold your breath gently' },
    { label: 'Breathe Out', duration: 4, instruction: 'Exhale slowly through your mouth' },
    { label: 'Hold', duration: 4, instruction: 'Rest before the next breath' },
] as const;

const PHASE_COLORS = [
    { ring: 'rgb(20 184 166)', bg: 'rgba(20, 184, 166, 0.1)' },  // teal - inhale
    { ring: 'rgb(99 102 241)', bg: 'rgba(99, 102, 241, 0.1)' },   // indigo - hold
    { ring: 'rgb(59 130 246)', bg: 'rgba(59, 130, 246, 0.1)' },   // blue - exhale
    { ring: 'rgb(139 92 246)', bg: 'rgba(139, 92, 246, 0.1)' },   // violet - hold
];

// Circle scale per phase: expand on inhale, stay on hold, contract on exhale, stay on hold
const PHASE_SCALES = [1.4, 1.4, 0.7, 0.7];

export default function InteractiveBreathingExercise() {
    const [running, setRunning] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState<number>(PHASES[0].duration);
    const [cycleCount, setCycleCount] = useState(0);

    const phase = PHASES[phaseIndex];
    const color = PHASE_COLORS[phaseIndex];

    const reset = useCallback(() => {
        setRunning(false);
        setPhaseIndex(0);
        setCountdown(PHASES[0].duration);
        setCycleCount(0);
    }, []);

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    // Advance to next phase
                    setPhaseIndex(pi => {
                        const next = (pi + 1) % PHASES.length;
                        if (next === 0) setCycleCount(c => c + 1);
                        // Set countdown for the next phase using the updater's current value
                        setCountdown(PHASES[next].duration);
                        return next;
                    });
                    return prev; // Will be overwritten by setCountdown above
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [running, phaseIndex]);

    return (
        <figure className="my-10 not-prose" role="img" aria-label="Interactive box breathing exercise">
            <div className="max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 border border-teal-200/80 dark:border-teal-800/60 p-4 sm:p-8 shadow-sm">
                {/* Phase label */}
                <div className="text-center mb-6 h-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={phaseIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-100" aria-live="assertive">
                                {running ? phase.label : 'Box Breathing'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {running ? phase.instruction : '4-4-4-4 breathing technique'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Breathing circle */}
                <div className="relative flex items-center justify-center h-48">
                    {/* Outer pulse ring */}
                    <motion.div
                        className="absolute rounded-full"
                        style={{ backgroundColor: color.bg }}
                        animate={{
                            width: running ? 180 : 140,
                            height: running ? 180 : 140,
                            scale: running ? PHASE_SCALES[phaseIndex] : 1,
                        }}
                        transition={{
                            duration: phase.duration,
                            ease: phaseIndex === 0 || phaseIndex === 2 ? 'easeInOut' : 'linear',
                        }}
                    />

                    {/* Inner breathing circle */}
                    <motion.div
                        className="absolute rounded-full flex items-center justify-center"
                        style={{
                            background: `radial-gradient(circle, ${color.bg} 0%, transparent 70%)`,
                            border: `3px solid ${color.ring}`,
                        }}
                        animate={{
                            width: running ? 120 : 100,
                            height: running ? 120 : 100,
                            scale: running ? PHASE_SCALES[phaseIndex] : 1,
                        }}
                        transition={{
                            duration: phase.duration,
                            ease: phaseIndex === 0 || phaseIndex === 2 ? 'easeInOut' : 'linear',
                        }}
                    >
                        {/* Countdown number */}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={countdown}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.15 }}
                                className="text-3xl font-black text-gray-700 dark:text-gray-200"
                            >
                                {running ? countdown : ''}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Phase indicators (4 dots) */}
                <div className="flex justify-center gap-3 mt-4 mb-6">
                    {PHASES.map((p, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center gap-1"
                            animate={{ opacity: running && i === phaseIndex ? 1 : 0.4 }}
                        >
                            <motion.div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: PHASE_COLORS[i].ring }}
                                animate={{
                                    scale: running && i === phaseIndex ? 1.3 : 1,
                                }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                            <span className="text-[10px] text-gray-500 font-medium">{p.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3">
                    <motion.button
                        onClick={() => setRunning(r => !r)}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-teal-500 hover:bg-teal-600 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        {running ? 'Pause' : 'Start Breathing'}
                    </motion.button>
                    {(running || cycleCount > 0) && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={reset}
                            className="px-4 py-2.5 rounded-xl font-bold text-sm text-gray-500 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset
                        </motion.button>
                    )}
                </div>

                {/* Cycle counter */}
                {cycleCount > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xs text-gray-400 mt-3"
                    >
                        {cycleCount} cycle{cycleCount !== 1 ? 's' : ''} completed
                    </motion.p>
                )}
            </div>
        </figure>
    );
}
