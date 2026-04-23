export default function CoachLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 space-y-6">
        {/* Chat header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Message placeholders */}
        <div className="space-y-4">
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-12 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse ml-auto" />
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>

        {/* Loading spinner */}
        <div className="flex justify-center pt-4">
          <div className="h-8 w-8 border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 rounded-full animate-spin" />
        </div>

        {/* Input placeholder */}
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}
