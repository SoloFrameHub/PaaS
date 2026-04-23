# Architecture & Quality Improvement Plan (Best in Class)

This plan outlines the steps to move the SoloFrameHub codebase from a 7.5/10 to a 9.5/10+ "Best in Class" status, addressing code duplication, separation of concerns, and type safety.

## 1. Unified API Authentication & Request Handling
**Problem:** Auth validation and error handling are duplicated across ~15 API routes.
**Goal:** 100% DRY API routes with standardized error responses.

- [ ] Create `lib/api/with-auth.ts`: A higher-order function (HOF) to wrap API handlers.
- [ ] Move session verification, mock auth bypass, and user context extraction into the HOF.
- [ ] Implement `lib/api/response-utils.ts` for standardized `{ data, error, statusCode }` formats.
- [ ] Refactor all routes in `app/api/` to use `withAuth`.

## 2. Decoupling & Modularizing Services
**Problem:** `ProfileService` is over 700 lines and mixes production logic with mock logic. Service logic is tightly coupled with Firestore.
**Goal:** Smaller, single-responsibility services and decoupled mock logic.

- [ ] Extract mock logic from `ProfileService` into a `MockProfileProvider` (Strategy Pattern).
- [ ] Split `ProfileService` into:
    - `ProfileCoreService`: Basic CRUD and metadata.
    - `ProfileContextService`: AI-inferred context and aggregation.
    - `OnboardingService`: Specific logic for the onboarding flow.
- [ ] Ensure services under 200-300 lines where possible.

## 3. Strengthening Type Safety (Zero `any`)
**Problem:** `any` used in `BaseRepository`, `SafeContext`, and other critical paths. Duplicated quiz types.
**Goal:** 100% strict type coverage across the entire system.

- [ ] Fix `UpdateData` typing in `BaseRepository.ts` to replace `any`.
- [ ] Audit `types/` directory to remove all `any` occurrences.
- [ ] Consolidate `QuizQuestion` and `QuizResult` types into a single source of truth.
- [ ] Use `branded types` for IDs (e.g., `UserId`, `CourseId`) to prevent parameter swapping.

## 4. Data Fetching Abstraction Layer
**Problem:** Client components reach directly to `/api` with raw `fetch`.
**Goal:** Centralized API client and consistent data fetching pattern.

- [ ] Create `lib/api/client.ts`: A typed wrapper around `fetch`.
- [ ] (Optional/Advanced) Implement `TanStack Query` for caching, revalidation, and loading states.
- [ ] Create custom hooks for all major data resources (e.g., `useProfile`, `useCurriculum`).

## 5. Mock Logic Isolation
**Problem:** `if (process.env.MOCK_AUTH === 'true')` sprinkled throughout business logic.
**Goal:** Mock logic should be injected at the infrastructure layer, not leaked into business logic.

- [ ] Implement `Repository` variants or `Service` providers for mock environments.
- [ ] Switch between providers at the DI (Dependency Injection) or Factory level.

---

## Execution Phases

### Phase 1: API Hardening (Low Effort, High Impact)
- [ ] Auth HOF implementation.
- [ ] Standardized Response utils.
- [ ] Refactor 5 priority API routes.

### Phase 2: Type Integrity & Service Refactoring
- [ ] `ProfileService` split.
- [ ] Elimination of `any` in Repository.
- [ ] Type deduplication.

### Phase 3: Abstraction & Patterns
- [ ] API Client Wrapper.
- [ ] Custom hooks for data fetching.
- [ ] Final audit.
