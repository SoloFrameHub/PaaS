# Load Testing Guide

## Overview

This document outlines the load testing strategy for SoloFrameHub v2 to ensure the platform can handle expected production traffic and scale effectively.

## Testing Strategy

We use **k6** for load testing due to its developer-friendly JavaScript API and excellent performance.

### Objectives

1. **Verify Scalability**: Ensure system handles 100+ concurrent users
2. **Identify Bottlenecks**: Find slow API endpoints or database queries
3. **Validate Stability**: Ensure system doesn't crash under sustained load
4. **Measure Latency**: Verify p95 response times are under 500ms

---

## Tools & Setup

### Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) installed locally
- Production build running locally (`npm run build && npm start`)
- Redis instance available (if testing rate limiting)

### Installation

```bash
# MacOS
brew install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

---

## Test Scenarios

### 1. Authentication Load Test ([auth-load.js](../load-tests/auth-load.js))

**Goal:** Verify authentication system performance.

- **Flow:** Homepage → Login Page → Submit Credentials → Dashboard
- **Load:** 50 concurrent users
- **Duration:** 5 minutes
- **Pass Criteria:** < 1% error rate, p95 response < 800ms

### 2. Onboarding Flow Test ([onboarding-load.js](../load-tests/onboarding-load.js))

**Goal:** Stress test the write-heavy onboarding process.

- **Flow:** Welcome → Questionnaire → Business Info → Context (Upload) → Analysis
- **Load:** 20 concurrent users
- **Duration:** 10 minutes
- **Pass Criteria:** < 1% error rate, no upload failures

### 3. AI Endpoint Stress Test ([ai-stress.js](../load-tests/ai-stress.js))

**Goal:** Test capacity of Genkit AI endpoints (mocked for cost).

- **Flow:** Roleplay Chat / Analysis Request
- **Load:** 10 concurrent users (due to high compute/cost foundation models)
- **Duration:** 3 minutes
- **Pass Criteria:** Valid rate limiting behavior, graceful degradation

---

## Baseline Performance Targets

| Endpoint | p50 Target | p95 Target | Max Throughput |
|----------|------------|------------|----------------|
| Static Pages | < 100ms | < 300ms | 500 RPS |
| API (Read) | < 200ms | < 500ms | 200 RPS |
| API (Write) | < 300ms | < 800ms | 100 RPS |
| AI Endpoints | < 2s | < 5s | 50 RPS |

---

## Running Reports

Run tests and output summary to console:

```bash
k6 run load-tests/auth-load.js
```

Generate HTML report:

```bash
K6_WEB_DASHBOARD=true k6 run load-tests/auth-load.js
```

---

## Mitigation Strategies

If performance targets are missed:

1. **Database:** Add indexes in Firestore, optimize queries
2. **Caching:** Enable Redis caching for read-heavy routes
3. **Compute:** Scale Vercel/Cloud Run instances
4. **Rate Limiting:** Adjust limits in `middleware.ts`

---

## Checklists Before Large Scale Tests

- [ ] **Disable External AI Calls**: Use mock mode for AI to avoid massive bills
- [ ] **Use Test Data**: Do not run destructive tests on production DB
- [ ] **Warm Up**: Allow system to warm up for 1 minute before measuring
- [ ] **Monitor Resources**: Watch CPU/Memory/Network during test

