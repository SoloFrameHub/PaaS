"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

interface ForumTopic {
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
  mainPid: number;
  postCount: number;
  viewCount: number;
  category: { cid: number; name: string; slug: string };
  slug: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

function Avatar({ author }: { author: ForumTopic["author"] }) {
  if (author.picture) {
    return (
      <img
        className="w-8 h-8 rounded-full"
        src={author.picture}
        alt={author.displayname}
      />
    );
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
      style={{ backgroundColor: author.iconBgColor }}
    >
      {author.iconText}
    </div>
  );
}

interface ForumEntriesProps {
  sort?: string;
  page?: number;
  onPageChange?: (page: number) => void;
  onTotalChange?: (hasMore: boolean) => void;
}

export default function ForumEntries({
  sort = "newest",
  page = 0,
  onPageChange,
  onTotalChange,
}: ForumEntriesProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, [sort, page]);

  async function fetchTopics() {
    try {
      setLoading(true);
      const res = await fetch(`/api/community/feed?page=${page}&sort=${sort}`);
      if (!res.ok) throw new Error("Failed to load forum");
      const { data } = await res.json();
      setTopics(data.posts || []);
      onTotalChange?.(data.hasMore);
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
      setTopics((prev) =>
        prev.map((t) => (t.tid === tid ? { ...t, votes: t.votes + delta } : t)),
      );
    } catch {
      // Silently fail
    }
  }

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4, 5].map((i) => (
          <article
            key={i}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 animate-pulse"
          >
            <div className="flex flex-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0 mt-1.5" />
              <div className="grow space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
              <div className="w-12 h-14 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
            </div>
          </article>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <article className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-3">
          {isEs ? 'No se pudieron cargar los temas del foro.' : 'Could not load forum topics.'}
        </p>
        <button
          onClick={fetchTopics}
          className="text-sm font-medium text-primary-500 hover:text-primary-600"
        >
          {isEs ? 'Intentar de nuevo' : 'Try again'}
        </button>
      </article>
    );
  }

  if (topics.length === 0) {
    return (
      <article className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {isEs ? '¡Aún no hay temas — ¡inicia la primera discusión!' : 'No topics yet — start the first discussion!'}
        </p>
      </article>
    );
  }

  return (
    <>
      {topics.map((topic) => (
        <article
          key={topic.tid}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5"
        >
          <div className="flex flex-start space-x-4">
            {/* Avatar */}
            <div className="shrink-0 mt-1.5">
              <Avatar author={topic.author} />
            </div>
            {/* Content */}
            <div className="grow min-w-0">
              {/* Title */}
              <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                <Link
                  href={`/community/feed/${topic.tid}`}
                  className="hover:text-primary-500 transition duration-150 ease-in-out"
                >
                  {topic.title}
                </Link>
              </h2>
              {/* Content preview */}
              {topic.content && (
                <div
                  className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(topic.content),
                  }}
                />
              )}
              {/* Footer */}
              <footer className="flex flex-wrap text-sm">
                <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
                  <span className="font-medium text-primary-500">
                    {topic.author.username}
                  </span>
                </div>
                <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
                  <span className="text-gray-500">
                    {timeAgo(topic.timestampISO)}
                  </span>
                </div>
                <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-gray-400 dark:after:text-gray-600 after:px-2">
                  <span className="text-gray-500">
                    {topic.postCount > 1
                      ? `${topic.postCount - 1} ${isEs ? 'comentarios' : 'Comments'}`
                      : `0 ${isEs ? 'comentarios' : 'Comments'}`}
                  </span>
                </div>
                {topic.category.name && (
                  <div className="flex items-center">
                    <span className="inline-flex text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {topic.category.name}
                    </span>
                  </div>
                )}
              </footer>
            </div>
            {/* Upvote button */}
            <div className="shrink-0">
              <button
                onClick={() => handleVote(topic.tid, topic.mainPid, 1)}
                className={`text-xs font-semibold text-center h-14 w-12 border rounded-lg flex flex-col justify-center items-center transition duration-150 ease-in-out hover:border-primary-500/60 ${
                  topic.votes > 0
                    ? "border-primary-500/60"
                    : "border-gray-200 dark:border-gray-700/60"
                }`}
              >
                <svg
                  className={`inline-flex mt-1.5 mb-1 ${
                    topic.votes > 0
                      ? "fill-primary-500"
                      : "fill-gray-400 dark:fill-gray-500"
                  }`}
                  width="12"
                  height="6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m0 6 6-6 6 6z" />
                </svg>
                <div className={topic.votes > 0 ? "text-primary-500" : ""}>
                  {topic.votes}
                </div>
              </button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
