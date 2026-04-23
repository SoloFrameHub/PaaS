<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# I can easily build these capabilities on my existing platform, learnworld would add a huge dimension of complexity

Exactly right — and that's actually your biggest advantage. Let me break this down clearly.

***

## Your Platform Is Already the Right Tool

You've built a custom Next.js + PostgreSQL app  — meaning you control 100% of the data, the UI, the database schema, and the user experience. LearnWorlds would have locked you into their course structure, their pricing, their widget limitations, and their terms of service. Everything you want to add is just **new features on your own codebase** — a few database tables, new pages, and some UI components.[^1]

***

## What the Three Therapy Modes Look Like in Your Stack

**One-on-One (Provider assigns to a patient)**
This is a new database relationship: a `provider` can create an `assignment` that links a `patient_user` to a specific `course` or `lesson`. The provider gets a simple dashboard showing who completed what and how they scored on self-assessments. The patient sees their assigned content in a "My Care Plan" tab. You already have auth and user roles in your Next.js app — this is a few new tables and pages.[^2]

**Group Therapy (Cohort mode)**
A `cohort` table groups multiple users together under one provider, all progressing through the same course on a shared timeline. Providers can post discussion prompts, users respond, and everyone sees shared progress. Think of it like a private class — same course content, but social and scheduled.[^2]

**Self-Directed (What you already have)**
The public-facing store where anyone buys access and goes at their own pace. Your current build is already this.[^3]

***

## The Features That Unlock Everything

| What to Build | How Hard | What It Unlocks |
| :-- | :-- | :-- |
| Provider portal (assign courses to patients) | Medium | One-on-one clinical use |
| Cohort/group table + shared progress | Medium | Group therapy programs |
| CEU certification badge on course completion | Low | Providers pay for access |
| Practice licensing (each practice gets isolated tenant) | High | B2B revenue at scale via GCP [^3] |
| B2B employer landing page + bulk access codes | Low | Corporate wellness channel |


***

## The Bottom Line

You skipped the "pay a platform forever" model and built an asset you own outright. Every feature a competing platform charges per-seat for — you add once and it's yours. The provider portal is probably a **2–3 week build** in your existing stack, not a platform migration. That's your fastest path to the clinical market.[^4][^1]

Want me to spec out the database schema and page structure for the provider portal as your next build target?

<div align="center">⁂</div>

[^1]: https://www.perplexity.ai/search/b5e5fac0-4e45-41ef-a422-7fbfb03dffd0

[^2]: https://www.perplexity.ai/search/21f1812f-12b4-447b-8ded-d7b45d39e6a5

[^3]: https://www.perplexity.ai/search/df7530aa-b1f0-4051-aa70-2b1b9bcfb0ae

[^4]: https://www.perplexity.ai/search/1d6ff4ed-f95a-41a1-bce7-90f3f87e9d38

