import type { Metadata } from "next";
import { getDocPages } from "@/components/docs/mdx/docs-utils";
import { notFound } from "next/navigation";
import { DocsCustomMDX } from "@/components/docs/mdx/docs-mdx";
import DocsTopicTitle from "@/components/docs/ui/docs-topic-title";
import DocsHamburger from "@/components/docs/ui/docs-hamburger";
import DocsFeedback from "@/components/docs/ui/docs-feedback";
import DocsPageNavigation from "@/components/docs/ui/docs-page-navigation";
import DocsFooter from "@/components/docs/ui/docs-footer";
import DocsSecondaryNav from "@/components/docs/ui/docs-secondary-nav";

export async function generateStaticParams() {
  const allDocs = getDocPages();

  // Map slug to its topic based on frontmatter
  const slugToTopic: Record<string, string> = {
    "platform-overview": "getting-started",
    "quick-start": "getting-started",
    "account-setup": "getting-started",
    "how-it-works": "academy",
    "course-tracks": "academy",
    "ai-coaching": "academy",
    assessments: "academy",
    pods: "community",
    forum: "community",
    templates: "tools",
    pricing: "help",
    faq: "help",
  };

  return allDocs.map((post) => ({
    topic:
      slugToTopic[post.slug] || post.metadata.topicSlug || "getting-started",
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ topic: string; slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = getDocPages().find((post) => post.slug === params.slug);

  if (!post) return;

  return {
    title: `${post.metadata.title} | Solo GTM OS Docs`,
    description: post.metadata.summary,
  };
}

export default async function DocsArticlePage(props: {
  params: Promise<{
    topic: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const post = getDocPages().find((post) => post.slug === params.slug);

  if (!post) notFound();

  return (
    <>
      {/* Page header */}
      {post.metadata.topicTitle && post.metadata.topicSlug && (
        <div className="h-16 flex items-center mb-6">
          <DocsTopicTitle
            name={post.metadata.topicTitle}
            segment={post.metadata.topicSlug}
          />
        </div>
      )}

      <article className="flex xl:space-x-12">
        {/* Main area */}
        <div className="min-w-0">
          {/* Mobile hamburger + breadcrumbs */}
          <div className="md:hidden flex items-center mb-8">
            <DocsHamburger />
            <div className="flex items-center text-sm whitespace-nowrap min-w-0 ml-3">
              {post.metadata.topicTitle && (
                <span className="text-slate-600 dark:text-slate-400">
                  {post.metadata.topicTitle}
                </span>
              )}
              <svg
                className="fill-slate-400 shrink-0 mx-2 dark:fill-slate-500"
                width="8"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 2 2.414.586 6.828 5 2.414 9.414 1 8l3-3z" />
              </svg>
              <span className="text-slate-800 font-medium truncate dark:text-slate-200">
                {post.metadata.title}
              </span>
            </div>
          </div>

          {/* Article content */}
          <div>
            <header className="mb-6">
              <h1 className="text-4xl font-semibold text-slate-800 mb-4 dark:text-slate-200">
                {post.metadata.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {post.metadata.summary}
              </p>
            </header>
            <article className="prose text-slate-600 dark:text-slate-400 max-w-none prose-p:leading-normal prose-headings:text-slate-800 dark:prose-headings:text-slate-200 prose-a:font-medium prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-code:text-slate-800 prose-code:bg-transparent dark:prose-code:bg-slate-800 dark:prose-code:text-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-headings:scroll-mt-24">
              <DocsCustomMDX source={post.content} />
            </article>
          </div>

          {/* Feedback */}
          <DocsFeedback />

          {/* Page navigation */}
          <DocsPageNavigation
            prevArticle={[post.metadata.prevTitle, post.metadata.prevSlug]}
            nextArticle={[post.metadata.nextTitle, post.metadata.nextSlug]}
          />

          {/* Content footer */}
          <DocsFooter />
        </div>

        {/* Secondary navigation */}
        <DocsSecondaryNav />
      </article>
    </>
  );
}
