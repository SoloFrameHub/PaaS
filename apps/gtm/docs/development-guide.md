# SoloFrameHub Development Guide

This guide documents mandatory architectural and UI standards for the SoloFrameHub Academy project.

## 1. Middleware vs. Proxy
**Standard:** Use `proxy.ts` with `export async function proxy(request)` instead of `middleware.ts`.
**Rationale:** In Next.js 16 (Turbopack), the `middleware.ts` convention is deprecated in favor of `proxy.ts` for performance and architectural alignment.
**Implementation:**
- **File name**: Must be `proxy.ts` at the project root.
- **Function name**: Must be `export async function proxy(request: NextRequest)`.
- Ensure `matcher` configs are correctly defined to prevent circular redirect loops.

## 2. UI Consistency: Chat & Overlays
**Standard:** The `FlyoutChat` component in `app/(default)/layout.tsx` is the **single source** for the floating AI advisor. **Do NOT add additional chat/advisor buttons to individual pages.**
**Problem Fixed (Dec 2024):** A hardcoded gray advisor button was added to `[lessonId]/page.tsx`, overlapping with the layout's `FlyoutChat`. This was removed.
**Rule:**
- Any chat-related UI MUST be in a layout file, not a page file.
- If a specific page needs a unique button, coordinate z-index and offset to avoid collision (e.g., `bottom-20` vs `bottom-6`).

## 3. Lesson Content Standards
**Dual-Context Integration:**
- Every lesson MUST include a "Creator Perspective" section or "Dual Example" (B2B SaaS vs. Creator/Coach).
- Terminology should be inclusive of "Audience" and "Followers" alongside "Customers" and "Leads".
- Every new lesson must be registered in `@/lib/data/curriculum.ts`.

**No Duplicate Headings:**
- Do NOT include an H1 (`# Title`) in lesson markdown files. The page template renders the lesson title from `curriculum.ts`.
- Lesson content should start with body text or an H2 (`## Section`).

## 4. Quiz Schema
- Ensure every quiz JSON follows the `Quiz` interface.
- Quizzes must include at least one `reflection` type question with a `promptForAI` evaluation.
- Files should be placed in `server/data/quizzes/[section]/[course]/lesson-[id].json`.
