# Onboarding API — Behavioral Specification

## Intent
Multi-step wellness onboarding that builds a personalized user profile.
Each step saves partial data to the user's JSONB profile in Postgres.
Crisis screening is safety-critical and must always be handled carefully.

## Routes (all require auth)
1. `POST /api/onboarding/basic-info` — Display name
2. `POST /api/onboarding/symptoms` — Mental health areas of focus + severity
3. `POST /api/onboarding/crisis-screening` — Safety/suicidal ideation screening
4. `POST /api/onboarding/goals` — Wellness goals, time commitment, learning style
5. `POST /api/onboarding/about-you` — Age, life stage, support network
6. `POST /api/onboarding/your-experience` — Coping strategies, therapy history, triggers
7. `POST /api/onboarding/in-your-words` — Free-text reflections (max 1000 chars each)
8. `POST /api/onboarding/questionnaire` — Structured questionnaire data
9. `POST /api/onboarding/assessment` — Trigger AI analysis of collected data
10. `POST /api/onboarding/complete` — Mark onboarding finished, save final assessment

## Safety-Critical: Crisis Screening
- Fields: `hasSuicidalThoughts`, `hasSelfHarmUrges`, `has988Acknowledged`, `feelsSafe`
- If suicidal thoughts or self-harm indicated: UI must show 988 Suicide & Crisis Lifeline
- `has988Acknowledged` must be true before user can proceed
- This data influences AI coaching behavior (crisis detection sensitivity)

## Behavioral Contracts
- Steps can be completed in any order (UI guides linear flow, API doesn't enforce)
- Each step is idempotent — re-submitting overwrites previous data
- All data stored in single JSONB `profile.data` column
- Assessment step calls AI (OpenRouter) to generate course recommendations
- "Complete" step sets `onboardingCompleted: true` on profile

## Validation
- Centralized schemas in `lib/validations/onboarding.ts`
- Some routes use `validateBody()`, others use inline `safeParse()`
- Free-text fields capped at 1000 characters
- Symptoms require at least 1 selection
- Goals require at least 1 selection

## Error Behavior
| Condition | Status | Message |
|-----------|--------|---------|
| Not authenticated | 401 | "Unauthorized" |
| Validation failed | 400 | "Validation failed" |
| AI service down (assessment) | 503 | Service unavailable |
