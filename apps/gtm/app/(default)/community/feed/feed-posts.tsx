"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useLocale } from 'next-intl';

interface FeedPost {
  tid: number;
  title: string;
  content: string;
  author: {
    uid: number;
    username: string;
    displayname: string;
    picture: string | null;
    iconBgColor: string;
    iconText: string;
  };
  timestamp: number;
  timestampISO: string;
  likes: number;
  votes: number;
  postCount: number;
  viewCount: number;
  category: { cid: number; name: string; slug: string };
  mainPid: number;
  slug: string;
}

function timeAgo(iso: string, isEs = false): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return isEs ? 'ahora mismo' : 'just now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}s`;
}

function Avatar({ author }: { author: FeedPost["author"] }) {
  if (author.picture) {
    return (
      <img
        className="rounded-full shrink-0 w-10 h-10"
        src={author.picture}
        alt={author.displayname}
      />
    );
  }
  return (
    <div
      className="rounded-full shrink-0 w-10 h-10 flex items-center justify-center text-white text-sm font-bold"
      style={{ backgroundColor: author.iconBgColor }}
    >
      {author.iconText}
    </div>
  );
}

export default function FeedPosts() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchPosts(0);
  }, []);

  async function fetchPosts(pageNum: number) {
    try {
      setLoading(true);
      const res = await fetch(`/api/community/feed?page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to load feed");
      const { data } = await res.json();
      if (pageNum === 0) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVote(tid: number, mainPid: number, delta: number) {
    if (!mainPid) return;
    try {
      await fetch(`/api/community/feed/${tid}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: mainPid, delta }),
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.tid === tid
            ? { ...p, votes: p.votes + delta, likes: p.likes + delta }
            : p,
        ),
      );
    } catch {
      // Silently fail
    }
  }

  if (loading && posts.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 animate-pulse"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-3">
          Could not load the feed.
        </p>
        <button
          onClick={() => fetchPosts(0)}
          className="text-sm font-medium text-primary-500 hover:text-primary-600"
        >
          Try again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          No posts yet — be the first!
        </p>
        <p className="text-xs text-gray-400">
          Share a win, ask a question, or start a discussion.
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.tid}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden"
        >
          <div className="flex">
            {/* Upvote column */}
            <div className="shrink-0 w-16 flex flex-col items-center justify-center py-5 bg-gray-50 dark:bg-gray-800/80 border-r border-gray-100 dark:border-gray-700/40">
              <button
                onClick={() => handleVote(post.tid, post.mainPid, 1)}
                className="text-gray-400 hover:text-primary-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="fill-current"
                  width="12"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.664 6.747.336 5.253 5.5.662l5.164 4.591-1.328 1.494L5.5 3.338z" />
                </svg>
              </button>
              <span
                className={`text-sm font-semibold my-1 ${post.votes > 0 ? "text-primary-500" : "text-gray-500 dark:text-gray-400"}`}
              >
                {post.votes}
              </span>
              <button
                onClick={() => handleVote(post.tid, post.mainPid, -1)}
                className="text-gray-400 hover:text-red-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="fill-current rotate-180"
                  width="12"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.664 6.747.336 5.253 5.5.662l5.164 4.591-1.328 1.494L5.5 3.338z" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-5">
              {/* Header */}
              <header className="flex items-center space-x-3 mb-3">
                <Avatar author={post.author} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {post.author.displayname}
                    </span>
                    {post.category.name && (
                      <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                        {post.category.name}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {timeAgo(post.timestampISO, isEs)}
                  </div>
                </div>
              </header>

              {/* Title */}
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                <Link
                  href={`/community/feed/${post.tid}`}
                  className="hover:text-primary-500 transition duration-150 ease-in-out"
                >
                  {post.title}
                </Link>
              </h3>

              {/* Body preview */}
              {post.content && (
                <div
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content),
                  }}
                />
              )}

              {/* Footer */}
              <footer className="flex items-center space-x-4 text-sm">
                <Link
                  href={`/community/feed/${post.tid}`}
                  className="flex items-center text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="shrink-0 fill-current mr-1.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">
                    {post.postCount > 1
                      ? `${post.postCount - 1} ${isEs ? 'comentarios' : 'Comments'}`
                      : (isEs ? '0 comentarios' : '0 Comments')}
                  </span>
                </Link>
                <span className="flex items-center text-gray-400 dark:text-gray-500">
                  <svg
                    className="shrink-0 fill-current mr-1.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3C4.511 3 1.486 5.032.163 7.92a.326.326 0 000 .16C1.486 10.968 4.511 13 8 13s6.514-2.032 7.837-4.92a.326.326 0 000-.16C14.514 5.032 11.489 3 8 3zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                    <circle cx="8" cy="8" r="1.5" />
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">
                    {post.viewCount}
                  </span>
                </span>
              </footer>
            </div>
          </div>
        </div>
      ))}

      {/* Load more */}
      {hasMore && (
        <div className="text-center py-4">
          <button
            onClick={() => fetchPosts(page + 1)}
            disabled={loading}
            className="btn-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-primary-500 disabled:opacity-50"
          >
            {loading ? (isEs ? 'Cargando...' : 'Loading...') : (isEs ? 'Ver más' : 'Show More')}{" "}
            <span className="tracking-normal ml-1">&rarr;</span>
          </button>
        </div>
      )}
    </>
  );
}
