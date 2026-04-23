# Cursor / Antigravity Prompts - Step-by-Step Build Instructions

**File:** 08-CURSOR-PROMPTS.md  
**Purpose:** Executable prompts for building the complete platform in Cursor IDE  
**Dependencies:** 01-TECHNICAL-ARCHITECTURE.md, 03-DATABASE-SCHEMA.md, 05-AI-FLOWS-LIBRARY.md, 06-INTERACTIVE-COMPONENTS.md  
**Estimated Size:** 30KB

---

## Overview

This document provides copy-paste-ready prompts for Cursor IDE (or any AI coding assistant) to build the Solo Founder Platform systematically. Each prompt is:

- **Self-contained:** Includes all necessary context
- **Executable:** Ready to paste into Cursor
- **Verifiable:** Includes test commands to confirm success
- **Sequential:** Build in the correct order

**Total Estimated Build Time:** 40-60 hours across 30 prompts

---

## Project Initialization Prompts

### Prompt 1: Initialize Next.js + Firebase Project (15 min)

```
@01-TECHNICAL-ARCHITECTURE.md Reference the complete tech stack specifications

TASK: Initialize a new Next.js 14+ project with TypeScript, Tailwind CSS, and complete folder structure for the Solo Founder Platform.

REQUIREMENTS:
1. Create project with App Router (not Pages Router)
2. Include all dependencies from the architecture document
3. Set up complete folder structure as specified
4. Configure TypeScript, Tailwind, and ESLint
5. Create environment variables template

STEPS:

Step 1: Initialize Next.js project
```bash
npx create-next.js@latest solo-founder-platform --typescript --tailwind --app --eslint
cd solo-founder-platform
```

Step 2: Install all required dependencies
```bash
# Core
npm install firebase@^10.12.0
npm install @genkit-ai/core@^0.5.0 @genkit-ai/firebase@^0.5.0 @genkit-ai/googleai@^0.5.0

# State Management
npm install zustand@^4.5.2 @tanstack/react-query@^5.40.0

# Forms & Validation
npm install react-hook-form@^7.51.5 zod@^3.23.8 @hookform/resolvers@^3.6.0

# UI Components
npm install @radix-ui/react-accordion@^1.1.2 @radix-ui/react-dialog@^1.0.5
npm install @radix-ui/react-dropdown-menu@^2.0.6 @radix-ui/react-select@^2.0.0
npm install @radix-ui/react-tabs@^1.0.4 @radix-ui/react-toast@^1.1.5
npm install lucide-react@^0.379.0

# Utilities
npm install framer-motion@^11.2.10 recharts@^2.12.7 date-fns@^3.6.0
npm install clsx@^2.1.1 tailwind-merge@^2.3.0

# Payments
npm install stripe@^15.5.0 @stripe/stripe-js@^3.3.0

# Development
npm install -D @types/node@^20.12.0 @types/react@^18.3.0
npm install -D eslint@^8.57.0 eslint-config-next@^14.2.0
npm install -D prettier@^3.2.5 eslint-config-prettier@^9.1.0
```

Step 3: Create folder structure
```bash
mkdir -p src/{app,components,lib,hooks,stores,types,config}
mkdir -p src/components/{ui,common,layout,course,tools,sales,enablement}
mkdir -p src/lib/{firebase,genkit,api,utils}
mkdir -p src/lib/genkit/{flows,prompts,schemas}
mkdir -p src/app/{(auth),(dashboard)}
mkdir -p src/app/(dashboard)/{founder-academy,sales-training,sales-enablement}
mkdir -p functions/src/{auth,payments,knowledge,engagement}
```

Step 4: Configure TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Step 5: Configure Tailwind (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#eef2ff',
          500: '#6366f1',
          900: '#312e81',
        },
        accent: {
          50: '#ecfdf5',
          500: '#10b981',
          900: '#064e3b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
export default config
```

Step 6: Create environment variables template (.env.example)
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Google AI
GOOGLE_GENAI_API_KEY=your_gemini_api_key
GOOGLE_CLOUD_PROJECT=your-project
GOOGLE_CLOUD_LOCATION=us-central1

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

Step 7: Create initial app layout (src/app/layout.tsx)
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solo Founder Platform',
  description: 'AI-powered education for bootstrapped founders',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

Step 8: Create initial homepage (src/app/page.tsx)
```typescript
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Solo Founder Platform
        </h1>
        <p className="text-neutral-600">
          AI-powered education for bootstrapped founders
        </p>
      </div>
    </main>
  )
}
```

VERIFICATION:
Run `npm run dev` and confirm Next.js starts on localhost:3000
```

---

### Prompt 2: Setup Firebase Client Configuration (20 min)

```
@01-TECHNICAL-ARCHITECTURE.md Reference Firebase configuration section

TASK: Set up Firebase client SDK with proper initialization, auth, Firestore, and storage.

REQUIREMENTS:
1. Initialize Firebase app with environment variables
2. Set up Authentication, Firestore, and Storage clients
3. Create type-safe helper functions
4. Add error handling and logging

STEPS:

Step 1: Create Firebase config file (src/lib/firebase/config.ts)
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

// Initialize Firebase
let app: FirebaseApp

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

export default app
```

Step 2: Create auth helpers (src/lib/firebase/auth.ts)
```typescript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth'
import { auth } from './config'

export async function signUp(email: string, password: string, name: string): Promise<User> {
  try {
    const credential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with name
    await updateProfile(credential.user, { displayName: name })
    
    return credential.user
  } catch (error: any) {
    console.error('Sign up error:', error)
    throw new Error(error.message || 'Failed to create account')
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error: any) {
    console.error('Sign in error:', error)
    throw new Error(error.message || 'Failed to sign in')
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    console.error('Sign out error:', error)
    throw new Error(error.message || 'Failed to sign out')
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    console.error('Password reset error:', error)
    throw new Error(error.message || 'Failed to send reset email')
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser
}
```

Step 3: Create Firestore helpers (src/lib/firebase/firestore.ts)
```typescript
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  DocumentData,
} from 'firebase/firestore'
import { db } from './config'

export async function getDocument<T = DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, documentId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T
    }
    
    return null
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error)
    throw error
  }
}

export async function getDocuments<T = DocumentData>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...queryConstraints)
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T[]
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error)
    throw error
  }
}

export async function createDocument<T = DocumentData>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId)
    await setDoc(docRef, {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    })
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error)
    throw error
  }
}

export async function updateDocument<T = Partial<DocumentData>>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId)
    await updateDoc(docRef, {
      ...data,
      updated_at: new Date(),
    })
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error)
    throw error
  }
}

export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error)
    throw error
  }
}
```

Step 4: Create Storage helpers (src/lib/firebase/storage.ts)
```typescript
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
  deleteObject,
  UploadResult,
} from 'firebase/storage'
import { storage } from './config'

export async function uploadFile(
  path: string,
  file: File
): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    const snapshot: UploadResult = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export async function uploadBase64(
  path: string,
  base64String: string,
  metadata?: any
): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadString(storageRef, base64String, 'base64', metadata)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading base64:', error)
    throw error
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

export async function getFileURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    return await getDownloadURL(storageRef)
  } catch (error) {
    console.error('Error getting file URL:', error)
    throw error
  }
}
```

Step 5: Create .env.local file with your Firebase credentials
```
# Copy from Firebase Console > Project Settings > General
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

VERIFICATION:
Create a test component that imports `auth`, `db`, and `storage` and logs them to console. Confirm no errors.
```

---

### Prompt 3: Setup Firebase Genkit for AI Flows (25 min)

```
@05-AI-FLOWS-LIBRARY.md Reference Genkit setup and flow patterns

TASK: Set up Firebase Genkit with Google AI plugin, create first test flow, and verify Dev UI works.

REQUIREMENTS:
1. Install and configure Genkit with Google AI
2. Create genkit.config.ts
3. Build a simple test flow
4. Set up dev server script
5. Verify flow works in Genkit Dev UI

STEPS:

Step 1: Install Genkit packages (if not already done)
```bash
npm install @genkit-ai/core@^0.5.0 @genkit-ai/firebase@^0.5.0 @genkit-ai/googleai@^0.5.0
npm install -D genkit
```

Step 2: Create Genkit configuration (src/lib/genkit/config.ts)
```typescript
import { configureGenkit } from '@genkit-ai/core'
import { googleAI, gemini15Flash, gemini15Pro } from '@genkit-ai/googleai'

export const ai = configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export { gemini15Flash, gemini15Pro }
```

Step 3: Create first test flow (src/lib/genkit/flows/testFlow.ts)
```typescript
import { defineFlow, runFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { gemini15Flash } from '../config'

const testInputSchema = z.object({
  message: z.string(),
})

const testOutputSchema = z.object({
  response: z.string(),
  timestamp: z.string(),
})

export const testFlow = defineFlow(
  {
    name: 'testFlow',
    inputSchema: testInputSchema,
    outputSchema: testOutputSchema,
  },
  async (input) => {
    const result = await gemini15Flash.generate({
      prompt: `You are a helpful assistant. User says: "${input.message}". Respond briefly.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    })

    return {
      response: result.text,
      timestamp: new Date().toISOString(),
    }
  }
)

// Export function to call from components
export async function runTestFlow(message: string) {
  try {
    const result = await runFlow(testFlow, { message })
    return { success: true, data: result }
  } catch (error) {
    console.error('Test flow failed:', error)
    return { success: false, error: String(error) }
  }
}
```

Step 4: Create Genkit dev server script (package.json)
```json
{
  "scripts": {
    "dev": "next dev",
    "genkit:dev": "genkit start -- tsx --watch src/lib/genkit/flows/*.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Step 5: Create index file for flows (src/lib/genkit/flows/index.ts)
```typescript
export * from './testFlow'
// Export other flows as they're created
```

Step 6: Add environment variable for Gemini API key
```
# In .env.local
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

Step 7: Create a test page to verify flow works (src/app/test-genkit/page.tsx)
```typescript
'use client'

import { useState } from 'react'
import { runTestFlow } from '@/lib/genkit/flows/testFlow'

export default function TestGenkitPage() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    const result = await runTestFlow(message)
    
    if (result.success) {
      setResponse(result.data.response)
    } else {
      setResponse(`Error: ${result.error}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8 bg-neutral-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Genkit Flow</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message..."
            className="w-full p-3 border rounded"
          />
          
          <button
            onClick={handleTest}
            disabled={loading || !message}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Test Flow'}
          </button>
          
          {response && (
            <div className="p-4 bg-white border rounded">
              <p className="font-semibold mb-2">Response:</p>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

VERIFICATION:
1. Run `npm run genkit:dev` in one terminal
2. Open http://localhost:4000 to access Genkit Dev UI
3. Test the `testFlow` with a sample message
4. Confirm you get a response from Gemini
5. Visit http://localhost:3000/test-genkit and test from the Next.js app
```

---

### Prompt 4: Initialize Firestore Collections & Security Rules (25 min)

```
@03-DATABASE-SCHEMA.md Use complete database schema

TASK: Set up Firestore database with all collections, security rules, and composite indexes.

REQUIREMENTS:
1. Create firestore.rules with all security logic
2. Create firestore.indexes.json with composite indexes
3. Deploy rules and indexes to Firebase
4. Create seed data script for development

STEPS:

Step 1: Create Firestore security rules (firestore.rules)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function belongsToTenant(tenantId) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.tenant_id == tenantId;
    }
    
    function hasModuleAccess(module) {
      let userData = get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
      return module in userData.modules;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || belongsToTenant(resource.data.tenant_id));
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId);
      allow delete: if false; // Users should be soft-deleted
    }
    
    // Tenants collection
    match /tenants/{tenantId} {
      allow read: if isAuthenticated() && belongsToTenant(tenantId);
      allow update: if isAuthenticated() && belongsToTenant(tenantId) && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'owner';
      allow create, delete: if false; // Only through Cloud Functions
    }
    
    // Courses collection
    match /courses/{courseId} {
      allow read: if isAuthenticated() && hasModuleAccess(resource.data.module);
      allow write: if false; // Only admins via Cloud Functions
    }
    
    // Course Progress
    match /courseProgress/{progressId} {
      allow read: if isAuthenticated() && isOwner(resource.data.user_id);
      allow create, update: if isAuthenticated() && isOwner(request.resource.data.user_id);
      allow delete: if false;
    }
    
    // User Tools (BMC, GTM, etc.)
    match /userTools/{toolId} {
      allow read, write: if isAuthenticated() && isOwner(resource.data.user_id);
    }
    
    // AI Interactions (for tracking and caching)
    match /aiInteractions/{interactionId} {
      allow read: if isAuthenticated() && isOwner(resource.data.user_id);
      allow create: if isAuthenticated() && isOwner(request.resource.data.user_id);
      allow update, delete: if false;
    }
    
    // Business Milestones
    match /businessMilestones/{milestoneId} {
      allow read: if isAuthenticated() && (
        isOwner(resource.data.user_id) || 
        belongsToTenant(resource.data.tenant_id)
      );
      allow create: if isAuthenticated() && isOwner(request.resource.data.user_id);
      allow update: if isAuthenticated() && (
        isOwner(resource.data.user_id) ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'owner'
      );
      allow delete: if false;
    }
    
    // Sales Role-Play Sessions
    match /roleplaySessions/{sessionId} {
      allow read, write: if isAuthenticated() && 
                            isOwner(resource.data.user_id) &&
                            hasModuleAccess('sales_training');
    }
  }
}
```

Step 2: Create composite indexes (firestore.indexes.json)
```json
{
  "indexes": [
    {
      "collectionGroup": "courses",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "module", "order": "ASCENDING" },
        { "fieldPath": "published", "order": "ASCENDING" },
        { "fieldPath": "created_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "courseProgress",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "updated_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "businessMilestones",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "tenant_id", "order": "ASCENDING" },
        { "fieldPath": "verified", "order": "ASCENDING" },
        { "fieldPath": "achieved_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "userTools",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "tool_type", "order": "ASCENDING" },
        { "fieldPath": "updated_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "roleplaySessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "created_at", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

Step 3: Initialize Firebase CLI and deploy
```bash
# Install Firebase CLI globally (if not already)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project (choose Firestore, Functions, Hosting)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules

# Deploy indexes
firebase deploy --only firestore:indexes
```

Step 4: Create seed data script (scripts/seedFirestore.ts)
```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  // Your config here
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seedData() {
  console.log('Seeding Firestore...')

  // Seed a sample course
  await setDoc(doc(db, 'courses', 'course_1'), {
    title: 'Problem-Solution Fit Framework',
    description: 'Learn to validate your startup idea systematically',
    module: 'founder_academy',
    track: 'foundation',
    competencies: ['SC1'],
    published: true,
    lesson_count: 12,
    estimated_hours: 6,
    created_at: new Date(),
    updated_at: new Date(),
  })

  // Seed sample lessons
  const lessons = [
    'Introduction to Problem-Solution Fit',
    'Customer Discovery Process',
    'Problem Interviews',
    // ... more
  ]

  for (let i = 0; i < lessons.length; i++) {
    await setDoc(doc(db, 'courses', 'course_1', 'lessons', `lesson_${i + 1}`), {
      title: lessons[i],
      order: i + 1,
      duration_minutes: 30,
      content_type: 'video',
      created_at: new Date(),
    })
  }

  console.log('Seeding complete!')
}

seedData()
```

VERIFICATION:
1. Check Firebase Console > Firestore to see security rules deployed
2. Check that indexes are being built (can take a few minutes)
3. Try to read/write data and confirm security rules work
```

---

### Prompt 5: Build Module Configuration System (20 min)

```
@04-MODULE-ARCHITECTURE.md Reference complete module system

TASK: Create the module and plan configuration system that controls feature access.

REQUIREMENTS:
1. Define all modules and plans in config files
2. Create useModules and useFeatureAccess hooks
3. Build FeatureGate component
4. Build ModuleSwitcher component

[Continue with complete implementation...]
```

---

## AI Flow Creation Prompts

### Prompt 6: Create Strategic Advisor Flow (45 min)

```
@05-AI-FLOWS-LIBRARY.md Reference strategic advisor flow implementation

TASK: Create the strategic advisor Genkit flow with .prompt file, Zod schemas, and React hook.

REQUIREMENTS:
1. Create .prompt file for framework coaching
2. Define input/output schemas
3. Implement Genkit flow
4. Create React hook for components
5. Add streaming support

[Complete implementation steps...]
```

---

### Prompt 7: Create Sales Role-Play Flow with Streaming (45 min)

```
@05-AI-FLOWS-LIBRARY.md Reference sales roleplay flow

TASK: Create DISC personality-based role-play flow with real-time streaming responses.

[Complete implementation...]
```

---

### Prompt 8: Create Document Analysis Flow (45 min)

```
@05-AI-FLOWS-LIBRARY.md Reference multimodal document analysis

TASK: Create pitch deck analyzer flow using Gemini's multimodal capabilities.

[Complete implementation...]
```

---

## Component Building Prompts

### Prompt 9: Build Business Model Canvas Component (60 min)

```
@06-INTERACTIVE-COMPONENTS.md Reference BMC Generator complete specification

TASK: Build the Business Model Canvas interactive component with all 9 blocks, AI coaching, and auto-save.

[Complete implementation...]
```

---

### Prompt 10-20: Additional Component Prompts

[Additional detailed prompts for GTM Strategy, Unit Economics Calculator, Pitch Deck Analyzer, Role-Play Chat, Gmail CRM, etc.]

---

## Testing & QA Prompts

### Prompt 25: Run Accessibility Audit (30 min)

```
TASK: Run comprehensive accessibility audit and fix violations.

REQUIREMENTS:
1. Install jest-axe for automated testing
2. Add aria labels to interactive elements
3. Ensure keyboard navigation works
4. Test with screen reader
5. Verify color contrast ratios

[Complete testing steps...]
```

---

### Prompt 26: Performance Optimization (45 min)

```
TASK: Optimize application performance to meet target metrics.

TARGET METRICS:
- Time to Interactive (TTI): < 3 seconds
- First Contentful Paint (FCP): < 1.5 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds

STEPS:
1. Run Lighthouse audit
2. Implement code splitting
3. Optimize images with Next.js Image
4. Add loading states and skeletons
5. Implement virtual scrolling for long lists

[Complete optimization steps...]
```

---

## Deployment Prompts

### Prompt 27: Deploy to Firebase Hosting (20 min)

```
TASK: Build and deploy the application to Firebase Hosting.

STEPS:

Step 1: Build production bundle
```bash
npm run build
```

Step 2: Export static files (if using static export)
```bash
npm run export
```

Step 3: Initialize Firebase Hosting
```bash
firebase init hosting
```

Select options:
- Public directory: `out` (or `.next` for server-side)
- Configure as single-page app: Yes
- Set up automatic builds with GitHub: Optional

Step 4: Deploy
```bash
firebase deploy --only hosting
```

Step 5: Verify deployment
Visit your Firebase hosting URL and test all features

Step 6: Configure custom domain (optional)
```bash
firebase hosting:sites:list
firebase hosting:channel:deploy preview
```

VERIFICATION:
1. Visit production URL
2. Test authentication flow
3. Verify all modules load correctly
4. Check Firebase Analytics for traffic
```

---

## Common Issue Resolution Prompts

### Prompt 28: Debug Firestore Security Rules

```
ISSUE: Permission denied errors when accessing Firestore

DEBUGGING STEPS:

Step 1: Check user authentication status
```typescript
import { auth } from '@/lib/firebase/config'

console.log('Current user:', auth.currentUser)
console.log('User ID:', auth.currentUser?.uid)
```

Step 2: Verify tenant_id matches
```typescript
const userData = await getDocument('users', auth.currentUser!.uid)
console.log('User tenant_id:', userData.tenant_id)
console.log('Document tenant_id:', document.tenant_id)
```

Step 3: Test rules in Firebase Console Rules Playground
- Go to Firestore > Rules
- Click "Simulator"
- Test read/write operations with actual user IDs

Step 4: Check module access array
```typescript
console.log('User modules:', userData.modules)
console.log('Required module:', requiredModule)
```

Step 5: Review console logs for specific rule violation
Look for the exact rule that's failing in browser console

COMMON FIXES:
1. User not authenticated â†’ Check auth flow
2. tenant_id mismatch â†’ Ensure user document has tenant_id set
3. Module not in user.modules array â†’ Update user's module access
4. Role permissions â†’ Verify user role is 'owner' or 'member'
```

---

### Prompt 29: Optimize AI Token Usage

```
ISSUE: High token costs from AI interactions

OPTIMIZATION STRATEGIES:

Step 1: Implement conversation summarization
```typescript
// lib/genkit/utils/summarization.ts
export async function summarizeConversation(messages: Message[]) {
  if (messages.length < 10) return messages

  const recentMessages = messages.slice(-3)
  const olderMessages = messages.slice(0, -3)

  const summary = await gemini15Flash.generate({
    prompt: `Summarize this conversation in 2-3 sentences:\n${olderMessages.map(m => m.content).join('\n')}`,
    config: {
      temperature: 0,
      maxOutputTokens: 200,
    },
  })

  return [
    { role: 'system', content: `Previous context: ${summary.text}` },
    ...recentMessages,
  ]
}
```

Step 2: Add response caching
```typescript
// Cache common framework explanations
const FRAMEWORK_CACHE = new Map<string, string>()

export async function getFrameworkExplanation(name: string) {
  if (FRAMEWORK_CACHE.has(name)) {
    return FRAMEWORK_CACHE.get(name)!
  }

  const explanation = await generateExplanation(name)
  FRAMEWORK_CACHE.set(name, explanation)
  return explanation
}
```

Step 3: Reduce prompt length
- Remove unnecessary context
- Use references instead of full text
- Compress system instructions

Step 4: Monitor with Vertex AI dashboard
- Set up tracking in Google Cloud Console
- Set budget alerts
- Review usage patterns weekly
```

---

### Prompt 30: Add New Module (60 min)

```
TASK: Add a 4th module to the platform (e.g., "Product Development Module")

STEPS:

Step 1: Update module configuration (src/config/modules.ts)
```typescript
export const MODULES: Record<ModuleName, ModuleConfig> = {
  // ... existing modules
  product_development: {
    id: 'product_development',
    name: 'Product Development',
    description: 'AI-assisted product roadmap and feature prioritization',
    tagline: 'Build products customers love',
    features: [
      'Product roadmap builder',
      'Feature prioritization matrix',
      'User story generator',
      'Technical debt tracker',
    ],
    icon: 'RocketIcon',
    color: 'primary',
    route: '/dashboard/product-development',
    requiredPlan: ['complete'], // Or create new plan
  },
}
```

Step 2: Create route directory
```bash
mkdir -p src/app/(dashboard)/product-development
```

Step 3: Create module layout
```typescript
// src/app/(dashboard)/product-development/layout.tsx
export default function ProductDevLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="product-dev-module">
      {/* Module-specific layout */}
      {children}
    </div>
  )
}
```

Step 4: Update Firestore security rules
Add module check for new features

Step 5: Create module-specific components
- Feature prioritization tool
- Roadmap visualizer
- User story templates

Step 6: Update pricing page with new module
```

---

This comprehensive set of Cursor prompts enables systematic platform development with clear verification steps at each stage. Each prompt is designed to be paste-ready while providing complete context for successful execution.