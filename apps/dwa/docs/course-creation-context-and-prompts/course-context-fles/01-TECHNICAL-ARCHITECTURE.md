# Technical Architecture - Solo Founder Platform

## Stack Overview

### Frontend
- **Framework**: Next.js 14+ with App Router (React 18+)
- **Language**: TypeScript 5.0+
- **Build Tool**: Turbopack (Next.js native, faster than Vite)
- **Styling**: Tailwind CSS v3.4+
- **Component Library**: shadcn/ui (Radix UI primitives)
- **State Management**: 
  - Zustand (client state) - lightweight, module-scoped stores
  - TanStack Query v5 (server state, Firebase caching)
- **Routing**: Next.js App Router (file-based, RSC support)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion (with prefers-reduced-motion)
- **Charts**: Recharts (for analytics, progress visualization)
- **AI Integration**: Firebase Genkit (prompt orchestration, streaming)

### Backend & Infrastructure
- **Database**: Firebase Firestore (NoSQL, real-time, scalable)
- **Authentication**: Firebase Authentication (Email, Google OAuth, passwordless)
- **Storage**: Firebase Storage (course media, user uploads, documents)
- **Functions**: Cloud Functions for Firebase (Node.js 20, event-driven)
- **AI**: Google Gemini 2.5 Pro via Genkit (multimodal, structured outputs)
- **Production AI**: Vertex AI (enterprise quotas, model versioning)
- **Search**: Meilisearch (self-hosted, semantic search for knowledge base)
- **Email**: SendGrid (transactional, marketing sequences)
- **Payments**: Stripe (subscriptions, module licensing)

### Deployment
- **Hosting**: Firebase Hosting (SPA, automatic SSL, CDN)
- **Functions**: Cloud Functions (auto-scaling serverless)
- **Monitoring**: Firebase Analytics + Google Cloud Logging
- **Performance**: Firebase Performance Monitoring
- **Error Tracking**: Sentry (error aggregation, alerting)
- **CI/CD**: GitHub Actions â†’ Firebase deployment

## Project Structure

```
solo-founder-platform/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/                        # Next.js App Router
â”‚   â”‚   â”œâ”€â”€ (auth)/
â”‚   â”‚   â”‚   â”œâ”€â”€ login/
â”‚   â”‚   â”‚   â”œâ”€â”€ signup/
â”‚   â”‚   â”‚   â”œâ”€â”€ forgot-password/
â”‚   â”‚   â”‚   â””â”€â”€ reset-password/
â”‚   â”‚   â”œâ”€â”€ (dashboard)/
â”‚   â”‚   â”‚   â”œâ”€â”€ dashboard/
â”‚   â”‚   â”‚   â”œâ”€â”€ founder-academy/    # Module 1 routes
â”‚   â”‚   â”‚   â”œâ”€â”€ sales-training/     # Module 2 routes
â”‚   â”‚   â”‚   â”œâ”€â”€ sales-enablement/   # Module 3 routes
â”‚   â”‚   â”‚   â”œâ”€â”€ profile/
â”‚   â”‚   â”‚   â””â”€â”€ settings/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â””â”€â”€ globals.css
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ ui/                     # shadcn/ui components
â”‚   â”‚   â”œâ”€â”€ common/                 # Shared components
â”‚   â”‚   â”‚   â”œâ”€â”€ Button.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Card.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Input.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Modal.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ ProgressBar.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ FeatureGate.tsx
â”‚   â”‚   â”‚   â””â”€â”€ UpgradePrompt.tsx
â”‚   â”‚   â”œâ”€â”€ layout/
â”‚   â”‚   â”‚   â”œâ”€â”€ Header.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Footer.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Navigation.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Sidebar.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ ModuleSwitcher.tsx
â”‚   â”‚   â”‚   â””â”€â”€ MobileNav.tsx
â”‚   â”‚   â”œâ”€â”€ course/                 # Founder Academy components
â”‚   â”‚   â”‚   â”œâ”€â”€ CourseCard.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ CourseDetail.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ LessonViewer/
â”‚   â”‚   â”‚   â”œâ”€â”€ ProgressTracker.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ ModuleNavigation.tsx
â”‚   â”‚   â”‚   â””â”€â”€ Assessment.tsx
â”‚   â”‚   â”œâ”€â”€ tools/                  # Strategic framework builders
â”‚   â”‚   â”‚   â”œâ”€â”€ BusinessModelCanvas/
â”‚   â”‚   â”‚   â”œâ”€â”€ GTMStrategyArchitect/
â”‚   â”‚   â”‚   â”œâ”€â”€ UnitEconomicsCalculator/
â”‚   â”‚   â”‚   â”œâ”€â”€ PitchDeckAnalyzer/
â”‚   â”‚   â”‚   â”œâ”€â”€ FinancialModelValidator/
â”‚   â”‚   â”‚   â””â”€â”€ CustomerAvatarWorkshop/
â”‚   â”‚   â”œâ”€â”€ sales/                  # Sales Training components
â”‚   â”‚   â”‚   â”œâ”€â”€ RolePlayChat/
â”‚   â”‚   â”‚   â”œâ”€â”€ DISCSelector.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ PreCallCoach.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ PerformanceMetrics/
â”‚   â”‚   â”‚   â””â”€â”€ ObjectionLibrary/
â”‚   â”‚   â””â”€â”€ enablement/             # Sales Enablement components
â”‚   â”‚       â”œâ”€â”€ GmailCRM/
â”‚   â”‚       â”œâ”€â”€ CalendarPipeline/
â”‚   â”‚       â”œâ”€â”€ KnowledgeExtractor/
â”‚   â”‚       â”œâ”€â”€ EmailSequencer/
â”‚   â”‚       â””â”€â”€ TeamDashboard/
â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â”œâ”€â”€ firebase/
â”‚   â”‚   â”‚   â”œâ”€â”€ config.ts           # Firebase initialization
â”‚   â”‚   â”‚   â”œâ”€â”€ auth.ts             # Auth helpers
â”‚   â”‚   â”‚   â”œâ”€â”€ firestore.ts        # Firestore queries
â”‚   â”‚   â”‚   â””â”€â”€ storage.ts          # Storage operations
â”‚   â”‚   â”œâ”€â”€ genkit/
â”‚   â”‚   â”‚   â”œâ”€â”€ flows/              # Genkit flow definitions
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ strategicAdvisor.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ salesRoleplay.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ knowledgeExtraction.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ documentAnalysis.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ coaching.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ prompts/            # .prompt files
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ framework_builder.prompt
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ sales_roleplay.prompt
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ strategic_advisor.prompt
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ document_analyzer.prompt
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ knowledge_extractor.prompt
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ evaluation.prompt
â”‚   â”‚   â”‚   â””â”€â”€ schemas/            # Zod output schemas
â”‚   â”‚   â”‚       â”œâ”€â”€ frameworkSchema.ts
â”‚   â”‚   â”‚       â”œâ”€â”€ roleplaySchema.ts
â”‚   â”‚   â”‚       â”œâ”€â”€ evaluationSchema.ts
â”‚   â”‚   â”‚       â””â”€â”€ knowledgeSchema.ts
â”‚   â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”‚   â”œâ”€â”€ courses.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ progress.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ modules.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ tools.ts
â”‚   â”‚   â”‚   â””â”€â”€ integrations.ts
â”‚   â”‚   â””â”€â”€ utils/
â”‚   â”‚       â”œâ”€â”€ validation.ts
â”‚   â”‚       â”œâ”€â”€ date.ts
â”‚   â”‚       â”œâ”€â”€ formatting.ts
â”‚   â”‚       â”œâ”€â”€ constants.ts
â”‚   â”‚       â””â”€â”€ modules.ts
â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â”œâ”€â”€ useAuth.ts
â”‚   â”‚   â”œâ”€â”€ useCourse.ts
â”‚   â”‚   â”œâ”€â”€ useProgress.ts
â”‚   â”‚   â”œâ”€â”€ useFirebase.ts
â”‚   â”‚   â”œâ”€â”€ useGenkit.ts
â”‚   â”‚   â”œâ”€â”€ useModules.ts
â”‚   â”‚   â”œâ”€â”€ useFeatureAccess.ts
â”‚   â”‚   â””â”€â”€ useLocalStorage.ts
â”‚   â”œâ”€â”€ stores/
â”‚   â”‚   â”œâ”€â”€ authStore.ts
â”‚   â”‚   â”œâ”€â”€ courseStore.ts
â”‚   â”‚   â”œâ”€â”€ moduleStore.ts
â”‚   â”‚   â”œâ”€â”€ uiStore.ts
â”‚   â”‚   â””â”€â”€ toolStore.ts
â”‚   â”œâ”€â”€ types/
â”‚   â”‚   â”œâ”€â”€ firebase.types.ts
â”‚   â”‚   â”œâ”€â”€ course.types.ts
â”‚   â”‚   â”œâ”€â”€ module.types.ts
â”‚   â”‚   â”œâ”€â”€ user.types.ts
â”‚   â”‚   â”œâ”€â”€ tool.types.ts
â”‚   â”‚   â””â”€â”€ genkit.types.ts
â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â”œâ”€â”€ modules.ts              # Module definitions
â”‚   â”‚   â”œâ”€â”€ plans.ts                # Pricing tiers
â”‚   â”‚   â””â”€â”€ features.ts             # Feature flags
â”‚   â””â”€â”€ middleware.ts               # Module access control
â”œâ”€â”€ functions/                       # Cloud Functions
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”‚   â”œâ”€â”€ onUserCreate.ts
â”‚   â”‚   â”‚   â””â”€â”€ onUserDelete.ts
â”‚   â”‚   â”œâ”€â”€ payments/
â”‚   â”‚   â”‚   â”œâ”€â”€ stripeWebhook.ts
â”‚   â”‚   â”‚   â””â”€â”€ updateSubscription.ts
â”‚   â”‚   â”œâ”€â”€ knowledge/
â”‚   â”‚   â”‚   â”œâ”€â”€ extractFromDrive.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ extractFromGmail.ts
â”‚   â”‚   â”‚   â””â”€â”€ indexForRAG.ts
â”‚   â”‚   â”œâ”€â”€ engagement/
â”‚   â”‚   â”‚   â”œâ”€â”€ checkMilestones.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ sendCoachingTips.ts
â”‚   â”‚   â”‚   â””â”€â”€ reengagementFlow.ts
â”‚   â”‚   â””â”€â”€ index.ts
â”‚   â””â”€â”€ package.json
â”œâ”€â”€ firestore.rules                 # Security rules
â”œâ”€â”€ firestore.indexes.json          # Composite indexes
â”œâ”€â”€ storage.rules                   # Storage security
â”œâ”€â”€ .env.local
â”œâ”€â”€ .env.production
â”œâ”€â”€ firebase.json
â”œâ”€â”€ package.json
â”œâ”€â”€ tsconfig.json
â”œâ”€â”€ tailwind.config.ts
â”œâ”€â”€ next.config.js
â””â”€â”€ README.md
```

## Core Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.4.0",
    "firebase": "^10.12.0",
    "firebase-admin": "^12.1.0",
    "firebase-functions": "^5.0.1",
    "@genkit-ai/core": "^0.5.0",
    "@genkit-ai/firebase": "^0.5.0",
    "@genkit-ai/googleai": "^0.5.0",
    "@genkit-ai/vertexai": "^0.5.0",
    "@tanstack/react-query": "^5.40.0",
    "zustand": "^4.5.2",
    "react-hook-form": "^7.51.5",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.6.0",
    "framer-motion": "^11.2.10",
    "recharts": "^2.12.7",
    "tailwindcss": "^3.4.3",
    "lucide-react": "^0.379.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "stripe": "^15.5.0",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.5",
    "genkit": "^0.5.0"
  }
}
```

## Firebase + Genkit Architecture

### Configuration (lib/firebase/config.ts)

```typescript
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

export default app
```

### Genkit Setup (lib/genkit/config.ts)

```typescript
import { configureGenkit } from '@genkit-ai/core'
import { firebase } from '@genkit-ai/firebase'
import { googleAI } from '@genkit-ai/googleai'
import { vertexAI } from '@genkit-ai/vertexai'

export const ai = configureGenkit({
  plugins: [
    firebase(),
    process.env.NODE_ENV === 'production'
      ? vertexAI({
          projectId: process.env.GOOGLE_CLOUD_PROJECT!,
          location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
        })
      : googleAI({
          apiKey: process.env.GOOGLE_GENAI_API_KEY!,
        }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})
```

## Authentication Flow

### Sign Up Flow

```typescript
// lib/firebase/auth.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider 
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from './config'

export async function signUpWithEmail(
  email: string, 
  password: string,
  userData: {
    name: string
    plan: 'founder' | 'sales_starter' | 'growth' | 'complete'
  }
) {
  // 1. Create Firebase Auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // 2. Create tenant document
  const tenantRef = doc(db, 'tenants', user.uid)
  await setDoc(tenantRef, {
    plan: userData.plan,
    modules: getPlanModules(userData.plan),
    created_at: new Date(),
    status: 'trial', // or 'active' if paid
    trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
  })

  // 3. Create user document
  const userRef = doc(db, 'users', user.uid)
  await setDoc(userRef, {
    email: user.email,
    name: userData.name,
    tenant_id: user.uid,
    role: 'owner',
    created_at: new Date(),
    onboarding_completed: false,
  })

  return user
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  
  // Check if user exists, if not create tenant/user docs
  const userRef = doc(db, 'users', result.user.uid)
  // ... similar logic to signUpWithEmail
  
  return result.user
}

function getPlanModules(plan: string): string[] {
  const moduleMap = {
    founder: ['founder_academy'],
    sales_starter: ['sales_training'],
    growth: ['sales_training', 'sales_enablement'],
    complete: ['founder_academy', 'sales_training', 'sales_enablement'],
  }
  return moduleMap[plan] || []
}
```

### useAuth Hook

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/config'
import { useRouter } from 'next/navigation'

interface UserData {
  uid: string
  email: string
  name: string
  tenant_id: string
  role: string
  modules: string[]
  plan: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        
        // Fetch user data and tenant data
        const userRef = doc(db, 'users', firebaseUser.uid)
        const userSnap = await getDoc(userRef)
        
        if (userSnap.exists()) {
          const data = userSnap.data()
          const tenantRef = doc(db, 'tenants', data.tenant_id)
          const tenantSnap = await getDoc(tenantRef)
          
          if (tenantSnap.exists()) {
            setUserData({
              ...data,
              modules: tenantSnap.data().modules,
              plan: tenantSnap.data().plan,
            } as UserData)
          }
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    hasModule: (module: string) => userData?.modules.includes(module) || false,
  }
}
```

## Genkit Flow Patterns

### Strategic Advisor Flow

```typescript
// lib/genkit/flows/strategicAdvisor.ts
import { defineFlow, runFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { gemini25Pro } from '@genkit-ai/googleai'

const advisorInputSchema = z.object({
  framework_name: z.string(),
  user_context: z.string(),
  current_step: z.number(),
  previous_responses: z.array(z.string()).optional(),
})

const advisorOutputSchema = z.object({
  question: z.string(),
  guidance: z.string(),
  examples: z.array(z.string()),
  next_step: z.number(),
  evaluation_score: z.number().min(0).max(100),
})

export const strategicAdvisorFlow = defineFlow(
  {
    name: 'strategicAdvisor',
    inputSchema: advisorInputSchema,
    outputSchema: advisorOutputSchema,
  },
  async (input) => {
    const prompt = `You are a strategic advisor helping a solo founder apply the ${input.framework_name} framework.

USER CONTEXT: ${input.user_context}
CURRENT STEP: ${input.current_step}
PREVIOUS RESPONSES: ${input.previous_responses?.join('\n') || 'None'}

TEACHING APPROACH:
1. Explain the current step thoroughly before asking questions
2. Provide specific examples relevant to their context
3. Ask probing questions to deepen strategic thinking
4. Validate understanding before progressing
5. Offer alternatives and explain trade-offs

Generate the next coaching interaction with:
- A strategic question that pushes their thinking deeper
- Guidance explaining why this step matters
- 2-3 specific examples relevant to their situation
- The next step number
- An evaluation score (0-100) of their progress so far`

    const result = await gemini25Pro.generate({
      prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
      output: {
        schema: advisorOutputSchema,
      },
    })

    return result.output()
  }
)

// Usage in component
export async function coachFounder(input: z.infer<typeof advisorInputSchema>) {
  return runFlow(strategicAdvisorFlow, input)
}
```

### Sales Role-Play Flow (with streaming)

```typescript
// lib/genkit/flows/salesRoleplay.ts
import { defineFlow, streamFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { gemini25Pro } from '@genkit-ai/googleai'

const roleplayInputSchema = z.object({
  disc_personality: z.enum(['dominant', 'influential', 'steady', 'compliant']),
  scenario: z.string(),
  sales_methodology: z.enum(['SPIN', 'MEDDIC', 'CHALLENGER']),
  user_message: z.string(),
  conversation_history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })),
})

export const salesRoleplayFlow = defineFlow(
  {
    name: 'salesRoleplay',
    inputSchema: roleplayInputSchema,
    streamSchema: z.string(),
  },
  async (input) => {
    const discPersonalities = {
      dominant: 'Direct, results-focused, impatient with details. Challenges assertions.',
      influential: 'Enthusiastic, people-oriented, easily distracted. Needs social proof.',
      steady: 'Patient, reliable, resistant to change. Needs reassurance.',
      compliant: 'Analytical, detail-oriented, risk-averse. Needs data and specifics.',
    }

    const prompt = `You are role-playing as a prospect with a ${input.disc_personality.toUpperCase()} personality.

PERSONALITY TRAITS: ${discPersonalities[input.disc_personality]}
SCENARIO: ${input.scenario}
CONVERSATION SO FAR: ${input.conversation_history.map(m => `${m.role}: ${m.content}`).join('\n')}

SALESPERSON (using ${input.sales_methodology}): ${input.user_message}

Respond as this prospect would:
- Stay in character with the DISC personality
- React realistically to their approach
- Raise objections that this personality type would raise
- Give buying signals if they handle you well
- Keep responses 2-3 sentences max`

    const response = await gemini25Pro.generateStream({
      prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 500,
      },
    })

    // Stream the response
    for await (const chunk of response.stream) {
      yield chunk.text
    }

    return response.text
  }
)
```

### Document Analysis Flow (multimodal)

```typescript
// lib/genkit/flows/documentAnalysis.ts
import { defineFlow, runFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { gemini25Pro } from '@genkit-ai/googleai'

const analysisInputSchema = z.object({
  document_type: z.enum(['pitch_deck', 'financial_model', 'landing_page']),
  images: z.array(z.string()), // base64 encoded images
  user_context: z.string().optional(),
})

const analysisOutputSchema = z.object({
  overall_score: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  specific_feedback: z.array(z.object({
    section: z.string(),
    issue: z.string(),
    recommendation: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  strategic_recommendations: z.array(z.string()),
})

export const documentAnalysisFlow = defineFlow(
  {
    name: 'documentAnalysis',
    inputSchema: analysisInputSchema,
    outputSchema: analysisOutputSchema,
  },
  async (input) => {
    const analysisPrompts = {
      pitch_deck: `Analyze this pitch deck with venture-capital-level rigor. Focus on:
        - Problem-solution clarity and market sizing
        - Business model and unit economics
        - Competitive positioning and moat
        - Go-to-market strategy realism
        - Team credibility signals
        - Financial projections reasonableness
        - Visual design and storytelling flow`,
      
      financial_model: `Analyze this financial model for bootstrap founders. Focus on:
        - Revenue model clarity and assumptions
        - Customer acquisition cost (CAC) and LTV calculations
        - Break-even analysis and runway
        - Pricing strategy validation
        - Cost structure optimization opportunities
        - Cash flow management
        - Assumption testing and sensitivity analysis`,
      
      landing_page: `Analyze this landing page for conversion optimization. Focus on:
        - Value proposition clarity (5-second test)
        - Social proof and trust signals
        - Call-to-action effectiveness
        - Visual hierarchy and UX flow
        - Mobile responsiveness
        - Page load speed indicators
        - Conversion funnel clarity`,
    }

    const prompt = analysisPrompts[input.document_type]
    const context = input.user_context ? `\n\nUSER CONTEXT: ${input.user_context}` : ''

    const result = await gemini25Pro.generate({
      prompt: prompt + context,
      media: input.images.map(img => ({
        contentType: 'image/png',
        data: img,
      })),
      config: {
        temperature: 0.3, // Lower temp for analytical tasks
        maxOutputTokens: 2000,
      },
      output: {
        schema: analysisOutputSchema,
      },
    })

    return result.output()
  }
)
```

## Firestore Query Patterns

### Efficient Course Loading

```typescript
// lib/firebase/firestore.ts
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore'
import { db } from './config'

// Load courses for a specific module
export async function getCoursesByModule(module: 'founder_academy' | 'sales_training' | 'sales_enablement') {
  const coursesRef = collection(db, 'courses')
  const q = query(
    coursesRef,
    where('module', '==', module),
    where('published', '==', true)
  )
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// Load lessons for a course (subcollection)
export async function getLessonsForCourse(courseId: string) {
  const lessonsRef = collection(db, 'courses', courseId, 'lessons')
  const snapshot = await getDocs(lessonsRef)
  
  return snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.order - b.order) // Sort by lesson order
}

// Load user progress with efficient querying
export async function getUserProgress(userId: string, courseId: string) {
  const progressRef = doc(db, 'userProgress', `${userId}_${courseId}`)
  const snapshot = await getDoc(progressRef)
  
  return snapshot.exists() ? snapshot.data() : null
}

// Update progress atomically
export async function updateLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean
) {
  const progressRef = doc(db, 'userProgress', `${userId}_${courseId}`)
  
  await setDoc(progressRef, {
    user_id: userId,
    course_id: courseId,
    lessons: {
      [lessonId]: {
        completed,
        completed_at: completed ? new Date() : null,
      },
    },
    updated_at: new Date(),
  }, { merge: true })
}
```

## Module Access Control Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const moduleRoutes = {
  founder_academy: ['/dashboard/founder-academy'],
  sales_training: ['/dashboard/sales-training'],
  sales_enablement: ['/dashboard/sales-enablement'],
}

export async function middleware(request: NextRequest) {
  // Check if user has access to the requested module
  const path = request.nextUrl.pathname
  
  // Determine which module is being accessed
  let requiredModule: string | null = null
  for (const [module, routes] of Object.entries(moduleRoutes)) {
    if (routes.some(route => path.startsWith(route))) {
      requiredModule = module
      break
    }
  }
  
  if (requiredModule) {
    // Get user's modules from session/cookie
    // This would integrate with Firebase Auth
    // For now, simplified example:
    
    const hasAccess = await checkModuleAccess(request, requiredModule)
    
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/upgrade', request.url))
    }
  }
  
  return NextResponse.next()
}

async function checkModuleAccess(request: NextRequest, module: string): Promise<boolean> {
  // Implementation would check Firebase Auth token
  // and verify tenant's modules array includes this module
  return true // Placeholder
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

## Cost Optimization Strategies

### Token Usage Optimization

```typescript
// lib/genkit/optimizations.ts

// 1. Use lower temperature for deterministic outputs (enables caching)
export const DETERMINISTIC_CONFIG = {
  temperature: 0,
  maxOutputTokens: 500,
}

// 2. Implement conversation summarization for long threads
export async function summarizeConversation(messages: Array<{role: string, content: string}>) {
  if (messages.length < 10) return messages
  
  // Summarize older messages, keep recent 3 messages
  const recentMessages = messages.slice(-3)
  const olderMessages = messages.slice(0, -3)
  
  const summary = await gemini25Pro.generate({
    prompt: `Summarize this conversation history in 2-3 sentences: ${olderMessages.map(m => m.content).join('\n')}`,
    config: DETERMINISTIC_CONFIG,
  })
  
  return [
    { role: 'system', content: `Previous conversation summary: ${summary.text}` },
    ...recentMessages,
  ]
}

// 3. Cache common framework explanations
export const FRAMEWORK_CACHE = new Map<string, string>()

export async function getFrameworkExplanation(frameworkName: string) {
  if (FRAMEWORK_CACHE.has(frameworkName)) {
    return FRAMEWORK_CACHE.get(frameworkName)!
  }
  
  // Generate and cache
  const explanation = await gemini25Pro.generate({
    prompt: `Explain the ${frameworkName} framework in 200 words`,
    config: DETERMINISTIC_CONFIG,
  })
  
  FRAMEWORK_CACHE.set(frameworkName, explanation.text)
  return explanation.text
}
```

### Firestore Query Optimization

```typescript
// Minimize read operations with efficient queries

// BAD: Reading all documents then filtering client-side
const allCourses = await getDocs(collection(db, 'courses'))
const activeCourses = allCourses.docs.filter(doc => doc.data().published)

// GOOD: Filter server-side with query
const q = query(collection(db, 'courses'), where('published', '==', true))
const activeCourses = await getDocs(q)

// Use composite indexes for complex queries (defined in firestore.indexes.json)
const q = query(
  collection(db, 'courses'),
  where('module', '==', 'founder_academy'),
  where('published', '==', true),
  orderBy('created_at', 'desc')
)
```

## Deployment Configuration

### firebase.json

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

### Environment Variables

**Development (.env.local):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=dev_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dev-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dev-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dev-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

GOOGLE_GENAI_API_KEY=gemini_dev_key
```

**Production (.env.production):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=prod_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=solo-founder-platform.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=solo-founder-platform
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=solo-founder-platform.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=987654321
NEXT_PUBLIC_FIREBASE_APP_ID=1:987654321:web:xyz789

GOOGLE_CLOUD_PROJECT=solo-founder-platform
GOOGLE_CLOUD_LOCATION=us-central1

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Performance Monitoring

```typescript
// lib/firebase/monitoring.ts
import { getPerformance, trace } from 'firebase/performance'
import app from './config'

const perf = getPerformance(app)

export function measureAIFlow(flowName: string) {
  const t = trace(perf, `ai_flow_${flowName}`)
  t.start()
  
  return {
    stop: () => t.stop(),
    incrementMetric: (metricName: string, value: number) => 
      t.incrementMetric(metricName, value),
  }
}

// Usage
const measurement = measureAIFlow('strategic_advisor')
try {
  const result = await coachFounder(input)
  measurement.incrementMetric('tokens_used', result.usage.totalTokens)
} finally {
  measurement.stop()
}
```

---

This architecture provides a solid foundation for building the integrated Solo Founder Platform with Firebase + Genkit, optimized for AI-heavy workloads, multi-module licensing, and bootstrap-friendly cost structure.