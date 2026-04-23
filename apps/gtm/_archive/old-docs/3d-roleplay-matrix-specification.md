# 3D Roleplay Matrix Specification
## Multi-Dimensional Persona System for Customer Acquisition Academy

**Version:** 1.0  
**Purpose:** Enable Antigravity to implement realistic, context-aware AI roleplay  
**Compatible With:** Existing Genkit/Firebase architecture in 05-AI-FLOWS-LIBRARY.md

---

## Executive Summary

The 3D Roleplay Matrix creates hyper-realistic sales practice by combining three dimensions:

```
[Founder Category] × [Industry Context] × [Client Role + DISC]
        ↓                    ↓                    ↓
   Personalizes         Contextualizes      Creates realistic
   AI coaching &        objections,         buyer behavior &
   recommendations      terminology,        communication style
                        pain points
```

**Example Combination:**
> A "Technical Purist" founder (Dimension 1) practicing a discovery call with a "High-C Director of Engineering" (Dimension 3) at a "FinTech Startup" (Dimension 2) receives:
> - Compliance and security objections (industry-specific)
> - Data-heavy, analytical communication (DISC-specific)
> - Coaching that acknowledges their tendency to over-explain technical details (founder-specific)

---

## Part 1: Schema Specification

### 1.1 Founder Categories Schema

**Collection:** `founderCategories`  
**Purpose:** Personalize coaching, recommendations, and difficulty calibration

```typescript
interface FounderCategory {
  // Identity
  category_id: string           // e.g., "technical_purist"
  display_name: string          // e.g., "The Technical Purist"
  short_description: string     // One-line summary
  
  // Psychology Profile
  background: string            // Professional context
  primary_pain: string          // Core struggle
  core_belief: string           // Mental model that may limit them
  fear: string                  // What they're avoiding
  
  // Behavioral Patterns
  objection_patterns: string[]  // What messaging they resist
  decision_criteria: string[]   // What would make them say yes
  communication_style: {
    preferred_depth: 'surface' | 'moderate' | 'deep'
    preferred_pace: 'fast' | 'moderate' | 'slow'
    preferred_proof: 'testimonials' | 'data' | 'logic' | 'authority'
  }
  
  // Coaching Adaptations
  coaching_tone: string         // How AI should address them
  avoid_phrases: string[]       // Triggers that cause resistance
  motivating_phrases: string[]  // Language that resonates
  
  // Roleplay Calibration
  default_difficulty: 'beginner' | 'intermediate' | 'advanced'
  natural_disc_affinity: ('D' | 'I' | 'S' | 'C')[]  // Which DISC types they naturally connect with
  struggle_disc_types: ('D' | 'I' | 'S' | 'C')[]    // Which DISC types challenge them
  
  // Platform Integration
  recommended_courses: string[] // Course IDs to prioritize
  milestone_triggers: string[]  // Achievements that indicate growth
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
}
```

### 1.2 Industries Schema

**Collection:** `industries`  
**Purpose:** Contextualize objections, terminology, and pain points

```typescript
interface Industry {
  // Identity
  industry_id: string           // e.g., "fintech_startup"
  display_name: string          // e.g., "FinTech / Financial Services"
  parent_category: string       // e.g., "technology" | "professional_services" | "commerce"
  
  // Industry Context
  description: string           // Brief overview
  typical_company_sizes: ('1-10' | '11-50' | '51-200' | '201-500' | '500+')[]
  typical_deal_sizes: ('transactional' | 'smb' | 'mid_market' | 'enterprise')[]
  sales_cycle_length: 'days' | 'weeks' | 'months' | 'quarters'
  
  // Pain Points & Priorities
  common_pain_points: string[]  // Industry-specific problems
  buying_triggers: string[]     // What causes them to look for solutions
  budget_cycle: string          // When they make purchasing decisions
  
  // Regulatory & Compliance
  regulatory_concerns: string[] // e.g., "SOC2", "HIPAA", "GDPR", "PCI-DSS"
  compliance_language: string[] // Terms they expect to hear
  risk_tolerance: 'low' | 'medium' | 'high'
  
  // Communication Norms
  terminology: {
    term: string
    definition: string
    usage_context: string
  }[]
  formality_level: 'casual' | 'professional' | 'formal'
  decision_making_style: 'fast_individual' | 'committee' | 'lengthy_process'
  
  // Objection Patterns
  common_objections: {
    objection: string
    underlying_concern: string
    effective_response_approach: string
  }[]
  
  // Competitor Landscape
  typical_incumbent_solutions: string[]
  switching_barriers: string[]
  
  // Integration with Roleplay
  scenario_templates: string[]  // Pre-built scenarios for this industry
  
  // Metadata
  created_at: Timestamp
  updated_at: Timestamp
}
```

### 1.3 Client Roles Schema

**Collection:** `clientRoles`  
**Purpose:** Define buyer personas with job-specific concerns and DISC overlay

```typescript
interface ClientRole {
  // Identity
  role_id: string               // e.g., "director_engineering"
  display_name: string          // e.g., "Director of Engineering"
  role_category: 'technical' | 'business' | 'executive' | 'operations' | 'finance'
  seniority_level: 'individual_contributor' | 'manager' | 'director' | 'vp' | 'c_suite'
  
  // Role Context
  typical_responsibilities: string[]
  reports_to: string[]          // Who they report to
  manages: string[]             // Who reports to them
  
  // Decision Making
  budget_authority: 'none' | 'small' | 'departmental' | 'significant' | 'unlimited'
  decision_role: 'user' | 'influencer' | 'champion' | 'decision_maker' | 'economic_buyer'
  typical_buying_committee_role: string
  
  // Success Metrics
  measured_on: string[]         // KPIs they care about
  gets_promoted_by: string[]    // What advances their career
  gets_fired_for: string[]      // What they must avoid
  
  // Pain Points by Role
  role_specific_pains: string[]
  time_constraints: string      // How busy they are
  preferred_meeting_length: '15min' | '30min' | '45min' | '60min'
  
  // Communication Preferences
  preferred_communication: ('email' | 'phone' | 'video' | 'in_person' | 'slack')[]
  response_time_expectation: 'immediate' | 'same_day' | 'within_week'
  
  // Objection Patterns (Role-Specific)
  role_objections: {
    objection: string
    context: string
    effective_counter: string
  }[]
  
  // Questions They Ask
  typical_questions: string[]   // What they want to know
  hidden_concerns: string[]     // What they don't say out loud
  
  // DISC Compatibility (how this role typically manifests by DISC type)
  disc_variations: {
    disc_type: 'D' | 'I' | 'S' | 'C'
    behavioral_overlay: string  // How DISC modifies the role behavior
    communication_tips: string[]
    warning_signs: string[]     // Signs you're losing them
  }[]
  
  // Metadata
  applicable_industries: string[] // Which industries have this role
  created_at: Timestamp
  updated_at: Timestamp
}
```

### 1.4 Extended User Profile Schema

**Update to existing `users` collection to capture founder category:**

```typescript
// Add to existing User interface in 03-DATABASE-SCHEMA.md
interface UserFounderProfile {
  // Founder Category (from onboarding)
  founder_category: string      // Links to founderCategories.category_id
  category_confidence: number   // 0-100, how confident the assessment was
  category_assessed_at: Timestamp
  
  // Business Context
  business_context: {
    industry: string            // Links to industries.industry_id
    sub_industry?: string
    company_stage: 'idea' | 'pre_revenue' | 'early_revenue' | 'scaling'
    current_mrr?: number
    target_customer_type: 'b2b' | 'b2c' | 'hybrid'
    typical_deal_size: 'transactional' | 'smb' | 'mid_market' | 'enterprise'
  }
  
  // DISC Profile (user's own style)
  disc_profile: {
    primary: 'D' | 'I' | 'S' | 'C'
    secondary: 'D' | 'I' | 'S' | 'C' | null
    assessment_source: 'onboarding' | 'full_assessment' | 'ai_inferred'
    assessed_at: Timestamp
  }
  
  // Roleplay History & Strengths
  roleplay_performance: {
    total_sessions: number
    by_disc_type: {
      D: { sessions: number, avg_score: number }
      I: { sessions: number, avg_score: number }
      S: { sessions: number, avg_score: number }
      C: { sessions: number, avg_score: number }
    }
    by_industry: Record<string, { sessions: number, avg_score: number }>
    by_role: Record<string, { sessions: number, avg_score: number }>
    strongest_combination: string  // e.g., "High-I + Healthcare + CMO"
    weakest_combination: string
  }
}
```

---

## Part 2: Architecture Specification

### 2.1 System Prompt Assembly Pipeline

The roleplay system dynamically constructs prompts by layering all three dimensions:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROMPT ASSEMBLY PIPELINE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   FOUNDER    │   │   INDUSTRY   │   │  CLIENT ROLE │        │
│  │   CATEGORY   │ + │   CONTEXT    │ + │   + DISC     │        │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘        │
│         │                  │                   │                 │
│         ▼                  ▼                   ▼                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │              CONTEXT AGGREGATOR SERVICE               │       │
│  │  - Fetches all three dimension documents              │       │
│  │  - Resolves industry-specific role variations         │       │
│  │  - Applies DISC overlay to role behavior              │       │
│  │  - Injects founder-specific coaching adaptations      │       │
│  └──────────────────────────┬───────────────────────────┘       │
│                             │                                    │
│                             ▼                                    │
│  ┌──────────────────────────────────────────────────────┐       │
│  │              DYNAMIC SYSTEM PROMPT                    │       │
│  │                                                       │       │
│  │  "You are role-playing as a [DISC_TYPE] [ROLE_NAME]  │       │
│  │   at a [COMPANY_SIZE] [INDUSTRY] company.            │       │
│  │                                                       │       │
│  │   YOUR PERSONALITY: [DISC behavioral traits]         │       │
│  │   YOUR ROLE CONCERNS: [Role-specific pain points]    │       │
│  │   YOUR INDUSTRY CONTEXT: [Industry objections]       │       │
│  │                                                       │       │
│  │   THE SALESPERSON: [Founder category context]        │       │
│  │   DIFFICULTY: [Calibrated to founder's weaknesses]"  │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Roleplay Service Enhancement

**File:** `lib/services/roleplayService.ts`

```typescript
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface RoleplayContext {
  // The three dimensions
  founderCategory: FounderCategory
  industry: Industry
  clientRole: ClientRole
  discType: 'D' | 'I' | 'S' | 'C'
  
  // Scenario configuration
  scenario: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  salesMethodology: 'SPIN' | 'MEDDIC' | 'CHALLENGER'
}

export async function buildRoleplayContext(
  userId: string,
  industryId: string,
  roleId: string,
  discType: 'D' | 'I' | 'S' | 'C'
): Promise<RoleplayContext> {
  
  // 1. Fetch user's founder category
  const userDoc = await getDoc(doc(db, 'users', userId))
  const userData = userDoc.data()
  const founderCategoryId = userData?.founder_profile?.founder_category || 'technical_purist'
  
  // 2. Fetch all three dimension documents in parallel
  const [founderCategoryDoc, industryDoc, clientRoleDoc] = await Promise.all([
    getDoc(doc(db, 'founderCategories', founderCategoryId)),
    getDoc(doc(db, 'industries', industryId)),
    getDoc(doc(db, 'clientRoles', roleId))
  ])
  
  const founderCategory = founderCategoryDoc.data() as FounderCategory
  const industry = industryDoc.data() as Industry
  const clientRole = clientRoleDoc.data() as ClientRole
  
  // 3. Calculate difficulty based on founder's weaknesses
  const difficulty = calculateDifficulty(founderCategory, discType, clientRole)
  
  // 4. Generate scenario from templates
  const scenario = generateScenario(industry, clientRole)
  
  return {
    founderCategory,
    industry,
    clientRole,
    discType,
    scenario,
    difficulty,
    salesMethodology: 'SPIN' // or based on user's current course
  }
}

function calculateDifficulty(
  founder: FounderCategory,
  discType: 'D' | 'I' | 'S' | 'C',
  role: ClientRole
): 'beginner' | 'intermediate' | 'advanced' {
  // If this DISC type is in founder's struggle list, increase difficulty
  if (founder.struggle_disc_types.includes(discType)) {
    return 'intermediate' // Start them at intermediate to stretch
  }
  // If role seniority is high, increase difficulty
  if (['vp', 'c_suite'].includes(role.seniority_level)) {
    return 'advanced'
  }
  return founder.default_difficulty
}
```

### 2.3 Enhanced Genkit Prompt Template

**File:** `lib/genkit/prompts/sales_roleplay_3d.prompt`

```handlebars
---
model: gemini-2.5-pro
input:
  schema:
    # Dimension 1: Founder Context
    founder_category: string
    founder_coaching_tone: string
    founder_avoid_phrases: string[]
    
    # Dimension 2: Industry Context
    industry_name: string
    industry_terminology: object[]
    industry_objections: object[]
    regulatory_concerns: string[]
    
    # Dimension 3: Client Role + DISC
    role_name: string
    role_seniority: string
    role_measured_on: string[]
    role_objections: object[]
    disc_type: string
    disc_behavioral_overlay: string
    disc_communication_tips: string[]
    
    # Scenario
    scenario: string
    difficulty: string
    sales_methodology: string
    
    # Conversation
    user_message: string
    conversation_history: object[]
config:
  temperature: 0.8
  maxOutputTokens: 400
---

# ROLE DEFINITION
You are role-playing as a **{{disc_type}}** **{{role_name}}** at a {{industry_name}} company.

## YOUR PERSONALITY (DISC: {{disc_type}})
{{disc_behavioral_overlay}}

**Communication Style:**
{{#each disc_communication_tips}}
- {{this}}
{{/each}}

## YOUR ROLE CONTEXT
**Title:** {{role_name}} ({{role_seniority}} level)
**You are measured on:** {{#each role_measured_on}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

**Your Role-Specific Concerns:**
{{#each role_objections}}
- {{this.objection}} (Context: {{this.context}})
{{/each}}

## YOUR INDUSTRY CONTEXT ({{industry_name}})
**Regulatory Environment:** {{#each regulatory_concerns}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

**Industry-Specific Objections You Might Raise:**
{{#each industry_objections}}
- "{{this.objection}}" (Underlying concern: {{this.underlying_concern}})
{{/each}}

**Industry Terminology You Use:**
{{#each industry_terminology}}
- {{this.term}}: {{this.definition}}
{{/each}}

## SCENARIO
{{scenario}}

## DIFFICULTY: {{difficulty}}
{{#if (eq difficulty "beginner")}}
- Be somewhat receptive but still realistic
- Give clear buying signals when they do well
- Raise 1-2 objections maximum
{{else if (eq difficulty "intermediate")}}
- Be moderately skeptical
- Require proof for claims
- Raise 2-3 objections, including one role-specific
{{else if (eq difficulty "advanced")}}
- Be highly skeptical and time-pressed
- Challenge every assertion
- Raise multiple layered objections
- Include political/internal concerns
{{/if}}

## CONVERSATION HISTORY
{{#each conversation_history}}
{{role}}: {{content}}
{{/each}}

## SALESPERSON'S MESSAGE
{{user_message}}

## YOUR RESPONSE
Respond as this {{disc_type}} {{role_name}} would. Stay completely in character.

RULES:
1. Embody the {{disc_type}} communication style throughout
2. Reference your {{role_name}} concerns naturally
3. Use {{industry_name}} terminology when appropriate
4. React to their {{sales_methodology}} approach realistically
5. Keep responses 2-4 sentences (real prospects don't monologue)
6. If they're handling you well, warm up gradually (subtle buying signals)
7. If they're struggling, become more resistant

{{#if (eq disc_type "D")}}
Be direct, impatient with fluff, focused on results and ROI.
{{else if (eq disc_type "I")}}
Be enthusiastic, relationship-focused, ask about other customers.
{{else if (eq disc_type "S")}}
Be cautious, ask about implementation support, concerned about disruption.
{{else if (eq disc_type "C")}}
Be analytical, ask detailed technical questions, require data and proof.
{{/if}}
```

### 2.4 Coaching Adaptation Layer

When providing feedback after roleplay, the coaching adapts to founder category:

```typescript
// lib/services/coachingService.ts

export function generateCoachingFeedback(
  roleplayResult: RoleplayResult,
  founderCategory: FounderCategory
): CoachingFeedback {
  
  const baseFeedback = analyzePerformance(roleplayResult)
  
  // Adapt tone and framing based on founder category
  const adaptedFeedback = {
    ...baseFeedback,
    
    // Use founder's preferred communication style
    tone: founderCategory.coaching_tone,
    
    // Avoid trigger phrases
    feedback_text: removePhrases(
      baseFeedback.feedback_text,
      founderCategory.avoid_phrases
    ),
    
    // Use motivating language
    encouragement: selectMotivatingPhrases(
      founderCategory.motivating_phrases,
      baseFeedback.score
    ),
    
    // Recommend courses based on weaknesses AND founder preferences
    recommended_next: prioritizeCourses(
      baseFeedback.skill_gaps,
      founderCategory.recommended_courses
    )
  }
  
  return adaptedFeedback
}
```

---

## Part 3: Content Matrix

### 3.1 Complete Founder Categories (10)

| ID | Display Name | Background | Primary Pain | Core Belief | DISC Affinity | DISC Struggle |
|----|--------------|------------|--------------|-------------|---------------|---------------|
| `reluctant_seller` | The Reluctant Seller | Backend dev, 8+ years, built SaaS | Has product, zero customers after 6 months | "Sales feels manipulative, product should speak for itself" | S, C | D, I |
| `burned_bootstrapper` | The Burned Bootstrapper | Previously failed startup, now working FT while building | Lost $40K+ on last venture | "Need to validate before building this time" | C | I |
| `technical_purist` | The Technical Purist | Senior engineer at FAANG, wants indie | Paralyzed by business decisions | "If I build something great, customers will come" | C | D, I |
| `time_starved_parent` | The Time-Starved Parent | Full-time job, kids, nights/weekends | 10-15 hours/week max | "I don't have time to learn sales AND build" | S | D |
| `non_technical` | The Non-Technical Founder | Domain expert (consultant, marketer) | Can't code, dependent on contractors | "Technical founders have it easier" | I, S | C |
| `scaling_struggler` | The Scaling Struggler | Has 5-10 customers, $2-5K MRR | Can't break through plateau | "I need to do more marketing" | D, I | C |
| `agency_escapee` | The Agency Escapee | Running service business | Trading time for money, no leverage | "Product revenue is path to freedom" | D | S |
| `returning_founder` | The Returning Founder | Had successful exit, starting new | Different market, old playbook failing | "I know how to build companies" | D | S, C |
| `international_founder` | The International Founder | Building from outside US/UK | Cultural barriers, different business norms | "American sales tactics don't work in my market" | S, C | D, I |
| `ai_native_builder` | The AI-Native Builder | Using AI heavily, building AI product | Crowded market, differentiation hard | "AI is the answer to everything" | I, D | S |

**Full JSON for each category available in supplementary file.**

### 3.2 Industry Matrix (12 Core Industries)

| ID | Display Name | Parent Category | Risk Tolerance | Regulatory | Sales Cycle | Formality |
|----|--------------|-----------------|----------------|------------|-------------|-----------|
| `saas_startup` | SaaS / Software Startups | Technology | High | Low | Weeks | Casual |
| `fintech` | FinTech / Financial Services | Technology | Low | High (SOC2, PCI) | Months | Professional |
| `healthtech` | HealthTech / Healthcare | Technology | Low | High (HIPAA) | Months | Professional |
| `ecommerce` | E-Commerce / DTC | Commerce | Medium | Medium (PCI) | Days-Weeks | Casual |
| `martech` | MarTech / AdTech | Technology | Medium | Medium (GDPR) | Weeks | Professional |
| `devtools` | Developer Tools / Infrastructure | Technology | Medium | Medium | Weeks | Casual |
| `professional_services` | Professional Services (Law, Accounting) | Services | Low | High | Months-Quarters | Formal |
| `real_estate` | Real Estate / PropTech | Commerce | Medium | Medium | Weeks-Months | Professional |
| `education` | EdTech / Online Learning | Technology | Medium | Medium | Weeks | Professional |
| `hr_recruiting` | HR Tech / Recruiting | Technology | Medium | Medium (GDPR) | Weeks-Months | Professional |
| `manufacturing` | Manufacturing / Industrial | Traditional | Low | Medium | Quarters | Formal |
| `agencies` | Agencies / Consultancies | Services | Medium | Low | Weeks | Casual-Professional |

**Each industry includes:**
- 5-8 common pain points
- 5-8 common objections with response strategies
- 10-15 industry-specific terms
- 3-5 scenario templates

### 3.3 Client Roles Matrix (15 Core Roles)

| ID | Display Name | Category | Seniority | Budget Authority | Decision Role |
|----|--------------|----------|-----------|------------------|---------------|
| `ceo_founder` | CEO / Founder | Executive | C-Suite | Unlimited | Economic Buyer |
| `cto` | CTO / VP Engineering | Technical | C-Suite/VP | Significant | Decision Maker |
| `vp_sales` | VP of Sales | Business | VP | Departmental | Decision Maker |
| `vp_marketing` | VP of Marketing / CMO | Business | VP/C-Suite | Departmental | Decision Maker |
| `dir_engineering` | Director of Engineering | Technical | Director | Small-Departmental | Influencer |
| `dir_product` | Director of Product | Business | Director | Small-Departmental | Champion |
| `dir_operations` | Director of Operations | Operations | Director | Departmental | Decision Maker |
| `head_growth` | Head of Growth | Business | Director | Departmental | Champion |
| `engineering_manager` | Engineering Manager | Technical | Manager | Small | Influencer |
| `product_manager` | Product Manager | Business | Manager | None-Small | User/Champion |
| `security_lead` | Security Lead / CISO | Technical | Director/VP | Small-Departmental | Influencer |
| `cfo` | CFO / Finance Director | Finance | C-Suite | Significant | Economic Buyer |
| `procurement` | Procurement Manager | Operations | Manager | None | Gatekeeper |
| `it_manager` | IT Manager | Technical | Manager | Small | User/Influencer |
| `senior_developer` | Senior Developer / Tech Lead | Technical | IC | None | User |

**Each role includes:**
- DISC variations (4 versions showing how D/I/S/C manifests in this role)
- 5-8 role-specific objections
- 5-8 questions they typically ask
- 5 hidden concerns (what they don't say out loud)
- Career advancement triggers (what gets them promoted)

### 3.4 DISC Behavioral Overlays (4 Types)

Already defined in existing `05-AI-FLOWS-LIBRARY.md`, enhanced with role-specific variations:

| DISC | Core Traits | Email Style | Call Behavior | Objection Style | Buying Signals |
|------|-------------|-------------|---------------|-----------------|----------------|
| **D** | Direct, results-focused, impatient | Short, bullet points, wants bottom line | Interrupts, challenges, tests confidence | "What's the ROI?" "Why should I care?" | Asks about pricing, implementation timeline |
| **I** | Enthusiastic, people-oriented, distractible | Warm, personal, lots of exclamation points | Tells stories, name-drops, tangents | "Who else uses this?" "Sounds interesting but..." | Wants to introduce you to others, social proof requests |
| **S** | Patient, reliable, change-averse | Polite, thorough, takes time to respond | Listens carefully, asks about support | "What if something goes wrong?" "How does transition work?" | Asks about training, support, guarantees |
| **C** | Analytical, detail-oriented, risk-averse | Formal, numbered lists, specific questions | Takes notes, asks for documentation | "Where's the data?" "Can you prove that?" | Requests case studies, trials, detailed specs |

---

## Part 4: Implementation Checklist for Antigravity

### Phase 1: Schema Implementation
- [ ] Create `founderCategories` collection with all 10 categories
- [ ] Create `industries` collection with 12 core industries
- [ ] Create `clientRoles` collection with 15 core roles
- [ ] Extend `users` collection with `founder_profile` subdocument
- [ ] Add Firestore indexes for roleplay queries

### Phase 2: Service Layer
- [ ] Implement `buildRoleplayContext()` function
- [ ] Implement `calculateDifficulty()` logic
- [ ] Implement `generateScenario()` with industry/role templates
- [ ] Add coaching adaptation layer

### Phase 3: Prompt Enhancement
- [ ] Create `sales_roleplay_3d.prompt` file
- [ ] Test with all DISC × Role × Industry combinations
- [ ] Tune temperature and output constraints
- [ ] Add evaluation flow for performance scoring

### Phase 4: UI Integration
- [ ] Add industry selector to roleplay setup
- [ ] Add role selector with DISC overlay picker
- [ ] Display founder category adaptations in coaching
- [ ] Show performance by dimension in analytics

### Phase 5: Onboarding Enhancement
- [ ] Add founder category assessment (5-7 questions)
- [ ] Add business context capture (industry, stage, deal size)
- [ ] Add DISC quick assessment (4-5 scenario questions)
- [ ] Store results in user profile

---

## Part 5: Sample Data (Starter Content)

### 5.1 Sample Founder Category: Technical Purist

```json
{
  "category_id": "technical_purist",
  "display_name": "The Technical Purist",
  "short_description": "Senior engineer wanting to go indie, paralyzed by business decisions",
  
  "background": "8-15 years at FAANG or well-funded startups. Deep technical expertise. Has built impressive systems but never sold anything directly.",
  "primary_pain": "Knows how to build but paralyzed by business decisions. Analysis paralysis on everything non-technical.",
  "core_belief": "If I just build something great, customers will come. Technology quality is everything.",
  "fear": "Being seen as 'salesy' or 'marketing-bro'. Losing technical credibility.",
  
  "objection_patterns": [
    "Dismisses marketing as 'fluff'",
    "Over-engineers solutions instead of shipping",
    "Wants to automate sales instead of doing it manually first",
    "Resists anything that can't be measured precisely"
  ],
  
  "decision_criteria": [
    "Frameworks must be systematic, measurable, engineering-minded",
    "Clear cause-and-effect logic, not 'just trust me'",
    "Proof that technical credibility can be maintained while selling",
    "Examples of technical founders who succeeded at sales"
  ],
  
  "communication_style": {
    "preferred_depth": "deep",
    "preferred_pace": "moderate",
    "preferred_proof": "logic"
  },
  
  "coaching_tone": "Speak to them as a fellow builder. Use engineering metaphors. Frame sales as a system to optimize, not a personality trait to develop.",
  
  "avoid_phrases": [
    "Just pick up the phone and call",
    "Fake it till you make it",
    "Be more outgoing",
    "Trust your gut",
    "It's a numbers game"
  ],
  
  "motivating_phrases": [
    "Sales is a system you can debug",
    "Customer conversations are user research",
    "Your technical credibility is actually your sales advantage",
    "The best salespeople ask questions, not push products",
    "Measure it, iterate on it, optimize it"
  ],
  
  "default_difficulty": "beginner",
  "natural_disc_affinity": ["C"],
  "struggle_disc_types": ["D", "I"],
  
  "recommended_courses": [
    "course_icp_builder",
    "course_disc_buyer_personas",
    "course_discovery_framework",
    "course_handling_objections"
  ],
  
  "milestone_triggers": [
    "First cold outreach sent",
    "First discovery call completed",
    "First objection handled successfully"
  ]
}
```

### 5.2 Sample Industry: FinTech

```json
{
  "industry_id": "fintech",
  "display_name": "FinTech / Financial Services",
  "parent_category": "technology",
  
  "description": "Companies providing technology for financial services including payments, lending, banking, investing, and insurance.",
  
  "typical_company_sizes": ["11-50", "51-200", "201-500"],
  "typical_deal_sizes": ["smb", "mid_market"],
  "sales_cycle_length": "months",
  
  "common_pain_points": [
    "Regulatory compliance burden slowing development",
    "Legacy system integration complexity",
    "Customer trust and security concerns",
    "Fraud prevention at scale",
    "Multi-jurisdiction compliance requirements"
  ],
  
  "buying_triggers": [
    "Failed audit or compliance finding",
    "Security incident or near-miss",
    "New regulation deadline approaching",
    "Competitor launched superior capability",
    "Series B+ funding requiring operational maturity"
  ],
  
  "budget_cycle": "Typically quarterly planning with annual budgets. Q4 often has 'use it or lose it' pressure.",
  
  "regulatory_concerns": ["SOC2", "PCI-DSS", "GDPR", "State money transmitter licenses", "SEC regulations"],
  
  "compliance_language": [
    "audit trail",
    "data residency",
    "encryption at rest",
    "role-based access control",
    "penetration testing"
  ],
  
  "risk_tolerance": "low",
  
  "terminology": [
    {"term": "ACH", "definition": "Automated Clearing House - electronic bank transfers", "usage_context": "Payment processing discussions"},
    {"term": "AML", "definition": "Anti-Money Laundering", "usage_context": "Compliance conversations"},
    {"term": "KYC", "definition": "Know Your Customer - identity verification", "usage_context": "Onboarding and compliance"},
    {"term": "PCI-DSS", "definition": "Payment Card Industry Data Security Standard", "usage_context": "Any card payment handling"},
    {"term": "Chargeback", "definition": "Disputed transaction reversed by bank", "usage_context": "Payment and fraud discussions"}
  ],
  
  "formality_level": "professional",
  "decision_making_style": "committee",
  
  "common_objections": [
    {
      "objection": "How do you handle SOC2 compliance?",
      "underlying_concern": "They can't work with non-compliant vendors",
      "effective_response_approach": "Lead with your compliance posture, offer to share audit report"
    },
    {
      "objection": "We need to run this by legal and security",
      "underlying_concern": "Financial services requires multi-stakeholder approval",
      "effective_response_approach": "Offer to provide security documentation proactively"
    },
    {
      "objection": "What happens if there's a breach?",
      "underlying_concern": "Financial data breaches are catastrophic",
      "effective_response_approach": "Discuss incident response, insurance, notification procedures"
    }
  ],
  
  "typical_incumbent_solutions": ["Stripe", "Plaid", "Marqeta", "Legacy banking systems"],
  "switching_barriers": ["Regulatory re-certification", "Integration complexity", "Data migration risk"],
  
  "scenario_templates": [
    "You're a {role} at a Series B payments startup. You're evaluating solutions because {trigger}.",
    "You work at a regional bank modernizing their tech stack. Your main concern is {pain_point}.",
    "You're building a neobank and need to choose vendors before your banking license review."
  ]
}
```

### 5.3 Sample Client Role: Director of Engineering

```json
{
  "role_id": "dir_engineering",
  "display_name": "Director of Engineering",
  "role_category": "technical",
  "seniority_level": "director",
  
  "typical_responsibilities": [
    "Managing multiple engineering teams (usually 10-30 engineers)",
    "Technical roadmap and architecture decisions",
    "Hiring and retaining engineering talent",
    "Balancing technical debt vs. feature development",
    "Cross-functional collaboration with product and design"
  ],
  
  "reports_to": ["VP Engineering", "CTO", "CEO"],
  "manages": ["Engineering Managers", "Tech Leads", "Senior Engineers"],
  
  "budget_authority": "departmental",
  "decision_role": "influencer",
  "typical_buying_committee_role": "Technical evaluator and influencer. Can kill deals with 'no' but rarely has final budget approval.",
  
  "measured_on": [
    "Team velocity and delivery",
    "System reliability (uptime, incident response)",
    "Engineering hiring and retention",
    "Technical debt management",
    "Cross-team collaboration effectiveness"
  ],
  
  "gets_promoted_by": [
    "Successfully delivering major platform initiatives",
    "Building and retaining high-performing teams",
    "Demonstrating business impact, not just technical excellence"
  ],
  
  "gets_fired_for": [
    "Major production outages",
    "Losing key engineers",
    "Chronic under-delivery vs. commitments",
    "Poor cross-functional relationships"
  ],
  
  "role_specific_pains": [
    "Constantly interrupted by meetings",
    "Pressure from product to ship faster",
    "Technical debt accumulating",
    "Hard to find and retain good engineers",
    "Vendor tools causing integration headaches"
  ],
  
  "time_constraints": "Very busy. Calendar is packed. Values efficiency highly.",
  "preferred_meeting_length": "30min",
  
  "preferred_communication": ["email", "slack", "video"],
  "response_time_expectation": "within_week",
  
  "role_objections": [
    {
      "objection": "My team doesn't have bandwidth to implement this",
      "context": "Engineers are already overcommitted",
      "effective_counter": "Offer implementation support, show low integration effort"
    },
    {
      "objection": "How does this integrate with our existing stack?",
      "context": "They care deeply about architectural fit",
      "effective_counter": "Lead with API documentation, show similar stack case studies"
    },
    {
      "objection": "We tried something similar and it didn't work",
      "context": "Past bad vendor experiences",
      "effective_counter": "Acknowledge the concern, differentiate specifically"
    }
  ],
  
  "typical_questions": [
    "What's your API documentation like?",
    "How do you handle versioning and breaking changes?",
    "What's your uptime SLA?",
    "How long does typical integration take?",
    "Can we see the source code / is there a self-hosted option?"
  ],
  
  "hidden_concerns": [
    "Will this make my team look incompetent for not building it ourselves?",
    "Is this vendor going to become a dependency nightmare?",
    "Will I have to defend this purchase to the CTO?",
    "Is my career at risk if this goes wrong?"
  ],
  
  "disc_variations": [
    {
      "disc_type": "D",
      "behavioral_overlay": "Impatient, wants bottom line. Will challenge your claims directly. Respects technical strength but has no patience for hand-waving. May test you to see if you know your stuff.",
      "communication_tips": [
        "Lead with results and metrics",
        "Be direct - don't waste their time",
        "Stand your ground when challenged",
        "Have data ready to back every claim"
      ],
      "warning_signs": ["Starts checking phone", "One-word responses", "Redirects to a subordinate"]
    },
    {
      "disc_type": "I",
      "behavioral_overlay": "Enthusiastic about new tech, wants to know who else is using it. May get excited about possibilities but struggle to commit. Values relationship and vision.",
      "communication_tips": [
        "Share customer stories and names",
        "Paint the vision of what's possible",
        "Build personal rapport",
        "Follow up quickly on enthusiasm before it fades"
      ],
      "warning_signs": ["Enthusiasm without action items", "Keeps saying 'interesting' without committing"]
    },
    {
      "disc_type": "S",
      "behavioral_overlay": "Cautious, protective of team. Worried about disruption and change management. Needs reassurance that transition will be smooth.",
      "communication_tips": [
        "Emphasize implementation support",
        "Discuss training and onboarding",
        "Show similar-company transitions",
        "Don't rush the process"
      ],
      "warning_signs": ["Keeps asking 'what if' questions", "Wants to 'think about it' repeatedly"]
    },
    {
      "disc_type": "C",
      "behavioral_overlay": "Highly analytical, will read every document. Wants technical deep-dives, architecture diagrams, security audits. Makes decisions slowly after thorough analysis.",
      "communication_tips": [
        "Provide detailed documentation upfront",
        "Be precise - vague claims will kill trust",
        "Offer technical deep-dive session",
        "Give them time to analyze"
      ],
      "warning_signs": ["Asks increasingly detailed questions without buying signals", "Requests for more documentation without progress"]
    }
  ],
  
  "applicable_industries": ["saas_startup", "fintech", "healthtech", "devtools", "martech", "ecommerce"]
}
```

---

## Appendix: Integration with Existing Architecture

### Compatibility Notes

1. **Database Schema (03-DATABASE-SCHEMA.md):** New collections extend existing structure, no breaking changes
2. **AI Flows (05-AI-FLOWS-LIBRARY.md):** Enhanced prompt replaces `sales_roleplay.prompt`, backward compatible
3. **Genkit Patterns (01-TECHNICAL-ARCHITECTURE.md):** Uses existing streaming and structured output patterns
4. **Cohort System (cohort-forum-strategy.md):** Pod matching can use founder category for better groupings

### Files to Update

1. `roleplayService.ts` - Add context builder
2. `sales_roleplay.prompt` → `sales_roleplay_3d.prompt`
3. `evaluateRoleplay.ts` - Add dimension-specific scoring
4. `OnboardingFlow.tsx` - Add category/DISC assessment
5. `RoleplaySetup.tsx` - Add industry/role selectors

---

*This specification is designed for implementation by Antigravity or any code generation system. All schemas are Firebase/Firestore compatible, all prompts are Genkit/Handlebars compatible.*