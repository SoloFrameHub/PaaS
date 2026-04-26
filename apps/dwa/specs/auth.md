# Auth API — Behavioral Specification

## Intent
Session-based authentication using Lucia v3 with Argon2 password hashing.
No JWT tokens. Sessions stored server-side in Postgres via Drizzle ORM.

## Routes
- `POST /api/auth/signin` — Authenticate with email + password, set session cookie
- `POST /api/auth/signup` — Create account + profile, set session cookie
- `POST /api/auth/signout` — Invalidate Lucia session, clear cookie
- `GET /api/auth/session` — Return current user or null (no auth required)

## Security Invariants
- Passwords must be >= 12 characters
- Email is normalized: trimmed and lowercased
- Rate limiting on signin/signup (IP-based via Redis; key derived from `x-real-ip` / `cf-connecting-ip` / right-most of XFF — never the left-most entry)
- Mock auth (`NEXT_PUBLIC_MOCK_AUTH`) is blocked in production (NODE_ENV-only; no VERCEL_ENV conjunct since Dokploy doesn't set it)
- Session cookies: httpOnly, secure, sameSite=lax
- **No user enumeration**: signin collapses all failure branches to a single generic 400 with dummy argon2 verify on the `!user` path to level timing. Signup returns 200 `{ ok, redirect: '/signin' }` whether the email is new or already registered; it still runs argon2 hash on both paths to keep response time uniform.
- Argon2 params: memoryCost=19456, timeCost=2, outputLen=32, parallelism=1

## Error Behavior
| Condition | Status | Message |
|-----------|--------|---------|
| Invalid email format | 400 | "Invalid email" |
| Password < 12 chars | 400 | "Invalid password (min 12 characters)" |
| Wrong credentials (signin) | 400 | "Invalid email or password" |
| Email already used (signup) | 200 | `{ ok: true, redirect: '/signin' }` — indistinguishable from a successful signup; must not leak "email in use". |
| Rate limited | 429 | "Too many attempts. Please try again later." |
| No DATABASE_URL | 503 | "Auth not configured (no database)" |

## Data Flow
1. Client sends `{ email, password }` → server validates inline (not Zod)
2. Server queries user by email via Drizzle
3. Argon2 `verify()` or `hash()` for signin/signup
4. Lucia `createSession()` → session cookie in response
5. On signup: also creates empty profile row
