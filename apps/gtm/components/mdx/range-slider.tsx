"use client";

import { useState, useEffect } from "react";

interface RangeSliderProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  lowLabel?: string;
  highLabel?: string;
  persistKey?: string;
}

export default function RangeSlider({
  label,
  min = 0,
  max = 10,
  step = 1,
  defaultValue,
  lowLabel,
  highLabel,
  persistKey,
}: RangeSliderProps) {
  const [value, setValue] = useState(() => {
    if (persistKey && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`slider-${persistKey}`);
        if (stored !== null) return Number(stored);
      } catch {}
    }
    return defaultValue ?? Math.floor((max + min) / 2);
  });

  // Save to localStorage on change
  useEffect(() => {
    if (!persistKey) return;
    try {
      localStorage.setItem(`slider-${persistKey}`, String(value));
    } catch {}
  }, [value, persistKey]);

  return (
    <div className="not-prose my-6 p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <label className="block font-bold text-gray-800 dark:text-gray-100 text-sm mb-4">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 accent-primary-500 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
        <span className="shrink-0 w-12 text-center text-xl font-bold text-primary-600 dark:text-primary-400">
          {value}
        </span>
      </div>
      {(lowLabel || highLabel) && (
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-500">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}
