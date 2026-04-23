# Website Update Prompt — Academy → OS Rebrand + New Features

> Use this prompt to update all static HTML files in the `/website/` directory to reflect the platform rebrand and new capabilities. Feed this entire document to Claude or your AI assistant.

---

## Context

The SoloFrameHub platform has been rebranded from **"Customer Acquisition Academy"** to **"AI Client Acquisition OS"** (Operating System). The Next.js app has already been updated. The static marketing website in `/website/` still contains old "Academy" language and is missing new features.

## Files to Update

### Primary Pages (English)

- `website/index.html` — Homepage (7 Academy references)
- `website/solo-founders-ai-client-acquisition-os.html` — Main product page (31 references)
- `website/solo-founders-ai-customer-acquisition-playbook.html` — Book page (23 references)
- `website/community-forums.html` — Community page (4 references)
- `website/platform-architecture.html` — Architecture page (25 references)
- `website/solo-founder-apps.html` — Apps page (5 references)
- `website/solo-founders-ai-60-day-roadmap-book.html` — Roadmap book (16 references)
- `website/solo-founders-ai-gtm-academy.html` — GTM page (28 references)
- `website/solo-founders-ai-startup-academy.html` — Startup page (22 references)
- `website/8-gtm-frameworks-compounding-growth-book.html` — Frameworks book (14 references)

### Spanish Translations (mirror all English changes)

- `website/es/index.html`
- `website/es/solo-founders-ai-client-acquisition-os.html`
- `website/es/solo-founders-ai-customer-acquisition-playbook.html`
- `website/es/community-forums.html`
- `website/es/platform-architecture.html`
- `website/es/solo-founder-apps.html`
- `website/es/solo-founders-ai-60-day-roadmap-book.html`
- `website/es/solo-founders-ai-gtm-academy.html`
- `website/es/solo-founders-ai-startup-academy.html`

### Legacy/Backup Files (do NOT update)

- `website/index 2.html` — old backup
- `website/index-book-cover copy.html` — old backup
- `website/index-real.html` — old backup
- `website/index-es.html` — old backup
- `website/_pgbackup/` — Pinegrow backups

---

## 1. Global String Replacements (All Pages)

Apply these replacements across ALL active HTML files listed above:

| Old String                     | New String                 |
| ------------------------------ | -------------------------- |
| `Customer Acquisition Academy` | `AI Client Acquisition OS` |
| `customer acquisition academy` | `AI Client Acquisition OS` |
| `Sales Academy`                | `AI Client Acquisition OS` |
| `the Academy`                  | `the OS`                   |
| `The Academy`                  | `The OS`                   |
| `academy members`              | `community members`        |
| `Academy-Wide`                 | `Community-Wide`           |
| `join the academy`             | `join the OS`              |
| `Join the Academy`             | `Join the OS`              |
| `academy content`              | `OS content`               |
| `Academy Graduate`             | `OS Graduate`              |

**In `<title>` tags and OG meta specifically:**

| Old                                                                          | New                                                                |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `Customer Acquisition Academy \| AI-Native Sales Training for Solo Founders` | `AI Client Acquisition OS — Replace Your Sales Team for $49/month` |
| `"name": "Solo Founder's Customer Acquisition Academy"`                      | `"name": "AI Client Acquisition OS"`                               |

**In FAQ structured data (JSON-LD):**

| Old                                                 | New                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `The Customer Acquisition Academy is $49 per month` | `The AI Client Acquisition OS is $49 per month. Not a course — an operating system that replaces a $5K/month sales team` |

---

## 2. Messaging Updates (Product Page: `solo-founders-ai-client-acquisition-os.html`)

### Hero Section

Update the primary headline and subheadline:

**Old pattern:** "AI-Native Sales Training" or "Customer Acquisition Academy"
**New:**

- **Headline:** `Not a Course — an Operating System`
- **Subheadline:** `The AI Client Acquisition OS replaces your sales team for $49/month. 48 courses, AI coaching, roleplay simulations, and cohort accountability — all personalized to your ICP.`

### Value Proposition

Add or update the primary value props to include:

1. **"$49/month replaces a $5K/month sales team"** — lead with cost comparison
2. **"71% of founders misjudge their acquisition skills"** — cite the Workera/Stanford stat
3. **"30-minute sprints, not 400-hour courses"** — emphasize quick wins
4. **"Not education — execution"** — the OS framing

### New CTA Buttons

Replace existing CTAs with:

- Primary: `Take the Free Readiness Assessment` → links to `/readiness-score`
- Secondary: `See How It Compares` → links to `/compare`
- Tertiary: `Start for $49/month` → links to `/checkout`

### New Section: Readiness Score CTA

Add a section (above or near the pricing section) with:

```html
<section>
  <h2>What's Your Customer Acquisition Readiness Score?</h2>
  <p>
    71% of founders dangerously overestimate or underestimate their acquisition
    skills. Take the free 5-minute assessment to find your blind spots.
  </p>
  <a href="/readiness-score">Take the Free Assessment</a>
</section>
```

### New Section: Comparison Table

Add a brief comparison snippet linking to the full compare page:

```html
<section>
  <h2>$49/month replaces a $5K/month sales team</h2>
  <p>
    AI coaching, roleplay simulations, structured learning, cohort community —
    everything a sales rep, agency, or course library would give you, for 1% of
    the cost.
  </p>
  <a href="/compare">See the full comparison</a>
</section>
```

### New Section: 30-Minute Sprints

Add a section highlighting quick wins:

```html
<section>
  <h2>Get Results in 30 Minutes, Not 30 Days</h2>
  <p>
    Start with a sprint — AI-coached workshops that deliver a tangible output in
    one sitting:
  </p>
  <ul>
    <li>Cold Email Sprint: Write your first 3-email sequence</li>
    <li>LinkedIn Sprint: Transform your profile into a sales machine</li>
    <li>Sales Script Sprint: Build a structured discovery call script</li>
  </ul>
</section>
```

---

## 3. Navigation Updates (All Pages)

Update the top navigation and footer across all pages:

### Add to Navigation

- **"Readiness Score"** → `/readiness-score` (new nav item)
- **"Compare"** → `/compare` (new nav item)

### Update Footer Links

- Replace any "Academy" link text with "OS"
- Add link to `/readiness-score`
- Add link to `/compare`

---

## 4. SEO & Structured Data Updates (All Pages)

### Meta Descriptions

Update all `<meta name="description">` to include "operating system" and "$49/month replaces a $5K/month sales team" language.

### OG Images

Update `og:image` references from `customer-acquisition-academy.webp` to a new OS-branded image if available, or keep current and update alt text.

### JSON-LD Structured Data

- Change `@type: "Course"` → keep as Course but update `name` to `"AI Client Acquisition OS"`
- Update all `description` fields to use OS language
- Add `"offers.description": "Not a course — an operating system. $49/month replaces a $5K/month sales team."`

### FAQ Schema Updates

Add new FAQ entries:

```json
{
  "@type": "Question",
  "name": "What's the Readiness Score?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "A free 5-minute assessment that scores your customer acquisition readiness across 8 dimensions (ICP clarity, positioning, content engine, channel readiness, sales process, objection handling, AI readiness, pipeline tracking). 71% of founders misjudge their skills — this shows you exactly where your blind spots are."
  }
},
{
  "@type": "Question",
  "name": "How is this different from a course?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "It's an operating system, not a course. You get AI coaching that knows your business, roleplay against realistic buyer personas, 30-minute sprint workshops that produce real deliverables, cohort accountability pods, and a before/after dashboard tracking your actual progress. Courses teach. The OS executes."
  }
},
{
  "@type": "Question",
  "name": "What are 30-Minute Sprints?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Quick-win workshops where AI coaches you through creating a specific deliverable in 30 minutes: your first cold email sequence, a sales-ready LinkedIn profile, or a structured discovery call script. You walk away with something you can use immediately."
  }
}
```

---

## 5. Spanish Pages (`website/es/`)

Mirror ALL English changes in Spanish:

| English                                     | Spanish                                               |
| ------------------------------------------- | ----------------------------------------------------- |
| `AI Client Acquisition OS`                  | `Sistema Operativo de Adquisición de Clientes con IA` |
| `Not a Course — an Operating System`        | `No es un Curso — es un Sistema Operativo`            |
| `$49/month replaces a $5K/month sales team` | `$49/mes reemplaza un equipo de ventas de $5K/mes`    |
| `Readiness Score`                           | `Puntuación de Preparación`                           |
| `Take the Free Assessment`                  | `Toma la Evaluación Gratuita`                         |
| `See How It Compares`                       | `Ver la Comparación`                                  |
| `30-Minute Sprint`                          | `Sprint de 30 Minutos`                                |
| `community members`                         | `miembros de la comunidad`                            |

---

## 6. Key URLs to Link To

| Feature              | URL                                 |
| -------------------- | ----------------------------------- |
| Readiness Score Quiz | `/readiness-score`                  |
| Results Page         | `/readiness-score/results`          |
| Compare Page         | `/compare`                          |
| Checkout             | `/checkout`                         |
| Dashboard            | `/dashboard`                        |
| Workshops            | `/workshop`                         |
| Sprint: Cold Email   | `/workshop/sprint-cold-email`       |
| Sprint: LinkedIn     | `/workshop/sprint-linkedin-profile` |
| Sprint: Sales Script | `/workshop/sprint-sales-script`     |

---

## 7. Tone & Voice Guidelines

- **Lead with outcomes, not features.** "Replace your sales team" not "48 courses available"
- **Use specific numbers.** "$49/month", "71% misjudge", "30 minutes", "8 dimensions"
- **Frame as infrastructure, not education.** "Operating system" not "training program"
- **Address the solo founder directly.** "You don't need a sales team. You need the OS."
- **Urgency through blind spots.** "What you don't know is costing you deals every week."

---

## 8. Do NOT Change

- File names (URLs are already indexed by search engines)
- The book pages' core content (just update Academy → OS where referenced)
- Image file paths
- Google Analytics tracking code
- CSP headers
- `_pgbackup/` directory
- `pinegrow.json`
