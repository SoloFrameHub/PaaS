# 06-INTERACTIVE-COMPONENTS.md
## Strategic Tools & Framework Builders - Complete UI Component Specifications

**File Size:** ~35KB  
**Purpose:** Complete UI component specifications for all strategic tools and framework builders across three modules  
**Dependencies:** 01-TECHNICAL-ARCHITECTURE.md, 03-DATABASE-SCHEMA.md, 04-MODULE-ARCHITECTURE.md, 05-AI-FLOWS-LIBRARY.md

---

## TABLE OF CONTENTS

1. [Component Architecture Overview](#component-architecture-overview)
2. [Founder Academy Components (Module 1)](#founder-academy-components)
3. [Sales Training Components (Module 2)](#sales-training-components)
4. [Sales Enablement Components (Module 3)](#sales-enablement-components)
5. [Shared UI Components](#shared-ui-components)
6. [Component Development Patterns](#component-development-patterns)
7. [Responsive Design Patterns](#responsive-design-patterns)
8. [Testing Specifications](#testing-specifications)

---

## Component Architecture Overview

### Philosophy

All interactive components follow these principles:

1. **Strategic Thinking Environment** - Calm, focused aesthetic for deep work
2. **AI-Augmented Guidance** - Multi-turn coaching integrated seamlessly
3. **Auto-Save Everything** - No data loss, ever
4. **Progressive Disclosure** - Show complexity gradually
5. **Mobile-First Responsive** - Works on all devices
6. **Accessibility First** - WCAG 2.1 AA compliance

### Shared Technology Stack

```typescript
// State Management
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Data Fetching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Forms
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Firebase
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/clientApp'

// AI Integration
import { useGenkitFlow } from '@/hooks/useGenkitFlow'

// UI Components
import { motion, AnimatePresence } from 'framer-motion'
```

### Auto-Save Pattern

```typescript
// hooks/useAutoSave.ts
function useAutoSave<T>(
  collectionName: string,
  documentId: string,
  data: T,
  delay: number = 30000 // 30 seconds
) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!data) return
      
      setIsSaving(true)
      try {
        await setDoc(
          doc(db, collectionName, documentId),
          {
            ...data,
            updated_at: serverTimestamp(),
          },
          { merge: true }
        )
        setLastSaved(new Date())
      } catch (error) {
        console.error('Auto-save failed:', error)
      } finally {
        setIsSaving(false)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [data, collectionName, documentId, delay])

  return { lastSaved, isSaving }
}
```

---

## Founder Academy Components

### A. Business Model Canvas Generator

**Location:** `components/founder/BusinessModelCanvas.tsx`

**Purpose:** Interactive 9-block canvas with AI coaching per section

**Key Features:**
- 9 building blocks as editable cards
- AI coaching per block (Genkit flow: `bmcCoach`)
- Auto-save every 30 seconds
- Export to PDF and Google Drive
- Mobile-responsive grid layout

**Firestore Schema:**
```typescript
// Collection: frameworkBuilds
interface BMCDocument {
  id: string
  user_id: string
  tenant_id: string
  framework_type: 'business_model_canvas'
  data: {
    customer_segments: string
    value_propositions: string
    channels: string
    customer_relationships: string
    revenue_streams: string
    key_resources: string
    key_activities: string
    key_partnerships: string
    cost_structure: string
  }
  completed: boolean
  completion_percentage: number
  ai_feedback: Array<{
    block: string
    feedback: string
    timestamp: Date
  }>
  created_at: Date
  updated_at: Date
}
```

**Component Structure:**
```
BusinessModelCanvas/
â”œâ”€â”€ index.tsx (main component)
â”œâ”€â”€ CanvasBlock.tsx (individual block)
â”œâ”€â”€ AICoachingSidebar.tsx (side panel with AI)
â”œâ”€â”€ ExportButton.tsx (PDF/Drive export)
â””â”€â”€ CompletionProgress.tsx (progress indicator)
```

---

### B. GTM Strategy Architect

**Location:** `components/founder/GTMStrategyArchitect.tsx`

**Purpose:** Multi-step wizard for go-to-market strategy with AI recommendations

**Key Features:**
- 6-step guided process
- AI insights per step (Genkit flow: `gtmAnalyzer`)
- Progressive disclosure of complexity
- Strategic validation at each step

**Steps:**
1. Target Customer Definition
2. Value Proposition Refinement
3. Channel Strategy Selection
4. Pricing Strategy Development
5. Launch Timeline Planning
6. Strategic Review & Export

**Component Structure:**
```
GTMStrategyArchitect/
â”œâ”€â”€ index.tsx (wizard container)
â”œâ”€â”€ TargetCustomerStep.tsx
â”œâ”€â”€ ValuePropositionStep.tsx
â”œâ”€â”€ ChannelStrategyStep.tsx
â”œâ”€â”€ PricingStrategyStep.tsx
â”œâ”€â”€ LaunchTimelineStep.tsx
â””â”€â”€ StrategicReviewStep.tsx
```

---

### C. Unit Economics Calculator

**Location:** `components/founder/UnitEconomicsCalculator.tsx`

**Purpose:** Interactive calculator with real-time AI optimization insights

**Key Metrics Calculated:**
- Customer Lifetime Value (LTV)
- LTV:CAC Ratio
- Gross Margin %
- Break-even Units
- Months to Profitability

**Key Features:**
- Real-time calculation as inputs change
- AI-powered optimization suggestions (Genkit flow: `unitEconomicsAnalyzer`)
- 12-month scenario projections
- Visual charts (Recharts)
- Export financial models

**AI Insights Examples:**
- "Your LTV:CAC ratio of 2.1:1 is below the healthy 3:1 target. Consider reducing CAC by 30% through content marketing."
- "At current growth rate, you'll reach profitability in 8 months. To accelerate to 6 months, increase pricing by 15%."

---

### D. Customer Avatar Workshop

**Location:** `components/founder/CustomerAvatarWorkshop.tsx`

**Purpose:** Guided persona creation with AI psychological insights

**Sections:**
1. Demographics (age, location, education)
2. Professional (job title, company, industry)
3. Psychographics (goals, challenges, values)
4. Behavioral (buying process, objections)
5. AI-Generated Insights:
   - Personality traits
   - Typical day narrative
   - Sample quotes
   - Empathy map (thinks/feels/says/does)

**Genkit Flow:** `customerAvatarGenerator`

---

### E. Pitch Deck Analyzer

**Location:** `components/founder/PitchDeckAnalyzer.tsx`

**Purpose:** Upload pitch deck, get AI-powered feedback

**Key Features:**
- Drag-drop upload (PDF, PPTX, images)
- Multimodal AI analysis (Genkit flow: `pitchDeckAnalyzer`)
- Slide-by-slide scoring
- Structural analysis (narrative flow, visual design)
- Strategic recommendations
- Downloadable critique report

**Gemini 2.5 Pro Multimodal:**
```typescript
// Sends deck images to Gemini for visual analysis
const analysis = await runFlow('pitchDeckAnalyzer', {
  deck_images: uploadedImages, // base64 encoded
  founder_context: {
    stage: 'pre-seed',
    industry: 'SaaS',
    target_raise: 500000,
  },
})
```

---

### F. Financial Model Validator

**Location:** `components/founder/FinancialModelValidator.tsx`

**Purpose:** Screenshot upload + AI assumption testing

**Validation Checks:**
- Revenue model logic
- Growth rate realism
- Cost structure completeness
- Sensitivity analysis
- Conservative alternatives

---

### G. Landing Page Audit

**Location:** `components/founder/LandingPageAudit.tsx`

**Purpose:** Screenshot/URL analysis for conversion optimization

**Analysis Areas:**
- Visual hierarchy
- Value proposition clarity (5-second test)
- Call-to-action effectiveness
- Social proof assessment
- Mobile responsiveness
- Page speed indicators

---

## Sales Training Components

### H. AI Role-Play Chat Interface

**Location:** `components/sales/AIRolePlayChat.tsx`

**Purpose:** Real-time sales conversation practice with streaming AI

**Key Features:**
- DISC personality selector (D, I, S, C)
- Scenario configuration
- Streaming AI responses (Genkit flow: `salesRolePlay`)
- Real-time performance metrics sidebar
- Talk time ratio visualization
- Session recording and playback

**Performance Tracking:**
```typescript
interface RolePlayPerformance {
  talk_time_ratio: number // Target: 30-40%
  questions_asked: number // Target: 8-12
  objections_encountered: number
  objections_handled: number
  call_control_score: number // 0-100
  methodology_adherence: number // % adherence to SPIN/Sandler/etc
}
```

**Real-Time Coaching:**
- AI detects objections and flags them
- Methodology adherence tracking (SPIN, Sandler, Challenger)
- Micro-feedback during conversation

---

### I. Pre-Call Coaching Brief Generator

**Location:** `components/sales/PreCallCoachingBrief.tsx`

**Purpose:** AI-generated coaching brief before sales calls

**Generated Content:**
- Key talking points
- Likely objections with responses
- Discovery questions to ask
- Closing strategies
- Competitor differentiation

**Input Required:**
- Prospect information
- Deal context
- Previous conversation history

---

### J. Performance Analytics Dashboard

**Location:** `components/sales/PerformanceAnalyticsDashboard.tsx`

**Purpose:** Comprehensive sales training metrics

**Charts & Visualizations:**
- Performance trends over time (LineChart)
- Skills radar chart (RadarChart)
- Methodology comparison (BarChart)
- Session history table

**Key Metrics:**
- Total sessions completed
- Average talk time ratio
- Objection handling rate
- Methodology adherence
- Improvement trends

---

### K. Objection Handling Library

**Location:** `components/sales/ObjectionHandlingLibrary.tsx`

**Purpose:** Searchable knowledge base of objections + responses

**Features:**
- Common objections categorized
- Proven response frameworks
- AI-generated personalized responses
- Success rate data per response
- Practice mode (AI role-plays objection)

---

## Sales Enablement Components

### L. Gmail CRM Interface

**Location:** `components/enablement/GmailCRMInterface.tsx`

**Purpose:** Lightweight CRM built on Gmail API

**Key Features:**
- Contact list with enrichment
- Email timeline per contact
- Deal pipeline (kanban board with drag-drop)
- Quick actions (email, schedule meeting)
- Team collaboration (shared notes)
- Google Calendar integration

**Firestore Collections:**
- `crmContacts`
- `deals`
- `dealStages`

**Enrichment:**
Uses third-party API to fetch:
- Company information
- Job title
- LinkedIn profile
- Phone number

---

### M. Knowledge Extractor Dashboard

**Location:** `components/enablement/KnowledgeExtractorDashboard.tsx`

**Purpose:** Upload docs/calls to extract training knowledge

**Upload Types:**
- Sales call recordings (audio/video)
- Sales documents (PDF, DOCX)
- Email threads
- Chat transcripts

**Extraction Outputs:**
- Training lessons
- Objection handling patterns
- Winning talk tracks
- Competitor intelligence
- Best practices

**Genkit Flow:** `knowledgeExtractor` (multimodal)

---

### N. Email Sequence Builder

**Location:** `components/enablement/EmailSequenceBuilder.tsx`

**Purpose:** Drag-drop email automation builder

**Key Features:**
- Visual sequence editor
- Email template library with AI assist
- Personalization tokens
- Timing and trigger configuration
- A/B testing setup
- Analytics (open, click, reply rates)
- Gmail integration for sending

**Firestore Schema:**
```typescript
interface EmailSequence {
  id: string
  name: string
  tenant_id: string
  steps: Array<{
    order: number
    delay_days: number
    subject: string
    body: string
    personalization_tokens: string[]
  }>
  active: boolean
  stats: {
    sent: number
    opened: number
    clicked: number
    replied: number
  }
}
```

---

### O. Team Dashboard

**Location:** `components/enablement/TeamDashboard.tsx`

**Purpose:** Tenant-wide analytics for sales managers

**Metrics:**
- Active deals by team member
- Pipeline value and velocity
- Email sequence performance
- Knowledge base usage stats
- Training completion rates
- Team leaderboard (optional)

---

## Shared UI Components

### P. Progress Tracking Components

```typescript
// components/shared/CircularProgress.tsx
<CircularProgress value={75} max={100} />

// components/shared/LessonChecklist.tsx
<LessonChecklist lessons={courseLessons} completed={completedIds} />

// components/shared/TimeSpentTracker.tsx
<TimeSpentTracker startTime={sessionStart} />
```

---

### Q. Gamification Components

```typescript
// components/shared/PointsCounter.tsx
<PointsCounter current={2450} nextLevel={3000} />

// components/shared/BadgeShowcase.tsx
<BadgeShowcase badges={userBadges} />

// components/shared/LevelProgressBar.tsx
<LevelProgressBar level="Validated Founder" progress={60} />

// components/shared/MilestoneNotification.tsx
<MilestoneNotification 
  type="first_customer" 
  achieved={true} 
  points={500} 
/>
```

---

## Component Development Patterns

### 1. State Management with Zustand

```typescript
// stores/useFrameworkStore.ts
interface FrameworkToolStore {
  data: Record<string, any>
  aiInteractionId: string | null
  autoSaveEnabled: boolean
  lastSaved: Date | null
  
  // Actions
  updateField: (field: string, value: any) => void
  saveToFirestore: () => Promise<void>
  loadFromFirestore: (id: string) => Promise<void>
  toggleAutoSave: () => void
}

export const useFrameworkStore = create<FrameworkToolStore>()(
  persist(
    (set, get) => ({
      data: {},
      aiInteractionId: null,
      autoSaveEnabled: true,
      lastSaved: null,
      
      updateField: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
        })),
      
      saveToFirestore: async () => {
        const { data } = get()
        // Save logic
      },
      
      loadFromFirestore: async (id) => {
        // Load logic
      },
      
      toggleAutoSave: () =>
        set((state) => ({ autoSaveEnabled: !state.autoSaveEnabled })),
    }),
    {
      name: 'framework-tool-storage',
    }
  )
)
```

### 2. Firestore Integration Pattern

```typescript
// hooks/useFirestoreDocument.ts
export function useFirestoreDocument<T>(
  collectionName: string,
  documentId: string
) {
  return useQuery({
    queryKey: [collectionName, documentId],
    queryFn: async () => {
      const docRef = doc(db, collectionName, documentId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as T) : null
    },
  })
}

export function useUpdateFirestoreDocument<T>(collectionName: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updated_at: serverTimestamp(),
      })
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [collectionName, id] })
    },
  })
}
```

### 3. AI Coaching Integration Pattern

```typescript
// hooks/useAICoaching.ts
export function useAICoaching(flowName: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const { streamFlow } = useGenkitFlow()

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setIsStreaming(true)

    let aiResponse = ''
    await streamFlow(flowName, {
      message: content,
      conversationHistory: messages,
    }, (chunk) => {
      aiResponse += chunk
      setMessages(prev => {
        const copy = [...prev]
        const lastMsg = copy[copy.length - 1]
        if (lastMsg?.role === 'assistant') {
          lastMsg.content = aiResponse
        } else {
          copy.push({ role: 'assistant', content: aiResponse, timestamp: new Date() })
        }
        return copy
      })
    })

    setIsStreaming(false)
  }

  const resetConversation = () => {
    setMessages([])
  }

  return { messages, sendMessage, isStreaming, resetConversation }
}
```

---

## Responsive Design Patterns

### Mobile-First Breakpoints

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet portrait
      'lg': '1024px',  // Tablet landscape / small laptop
      'xl': '1280px',  // Desktop
      '2xl': '1536px', // Large desktop
    },
  },
}
```

### Responsive Grid Patterns

```typescript
// Business Model Canvas - Responsive
<div className="
  grid
  grid-cols-1           // Mobile: single column
  md:grid-cols-3        // Tablet: 3 columns
  lg:grid-cols-5        // Desktop: 5 columns (original layout)
  gap-4
">
  {blocks.map(block => <CanvasBlock {...block} />)}
</div>
```

### Touch-Optimized Interactions

```typescript
// Minimum touch target: 44x44px
<button className="min-h-[44px] min-w-[44px] p-3">
  Touch-friendly button
</button>

// Swipe gestures for mobile
import { useSwipeable } from 'react-swipeable'

const handlers = useSwipeable({
  onSwipedLeft: () => nextStep(),
  onSwipedRight: () => previousStep(),
})

<div {...handlers}>Swipeable content</div>
```

---

## Testing Specifications

### Component Unit Tests

```typescript
// __tests__/BusinessModelCanvas.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BusinessModelCanvas } from '@/components/founder/BusinessModelCanvas'

describe('BusinessModelCanvas', () => {
  it('renders all 9 blocks', () => {
    render(<BusinessModelCanvas />)
    expect(screen.getByText('Customer Segments')).toBeInTheDocument()
    expect(screen.getByText('Value Propositions')).toBeInTheDocument()
    // ... test all blocks
  })

  it('auto-saves after 30 seconds', async () => {
    jest.useFakeTimers()
    const { container } = render(<BusinessModelCanvas />)
    
    const textarea = screen.getAllByRole('textbox')[0]
    fireEvent.change(textarea, { target: { value: 'Test input' } })
    
    jest.advanceTimersByTime(30000)
    
    await waitFor(() => {
      expect(screen.getByText(/Saved/)).toBeInTheDocument()
    })
    
    jest.useRealTimers()
  })

  it('opens AI coaching sidebar on block focus', () => {
    render(<BusinessModelCanvas />)
    
    const block = screen.getAllByRole('textbox')[0]
    fireEvent.focus(block)
    
    expect(screen.getByText(/AI Coach/)).toBeInTheDocument()
  })
})
```

### AI Flow Integration Tests

```typescript
// __tests__/integrations/bmcCoach.test.ts
import { runFlow } from '@/lib/genkit/client'

describe('BMC Coach Flow', () => {
  it('provides coaching for customer segments block', async () => {
    const response = await runFlow('bmcCoach', {
      block_name: 'Customer Segments',
      user_input: 'Solo founders building SaaS products',
    })
    
    expect(response.coaching_response).toBeTruthy()
    expect(response.probing_questions).toHaveLength(3)
    expect(response.examples).toHaveLength(2)
  })
})
```

### Accessibility Audits

```typescript
// __tests__/accessibility/a11y.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('BusinessModelCanvas has no accessibility violations', async () => {
    const { container } = render(<BusinessModelCanvas />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Performance Benchmarks

```typescript
// __tests__/performance/load-time.test.tsx
describe('Performance', () => {
  it('BusinessModelCanvas renders in under 100ms', async () => {
    const startTime = performance.now()
    render(<BusinessModelCanvas />)
    const endTime = performance.now()
    
    expect(endTime - startTime).toBeLessThan(100)
  })
})
```

---

## User Acceptance Criteria

### Business Model Canvas
- [ ] All 9 blocks render correctly on desktop and mobile
- [ ] Typing in any block triggers auto-save after 30 seconds
- [ ] Focusing a block opens AI coaching sidebar
- [ ] AI provides relevant coaching within 3 seconds
- [ ] Export to PDF generates proper document
- [ ] Completion progress updates in real-time
- [ ] Mobile layout stacks blocks vertically
- [ ] No data loss on page refresh

### Unit Economics Calculator
- [ ] Metrics recalculate instantly on input change
- [ ] AI insights appear within 5 seconds of calculation
- [ ] Charts render correctly with scenario data
- [ ] All metric cards show proper status colors
- [ ] Export functionality works for financial models
- [ ] Mobile layout remains usable

### AI Role-Play Chat
- [ ] Streaming responses appear word-by-word
- [ ] Performance metrics update in real-time
- [ ] Talk time ratio calculation is accurate
- [ ] Session can be ended and saved anytime
- [ ] Performance dashboard shows historical data
- [ ] Mobile interface works for conversations

---

## Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Set up shared component library
- [ ] Implement auto-save hook
- [ ] Create AI coaching hook
- [ ] Build base layout templates
- [ ] Configure Firestore collections

### Phase 2: Founder Academy Tools (Weeks 2-3)
- [ ] Business Model Canvas Generator
- [ ] GTM Strategy Architect
- [ ] Unit Economics Calculator
- [ ] Customer Avatar Workshop
- [ ] Pitch Deck Analyzer

### Phase 3: Sales Training Tools (Weeks 4-5)
- [ ] AI Role-Play Chat Interface
- [ ] Performance Analytics Dashboard
- [ ] Pre-Call Coaching Brief
- [ ] Objection Handling Library

### Phase 4: Sales Enablement Tools (Weeks 6-7)
- [ ] Gmail CRM Interface
- [ ] Knowledge Extractor Dashboard
- [ ] Email Sequence Builder
- [ ] Team Dashboard

### Phase 5: Polish & Testing (Week 8)
- [ ] Responsive design review
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] User acceptance testing
- [ ] Documentation finalization

---

## Component Dependencies Map

```
BusinessModelCanvas
â”œâ”€â”€ requires: bmcCoach (Genkit flow)
â”œâ”€â”€ stores: frameworkBuilds (Firestore)
â””â”€â”€ exports: PDF (via jsPDF)

GTMStrategyArchitect
â”œâ”€â”€ requires: gtmAnalyzer (Genkit flow)
â”œâ”€â”€ stores: frameworkBuilds (Firestore)
â””â”€â”€ components: Multi-step wizard

UnitEconomicsCalculator
â”œâ”€â”€ requires: unitEconomicsAnalyzer (Genkit flow)
â”œâ”€â”€ charts: Recharts
â””â”€â”€ calculations: Real-time JS

AIRolePlayChat
â”œâ”€â”€ requires: salesRolePlay (Genkit flow, streaming)
â”œâ”€â”€ stores: rolePlaySessions (Firestore)
â””â”€â”€ performance: salesPerformanceAnalyzer

GmailCRMInterface
â”œâ”€â”€ requires: Gmail API integration
â”œâ”€â”€ stores: crmContacts, deals (Firestore)
â”œâ”€â”€ drag-drop: @dnd-kit/core
â””â”€â”€ enrichment: Third-party API
```

---

**Total Components:** 15 major interactive tools  
**Estimated Development Time:** 8 weeks (1 developer)  
**Lines of Code:** ~12,000 LOC  
**Dependencies:** See package.json in 01-TECHNICAL-ARCHITECTURE.md  

---

**Next Steps:**
1. Review component specifications with stakeholders
2. Prioritize components for MVP (suggest: Business Model Canvas, Unit Economics Calculator, AI Role-Play Chat)
3. Begin Phase 1: Foundation components
4. Iterate with user feedback

**Related Documentation:**
- @01-TECHNICAL-ARCHITECTURE.md - Tech stack details
- @03-DATABASE-SCHEMA.md - Firestore collections
- @05-AI-FLOWS-LIBRARY.md - Genkit prompt details
- @07-PEDAGOGICAL-PATTERNS.md - Teaching methodology