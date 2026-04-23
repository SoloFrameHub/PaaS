<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Prompt 3 – AI Lead Research \& Enrichment

Working course title:
AI-Driven Lead Research \& Enrichment on a Solo Founder Budget
Upgraded research brief:
Compile solo-founder-friendly tools and workflows for turning raw names/handles into rich profiles with verified emails, social context, buying triggers, and ICP scores.
Cover:
Core tools \& pricing (2026 tiers)
Clay, Apollo, ZoomInfo Lite/competitors, Ocean.io, Clearbit alternatives (e.g., Kanbox, Dropcontact, Hunter, Snov) with transparent pricing and free/cheap tiers relevant under ~\$100/month.​
LinkedIn-native vs off-platform enrichment and the legal/ToS-safe ways to build lists (Sales Nav exports, browser-based enrichment like Kanbox vs full scraping).
“Discover–Enrich–Score–Personalize” workflow
Take your 5-step workflow (discover, enrich, analyze with AI, human gate, send) and generalize it with multiple tool options and updated 2026 numbers.
Quantify typical funnel: leads → enriched emails → verified → ICP-qualified → contacted, showing example numbers (e.g., 58,605 leads → 12,530 verified emails → 21.4% enrichment).​
AI agents for prospect research
Off-the-shelf “research agents” (e.g., Clay AI, ZoomInfo Copilot, MarketBetter, dedicated research bots inside CRMs) vs DIY agents built with LangChain/Claude Agent SDK scraping public sources.​
Clear examples of:
Prospect research agent (turns URL/LinkedIn into one-page brief).
ICP-fit scoring agent (1–10).
Segment tagging agent (stage, persona, potential use case).
Dual-context application
B2B: firmographic + technographic data, recent funding, headcount, job changes, hiring signals.
Creator: audience size, social engagement, offers, past launches, community memberships, platforms used.
Show how the same Clay/Apollo workflow can support both with different enrichment fields.
Costs, tradeoffs, and build-vs-buy
Compare out-of-the-box Clay/Apollo/ZoomInfo workflows to a self-hosted stack (e.g., n8n + APIs like Clearbit, PDL, social scrapers) with realistic infra costs and technical overhead.

Solo-founder-friendly lead research in 2026 = stacking cheap/free discovery sources with one “brains + plumbing” layer (Clay/Apollo or DIY) so you can go from raw handles to **verified, scoped, ICP-scored leads** without enterprise spend.[^1]

***

## Core tools \& solo-friendly pricing (2026)

**Under or near ~\$100/month, or with strong free tiers:**

- **Clay** – AI-first discovery/enrichment/workflows. Starter plan around **\$149/month** with 2,000 credits; effective cost per contact can be in the low cents when you use waterfall enrichment well.[^2]
- **Apollo.io** – Database + outreach. Free tier with limited credits; **Basic** from **\$59/month** (monthly billing) or **\$49/month** (annual) with ~1,000 export/email credits.[^3][^4]
- **Ocean.io** – Company/people data; **Starter** around **\$79/month** with 500 credits, but per-contact cost can climb above **\$1.50–\$2.50** with overages, which is steep for solo founders.[^5]
- **ZoomInfo Lite** – Has a genuine **free tier** (10 credits/month) and low-end paid Lite tiers up to **~\$750/month** across 1–3 seats; still usually overkill for <\$5K deals.[^6]
- **Dropcontact** – Email enrichment/cleaning; around **€24/month for 1,000 credits** (~1–2¢ per search at plan limits).[^7]
- **Hunter** – Email finder/verification; free 50 credits/month, paid from **~\$34–36/month** with several thousand credits/year; good for low-volume solo use.[^8][^9]
- **Snov.io** – All-in-one email finder + sequences; free trial, then from **\$39/month** for 1,000 credits; many users end up paying 2–3× base once they add higher send volumes.[^9]
- **Kanbox** – LinkedIn-native CRM/enrichment/export. Lifetime deal offers from **\$49–\$98** one-time, with export from Sales Nav/searches and lead manager in higher tier; subscription options around **\$59/month** per user for more advanced use.[^10][^11]

**Practical guidance:** for a sub-\$100/month solo budget, a realistic mix is:

- Clay *or* Apollo as core engine, plus
- Hunter/Dropcontact/Snov for extra verification, plus
- Kanbox (or similar) as LinkedIn-native helper if you’re heavily LinkedIn-led.[^2][^3][^10][^7]

***

## LinkedIn-native vs off-platform enrichment (and ToS-safe)

**LinkedIn-native (Sales Nav + Kanbox-class tools):**

- **Sales Navigator**: Sales Navigator Core runs about **€63.99/month on annual** or **€79.99/month monthly** in 2026, with Advanced higher.[^12]
- Tools like **Kanbox** can legally export “search results” or “event participants” into your own system, but they’re still operating in a gray area relative to LinkedIn ToS when automating at high volume.[^11][^10]

**Legally safer patterns for solo founders:**

- Use Sales Nav as a **discovery UI**, then:
    - Manually export small batches via CSV, or
    - Use tools that respect rate limits/official APIs where possible.
- Treat enrichment as a **separate step** off-platform: upload names, companies, and URLs into Clay/Hunter/Dropcontact for email discovery/verification rather than scraping LinkedIn emails directly.[^1]

**Off-platform enrichment:**

- Clay/Apollo/Ocean/Hunter/Snov/Dropcontact ingest partial data (name + domain/LinkedIn URL) and return emails, phones, company metadata, tech stack, etc., without scraping logged-in sessions.[^3][^5][^7][^2]

***

## “Discover–Enrich–Score–Personalize–Send” (2026 generalised workflow)

**Step 1 – Discover (names/handles)**

- B2B: Sales Nav, Apollo, Ocean, ZoomInfo Lite small-credits, or public lists (Crunchbase-like, job boards, directories) filtered by role, company size, industry, tech, funding, geography, hiring signals.[^6][^5][^3][^1]
- Creator: scrape or manually compile from:
    - X/IG/TikTok/YouTube bios,
    - Newsletter directories,
    - Community member lists (Circle, Skool, Discord, FB groups),
    - Podcast guests and event lineups.

**Step 2 – Enrich \& verify**

- Push that discovery output into Clay/Apollo/Ocean/Hunter/Snov/Dropcontact with:
    - Name, domain, LinkedIn/URL, title where known.
- Use **waterfall enrichment** (Clay or third-party orchestrators) to query multiple providers in sequence until a valid email or phone is found; Clay’s own marketing cites an example jump from around **30% to 80% coverage** while dropping cost from roughly **\$0.25 to <\$0.01 per enrichment** in one deployment.[^13][^2]

**Example funnel (realistic numbers):**

- Raw discovered leads: **58,605**
- Enriched with verified emails: **12,530**
- Enrichment rate: **21.4% overall**, with best segments reaching **30–40%** where filters are tight and the audience is active.[^1]
- ICP 7–10 scores in AI pass: often **30–60%** of enriched contacts, depending on how strict you set criteria.[^1]
- Contacted (cold email/DM) from that: typically **70–90%** of verified emails (excluding obvious bad fits, duplicates, or compliance removals).

**Step 3 – Score (ICP-fit + intent)**

- Run a batch AI job (Clay AI, CRM embedded AI, or external LLM) on the enriched CSV:
    - Output a **1–10 ICP score**, flags (e.g., “likely solo operator,” “creator with cohort course,” “SMB B2B buyer”), and a few tags (industry, use-case, persona, stage).[^1]
- Use your 1–10 solo model:
    - 1–3 = wrong-fit/low priority, 4–6 = “OK” for low-effort sequences, 7–8 = active pipeline, 9–10 = human-first-touch only.[^1]

**Step 4 – Personalize (AI draft + human gate)**

- For contacts with decent ICP scores:
    - AI reads their site/LinkedIn/content and writes a **first-line + angle tag** (“mentioned hiring SDRs last week,” “running live cohort, no evergreen back-end”).[^1]
    - Founder reviews/deletes/tweaks; top-tier targets get fully hand-written messages.[^1]

**Step 5 – Send \& sequence**

- Import into Instantly/Smartlead/Lemlist, Apollo sequences, or a CRM-native sender.
- Typical expectation:
    - **2–3% reply rate** for generic outreach.
    - **10–15%+** when personalization is anchored to real signals with clean lists.[^1]

***

## AI agents for prospect research (off‑the‑shelf vs DIY)

**Off‑the‑shelf “agents” solo founders can actually use:**

- **Clay AI**:
    - Reads a row (company URL / LinkedIn) and can output: short company summary, persona guess, pain hypotheses, and first-line personalization.[^14][^2]
- **ZoomInfo Copilot / Lite AI**:
    - On higher-end plans, can surface intent signals, lookalike accounts and recommended contacts; Lite free/low tiers mainly give basic data and limited credits, not full-blown SDR-in-a-box.[^6]
- **CRM-native research bots**:
    - Newer AI CRMs (Attio, folk with AI) can ingest email/product usage and generate “account briefs” and suggested next steps.[^1]
- **MarketBetter / niche research tools**:
    - Tools marketed as “prospect research agents” that take a domain/LinkedIn and output concise briefs, competitor lists, and content angles—these are particularly useful for creators/consultants doing intensive personalization.

**DIY agents (LangChain/Claude Agents/n8n + APIs)**

- **Capabilities:**
    - Given a LinkedIn URL or website:
        - Crawl public pages, pull structured items (team size, locations, pricing hints, tech stack from HTML, job postings).
        - Summarize into a one-page brief, assign fit score, and tag segment.
- **Realistic solo-founder overhead:**
    - Infra: low double-digit dollars/month (VPS + API calls) is achievable if you’re careful with rate limits.
    - Time: initial 10–20 hours to build; ongoing maintenance when sites change/block bots.
- **When it’s worth it:**
    - You’re technical and want a moat or very custom scoring, or
    - You have niche data sources not covered by Clay/Apollo/Ocean/etc.

***

## Example agents \& outputs

You can teach three archetype “agents” (regardless of how they’re implemented):

1. **Prospect research agent**
    - Input: LinkedIn URL + website.
    - Output: 1-page brief with:
        - Company/creator summary, audience or customer type.
        - 3–5 likely pains, 3–5 recent events (funding, launches, big posts).
    - Implementation: Clay AI column, CRM AI “notes,” or DIY LLM pipeline.[^14][^1]
2. **ICP-fit scoring agent (1–10)**
    - Input: enriched data + your written ICP definition.
    - Output: numeric score + reason (“7/10 – bootstrapped B2B SaaS CEO, 10–50 employees, active on LinkedIn, uses HubSpot, hiring SDR”).[^1]
3. **Segment tagging agent**
    - Input: same as above.
    - Output tags:
        - B2B: “Seed SaaS,” “Agency,” “SMB ecom,” “PLG tool,” or technographic tags (e.g., “Stripe + Webflow stack”).[^5]
        - Creator: “YouTube educator 10–50k subs,” “Twitter threader,” “cohort course,” “1:1 coach,” “community-led.”

***

## Dual-context application (B2B vs creator) using the same stack

**B2B SaaS / services (fields to prioritise):**

- Firmographics: company size, industry, location, revenue proxy.[^5][^6]
- Technographics: tools used (e.g., Stripe, HubSpot, Salesforce, Shopify).[^5]
- Triggers: funding rounds, big hires, open roles, product launches, new tools in stack.[^6][^5]
- Persona: role level (Head/VP/C-level), function (RevOps, Marketing, Engineering).

**Creator / coach (fields to prioritise):**

- Audience: follower count, list size, recent engagement levels.
- Offer: 1:1, group, cohort course, membership, done-for-you.
- History: past launches, pricing hints, testimonials.
- Community: memberships (Skool, Circle, Discord), collaborations, events/podcasts.

**Same “Clay/Apollo” workflow, different columns:**

- For B2B, your Clay recipe might enrich: company size, tech stack, funding, title, verified email, + AI tags (ICP score, use-case).[^2][^5]
- For creators, the same sheet might enrich: platform URLs, follow counts, recent content topics, offer type, DM-friendly channels, + AI tags (“launch-ready,” “audience–offer mismatch risk,” etc.).[^1]

***

## Costs, tradeoffs \& build-vs-buy

**Out-of-the-box (Clay/Apollo/Ocean/ZoomInfo Lite + email verification):**

- Pros:
    - Fast to set up, UX-friendly, bundled data sources.
    - Clay’s starter (about **\$149/month**) can handle a **few hundred–1,000+ enriched contacts** monthly for a solo founder when credits are used efficiently.[^2]
    - Apollo’s Basic (**\$49–59/month**) gives discovery + outbound in one tool.[^4][^3]
    - ZoomInfo Lite free/low tiers can be used as “data spice” when you need a handful of high-quality contacts.[^6]
- Cons:
    - Per-contact cost can climb if you’re sloppy with filters or routinely exceed credits (Ocean.io’s starter cost per contact, for example, easily exceeds **\$1.50** at plan limits; ZoomInfo enterprise-level plans are many thousands per year).[^15][^9][^5]

**DIY self-hosted (n8n + APIs like Clearbit/PDL/social scrapers):**

- Pros:
    - Full control over logic and sources, potential cost advantages at scale.
    - You can target obscure sources (forums, niche communities) commercial tools don’t index.
- Cons:
    - Up-front build cost (10–20+ hours of engineering) and ongoing maintenance.
    - API minimums and legal/ToS complexity (especially around LinkedIn and social scrapers).
- Realistic infra: A small VPS + modest API usage can be **well under \$100/month**, but this assumes you keep volume and error/redo rates under control.

**Solo-founder rule of thumb for the course:**

- At **0–10K MRR**, default to **buying** Clay/Apollo + a verifier (Hunter/Dropcontact/Snov) and only build custom agents/stacks where:
    - There’s a clear, repeated need not covered by existing tools, or
    - You’re using your engineering time as a deliberate moat, not as productive procrastination.[^16][^1]

If you like, I can next turn this into a course module skeleton (“Week X: Your Enrichment Stack,” exercises, checklists, and sample CSV headers for B2B vs creator).
<span style="display:none">[^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33]</span>

<div align="center">⁂</div>

[^1]: 07-chapter-07.md

[^2]: https://fullenrich.com/content/clay-pricing

[^3]: https://persana.ai/blogs/apollo-io-pricing

[^4]: https://www.cloudtalk.io/blog/apollo-pricing/

[^5]: https://fullenrich.com/content/ocean-io-pricing

[^6]: https://www.uplead.com/zoominfo-pricing/

[^7]: https://www.g2.com/products/dropcontact/pricing

[^8]: https://www.saasworthy.com/product/dropcontact/pricing

[^9]: https://skrapp.io/blog/hunter-io-alternatives/

[^10]: https://lifetimo.com/deal/kanbox-lifetime-deal/

[^11]: https://www.g2.com/products/kanbox/pricing

[^12]: https://www.kanbox.io/es/blog/linkedin-premium-precio

[^13]: 16-next-30-days.md

[^14]: https://www.lindy.ai/blog/clay-pricing

[^15]: https://www.cloudtalk.io/blog/zoominfo-pricing/

[^16]: 11-chapter-11.md

[^17]: https://www.clay.com/pricing

[^18]: https://university.clay.com/docs/plans-and-billing

[^19]: https://www.uplead.com/clay-pricing/

[^20]: https://clay.earth/pricing

[^21]: https://persana.ai/blogs/clay-pricing

[^22]: https://www.genesy.ai/blog/apollo-io-pricing

[^23]: https://www.cloudeagle.ai/blogs/blogs-clay-pricing-guide

[^24]: https://fullenrich.com/content/apollo-pricing

[^25]: https://www.zoominfo.com/pricing

[^26]: https://pipeline.zoominfo.com/sales/how-much-does-zoominfo-cost

[^27]: https://www.cognism.com/blog/zoominfo-pricing

[^28]: https://www.infrapeek.tech/blog/zoominfo-pricing-2026-what-real-customers-actually-pay

[^29]: https://www.getapp.com/sales-software/a/ocean-io/

[^30]: https://www.genesy.ai/blog/zoominfo-pricing

[^31]: https://www.ocean.io/pricing

[^32]: https://www.bookyourdata.com/blog/zoominfo-pricing

[^33]: https://www.capterra.com/p/181991/Ocean-io/

