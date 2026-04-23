'use client'

import Link from 'next/link'
import { useDiscussions } from '@/hooks/useForum'
import type { ForumDiscussion } from '@/types/forum'

function formatRelativeTime(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d`
  const months = Math.floor(days / 30)
  return `${months}mo`
}

function SkeletonCard() {
  return (
    <div className="relative bg-gradient-to-tr from-gray-50 via-white to-gray-50 dark:from-gray-800/20 dark:via-gray-800/50 dark:to-gray-800/20 rounded-xl">
      <div className="relative p-5">
        <div className="absolute inset-0 -m-px pointer-events-none -z-10 rounded-xl before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-t before:from-gray-200 before:to-gray-100 dark:before:from-gray-700 dark:before:to-gray-800 after:absolute after:inset-0 after:bg-white after:m-px after:rounded-xl dark:after:bg-gray-900" aria-hidden="true" />
        <div className="sm:flex items-center space-y-3 sm:space-y-0 sm:space-x-5 animate-pulse">
          <div className="shrink-0 w-16 h-8 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="grow space-y-3">
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex -space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscussionCard({
  discussion,
  isBookmarked,
  onToggleBookmark,
}: {
  discussion: ForumDiscussion
  isBookmarked: boolean
  onToggleBookmark: (id: string) => void
}) {
  const primaryTag = discussion.tags[0]
  return (
    <article className="relative bg-gradient-to-tr from-gray-50 via-white to-gray-50 dark:from-gray-800/20 dark:via-gray-800/50 dark:to-gray-800/20 rounded-xl">
      <div className="relative p-5">
        {/* Cruip-style gradient border */}
        <div
          className="absolute inset-0 -m-px pointer-events-none -z-10 rounded-xl before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-t before:from-gray-200 before:to-gray-100 dark:before:from-gray-700 dark:before:to-gray-800 after:absolute after:inset-0 after:bg-white after:m-px after:rounded-xl dark:after:bg-gray-900"
          aria-hidden="true"
        />
        <div className="sm:flex items-center space-y-3 sm:space-y-0 sm:space-x-5">
          {/* Horizontal upvote button (Cruip style) */}
          <div className="shrink-0">
            <button className="flex items-center text-left w-16 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700 bg-gradient-to-tr from-gray-50 via-white to-gray-50 dark:from-gray-800/20 dark:via-gray-800/50 dark:to-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
              <svg className="shrink-0 fill-primary-400 mr-1.5" width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.664 6.747.336 5.253 5.5.662l5.164 4.591-1.328 1.494L5.5 3.338z" />
              </svg>
              <span className="grow text-center text-xs font-medium text-primary-500">{discussion.votes}</span>
            </button>
          </div>

          {/* Bookmark toggle */}
          <div className="shrink-0">
            <button
              onClick={() => onToggleBookmark(discussion.id)}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this discussion'}
            >
              <svg className={`shrink-0 fill-current ${isBookmarked ? 'text-red-500' : 'text-gray-300 dark:text-gray-600'}`} width="14" height="14" viewBox="0 0 16 16">
                <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="grow lg:flex items-center justify-between space-y-5 lg:space-x-6 lg:space-y-0">
            <div>
              {/* Tag badge */}
              {primaryTag && (
                <span
                  className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-1"
                  style={{ backgroundColor: `${primaryTag.color}20`, color: primaryTag.color }}
                >
                  {primaryTag.name}
                </span>
              )}
              {/* Title */}
              <h2 className="mb-2">
                <Link
                  data-testid="post-link"
                  className="text-gray-800 dark:text-gray-100 font-semibold hover:text-primary-500 dark:hover:text-white transition duration-150 ease-in-out"
                  href={`/community/forum/post/${discussion.id}`}
                >
                  {discussion.title}
                </Link>
              </h2>
              {/* Meta */}
              <div className="flex items-center">
                {discussion.author.avatarUrl && (
                  <img
                    className="rounded-full mr-2"
                    src={discussion.author.avatarUrl}
                    width={16}
                    height={16}
                    alt={discussion.author.displayName}
                  />
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <Link
                    data-testid="post-author-link"
                    className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition duration-150 ease-in-out"
                    href="/community/profile"
                  >
                    {discussion.author.displayName}
                  </Link>
                  {' '}&middot;{' '}
                  <span>{formatRelativeTime(discussion.createdAt)}</span>
                  {' '}&middot;{' '}
                  <span>{discussion.commentCount} Comment{discussion.commentCount !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {/* Stacked commenter avatars (Cruip style) */}
            {discussion.recentCommenters.length > 0 && (
              <div className="shrink-0 flex -space-x-3 -ml-0.5">
                {discussion.recentCommenters.slice(0, 4).map((user) => (
                  <img
                    key={user.id}
                    className="rounded-full border-2 border-white dark:border-gray-900 box-content"
                    src={user.avatarUrl || '/images/default-avatar.png'}
                    width={24}
                    height={24}
                    alt={user.displayName}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ForumEntries({
  sort = 'popular',
  tag,
  searchQuery,
  showBookmarks,
  bookmarkedIds,
  onToggleBookmark,
}: {
  sort?: string
  tag?: string
  searchQuery?: string
  showBookmarks?: boolean
  bookmarkedIds?: Set<string>
  onToggleBookmark?: (id: string) => void
}) {
  const { data, loading, error } = useDiscussions({ sort, tag, q: searchQuery })

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-2">Community forum is temporarily unavailable</div>
        <p className="text-sm text-gray-500 dark:text-gray-600">Please try again later</p>
      </div>
    )
  }

  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </>
    )
  }

  if (!data?.discussions.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">No discussions yet</div>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Be the first to start a conversation</p>
      </div>
    )
  }

  const discussions = showBookmarks
    ? data.discussions.filter((d) => bookmarkedIds?.has(d.id))
    : data.discussions

  if (showBookmarks && discussions.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto mb-3 fill-current text-gray-300 dark:text-gray-600" width="32" height="32" viewBox="0 0 16 16">
          <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
        </svg>
        <div className="text-gray-500 dark:text-gray-400">No bookmarked discussions</div>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click the heart icon on a discussion to bookmark it</p>
      </div>
    )
  }

  return (
    <>
      {discussions.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          discussion={discussion}
          isBookmarked={bookmarkedIds?.has(discussion.id) ?? false}
          onToggleBookmark={onToggleBookmark ?? (() => {})}
        />
      ))}
    </>
  )
}
