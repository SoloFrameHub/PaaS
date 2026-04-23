# Solo Frame Hub - Technical Documentation

> **The systematic customer acquisition engine for Solo Founders.**
> Built with Next.js 16, React 19, Tailwind CSS v4, and Firebase Genkit.

---

## 🏗 Architecture Overview

The platform uses a modern **Next.js App Router** architecture with a focus on type-safety, performance, and AI-native features.

### Core Stack
- **Frontend**: React 19, Next.js 16, Tailwind CSS v4.
- **Backend API**: Next.js Route Handlers.
- **AI Orchestration**: Firebase Genkit (using Gemini 2.0 Flash / 1.5 Pro).
- **Database**: Google Firestore (main data) + Redis (caching & rate limiting).
- **Authentication**: Firebase Auth (with mock support for local development).
- **UI System**: Mosaic Pro (Utility-first with custom premium components).

### System Design
We follow a **Repository Pattern** for data access to decouple business logic from Firestore/Cache implementations.

- `lib/repositories/`: Data access layer (e.g., `profileRepository.ts`).
- `lib/services/`: Domain logic and orchestration (e.g., `profileService.ts`, `quizService.ts`).
- `lib/genkit/`: AI Flow definitions and model configurations.

---

## 📂 Project Structure

```bash
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login, Signup, Reset Password
│   ├── (default)/          # Dashboard, Academy, Hub (Protected)
│   ├── (onboarding)/       # Founder profiling and AI analysis
│   └── api/                # API Route Handlers
├── components/             # React Components (Mosaic + Custom)
│   ├── ui/                 # Base UI primitives
│   └── ai/                 # AI-specific interface components
├── lib/                    # Core Utilities
│   ├── firebase/           # Admin & Client SDK setup
│   ├── genkit/             # AI Flows (Genkit)
│   ├── repositories/       # Data Access Layer
│   ├── services/           # Business Services
│   ├── logger.ts           # Structured Logging
│   └── security.ts         # Rate Limiting & Security
├── server/                 # Legacy/Static Data
│   └── data/               # Static course & quiz definitions
├── types/                  # Shared TypeScript interfaces
└── docs/                   # Documentation
    ├── adr/                # Architecture Decision Records
    ├── API.md              # API Documentation
    └── PRODUCTION-GUIDE.md # Production deployment guide
```

---

## 🛡 Security & Hardening

1. **Content Security Policy (CSP)**: Managed in `next.config.js`.
2. **Rate Limiting**: Sliding window implementation using Redis in `middleware.ts`.
3. **CSRF Protection**: Origin/Referer verification in middleware for mutations.
4. **Input Validation**: Zod-based schema validation for all AI flows and API routes.
5. **Structured Logging**: Consistent JSON logging in production for audit trails.

---

## 🧪 Testing

We use **Vitest** for unit and integration testing.

- **Unit Tests**: `lib/**/*.test.ts`
- **Mocking**: Redis and Firebase are mocked for local test runs.

Run tests:
```bash
npm test
```

---

## 🎓 Curriculum System

The academy currently supports 3 tracks (Foundations, Marketing, Sales) with 20+ lessons.
Lessons are authored in **MDX/Markdown** and stored in `server/data/content`.
Quizzes are defined in **JSON** in `server/data/quizzes`.

---

## 📜 ADRs (Architecture Decision Records)

- [ADR 0001: Repository Pattern](./adr/0001-repository-pattern.md)
- [ADR 0002: Redis for Rate Limiting](./adr/0002-redis-rate-limiting.md)

---

## 🔗 Internal Links
- [API Documentation](./API.md)
- [Production Ready Guide](./PRODUCTION-GUIDE.md)
- [Curriculum Overview](./course-creation-context-and-prompts/CURRICULUM.md)