# Technical Architecture - Mental Health Education Platform

## Stack Overview

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (fast HMR, optimized builds)
- **Styling**: Tailwind CSS v3.4+
- **Component Library**: shadcn/ui (built on Radix UI primitives)
- **State Management**: 
  - Zustand (client state) - lightweight, simple API
  - TanStack Query v5 (server state, caching) - better than React Query for new projects
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion (with prefers-reduced-motion support)
- **Charts**: Recharts (for progress tracking, mood visualization)

### Backend & Infrastructure
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email, Google, Facebook OAuth)
- **Storage**: Supabase Storage (for user uploads, course media)
- **Functions**: Supabase Edge Functions (for complex logic, email triggers)
- **Real-time**: Supabase Realtime (for live updates if needed)

### Deployment
- **Hosting**: Vercel (optimal for React/Vite, automatic previews)
- **CDN**: Cloudflare (for static assets, images)
- **Monitoring**: Sentry (error tracking), Vercel Analytics (performance)

## Project Structure

```
mental-health-platform/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── common/             # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── CrisisResources.tsx
│   │   ├── course/             # Course-related components
│   │   │   ├── LessonViewer/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── LessonHeader.tsx
│   │   │   │   ├── LessonContent.tsx
│   │   │   │   ├── LessonSidebar.tsx
│   │   │   │   └── LessonFooter.tsx
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── CourseCard.tsx
│   │   │   ├── ProgressTracker.tsx
│   │   │   └── QuizComponent.tsx
│   │   └── tools/              # Interactive tools
│   │       ├── SleepTracker/
│   │       ├── MoodLogger/
│   │       ├── ThoughtRecord/
│   │       ├── MedicationTracker/
│   │       └── AnxietyTools/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── onboarding/
│   │   │   ├── Welcome.tsx
│   │   │   ├── Goals.tsx
│   │   │   ├── Preferences.tsx
│   │   │   └── CourseSelection.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CourseCatalog.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── LessonPage.tsx
│   │   ├── Profile.tsx
│   │   └── Settings.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase client setup
│   │   │   ├── auth.ts          # Auth helpers
│   │   │   ├── database.ts      # Database queries
│   │   │   └── storage.ts       # File upload helpers
│   │   ├── api/
│   │   │   ├── courses.ts
│   │   │   ├── progress.ts
│   │   │   └── tools.ts
│   │   └── utils/
│   │       ├── validation.ts
│   │       ├── date.ts
│   │       ├── formatting.ts
│   │       └── constants.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCourse.ts
│   │   ├── useProgress.ts
│   │   ├── useSupabase.ts
│   │   └── useLocalStorage.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── courseStore.ts
│   │   ├── uiStore.ts
│   │   └── toolStore.ts
│   ├── types/
│   │   ├── database.types.ts    # Generated from Supabase
│   │   ├── course.types.ts
│   │   ├── user.types.ts
│   │   └── tool.types.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── public/
│   ├── images/
│   ├── videos/
│   └── icons/
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Core Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "@supabase/supabase-js": "^2.43.4",
    "@tanstack/react-query": "^5.40.0",
    "zustand": "^4.5.2",
    "react-hook-form": "^7.51.5",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.6.0",
    "framer-motion": "^11.2.10",
    "recharts": "^2.12.7",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "lucide-react": "^0.395.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.4.5",
    "vite": "^5.2.12",
    "tailwindcss": "^3.4.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "@typescript-eslint/eslint-plugin": "^7.11.0",
    "@typescript-eslint/parser": "^7.11.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2"
  }
}
```

## Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OAuth (if using)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id

# Analytics (optional)
VITE_SENTRY_DSN=your_sentry_dsn

# Environment
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
```

## Authentication Flow

### Supabase Auth Setup

1. **Client Configuration** (`src/lib/supabase/client.ts`):
```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'mental-health-auth',
    storage: window.localStorage,
  },
})
```

2. **Auth Hook** (`src/hooks/useAuth.ts`):
```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, session, loading }
}
```

3. **Protected Routes** (`src/components/ProtectedRoute.tsx`):
```typescript
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
```

### OAuth Configuration

Enable in Supabase Dashboard:
- Google: Add authorized redirect URIs
- Facebook: Configure app settings
- Apple: Set up Sign in with Apple

Implement in signup/login forms:
```typescript
const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) console.error('Error:', error.message)
}
```

## State Management Strategy

### Zustand for UI State
- User preferences (theme, reduced motion, text size)
- Modal open/closed states
- Navigation state
- Notification banners

### TanStack Query for Server State
- Course data
- User progress
- Interactive tool logs
- Profile information

Example Query Hook:
```typescript
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export function useCourseProgress(courseId: string) {
  return useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('course_id', courseId)
      
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
```

## Performance Optimization

### Code Splitting
- Lazy load route components
- Lazy load interactive tools
- Dynamic imports for heavy libraries

```typescript
const LessonPage = lazy(() => import('@/pages/LessonPage'))
const SleepTracker = lazy(() => import('@/components/tools/SleepTracker'))
```

### Image Optimization
- Use WebP format with JPEG fallback
- Implement responsive images with `srcset`
- Lazy load images below fold
- Compress with TinyPNG before deployment

### Caching Strategy
- TanStack Query automatic caching
- Cache course content aggressively (rarely changes)
- Invalidate progress data on mutation
- Persist selected queries to localStorage

## Error Handling

### Error Boundaries
Wrap major sections in error boundaries:
```typescript
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

// Usage
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <CourseContent />
</ErrorBoundary>
```

### Network Error Handling
- Retry failed mutations automatically (3 attempts)
- Show offline banner when detected
- Queue mutations for later sync
- Provide clear error messages to users

## Accessibility Requirements

### WCAG 2.2 Level AA Compliance
- Color contrast 4.5:1 minimum
- All interactive elements keyboard accessible
- Focus indicators clearly visible
- Semantic HTML with proper ARIA labels
- Skip links for keyboard navigation
- Form labels properly associated
- Alt text for all meaningful images
- Captions/transcripts for video content

### Testing Tools
- axe DevTools
- WAVE browser extension
- NVDA/JAWS screen readers
- VoiceOver (macOS/iOS)
- Keyboard-only navigation testing

## Security Considerations

### Row-Level Security (RLS)
Enable on all Supabase tables:
```sql
-- Example: Users can only see their own progress
CREATE POLICY "Users can view own progress"
ON user_progress
FOR SELECT
USING (auth.uid() = user_id);
```

### Data Validation
- Validate all inputs with Zod schemas
- Sanitize user-generated content
- Rate limit authentication attempts
- Implement CSRF protection
- Use HTTPS only (enforce in production)

### Sensitive Data
- Never log sensitive mental health data
- Encrypt at rest (Supabase handles this)
- Use secure tokens for password resets
- Implement session timeouts
- Provide data export/deletion options

## Development Workflow

### Initial Setup Commands
```bash
# Create Vite + React + TypeScript project
npm create vite@latest mental-health-platform -- --template react-ts

# Install dependencies
npm install

# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui CLI
npx shadcn-ui@latest init

# Install additional dependencies
npm install @supabase/supabase-js @tanstack/react-query zustand react-hook-form zod @hookform/resolvers framer-motion recharts date-fns

# Setup Supabase locally (optional)
npx supabase init
npx supabase start
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview  # Test production build locally
```

## Deployment Strategy

### Vercel Deployment
1. Connect GitHub repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Enable automatic deployments on push

### Environment-Specific Configuration
- Development: Local Supabase (optional) or dev project
- Staging: Separate Supabase project for testing
- Production: Production Supabase project with backups

### CI/CD Pipeline
- Run TypeScript checks
- Run ESLint
- Run build
- Run accessibility audits
- Deploy to preview (PRs)
- Deploy to production (main branch)
