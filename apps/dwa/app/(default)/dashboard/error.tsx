'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the full error client-side for debugging
    console.error('[Dashboard Error]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
    })
  }, [error])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Show a functional dashboard-like layout even in error state */}
      <div className="relative bg-gradient-to-br from-primary-500 to-violet-500 dark:from-primary-600 dark:to-violet-600 p-8 rounded-3xl mb-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Loading Issue</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            We hit a snag loading your dashboard. Your data is safe.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-red-100 dark:border-red-900/30 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          What happened
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || 'The dashboard encountered an unexpected error during loading.'}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/academy"
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Go to Academy
          </Link>
          <Link
            href="/coach"
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Talk to Coach
          </Link>
        </div>
      </div>

      {/* Still show navigation to useful pages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/academy" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700/60 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Course Catalog</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Browse and continue your courses</p>
        </Link>
        <Link href="/coach" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700/60 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Wellness Coach</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized guidance</p>
        </Link>
        <Link href="/settings/account" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700/60 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Settings</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account</p>
        </Link>
      </div>
    </div>
  )
}
