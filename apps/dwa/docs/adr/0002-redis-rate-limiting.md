# ADR 0002: Redis-backed Sliding Window Rate Limiting

## Status
Accepted

## Context
AI-powered endpoints (Genkit flows) are expensive and susceptible to abuse. We needed a multi-instance rate limiting solution that works across Vercel/Next.js edge and serverless functions.

## Decision
We chose **Redis** (upstash or local) with a **Sliding Window** algorithm.

1.  Implemented `lib/security.ts` using Redis `multi()` transactions for atomicity.
2.  Used `ZSET` to store timestamps of requests.
3.  Integrated into Next.js `middleware.ts` for project-wide protection.

## Consequences
- **Accuracy**: Sliding window is more precise than fixed window.
- **Scalability**: Works across multiple serverless instances.
- **Dependency**: Requires a running Redis instance (Next.js middleware fallback to allowing requests if Redis is down for high availability).
