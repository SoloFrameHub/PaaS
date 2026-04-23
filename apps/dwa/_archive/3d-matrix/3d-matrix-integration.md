# 3D Roleplay Matrix — Antigravity Integration Guide

**Priority:** Beta-Critical (Weeks 2-3 January)  
**Status:** Data files complete, awaiting integration  
**Approach:** Firestore-first (no JSON fallback for beta)

---

## Overview

The 3D Roleplay Matrix adds three dimensions of personalization:

1. **Founder Category** — Who the user is (coaching adaptation)
2. **Industry** — What market they're selling into (terminology, objections)
3. **Client Role + DISC** — Who they're selling to (buyer behavior)

These dimensions power **three features**:

| Feature | Description | Priority |
|---------|-------------|----------|
| **Onboarding** | Assess founder type, capture business context | P0 |
| **Roleplay** | Dynamic AI buyer personas | P0 |
| **Lesson Synthesis** | Context-aware teaching examples | P1 |

---

## Part 1: File Placement

### Data Files → Firestore Seed

Place in project root temporarily for seeding:

```
soloframehub-v2/
├── seed-data/                           ← TEMPORARY (delete after seeding)
│   ├── founderCategories.json
│   ├── clientRoles.json
│   ├── discPatterns.json
│   └── industries/
│       ├── saas_startup.json
│       ├── devtools.json
│       ├── agencies.json
│       ├── professional_services.json
│       ├── martech.json
│       ├── edtech.json
│       ├── fintech.json
│       ├── healthtech.json
│       ├── manufacturing.json
│       ├── real_estate.json
│       ├── hr_recruiting.json
│       └── ecommerce.json
```

### TypeScript Types → Permanent

```
soloframehub-v2/
├── types/
│   └── roleplay/
│       ├── FounderCategory.ts
│       ├── Industry.ts
│       ├── ClientRole.ts
│       ├── DiscPattern.ts
│       └── index.ts
```

### Seed Script → Scripts Folder

```
soloframehub-v2/
├── scripts/
│   └── seedRoleplayData.ts
```

---

## Part 2: Firestore Collections

### Collection Structure

```
firestore/
├── founderCategories/          ← 10 documents
│   ├── reluctant_seller
│   ├── burned_bootstrapper
│   ├── technical_purist
│   └── ... (10 total)
│
├── industries/                 ← 12 documents
│   ├── saas_startup
│   ├── fintech
│   └── ... (12 total)
│
├── clientRoles/                ← 60 documents
│   ├── ceo_founder_high_d
│   ├── ceo_founder_high_i
│   ├── ceo_founder_high_s
│   ├── ceo_founder_high_c
│   └── ... (60 total: 15 roles × 4 DISC)
│
├── discPatterns/               ← 4 documents
│   ├── D
│   ├── I
│   ├── S
│   └── C
```

### Seed Script

```typescript
// scripts/seedRoleplayData.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Firebase Admin (check if already initialized)
if (!getApps().length) {
  initializeApp({
    credential: cert(require('../serviceAccountKey.json'))
  })
}

const db = getFirestore()
const SEED_DIR = path.join(__dirname, '../seed-data')

async function seedCollection(collectionName: string, data: any[], idField: string) {
  console.log(`\nSeeding ${collectionName}...`)
  
  const batch = db.batch()
  let count = 0
  
  for (const item of data) {
    const docId = item[idField]
    if (!docId) {
      console.error(`Missing ${idField} in item:`, item)
      continue
    }
    
    const ref = db.collection(collectionName).doc(docId)
    batch.set(ref, {
      ...item,
      _seeded_at: new Date().toISOString()
    })
    count++
  }
  
  await batch.commit()
  console.log(`✅ Seeded ${count} documents to ${collectionName}`)
}

async function seedIndustries() {
  console.log('\nSeeding industries...')
  
  const industriesDir = path.join(SEED_DIR, 'industries')
  const files = fs.readdirSync(industriesDir).filter(f => f.endsWith('.json'))
  
  const batch = db.batch()
  
  for (const file of files) {
    const filePath = path.join(industriesDir, file)
    const industry = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    const ref = db.collection('industries').doc(industry.industry_id)
    batch.set(ref, {
      ...industry,
      _seeded_at: new Date().toISOString()
    })
  }
  
  await batch.commit()
  console.log(`✅ Seeded ${files.length} industries`)
}

async function main() {
  console.log('🚀 Starting 3D Matrix data seed...\n')
  
  try {
    // 1. Seed founder categories
    const founderCategories = JSON.parse(
      fs.readFileSync(path.join(SEED_DIR, 'founderCategories.json'), 'utf-8')
    )
    await seedCollection('founderCategories', founderCategories, 'category_id')
    
    // 2. Seed industries
    await seedIndustries()
    
    // 3. Seed client roles
    const clientRoles = JSON.parse(
      fs.readFileSync(path.join(SEED_DIR, 'clientRoles.json'), 'utf-8')
    )
    await seedCollection('clientRoles', clientRoles, 'role_id')
    
    // 4. Seed DISC patterns
    const discPatterns = JSON.parse(
      fs.readFileSync(path.join(SEED_DIR, 'discPatterns.json'), 'utf-8')
    )
    await seedCollection('discPatterns', discPatterns, 'disc_type')
    
    console.log('\n🎉 All 3D Matrix collections seeded successfully!')
    console.log('\nCollection summary:')
    console.log('  - founderCategories: 10 documents')
    console.log('  - industries: 12 documents')
    console.log('  - clientRoles: 60 documents')
    console.log('  - discPatterns: 4 documents')
    console.log('\n💡 You can now delete the /seed-data folder')
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

main()
```

**Run with:**
```bash
npx ts-node scripts/seedRoleplayData.ts
```

---

## Part 3: User Profile Extension

### Update User Schema

Add `founder_profile` to the existing user document:

```typescript
// types/user.ts (extend existing)
interface UserFounderProfile {
  // Assigned during onboarding
  founder_category: string              // e.g., "technical_purist"
  category_confidence: number           // 0-100
  category_assessed_at: string          // ISO timestamp
  
  // Business context (onboarding step 2)
  business_context: {
    industry: string                    // e.g., "fintech"
    company_stage: 'idea' | 'pre_revenue' | 'early_revenue' | 'scaling'
    target_customer_type: 'b2b' | 'b2c' | 'hybrid'
    typical_deal_size: 'transactional' | 'smb' | 'mid_market' | 'enterprise'
    target_roles: string[]              // e.g., ["cto", "dir_engineering"]
  }
  
  // User's own DISC (onboarding step 3)
  disc_profile: {
    primary: 'D' | 'I' | 'S' | 'C'
    secondary: 'D' | 'I' | 'S' | 'C' | null
    assessed_at: string
  }
  
  // Performance tracking (populated over time)
  roleplay_stats: {
    total_sessions: number
    by_disc_type: Record<string, { sessions: number; avg_score: number }>
    strongest_pairing: string | null    // e.g., "High-I + SaaS + VP Marketing"
    weakest_pairing: string | null
  }
}

// Add to existing User interface
interface User {
  // ... existing fields
  founder_profile?: UserFounderProfile
}
```

---

## Part 4: Feature Implementation

### 4.1 Onboarding Flow

**Step 1: Founder Category Assessment**

```typescript
// lib/services/onboardingService.ts

import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface AssessmentQuestion {
  id: string
  question: string
  options: {
    text: string
    category_weights: Record<string, number>  // category_id → weight
  }[]
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: "When you think about reaching out to potential customers, your first instinct is:",
    options: [
      { 
        text: "I should make the product better first", 
        category_weights: { reluctant_seller: 3, technical_purist: 2 }
      },
      { 
        text: "I've tried sales approaches before and they felt wrong", 
        category_weights: { burned_bootstrapper: 3 }
      },
      { 
        text: "I know I need to, but I barely have time", 
        category_weights: { time_starved_parent: 3 }
      },
      { 
        text: "I'm ready—just need the right framework", 
        category_weights: { scaling_struggler: 2, returning_founder: 2 }
      }
    ]
  },
  // ... 5-6 more questions
]

export function calculateFounderCategory(
  answers: Record<string, string>
): { category_id: string; confidence: number } {
  const scores: Record<string, number> = {}
  
  for (const [questionId, selectedOption] of Object.entries(answers)) {
    const question = ASSESSMENT_QUESTIONS.find(q => q.id === questionId)
    const option = question?.options.find(o => o.text === selectedOption)
    
    if (option) {
      for (const [categoryId, weight] of Object.entries(option.category_weights)) {
        scores[categoryId] = (scores[categoryId] || 0) + weight
      }
    }
  }
  
  // Find highest scoring category
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topScore = sorted[0]?.[1] || 0
  const totalPossible = ASSESSMENT_QUESTIONS.length * 3  // max weight per question
  
  return {
    category_id: sorted[0]?.[0] || 'reluctant_seller',
    confidence: Math.round((topScore / totalPossible) * 100)
  }
}
```

**Step 2: Business Context**

```typescript
// components/onboarding/BusinessContextStep.tsx

export function BusinessContextStep({ onComplete }: { onComplete: (data: BusinessContext) => void }) {
  const [industries, setIndustries] = useState<Industry[]>([])
  
  useEffect(() => {
    // Fetch industries from Firestore for dropdown
    const fetchIndustries = async () => {
      const snapshot = await getDocs(collection(db, 'industries'))
      setIndustries(snapshot.docs.map(doc => doc.data() as Industry))
    }
    fetchIndustries()
  }, [])
  
  // Form with:
  // - Industry dropdown (populated from Firestore)
  // - Company stage selector
  // - Target customer type (B2B/B2C/Hybrid)
  // - Typical deal size
  // - Target roles multi-select (filtered by selected industry's applicable_industries)
}
```

**Step 3: DISC Self-Assessment (Condensed)**

```typescript
// 4-5 scenario questions that map to DISC
const DISC_SCENARIOS = [
  {
    scenario: "In a sales call, when you don't know the answer to a technical question, you:",
    options: [
      { text: "Confidently redirect to what you do know", disc: 'D' },
      { text: "Engage enthusiastically and promise to follow up", disc: 'I' },
      { text: "Honestly admit the gap and offer to research", disc: 'S' },
      { text: "Ask clarifying questions to understand exactly what they need", disc: 'C' }
    ]
  },
  // ... 3-4 more scenarios
]
```

---

### 4.2 Roleplay Service

```typescript
// lib/services/roleplayService.ts

import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import type { FounderCategory, Industry, ClientRole, DiscPattern } from '@/types/roleplay'

interface RoleplayContext {
  founder: FounderCategory
  industry: Industry
  clientRole: ClientRole
  discPattern: DiscPattern
  scenario: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export async function buildRoleplayContext(
  userId: string,
  industryId: string,
  roleId: string,  // e.g., "cto_high_d"
): Promise<RoleplayContext> {
  
  // 1. Get user's founder profile
  const userDoc = await getDoc(doc(db, 'users', userId))
  const userData = userDoc.data()
  const founderCategoryId = userData?.founder_profile?.founder_category || 'reluctant_seller'
  
  // 2. Extract DISC type from role_id (e.g., "cto_high_d" → "D")
  const discType = roleId.split('_high_')[1]?.toUpperCase() as 'D' | 'I' | 'S' | 'C'
  
  // 3. Fetch all context in parallel
  const [founderDoc, industryDoc, roleDoc, discDoc] = await Promise.all([
    getDoc(doc(db, 'founderCategories', founderCategoryId)),
    getDoc(doc(db, 'industries', industryId)),
    getDoc(doc(db, 'clientRoles', roleId)),
    getDoc(doc(db, 'discPatterns', discType))
  ])
  
  const founder = founderDoc.data() as FounderCategory
  const industry = industryDoc.data() as Industry
  const clientRole = roleDoc.data() as ClientRole
  const discPattern = discDoc.data() as DiscPattern
  
  // 4. Calculate difficulty based on founder's struggle types
  const difficulty = calculateDifficulty(founder, discType, clientRole)
  
  // 5. Generate scenario from industry templates
  const scenario = generateScenario(industry, clientRole)
  
  return {
    founder,
    industry,
    clientRole,
    discPattern,
    scenario,
    difficulty
  }
}

function calculateDifficulty(
  founder: FounderCategory,
  discType: string,
  role: ClientRole
): 'beginner' | 'intermediate' | 'advanced' {
  
  // If DISC type is in founder's struggle list, bump up difficulty
  if (founder.struggle_disc_types.includes(discType as any)) {
    return founder.default_difficulty === 'beginner' ? 'intermediate' : 'advanced'
  }
  
  // If role is senior, bump up difficulty
  if (['vp', 'c_suite'].includes(role.seniority_level)) {
    return founder.default_difficulty === 'beginner' ? 'intermediate' : 'advanced'
  }
  
  return founder.default_difficulty
}

function generateScenario(industry: Industry, role: ClientRole): string {
  // Pick random template and fill variables
  const templates = industry.scenario_templates.filter(t => 
    t.complexity === 'single_stakeholder' // Start simple
  )
  
  const template = templates[Math.floor(Math.random() * templates.length)]
  
  // Replace variables with realistic values
  let scenario = template.template
    .replace('{{role}}', role.display_name)
    .replace('{{company_size}}', industry.typical_company_sizes[0])
    .replace('{{pain_point}}', industry.pain_points[0]?.pain || 'efficiency challenges')
  
  return scenario
}
```

---

### 4.3 System Prompt Assembly

```typescript
// lib/services/roleplayPromptBuilder.ts

import type { RoleplayContext } from './roleplayService'

export function buildRoleplaySystemPrompt(context: RoleplayContext): string {
  const { founder, industry, clientRole, discPattern, scenario, difficulty } = context
  
  return `# ROLE DEFINITION
You are role-playing as a **${clientRole.disc_type}** **${clientRole.display_name}** at a ${industry.display_name} company.

## YOUR PERSONALITY (DISC: ${clientRole.disc_type})
${clientRole.disc_overlay.behavioral_description}

**Communication Style:**
${clientRole.disc_overlay.communication_tips.map(tip => `- ${tip}`).join('\n')}

**Email Style:** ${clientRole.disc_overlay.email_style}
**Meeting Behavior:** ${clientRole.disc_overlay.meeting_behavior}

## YOUR ROLE CONTEXT
**Title:** ${clientRole.display_name} (${clientRole.seniority_level} level)
**You are measured on:** ${clientRole.measured_on.join(', ')}
**You get fired for:** ${clientRole.gets_fired_for.join(', ')}

**Your Daily Pains:**
${clientRole.role_specific_pains.map(pain => `- ${pain}`).join('\n')}

**Hidden Concerns (what you think but don't say):**
${clientRole.hidden_concerns.map(concern => `- ${concern}`).join('\n')}

## YOUR INDUSTRY CONTEXT (${industry.display_name})
**Regulatory Environment:** ${industry.regulatory_concerns.join(', ') || 'Minimal'}
**Risk Tolerance:** ${industry.risk_tolerance}

**Industry-Specific Objections You Might Raise:**
${industry.common_objections.slice(0, 4).map(obj => 
  `- "${obj.objection}" (Real concern: ${obj.underlying_concern})`
).join('\n')}

**Industry Terminology You Use Naturally:**
${industry.terminology.slice(0, 8).map(term => 
  `- ${term.term}: ${term.definition}`
).join('\n')}

## SCENARIO
${scenario}

## DIFFICULTY: ${difficulty.toUpperCase()}
${getDifficultyInstructions(difficulty)}

## BUYING SIGNALS (if they earn them)
${clientRole.disc_overlay.buying_signals.map(signal => `- ${signal}`).join('\n')}

## WARNING SIGNS (if they're losing you)
${clientRole.disc_overlay.warning_signs.map(sign => `- ${sign}`).join('\n')}

## OBJECTION STYLE
${clientRole.disc_overlay.objection_style}

## RULES
1. Stay completely in character as a ${clientRole.disc_type} ${clientRole.display_name}
2. Use ${industry.display_name} terminology naturally
3. React realistically—don't make it easy
4. Keep responses 2-4 sentences (real prospects don't monologue)
5. Give buying signals ONLY if they handle you well
6. Reference your hidden concerns indirectly
7. If they're struggling, become more resistant`
}

function getDifficultyInstructions(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return `- Be somewhat receptive but still realistic
- Give clear buying signals when they do well
- Raise 1-2 objections maximum
- Be patient with awkward moments`
    case 'intermediate':
      return `- Be moderately skeptical
- Require proof for claims
- Raise 2-3 objections, including one role-specific
- Test their methodology knowledge`
    case 'advanced':
      return `- Be highly skeptical and time-pressed
- Challenge every assertion
- Raise multiple layered objections
- Include political/internal concerns
- Interrupt if they're rambling`
    default:
      return ''
  }
}
```

---

### 4.4 Lesson Context Provider

```typescript
// lib/context/FounderContext.tsx

import { createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from './AuthContext'
import type { FounderCategory, Industry, ClientRole } from '@/types/roleplay'

interface FounderContextData {
  isLoading: boolean
  founderCategory: FounderCategory | null
  industry: Industry | null
  targetRoles: ClientRole[]
  
  // Helper for lesson personalization
  getPersonalizedExample: (genericExample: string) => string
}

const FounderContext = createContext<FounderContextData | null>(null)

export function FounderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [founderCategory, setFounderCategory] = useState<FounderCategory | null>(null)
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [targetRoles, setTargetRoles] = useState<ClientRole[]>([])
  
  useEffect(() => {
    if (!user?.uid) return
    
    const loadFounderContext = async () => {
      setIsLoading(true)
      
      // Get user profile
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const profile = userDoc.data()?.founder_profile
      
      if (!profile) {
        setIsLoading(false)
        return
      }
      
      // Load founder category
      if (profile.founder_category) {
        const categoryDoc = await getDoc(doc(db, 'founderCategories', profile.founder_category))
        setFounderCategory(categoryDoc.data() as FounderCategory)
      }
      
      // Load industry
      if (profile.business_context?.industry) {
        const industryDoc = await getDoc(doc(db, 'industries', profile.business_context.industry))
        setIndustry(industryDoc.data() as Industry)
      }
      
      // Load target roles (with user's DISC preference for examples)
      if (profile.business_context?.target_roles?.length > 0) {
        const userDisc = profile.disc_profile?.primary || 'C'
        const rolePromises = profile.business_context.target_roles.map(roleId =>
          getDoc(doc(db, 'clientRoles', `${roleId}_high_${userDisc.toLowerCase()}`))
        )
        const roleDocs = await Promise.all(rolePromises)
        setTargetRoles(roleDocs.map(d => d.data() as ClientRole).filter(Boolean))
      }
      
      setIsLoading(false)
    }
    
    loadFounderContext()
  }, [user?.uid])
  
  // Helper function for lesson personalization
  const getPersonalizedExample = (genericExample: string): string => {
    if (!industry || !targetRoles.length) return genericExample
    
    let personalized = genericExample
    
    // Replace generic terms with user's context
    personalized = personalized
      .replace(/\[industry\]/gi, industry.display_name)
      .replace(/\[buyer role\]/gi, targetRoles[0]?.display_name || 'your prospect')
      .replace(/\[pain point\]/gi, industry.pain_points[0]?.pain || 'their challenges')
      .replace(/\[terminology\]/gi, industry.terminology[0]?.term || 'industry terms')
    
    return personalized
  }
  
  return (
    <FounderContext.Provider value={{
      isLoading,
      founderCategory,
      industry,
      targetRoles,
      getPersonalizedExample
    }}>
      {children}
    </FounderContext.Provider>
  )
}

export function useFounderContext() {
  const context = useContext(FounderContext)
  if (!context) {
    throw new Error('useFounderContext must be used within FounderProvider')
  }
  return context
}
```

**Usage in Lessons:**

```typescript
// components/lessons/LessonContent.tsx

import { useFounderContext } from '@/lib/context/FounderContext'

export function LessonContent({ content }: { content: string }) {
  const { industry, targetRoles, getPersonalizedExample } = useFounderContext()
  
  // Personalize generic example
  const personalizedContent = getPersonalizedExample(content)
  
  return (
    <div>
      {personalizedContent}
      
      {/* Add contextual sidebar */}
      {industry && (
        <aside className="lesson-context">
          <h4>For {industry.display_name}:</h4>
          <p>Key terms to use: {industry.terminology.slice(0, 3).map(t => t.term).join(', ')}</p>
          {targetRoles[0] && (
            <p>Your {targetRoles[0].display_name} cares about: {targetRoles[0].measured_on[0]}</p>
          )}
        </aside>
      )}
    </div>
  )
}
```

---

## Part 5: Implementation Checklist

### Phase 1: Data Setup (Day 1)
- [ ] Copy seed-data files to project
- [ ] Copy TypeScript types to `/types/roleplay/`
- [ ] Add seed script to `/scripts/`
- [ ] Run seed script: `npx ts-node scripts/seedRoleplayData.ts`
- [ ] Verify in Firebase Console: 4 collections, 86 total documents
- [ ] Delete `/seed-data/` folder

### Phase 2: User Profile (Day 2)
- [ ] Extend User type with `founder_profile`
- [ ] Update Firestore security rules for new fields
- [ ] Create onboarding assessment questions
- [ ] Build onboarding UI (3 steps)
- [ ] Save founder_profile to user document on complete

### Phase 3: Roleplay Integration (Days 3-4)
- [ ] Implement `buildRoleplayContext()` 
- [ ] Implement `buildRoleplaySystemPrompt()`
- [ ] Update roleplay UI with industry/role selectors
- [ ] Test with all difficulty levels
- [ ] Add session tracking to user profile

### Phase 4: Lesson Personalization (Day 5)
- [ ] Create FounderContext provider
- [ ] Wrap app with FounderProvider
- [ ] Update lesson components to use context
- [ ] Add contextual sidebars to lessons
- [ ] Test personalization with different profiles

---

## Verification Commands

**Check Firestore collections:**
```javascript
// In Firebase Console → Firestore → Run query
// Or in browser console with Firebase SDK
const counts = {
  founderCategories: (await getDocs(collection(db, 'founderCategories'))).size,
  industries: (await getDocs(collection(db, 'industries'))).size,
  clientRoles: (await getDocs(collection(db, 'clientRoles'))).size,
  discPatterns: (await getDocs(collection(db, 'discPatterns'))).size,
}
console.log(counts)
// Expected: { founderCategories: 10, industries: 12, clientRoles: 60, discPatterns: 4 }
```

---

## Confirmed Decisions

1. **Onboarding timing:** 
   - **Beta (Jan 2-3 weeks):** Required — users must complete onboarding before accessing roleplay or personalized lessons
   - **Production (post-beta):** Optional but encouraged — show benefits reminder, allow skip with gentle nudges to complete later

2. **Default fallbacks (if user skips in production):**
   - Founder category: `technical_purist`
   - Industry: `saas_startup`
   - Target role for examples: `cto_high_c`

3. **Industry filtering:** Yes — role selector only shows roles where `applicable_industries` includes user's selected industry

---

## Beta vs Production Behavior

```typescript
// lib/config/featureFlags.ts
export const FEATURE_FLAGS = {
  REQUIRE_ONBOARDING: process.env.NEXT_PUBLIC_BETA_MODE === 'true',
}

// Usage in roleplay gate
if (FEATURE_FLAGS.REQUIRE_ONBOARDING && !user.founder_profile?.founder_category) {
  redirect('/onboarding')
}
```

---

*Document created for Antigravity implementation. Data files verified and ready for integration.*