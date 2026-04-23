'use client'

import { useCallback } from 'react'

const WELLNESS_CATEGORIES = [
  { name: 'Anxiety Support', slug: 'anxiety-support', color: 'text-green-500' },
  { name: 'Mindfulness', slug: 'mindfulness', color: 'text-blue-500' },
  { name: 'Coping Strategies', slug: 'coping-strategies', color: 'text-purple-500' },
  { name: 'Peer Stories', slug: 'peer-stories', color: 'text-amber-500' },
  { name: 'Depression & Mood', slug: 'depression-mood', color: 'text-teal-500' },
  { name: 'Self-Care', slug: 'self-care', color: 'text-pink-500' },
  { name: 'Relationship Health', slug: 'relationship-health', color: 'text-red-500' },
  { name: 'Academic Stress', slug: 'academic-stress', color: 'text-indigo-500' },
]

export default function ForumLeftContent({
  activeTag,
  onTagChange,
  showBookmarks,
  onToggleBookmarks,
}: {
  activeTag?: string
  onTagChange?: (tag: string | undefined) => void
  showBookmarks?: boolean
  onToggleBookmarks?: () => void
}) {
  const handleTagClick = useCallback(
    (slug: string) => {
      onTagChange?.(activeTag === slug ? undefined : slug)
      if (showBookmarks) onToggleBookmarks?.()
    },
    [activeTag, onTagChange, showBookmarks, onToggleBookmarks],
  )

  return (
    <div className="w-full md:w-[15rem] mb-8 md:mb-0">
      <div className="md:sticky md:top-16 md:h-[calc(100dvh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          <div className="flex justify-between items-center md:block">
            {/* Title */}
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Forum</h1>
            </header>

            {/* Button */}
            <div className="xl:hidden mb-6">
              <button className="btn md:w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Create Post</button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-4 md:space-y-3 -mx-4">
            {/* Navigation */}
            <div>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 md:sr-only">Menu</div>
              <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <button
                    onClick={() => {
                      onTagChange?.(undefined)
                      if (showBookmarks) onToggleBookmarks?.()
                    }}
                    className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap w-full text-left ${!activeTag && !showBookmarks ? 'bg-white dark:bg-gray-800' : ''}`}
                  >
                    <svg className={`shrink-0 fill-current ${!activeTag && !showBookmarks ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'} mr-2`} width="16" height="16" viewBox="0 0 16 16">
                      <path d="M4.904 10.114a.98.98 0 0 1 0-1.961h5.886a.98.98 0 0 1 0 1.961H4.904ZM2.863 5.166a1.962 1.962 0 0 0-.901 1.651v5.26c0 1.083.878 1.961 1.961 1.961h7.85a1.962 1.962 0 0 0 1.961-1.961v-5.26c0-.668-.34-1.29-.901-1.65L7.848 1.961 2.863 5.166ZM6.786.312a1.962 1.962 0 0 1 2.123 0l4.985 3.204a3.923 3.923 0 0 1 1.802 3.301v5.26A3.923 3.923 0 0 1 11.772 16H3.923A3.923 3.923 0 0 1 0 12.077v-5.26c0-1.335.679-2.579 1.802-3.3L6.786.311Z" />
                    </svg>
                    <span className={`text-sm font-medium ${!activeTag && !showBookmarks ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300'}`}>All Discussions</span>
                  </button>
                </li>
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <button
                    onClick={() => {
                      onToggleBookmarks?.()
                      if (!showBookmarks) onTagChange?.(undefined)
                    }}
                    className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap w-full text-left ${showBookmarks ? 'bg-white dark:bg-gray-800' : ''}`}
                  >
                    <svg className={`shrink-0 fill-current ${showBookmarks ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'} mr-2`} width="16" height="16" viewBox="0 0 16 16">
                      <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                    </svg>
                    <span className={`text-sm font-medium ${showBookmarks ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}>My Bookmarks</span>
                  </button>
                </li>
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap" href="/resources/crisis">
                    <svg className="shrink-0 fill-current text-red-400 mr-2" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm0 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V4a1 1 0 1 1 2 0v4Z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Crisis Resources</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Wellness Categories */}
            <div>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3">Categories</div>
              <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                {WELLNESS_CATEGORIES.map((cat) => (
                  <li key={cat.slug} className="mr-0.5 md:mr-0 md:mb-0.5">
                    <button
                      onClick={() => handleTagClick(cat.slug)}
                      className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap w-full text-left ${activeTag === cat.slug ? 'bg-white dark:bg-gray-800' : ''}`}
                    >
                      <svg className={`w-3 h-3 shrink-0 fill-current ${cat.color} mr-3`} viewBox="0 0 12 12">
                        <path d="M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2A6 6 0 1 1 6 0a6 6 0 0 1 0 12Z" />
                      </svg>
                      <span className={`text-sm font-medium ${activeTag === cat.slug ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300'}`}>
                        {cat.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
