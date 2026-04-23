"use client";

import { useState } from "react";

export default function DocsFeedback() {
  const [selected, setSelected] = useState<number | null>(null);

  const emojis = [
    { label: "No, it didn't help", emoji: "😞" },
    { label: "Still feel confused", emoji: "😕" },
    { label: "Sounds good!", emoji: "😊" },
    { label: "Excellent article", emoji: "🤩" },
  ];

  return (
    <div className="flex items-center justify-between py-8 border-b border-slate-200 space-x-6 dark:border-slate-800">
      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
        Was this helpful?
      </div>
      <div className="flex items-center space-x-4">
        {emojis.map((item, index) => (
          <button
            key={index}
            className={`text-xl transition-opacity ${selected === null ? (index === 2 ? "opacity-100" : "opacity-30") : selected === index ? "opacity-100" : "opacity-30"} hover:opacity-100`}
            onClick={() => setSelected(index)}
          >
            <span className="sr-only">{item.label}</span>
            {item.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
