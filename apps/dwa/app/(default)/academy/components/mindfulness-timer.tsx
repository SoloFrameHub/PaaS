'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS = [
    { label: '1 min', seconds: 60 },
    { label: '3 min', seconds: 180 },
    { label: '5 min', seconds: 300 },
    { label: '10 min', seconds: 600 },
] as const;

const BELL_FREQUENCY = 528; // Hz — "healing frequency" C5, gentle tone

/** Generate a meditation bell sound using Web Audio API */
function playBell(ctx: AudioContext, type: 'start' | 'interval' | 'end') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(BELL_FREQUENCY, ctx.currentTime);

    const volume = type === 'end' ? 0.3 : type === 'start' ? 0.25 : 0.15;
    const duration = type === 'end' ? 3 : type === 'start' ? 2 : 1.5;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    // Add a harmonic for richness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(BELL_FREQUENCY * 2, ctx.currentTime);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.6);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + duration * 0.6);
}

function formatTime(s: number): string {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MindfulnessTimer() {
    const [duration, setDuration] = useState(180); // 3 min default
    const [remaining, setRemaining] = useState(180);
    const [running, setRunning] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [bellEnabled, setBellEnabled] = useState(true);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const getAudioCtx = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
        }
        return audioCtxRef.current;
    }, []);

    const ring = useCallback((type: 'start' | 'interval' | 'end') => {
        if (!bellEnabled) return;
        try {
            playBell(getAudioCtx(), type);
        } catch {
            // Audio not available — silent fallback
        }
    }, [bellEnabled, getAudioCtx]);

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1) {
                    setRunning(false);
                    setCompleted(true);
                    ring('end');
                    return 0;
                }
                // Interval bell at halfway
                if (prev === Math.floor(duration / 2) + 1) {
                    ring('interval');
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [running, duration, ring]);

    const handleStart = () => {
        setRunning(true);
        setCompleted(false);
        ring('start');
    };

    const handlePause = () => {
        setRunning(false);
    };

    const handleReset = () => {
        setRunning(false);
        setCompleted(false);
        setRemaining(duration);
    };

    const handlePreset = (seconds: number) => {
        setDuration(seconds);
        setRemaining(seconds);
        setRunning(false);
        setCompleted(false);
    };

    // Progress for the ring (0 to 1)
    const progress = 1 - remaining / duration;
    const circumference = 2 * Math.PI * 90;
    const strokeOffset = circumference * (1 - progress);

    return (
        <figure className="my-10 not-prose">
            <div className="max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200/80 dark:border-purple-800/60 p-4 sm:p-8 shadow-sm">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Mindfulness Timer
                    </h3>
                    <p className="text-sm text-gray-500">
                        Sit comfortably, close your eyes, and focus on your breath.
                    </p>
                </div>

                {/* Preset buttons */}
                <div className="flex justify-center gap-2 mb-6">
                    {PRESETS.map(p => (
                        <button
                            key={p.seconds}
                            onClick={() => handlePreset(p.seconds)}
                            disabled={running}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                                duration === p.seconds
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 disabled:opacity-50'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Timer ring */}
                <div className="relative flex items-center justify-center mx-auto w-44 h-44 sm:w-52 sm:h-52 mb-6">
                    <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
                        {/* Background ring */}
                        <circle
                            cx="100" cy="100" r="90"
                            fill="none"
                            stroke="rgba(139,92,246,0.1)"
                            strokeWidth="6"
                        />
                        {/* Progress ring */}
                        <motion.circle
                            cx="100" cy="100" r="90"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            animate={{ strokeDashoffset: strokeOffset }}
                            transition={{ duration: 0.5, ease: 'linear' }}
                        />
                    </svg>

                    {/* Center content */}
                    <div className="text-center z-10">
                        <AnimatePresence mode="wait">
                            {completed ? (
                                <motion.div
                                    key="done"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <p className="text-3xl mb-1">🔔</p>
                                    <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                        Session Complete
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <p className="text-4xl font-black text-gray-800 dark:text-gray-100 tabular-nums">
                                        {formatTime(remaining)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {running ? 'Focus on your breath...' : 'Ready'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3">
                    {!running && !completed && (
                        <motion.button
                            onClick={handleStart}
                            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-purple-500 hover:bg-purple-600 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            {remaining < duration ? 'Resume' : 'Begin Session'}
                        </motion.button>
                    )}
                    {running && (
                        <motion.button
                            onClick={handlePause}
                            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-purple-500 hover:bg-purple-600 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            Pause
                        </motion.button>
                    )}
                    {(running || remaining < duration) && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleReset}
                            className="px-4 py-2.5 rounded-xl font-bold text-sm text-gray-500 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset
                        </motion.button>
                    )}
                </div>

                {/* Bell toggle */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                        onClick={() => setBellEnabled(b => !b)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <span>{bellEnabled ? '🔔' : '🔕'}</span>
                        Bell {bellEnabled ? 'on' : 'off'}
                    </button>
                </div>

                {/* Guidance */}
                <div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        <strong>Quick guide:</strong> Sit upright with feet flat on the floor.
                        Close your eyes or soften your gaze. Notice each breath — the air entering your nose,
                        filling your lungs, and leaving again. When your mind wanders (and it will), gently
                        return attention to your breath without judgment. A bell will chime at the halfway
                        mark and when the session ends.
                    </p>
                </div>
            </div>
        </figure>
    );
}
