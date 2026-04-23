'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateDiscussion } from '@/hooks/useForum'

const CATEGORIES = [
  { id: '1', name: 'Anxiety Support', slug: 'anxiety-support' },
  { id: '2', name: 'Mindfulness', slug: 'mindfulness' },
  { id: '3', name: 'Coping Strategies', slug: 'coping-strategies' },
  { id: '4', name: 'Peer Stories', slug: 'peer-stories' },
  { id: '5', name: 'Depression & Mood', slug: 'depression-mood' },
  { id: '6', name: 'Self-Care', slug: 'self-care' },
  { id: '7', name: 'Relationship Health', slug: 'relationship-health' },
  { id: '8', name: 'Academic Stress', slug: 'academic-stress' },
]

export default function CreatePostModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const { createDiscussion, submitting } = useCreateDiscussion()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (title.length < 5) {
      setError('Title must be at least 5 characters')
      return
    }
    if (content.length < 10) {
      setError('Content must be at least 10 characters')
      return
    }
    if (selectedTags.length === 0) {
      setError('Please select at least one category')
      return
    }

    try {
      const discussion = await createDiscussion({
        title,
        content,
        tagIds: selectedTags,
      })
      setTitle('')
      setContent('')
      setSelectedTags([])
      onClose()
      router.push(`/community/forum/post/${discussion.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create discussion')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Cruip-style gradient border */}
        <div
          className="absolute inset-0 -m-px pointer-events-none -z-10 rounded-xl before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-t before:from-gray-200 before:to-gray-100 dark:before:from-gray-700 dark:before:to-gray-800 after:absolute after:inset-0 after:bg-white after:m-px after:rounded-xl dark:after:bg-gray-800"
          aria-hidden="true"
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Start a Discussion</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.819l-2.651 3.03a1.2 1.2 0 11-1.697-1.697l2.758-3.15L5.651 6.849a1.2 1.2 0 111.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 111.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 010 1.698z" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="post-title">
                Title
              </label>
              <input
                id="post-title"
                type="text"
                className="form-input w-full"
                placeholder="What would you like to discuss?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="post-content">
                Content
              </label>
              <textarea
                id="post-content"
                className="form-textarea w-full"
                rows={6}
                placeholder="Share your thoughts, experiences, or questions..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleTag(cat.id)}
                    className={`text-xs font-medium px-3 py-1 rounded-full border transition duration-150 ease-in-out ${
                      selectedTags.includes(cat.id)
                        ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-500 mb-4">{error}</div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Discussion'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
