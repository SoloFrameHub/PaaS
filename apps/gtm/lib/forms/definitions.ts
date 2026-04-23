/**
 * Form Definitions — All 10 native forms as TypeScript config objects.
 *
 * Each form has steps with fields, optional scoring rules, workflow config,
 * and settings. The slug is the URL path: /forms/[slug].
 */

import type { FormDefinition } from "./types";

export const FORM_DEFINITIONS: Record<string, FormDefinition> = {
  // ─── 1. Beta Tester Application ──────────────────────────────
  "beta-tester": {
    slug: "beta-tester",
    title: "Beta Tester Application",
    description:
      "Apply to be one of our founding beta testers and shape the future of the Solo GTM OS.",
    steps: [
      {
        id: "about-you",
        title: "About You",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "e.g. Alex Smith",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "businessModel",
            type: "radio",
            label: "Business Type",
            required: true,
            options: [
              { id: "b2b-saas", label: "B2B SaaS / Software", scoreValue: 10 },
              {
                id: "creator-coach",
                label: "Creator / Coach / Consultant",
                scoreValue: 8,
              },
              {
                id: "service",
                label: "Agency / Service Business",
                scoreValue: 7,
              },
              {
                id: "marketplace",
                label: "Marketplace / Platform",
                scoreValue: 6,
              },
              { id: "other", label: "Other", scoreValue: 3 },
            ],
          },
          {
            id: "stage",
            type: "radio",
            label: "Current Stage",
            required: true,
            options: [
              {
                id: "pre-revenue",
                label: "Pre-revenue (building product)",
                scoreValue: 5,
              },
              {
                id: "early",
                label: "Early revenue ($0-$5K MRR)",
                scoreValue: 10,
              },
              { id: "growing", label: "Growing ($5K-$20K MRR)", scoreValue: 8 },
              { id: "scaling", label: "Scaling ($20K+ MRR)", scoreValue: 6 },
            ],
          },
        ],
      },
      {
        id: "experience",
        title: "Your Sales Experience",
        fields: [
          {
            id: "salesJourney",
            type: "radio",
            label: "Where are you in your sales journey?",
            required: true,
            options: [
              {
                id: "not-started",
                label: "Haven't started outreach yet",
                scoreValue: 8,
              },
              {
                id: "outreach",
                label: "Doing outreach, few meetings",
                scoreValue: 10,
              },
              {
                id: "meetings",
                label: "Getting meetings, struggling to close",
                scoreValue: 10,
              },
              {
                id: "closing",
                label: "Closing some deals, want to systematize",
                scoreValue: 7,
              },
            ],
          },
          {
            id: "biggestChallenge",
            type: "textarea",
            label: "What is your #1 customer acquisition challenge right now?",
            required: true,
            placeholder: "Be specific about what you're struggling with...",
          },
          {
            id: "weeklyHours",
            type: "radio",
            label: "How many hours/week can you commit to testing?",
            required: true,
            options: [
              { id: "2-5", label: "2-5 hours/week", scoreValue: 5 },
              { id: "5-10", label: "5-10 hours/week", scoreValue: 10 },
              { id: "10+", label: "10+ hours/week", scoreValue: 8 },
            ],
          },
        ],
      },
      {
        id: "extras",
        title: "Additional Info",
        fields: [
          {
            id: "bookReviewer",
            type: "checkbox",
            label: "Book Reviewer Interest",
            options: [
              {
                id: "yes",
                label:
                  "I'm also interested in reviewing the book (The Solo Founder's AI Playbook)",
              },
            ],
          },
          {
            id: "referralSource",
            type: "select",
            label: "How did you hear about us?",
            options: [
              { id: "linkedin", label: "LinkedIn" },
              { id: "twitter", label: "Twitter/X" },
              { id: "google", label: "Google Search" },
              { id: "friend", label: "Friend / Referral" },
              { id: "podcast", label: "Podcast" },
              { id: "other", label: "Other" },
            ],
          },
          {
            id: "linkedinUrl",
            type: "url",
            label: "LinkedIn Profile URL (optional)",
            placeholder: "https://linkedin.com/in/...",
          },
          {
            id: "anything",
            type: "textarea",
            label: "Anything else you want us to know? (optional)",
          },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "businessModel", weight: 1.0 },
        { fieldId: "stage", weight: 1.2 },
        { fieldId: "salesJourney", weight: 1.5 },
        { fieldId: "weeklyHours", weight: 1.0 },
      ],
      thresholds: { qualified: 30, maybe: 20 },
    },
    workflows: {
      emailConfirmation: {
        subject: "Thanks for applying to beta test!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks for applying, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We received your beta tester application for the Solo GTM OS.</p>
          <p style="color: #555; margin-bottom: 16px;">We review applications weekly and will be in touch soon.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["beta-tester"] },
    },
    settings: {
      allowMultiple: false,
      successMessage:
        "Your application has been submitted! Check your email for confirmation.",
      successRedirect: "/forms/thank-you?form=beta-tester",
    },
  },

  // ─── 2. CAA Waitlist ─────────────────────────────────────────
  "caa-waitlist": {
    slug: "caa-waitlist",
    title: "Solo GTM OS — Get Started",
    description:
      "Join the waitlist or start your assessment for the Solo GTM OS.",
    steps: [
      {
        id: "info",
        title: "Tell us about yourself",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "Your name",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "businessModel",
            type: "radio",
            label: "What type of business do you run?",
            required: true,
            options: [
              { id: "b2b-saas", label: "B2B SaaS / Software", scoreValue: 10 },
              {
                id: "creator-coach",
                label: "Creator / Coach / Consultant",
                scoreValue: 8,
              },
              {
                id: "service",
                label: "Agency / Service Business",
                scoreValue: 7,
              },
              { id: "ecommerce", label: "E-commerce / DTC", scoreValue: 5 },
              { id: "other", label: "Other", scoreValue: 3 },
            ],
          },
          {
            id: "stage",
            type: "radio",
            label: "Revenue stage",
            required: true,
            options: [
              { id: "pre-revenue", label: "Pre-revenue", scoreValue: 6 },
              { id: "0-5k", label: "$0-$5K MRR", scoreValue: 10 },
              { id: "5k-20k", label: "$5K-$20K MRR", scoreValue: 9 },
              { id: "20k+", label: "$20K+ MRR", scoreValue: 7 },
            ],
          },
          {
            id: "biggestChallenge",
            type: "textarea",
            label: "What's your biggest customer acquisition challenge?",
            required: true,
            placeholder: "Tell us what you're struggling with...",
          },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "businessModel", weight: 1.0 },
        { fieldId: "stage", weight: 1.5 },
      ],
      thresholds: { qualified: 15, maybe: 8 },
    },
    workflows: {
      emailConfirmation: {
        subject: "Welcome to the Solo GTM OS waitlist!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">You're on the list, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We'll notify you when the next cohort opens. In the meantime, check out our free resources.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["caa-waitlist"] },
    },
    settings: {
      allowMultiple: false,
      successMessage:
        "You're on the waitlist! Check your email for next steps.",
      successRedirect: "/forms/thank-you?form=caa-waitlist",
    },
  },

  // ─── 3. Academy Waitlist (Startup + GTM) ─────────────────────
  "academy-waitlist": {
    slug: "academy-waitlist",
    title: "Academy Waitlist — Get Notified",
    description: "Be the first to know when our upcoming academies launch.",
    steps: [
      {
        id: "info",
        title: "Join the waitlist",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "Your name",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "academyInterest",
            type: "radio",
            label: "Which academy are you interested in?",
            required: true,
            options: [
              {
                id: "startup",
                label: "Startup Academy — Idea to Revenue in 60 Days",
              },
              {
                id: "gtm",
                label: "GTM Academy — 8 Systems for Compounding Growth",
              },
              { id: "both", label: "Both — notify me for everything" },
            ],
          },
          {
            id: "stage",
            type: "radio",
            label: "Where are you on your journey?",
            required: true,
            options: [
              { id: "idea", label: "Have an idea, haven't started" },
              { id: "building", label: "Building product / MVP" },
              { id: "launched", label: "Launched, looking for customers" },
              { id: "growing", label: "Growing, want to scale" },
            ],
          },
        ],
      },
    ],
    workflows: {
      emailConfirmation: {
        subject: "You're on the waitlist!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We'll email you as soon as the academy opens for enrollment.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["academy-waitlist"] },
    },
    settings: {
      allowMultiple: false,
      successMessage:
        "You're on the waitlist! We'll notify you when enrollment opens.",
      successRedirect: "/forms/thank-you?form=academy-waitlist",
    },
  },

  // ─── 4. Book Interest ────────────────────────────────────────
  "book-interest": {
    slug: "book-interest",
    title: "Get the Book — Solo Founder's AI Playbook",
    description:
      "Get notified when the book is available or download the free chapters.",
    steps: [
      {
        id: "info",
        title: "Book interest",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "Your name",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "bookInterest",
            type: "radio",
            label: "Which book?",
            required: true,
            options: [
              {
                id: "playbook",
                label: "The Solo Founder's AI Playbook (Customer Acquisition)",
              },
              {
                id: "revolution",
                label: "The Solo Founder's AI Revolution (60-Day Roadmap)",
              },
              {
                id: "dominance",
                label: "The Solo Founder's AI Dominance (GTM Systems)",
              },
              { id: "all", label: "All — notify me for everything" },
            ],
          },
          {
            id: "format",
            type: "radio",
            label: "Preferred format?",
            options: [
              { id: "ebook", label: "eBook (Kindle/PDF)" },
              { id: "paperback", label: "Paperback" },
              { id: "both", label: "Both" },
            ],
          },
        ],
      },
    ],
    workflows: {
      emailConfirmation: {
        subject: "Thanks for your interest in the book!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Got it, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We'll let you know as soon as the book is available.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["book-interest"] },
    },
    settings: {
      allowMultiple: false,
      successMessage: "Thanks! We'll notify you when the book is available.",
      successRedirect: "/forms/thank-you?form=book-interest",
    },
  },

  // ─── 5. Community Application ────────────────────────────────
  "community-apply": {
    slug: "community-apply",
    title: "Apply to Join the Community",
    description:
      "Apply to join the Solo Founder community. We match you with a peer pod for accountability and support.",
    steps: [
      {
        id: "about",
        title: "About You",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "Your name",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "businessModel",
            type: "radio",
            label: "Business Type",
            required: true,
            options: [
              { id: "b2b-saas", label: "B2B SaaS / Software", scoreValue: 10 },
              {
                id: "creator-coach",
                label: "Creator / Coach / Consultant",
                scoreValue: 8,
              },
              {
                id: "service",
                label: "Agency / Service Business",
                scoreValue: 7,
              },
              {
                id: "marketplace",
                label: "Marketplace / Platform",
                scoreValue: 6,
              },
              { id: "other", label: "Other", scoreValue: 4 },
            ],
          },
          {
            id: "stage",
            type: "radio",
            label: "Revenue Stage",
            required: true,
            options: [
              { id: "pre-revenue", label: "Pre-revenue", scoreValue: 6 },
              { id: "early", label: "$0-$5K MRR", scoreValue: 10 },
              { id: "growing", label: "$5K-$20K MRR", scoreValue: 9 },
              { id: "scaling", label: "$20K+ MRR", scoreValue: 7 },
            ],
          },
        ],
      },
      {
        id: "community",
        title: "Community Fit",
        fields: [
          {
            id: "whyJoin",
            type: "textarea",
            label: "Why do you want to join the community?",
            required: true,
            placeholder: "What are you hoping to get out of it?",
          },
          {
            id: "commitment",
            type: "radio",
            label: "How much time can you dedicate per week?",
            required: true,
            options: [
              { id: "1-3h", label: "1-3 hours", scoreValue: 4 },
              { id: "3-5h", label: "3-5 hours", scoreValue: 8 },
              { id: "5-10h", label: "5-10 hours", scoreValue: 10 },
              { id: "10h+", label: "10+ hours", scoreValue: 8 },
            ],
          },
          {
            id: "contribution",
            type: "multi-select",
            label: "What can you contribute? (select all that apply)",
            options: [
              { id: "experience", label: "Industry expertise" },
              { id: "feedback", label: "Product feedback" },
              { id: "accountability", label: "Accountability partner" },
              { id: "mentoring", label: "Mentoring others" },
              { id: "connections", label: "Introductions / networking" },
            ],
          },
          {
            id: "linkedinUrl",
            type: "url",
            label: "LinkedIn Profile (optional)",
            placeholder: "https://linkedin.com/in/...",
          },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "businessModel", weight: 1.0 },
        { fieldId: "stage", weight: 1.2 },
        { fieldId: "commitment", weight: 1.5 },
      ],
      thresholds: { qualified: 25, maybe: 15 },
    },
    workflows: {
      emailConfirmation: {
        subject: "Community application received!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks for applying, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We review community applications to ensure a great fit. You'll hear back within a few days.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["community-apply"] },
    },
    settings: {
      allowMultiple: false,
      successMessage:
        "Application submitted! We'll review it and get back to you soon.",
      successRedirect: "/forms/thank-you?form=community-apply",
    },
  },

  // ─── 6. Book Reviewer Application ───────────────────────────
  "book-reviewer": {
    slug: "book-reviewer",
    title: "Book Reviewer Application",
    description:
      "Apply to review The Solo Founder's AI Playbook. Reviewers receive a free advance copy.",
    steps: [
      {
        id: "about",
        title: "About You",
        fields: [
          { id: "name", type: "text", label: "Full Name", required: true },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
          },
          {
            id: "reviewPlatform",
            type: "multi-select",
            label: "Where will you post your review?",
            required: true,
            options: [
              { id: "amazon", label: "Amazon", scoreValue: 10 },
              { id: "goodreads", label: "Goodreads", scoreValue: 8 },
              { id: "blog", label: "Personal Blog", scoreValue: 6 },
              { id: "linkedin", label: "LinkedIn", scoreValue: 7 },
              { id: "twitter", label: "Twitter/X", scoreValue: 5 },
              { id: "other", label: "Other", scoreValue: 3 },
            ],
          },
        ],
      },
      {
        id: "details",
        title: "Review Details",
        fields: [
          {
            id: "turnaround",
            type: "radio",
            label: "How quickly can you complete the review?",
            required: true,
            options: [
              { id: "1-week", label: "Within 1 week", scoreValue: 10 },
              { id: "2-weeks", label: "Within 2 weeks", scoreValue: 8 },
              { id: "1-month", label: "Within 1 month", scoreValue: 5 },
            ],
          },
          {
            id: "audienceSize",
            type: "radio",
            label: "Estimated audience size across platforms",
            options: [
              { id: "small", label: "Under 500", scoreValue: 3 },
              { id: "medium", label: "500-5,000", scoreValue: 6 },
              { id: "large", label: "5,000-50,000", scoreValue: 9 },
              { id: "xlarge", label: "50,000+", scoreValue: 10 },
            ],
          },
          {
            id: "format",
            type: "radio",
            label: "Preferred format for the advance copy",
            options: [
              { id: "pdf", label: "PDF" },
              { id: "kindle", label: "Kindle (MOBI/EPUB)" },
              { id: "either", label: "Either works" },
            ],
          },
          { id: "notes", type: "textarea", label: "Anything else? (optional)" },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "reviewPlatform", weight: 1.0 },
        { fieldId: "turnaround", weight: 1.2 },
        { fieldId: "audienceSize", weight: 1.5 },
      ],
      thresholds: { qualified: 25, maybe: 12 },
    },
    workflows: {
      emailConfirmation: {
        subject: "Book reviewer application received!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We'll review your application and send you the advance copy if selected.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["book-reviewer"] },
    },
    settings: {
      allowMultiple: false,
      successMessage:
        "Application received! We'll be in touch if you're selected.",
      successRedirect: "/forms/thank-you?form=book-reviewer",
    },
  },

  // ─── 7. Founding Member Interest ─────────────────────────────
  "founding-member": {
    slug: "founding-member",
    title: "Founding Member Interest",
    description:
      "Express interest in becoming a founding member with lifetime benefits and direct access to the team.",
    steps: [
      {
        id: "about",
        title: "About You",
        fields: [
          { id: "name", type: "text", label: "Full Name", required: true },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
          },
          {
            id: "revenue",
            type: "radio",
            label: "Current Monthly Revenue",
            required: true,
            options: [
              { id: "pre-revenue", label: "Pre-revenue", scoreValue: 3 },
              { id: "0-5k", label: "$0-$5K", scoreValue: 7 },
              { id: "5k-20k", label: "$5K-$20K", scoreValue: 10 },
              { id: "20k-50k", label: "$20K-$50K", scoreValue: 9 },
              { id: "50k+", label: "$50K+", scoreValue: 8 },
            ],
          },
          {
            id: "teamSize",
            type: "radio",
            label: "Team Size",
            required: true,
            options: [
              { id: "solo", label: "Solo (just me)", scoreValue: 10 },
              { id: "small", label: "2-5 people", scoreValue: 7 },
              { id: "larger", label: "6+", scoreValue: 4 },
            ],
          },
        ],
      },
      {
        id: "interest",
        title: "Your Interest",
        fields: [
          {
            id: "goals",
            type: "multi-select",
            label: "What are you most interested in? (select all)",
            required: true,
            options: [
              { id: "lifetime-access", label: "Lifetime OS access" },
              { id: "direct-access", label: "Direct access to founders" },
              { id: "early-features", label: "Early access to new features" },
              { id: "influence", label: "Influence product direction" },
              { id: "networking", label: "Exclusive networking" },
            ],
          },
          {
            id: "budget",
            type: "radio",
            label: "Investment comfort level for a founding membership",
            required: true,
            options: [
              { id: "under-200", label: "Under $200 one-time", scoreValue: 4 },
              { id: "200-500", label: "$200-$500 one-time", scoreValue: 8 },
              { id: "500-1000", label: "$500-$1,000 one-time", scoreValue: 10 },
              { id: "1000+", label: "$1,000+ one-time", scoreValue: 10 },
            ],
          },
          {
            id: "testimonial",
            type: "checkbox",
            label: "Testimonial consent",
            options: [
              {
                id: "yes",
                label:
                  "I'd be willing to provide a testimonial if I find value",
              },
            ],
          },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "revenue", weight: 1.0 },
        { fieldId: "teamSize", weight: 0.8 },
        { fieldId: "budget", weight: 1.5 },
      ],
      thresholds: { qualified: 25, maybe: 15 },
    },
    workflows: {
      emailConfirmation: {
        subject: "Founding member interest received!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks for your interest, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We're putting together the founding member program and will reach out with details soon.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["founding-member"] },
    },
    settings: {
      allowMultiple: false,
      successMessage:
        "Interest registered! We'll reach out with founding member details soon.",
      successRedirect: "/forms/thank-you?form=founding-member",
    },
  },

  // ─── 8. Partnership / Affiliate Inquiry ──────────────────────
  partnership: {
    slug: "partnership",
    title: "Partnership & Affiliate Inquiry",
    description:
      "Interested in partnering with SoloFrameHub? Tell us about yourself.",
    steps: [
      {
        id: "about",
        title: "About You",
        fields: [
          { id: "name", type: "text", label: "Full Name", required: true },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
          },
          {
            id: "companyUrl",
            type: "url",
            label: "Company / Website URL",
            required: true,
            placeholder: "https://...",
          },
          {
            id: "partnershipType",
            type: "radio",
            label: "Type of partnership",
            required: true,
            options: [
              { id: "affiliate", label: "Affiliate / Referral", scoreValue: 7 },
              {
                id: "content",
                label: "Content collaboration (guest posts, webinars)",
                scoreValue: 8,
              },
              {
                id: "integration",
                label: "Product / Tool integration",
                scoreValue: 10,
              },
              {
                id: "reseller",
                label: "Reseller / White-label",
                scoreValue: 9,
              },
              { id: "other", label: "Other", scoreValue: 5 },
            ],
          },
        ],
      },
      {
        id: "details",
        title: "Partnership Details",
        fields: [
          {
            id: "audienceSize",
            type: "radio",
            label: "Your audience size",
            required: true,
            options: [
              { id: "small", label: "Under 1,000", scoreValue: 3 },
              { id: "medium", label: "1,000-10,000", scoreValue: 6 },
              { id: "large", label: "10,000-100,000", scoreValue: 9 },
              { id: "xlarge", label: "100,000+", scoreValue: 10 },
            ],
          },
          {
            id: "proposal",
            type: "textarea",
            label: "Tell us about your partnership idea",
            required: true,
            placeholder: "What would a partnership look like?",
          },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "partnershipType", weight: 1.0 },
        { fieldId: "audienceSize", weight: 1.5 },
      ],
      thresholds: { qualified: 15, maybe: 8 },
    },
    workflows: {
      emailConfirmation: {
        subject: "Partnership inquiry received!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We've received your partnership inquiry and will review it within a few business days.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
      listmonk: { tags: ["partnership"] },
    },
    settings: {
      allowMultiple: false,
      successMessage: "Inquiry submitted! We'll review and get back to you.",
      successRedirect: "/forms/thank-you?form=partnership",
    },
  },

  // ─── 9. Feedback / Feature Request ───────────────────────────
  feedback: {
    slug: "feedback",
    title: "Feedback & Feature Requests",
    description:
      "Help us improve SoloFrameHub. Share your feedback or suggest a feature.",
    steps: [
      {
        id: "feedback",
        title: "Your Feedback",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Name (optional)",
            placeholder: "Your name",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "category",
            type: "radio",
            label: "Category",
            required: true,
            options: [
              { id: "feature", label: "Feature request" },
              { id: "improvement", label: "Improvement to existing feature" },
              { id: "bug", label: "Bug report" },
              { id: "content", label: "Content suggestion" },
              { id: "general", label: "General feedback" },
            ],
          },
          {
            id: "description",
            type: "textarea",
            label: "Describe your feedback",
            required: true,
            placeholder: "Be as detailed as possible...",
            validation: { minLength: 20 },
          },
          {
            id: "painLevel",
            type: "radio",
            label: "How important is this to you?",
            options: [
              { id: "1", label: "Nice to have" },
              { id: "2", label: "Would improve my experience" },
              { id: "3", label: "Important for my workflow" },
              { id: "4", label: "Critical — blocking me" },
            ],
          },
        ],
      },
    ],
    workflows: {
      emailConfirmation: {
        subject: "Thanks for your feedback!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Thanks for the feedback!</h2>
          <p style="color: #555; margin-bottom: 16px;">We read every submission and use your input to improve the platform.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
    },
    settings: {
      allowMultiple: true,
      successMessage: "Feedback submitted! Thanks for helping us improve.",
      successRedirect: "/forms/thank-you?form=feedback",
    },
  },

  // ─── 10. Contact / General Inquiry ───────────────────────────
  contact: {
    slug: "contact",
    title: "Contact Us",
    description: "Have a question or need help? Send us a message.",
    steps: [
      {
        id: "contact",
        title: "Send a message",
        fields: [
          { id: "name", type: "text", label: "Full Name", required: true },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "subject",
            type: "select",
            label: "Subject",
            required: true,
            options: [
              { id: "general", label: "General inquiry" },
              { id: "support", label: "Technical support" },
              { id: "billing", label: "Billing / Subscription" },
              { id: "content", label: "Content question" },
              { id: "media", label: "Press / Media" },
              { id: "other", label: "Other" },
            ],
          },
          {
            id: "message",
            type: "textarea",
            label: "Message",
            required: true,
            placeholder: "How can we help?",
            validation: { minLength: 10 },
          },
        ],
      },
    ],
    workflows: {
      emailConfirmation: {
        subject: "We received your message!",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 16px;">Message received, {{name}}!</h2>
          <p style="color: #555; margin-bottom: 16px;">We'll get back to you within 1-2 business days.</p>
          <p style="color: #888; font-size: 14px;">— The SoloFrameHub Team</p>
        </div>`,
      },
      n8nWebhook: {},
    },
    settings: {
      allowMultiple: true,
      successMessage: "Message sent! We'll respond within 1-2 business days.",
      successRedirect: "/forms/thank-you?form=contact",
    },
  },
  // ─── 11. Customer Acquisition Readiness Score ──────────────────
  "readiness-score": {
    slug: "readiness-score",
    title: "Customer Acquisition Readiness Score",
    description:
      "Discover your blind spots in 5 minutes. Get a personalized readiness score across 7 dimensions — and a clear path to fix what's broken.",
    steps: [
      {
        id: "about",
        title: "About You",
        fields: [
          {
            id: "name",
            type: "text",
            label: "First Name",
            required: true,
            placeholder: "e.g. Alex",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@company.com",
          },
          {
            id: "businessModel",
            type: "radio",
            label: "What best describes your business?",
            required: true,
            options: [
              { id: "b2b-saas", label: "B2B SaaS / Software" },
              { id: "creator-coach", label: "Creator / Coach / Consultant" },
              { id: "service", label: "Agency / Service Business" },
              { id: "ecommerce", label: "E-commerce / DTC" },
              { id: "other", label: "Other" },
            ],
          },
          {
            id: "stage",
            type: "radio",
            label: "Monthly revenue",
            required: true,
            options: [
              { id: "pre-revenue", label: "Pre-revenue" },
              { id: "0-5k", label: "$0-$5K/mo" },
              { id: "5k-20k", label: "$5K-$20K/mo" },
              { id: "20k-50k", label: "$20K-$50K/mo" },
              { id: "50k-plus", label: "$50K+/mo" },
            ],
          },
        ],
      },
      {
        id: "foundations",
        title: "Foundations & ICP",
        description:
          "How well do you know your ideal customer and market position?",
        fields: [
          {
            id: "icpClarity",
            type: "radio",
            label: "How clearly can you describe your ideal customer?",
            required: true,
            options: [
              {
                id: "1",
                label: "I sell to anyone who will buy",
                scoreValue: 10,
              },
              {
                id: "2",
                label: "I have a rough idea but it's not documented",
                scoreValue: 30,
              },
              {
                id: "3",
                label: "I have a written ICP but haven't validated it",
                scoreValue: 55,
              },
              {
                id: "4",
                label: "I have a validated ICP with buyer personas",
                scoreValue: 80,
              },
              {
                id: "5",
                label:
                  "I have a validated ICP, negative ICP, and clear buying signals",
                scoreValue: 95,
              },
            ],
          },
          {
            id: "positioningStrength",
            type: "radio",
            label:
              "Can you explain why someone should buy from you vs. competitors in under 30 seconds?",
            required: true,
            options: [
              {
                id: "1",
                label: "I struggle to differentiate myself",
                scoreValue: 15,
              },
              {
                id: "2",
                label: "I can explain it but it's generic",
                scoreValue: 35,
              },
              {
                id: "3",
                label: "I have a clear value prop but haven't tested it",
                scoreValue: 55,
              },
              {
                id: "4",
                label: "I have a tested positioning that resonates with my ICP",
                scoreValue: 80,
              },
              {
                id: "5",
                label:
                  "My positioning is validated, documented, and drives all messaging",
                scoreValue: 95,
              },
            ],
          },
        ],
      },
      {
        id: "marketing",
        title: "Marketing Engine",
        description: "Do you have systems that generate leads consistently?",
        fields: [
          {
            id: "contentEngine",
            type: "radio",
            label: "Do you have a content engine that generates inbound leads?",
            required: true,
            options: [
              { id: "1", label: "I don't create content", scoreValue: 10 },
              {
                id: "2",
                label: "I post occasionally but no system",
                scoreValue: 25,
              },
              {
                id: "3",
                label: "I have a content schedule but few leads from it",
                scoreValue: 50,
              },
              {
                id: "4",
                label: "Content generates some leads monthly",
                scoreValue: 75,
              },
              {
                id: "5",
                label: "Systematic content engine with measurable lead flow",
                scoreValue: 95,
              },
            ],
          },
          {
            id: "channelReadiness",
            type: "radio",
            label:
              "How many acquisition channels are actively generating leads?",
            required: true,
            options: [
              {
                id: "0",
                label: "None — I rely on word of mouth / luck",
                scoreValue: 10,
              },
              {
                id: "1",
                label: "One channel (e.g. LinkedIn or cold email)",
                scoreValue: 35,
              },
              { id: "2", label: "Two channels working", scoreValue: 60 },
              {
                id: "3",
                label: "Three or more channels with tracking",
                scoreValue: 85,
              },
              {
                id: "4",
                label: "Multi-channel system with attribution",
                scoreValue: 95,
              },
            ],
          },
        ],
      },
      {
        id: "sales",
        title: "Sales Process",
        description: "How structured is your sales approach?",
        fields: [
          {
            id: "salesProcessMaturity",
            type: "radio",
            label: "How would you describe your sales process?",
            required: true,
            options: [
              {
                id: "1",
                label: "I wing it — every conversation is different",
                scoreValue: 10,
              },
              {
                id: "2",
                label: "I have a rough approach but nothing documented",
                scoreValue: 30,
              },
              {
                id: "3",
                label: "I follow a basic framework (discovery → demo → close)",
                scoreValue: 55,
              },
              {
                id: "4",
                label: "Documented process with templates and scripts",
                scoreValue: 75,
              },
              {
                id: "5",
                label: "Structured process with CRM, scoring, and optimization",
                scoreValue: 95,
              },
            ],
          },
          {
            id: "objectionHandling",
            type: "radio",
            label:
              "When a prospect pushes back on price or timing, what happens?",
            required: true,
            options: [
              { id: "1", label: "I panic or give a discount", scoreValue: 10 },
              {
                id: "2",
                label: "I handle it but inconsistently",
                scoreValue: 30,
              },
              {
                id: "3",
                label: "I have responses for common objections",
                scoreValue: 55,
              },
              {
                id: "4",
                label: "I use frameworks (like LARA) for each type",
                scoreValue: 80,
              },
              {
                id: "5",
                label: "Objections rarely derail — I'm prepared for anything",
                scoreValue: 95,
              },
            ],
          },
        ],
      },
      {
        id: "ai-systems",
        title: "AI & Systems",
        description:
          "Are you leveraging AI and automation in your acquisition?",
        fields: [
          {
            id: "aiReadiness",
            type: "radio",
            label: "How much AI are you using in your customer acquisition?",
            required: true,
            options: [
              { id: "1", label: "None — everything is manual", scoreValue: 10 },
              {
                id: "2",
                label: "ChatGPT for occasional tasks",
                scoreValue: 30,
              },
              {
                id: "3",
                label: "AI for content/email but not systematized",
                scoreValue: 50,
              },
              {
                id: "4",
                label:
                  "AI integrated into prospecting, outreach, or qualification",
                scoreValue: 75,
              },
              {
                id: "5",
                label:
                  "AI agents handle research, outreach, and follow-up automatically",
                scoreValue: 95,
              },
            ],
          },
          {
            id: "pipelineTracking",
            type: "radio",
            label: "How do you track your pipeline and metrics?",
            required: true,
            options: [
              { id: "1", label: "I don't track anything", scoreValue: 10 },
              { id: "2", label: "Spreadsheet or notes", scoreValue: 30 },
              {
                id: "3",
                label: "Basic CRM (HubSpot free, etc.)",
                scoreValue: 55,
              },
              {
                id: "4",
                label: "CRM with pipeline stages and reporting",
                scoreValue: 80,
              },
              {
                id: "5",
                label: "Full stack: CRM + analytics + automated follow-up",
                scoreValue: 95,
              },
            ],
          },
        ],
      },
    ],
    scoring: {
      rules: [
        { fieldId: "icpClarity", weight: 1.5 },
        { fieldId: "positioningStrength", weight: 1.3 },
        { fieldId: "contentEngine", weight: 1.0 },
        { fieldId: "channelReadiness", weight: 1.2 },
        { fieldId: "salesProcessMaturity", weight: 1.3 },
        { fieldId: "objectionHandling", weight: 1.0 },
        { fieldId: "aiReadiness", weight: 1.0 },
        { fieldId: "pipelineTracking", weight: 0.8 },
      ],
      thresholds: {
        qualified: 600, // high readiness
        maybe: 350, // moderate readiness
      },
    },
    workflows: {
      emailConfirmation: {
        subject: "Your Customer Acquisition Readiness Score",
        bodyHtml: `<div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 8px;">Hi {{name}},</h2>
          <p style="color: #555; margin-bottom: 16px;">Your readiness score is ready. Here's what we found:</p>
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="font-size: 48px; font-weight: bold; text-align: center; margin: 0; color: #1a1a1a;">{{score}}/100</p>
            <p style="text-align: center; color: #666; margin: 8px 0 0;">Customer Acquisition Readiness</p>
          </div>
          <p style="color: #555; margin-bottom: 16px;">Want to see your full breakdown and personalized action plan?</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://ai-solo-gtm-os.soloframehub.com"}/readiness-score/results?id={{submissionId}}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">View Full Results</a>
          <p style="color: #888; font-size: 13px; margin-top: 24px;">— The Solo GTM OS</p>
        </div>`,
      },
      listmonk: {
        tags: ["readiness-score", "lead"],
      },
    },
    settings: {
      allowMultiple: false,
      successMessage: "Your readiness score is being calculated...",
      successRedirect: "/readiness-score/results",
    },
  },
};

/** Get all field definitions from a form (flattened across all steps) */
export function getAllFields(
  form: FormDefinition,
): import("./types").FormFieldDefinition[] {
  return form.steps.flatMap((step) => step.fields);
}
