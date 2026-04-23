'use client'

import { useState, useEffect, useCallback } from 'react'

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // Fetch bookmarks from server on mount
  useEffect(() => {
    fetch('/api/forum/bookmarks')
      .then((res) => {
        if (!res.ok) return { data: { ids: [] } }
        return res.json()
      })
      .then((json) => {
        setBookmarkedIds(new Set(json.data?.ids ?? []))
      })
      .catch(() => {
        // User not logged in or DB unavailable — silently degrade
      })
      .finally(() => setLoading(false))
  }, [])

  const toggleBookmark = useCallback((discussionId: string) => {
    setBookmarkedIds((prev) => {
      const removing = prev.has(discussionId)
      const next = new Set(prev)

      if (removing) {
        next.delete(discussionId)
      } else {
        next.add(discussionId)
      }

      // Fire-and-forget server sync
      fetch('/api/forum/bookmarks', {
        method: removing ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discussionId }),
      }).catch(() => {
        // Revert on failure
        setBookmarkedIds((cur) => {
          const reverted = new Set(cur)
          if (removing) {
            reverted.add(discussionId)
          } else {
            reverted.delete(discussionId)
          }
          return reverted
        })
      })

      return next
    })
  }, [])

  const isBookmarked = useCallback(
    (discussionId: string) => bookmarkedIds.has(discussionId),
    [bookmarkedIds],
  )

  return { bookmarkedIds, toggleBookmark, isBookmarked, loading }
}
