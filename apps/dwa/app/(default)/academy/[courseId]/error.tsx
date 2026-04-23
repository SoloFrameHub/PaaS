'use client'

import { useEffect } from 'react'

export default function CourseError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Course Error]', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="max-w-lg w-full text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-100 dark:border-red-900/30">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Course Error
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We couldn&apos;t load this course. Please try again.
        </p>
        {error.message && (
          <details className="mb-4 text-left">
            <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
              Error details
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs text-red-600 dark:text-red-400 overflow-auto max-h-48 whitespace-pre-wrap break-all">
              {error.message}
              {error.digest ? `\n\nDigest: ${error.digest}` : ''}
            </pre>
          </details>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <a
            href="/dashboard"
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
