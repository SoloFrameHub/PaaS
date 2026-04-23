# Academy API — Behavioral Specification

## Intent
Course-based mental health education with lessons, quizzes, interactive components
(thought records, tracking logs, checklists), and an XP/progress system.

## Routes (all require auth)

### Lesson Completion
- `POST /api/academy/complete-lesson` — Mark lesson done, award XP, update progress

### Quizzes
- `GET /api/academy/quiz/{sectionId}/{courseId}/{lessonId}` — Get quiz questions
- `POST /api/academy/quiz/{sectionId}/{courseId}/{lessonId}` — Submit answers, get score

### Feedback
- `POST /api/academy/feedback` — Submit lesson feedback (rating 1-5 + message)

### Interactive Components (GET to load, POST to save)
- `/api/academy/assessment/{courseId}/{lessonId}` — In-lesson self-assessments
- `/api/academy/tracking-log/{courseId}/{lessonId}` — Behavioral tracking logs
- `/api/academy/thought-record/{courseId}/{lessonId}` — CBT thought records
- `/api/academy/checklist/{courseId}/{lessonId}` — Progress checklists
- `/api/academy/component-state/{courseId}/{lessonId}` — Generic interactive component state

## Behavioral Contracts
- Lesson completion is idempotent (completing twice doesn't double XP)
- Quiz scoring: `score = correct / total`, pass threshold varies by quiz
- XP defaults to 10 per lesson, overridable via `xpEarned` field
- `isLastLesson: true` triggers course completion logic
- All interactive component data is stored per-user per-lesson in profile JSONB
- Feedback stored in dedicated `lessonFeedback` table with `rating`, `category`, `message`

## Progress System
- XP earned per lesson completion
- Streak tracking (consecutive days of activity)
- Course completion when all lessons marked done
- Progress data cached in Redis, invalidated on updates

## Error Behavior
| Condition | Status | Message |
|-----------|--------|---------|
| Not authenticated | 401 | "Unauthorized" |
| Invalid courseId/lessonId | 400 | "Validation failed" |
| Quiz not found | 404 | "Not found" |
