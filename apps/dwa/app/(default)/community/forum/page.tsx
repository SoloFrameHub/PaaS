'use client'

import { useState, useCallback } from 'react'
import ForumLeftContent from './forum-left-content'
import ForumEntries from './forum-entries'
import ForumRightContent from './forum-right-content'
import CreatePostModal from './create-post-modal'
import { useBookmarks } from '@/hooks/useBookmarks'

type SortOption = 'popular' | 'newest' | 'top'

export default function Forum() {
  const [sort, setSort] = useState<SortOption>('popular')
  const [activeTag, setActiveTag] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState<string | undefined>()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const { bookmarkedIds, toggleBookmark } = useBookmarks()

  const handleToggleBookmarks = useCallback(() => {
    setShowBookmarks((prev) => !prev)
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-[96rem] mx-auto">

      <div className="xl:flex">

        {/* Left + Middle content */}
        <div className="md:flex flex-1">

          {/* Left content */}
          <ForumLeftContent
            activeTag={activeTag}
            onTagChange={setActiveTag}
            showBookmarks={showBookmarks}
            onToggleBookmarks={handleToggleBookmarks}
          />

          {/* Middle content */}
          <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
            <div className="md:py-8">

              {/* Sorting tabs */}
              <div className="mb-4">
                <div className="border-b border-gray-200 dark:border-gray-700/60 pb-4">
                  <div className="text-center md:text-left md:flex justify-between items-center">
                    <ul className="grow inline-flex flex-wrap text-sm font-medium -mx-3 -my-1">
                      {(['popular', 'newest', 'top'] as const).map((option) => (
                        <li key={option} className="px-3 py-1">
                          <button
                            onClick={() => setSort(option)}
                            className={`relative transition duration-150 ease-in-out capitalize ${
                              sort === option
                                ? 'text-primary-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                          >
                            {sort === option && (
                              <svg className="fill-primary-500 absolute top-full" width="40" height="4" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="4" rx="2" fillOpacity=".64" />
                              </svg>
                            )}
                            <span>{option}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Forum Entries */}
              <div className="space-y-3">
                <ForumEntries
                  sort={sort}
                  tag={activeTag}
                  searchQuery={searchQuery}
                  showBookmarks={showBookmarks}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={toggleBookmark}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Right content */}
        <ForumRightContent
          onCreatePost={() => setShowCreateModal(true)}
          onSearch={(q) => setSearchQuery(q || undefined)}
        />

      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

    </div>
  )
}
