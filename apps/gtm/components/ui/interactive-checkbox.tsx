'use client'

import { useState } from 'react'

export default function InteractiveCheckbox({ children, checked: initialChecked }: { children?: React.ReactNode, checked?: boolean }) {
    const [checked, setChecked] = useState(initialChecked || false)

    return (
        <li className="flex items-start gap-3 my-2 list-none group">
            <button
                onClick={() => setChecked(!checked)}
                className={`flex-shrink-0 mt-1 w-5 h-5 rounded border transition-all flex items-center justify-center
                    ${checked
                        ? 'bg-primary-500 border-primary-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 bg-white dark:bg-gray-800'
                    }`}
            >
                {checked && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>
            <span className={`text-gray-600 dark:text-gray-400 transition-all ${checked ? 'line-through opacity-50' : ''}`}>
                {children}
            </span>
        </li>
    )
}
