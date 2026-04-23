# Wellness Academy - Mental Health Education Platform

Evidence-based mental wellness education platform with AI-guided support. Built with **Next.js 16 (Turbopack)**, **React 19**, and **Tailwind CSS v4**.

## Key Features

- **Wellness Courses**: 30+ courses across Anxiety & Fear Management, Mood & Emotional Health, Nutrition & Brain Health, Sleep & Recovery, and Stress & Resilience.
- **AI Wellness Coach**: Conversational coaching for mental health topics via OpenRouter/OpenAI.
- **Interactive Assessments**: Quizzes, thought records, checklists, and tracking logs per lesson.
- **Personalized Onboarding**: Multi-step profiling to tailor course recommendations.
- **Crisis Resources**: 988 Crisis Line always accessible in the sidebar.
- **Community Forum**: Peer support via integrated forum.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI**: Tailwind CSS v4
- **Auth**: Lucia (session-based)
- **Database**: PostgreSQL via Drizzle ORM
- **Cache**: Redis
- **AI**: OpenRouter / OpenAI (coaching, TTS, STT)
- **Payments**: Polar
- **Deployment**: Dokploy (auto-deploys on push to main)

## Environment Variables

Create a `.env.local` file with the following keys:

```bash
# Database
DATABASE_URL=postgresql://...
DATABASE_POOL_SIZE=20  # Optional: max connections (default: 10 dev, 20 prod)

# Auth
AUTH_SECRET=your_secret

# AI
OPENROUTER_API_KEY=your_key
OPENAI_API_KEY=your_key  # Required for voice (TTS/STT)

# Redis (optional)
REDIS_URL=redis://...
REDIS_ENABLED=true

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup & Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Run Tests**:
   ```bash
   npm run test          # Unit tests (Vitest)
   npm run test:e2e      # E2E tests (Playwright)
   npm run test:all      # Both with coverage
   ```

4. **Production Build**:
   ```bash
   npm run build && npm run start
   ```

## Deployment

This repo auto-deploys to Dokploy on push to `main`.
- **Domain**: `mental-health-education.soloframehub.com`
- **Health check**: `GET /api/health`

## Project Structure

- `app/(default)`: Protected routes (Dashboard, Academy, Coach).
- `app/(auth)`: Authentication flow (signin/signup).
- `app/(onboarding)`: Multi-step wellness profiling.
- `app/api/`: API routes (health, auth, academy, AI).
- `lib/services`: Business logic (profile, quiz, voice).
- `lib/ai`: AI client, model routing, coaching flows.
- `e2e/`: Playwright end-to-end tests.
- `components/`: Shared React components.
