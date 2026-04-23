# MHE Business Context

> Revenue model, what's built, IP, contacts, and costs.
> Last updated: 2026-02-20

---

## What Is This

A **mental health education platform** that teaches evidence-based coping techniques through structured courses with interactive exercises and AI-powered coaching. Target audience: individuals seeking self-guided mental wellness education.

---

## What's Built

### Curriculum (Content IP)

5 learning tracks with 30+ courses and 200+ lessons:

| Track | Courses | Topics |
|-------|---------|--------|
| Anxiety & Fear | 7 | Anxiety management, panic disorder, social anxiety, OCD, exposure therapy toolkit |
| Mood & Emotional Health | 7 | Depression (CBT-based), anger management, bipolar, grief/loss, emotional dysregulation, self-esteem, perfectionism |
| Sleep & Recovery | 2 | Insomnia (CBT-I), sleep mastery |
| Stress & Resilience | 2 | Trauma recovery, stress/burnout |
| Nutrition & Brain Health | 5 | Food-mood connection, gut-brain axis, dietary patterns, precision nutrition |

### Interactive Learning Components

20+ component types including:
- CBT thought records
- Mood/anxiety/sleep/energy tracking with trend charts
- Validated assessments (GAD-7, PHQ-9, PSQI, SPIN, PDSS-SR)
- Guided breathing exercises
- Exposure therapy hierarchies and practice logs
- Coping strategy rankers
- AI-powered quiz reflections
- Mindfulness timers

### AI Features

- **Wellness Coach**: Conversational AI with trauma-informed communication, crisis detection (988 Lifeline integration), and context-aware responses based on user profile and current course
- **Quiz Reflection**: AI feedback on open-ended exercise responses
- **Voice**: Text-to-speech and speech-to-text for accessibility

### Platform Features

- Onboarding flow with symptom assessment and goal setting
- Dashboard with progress analytics
- Gamification (XP, streaks, badges)
- Dark mode
- PWA support

---

## Revenue Model

### Payments via Polar (Sandbox Mode)

| Plan | ID | Price |
|------|----|-------|
| Monthly | `a75bcdb7-34ad-4fc5-b878-b2309ea0611b` | TBD |
| Annual | `16521213-3716-4406-9437-35f85693b71e` | TBD |

Currently in **sandbox mode** — no live payments processing yet. Polar handles subscription management, webhooks for access control, and checkout flow.

Success URL: `https://mental-health-education.soloframehub.com/checkout/confirmation`

---

## Infrastructure Costs

| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| VPS (shared with CAA) | Split | 46.202.88.248 |
| Domain (soloframehub.com) | Shared | Includes all subdomains |
| OpenAI API | Variable | Direct API for TTS/STT |
| OpenRouter | Variable | Routes coaching (Claude) + quiz reflection (GPT-4o-mini) |
| Polar | Free (sandbox) | Will take % on live transactions |

### AI Cost Optimization

Coaching uses Claude Sonnet 4.5 via OpenRouter (higher quality for sensitive mental health conversations). Quiz reflections use GPT-4o-mini (cheaper, sufficient for structured feedback). Models can be swapped per-task via environment variables without code changes.

---

## Key Differentiators

1. **Evidence-based content**: CBT, DBT, exposure therapy, mindfulness — not generic wellness tips
2. **Validated assessments**: Real clinical screening tools (GAD-7, PHQ-9, etc.)
3. **Crisis safety**: Built-in crisis detection with 988 Lifeline integration
4. **Trauma-informed AI**: Coach trained with specific communication principles
5. **Interactive exercises**: Not just reading — active engagement with thought records, tracking, breathing exercises

---

## What's Not Built Yet

- Live payments (Polar is in sandbox)
- Community forum (Flarum app exists in Dokploy but not fully integrated)
- Therapist/provider portal
- Mobile native app (PWA only)
- Multi-language support
- Group coaching sessions

---

## Domain & Hosting

| Asset | Location |
|-------|----------|
| Domain | `soloframehub.com` (shared) |
| Subdomain | `mental-health-education.soloframehub.com` |
| Hosting | Dokploy on shared VPS |
| Git | `github.com/SoloFrameHub/mental-health-education-platform` |
| n8n (automation) | `n8n.soloframehub.com` (shared) |
