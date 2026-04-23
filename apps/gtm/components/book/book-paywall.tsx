"use client";

import Link from "next/link";
import type { BookChapter } from "@/types/book";

export default function BookPaywall({
  chapter,
  children,
  isLoggedIn,
}: {
  chapter: BookChapter;
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <div className="relative">
      {/* Preview content (first few paragraphs) */}
      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed">
        {children}
      </article>

      {/* Fade overlay */}
      <div className="relative -mt-32 pt-32 bg-gradient-to-t from-white dark:from-gray-900 via-white/95 dark:via-gray-900/95 to-transparent">
        <div className="text-center py-16 px-4">
          {/* Lock icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-3">
            Continue Reading
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            This chapter is part of the full book. Get access by subscribing to
            the Academy or purchasing the book.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <>
                <Link
                  href="/settings/plans"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
                >
                  Subscribe to Solo GTM OS — $29.95/mo
                </Link>
                <BuyBookButton />
              </>
            ) : (
              <>
                <Link
                  href={`/signin?redirect=/book/${chapter.slug}`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
                >
                  Sign in to Get Access
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:border-primary-500 hover:text-primary-500 transition-colors"
                >
                  Create Free Account
                </Link>
              </>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Academy subscribers get full book access included.
          </p>
        </div>
      </div>
    </div>
  );
}

function BuyBookButton() {
  const bookProductId = process.env.NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID;

  if (!bookProductId) {
    return null;
  }

  return (
    <a
      href={`/api/checkout?products=${bookProductId}`}
      className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:border-primary-500 hover:text-primary-500 transition-colors"
    >
      Buy the Book — $29
    </a>
  );
}
