# Transition Target: From Firebase to This Stack

We are **transitioning from**:

- **Auth:** Firebase Auth  
- **Database:** Firestore (profiles, progress, onboarding)  
- **Storage:** Firebase Storage  
- **Course content:** Files in `server/data/content` (unchanged)

**To** (target stack, defined in this project):

| Layer | From | To (target) |
|-------|------|-------------|
| **Auth** | Firebase Auth | **Lucia** or **NextAuth.js** (sessions in Postgres or Redis) |
| **Database** | Firestore | **PostgreSQL** (users, profiles, curriculum state) |
| **ORM / types** | — | **Drizzle** or **Prisma** |
| **Storage** | Firebase Storage | **S3-compatible** (MinIO on VPS or **Cloudflare R2**) |
| **Course content** | `server/data/content` (files) | Unchanged (still files) |
| **AI** | Genkit + Gemini | **OpenAI API** (coaching chat already migrated) |
| **RAG** | Vertex AI Search | **pgvector** (Postgres) or **Qdrant** (Docker) |
| **Hosting** | Firebase App Hosting | **Coolify** on VPS |

Full architecture, migration order, and env cleanup are in **[VPS-REARCHITECTURE.md](./VPS-REARCHITECTURE.md)**.

No Google products in the target stack. TypeScript-native (Next.js, Drizzle/Prisma, OpenAI, Lucia/NextAuth, Trigger.dev).
