# Forum API — Behavioral Specification

## Intent
Community discussions backed by Flarum. All user-generated content goes through
AI moderation before publishing to ensure safety in a mental health context.

## Routes

### Public
- `GET /api/forum/discussions` — List discussions (filterable by sort, tag, search)
- `GET /api/forum/tags` — List available tags

### Authenticated + Moderated
- `POST /api/forum/discussions` — Create a new discussion
- `POST /api/forum/posts` — Reply to a discussion
- `POST /api/forum/posts/{id}/like` — Like/unlike a post

## Content Moderation
- All POST routes for discussions and posts are wrapped with `withModeration()`
- Moderation uses AI to assess content risk (0-3 scale)
- Risk level >= 2 blocks the content (HTTP 422)
- Blocked responses include crisis resources if relevant
- All moderation decisions are logged to `moderationLog` table asynchronously

## Behavioral Contracts
- Discussions require: title (5-200 chars), content (10-10000 chars), 1-5 tags
- Posts require: discussionId, content (1-10000 chars)
- Flarum user tokens are lazily created via `getOrCreateUserToken()`
- Username derived from email prefix (before @)
- Like endpoint toggles — calling twice unlikes

## Flarum Integration
- Backend communicates with Flarum API via `lib/flarum` client
- Discussions list supports: sort (popular/newest/oldest/top), tag filter, search, pagination
- Flarum handles the actual forum storage; our API is a proxy with auth + moderation

## Error Behavior
| Condition | Status | Message |
|-----------|--------|---------|
| Not authenticated | 401 | "Unauthorized" |
| Content blocked | 422 | Moderation message + crisis resources |
| Flarum unavailable | 500 | "An internal error occurred" |
