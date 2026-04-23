Create a comprehensive research package for a "Symptom-Based Onboarding Flow" for a mental health education platform (Real Psychiatric Services).

CONTEXT:
- Platform currently has founder-focused onboarding (business info → questionnaire → AI assessment)
- Refactoring to wellness-focused onboarding for mental health courses
- Anonymous-first design (no account required to start)
- Goal: Route users to relevant courses based on presenting symptoms
- Must integrate crisis detection and 988 resources

EXISTING COMPONENTS TO REUSE:
- Multi-step form components (React)
- Progress indicators
- Form validation patterns (Zod schemas)
- Profile storage (JSONB in PostgreSQL)

RESEARCH NEEDED:

1. SYMPTOM ASSESSMENT & ROUTING
- Evidence-based symptom screening approaches for self-directed education
- Common presenting symptoms and how they cluster
- Decision tree logic: symptoms → course recommendations
- Brief assessment tools adaptable for onboarding (GAD-7, PHQ-9, ISI concepts)
- Multiple symptom handling (anxiety + depression + sleep)

2. ONBOARDING FLOW STRUCTURE
Research optimal user experience for mental health onboarding:

STEP 1: WELCOME & ORIENTATION
- What to communicate on landing (educational platform, not treatment)
- Trust-building elements
- Privacy assurances (anonymous option)
- Crisis resources placement
- Expected time to complete

STEP 2: "WHAT BRINGS YOU HERE?"
- Symptom selection interface design (checkboxes? Cards? Prioritization?)
- Symptom list to present (research-backed common presentations):
  - Anxiety / Worry
  - Low mood / Depression
  - Sleep problems
  - Panic attacks
  - Social anxiety / Avoidance
  - Trauma symptoms
  - Stress / Burnout
  - Obsessive thoughts / Compulsive behaviors
  - Anger / Irritability
  - Grief / Loss
  - Other (free text)
- Severity indicators (optional: mild/moderate/severe selection)
- Duration indicators (how long experiencing symptoms)

STEP 3: CRISIS SCREENING
- When to screen for crisis (all users? Certain symptom selections?)
- Brief crisis questions (suicidal ideation, self-harm, immediate danger)
- 988 escalation flow (interruptive vs. informational)
- "I'm in crisis now" vs. "Sometimes I have these thoughts"
- How to handle crisis-positive screening (still allow platform access? Immediate 988 referral?)

STEP 4: OPTIONAL ACCOUNT CREATION
- Benefits of creating account (progress sync, certificates, personalized experience)
- Anonymous vs. identified user tradeoff communication
- Email-only registration (no name required)
- Social login options (Google, Apple)
- "Skip for now" option (truly anonymous)

STEP 5: PERSONALIZED COURSE RECOMMENDATIONS
- Algorithm logic: symptoms → prioritized course list
- Presenting 3-5 recommended courses (not overwhelming)
- Allowing user to override recommendations (browse all courses)
- Expected time commitment communication
- "Start here" vs. "Also helpful" tiering

STEP 6: PLATFORM ORIENTATION
- How to navigate courses
- Where to find crisis resources (always visible)
- How to use AI wellness coach
- Progress tracking explanation
- Setting expectations (education, not therapy)

3. DESIGN CONSIDERATIONS
- Mobile-first experience (most mental health searches on mobile)
- Accessibility (screen readers, high contrast, keyboard navigation)
- Progress saving for anonymous users (browser storage? Session-based?)
- Exit points (user can leave and return without losing progress)
- Low cognitive load (depression, anxiety impair concentration)

4. CRISIS INTEGRATION
- Crisis resources visible on every onboarding screen
- 988 button placement (sticky header? Footer?)
- Crisis screening integration point
- Safety plan offer for high-risk presentations
- Warm handoff language ("We're concerned and want to make sure you're safe")

5. DATA CAPTURE (ANONYMOUS-FRIENDLY)
- What to store: Symptom selections, severity, course recommendations
- What NOT to store: PII unless user creates account
- Session-based tracking for completion rates
- Analytics for onboarding optimization (drop-off points)

DELIVERABLES NEEDED:

A) USER FLOW DIAGRAM
- Screen-by-screen flow with decision points
- Crisis escalation branching
- Anonymous vs. account creation paths

B) SYMPTOM-TO-COURSE ROUTING LOGIC
- Decision tree: symptom combinations → recommended courses
- Priority ranking algorithm
- Examples: 
  - User selects "Anxiety + Sleep" → Recommend Anxiety course (priority 1), Sleep course (priority 2)
  - User selects "Depression + Grief" → Recommend Depression (priority 1), Grief (priority 2)

C) CONTENT REQUIREMENTS PER SCREEN
- Headline, body copy, CTA buttons
- Crisis resource placement
- Validation messages
- Progress indicators

D) TECHNICAL IMPLEMENTATION GUIDANCE
- API endpoints needed (symptom assessment, course routing)
- Database schema changes (wellness_profile vs. founder profile)
- Form state management
- Anonymous user session handling

E) CRISIS SCREENING PROTOCOL
- Specific screening questions
- Scoring/routing logic
- 988 escalation messaging templates
- User continuation options after crisis screening

FORMAT: Organized markdown with:
- Evidence-based onboarding best practices
- Detailed user flow specifications
- Symptom routing logic (decision tree)
- Technical implementation notes
- Copy/content for each screen

DESIGN PRINCIPLES: Trauma-informed, low barrier to entry, mobile-optimized, crisis-aware, choice-driven, validating.
