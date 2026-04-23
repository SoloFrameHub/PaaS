# Quick Start Guide - Solo Founder Platform

## Overview

This guide helps you use Cursor AI or Google Antigravity to build the integrated Solo Founder Platformâ€”combining Startup Academy, Sales Training Academy, and Sales Enablement in a unified Firebase + Genkit architecture. You have 10 context files that work together:

1. **01-TECHNICAL-ARCHITECTURE.md** - Firebase + Genkit stack, structure, dependencies
2. **02-DESIGN-SYSTEM.md** - Strategic thinking UI, colors, typography, components
3. **03-DATABASE-SCHEMA.md** - Firestore collections, security rules, indexes
4. **04-MODULE-ARCHITECTURE.md** - Three-module integration, licensing, feature flags
5. **05-AI-FLOWS-LIBRARY.md** - Genkit prompts, AI orchestration patterns
6. **06-INTERACTIVE-COMPONENTS.md** - Framework builders, strategic tools
7. **07-PEDAGOGICAL-PATTERNS.md** - Teaching methodology, content structure
8. **08-CURSOR-PROMPTS.md** - Step-by-step build automation
9. **09-CONTENT-GENERATION.md** - Manuscript to course pipeline
10. **10-GAMIFICATION-SYSTEM.md** - Engagement mechanics, milestones

## Getting Started (First Hour)

### Step 1: Firebase Project Initialization (15 minutes)
Open your AI coding assistant and run:
```
@08-CURSOR-PROMPTS.md Execute "Prompt 1: Initialize Firebase + Next.js + TypeScript Project"
```

This will:
- Create Next.js 14+ project with App Router
- Install Firebase SDK and dependencies
- Set up folder structure for three modules
- Configure TypeScript, Tailwind, ESLint
- Initialize Genkit with Google AI plugin

### Step 2: Setup Firebase & Genkit (20 minutes)
1. Create Firebase project at console.firebase.google.com
2. Enable Authentication (Email + Google OAuth)
3. Create Firestore database
4. Copy configuration to `.env.local`
5. Install Firebase CLI: `npm install -g firebase-tools`
6. Login: `firebase login`
7. Initialize: `firebase init`

In your AI assistant:
```
@08-CURSOR-PROMPTS.md Execute "Prompt 2: Setup Firebase Client and Genkit Integration"
@01-TECHNICAL-ARCHITECTURE.md Reference the Firebase + Genkit configuration section
```

### Step 3: Initialize Database Schema (15 minutes)
```
@08-CURSOR-PROMPTS.md Execute "Prompt 3: Initialize Firestore Collections"
@03-DATABASE-SCHEMA.md Use the complete schema with security rules
```

This creates:
- 8 core Firestore collections
- Security rules for multi-tenant access
- Composite indexes for queries
- Seed data for development

### Step 4: Configure Module System (10 minutes)
```
@08-CURSOR-PROMPTS.md Execute "Prompt 4: Build Module Configuration System"
@04-MODULE-ARCHITECTURE.md Reference the feature flag architecture
```

This implements:
- Module definitions (founder_academy, sales_training, sales_enablement)
- Pricing tiers (Founder, Sales Starter, Growth, Complete)
- Feature flag hooks (useModules, useFeatureAccess)
- Module switcher UI

## Development Workflow

### Daily Development Pattern

1. **Start with Composer/Chat**: Use AI assistant for complex features
2. **Load Context Files**: Always use `@filename` to reference relevant docs
3. **Build in Phases**: Follow the phase structure below
4. **Test AI Flows**: Use Genkit Dev UI for prompt testing
5. **Validate Module Access**: Test feature flags across tiers

### Example: Building Business Model Canvas Generator

```
Session 1 (45 minutes):
@08-CURSOR-PROMPTS.md Execute "Prompt 12: Build Business Model Canvas Tool"
@06-INTERACTIVE-COMPONENTS.md Reference BMCGenerator component
@05-AI-FLOWS-LIBRARY.md Use the framework_builder.prompt pattern
@02-DESIGN-SYSTEM.md Ensure design consistency

Session 2 (30 minutes):
Test the AI coaching flow in Genkit Dev UI:
"The canvas isn't saving partial progress. Add auto-save every 30 seconds with Firestore."

Session 3 (20 minutes):
Add validation and feedback:
@05-AI-FLOWS-LIBRARY.md Reference strategic_evaluation.prompt
"Implement AI evaluation of the completed canvas with strategic feedback"
```

## Recommended Build Order (12-Week Plan)

### Phase 1: Foundation (Weeks 1-2, 40-50 hours)
- âœ… Firebase project setup and dependencies
- âœ… Design system (UI components library)
- âœ… Database schema with security rules
- âœ… Authentication system (email + OAuth)
- âœ… Module configuration system
- âœ… Layout components (Header, Footer, Navigation, Module Switcher)
- âœ… Dashboard with module-based routing
- âœ… Basic Genkit setup and first prompt test

### Phase 2: Founder Academy Core (Weeks 3-4, 50-60 hours)
- âœ… Course catalog and browsing
- âœ… Course detail pages
- âœ… Lesson viewer system (text, video, interactive)
- âœ… Progress tracking and persistence
- âœ… First strategic framework tool (BMC Generator)
- âœ… Google Drive integration basics
- âœ… Assessment system foundation
- âœ… First Genkit coaching flow working

### Phase 3: Sales Training Academy (Weeks 5-6, 50-60 hours)
- âœ… AI role-play conversation engine
- âœ… DISC personality configurations
- âœ… Sales methodology courses (SPIN, MEDDIC, Challenger)
- âœ… Pre-call coaching brief generator
- âœ… Performance analytics dashboard
- âœ… Objection handling library
- âœ… Voice-based role-play (Gemini Live API)
- âœ… Multi-turn dialogue state management

### Phase 4: Sales Enablement Suite (Weeks 7-8, 50-60 hours)
- âœ… Gmail CRM integration
- âœ… Calendar-based pipeline tracking
- âœ… CEO knowledge extraction from documents
- âœ… Email sequence builder
- âœ… Contact relationship mapping
- âœ… Team analytics dashboard
- âœ… Drive knowledge base search
- âœ… RAG store implementation

### Phase 5: Content Generation Pipeline (Weeks 9-10, 40-50 hours)
- âœ… Framework extraction from manuscripts
- âœ… Automated lesson generation
- âœ… Case study curation system
- âœ… Assessment creation workflows
- âœ… Bulk course deployment
- âœ… Content validation and QA
- âœ… 20 courses across 4 tracks deployed

### Phase 6: Gamification & Engagement (Week 11, 30-40 hours)
- âœ… Point calculation system
- âœ… Progression levels and badges
- âœ… Business milestone detection
- âœ… Accountability pod matching
- âœ… Re-engagement triggers
- âœ… Community features (optional)

### Phase 7: Polish & Launch Prep (Week 12, 30-40 hours)
- âœ… Accessibility audit and fixes
- âœ… Performance optimization
- âœ… Error handling and edge cases
- âœ… Stripe payment integration
- âœ… Email notification system
- âœ… Deploy to Firebase Hosting
- âœ… Beta testing with 10-20 founders
- âœ… Analytics and monitoring setup

## Module Development Priority

### Priority 1: Founder Academy (Launch First)
**Why**: Broadest appeal, clearest value proposition, lowest AI complexity
**Timeline**: Weeks 1-4 + Week 9 for content
**MVP Features**:
- 5 foundation courses (Problem-Solution Fit, Customer Discovery, MVP Strategy, First Customer, Pricing)
- 1 framework builder (Business Model Canvas)
- Basic progress tracking
- Google Drive integration

### Priority 2: Sales Training (Launch Second)
**Why**: High differentiation with AI, validates tech architecture
**Timeline**: Weeks 5-6 + Week 9 for content
**MVP Features**:
- 3 sales methodology courses (SPIN, MEDDIC, Challenger)
- AI role-play with 4 DISC personas
- Pre-call coaching
- Performance analytics

### Priority 3: Sales Enablement (Launch Third)
**Why**: Highest complexity, requires mature infrastructure
**Timeline**: Weeks 7-8 + Week 10 for integration
**MVP Features**:
- Gmail CRM (contacts, emails, pipeline)
- Knowledge extraction from 5 document types
- Basic email sequences
- Team dashboard

## Tips for Working with AI Coding Assistants

### 1. Load Context Before Prompting
**Bad:**
```
Create a framework builder component
```

**Good:**
```
@06-INTERACTIVE-COMPONENTS.md Reference the BusinessModelCanvasGenerator
@05-AI-FLOWS-LIBRARY.md Use the framework_builder.prompt pattern
@02-DESIGN-SYSTEM.md Follow the strategic tool design system

Create a Business Model Canvas generator with:
- 9 building blocks as editable cards
- AI coaching for each block (multi-turn dialogue)
- Auto-save to Firestore every 30 seconds
- Export to PDF and Google Drive
- Evaluation and strategic feedback
```

### 2. Be Specific About Module Scope
**Bad:**
```
Add a course
```

**Good:**
```
@04-MODULE-ARCHITECTURE.md This is for founder_academy module
@07-PEDAGOGICAL-PATTERNS.md Follow the explanation-before-application pattern
@03-DATABASE-SCHEMA.md Store in courses collection with lessons subcollection

Create "Customer Discovery Methodology" course with:
- 12 lessons following the pedagogical pattern
- 3 framework builders (Customer Avatar, Interview Guide, Insight Synthesizer)
- 5 case studies of successful customer discovery
- Assessment rubric for strategic thinking
- Competency mapping to SC1 (Market Validation)
```

### 3. Reference AI Flow Patterns
**Bad:**
```
Make an AI chatbot for sales practice
```

**Good:**
```
@05-AI-FLOWS-LIBRARY.md Use the sales_roleplay.prompt template
@04-MODULE-ARCHITECTURE.md This requires sales_training module access
@03-DATABASE-SCHEMA.md Store conversations in aiInteractions collection

Create AI sales role-play with:
- DISC personality selector (Dominant, Influential, Steady, Compliant)
- Multi-turn conversation with state persistence
- Real-time performance scoring (talk time ratio, discovery questions, objection handling)
- Structured output for analytics
- Session resume capability
```

### 4. Specify Genkit Flow Structure
**Bad:**
```
Add AI coaching
```

**Good:**
```
@05-AI-FLOWS-LIBRARY.md Reference strategic_advisor.prompt
@01-TECHNICAL-ARCHITECTURE.md Use Genkit flow with streaming responses

Create a Genkit flow for GTM Strategy coaching:
1. Input schema: { framework_name: string, user_context: string, current_step: number }
2. Flow logic: Load framework definition, retrieve past progress, generate contextual questions
3. Output schema: { question: string, guidance: string, examples: string[], next_step: number }
4. Streaming: Enable for real-time response
5. State: Persist to Firestore after each turn
```

### 5. Test AI Flows in Genkit Dev UI
After creating any AI flow:
```bash
npm run genkit:dev
```
Then open http://localhost:4000 to:
- Test prompts with different inputs
- Validate structured outputs
- Monitor token usage
- Debug flow logic
- Iterate on prompt engineering

## Common Issues and Solutions

### Issue: "Module access denied for user"
**Solution:**
```
@04-MODULE-ARCHITECTURE.md Reference the feature flag system
@03-DATABASE-SCHEMA.md Check the tenants collection schema

Debug module access:
1. Verify user's tenant document has correct modules array
2. Check useFeatureAccess hook is returning true
3. Validate FeatureGate component is wrapping the route
4. Test with different pricing tiers (founder, sales_starter, growth, complete)
```

### Issue: "Genkit flow not streaming responses"
**Solution:**
```
@05-AI-FLOWS-LIBRARY.md Reference streaming configuration
@01-TECHNICAL-ARCHITECTURE.md Check Genkit setup

Fix streaming:
1. Add streamingCallback to flow definition
2. Use ai.generateStream() instead of ai.generate()
3. Implement proper client-side streaming with useChat hook
4. Test in Genkit Dev UI first
```

### Issue: "Firebase Security Rules blocking write"
**Solution:**
```
@03-DATABASE-SCHEMA.md Reference security rules for the collection

Debug security rules:
1. Check Firestore Rules tab in Firebase Console
2. Verify user authentication state
3. Test rule with Rules Playground
4. Ensure tenant_id matches user's tenant
5. Validate module access for the operation
```

### Issue: "AI flow consuming too many tokens"
**Solution:**
```
@05-AI-FLOWS-LIBRARY.md Reference token optimization strategies
@01-TECHNICAL-ARCHITECTURE.md Check cost optimization section

Optimize token usage:
1. Reduce system prompt length (remove examples if not needed)
2. Implement conversation summarization for long threads
3. Cache common responses with retrieval
4. Use temperature=0 for deterministic outputs to enable caching
5. Monitor with Vertex AI usage dashboard
```

### Issue: "Course content not generating correctly"
**Solution:**
```
@09-CONTENT-GENERATION.md Reference the framework extraction process
@07-PEDAGOGICAL-PATTERNS.md Validate lesson structure

Debug content generation:
1. Check manuscript parsing for framework detection
2. Validate lesson template is populating all sections
3. Test with a single lesson first
4. Review generated content for pedagogical pattern adherence
5. Adjust prompts based on output quality
```

## Using Different AI Coding Assistants

### Cursor AI
- **Composer (Cmd/Ctrl + I)**: Multi-file changes, complex features
- **Chat (Cmd/Ctrl + L)**: Questions, debugging, refinements
- **Best for**: Rapid iteration, familiar codebase navigation

### Google Antigravity
- **Chat Interface**: Natural language task delegation
- **Best for**: Large-scale generation, Google ecosystem integration
- **Optimization**: Works especially well with Gemini + Firebase patterns

### Both Work With
- Context file loading via `@filename`
- Step-by-step prompt execution
- Iterative refinement
- Documentation references

## Checkpoints and Testing

### After Module Configuration
- [ ] All three modules defined in config/modules.ts
- [ ] Feature flags working per pricing tier
- [ ] Module switcher renders correctly
- [ ] FeatureGate blocks access appropriately
- [ ] UpgradePrompt shows for locked features
- [ ] All TypeScript types correct

### After First Course Deployment
- [ ] Course appears in catalog
- [ ] Lessons render with proper formatting
- [ ] Progress tracking persists to Firestore
- [ ] Navigation between lessons works
- [ ] Assessment submits and scores correctly
- [ ] Certificate generates on completion
- [ ] Mobile/tablet layouts work

### After First AI Flow
- [ ] Genkit Dev UI shows flow
- [ ] Prompt generates expected output
- [ ] Structured output validates with schema
- [ ] Streaming works (if enabled)
- [ ] State persists to Firestore
- [ ] Error handling catches failures
- [ ] Token usage is reasonable (<2000 tokens/interaction)

### After First Framework Builder
- [ ] Form validates inputs properly
- [ ] AI coaching provides helpful guidance
- [ ] Multi-turn dialogue maintains context
- [ ] Auto-save prevents data loss
- [ ] Export generates clean PDF
- [ ] Strategic evaluation gives actionable feedback
- [ ] Works on mobile (touch interactions)

### After Payment Integration
- [ ] Stripe checkout flow completes
- [ ] Webhook updates Firestore tenant
- [ ] Module access enables immediately
- [ ] Receipt email sends
- [ ] Subscription management works
- [ ] Downgrade/upgrade paths function
- [ ] Cancel flow gracefully handles

## Performance Targets

**Technical:**
- Lighthouse Performance: 85+ (acceptable for AI-heavy app)
- Lighthouse Accessibility: 100
- Initial Bundle: <800KB (AI features add weight)
- Time to Interactive: <4s on 3G
- AI Response Time: <3s for first token
- Firestore Query Time: <500ms average

**User Experience:**
- Onboarding completion: >70% (complex product)
- Course start rate: >50%
- Lesson completion rate: >40% (vs. industry 3-15%)
- Tool usage: >60% of enrolled users
- Weekly active users: >30% of total

**Business:**
- Free-to-paid conversion: >8%
- Churn rate: <5% monthly
- NPS Score: >50
- First business milestone: 30 days average
- First $1K MRR: 90 days average

## Success Metrics by Module

### Founder Academy
- Average lessons completed: 40+ (out of ~200)
- Framework builders used: 3+ per user
- Google Drive documents analyzed: 5+ per user
- Strategic thinking scores: 75+ average
- Business milestones achieved: 2+ in first 90 days

### Sales Training
- Role-play sessions completed: 10+ per user
- Average role-play score: 70+ (improving over time)
- Sales methodologies mastered: 2+ (SPIN, MEDDIC, or Challenger)
- Real sales calls improved: 60%+ report improvement
- Deal velocity improvement: 20%+ vs. baseline

### Sales Enablement
- Gmail contacts synced: 50+ average
- Knowledge documents processed: 20+ per organization
- Email sequences active: 3+ per user
- Pipeline deals tracked: 10+ per user
- Team collaboration: 5+ users per organization

## Next Steps After MVP

Once you have the basic platform working:

1. **Content Expansion**: Deploy all 20 courses across 4 tracks
2. **Beta Testing**: 50-100 real founders, gather feedback
3. **AI Optimization**: Improve prompts based on interaction data
4. **Community Features**: Discussion forums, accountability pods
5. **Advanced Tools**: Pitch deck analyzer, financial model validator
6. **Mobile Apps**: React Native iOS/Android
7. **API Access**: Let advanced users integrate with their tools
8. **White Label**: Enable agencies to resell with their branding
9. **Certification Programs**: Formal credentials for course completion
10. **Marketplace**: Let founders sell their courses/frameworks

## Getting Help

### From AI Assistant
```
I'm stuck on [specific problem].

Context:
- Module: [founder_academy / sales_training / sales_enablement]
- Feature: [what you're building]
- What I've tried: [attempts made]
- Error/Issue: [specific problem with logs]

Files involved:
@src/path/to/file.tsx
@relevant/context/file.md

Expected: [what should happen]
Actual: [what's happening]
```

### From Documentation
- Firebase: firebase.google.com/docs
- Genkit: firebase.google.com/docs/genkit
- Next.js: nextjs.org/docs
- Gemini: ai.google.dev
- Tailwind: tailwindcss.com/docs
- Framer Motion: framer.com/motion

### From Context Files
- Technical â†’ @01-TECHNICAL-ARCHITECTURE.md
- Design â†’ @02-DESIGN-SYSTEM.md
- Database â†’ @03-DATABASE-SCHEMA.md
- Modules â†’ @04-MODULE-ARCHITECTURE.md
- AI Flows â†’ @05-AI-FLOWS-LIBRARY.md
- Components â†’ @06-INTERACTIVE-COMPONENTS.md
- Pedagogy â†’ @07-PEDAGOGICAL-PATTERNS.md
- Automation â†’ @08-CURSOR-PROMPTS.md
- Content â†’ @09-CONTENT-GENERATION.md
- Gamification â†’ @10-GAMIFICATION-SYSTEM.md

## Development Environment Setup

### Required Tools
```bash
# Node.js 18+ and npm
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher

# Firebase CLI
npm install -g firebase-tools
firebase --version

# Git
git --version

# Code editor with AI assistant
# Cursor: cursor.sh
# OR Google Antigravity: antigravity.google
```

### Environment Variables
Create `.env.local`:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Genkit (for development)
GOOGLE_GENAI_API_KEY=your_gemini_api_key

# Vertex AI (for production)
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=us-central1

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Google Workspace Integration
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Genkit Dev UI
npm run genkit:dev

# Run Firebase emulators (local testing)
firebase emulators:start

# Deploy Firestore security rules
firebase deploy --only firestore:rules

# Deploy Cloud Functions
firebase deploy --only functions

# Deploy to Firebase Hosting
npm run build
firebase deploy --only hosting

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when implemented)
npm run test
```

---

**Remember**: Build incrementally, test AI flows frequently, validate module access, and use context files as your source of truth. Start with Founder Academy MVP, then expand to Sales Training and Sales Enablement in phases.