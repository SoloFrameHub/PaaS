import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
      <Link
        href="/docs"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Documentation
      </Link>

      <article className="prose prose-indigo dark:prose-invert max-w-none">
        <h1>Architecture Overview</h1>
        <p className="lead">
          Digital Wellness Academy is a Next.js 16 application with PostgreSQL, Redis, and Python ML services.
        </p>

        <h2>Stack</h2>
        <ul>
          <li><strong>Frontend</strong>: Next.js 16 (App Router), React 19, Tailwind CSS 4</li>
          <li><strong>Backend</strong>: Next.js API routes, TypeScript</li>
          <li><strong>Database</strong>: PostgreSQL with Drizzle ORM</li>
          <li><strong>Cache</strong>: Redis (optional, for rate limiting)</li>
          <li><strong>Auth</strong>: Lucia 3 (session-based, Argon2 password hashing)</li>
          <li><strong>AI Services</strong>:
            <ul>
              <li>OpenAI/OpenRouter for coaching, quiz generation, TTS/STT</li>
              <li>Maia (Python FastAPI) for distress classification, forum topics, content quality</li>
            </ul>
          </li>
          <li><strong>Forum</strong>: Flarum (JSON:API integration)</li>
          <li><strong>Deployment</strong>: Docker + Dokploy</li>
        </ul>

        <h2>Application Structure</h2>
        <p>The app uses Next.js App Router with 8 layout groups serving different user types:</p>

        <h3>Route Groups</h3>

        <h4>Auth <code>app/(auth)/</code></h4>
        <ul>
          <li>Signin, signup, password reset</li>
          <li>Lucia session management</li>
        </ul>

        <h4>Onboarding <code>app/(onboarding)/onboarding/</code></h4>
        <ul>
          <li>9-step onboarding flow</li>
          <li>Symptom assessment, wellness scoring, crisis screening</li>
          <li>Course recommendation engine</li>
        </ul>

        <h4>Default <code>app/(default)/</code></h4>
        <ul>
          <li>Patient-facing pages</li>
          <li>Academy (therapeutic courses)</li>
          <li>Optimization (advanced courses)</li>
          <li>Dashboard, community, AI coach</li>
          <li>Settings, billing, resources</li>
        </ul>

        <h4>Provider <code>app/(provider)/provider/</code></h4>
        <ul>
          <li>Provider dashboard</li>
          <li>Patient roster and monitoring</li>
          <li>Distress alerts</li>
          <li>Session preparation tools</li>
          <li>RAG-powered clinical resource search</li>
        </ul>

        <h4>Admin <code>app/(admin)/</code></h4>
        <ul>
          <li>Provider verification</li>
          <li>Platform management</li>
        </ul>

        <h2>Data Flow</h2>

        <h3>Typical User Journey</h3>
        <ol>
          <li>Sign up → Onboarding (9 steps)</li>
          <li>Assessment → Wellness scoring → Course recommendations</li>
          <li>Start course → Complete lessons → Interactive exercises</li>
          <li>Assessment tracking → Mood logging</li>
          <li>Optional: Link with provider → Receive assignments</li>
        </ol>

        <h3>Crisis Detection Flow</h3>
        <ol>
          <li>User submits text (journal, assessment, forum post)</li>
          <li>Text sent to Maia distress classifier (3s timeout)</li>
          <li>Classification: none | mild | crisis</li>
          <li>If crisis: Show 988 modal + alert provider (if linked)</li>
          <li>Audit logged (metadata only, no text stored)</li>
        </ol>

        <h3>Provider Workflow</h3>
        <ol>
          <li>Create account → NPI verification (auto or manual admin)</li>
          <li>Generate invite codes for patients</li>
          <li>Monitor patient dashboard (mood, assessments, distress alerts)</li>
          <li>Assign courses/lessons</li>
          <li>Session prep: AI-generated notes from patient data + RAG resources</li>
          <li>Review and resolve distress alerts</li>
        </ol>

        <h2>Security Architecture</h2>

        <h3>HIPAA Compliance</h3>
        <ul>
          <li><strong>Zero-knowledge AI</strong>: Distress classifier never logs input text</li>
          <li><strong>Audit trail</strong>: distressEvent table stores classification metadata only</li>
          <li><strong>Encrypted in transit</strong>: TLS 1.2+ for all AI service calls</li>
          <li><strong>Access controls</strong>: Providers see only their patients, admins see aggregated data</li>
          <li><strong>Session security</strong>: Lucia sessions with secure cookies, 24-hour sliding window</li>
        </ul>

        <h3>Authentication</h3>
        <ul>
          <li>Argon2 password hashing (19456 memory cost)</li>
          <li>Session-based auth (not JWT)</li>
          <li>Role-based access control (user, provider, admin)</li>
          <li>Mock auth fallback for development</li>
        </ul>

        <h3>Rate Limiting</h3>
        <ul>
          <li>Redis-backed rate limiting on auth endpoints</li>
          <li>Per-user request throttling</li>
          <li>Fail-safe: Continues without Redis if unavailable</li>
        </ul>

        <h2>AI Services Architecture</h2>

        <h3>Maia (Python FastAPI)</h3>
        <p>Separate Docker container running 4 DistilBERT classifiers:</p>
        <ul>
          <li><strong>Distress</strong> (crisis detection)</li>
          <li><strong>Forum Topic</strong> (anxiety, depression, relationships, etc.)</li>
          <li><strong>Content Quality</strong> (clinical appropriateness)</li>
          <li><strong>Content Atomization</strong> (marketing extraction)</li>
        </ul>
        <p>All requests timeout at 3 seconds. Failures return safe defaults.</p>

        <h3>OpenAI/OpenRouter</h3>
        <ul>
          <li><strong>Coaching</strong>: Claude Haiku 4.5 (default)</li>
          <li><strong>Quiz Reflection</strong>: Gemini 2.5 Flash (default)</li>
          <li><strong>TTS/STT</strong>: OpenAI Whisper + TTS-1</li>
          <li><strong>Forum Moderation</strong>: Gemini 2.5 Flash (default)</li>
        </ul>
        <p>Model selection configurable via environment variables.</p>

        <h2>Database Schema</h2>
        <p>PostgreSQL with Drizzle ORM. Key tables:</p>

        <h3>Core</h3>
        <ul>
          <li><strong>user</strong> - Lucia auth users (email, hashedPassword, role)</li>
          <li><strong>session</strong> - Lucia sessions</li>
          <li><strong>profile</strong> - WellnessProfile JSONB (questionnaire, assessment, progress)</li>
        </ul>

        <h3>Wellness Tracking</h3>
        <ul>
          <li><strong>moodEntry</strong> - Daily mood/anxiety/sleep/energy ratings</li>
          <li><strong>coachSession</strong> - AI coaching transcripts</li>
        </ul>

        <h3>Safety</h3>
        <ul>
          <li><strong>distressEvent</strong> - HIPAA-safe audit log (NO TEXT, metadata only)</li>
          <li><strong>aiClassificationEvent</strong> - All Maia classification results</li>
        </ul>

        <h3>Provider</h3>
        <ul>
          <li><strong>providerProfile</strong> - Credentials, NPI, verification status</li>
          <li><strong>providerPatient</strong> - Patient-provider relationships</li>
          <li><strong>patientAssignment</strong> - Course/lesson assignments</li>
          <li><strong>providerInvite</strong> - Patient linking codes</li>
        </ul>

        <h3>Community</h3>
        <ul>
          <li><strong>forumBookmark</strong> - User forum saves</li>
          <li><strong>forumTopicClassification</strong> - AI topic routing</li>
          <li><strong>moderationLog</strong> - AI moderation audit</li>
        </ul>

        <h2>Deployment Architecture</h2>

        <h3>Docker Multi-Stage Build</h3>
        <ol>
          <li><strong>Build stage</strong>: npm install + next build (standalone output)</li>
          <li><strong>Runtime stage</strong>: Minimal Node 20 Alpine image</li>
          <li><strong>Entrypoint</strong>: Run DB migration, then start server</li>
          <li><strong>Healthcheck</strong>: GET /api/health every 30s</li>
        </ol>

        <h3>Dokploy Auto-Deploy</h3>
        <ul>
          <li>Push to main → Auto-deploy</li>
          <li>Domain: mental-health-education.soloframehub.com</li>
          <li>SSL: Let's Encrypt via Traefik</li>
        </ul>

        <h3>Environment Requirements</h3>
        <ul>
          <li>PostgreSQL database</li>
          <li>Redis (optional, for rate limiting)</li>
          <li>Maia service (Python container)</li>
          <li>OpenAI/OpenRouter API key</li>
          <li>Flarum forum instance</li>
        </ul>

        <h2>Performance Characteristics</h2>

        <h3>Response Times</h3>
        <ul>
          <li>Page loads: 200-500ms (static pages)</li>
          <li>API endpoints: 50-300ms (DB queries)</li>
          <li>AI coaching: 1-3s (streaming response)</li>
          <li>Distress classification: 50-200ms (with 3s timeout)</li>
        </ul>

        <h3>Database Performance</h3>
        <ul>
          <li>Indexes on userId, courseId, lessonId, createdAt</li>
          <li>JSONB indexes on profile.data</li>
          <li>Unique constraints on email, session, provider-patient pairs</li>
        </ul>

        <h3>Caching Strategy</h3>
        <ul>
          <li>Static pages: CDN cached</li>
          <li>API responses: No caching (personalized data)</li>
          <li>Redis: Session store, rate limiting only</li>
        </ul>
      </article>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/architecture/routes"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Routes Reference</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">All 72 application routes documented</p>
          </Link>
          <Link
            href="/docs/api"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">API Reference</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete API documentation with examples</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
