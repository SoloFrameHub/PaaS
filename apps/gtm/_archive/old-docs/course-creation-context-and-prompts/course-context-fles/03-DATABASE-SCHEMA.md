# 03-DATABASE-SCHEMA.md

**SoloFrameHub Platform - Complete Firestore Database Design**  
**Last Updated:** 2024-12-24  
**Status:** Production Ready  
**Database Type:** Google Cloud Firestore (Document Database)

---

## Overview

This document provides the complete database schema for the SoloFrameHub Platform, built on Google Cloud Firestore. The schema supports:

- **Multi-tenant isolation** with tenant-based data separation
- **Three integrated academies** (Sales, Startup, GTM)
- **AI coaching** with conversation history and context persistence
- **Gamification** with points, badges, levels, and milestones
- **Framework builders** with auto-save and version history
- **Security rules** enforcing access control at collection and document level

---

## Database Architecture

### Core Principles

1. **Document-Based Design**: Each entity is a document with subcollections for nested data
2. **Tenant Isolation**: All user data is scoped to tenants for multi-tenancy
3. **Composite Keys**: Use user_id + entity_id for efficient queries
4. **Denormalization**: Strategic duplication for read optimization
5. **Security-First**: Rules enforce access at collection/document level
6. **Cost Optimization**: Minimize reads through caching and denormalization

### Collection Overview

```
firestore/
├── users/                    # User profiles, subscriptions, gamification
├── tenants/                  # Organization/account data (future multi-tenant)
├── courses/                  # Course catalog with metadata
│   └── {courseId}/
│       └── lessons/          # Lesson content (subcollection)
├── courseProgress/           # User learning progress tracking
├── frameworkTools/           # User-created strategic frameworks
├── aiInteractions/           # AI coaching conversation history
├── businessMilestones/       # Verified business achievements
└── roleplaySessions/         # Sales practice session tracking
```

**Total Collections:** 8 top-level + 1 subcollection

---

## Collection Schemas

### 1. users Collection

**Purpose:** Store user profiles, subscription data, and gamification metrics

**Document ID:** Firebase Auth UID

**Schema:**

```typescript
interface User {
  // Identity
  user_id: string               // Document ID (Firebase Auth UID)
  email: string
  display_name: string
  avatar_url?: string
  
  // Subscription & Access
  tenant_id: string             // For future multi-tenant support
  subscription_tier: 'sales' | 'startup' | 'gtm' | 'bundle'
  subscription_status: 'trial' | 'active' | 'past_due' | 'canceled'
  stripe_customer_id?: string
  stripe_subscription_id?: string
  
  // Academy Access
  academies_access: {
    sales: boolean
    startup: boolean
    gtm: boolean
  }
  
  // Trial & Billing
  trial_ends_at?: Timestamp
  subscription_started_at?: Timestamp
  next_billing_date?: Timestamp
  
  // Gamification
  total_points: number
  current_level: number
  badges_earned: string[]       // Badge IDs
  achievements: {
    courses_completed: number
    frameworks_built: number
    milestones_verified: number
    ai_sessions_completed: number
  }
  
  // Progress Tracking
  current_courses: string[]     // Course IDs in progress
  completed_courses: string[]   // Course IDs completed
  bookmarked_lessons: string[]  // Lesson IDs
  
  // Preferences
  preferences: {
    email_notifications: boolean
    daily_digest: boolean
    timezone: string
    onboarding_completed: boolean
  }
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
  last_login_at: Timestamp
  login_count: number
}
```

**Security Rules:**

```javascript
match /users/{userId} {
  // Users can only read/write their own profile
  allow read: if request.auth != null && request.auth.uid == userId;
  allow create: if request.auth != null && request.auth.uid == userId;
  allow update: if request.auth != null && request.auth.uid == userId;
  allow delete: if false; // Prevent deletion
}

function isOwner(userId) {
  return request.auth != null && request.auth.uid == userId;
}

function hasAcademyAccess(userId, academy) {
  return get(/databases/$(database)/documents/users/$(userId)).data.academies_access[academy] == true;
}
```

**Indexes:**

```json
{
  "collectionGroup": "users",
  "fields": [
    { "fieldPath": "subscription_status", "order": "ASCENDING" },
    { "fieldPath": "created_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "users",
  "fields": [
    { "fieldPath": "subscription_tier", "order": "ASCENDING" },
    { "fieldPath": "total_points", "order": "DESCENDING" }
  ]
}
```

---

### 2. tenants Collection

**Purpose:** Organization/account data for future multi-tenant support (currently 1:1 with users)

**Document ID:** Auto-generated (maps to user_id)

**Schema:**

```typescript
interface Tenant {
  // Identity
  tenant_id: string             // Document ID
  owner_user_id: string         // Primary user
  organization_name: string
  
  // Subscription
  plan: 'sales' | 'startup' | 'gtm' | 'bundle'
  billing_email: string
  
  // Team (Future)
  team_members: string[]        // User IDs
  max_seats: number
  
  // Settings
  settings: {
    branding?: {
      logo_url?: string
      primary_color?: string
    }
  }
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
}
```

**Security Rules:**

```javascript
match /tenants/{tenantId} {
  allow read: if request.auth != null && 
                 request.auth.uid == resource.data.owner_user_id;
  allow write: if request.auth != null && 
                  request.auth.uid == resource.data.owner_user_id;
}
```

---

### 3. courses Collection

**Purpose:** Course catalog with metadata and structure

**Document ID:** Auto-generated

**Schema:**

```typescript
interface Course {
  // Identity
  course_id: string             // Document ID
  academy: 'sales' | 'startup' | 'gtm'
  
  // Content
  title: string
  slug: string                  // URL-friendly
  description: string
  learning_objectives: string[]
  
  // Structure
  lesson_count: number
  estimated_hours: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  
  // Ordering
  sequence_number: number       // Display order in academy
  track?: string                // e.g., "Visibility", "Pipeline", "Revenue"
  
  // Prerequisites
  required_courses: string[]    // Course IDs
  recommended_courses: string[]
  
  // Assets
  thumbnail_url?: string
  trailer_video_url?: string
  
  // Teaching Philosophy (70/20/10)
  content_distribution: {
    teaching_percentage: number  // Target 70%
    practice_percentage: number  // Target 20%
    engagement_percentage: number // Target 10%
  }
  
  // Gamification
  completion_points: number
  completion_badge?: string
  
  // Publishing
  status: 'draft' | 'review' | 'published' | 'archived'
  published_at?: Timestamp
  
  // Analytics
  enrollment_count: number
  completion_rate: number
  average_rating: number
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
  created_by: string            // Admin user ID
}
```

**Security Rules:**

```javascript
match /courses/{courseId} {
  // Anyone authenticated can read published courses
  allow read: if request.auth != null && 
                 resource.data.status == 'published';
  
  // Only admins can write
  allow write: if request.auth != null && 
                  get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

**Indexes:**

```json
{
  "collectionGroup": "courses",
  "fields": [
    { "fieldPath": "academy", "order": "ASCENDING" },
    { "fieldPath": "sequence_number", "order": "ASCENDING" }
  ]
},
{
  "collectionGroup": "courses",
  "fields": [
    { "fieldPath": "status", "order": "ASCENDING" },
    { "fieldPath": "published_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "courses",
  "fields": [
    { "fieldPath": "academy", "order": "ASCENDING" },
    { "fieldPath": "track", "order": "ASCENDING" },
    { "fieldPath": "sequence_number", "order": "ASCENDING" }
  ]
}
```

---

### 4. courses/{courseId}/lessons Subcollection

**Purpose:** Individual lesson content (subcollection of courses)

**Document ID:** Auto-generated

**Schema:**

```typescript
interface Lesson {
  // Identity
  lesson_id: string             // Document ID
  course_id: string             // Parent course
  
  // Content
  title: string
  slug: string
  description: string
  
  // Structure
  section_number: number        // Which section (1-6)
  lesson_number: number         // Order within course
  
  // Content Sections (6-part structure)
  sections: {
    introduction: {
      content: string           // Markdown
      duration_minutes: number
    }
    concept_explanation: {
      content: string
      duration_minutes: number
      key_concepts: string[]
    }
    methodology: {
      content: string
      duration_minutes: number
      frameworks_introduced: string[]
    }
    case_study: {
      content: string
      duration_minutes: number
      company?: string
      outcome?: string
    }
    practice_exercise: {
      content: string
      duration_minutes: number
      framework_builder?: string  // Tool to use
      deliverable?: string
    }
    summary: {
      content: string
      duration_minutes: number
      key_takeaways: string[]
      next_lesson_preview?: string
    }
  }
  
  // Teaching Mode
  primary_mode: 'explanation' | 'evidence' | 'practice' | 'interactive' | 'evaluation'
  
  // Interactive Elements
  framework_tools: string[]     // Tool IDs to unlock
  ai_coaching_prompts: Array<{
    trigger: string
    flow_type: string
    context: object
  }>
  
  // Assessment
  has_quiz: boolean
  quiz_questions?: Array<{
    question: string
    type: 'multiple_choice' | 'short_answer' | 'strategic_thinking'
    options?: string[]
    correct_answer?: string
    rubric?: object
  }>
  
  // Resources
  downloads: Array<{
    title: string
    url: string
    type: 'pdf' | 'template' | 'worksheet'
  }>
  external_links: Array<{
    title: string
    url: string
    description: string
  }>
  
  // Gamification
  completion_points: number
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
}
```

**Security Rules:**

```javascript
match /courses/{courseId}/lessons/{lessonId} {
  // Users with course access can read lessons
  allow read: if request.auth != null;
  
  // Only admins can write
  allow write: if request.auth != null && 
                  get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

---

### 5. courseProgress Collection

**Purpose:** Track user progress through courses and lessons

**Document ID:** Composite key: `{userId}_{courseId}`

**Schema:**

```typescript
interface CourseProgress {
  // Identity (composite key)
  progress_id: string           // Document ID: `${userId}_${courseId}`
  user_id: string
  course_id: string
  
  // Enrollment
  enrolled_at: Timestamp
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned'
  completed_at?: Timestamp
  
  // Progress Metrics
  lessons_completed: number
  total_lessons: number
  completion_percentage: number
  
  // Lesson Tracking
  lesson_progress: {
    [lessonId: string]: {
      status: 'locked' | 'available' | 'in_progress' | 'completed'
      started_at?: Timestamp
      completed_at?: Timestamp
      time_spent_minutes: number
      quiz_score?: number
      quiz_attempts: number
    }
  }
  
  // Section Tracking (for 6-part lesson structure)
  current_lesson_section: number  // 1-6
  
  // Frameworks Built
  frameworks_created: string[]   // Framework tool IDs
  
  // Time Tracking
  total_time_minutes: number
  last_accessed_at: Timestamp
  
  // Milestones
  milestones_achieved: Array<{
    milestone: string
    achieved_at: Timestamp
    points_awarded: number
  }>
  
  // Performance
  average_quiz_score: number
  strategic_thinking_score: number  // AI-evaluated
  
  // Next Up
  next_lesson_id?: string
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
}
```

**Security Rules:**

```javascript
match /courseProgress/{progressId} {
  // Users can only read/write their own progress
  allow read: if request.auth != null && 
                 resource.data.user_id == request.auth.uid;
  allow create: if request.auth != null && 
                   request.resource.data.user_id == request.auth.uid;
  allow update: if request.auth != null && 
                   resource.data.user_id == request.auth.uid;
}
```

**Indexes:**

```json
{
  "collectionGroup": "courseProgress",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "status", "order": "ASCENDING" },
    { "fieldPath": "last_accessed_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "courseProgress",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "completion_percentage", "order": "DESCENDING" }
  ]
}
```

---

### 6. frameworkTools Collection

**Purpose:** User-created strategic frameworks and tools

**Document ID:** Auto-generated

**Schema:**

```typescript
interface FrameworkTool {
  // Identity
  tool_id: string               // Document ID
  user_id: string
  tenant_id: string
  
  // Tool Type
  tool_type: 'bmc' | 'icp' | 'value_prop' | 'gtm_strategy' | 
             'unit_economics' | 'pitch_deck' | 'sales_playbook' | 
             'objection_library' | 'email_sequence' | 'custom'
  tool_name: string             // User-defined name
  
  // Context
  course_id?: string            // If created during a course
  lesson_id?: string
  academy: 'sales' | 'startup' | 'gtm'
  
  // Framework Data (varies by tool_type)
  data: object                  // Tool-specific schema
  
  // Versioning
  version: number
  version_history: Array<{
    version: number
    data: object
    saved_at: Timestamp
    notes?: string
  }>
  
  // AI Coaching
  ai_feedback: Array<{
    dimension: string           // e.g., "customer_segments"
    score: number               // 0-100
    feedback: string
    suggested_improvements: string[]
    timestamp: Timestamp
  }>
  last_ai_review_at?: Timestamp
  overall_quality_score?: number
  
  // Collaboration (Future)
  shared_with: string[]         // User IDs
  visibility: 'private' | 'team' | 'public'
  
  // Status
  status: 'draft' | 'in_progress' | 'completed' | 'archived'
  completion_percentage: number
  
  // Export
  last_exported_at?: Timestamp
  export_formats: ('pdf' | 'docx' | 'gdrive' | 'notion')[]
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
  last_auto_save: Timestamp
}
```

**Example Tool Data Structures:**

```typescript
// Business Model Canvas (tool_type: 'bmc')
interface BMCData {
  key_partners: string[]
  key_activities: string[]
  key_resources: string[]
  value_propositions: string[]
  customer_relationships: string[]
  channels: string[]
  customer_segments: string[]
  cost_structure: string[]
  revenue_streams: string[]
}

// Ideal Customer Profile (tool_type: 'icp')
interface ICPData {
  demographics: {
    company_size: string
    industry: string
    revenue_range: string
    geography: string
  }
  firmographics: {
    technology_stack: string[]
    buying_process: string
    decision_makers: string[]
  }
  psychographics: {
    pain_points: string[]
    goals: string[]
    triggers: string[]
  }
  behavioral: {
    current_solutions: string[]
    budget_range: string
    urgency: 'low' | 'medium' | 'high'
  }
}

// Sales Playbook (tool_type: 'sales_playbook')
interface SalesPlaybookData {
  discovery_questions: Array<{
    category: string
    question: string
    why_ask: string
    ideal_answer: string
  }>
  value_propositions: Array<{
    persona: string
    pain_point: string
    value_prop: string
    proof_points: string[]
  }>
  objection_responses: Array<{
    objection: string
    response_framework: string
    examples: string[]
  }>
  qualification_criteria: {
    must_have: string[]
    nice_to_have: string[]
    disqualifiers: string[]
  }
}
```

**Security Rules:**

```javascript
match /frameworkTools/{toolId} {
  // Users can read/write their own tools
  allow read: if request.auth != null && 
                 resource.data.user_id == request.auth.uid;
  allow create: if request.auth != null && 
                   request.resource.data.user_id == request.auth.uid;
  allow update: if request.auth != null && 
                   resource.data.user_id == request.auth.uid;
  allow delete: if request.auth != null && 
                   resource.data.user_id == request.auth.uid;
}
```

**Indexes:**

```json
{
  "collectionGroup": "frameworkTools",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "tool_type", "order": "ASCENDING" },
    { "fieldPath": "updated_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "frameworkTools",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "academy", "order": "ASCENDING" },
    { "fieldPath": "status", "order": "ASCENDING" }
  ]
}
```

---

### 7. aiInteractions Collection

**Purpose:** Persist AI coaching conversations for context and analytics

**Document ID:** Auto-generated

**Schema:**

```typescript
interface AIInteraction {
  // Identity
  interaction_id: string        // Document ID
  user_id: string
  tenant_id: string
  
  // Session Info
  session_id: string            // Groups related interactions
  session_type: 'coaching' | 'roleplay' | 'analysis' | 'evaluation'
  
  // Conversation Context
  flow_type: 'strategic_advisor' | 'sales_roleplay' | 
             'document_analysis' | 'daily_coaching' | 
             'framework_builder' | 'pitch_critique'
  
  // Related Entities
  course_id?: string
  lesson_id?: string
  framework_tool_id?: string
  
  // AI Configuration
  model: string                 // e.g., "gemini-2.0-flash-exp"
  temperature: number
  
  // Conversation Data
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Timestamp
    token_count?: number
  }>
  
  // Roleplay Context (if applicable)
  roleplay_config?: {
    scenario: string
    buyer_persona: string
    disc_personality: 'D' | 'I' | 'S' | 'C'
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  }
  
  // Evaluation Metrics
  evaluation_scores?: {
    specificity: number          // 0-100
    evidence_based: number
    strategic_depth: number
    creativity: number
    overall: number
  }
  
  // Performance (for roleplay)
  performance_metrics?: {
    talk_time_ratio: number      // User vs AI talk time
    discovery_questions_asked: number
    objections_handled: number
    next_steps_secured: boolean
  }
  
  // Usage Tracking
  total_tokens: number
  prompt_tokens: number
  completion_tokens: number
  cost_usd: number              // Estimated cost
  
  // Session Duration
  session_duration_seconds: number
  turns: number                 // Message exchanges
  
  // Outcomes
  artifacts_generated: string[] // URLs to generated content
  insights_captured: string[]   // Key learnings
  action_items: string[]
  
  // Status
  status: 'active' | 'completed' | 'abandoned'
  
  // Metadata
  started_at: Timestamp
  completed_at?: Timestamp
  created_at: Timestamp
  updated_at: Timestamp
}
```

**Security Rules:**

```javascript
match /aiInteractions/{interactionId} {
  // Users can read their own interactions
  allow read: if request.auth != null && 
                 resource.data.user_id == request.auth.uid;
  
  // Users can create interactions
  allow create: if request.auth != null && 
                   request.resource.data.user_id == request.auth.uid;
  
  // Users can update their own interactions
  allow update: if request.auth != null && 
                   resource.data.user_id == request.auth.uid;
  
  // No deletion (for analytics)
  allow delete: if false;
}
```

**Indexes:**

```json
{
  "collectionGroup": "aiInteractions",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "started_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "aiInteractions",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "flow_type", "order": "ASCENDING" },
    { "fieldPath": "started_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "aiInteractions",
  "fields": [
    { "fieldPath": "session_id", "order": "ASCENDING" },
    { "fieldPath": "started_at", "order": "ASCENDING" }
  ]
}
```

---

### 8. businessMilestones Collection

**Purpose:** Track and verify real business achievements

**Document ID:** Auto-generated

**Schema:**

```typescript
interface BusinessMilestone {
  // Identity
  milestone_id: string          // Document ID
  user_id: string
  tenant_id: string
  
  // Milestone Type
  category: 'revenue' | 'customers' | 'product' | 'team' | 'funding' | 'validation'
  type: string                  // Specific milestone
  
  // Achievement Details
  title: string                 // e.g., "First $1K MRR"
  description: string
  value?: number                // Numeric value
  unit?: string                 // e.g., "USD", "customers"
  
  // Verification
  verified: boolean
  verification_method: 'self_reported' | 'screenshot' | 'integration' | 'admin_approved'
  evidence_urls: string[]       // Screenshot URLs, dashboard links
  verified_by?: string          // Admin user ID
  verified_at?: Timestamp
  
  // Gamification
  points_awarded: number
  badge_unlocked?: string
  
  // Context
  business_stage: string
  time_to_achievement_days?: number
  related_courses: string[]     // Courses that helped
  
  // Celebration
  shared_publicly: boolean
  social_proof_url?: string
  
  // Metadata
  achieved_at: Timestamp
  created_at: Timestamp
  updated_at: Timestamp
}
```

**Predefined Milestone Types:**

```typescript
const MILESTONE_DEFINITIONS = {
  // Revenue Milestones
  'first_dollar': { points: 100, badge: 'first_revenue' },
  'first_1k_mrr': { points: 500, badge: 'revenue_pioneer' },
  'first_10k_mrr': { points: 2000, badge: 'revenue_master' },
  'first_100k_mrr': { points: 10000, badge: 'revenue_legend' },
  'profitability': { points: 5000, badge: 'profitable' },
  
  // Customer Milestones
  'first_customer': { points: 200, badge: 'customer_zero' },
  'ten_customers': { points: 500, badge: 'traction' },
  'hundred_customers': { points: 2000, badge: 'scaling' },
  'thousand_customers': { points: 10000, badge: 'market_fit' },
  
  // Product Milestones
  'mvp_launched': { points: 1000, badge: 'builder' },
  'beta_complete': { points: 500, badge: 'validator' },
  'v1_launched': { points: 2000, badge: 'launcher' },
  
  // Validation Milestones
  'first_sale_call': { points: 100, badge: 'seller' },
  'ten_discovery_calls': { points: 300, badge: 'discoverer' },
  'pilot_customer': { points: 500, badge: 'pilot_runner' },
  'case_study_published': { points: 1000, badge: 'storyteller' }
}
```

**Security Rules:**

```javascript
match /businessMilestones/{milestoneId} {
  // Users can read their own milestones
  allow read: if request.auth != null && 
                 resource.data.user_id == request.auth.uid;
  
  // Users can create milestones
  allow create: if request.auth != null && 
                   request.resource.data.user_id == request.auth.uid;
  
  // Users can update unverified milestones
  allow update: if request.auth != null && 
                   resource.data.user_id == request.auth.uid &&
                   resource.data.verified == false;
  
  // Only admins can verify
  allow update: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

**Indexes:**

```json
{
  "collectionGroup": "businessMilestones",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "achieved_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "businessMilestones",
  "fields": [
    { "fieldPath": "category", "order": "ASCENDING" },
    { "fieldPath": "verified", "order": "ASCENDING" },
    { "fieldPath": "achieved_at", "order": "DESCENDING" }
  ]
}
```

---

### 9. roleplaySessions Collection

**Purpose:** Track sales roleplay practice sessions

**Document ID:** Auto-generated

**Schema:**

```typescript
interface RoleplaySession {
  // Identity
  session_id: string            // Document ID
  user_id: string
  tenant_id: string
  
  // Session Configuration
  scenario_type: 'discovery' | 'demo' | 'objection_handling' | 'closing' | 'negotiation'
  buyer_persona: string
  disc_personality: 'D' | 'I' | 'S' | 'C'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  
  // Scenario Details
  scenario: {
    title: string
    description: string
    buyer_context: string
    win_criteria: string[]
  }
  
  // Performance Metrics
  performance: {
    // Talk Time
    user_talk_time_seconds: number
    ai_talk_time_seconds: number
    talk_time_ratio: number       // Ideal: 30/70 (user/buyer)
    
    // Questions
    discovery_questions_asked: number
    open_ended_questions: number
    closed_questions: number
    
    // Objections
    objections_encountered: number
    objections_handled_well: number
    
    // Outcomes
    next_steps_secured: boolean
    meeting_scheduled: boolean
    demo_requested: boolean
    
    // Scores (0-100)
    rapport_building: number
    active_listening: number
    value_articulation: number
    objection_handling: number
    closing_effectiveness: number
    overall_score: number
  }
  
  // AI Evaluation
  ai_feedback: {
    strengths: string[]
    areas_for_improvement: string[]
    specific_examples: Array<{
      timestamp: number
      what_happened: string
      why_it_matters: string
      how_to_improve: string
    }>
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
  }
  
  // Conversation Reference
  interaction_id: string        // Links to aiInteractions
  
  // Session Metadata
  duration_seconds: number
  turns: number
  started_at: Timestamp
  completed_at?: Timestamp
  status: 'in_progress' | 'completed' | 'abandoned'
  
  // Learning
  key_learnings: string[]
  action_items: string[]
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
}
```

**Security Rules:**

```javascript
match /roleplaySessions/{sessionId} {
  // Users can read/write their own sessions
  allow read: if request.auth != null && 
                 resource.data.user_id == request.auth.uid;
  allow create: if request.auth != null && 
                   request.resource.data.user_id == request.auth.uid;
  allow update: if request.auth != null && 
                   resource.data.user_id == request.auth.uid;
}
```

**Indexes:**

```json
{
  "collectionGroup": "roleplaySessions",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "started_at", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "roleplaySessions",
  "fields": [
    { "fieldPath": "user_id", "order": "ASCENDING" },
    { "fieldPath": "scenario_type", "order": "ASCENDING" },
    { "fieldPath": "performance.overall_score", "order": "DESCENDING" }
  ]
}
```

---

## Common Query Patterns

### TypeScript Query Examples

```typescript
import { 
  collection, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

// 1. Get user's in-progress courses
async function getInProgressCourses(userId: string) {
  const q = query(
    collection(db, 'courseProgress'),
    where('user_id', '==', userId),
    where('status', '==', 'in_progress'),
    orderBy('last_accessed_at', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 2. Get course with lessons
async function getCourseWithLessons(courseId: string) {
  const courseDoc = await getDoc(doc(db, 'courses', courseId));
  const lessonsQuery = query(
    collection(db, 'courses', courseId, 'lessons'),
    orderBy('lesson_number', 'asc')
  );
  
  const lessonsSnapshot = await getDocs(lessonsQuery);
  
  return {
    ...courseDoc.data(),
    lessons: lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
}

// 3. Update lesson progress
async function updateLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean
) {
  const progressId = `${userId}_${courseId}`;
  const progressRef = doc(db, 'courseProgress', progressId);
  
  await updateDoc(progressRef, {
    [`lesson_progress.${lessonId}.status`]: completed ? 'completed' : 'in_progress',
    [`lesson_progress.${lessonId}.completed_at`]: completed ? serverTimestamp() : null,
    updated_at: serverTimestamp()
  });
}

// 4. Save framework tool with auto-save
async function saveFrameworkTool(
  userId: string,
  tenantId: string,
  toolType: string,
  data: object
) {
  const toolRef = doc(collection(db, 'frameworkTools'));
  
  await setDoc(toolRef, {
    user_id: userId,
    tenant_id: tenantId,
    tool_type: toolType,
    data: data,
    version: 1,
    status: 'draft',
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    last_auto_save: serverTimestamp()
  });
  
  return toolRef.id;
}

// 5. Get recent AI conversations
async function getRecentAIConversations(userId: string, limitCount: number = 10) {
  const q = query(
    collection(db, 'aiInteractions'),
    where('user_id', '==', userId),
    orderBy('started_at', 'desc'),
    limit(limitCount)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 6. Get user's verified milestones
async function getVerifiedMilestones(userId: string) {
  const q = query(
    collection(db, 'businessMilestones'),
    where('user_id', '==', userId),
    where('verified', '==', true),
    orderBy('achieved_at', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 7. Get user's framework tools by academy
async function getFrameworksByAcademy(userId: string, academy: string) {
  const q = query(
    collection(db, 'frameworkTools'),
    where('user_id', '==', userId),
    where('academy', '==', academy),
    orderBy('updated_at', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 8. Get roleplay sessions by scenario type
async function getRoleplaysByScenario(
  userId: string,
  scenarioType: string
) {
  const q = query(
    collection(db, 'roleplaySessions'),
    where('user_id', '==', userId),
    where('scenario_type', '==', scenarioType),
    orderBy('started_at', 'desc'),
    limit(20)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

---

## Security Rules Reference

### Complete firestore.rules File

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper Functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function hasAcademyAccess(userId, academy) {
      return get(/databases/$(database)/documents/users/$(userId)).data.academies_access[academy] == true;
    }
    
    // Users Collection
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false;
    }
    
    // Tenants Collection
    match /tenants/{tenantId} {
      allow read: if isAuthenticated() && 
                     resource.data.owner_user_id == request.auth.uid;
      allow write: if isAuthenticated() && 
                      resource.data.owner_user_id == request.auth.uid;
    }
    
    // Courses Collection
    match /courses/{courseId} {
      allow read: if isAuthenticated() && resource.data.status == 'published';
      allow write: if isAdmin();
      
      // Lessons Subcollection
      match /lessons/{lessonId} {
        allow read: if isAuthenticated();
        allow write: if isAdmin();
      }
    }
    
    // Course Progress Collection
    match /courseProgress/{progressId} {
      allow read: if isAuthenticated() && 
                     resource.data.user_id == request.auth.uid;
      allow create: if isAuthenticated() && 
                       request.resource.data.user_id == request.auth.uid;
      allow update: if isAuthenticated() && 
                       resource.data.user_id == request.auth.uid;
    }
    
    // Framework Tools Collection
    match /frameworkTools/{toolId} {
      allow read, write: if isAuthenticated() && 
                            resource.data.user_id == request.auth.uid;
    }
    
    // AI Interactions Collection
    match /aiInteractions/{interactionId} {
      allow read: if isAuthenticated() && 
                     resource.data.user_id == request.auth.uid;
      allow create: if isAuthenticated() && 
                       request.resource.data.user_id == request.auth.uid;
      allow update: if isAuthenticated() && 
                       resource.data.user_id == request.auth.uid;
      allow delete: if false; // Immutable for analytics
    }
    
    // Business Milestones Collection
    match /businessMilestones/{milestoneId} {
      allow read: if isAuthenticated() && 
                     resource.data.user_id == request.auth.uid;
      allow create: if isAuthenticated() && 
                       request.resource.data.user_id == request.auth.uid;
      allow update: if isAuthenticated() && 
                       (resource.data.user_id == request.auth.uid && 
                        resource.data.verified == false) || 
                       isAdmin();
    }
    
    // Roleplay Sessions Collection
    match /roleplaySessions/{sessionId} {
      allow read, write: if isAuthenticated() && 
                            resource.data.user_id == request.auth.uid;
    }
  }
}
```

---

## Composite Indexes (firestore.indexes.json)

```json
{
  "indexes": [
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "subscription_status", "order": "ASCENDING" },
        { "fieldPath": "created_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "subscription_tier", "order": "ASCENDING" },
        { "fieldPath": "total_points", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "courses",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "academy", "order": "ASCENDING" },
        { "fieldPath": "sequence_number", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "courses",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "published_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "courses",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "academy", "order": "ASCENDING" },
        { "fieldPath": "track", "order": "ASCENDING" },
        { "fieldPath": "sequence_number", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "courseProgress",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "last_accessed_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "courseProgress",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "completion_percentage", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "frameworkTools",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "tool_type", "order": "ASCENDING" },
        { "fieldPath": "updated_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "frameworkTools",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "academy", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "aiInteractions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "started_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "aiInteractions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "flow_type", "order": "ASCENDING" },
        { "fieldPath": "started_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "aiInteractions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "session_id", "order": "ASCENDING" },
        { "fieldPath": "started_at", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "businessMilestones",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "achieved_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "businessMilestones",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "category", "order": "ASCENDING" },
        { "fieldPath": "verified", "order": "ASCENDING" },
        { "fieldPath": "achieved_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "roleplaySessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "started_at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "roleplaySessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "user_id", "order": "ASCENDING" },
        { "fieldPath": "scenario_type", "order": "ASCENDING" },
        { "fieldPath": "performance.overall_score", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

---

## Deployment Scripts

### Deploy Security Rules & Indexes

```bash
# Deploy security rules
firebase deploy --only firestore:rules

# Deploy indexes
firebase deploy --only firestore:indexes

# Deploy both
firebase deploy --only firestore
```

### Seed Development Data

```typescript
// scripts/seed-database.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  // 1. Create test user
  const testUserId = 'test-user-123';
  await setDoc(doc(db, 'users', testUserId), {
    user_id: testUserId,
    email: 'test@soloframehub.com',
    display_name: 'Test Founder',
    tenant_id: 'tenant-1',
    subscription_tier: 'bundle',
    subscription_status: 'active',
    academies_access: {
      sales: true,
      startup: true,
      gtm: true
    },
    total_points: 1500,
    current_level: 5,
    badges_earned: ['first_revenue', 'customer_zero'],
    achievements: {
      courses_completed: 3,
      frameworks_built: 8,
      milestones_verified: 2,
      ai_sessions_completed: 25
    },
    current_courses: [],
    completed_courses: [],
    bookmarked_lessons: [],
    preferences: {
      email_notifications: true,
      daily_digest: true,
      timezone: 'America/Los_Angeles',
      onboarding_completed: true
    },
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    last_login_at: serverTimestamp(),
    login_count: 42
  });
  
  console.log('✅ Created test user');
  
  // 2. Create sample course
  const courseId = 'sales-course-1';
  await setDoc(doc(db, 'courses', courseId), {
    course_id: courseId,
    academy: 'sales',
    title: 'Foundation of B2B Sales',
    slug: 'foundation-b2b-sales',
    description: 'Master the fundamentals of selling to businesses',
    learning_objectives: [
      'Understand buyer psychology',
      'Build effective sales processes',
      'Handle objections confidently'
    ],
    lesson_count: 12,
    estimated_hours: 8,
    difficulty: 'beginner',
    sequence_number: 1,
    track: 'Visibility',
    required_courses: [],
    recommended_courses: [],
    content_distribution: {
      teaching_percentage: 70,
      practice_percentage: 20,
      engagement_percentage: 10
    },
    completion_points: 500,
    completion_badge: 'sales_foundation',
    status: 'published',
    published_at: serverTimestamp(),
    enrollment_count: 127,
    completion_rate: 0.42,
    average_rating: 4.7,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    created_by: 'admin'
  });
  
  console.log('✅ Created sample course');
  
  // 3. Create sample lesson
  const lessonId = 'lesson-1';
  await setDoc(doc(db, 'courses', courseId, 'lessons', lessonId), {
    lesson_id: lessonId,
    course_id: courseId,
    title: 'Understanding Buyer Psychology',
    slug: 'understanding-buyer-psychology',
    description: 'Learn what drives buying decisions',
    section_number: 1,
    lesson_number: 1,
    sections: {
      introduction: {
        content: '# Introduction\n\nWelcome to your first lesson...',
        duration_minutes: 5
      },
      concept_explanation: {
        content: '# Buyer Psychology Fundamentals\n\nBuyers make decisions...',
        duration_minutes: 15,
        key_concepts: ['Loss aversion', 'Status quo bias', 'Social proof']
      },
      methodology: {
        content: '# The TRUST Framework\n\nTo leverage psychology...',
        duration_minutes: 20,
        frameworks_introduced: ['TRUST Framework']
      },
      case_study: {
        content: '# Case Study: Salesforce\n\nHow Salesforce used...',
        duration_minutes: 15,
        company: 'Salesforce',
        outcome: 'Increased conversion by 40%'
      },
      practice_exercise: {
        content: '# Build Your ICP\n\nUsing the framework...',
        duration_minutes: 25,
        framework_builder: 'icp',
        deliverable: 'Completed ICP document'
      },
      summary: {
        content: '# Summary\n\nYou learned...',
        duration_minutes: 5,
        key_takeaways: [
          'Buyers seek to minimize risk',
          'Social proof accelerates decisions',
          'TRUST framework guides conversations'
        ],
        next_lesson_preview: 'Next: Qualifying prospects effectively'
      }
    },
    primary_mode: 'explanation',
    framework_tools: ['icp'],
    ai_coaching_prompts: [],
    has_quiz: true,
    completion_points: 50,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp()
  });
  
  console.log('✅ Created sample lesson');
  
  // 4. Create sample framework tool
  const toolId = 'tool-bmc-1';
  await setDoc(doc(db, 'frameworkTools', toolId), {
    tool_id: toolId,
    user_id: testUserId,
    tenant_id: 'tenant-1',
    tool_type: 'bmc',
    tool_name: 'My SaaS Business Model',
    academy: 'startup',
    data: {
      key_partners: ['AWS', 'Stripe', 'SendGrid'],
      key_activities: ['Product development', 'Customer support', 'Marketing'],
      key_resources: ['Engineering team', 'Customer data', 'Brand'],
      value_propositions: ['Save 10 hours/week', 'Increase revenue 25%'],
      customer_relationships: ['Self-service', 'Email support', 'Community'],
      channels: ['Website', 'SEO', 'LinkedIn'],
      customer_segments: ['B2B SaaS founders', 'Solo entrepreneurs'],
      cost_structure: ['Infrastructure ($500/mo)', 'Tools ($300/mo)'],
      revenue_streams: ['Monthly subscriptions ($49-129)']
    },
    version: 3,
    version_history: [],
    ai_feedback: [],
    shared_with: [],
    visibility: 'private',
    status: 'in_progress',
    completion_percentage: 85,
    export_formats: ['pdf'],
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    last_auto_save: serverTimestamp()
  });
  
  console.log('✅ Created sample framework tool');
  
  // 5. Create sample milestone
  const milestoneId = 'milestone-1';
  await setDoc(doc(db, 'businessMilestones', milestoneId), {
    milestone_id: milestoneId,
    user_id: testUserId,
    tenant_id: 'tenant-1',
    category: 'revenue',
    type: 'first_1k_mrr',
    title: 'First $1K MRR',
    description: 'Achieved first $1,000 in monthly recurring revenue',
    value: 1000,
    unit: 'USD',
    verified: true,
    verification_method: 'screenshot',
    evidence_urls: ['https://example.com/stripe-screenshot.png'],
    verified_by: 'admin',
    verified_at: serverTimestamp(),
    points_awarded: 500,
    badge_unlocked: 'revenue_pioneer',
    business_stage: 'early_traction',
    time_to_achievement_days: 90,
    related_courses: [courseId],
    shared_publicly: true,
    achieved_at: serverTimestamp(),
    created_at: serverTimestamp(),
    updated_at: serverTimestamp()
  });
  
  console.log('✅ Created sample milestone');
  
  console.log('🎉 Database seeded successfully!');
}

seedDatabase().catch(console.error);
```

Run with:
```bash
npm run seed-db
# or
ts-node scripts/seed-database.ts
```

---

## Migration Patterns

### Adding New Fields to Existing Documents

```typescript
// Migration script for adding new fields
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

async function migrateUsers() {
  const snapshot = await getDocs(collection(db, 'users'));
  
  for (const userDoc of snapshot.docs) {
    await updateDoc(doc(db, 'users', userDoc.id), {
      // Add new field with default value
      'preferences.onboarding_completed': false,
      'academies_access.gtm': false // New academy
    });
  }
  
  console.log(`Migrated ${snapshot.size} users`);
}
```

### Data Structure Changes

```typescript
// Migrate courseProgress to new structure
async function migrateCourseProgress() {
  const snapshot = await getDocs(collection(db, 'courseProgress'));
  
  for (const progressDoc of snapshot.docs) {
    const data = progressDoc.data();
    
    // Convert old structure to new
    const newLessonProgress: any = {};
    
    if (data.lessons_completed_ids) {
      data.lessons_completed_ids.forEach((lessonId: string) => {
        newLessonProgress[lessonId] = {
          status: 'completed',
          completed_at: data.updated_at,
          time_spent_minutes: 0,
          quiz_attempts: 0
        };
      });
    }
    
    await updateDoc(doc(db, 'courseProgress', progressDoc.id), {
      lesson_progress: newLessonProgress
    });
  }
  
  console.log(`Migrated ${snapshot.size} progress records`);
}
```

---

## Cost Analysis

### Firestore Pricing (as of 2024)

**Free Tier (Spark Plan):**
- 1 GB storage
- 50,000 document reads/day
- 20,000 document writes/day
- 20,000 document deletes/day

**Paid Tier (Blaze Plan):**
- Storage: $0.18/GB/month
- Document reads: $0.06 per 100,000
- Document writes: $0.18 per 100,000
- Document deletes: $0.02 per 100,000

### Estimated Costs at Scale

**Scenario: 1,000 active users**

Assumptions:
- Each user creates 5 framework tools/month (5,000 writes)
- Each user completes 10 lessons/month (10,000 progress writes)
- Each user has 20 AI sessions/month (20,000 interaction writes)
- Average 100 reads per user/day (3M reads/month)

Monthly costs:
- Writes: (35,000 writes ÷ 100,000) × $0.18 = $0.06
- Reads: (3,000,000 reads ÷ 100,000) × $0.06 = $1.80
- Storage: ~5 GB × $0.18 = $0.90
- **Total: ~$2.76/month**

**Scenario: 10,000 active users**
- Writes: $0.63
- Reads: $18.00
- Storage: ~50 GB × $0.18 = $9.00
- **Total: ~$27.63/month**

**Cost per user: $0.00276** 🎉

---

## Backup & Recovery

### Automated Backups

```bash
# Export entire database
gcloud firestore export gs://soloframehub-backups/$(date +%Y%m%d)

# Export specific collection
gcloud firestore export gs://soloframehub-backups/users-$(date +%Y%m%d) \
  --collection-ids=users

# Schedule daily backups (Cloud Scheduler)
gcloud scheduler jobs create http firestore-backup \
  --schedule="0 2 * * *" \
  --uri="https://firestore.googleapis.com/v1/projects/soloframehub/databases/(default):exportDocuments" \
  --message-body='{"outputUriPrefix":"gs://soloframehub-backups/scheduled"}'
```

### Restore from Backup

```bash
# Import from backup
gcloud firestore import gs://soloframehub-backups/20241224
```

---

## Performance Optimization

### Read Optimization Strategies

1. **Denormalize frequently accessed data**
   - Store user's current course titles in `courseProgress`
   - Cache lesson count in `courses` document

2. **Use composite queries instead of multiple queries**
   - Create indexes for common query patterns
   - Fetch related data in single query when possible

3. **Implement pagination**
   - Use `startAfter()` for efficient pagination
   - Limit results to 20-50 per page

4. **Cache on client side**
   - Use TanStack Query with stale-while-revalidate
   - Cache course catalog for 1 hour
   - Cache user profile for 5 minutes

### Write Optimization Strategies

1. **Batch writes when possible**
   ```typescript
   const batch = writeBatch(db);
   batch.set(doc1Ref, data1);
   batch.update(doc2Ref, data2);
   await batch.commit(); // Single write operation
   ```

2. **Use transactions for atomic updates**
   ```typescript
   await runTransaction(db, async (transaction) => {
     const userRef = doc(db, 'users', userId);
     const user = await transaction.get(userRef);
     transaction.update(userRef, {
       total_points: user.data().total_points + points
     });
   });
   ```

3. **Implement auto-save debouncing**
   - Save framework tools every 30 seconds (not on every keystroke)
   - Use Zustand middleware for auto-save

---

## Monitoring & Analytics

### Key Metrics to Track

```typescript
// Track database operations
async function trackDatabaseMetrics() {
  // Monitor in Cloud Console:
  // - Document read/write/delete counts
  // - Storage usage
  // - Index usage
  // - Query performance
  // - Error rates
}
```

### Common Issues & Debugging

**Issue: "Missing or insufficient permissions"**
- Check security rules match expected user role
- Verify user is authenticated
- Ensure user has academy access

**Issue: "Query requires an index"**
- Deploy indexes from `firestore.indexes.json`
- Check Cloud Console for index build status

**Issue: "Document doesn't exist"**
- Verify document ID is correct
- Check if data was created successfully
- Use `.get()` and check `.exists` before accessing data

---

## Next Steps

1. **Deploy Security Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Deploy Indexes**
   ```bash
   firebase deploy --only firestore:indexes
   ```

3. **Seed Development Data**
   ```bash
   npm run seed-db
   ```

4. **Test Queries**
   - Use Firebase Console to test queries
   - Verify security rules work as expected
   - Monitor performance metrics

5. **Set Up Backups**
   - Configure automated daily backups
   - Test restore process

---

## Reference Links

- **Firestore Documentation**: https://firebase.google.com/docs/firestore
- **Security Rules Guide**: https://firebase.google.com/docs/firestore/security/get-started
- **Data Modeling Best Practices**: https://firebase.google.com/docs/firestore/manage-data/structure-data
- **Query Performance**: https://firebase.google.com/docs/firestore/query-data/queries

---

**END OF DATABASE SCHEMA DOCUMENTATION**