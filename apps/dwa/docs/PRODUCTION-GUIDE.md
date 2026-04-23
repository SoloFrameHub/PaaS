# Production Deployment & Operations Guide

This document provides the standard operating procedures for the **SoloFrameHub Customer Acquisition Academy**.

## 🚀 Environment Setup

### 1. Firebase Project
- Ensure **Authentication** (Email/Password) is enabled.
- **Firestore** must be in "Production Mode".
- Deploy the latest security rules using `firebase deploy --only firestore:rules`.

### 2. Service Account
- Generate a new private key in IAM -> Service Accounts -> `firebase-adminsdk`.
- Securely store this key. **Never commit it to Git.**

### 3. Environment Variables
Copy `.env.example` to your production host (Vercel/Coolify/DigitalOcean) and populate all values.

## 🛠 Maintenance Tasks

### Data Seeding
If you reset the database or deploy to a new environment, run the 3D Matrix seed script:
```bash
npx tsx scripts/seed-production.ts
```

### Content Validation
Every time you add or modify a lesson:
```bash
npm run validate-lessons
```

## 🛡 Security & Resilience

### Rate Limiting
The custom middleware in `middleware.ts` protects AI endpoints.
- **AI Limits**: 10 req/min (prevent cost overruns).
- **General Limits**: 60 req/min.
- To scale this for multiple instances, modify `lib/security.ts` to use Redis.

### Error Monitoring
We recommend integrating **Sentry** for production error tracking.

## 📦 Deployment Flow
1. **GitHub Push**: Code is automatically pushed to the `main` branch.
2. **Build**: Next.js optimized production build.
3. **Smoke Test**: Verify the `/signin` and `/onboarding` flows immediately after deploy.
