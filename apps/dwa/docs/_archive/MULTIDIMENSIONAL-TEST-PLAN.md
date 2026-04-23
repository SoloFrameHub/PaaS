# Multidimensional Test Plan: SoloFrameHub Academy

This plan extends the high-level validation plan with granular, technical test cases across four critical dimensions: **Structural**, **Logic**, **AI/Genkit**, and **Environmental**.

## 1. Dimensional Overview

| Dimension | Focus Area | Tools | Goal |
|-----------|------------|-------|------|
| **1. Structural** | Build, Types, Lint | TSC, ESLint, Next Build | 0 Build/Type errors, Strict lint compliance |
| **2. Logic** | Data, Auth, Persistence | Vitest, Browser Testing | Mock/Real parity, Firestore rules, Error handling |
| **3. AI/Genkit** | Coaching, RAG, Eval | Genkit Eval, Manual Audit | Persona consistency, Faithful RAG, No hallucinations |
| **4. Environmental**| UI/UX, Browser, Mobile | BrowserSubagent, Lighthouse | Core Web Vitals, Responsive, A11y compliant |

---

## 2. Dimension 1: Structural Integrity (Static Code Quality)

- [ ] **TypeScript Strictness**: Verify `noImplicitAny`, `strictNullChecks`, and `noUnusedLocals` are active.
- [ ] **Type Density**: Identify and refactor `as any` or `any` usages in `lib/services/`.
- [ ] **Dependency Audit**: Check for mismatched versions or peer dependency warnings.
- [ ] **Build Optimization**: Run `npm run analyze` and check for bundle leaks or duplicate imports.
- [ ] **MDX Robustness**: Ensure all 233+ lessons compile under the current Next.js 16/MDX configuration.

---

## 3. Dimension 2: Logic & Persistence (The "Core" Flow)

### 3.1 Authentication & Session
- [ ] **Mock Auth Persistence**: Verify that sessions persist across page refreshes in local development.
- [ ] **Session Expiry**: Test behavior when the session cookie is deleted or expires.
- [ ] **Unauthorized Access**: Ensure `getAuthContext()` correctly redirects to `/signin` for protected routes.

### 3.2 Data Integrity (V1 -> V2 Migration)
- [ ] **Schema Migration**: Test `profileService.migrateProfile` with a legacy "v1" profile object.
- [ ] **Mock vs Real Parity**: Ensure `localStorage` (mock) and `Firestore` (real) receive identical state updates.
- [ ] **Atomic Updates**: Verify that dot-notation updates in `updateProfile` don't overwrite unrelated sibling fields.

### 3.3 Mastery & Progress Logic
- [ ] **Lesson Completion**: Verify XP increment is exactly 10 points per lesson.
- [ ] **Course Lock/Unlock**: Test that Course 2 remains locked if Course 1 is incomplete.
- [ ] **Badge Trigger**: Verify that the "Course Finished" badge is awarded upon completing the final lesson.

---

## 4. Dimension 3: AI & Genkit Dimension (The "Intelligence" Layer)

### 3.1 AI Roleplay Consistency
- [ ] **Persona Adherence**: Test that a 'C' (Conscientious) buyer doesn't suddenly become aggressive or highly emotional.
- [ ] **Context Injection**: Verify that the AI references the specific "Business Name" and "Founder Archetype" provided in onboarding.
- [ ] **Evaluation Rubric**: Test the logic that calculates the final roleplay score (0-100) for fairness and accuracy.

### 3.2 RAG & Document Intelligence
- [ ] **Indexing Latency**: Measure time to index a 5MB PDF.
- [ ] **Retrieval Accuracy**: Ask the coach a question that can *only* be answered by an uploaded document.
- [ ] **PII Safety**: Ensure the AI refuses to summarize "sensitive" user data if requested via prompt injection.

---

## 5. Dimension 4: Environmental Dimension (UX & Performance)

### 5.1 Responsive Integrity
- [ ] **Mobile Sidebar**: Ensure the academy sidebar collapses correctly on viewport width <1024px.
- [ ] **Touch Targets**: Verify all "Complete Lesson" and "Submit Quiz" buttons are easily clickable on mobile.

### 5.2 Performance & Vitals
- [ ] **FCP (First Contentful Paint)**: Target <1.5s for the dashboard.
- [ ] **TBT (Total Blocking Time)**: Target <200ms during AI response streaming.
- [ ] **CLS (Cumulative Layout Shift)**: Verify that loading state transitions don't cause layout jumps.

---

## 6. Execution Tracking

| Test Case ID | Dimension | Description | Status | Notes |
|--------------|-----------|-------------|--------|-------|
| D1-TC01 | Structural| Run `npm run lint` | [/] | Config fixed, 0 errors |
| D1-TC02 | Structural| Run `npx tsc --noEmit` | [x] | Success |
| D2-TC01 | Logic | Mock Auth Lesson Save | [x] | Fixed in Step 150 |
| D2-TC02 | Logic | Onboarding LS Persistence| [x] | Fixed in Step 174 |
| D3-TC01 | AI | Roleplay Persona Check | [ ] | Pending |
| D4-TC01 | Environ | Mobile Menu Toggle | [ ] | Pending |
