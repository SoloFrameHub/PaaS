'use client'

import Link from 'next/link'
import { useState } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { useDiscussion, useCreatePost, useLikePost } from '@/hooks/useForum'
import type { ForumPost } from '@/types/forum'

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'code', 'pre'],
  ALLOWED_ATTR: ['href', 'target']
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

function Comment({
  post,
  onLike,
}: {
  post: ForumPost
  onLike: (postId: string, liked: boolean) => void
}) {
  return (
    <li className="relative pl-9 space-y-5">
      <div className="flex items-start">
        {/* Upvote */}
        <div className="absolute top-0 left-0">
          <button
            onClick={() => onLike(post.id, post.hasLiked)}
            className="text-xs font-semibold text-left w-6 rounded-xs flex flex-col justify-center items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
          >
            <svg className={`inline-flex ${post.hasLiked ? 'fill-primary-500' : 'fill-gray-400 dark:fill-gray-500'} mt-1.5 mb-1.5`} width="12" height="6" xmlns="http://www.w3.org/2000/svg">
              <path d="m0 6 6-6 6 6z" />
            </svg>
            <div>{post.votes}</div>
          </button>
        </div>
        {/* Content */}
        <div>
          <div className="grow text-sm text-gray-800 dark:text-gray-100 space-y-2 mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contentHtml, SANITIZE_OPTIONS) }} />
          <div className="flex flex-wrap text-xs">
            <div className="flex items-center after:block after:content-['\00B7'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
              {post.author.avatarUrl && (
                <img className="rounded-full mr-2" src={post.author.avatarUrl} width={24} height={24} alt={post.author.displayName} />
              )}
              <span className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                {post.author.displayName}
              </span>
            </div>
            <div className="flex items-center after:block after:content-['\00B7'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
              <span className="text-gray-500">{formatRelativeTime(post.createdAt)}</span>
            </div>
            <div className="flex items-center after:block after:content-['\00B7'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
              <button className="font-medium text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function ForumEntryDynamic({ discussionId }: { discussionId: string }) {
  const { data, loading, error, refetch } = useDiscussion(discussionId)
  const { createPost, submitting } = useCreatePost()
  const { toggleLike } = useLikePost()
  const [comment, setComment] = useState('')

  const handleLike = async (postId: string, currentlyLiked: boolean) => {
    try {
      await toggleLike(postId, currentlyLiked)
      refetch()
    } catch {
      // silently fail
    }
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    try {
      await createPost({ discussionId, content: comment })
      setComment('')
      refetch()
    } catch {
      // handle error
    }
  }

  if (loading) {
    return (
      <div data-testid="post-detail" className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 text-center">
        <p className="text-gray-500 dark:text-gray-400">Discussion not found or temporarily unavailable</p>
        <Link className="text-sm text-primary-500 hover:text-primary-600 mt-2 inline-block" href="/community/forum">
          Back to Forum
        </Link>
      </div>
    )
  }

  const { discussion, posts } = data
  const firstPost = posts[0]
  const comments = posts.slice(1)

  return (
    <article data-testid="post-detail" className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
      {/* Breadcrumbs */}
      <div className="mb-2">
        <ul className="inline-flex flex-wrap text-sm font-medium">
          <li className="flex items-center">
            <Link className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-500" href="/community/forum">
              Home
            </Link>
            <svg className="fill-current text-gray-400 dark:text-gray-500 mx-2" width="16" height="16" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400">Discussion</span>
          </li>
        </ul>
      </div>

      {/* Header */}
      <header className="pb-4">
        <div className="flex items-start space-x-3 mb-3">
          {/* Tag badges */}
          <div className="grow">
            {discussion.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mr-1 mb-1"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
            <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mt-1">{discussion.title}</h2>
          </div>
          {/* Upvote button */}
          <div className="shrink-0">
            <button className="text-xs font-semibold text-center h-12 w-12 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 rounded-lg flex flex-col justify-center items-center">
              <svg className="inline-flex fill-gray-400 dark:fill-gray-500 mt-1.5 mb-1.5" width="12" height="6" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 6 6-6 6 6z" />
              </svg>
              <div>{discussion.votes}</div>
            </button>
          </div>
        </div>
        {/* Meta */}
        <div className="flex flex-wrap text-sm">
          <div className="flex items-center after:block after:content-['\00B7'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
            <Link className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" data-testid="post-author-link" href="/community/profile">
              {discussion.author.displayName}
            </Link>
          </div>
          <div className="flex items-center after:block after:content-['\00B7'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
            <span className="text-gray-500">{formatRelativeTime(discussion.createdAt)}</span>
          </div>
          <div className="flex items-center after:block after:content-['\00B7'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
            <span className="text-gray-500">{discussion.commentCount} Comment{discussion.commentCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </header>

      {/* First post content */}
      {firstPost && (
        <div className="space-y-4 mb-6 text-gray-800 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(firstPost.contentHtml, SANITIZE_OPTIONS) }} />
      )}

      {/* Comment form */}
      <form onSubmit={handleReply}>
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="grow">
            <label htmlFor="comment" className="sr-only">Write a comment...</label>
            <textarea
              id="comment"
              className="form-textarea w-full focus:border-gray-300"
              rows={4}
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            disabled={submitting || !comment.trim()}
            className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Reply ->'}
          </button>
        </div>
      </form>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Comments</h3>
          <ul className="space-y-5">
            {comments.map((post) => (
              <Comment key={post.id} post={post} onLike={handleLike} />
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
