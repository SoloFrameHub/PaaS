# ADR 0001: Implementing the Repository Pattern

## Status
Accepted

## Context
As the application grew, business logic in `profileService.ts` and various API routes became tightly coupled with the Firebase Admin SDK. This made testing difficult (requiring Firestore mocks) and made it hard to implement caching and versioning cleanly.

## Decision
We decided to implement the **Repository Pattern** to decouple our data access layer from our domain logic.

1.  Created `BaseRepository` to handle common boilerplate.
2.  Created `ProfileRepository` to manage `FounderProfile` persistence.
3.  The `ProfileService` now consumes the repository instead of the `adminDb` directly.

## Consequences
- **Improved Testability**: We can now mock the repository instead of the entire Firebase SDK.
- **Cleaner Caching**: Redis caching logic is now centralized or easily added to the repository layer.
- **Flexibility**: If we ever swap Firestore for another database, only the repositories need to change.
- **Complexity**: Adds an extra layer of abstraction.
