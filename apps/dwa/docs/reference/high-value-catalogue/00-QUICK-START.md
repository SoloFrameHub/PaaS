# Quick Start Guide - Building with Cursor AI

## Overview

This guide helps you use Cursor AI to build a professional mental health education platform. You have 5 context files that work together:

1. **01-TECHNICAL-ARCHITECTURE.md** - Stack, structure, dependencies
2. **02-DESIGN-SYSTEM.md** - Colors, typography, components
3. **03-DATABASE-SCHEMA.md** - Supabase tables, RLS, functions
4. **04-INTERACTIVE-COMPONENTS.md** - Pre-built tool components
5. **05-CURSOR-PROMPTS.md** - Step-by-step building prompts

## Getting Started (First 30 Minutes)

### Step 1: Project Initialization
Open Cursor Composer (Cmd/Ctrl + I) and run:
```
@05-CURSOR-PROMPTS.md Execute "Prompt 1: Initialize React + TypeScript + Vite Project"
```

This will:
- Create the Vite project
- Install all dependencies
- Set up folder structure
- Configure Tailwind, TypeScript, ESLint

### Step 2: Setup Supabase
1. Create a free Supabase account at supabase.com
2. Create a new project
3. Copy your project URL and anon key
4. In Cursor, run:
```
@05-CURSOR-PROMPTS.md Execute "Prompt 2: Setup Supabase Client and Authentication"
@01-TECHNICAL-ARCHITECTURE.md Reference the authentication flow section
```

### Step 3: Initialize Database
In Supabase dashboard SQL editor, run migrations from:
```
@05-CURSOR-PROMPTS.md Execute "Prompt 3: Initialize Database Schema"
@03-DATABASE-SCHEMA.md Use the complete schema
```

### Step 4: Build Design System
```
@05-CURSOR-PROMPTS.md Execute "Prompt 4: Build Design System Foundation"
@02-DESIGN-SYSTEM.md Reference all color and typography specs
```

## Development Workflow

### Daily Development Pattern

1. **Start with Composer**: Use Cmd/Ctrl + I for complex tasks
2. **Reference Context**: Always use `@filename` to load relevant context
3. **Iterate in Chunks**: Build features in small, testable pieces
4. **Test Frequently**: Check in browser after each component

### Example: Building Sleep Tracker

```
Session 1 (30 minutes):
@05-CURSOR-PROMPTS.md Execute "Prompt 8: Build Sleep Tracker Tool"
@04-INTERACTIVE-COMPONENTS.md Reference SleepDiaryForm component
@02-DESIGN-SYSTEM.md Ensure design consistency

Session 2 (20 minutes):
Test the form, identify issues, ask Cursor to fix:
"The sleep quality emoji selector isn't working on mobile. Fix touch interactions."

Session 3 (15 minutes):
Add the trend chart:
@04-INTERACTIVE-COMPONENTS.md Reference SleepTrendChart component
"Create the trend chart with Recharts"
```

## Recommended Build Order

### Week 1: Foundation (10-15 hours)
- ✅ Project setup and dependencies
- ✅ Design system (UI components)
- ✅ Database schema
- ✅ Authentication system
- ✅ Layout components (Header, Footer, Navigation)
- ✅ Dashboard skeleton

### Week 2: Course System (15-20 hours)
- ✅ Course catalog and cards
- ✅ Course detail pages
- ✅ Lesson viewer system
- ✅ Progress tracking
- ✅ Module navigation
- ✅ Basic assessments

### Week 3: Interactive Tools (15-20 hours)
- ✅ Sleep Tracker (diary + charts)
- ✅ Mood Logger
- ✅ Thought Record (anxiety tool)
- ✅ Medication scheduler
- ✅ Tool dashboard integration

### Week 4: Polish & Deploy (10-15 hours)
- ✅ Accessibility audit and fixes
- ✅ Performance optimization
- ✅ Error handling
- ✅ Content seeding
- ✅ Deploy to Vercel
- ✅ Testing with real users

## Tips for Working with Cursor

### 1. Load Context Before Prompting
**Bad:**
```
Create a button component
```

**Good:**
```
@02-DESIGN-SYSTEM.md Reference the Button component section
@05-CURSOR-PROMPTS.md Follow the design system implementation pattern

Create a Button component with all variants (primary, secondary, outline, ghost, danger) and sizes (sm, md, lg). Include proper TypeScript types and accessibility features.
```

### 2. Be Specific About Files
**Bad:**
```
Add authentication
```

**Good:**
```
@01-TECHNICAL-ARCHITECTURE.md Reference the authentication flow

Create these three files:
1. src/lib/supabase/client.ts - Supabase client setup
2. src/hooks/useAuth.ts - Authentication hook
3. src/components/ProtectedRoute.tsx - Route protection

Follow the exact implementation in the technical architecture document.
```

### 3. Reference Examples
**Bad:**
```
Make a form for logging sleep
```

**Good:**
```
@04-INTERACTIVE-COMPONENTS.md Look at the SleepDiaryForm component

Create this exact component with:
- Date picker for log_date
- Time inputs for bedtime/wake_time
- Emoji scale for sleep quality (1-5)
- All form validation with Zod
- Mutation to sleep_logs table
```

### 4. Iterate, Don't Recreate
If something isn't quite right:
```
@src/components/ui/Button.tsx

The hover effect is too abrupt. Make it smooth with a 200ms transition. Also increase the hover state background from primary-500 to primary-600 for better contrast.
```

### 5. Use Chat for Debugging
When you hit an error, copy the full error into Chat:
```
I'm getting this TypeScript error:
[paste full error]

The error is in @src/components/tools/SleepTracker/SleepDiaryForm.tsx on line 45.

Fix this while maintaining type safety and proper React Hook Form integration.
```

## Common Issues and Solutions

### Issue: "Cannot find module '@/components/ui/Button'"
**Solution:**
```
@vite.config.ts

Add path alias configuration:
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Issue: "Supabase RLS policies blocking my queries"
**Solution:**
```
@03-DATABASE-SCHEMA.md Reference the RLS policies section

Debug my RLS policy for the sleep_logs table. I'm getting "permission denied" when querying as an authenticated user. Here's my query: [paste query]
```

### Issue: "Tailwind classes not applying"
**Solution:**
```
@tailwind.config.js

Verify the content paths include all component files:
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### Issue: "Form validation not showing errors"
**Solution:**
```
@src/components/tools/SleepTracker/SleepDiaryForm.tsx

The form.formState.errors object isn't updating. I'm using React Hook Form with Zod. Fix the validation error display.
```

## Using Composer vs Chat

### Use Composer (Cmd/Ctrl + I) when:
- Creating new components from scratch
- Implementing entire features
- Setting up configuration files
- Following step-by-step prompts
- Making changes across multiple files

### Use Chat (Cmd/Ctrl + L) when:
- Debugging specific errors
- Asking questions about code
- Getting explanations
- Small refinements to existing code
- Quick fixes

## Keyboard Shortcuts

- **Cmd/Ctrl + I**: Open Composer (for building)
- **Cmd/Ctrl + L**: Open Chat (for questions)
- **Cmd/Ctrl + K**: Quick AI edit (inline)
- **Cmd/Ctrl + Shift + K**: Generate code at cursor
- **Tab**: Accept AI suggestion
- **Esc**: Reject AI suggestion

## Checkpoints and Testing

After each major component, create a checkpoint:

### Component Checklist
- [ ] TypeScript compiles without errors
- [ ] Component renders in browser
- [ ] All props typed correctly
- [ ] Styling matches design system
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] No console errors or warnings

### Tool Checklist
- [ ] Form validation works
- [ ] Data saves to Supabase correctly
- [ ] Data appears in Supabase dashboard
- [ ] Loading states show appropriately
- [ ] Error states display helpful messages
- [ ] Success feedback confirms action

### Page Checklist
- [ ] Routing works correctly
- [ ] Protected routes redirect if not authenticated
- [ ] Data loads from Supabase
- [ ] Page is accessible (keyboard + screen reader)
- [ ] Mobile layout looks good
- [ ] Performance is acceptable (no lag)

## Getting Help

### From Cursor AI
```
I'm stuck on [specific problem].

Context:
- I'm trying to [what you're attempting]
- I've tried [what you've attempted]
- The error/issue is [specific problem]

Files involved:
@src/path/to/file.tsx

Expected behavior: [what should happen]
Actual behavior: [what's happening]
```

### From Documentation
- React Hook Form: react-hook-form.com
- TanStack Query: tanstack.com/query
- Supabase: supabase.com/docs
- Framer Motion: framer.com/motion
- Tailwind CSS: tailwindcss.com/docs
- Recharts: recharts.org

### From Context Files
- Technical questions → @01-TECHNICAL-ARCHITECTURE.md
- Design questions → @02-DESIGN-SYSTEM.md
- Database questions → @03-DATABASE-SCHEMA.md
- Component questions → @04-INTERACTIVE-COMPONENTS.md
- How-to questions → @05-CURSOR-PROMPTS.md

## Next Steps After MVP

Once you have the basic platform working:

1. **Content Creation**: Write actual lesson content for all courses
2. **Beta Testing**: Invite 10-20 users, gather feedback
3. **Analytics**: Add Vercel Analytics or Plausible
4. **Email**: Set up transactional emails (welcome, course completion)
5. **Payment**: Integrate Stripe for premium courses
6. **Community**: Add optional discussion forums
7. **Mobile App**: Consider React Native version
8. **AI Features**: Add personalized recommendations

## Success Metrics

Track these to measure progress:

**Technical:**
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Bundle size: <500KB initial
- Time to Interactive: <3s

**User Experience:**
- Onboarding completion: >80%
- Course start rate: >60%
- Lesson completion rate: >50%
- Tool usage: >40% of users

**Clinical:**
- Pre/post assessment improvements
- User-reported symptom changes
- Treatment engagement increases
- Provider satisfaction scores

---

Remember: Build incrementally, test frequently, and use the context files as your source of truth. Cursor is a powerful tool when given clear, specific prompts with proper context.
