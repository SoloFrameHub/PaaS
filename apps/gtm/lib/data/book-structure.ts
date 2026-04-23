import type { BookPart, BookChapter } from "@/types/book";

export type { BookPart, BookChapter };

export const BOOK_TITLE = "The Solo Founder's Customer Acquisition Playbook";
export const BOOK_AUTHOR = "Mike Sullivan";

/** Rich Person schema for JSON-LD — use everywhere Mike appears as author/creator/instructor */
export const BOOK_AUTHOR_PERSON = {
  "@type": "Person" as const,
  name: "Mike Sullivan",
  jobTitle: "Founder & Creator",
  description:
    "Three decades building revenue engines from scratch. Transformed divisions, built sales teams, " +
    "forged the partnerships that took CIC from struggling startup to nearly $1B market cap. " +
    "GE, Unisys, AirDefense (acquired by Motorola), AeroScout, CIC. Two wireless security patents. " +
    "14 years independent consulting with 100% client satisfaction.",
  image:
    "https://soloframehub.com/assets/images/academy/mike-sullivan-author-creator-solo-founder.webp",
  url: "https://soloframehub.com",
  sameAs: [
    "https://linkedin.com/in/mikejsullivan",
    "https://x.com/soloframehub",
  ],
};

export const BOOK_DESCRIPTION =
  "A practical, research-backed guide to customer acquisition for bootstrapped solo founders. " +
  "Master the psychology, frameworks, and systems that turn your product into a business — " +
  'without becoming "that salesperson."';

export const BOOK_STRUCTURE: BookPart[] = [
  {
    id: "front-matter",
    number: 0,
    title: "Front Matter",
    description: "",
    chapters: [
      {
        id: "how-to-use",
        slug: "how-to-use-this-book",
        title: "How to Use This Book",
        description:
          "How to get the most from this customer acquisition playbook — chapter structure, exercises, and the fastest path to your first paying customers.",
        partId: "front-matter",
        order: 0,
        type: "front-matter",
        isFree: true,
        sourceFile: "00b-how-to-use-this-book.md",
      },
      {
        id: "introduction",
        slug: "introduction",
        title: "The Solo Founder's Dilemma",
        description:
          "Why solo technical founders struggle with customer acquisition and how a systematic, repeatable approach replaces guesswork with a learnable sales process.",
        partId: "front-matter",
        order: 1,
        type: "front-matter",
        isFree: true,
        sourceFile: "00a-introduction.md",
      },
    ],
  },
  {
    id: "part-1",
    number: 1,
    title: "Psychology & Positioning",
    description:
      "Most solo founders struggle with customer acquisition not because they lack skills, but because they're fighting their own psychology. Part I gives you the mindset and positioning foundation everything else builds on.",
    chapters: [
      {
        id: "chapter-01",
        slug: "why-you-hate-selling",
        title: "Why You Hate Selling (And Why That's Actually Good News)",
        description:
          "Technical founders hate selling because they learned the wrong model. Reframe founder-led sales as problem-solving and turn your engineering mindset into a B2B sales advantage.",
        partId: "part-1",
        order: 2,
        type: "chapter",
        isFree: true,
        sourceFile: "01-chapter-01.md",
      },
      {
        id: "chapter-02",
        slug: "finding-the-right-people",
        title: "Finding the Right People to Talk To",
        description:
          "Build your ideal customer profile (ICP) step by step. Learn how to identify, qualify, and reach high-fit B2B prospects who actually need what you built.",
        partId: "part-1",
        order: 3,
        type: "chapter",
        isFree: true,
        sourceFile: "02-chapter-02.md",
      },
      {
        id: "chapter-03",
        slug: "cutting-through-the-noise",
        title: "Cutting Through the Noise",
        description:
          "Positioning and differentiation strategy for startups. Craft messaging that resonates with your ICP, cuts through crowded markets, and makes prospects lean in.",
        partId: "part-1",
        order: 4,
        type: "chapter",
        isFree: true,
        sourceFile: "03-chapter-03.md",
      },
    ],
  },
  {
    id: "part-2",
    number: 2,
    title: "Conversations & Conversion",
    description:
      "Turn interest into revenue. From discovery calls to retention, learn the conversation frameworks that close deals without feeling pushy.",
    chapters: [
      {
        id: "chapter-04",
        slug: "discovery-call-that-works",
        title: "The Discovery Call That Actually Works",
        description:
          "A discovery call framework built for founders, not sales reps. Run effective discovery calls that uncover real pain, build trust, and close more deals.",
        partId: "part-2",
        order: 5,
        type: "chapter",
        isFree: true,
        sourceFile: "04-chapter-04.md",
      },
      {
        id: "chapter-05",
        slug: "presenting-your-solution",
        title: "Presenting Your Solution (And Talking About Money)",
        description:
          "Present your solution and discuss pricing with confidence. A framework for value-based selling, handling price objections, and closing B2B deals as a solo founder.",
        partId: "part-2",
        order: 6,
        type: "chapter",
        isFree: true,
        sourceFile: "05-chapter-05.md",
      },
      {
        id: "chapter-06",
        slug: "after-the-sale",
        title: "After the Sale — Retention, Referrals, and Growing Revenue",
        description:
          "Customer retention and referral strategies for B2B startups. Turn one-time buyers into long-term accounts and build a referral engine that compounds growth.",
        partId: "part-2",
        order: 7,
        type: "chapter",
        isFree: true,
        sourceFile: "06-chapter-06.md",
      },
      {
        id: "chapter-07",
        slug: "ai-and-automation",
        title: "Using AI and Automation Without Losing the Human Touch",
        description:
          "The best AI sales tools and automation workflows for B2B founders. Automate lead generation, outreach, and follow-ups while keeping relationships authentic.",
        partId: "part-2",
        order: 8,
        type: "chapter",
        isFree: true,
        sourceFile: "07-chapter-07.md",
      },
    ],
  },
  {
    id: "part-3",
    number: 3,
    title: "Systems, Metrics & Playbooks",
    description:
      "Systematize everything. Measure what matters, handle objections, and build playbooks that keep your acquisition engine running on autopilot.",
    chapters: [
      {
        id: "chapter-08",
        slug: "measuring-what-matters",
        title: "Measuring What Matters — Metrics for Solo Founders",
        description:
          "The B2B SaaS metrics that actually matter for early-stage startups. Track CAC, LTV, conversion rates, and pipeline health without drowning in dashboards.",
        partId: "part-3",
        order: 9,
        type: "chapter",
        isFree: true,
        sourceFile: "08-chapter-08.md",
      },
      {
        id: "chapter-09",
        slug: "handling-obstacles",
        title:
          "Handling Obstacles — Objections, Rejection, and the Psychology of Selling",
        description:
          "Handle common B2B sales objections without being pushy. Proven objection handling frameworks, rejection psychology, and scripts for founders who hate hard closes.",
        partId: "part-3",
        order: 10,
        type: "chapter",
        isFree: true,
        sourceFile: "09-chapter-09.md",
      },
      {
        id: "chapter-10",
        slug: "playbooks-for-starting-points",
        title: "Playbooks for Different Starting Points",
        description:
          "Go-to-market playbooks for every startup stage — pre-revenue, first 10 customers, scaling to $1M ARR. Pick the playbook that matches where you are today.",
        partId: "part-3",
        order: 11,
        type: "chapter",
        isFree: true,
        sourceFile: "10-chapter-10.md",
      },
      {
        id: "appendix-playbooks",
        slug: "complete-playbook-examples",
        title: "Complete Playbook Examples",
        description:
          "Full customer acquisition playbook templates with real examples. Copy and adapt these step-by-step GTM frameworks for SaaS, services, and marketplace startups.",
        partId: "part-3",
        order: 12,
        type: "appendix",
        isFree: true,
        sourceFile: "10.5-appendix-playbook-examples.md",
      },
      {
        id: "chapter-11",
        slug: "diagnosis-framework",
        title: "The Diagnosis Framework — When Your Acquisition System Breaks",
        description:
          "A sales pipeline diagnosis framework for when customer acquisition stalls. Identify bottlenecks, fix conversion drop-offs, and get your growth engine running again.",
        partId: "part-3",
        order: 13,
        type: "chapter",
        isFree: true,
        sourceFile: "11-chapter-11.md",
      },
      {
        id: "chapter-12",
        slug: "maintaining-momentum",
        title: "Maintaining Momentum — Building Sustainable Habits",
        description:
          "Build sustainable sales habits as a solo founder. Daily and weekly routines, energy management, and systems that keep customer acquisition running without burnout.",
        partId: "part-3",
        order: 14,
        type: "chapter",
        isFree: true,
        sourceFile: "12-chapter-12.md",
      },
    ],
  },
  {
    id: "part-4",
    number: 4,
    title: "Your Playbook & The Future",
    description:
      "Bring it all together. Build your personal acquisition playbook, understand where customer acquisition is heading, and leverage community for growth.",
    chapters: [
      {
        id: "chapter-13",
        slug: "personal-acquisition-playbook",
        title: "Your Personal Acquisition Playbook — Bringing It All Together",
        description:
          "Build your personal customer acquisition system by combining the frameworks, scripts, and workflows from every chapter into one repeatable playbook.",
        partId: "part-4",
        order: 15,
        type: "chapter",
        isFree: true,
        sourceFile: "13-chapter-13.md",
      },
      {
        id: "chapter-14",
        slug: "future-of-customer-acquisition",
        title:
          "The Future of Customer Acquisition — Getting Found When Search Changes Everything",
        description:
          "How AI search, answer engines, and SEO changes reshape customer acquisition. Adapt your strategy for a world where buyers find you through AI-generated answers.",
        partId: "part-4",
        order: 16,
        type: "chapter",
        isFree: true,
        sourceFile: "14-chapter-14.md",
      },
      {
        id: "chapter-15",
        slug: "community-and-social-proof",
        title: "Community and Social Proof — Building Trust That Sells for You",
        description:
          "Use social proof and community building to drive B2B sales. Testimonials, case studies, and community-led growth strategies that build trust at scale.",
        partId: "part-4",
        order: 17,
        type: "chapter",
        isFree: true,
        sourceFile: "15-chapter-15.md",
      },
    ],
  },
  {
    id: "back-matter",
    number: 5,
    title: "Back Matter",
    description: "",
    chapters: [
      {
        id: "next-30-days",
        slug: "your-next-30-days",
        title: "Your Next 30 Days",
        description:
          "A 30-day customer acquisition action plan for solo founders. Week-by-week tasks that take you from reading to revenue with concrete daily actions.",
        partId: "back-matter",
        order: 18,
        type: "back-matter",
        isFree: true,
        sourceFile: "16-next-30-days.md",
      },
      {
        id: "appendix-framework-index",
        slug: "framework-index",
        title: "Framework Index",
        description:
          "Quick reference index of every customer acquisition framework in the book — ICP templates, discovery scripts, objection handlers, and pipeline calculators.",
        partId: "back-matter",
        order: 19,
        type: "appendix",
        isFree: true,
        sourceFile: "APPENDIX-FRAMEWORK-INDEX.md",
      },
      {
        id: "appendix-glossary",
        slug: "glossary",
        title: "Glossary",
        description:
          "Sales and customer acquisition glossary for technical founders. Plain-English definitions of B2B sales terms, SaaS metrics, and go-to-market terminology.",
        partId: "back-matter",
        order: 20,
        type: "appendix",
        isFree: true,
        sourceFile: "APPENDIX-GLOSSARY.md",
      },
      {
        id: "appendix-sources",
        slug: "sources-citations",
        title: "Sources & Citations",
        description:
          "Research sources and citations referenced throughout the book — academic studies, industry reports, and expert interviews on customer acquisition.",
        partId: "back-matter",
        order: 21,
        type: "appendix",
        isFree: true,
        sourceFile: "APPENDIX-SOURCES-CITATIONS.md",
      },
    ],
  },
];

// Helper functions

export function getAllChapters(): BookChapter[] {
  return BOOK_STRUCTURE.flatMap((part) => part.chapters);
}

export function getChapter(id: string): BookChapter | undefined {
  return getAllChapters().find((c) => c.id === id);
}

export function getChapterBySlug(slug: string): BookChapter | undefined {
  return getAllChapters().find((c) => c.slug === slug);
}

export function getPart(id: string): BookPart | undefined {
  return BOOK_STRUCTURE.find((p) => p.id === id);
}

export function getFreeChapters(): BookChapter[] {
  return getAllChapters().filter((c) => c.isFree);
}

export function getPaidChapters(): BookChapter[] {
  return getAllChapters().filter((c) => !c.isFree);
}

export function getAdjacentChapters(id: string): {
  prev: BookChapter | null;
  next: BookChapter | null;
} {
  const all = getAllChapters();
  const idx = all.findIndex((c) => c.id === id);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

/** Get visible parts (excluding front-matter and back-matter for display purposes) */
export function getMainParts(): BookPart[] {
  return BOOK_STRUCTURE.filter(
    (p) => p.id !== "front-matter" && p.id !== "back-matter",
  );
}
