"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

interface PostAuthor {
  uid: number;
  username: string;
  displayname: string;
  picture: string | null;
  iconBgColor: string;
  iconText: string;
}

interface TopicPost {
  pid: number;
  content: string;
  author: PostAuthor;
  timestamp: number;
  timestampISO: string;
  votes: number;
  upvotes: number;
  downvotes: number;
  isMainPost: boolean;
  index: number;
}

interface TopicData {
  tid: number;
  title: string;
  category: { cid: number; name: string; slug: string };
  posts: TopicPost[];
  postCount: number;
  viewCount: number;
  votes: number;
  timestampISO: string;
  locked: boolean;
}

function timeAgo(iso: string, isEs: boolean): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return isEs ? "ahora mismo" : "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function Avatar({ author, size = 40 }: { author: PostAuthor; size?: number }) {
  if (author.picture) {
    return (
      <img
        className="rounded-full shrink-0"
        src={author.picture}
        alt={author.displayname}
        width={size}
        height={size}
      />
    );
  }
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center text-white font-bold"
      style={{
        backgroundColor: author.iconBgColor,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {author.iconText}
    </div>
  );
}

function VoteBox({
  votes,
  onUp,
  onDown,
}: {
  votes: number;
  onUp: () => void;
  onDown: () => void;
}) {
  return (
    <div
      className={`shrink-0 w-12 h-16 border rounded-lg flex flex-col items-center justify-center ${
        votes > 0
          ? "border-primary-500/60"
          : "border-gray-200 dark:border-gray-700/60"
      }`}
    >
      <button
        onClick={onUp}
        className="text-gray-400 hover:text-primary-500 transition duration-150 ease-in-out"
      >
        <svg
          className={`fill-current ${votes > 0 ? "fill-primary-500" : ""}`}
          width="11"
          height="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m0 6 5.5-6L11 6z" />
        </svg>
      </button>
      <span
        className={`text-xs font-semibold ${votes > 0 ? "text-primary-500" : "text-gray-600 dark:text-gray-400"}`}
      >
        {votes}
      </span>
      <button
        onClick={onDown}
        className="text-gray-400 hover:text-red-500 transition duration-150 ease-in-out"
      >
        <svg
          className="fill-current rotate-180"
          width="11"
          height="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m0 6 5.5-6L11 6z" />
        </svg>
      </button>
    </div>
  );
}

export default function TopicDetail() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const params = useParams();
  const topicId = params.topicId as string;
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const replyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  async function fetchTopic() {
    try {
      setLoading(true);
      const res = await fetch(`/api/community/feed/${topicId}`);
      if (!res.ok) throw new Error("Failed to load topic");
      const { data } = await res.json();
      setTopic(data);
    } catch {
      // Error handled via null topic state
    } finally {
      setLoading(false);
    }
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/community/feed/${topicId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reply.trim() }),
      });
      if (res.ok) {
        setReply("");
        fetchTopic();
      }
    } catch {
      // Failed
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVote(pid: number, delta: number) {
    try {
      await fetch(`/api/community/feed/${topicId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid, delta }),
      });
      fetchTopic();
    } catch {
      // Silently fail
    }
  }

  function scrollToReply() {
    replyRef.current?.focus();
    replyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-3">
          {isEs ? 'Tema no encontrado.' : 'Topic not found.'}
        </p>
        <Link
          href="/community/feed"
          className="text-sm font-medium text-primary-500 hover:text-primary-600"
        >
          {isEs ? 'Volver al feed' : 'Back to feed'}
        </Link>
      </div>
    );
  }

  const mainPost = topic.posts[0];
  const replies = topic.posts.slice(1);

  return (
    <div>
      {/* Back link */}
      <Link
        href="/community/feed"
        className="text-sm text-primary-500 hover:text-primary-600 font-semibold mb-4 inline-block"
      >
        &larr; {isEs ? 'Volver al Feed' : 'Back to Feed'}
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {topic.title}
      </h1>
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-6">
        <span className="inline-flex font-medium px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          {topic.category.name}
        </span>
        <span>
          {topic.postCount} {isEs ? (topic.postCount === 1 ? "respuesta" : "respuestas") : (topic.postCount === 1 ? "reply" : "replies")}
        </span>
        <span>&middot;</span>
        <span>{topic.viewCount} {isEs ? 'vistas' : 'views'}</span>
      </div>

      {/* Main post */}
      {mainPost && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden border-l-4 border-primary-500 mb-6">
          <div className="flex">
            {/* Vote column */}
            <div className="shrink-0 w-16 flex flex-col items-center justify-center py-5 bg-gray-50 dark:bg-gray-800/80">
              <VoteBox
                votes={mainPost.votes}
                onUp={() => handleVote(mainPost.pid, 1)}
                onDown={() => handleVote(mainPost.pid, -1)}
              />
            </div>
            {/* Content */}
            <div className="flex-1 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Avatar author={mainPost.author} size={36} />
                <div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {mainPost.author.displayname}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {timeAgo(mainPost.timestampISO, isEs)}
                  </span>
                </div>
              </div>
              <div
                className="text-sm text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(mainPost.content),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {replies.length} {isEs ? (replies.length === 1 ? "Respuesta" : "Respuestas") : (replies.length === 1 ? "Reply" : "Replies")}
          </h4>
          <ul className="space-y-0">
            {replies.map((post, idx) => (
              <li key={post.pid} className="relative">
                {/* Thread line */}
                {idx < replies.length - 1 && (
                  <div
                    className="absolute top-0 bottom-0 left-[1.125rem] w-0.5 bg-gray-200 dark:bg-gray-700"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3 pb-5">
                  {/* Avatar with thread dot */}
                  <div className="relative z-10">
                    <Avatar author={post.author} size={36} />
                  </div>
                  {/* Comment content */}
                  <div className="flex-1 min-w-0 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          {post.author.displayname}
                        </span>
                        <span className="text-xs text-gray-500">
                          {timeAgo(post.timestampISO, isEs)}
                        </span>
                      </div>
                      {/* Inline vote */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleVote(post.pid, 1)}
                          className="text-gray-400 hover:text-primary-500 transition"
                        >
                          <svg
                            className={`fill-current ${post.votes > 0 ? "fill-primary-500" : ""}`}
                            width="10"
                            height="6"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m0 6 5-6 5 6z" />
                          </svg>
                        </button>
                        <span
                          className={`text-xs font-semibold ${post.votes > 0 ? "text-primary-500" : "text-gray-500"}`}
                        >
                          {post.votes}
                        </span>
                        <button
                          onClick={() => handleVote(post.pid, -1)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <svg
                            className="fill-current rotate-180"
                            width="10"
                            height="6"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m0 6 5-6 5 6z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className="text-sm text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                      }}
                    />
                    <div className="mt-2 text-xs">
                      <button
                        onClick={scrollToReply}
                        className="text-gray-500 hover:text-primary-500 font-medium transition"
                      >
                        {isEs ? 'Responder' : 'Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reply form */}
      {!topic.locked && (
        <form
          onSubmit={handleReply}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
            {isEs ? 'Escribe una respuesta' : 'Write a reply'}
          </h3>
          <textarea
            ref={replyRef}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={isEs ? 'Comparte tus ideas...' : 'Share your thoughts...'}
            rows={3}
            className="form-textarea w-full bg-gray-100 dark:bg-gray-700 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-gray-800 placeholder-gray-500 mb-3 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !reply.trim()}
              className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-50"
            >
              {submitting ? (isEs ? "Enviando..." : "Replying...") : (isEs ? "Responder" : "Reply")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
