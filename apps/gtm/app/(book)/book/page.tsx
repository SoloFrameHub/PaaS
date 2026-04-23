import Link from "next/link";
import {
  BOOK_STRUCTURE,
  BOOK_TITLE,
  BOOK_AUTHOR,
  BOOK_AUTHOR_PERSON,
  BOOK_DESCRIPTION,
  getMainParts,
  getAllChapters,
} from "@/lib/data/book-structure";
import BookSearch from "@/components/book/book-search";

export const metadata = {
  title: "Customer Acquisition Playbook for Solo Founders | Free Online Book",
  description:
    "A free, 98,000-word guide to customer acquisition for solo technical founders. " +
    "Master ICP building, discovery calls, objection handling, and AI-powered sales systems.",
  openGraph: {
    type: "book",
    url: "https://soloframehub.com/book",
    title: "The Solo Founder's Customer Acquisition Playbook",
    description: BOOK_DESCRIPTION,
    images: [
      "https://soloframehub.com/assets/images/customer-acquisition-playbook-cover.webp",
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@soloframehub",
    creator: "@mikejsullivan",
    title: "The Solo Founder's Customer Acquisition Playbook",
    description: BOOK_DESCRIPTION,
    images: [
      "https://soloframehub.com/assets/images/customer-acquisition-playbook-cover.webp",
    ],
  },
  alternates: {
    canonical: "https://soloframehub.com/book",
  },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  const mainParts = getMainParts();
  const allChapters = getAllChapters();
  const frontMatter = BOOK_STRUCTURE.find((p) => p.id === "front-matter");
  const backMatter = BOOK_STRUCTURE.find((p) => p.id === "back-matter");

  // Full Book JSON-LD with all chapters for SEO & AEO
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: BOOK_TITLE,
    author: BOOK_AUTHOR_PERSON,
    description: BOOK_DESCRIPTION,
    url: "https://soloframehub.com/book",
    image:
      "https://soloframehub.com/assets/images/customer-acquisition-playbook-cover.webp",
    publisher: {
      "@type": "Organization",
      name: "SoloFrameHub",
      url: "https://soloframehub.com",
    },
    bookFormat: "https://schema.org/EBook",
    numberOfPages: 392,
    inLanguage: "en",
    genre: ["Business", "Entrepreneurship", "Sales"],
    about: "Customer acquisition for solo technical founders",
    datePublished: "2026-01-15",
    dateModified: "2026-02-21",
    isAccessibleForFree: true,
    hasPart: allChapters.map((ch, i) => ({
      "@type": "Chapter",
      name: ch.title,
      description: ch.description,
      position: i + 1,
      url: `https://soloframehub.com/book/${ch.slug}`,
      isAccessibleForFree: true,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://soloframehub.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Book",
        item: "https://soloframehub.com/book",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 dark:text-gray-100 leading-tight mb-6">
          {BOOK_TITLE}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-4">
          {BOOK_DESCRIPTION}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          By {BOOK_AUTHOR} &middot; ~98,000 words &middot; 15 chapters &middot;
          Free to read online
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href={`/book/${allChapters[0]?.slug ?? "introduction"}`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20 text-lg"
          >
            Start Reading
          </Link>
        </div>

        {/* Why online */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-10 max-w-2xl mx-auto text-left">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Customer acquisition moves fast. Tactics that worked six months ago
            are already outdated. Unlike a static print book, this online
            edition is{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              updated quarterly
            </strong>{" "}
            with new frameworks, tools, and real-world case studies as trends
            emerge.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              RAG search enabled
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Updated as new trends emerge
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              Audio version coming soon
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-center">
          <BookSearch />
        </div>
      </div>

      {/* Table of Contents */}
      <div className="space-y-10">
        {/* Front Matter */}
        {frontMatter && (
          <div className="space-y-2">
            {frontMatter.chapters.map((ch) => (
              <ChapterRow key={ch.id} chapter={ch} />
            ))}
          </div>
        )}

        {/* Main Parts */}
        {mainParts.map((part) => (
          <div key={part.id}>
            <div className="mb-4">
              <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">
                Part {part.number}: {part.title}
              </h2>
              {part.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {part.description}
                </p>
              )}
            </div>
            <div className="space-y-2">
              {part.chapters.map((ch) => (
                <ChapterRow key={ch.id} chapter={ch} />
              ))}
            </div>
          </div>
        ))}

        {/* Back Matter */}
        {backMatter && (
          <div>
            <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-4">
              Appendices & Resources
            </h2>
            <div className="space-y-2">
              {backMatter.chapters.map((ch) => (
                <ChapterRow key={ch.id} chapter={ch} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center border-t border-gray-100 dark:border-gray-800 pt-12">
        <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-4">
          Ready to put this into practice?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">
          The book gives you the frameworks. The OS gives you the reps — AI
          roleplay, artifact builders, and 21 interactive courses that turn
          knowledge into muscle memory.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
        >
          Try the OS — Free During Beta
        </Link>
      </div>
    </div>
  );
}

function ChapterRow({
  chapter,
}: {
  chapter: {
    id: string;
    slug: string;
    title: string;
    type: string;
    description: string;
  };
}) {
  const isChapter = chapter.type === "chapter";
  const chapterNum = chapter.id.replace("chapter-", "");

  return (
    <Link
      href={`/book/${chapter.slug}`}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group"
    >
      {/* Chapter number or type indicator */}
      <span className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-primary-500/10 group-hover:text-primary-500 transition-colors">
        {isChapter ? chapterNum : chapter.type === "appendix" ? "A" : "~"}
      </span>

      {/* Title */}
      <span className="flex-1 font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors">
        {chapter.title}
      </span>

      {/* Arrow */}
      <svg
        className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
}
