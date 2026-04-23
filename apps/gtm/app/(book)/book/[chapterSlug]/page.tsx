import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import {
  getAllChapters,
  getChapterBySlug,
  getAdjacentChapters,
  getPart,
  BOOK_TITLE,
  BOOK_AUTHOR,
  BOOK_AUTHOR_PERSON,
} from '@/lib/data/book-structure';
import { getChapterContent } from '@/lib/book';
import { getServerSession } from '@/lib/auth';
import ChapterSidebar from '@/components/book/chapter-sidebar';
import BookAcademyCta from '@/components/book/book-academy-cta';
import MarkReadButton from '@/components/book/mark-read-button';
import InteractiveCheckbox from '@/components/ui/interactive-checkbox';

export async function generateStaticParams() {
  return getAllChapters().map((ch) => ({ chapterSlug: ch.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await props.params;
  const chapter = getChapterBySlug(chapterSlug);
  if (!chapter) return {};

  const description =
    chapter.description ||
    `Read "${chapter.title}" from The Solo Founder's Customer Acquisition Playbook by Mike Sullivan.`;

  return {
    title: `${chapter.title} | The Solo Founder's Customer Acquisition Playbook`,
    description,
    openGraph: {
      type: 'article',
      url: `https://soloframehub.com/book/${chapter.slug}`,
      title: chapter.title,
      description,
      images: ['https://soloframehub.com/assets/images/customer-acquisition-playbook-cover.webp'],
      article: {
        authors: [BOOK_AUTHOR],
        section: 'Customer Acquisition',
        publishedTime: '2026-01-15',
        modifiedTime: '2026-02-21',
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@soloframehub',
      creator: '@mikejsullivan',
      title: chapter.title,
      description,
      images: ['https://soloframehub.com/assets/images/customer-acquisition-playbook-cover.webp'],
    },
    alternates: {
      canonical: `https://soloframehub.com/book/${chapter.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ChapterPage(props: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await props.params;
  const chapter = getChapterBySlug(chapterSlug);
  if (!chapter) notFound();

  const part = getPart(chapter.partId);
  const { prev, next } = getAdjacentChapters(chapter.id);

  const chapterData = await getChapterContent(chapter.id);
  if (!chapterData) notFound();

  const session = await getServerSession();

  // Enhanced Chapter JSON-LD for SEO & AEO
  const chapterJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    name: chapter.title,
    description: chapter.description,
    url: `https://soloframehub.com/book/${chapter.slug}`,
    position: chapter.order + 1,
    wordCount: chapterData.readingTime ? chapterData.readingTime * 250 : undefined,
    datePublished: '2026-01-15',
    dateModified: '2026-02-21',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Book',
      name: BOOK_TITLE,
      author: BOOK_AUTHOR_PERSON,
      url: 'https://soloframehub.com/book',
    },
    author: BOOK_AUTHOR_PERSON,
  };

  // Breadcrumb JSON-LD for navigation & rich snippets
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://soloframehub.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Book',
        item: 'https://soloframehub.com/book',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: chapter.title,
        item: `https://soloframehub.com/book/${chapter.slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(chapterJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ChapterSidebar currentSlug={chapterSlug} />

      <main className="flex-1 px-4 lg:px-12 py-12 max-w-4xl mx-auto">
        <ChapterHeader
          chapter={chapter}
          part={part}
          readingTime={chapterData.readingTime}
        />

        {/* Chapter Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
            prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-800 dark:prose-strong:text-gray-100
            prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
            prose-pre:bg-gray-900 prose-pre:rounded-2xl
            prose-img:rounded-3xl prose-img:shadow-2xl
          "
        >
          <MDXRemote
            source={chapterData.content}
            options={{
              mdxOptions: {
                format: 'md',
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{
              // Demote MDX h1 to h2 — the page already has an h1 from ChapterHeader
              h1: (h1Props: React.ComponentProps<'h1'>) => (
                <h2 {...h1Props} />
              ),
              // Rewrite image paths from visuals/ to /images/book/
              img: (imgProps: React.ComponentProps<'img'>) => {
                const src = imgProps.src?.startsWith('visuals/')
                  ? `/images/book/${imgProps.src.replace('visuals/', '')}`
                  : imgProps.src;
                // eslint-disable-next-line @next/next/no-img-element
                return <img {...imgProps} src={src} alt={imgProps.alt ?? ''} />;
              },
              // Interactive checkboxes (same as lesson page)
              li: (liProps: React.ComponentProps<'li'>) => {
                const { children, ...rest } = liProps;
                const isCheckbox = (node: unknown): node is { props: { type: 'checkbox'; checked: boolean } } => {
                  return (
                    node !== null &&
                    typeof node === 'object' &&
                    'props' in (node as Record<string, unknown>) &&
                    (node as { props: { type?: string } }).props?.type === 'checkbox'
                  );
                };
                const firstChild = Array.isArray(children) ? children[0] : children;
                if (isCheckbox(firstChild)) {
                  return (
                    <InteractiveCheckbox checked={firstChild.props.checked}>
                      {Array.isArray(children) ? children.slice(1) : null}
                    </InteractiveCheckbox>
                  );
                }
                return <li {...rest}>{children}</li>;
              },
            }}
          />
        </article>

        {/* Academy CTA */}
        <BookAcademyCta />

        {/* Chapter Footer Navigation */}
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between">
          {prev ? (
            <Link
              href={`/book/${prev.slug}`}
              className="flex flex-col p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-500 transition-all text-left group"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Previous
              </span>
              <span className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {session?.uid ? (
            <MarkReadButton
              chapterId={chapter.id}
              nextSlug={next?.slug ?? null}
            />
          ) : next ? (
            <Link
              href={`/book/${next.slug}`}
              className="flex flex-col p-4 rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all text-right group"
            >
              <span className="text-xs font-bold uppercase tracking-widest mb-1 text-white/70">
                Next Chapter
              </span>
              <span className="font-bold">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function ChapterHeader({
  chapter,
  part,
  readingTime,
}: {
  chapter: { id: string; title: string; type: string; description: string };
  part: { number: number; title: string } | undefined;
  readingTime?: number;
}) {
  const isChapter = chapter.type === 'chapter';
  const chapterNum = chapter.id.replace('chapter-', '');

  return (
    <div className="mb-12">
      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-gray-400">
          <li>
            <Link href="/book" className="hover:text-primary-500 transition-colors">
              Book
            </Link>
          </li>
          {part && part.number > 0 && (
            <>
              <li><span>/</span></li>
              <li>Part {part.number}</li>
            </>
          )}
          <li><span>/</span></li>
          <li className="text-gray-600 dark:text-gray-300 font-medium truncate max-w-[200px]">
            {chapter.title}
          </li>
        </ol>
      </nav>

      <div className="flex items-center gap-2 text-primary-500 text-xs font-black uppercase tracking-widest mb-4">
        {part && part.number > 0 && (
          <>
            <span>Part {part.number}</span>
            <span className="text-gray-300">&bull;</span>
          </>
        )}
        {isChapter && <span>Chapter {chapterNum}</span>}
        {!isChapter && <span>{chapter.type === 'appendix' ? 'Appendix' : ''}</span>}
      </div>
      <h1 className="text-4xl lg:text-5xl font-black text-gray-800 dark:text-gray-100 mb-6 leading-tight">
        {chapter.title}
      </h1>
      {chapter.description && (
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          {chapter.description}
        </p>
      )}
      {readingTime && (
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime} min read
          </span>
        </div>
      )}
    </div>
  );
}
