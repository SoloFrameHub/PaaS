# Cursor AI Development Prompts

This file contains specific prompts to use with Cursor AI (Composer mode recommended) for building the mental health education platform. Each prompt references the context files and provides clear instructions.

## Initial Project Setup

### Prompt 1: Initialize React + TypeScript + Vite Project

```
Create a new React + TypeScript project using Vite with the following specifications:

1. Initialize with: npm create vite@latest mental-health-platform -- --template react-ts
2. Install all dependencies from 01-TECHNICAL-ARCHITECTURE.md "Core Dependencies" section
3. Configure Tailwind CSS following the setup in 02-DESIGN-SYSTEM.md
4. Set up the folder structure exactly as specified in 01-TECHNICAL-ARCHITECTURE.md
5. Create .env.example with all required environment variables
6. Configure vite.config.ts with path aliases: '@' pointing to './src'
7. Set up TypeScript with strict mode enabled
8. Configure ESLint and Prettier

Create all necessary config files (tailwind.config.js, tsconfig.json, .eslintrc.json) with appropriate settings for a production mental health application.
```

### Prompt 2: Setup Supabase Client and Authentication

```
Using the 01-TECHNICAL-ARCHITECTURE.md authentication flow as reference:

1. Create src/lib/supabase/client.ts with properly typed Supabase client
2. Create src/hooks/useAuth.ts implementing the authentication hook with session management
3. Create src/components/ProtectedRoute.tsx for route protection
4. Set up OAuth configuration for Google and Facebook
5. Create basic login and signup pages in src/pages/auth/
6. Implement automatic token refresh and session persistence
7. Add proper error handling for authentication failures

Ensure all TypeScript types are properly defined and RLS policies are documented in code comments.
```

### Prompt 3: Initialize Database Schema in Supabase

```
Using 03-DATABASE-SCHEMA.md as the complete reference:

1. Create Supabase migration files for all tables in the correct order (handle foreign key dependencies)
2. Set up Row-Level Security (RLS) policies for every table
3. Create all database functions (calculate_sleep_efficiency, update_updated_at_column, etc.)
4. Set up database triggers (on_auth_user_created, sleep_efficiency_trigger, etc.)
5. Generate TypeScript types: npx supabase gen types typescript > src/types/database.types.ts
6. Create initial seed data for at least one complete course with modules and lessons

Provide the complete migration files ready to run with: supabase db push
```

## Design System Implementation

### Prompt 4: Build Design System Foundation

```
Using 02-DESIGN-SYSTEM.md specifications:

1. Configure Tailwind with the complete color palette (primary, secondary, neutral, semantic)
2. Set up typography scale with Inter and Plus Jakarta Sans fonts
3. Implement the 8-point spacing system
4. Create src/styles/globals.css with base styles and custom animations
5. Build core UI components in src/components/ui/:
   - Button (all variants: primary, secondary, outline, ghost, danger)
   - Card (with hover effects)
   - Input (with validation states)
   - Modal (with Framer Motion animations)
   - ProgressBar (linear and circular versions)

Each component should:
- Use Tailwind classes exclusively
- Support dark mode (if enabled)
- Be fully accessible (WCAG 2.2 AA)
- Include proper TypeScript types
- Have size variants (sm, md, lg)
- Respect prefers-reduced-motion

Create a Storybook-style preview page showcasing all components.
```

### Prompt 5: Implement Layout Components

```
Create the core layout components with trauma-informed design principles:

1. Header component (src/components/layout/Header.tsx):
   - Include crisis resources banner (always visible)
   - Main navigation with responsive hamburger menu
   - User menu with avatar and logout
   - Sticky positioning

2. Footer component with:
   - Crisis hotline information (988, Crisis Text Line)
   - Links to privacy policy, terms of service, contact
   - Accessibility statement

3. Navigation component:
   - Course catalog link
   - Dashboard link
   - Profile/Settings
   - Highlight current page
   - Keyboard accessible

4. CrisisResources component:
   - Non-alarming but immediately visible
   - Click to expand full resources
   - Phone and text options
   - "Having a crisis?" clear messaging

Ensure all components use the design system consistently and include proper ARIA labels.
```

## Course Content Components

### Prompt 6: Build Lesson Viewer System

```
Create a compound component system for lesson viewing:

1. LessonViewer parent component (src/components/course/LessonViewer/index.tsx):
   - Use React Context to share state between child components
   - Track current position and auto-save progress every 30 seconds
   - Support video, text, interactive, and mixed content types
   - Implement lazy loading for heavy content

2. Child components:
   - LessonHeader: Title, module context, progress bar, exit button
   - LessonContent: Renders appropriate content based on type
   - LessonSidebar: Lesson outline, notes, bookmarks (collapsible on mobile)
   - LessonFooter: Previous/Next navigation, mark complete button

3. Features to implement:
   - Video position tracking with last-position-seconds
   - Text content with reading time estimation
   - Interactive exercises embedded inline
   - Reflection prompts with text area saving to user_lesson_progress.notes
   - Keyboard shortcuts (← previous, → next, Escape exit)

Ensure smooth transitions between lessons using Framer Motion, respecting reduced motion preferences.
```

### Prompt 7: Create Course Card and Catalog

```
Build the course discovery interface:

1. CourseCard component (src/components/course/CourseCard.tsx):
   - Course title, subtitle, cover image
   - Estimated hours, difficulty level badges
   - Progress indicator if enrolled
   - Hover effect with subtle lift
   - "Start Course" or "Continue" CTA

2. CourseCatalog page (src/pages/CourseCatalog.tsx):
   - Grid layout responsive (1 col mobile, 2 tablet, 3 desktop)
   - Filter by tier, difficulty, topic
   - Search functionality
   - Featured courses section
   - Loading states with skeleton screens

3. CourseDetail page (src/pages/CourseDetail.tsx):
   - Hero section with cover image
   - Detailed description and learning objectives
   - Instructor credentials with photo
   - Expandable module/lesson list
   - Sample lesson preview
   - Enrollment button (mutation to user_course_enrollments)
   - User testimonials section

Use TanStack Query for data fetching with proper loading and error states.
```

## Interactive Tools Implementation

### Prompt 8: Build Sleep Tracker Tool

```
Implement the complete Sleep Tracker tool using 04-INTERACTIVE-COMPONENTS.md as reference:

1. Create SleepDiaryForm component exactly as specified:
   - All form fields with proper validation (Zod schema)
   - Emoji-based rating scales
   - Time pickers for bedtime/wake time
   - Auto-calculate sleep efficiency
   - Success toast on save
   - Form reset after submission

2. Create SleepTrendChart component:
   - Use Recharts for visualization
   - Line chart showing sleep hours and efficiency
   - Date range selector (7, 14, 30 days)
   - Display average sleep and efficiency stats
   - Responsive design for mobile

3. Create SleepTracker main page (src/pages/tools/SleepTracker.tsx):
   - Tab interface: "Log Sleep" and "View Trends"
   - Calendar heatmap showing entry dates
   - Quick stats cards
   - Educational tips sidebar

Integrate with Supabase sleep_logs table with proper RLS policies.
```

### Prompt 9: Build Anxiety Toolkit Components

```
Create the anxiety management tools from 04-INTERACTIVE-COMPONENTS.md:

1. ThoughtRecord component with 7-step progression:
   - Progressive disclosure (one step at a time)
   - Progress indicator (percentage and visual bar)
   - Back/Next navigation
   - Auto-save drafts to localStorage
   - Final submission to thought_records table
   - Emotion intensity sliders with before/after comparison
   - Success celebration on completion

2. CopingStrategyLibrary component:
   - Searchable strategy cards
   - Filters: situation type, anxiety level, time available
   - Strategy cards with expandable instructions
   - Favorite/bookmark functionality
   - Effectiveness rating after use
   - Video demonstrations (embedded YouTube)

3. GuidedExercises component:
   - Box breathing visualization (animated square)
   - 5-4-3-2-1 grounding with sequential prompts
   - Progressive muscle relaxation audio guide
   - Timer and completion tracking

Save usage data to anxiety_episodes table for pattern analysis.
```

### Prompt 10: Build Nutrition Tracking Tools

```
Implement food-mood correlation tracking:

1. MealMoodLogger component (from 04-INTERACTIVE-COMPONENTS.md):
   - Meal type and time selection
   - Food tagging system (add/remove foods)
   - Before/after mood and energy scales
   - Mediterranean diet scoring
   - Optional notes
   - Save to food_mood_logs table

2. FoodMoodAnalytics component:
   - Correlation analysis after 2+ weeks of data
   - Visualizations showing patterns
   - "Your energy is 30% higher on days with protein-rich breakfast" insights
   - Food category filtering
   - Export data for providers

3. MealPlanner component:
   - Weekly calendar grid
   - Recipe database with Mediterranean diet adherence scores
   - Drag-and-drop meal planning
   - Auto-generated shopping list
   - Budget estimation

Use JSONB columns effectively for flexible food data storage.
```

### Prompt 11: Build Medication Tracking System

```
Create comprehensive medication management tools:

1. MedicationSchedule component (04-INTERACTIVE-COMPONENTS.md):
   - Today's medication list with checkboxes
   - Visual notification for pending doses
   - Quick-log taken/skipped with timestamps
   - Side effect recording
   - Adherence percentage calculation

2. MedicationManager component:
   - Add/edit medications (name, dosage, frequency, times)
   - Set start/end dates
   - Active/inactive status
   - Recurring schedule generation

3. AdherenceReport component:
   - Calendar heatmap of adherence
   - Weekly/monthly adherence percentages
   - Side effects timeline
   - Exportable report for appointments

4. Push notifications (optional):
   - Reminder system using Web Push API
   - User-controlled notification times
   - Snooze functionality

Implement proper data encryption for sensitive medication data.
```

## Dashboard and Progress Tracking

### Prompt 12: Build User Dashboard

```
Create a personalized dashboard following the UX flows in context docs:

1. Dashboard page layout (src/pages/Dashboard.tsx):
   - Welcome message with user's name
   - Current focus section: "Continue where you left off"
   - Progress overview cards (ProgressOverview component from 04-INTERACTIVE-COMPONENTS.md)
   - Quick access to interactive tools
   - Recent activity feed
   - Personalized course recommendations

2. Progress visualization:
   - Circular progress for each enrolled course
   - Linear bars for modules within courses
   - Streak counter with visual calendar
   - Total time invested
   - Completed lessons count

3. Quick actions:
   - One-click lesson resume
   - Tool shortcuts (sleep log, mood check-in)
   - Optional daily check-in modal

4. Insights section:
   - "Your mood improved 20% this week" type data
   - Sleep quality trends
   - Anxiety reduction metrics
   - Encouraging, non-judgmental language

Use TanStack Query with aggressive caching for dashboard data.
```

### Prompt 13: Implement Onboarding Flow

```
Build the multi-step onboarding experience:

1. Welcome screen (src/pages/onboarding/Welcome.tsx):
   - Warm, professional greeting
   - Platform value proposition
   - "Let's personalize your experience" CTA
   - Progress indicator (Step 1 of 4)

2. Goals screen:
   - "What brings you here?" with selectable cards
   - Multiple selection allowed
   - Options: Sleep, Anxiety, Nutrition, Medications, General Wellness
   - Experience level: Beginner, Some Knowledge, Experienced

3. Preferences screen:
   - Learning style: Video, Reading, Interactive, Mixed
   - Pace: Leisurely (15min/day), Moderate (30min/day), Intensive (45min/day)
   - Notification times and frequency
   - Accessibility options: reduced motion, text size, high contrast

4. Course selection screen:
   - Based on goals, recommend 1-2 starter courses
   - Visual course cards with clear expectations
   - "Start This Course" buttons
   - Option to explore full catalog

5. Completion:
   - Save all preferences to user_profiles table
   - Enroll in selected courses
   - Redirect to dashboard
   - Send welcome email

Persist progress in case of interruption, allow back navigation.
```

## Testing and Quality Assurance

### Prompt 14: Implement Accessibility Features

```
Ensure WCAG 2.2 Level AA compliance throughout the application:

1. Keyboard navigation:
   - All interactive elements tabbable
   - Visual focus indicators (2px outline, primary-400 color)
   - Skip links to main content
   - Escape key closes modals
   - Arrow keys navigate lesson outlines

2. Screen reader optimization:
   - Proper ARIA labels on all buttons/links
   - ARIA live regions for dynamic content
   - Form field descriptions with aria-describedby
   - Progress announcements

3. Color contrast:
   - Run axe DevTools audit on all pages
   - Fix any contrast issues
   - Provide high-contrast mode option

4. Reduced motion:
   - Respect prefers-reduced-motion in all animations
   - Test with reduced motion enabled

5. Form accessibility:
   - Labels properly associated with inputs
   - Inline validation with clear error messages
   - Required field indicators
   - Success confirmations

Create AccessibilitySettings component in user preferences.
```

### Prompt 15: Setup Error Handling and Monitoring

```
Implement comprehensive error handling:

1. Error boundaries:
   - Wrap major sections (Dashboard, Course pages, Tools)
   - Friendly error fallback UI
   - "Try again" functionality
   - Error logging to Sentry

2. Network error handling:
   - Offline detection with banner
   - Automatic retry for failed mutations (3 attempts)
   - Queue mutations for later sync
   - Loading states for all async operations

3. Form validation errors:
   - Inline, constructive error messages
   - Non-judgmental tone
   - Clear next steps
   - No shame language

4. Database errors:
   - Handle constraint violations gracefully
   - Provide user-friendly error messages
   - Log technical details server-side

5. Authentication errors:
   - Session expiration handling
   - Clear re-authentication prompts
   - Preserve user's work (localStorage drafts)

Setup Sentry for production error tracking.
```

## Deployment and Production

### Prompt 16: Optimize Performance

```
Implement performance optimizations:

1. Code splitting:
   - Lazy load route components
   - Dynamic imports for heavy tools (chart libraries, video players)
   - Separate vendor chunks

2. Image optimization:
   - Convert images to WebP with JPEG fallback
   - Implement responsive images with srcset
   - Lazy load below-fold images
   - Compress with TinyPNG

3. Caching strategy:
   - TanStack Query cache configuration:
     - Course content: staleTime 1 hour
     - User progress: staleTime 5 minutes
     - Tool logs: invalidate on mutation
   - Service worker for offline course content

4. Bundle optimization:
   - Analyze bundle with vite-plugin-inspect
   - Tree-shake unused code
   - Minimize CSS with PurgeCSS

5. Lighthouse audit:
   - Target 90+ scores on all metrics
   - Fix performance issues
   - Optimize Core Web Vitals

Run: npm run build && vite-bundle-visualizer
```

### Prompt 17: Setup Vercel Deployment

```
Configure production deployment to Vercel:

1. Create vercel.json with:
   - Build command: npm run build
   - Output directory: dist
   - Environment variables configuration
   - Redirects for SPA routing

2. Setup preview deployments:
   - Automatic preview for all PRs
   - Preview URLs for testing
   - Environment variables for preview/production

3. Configure domains:
   - Custom domain setup
   - SSL certificates
   - Redirects from www to apex domain

4. Setup Supabase production:
   - Create production project
   - Run migrations
   - Configure environment variables
   - Setup database backups
   - Enable Supabase Auth production mode

5. CI/CD pipeline:
   - GitHub Actions for TypeScript checks
   - ESLint on pull requests
   - Automated tests
   - Lighthouse CI audits

Create deployment checklist and rollback procedures.
```

## Content Population

### Prompt 18: Create Course Content Seeder

```
Build a content seeding system for the four Tier 1 courses:

1. Create seed data structure:
   - JSON files for each course with complete content
   - Modules with learning objectives
   - Lessons with content, video URLs, estimated times
   - Assessments with questions and scoring

2. Seeder script (src/scripts/seedCourses.ts):
   - Read JSON files
   - Insert courses, modules, lessons in order
   - Handle foreign key relationships
   - Create sample assessments
   - Generate lesson content_json for interactive elements

3. Content structure for each Tier 1 course:
   - Sleep Mastery: 6 weeks, 8 modules, ~25 lessons
   - Nutrition for Mental Health: 5 weeks, 7 modules, ~20 lessons
   - Anxiety Toolkit: 8 weeks, 10 modules, ~30 lessons
   - Understanding Your Medications: 4 weeks, 6 modules, ~18 lessons

4. Sample content:
   - Write compelling lesson introductions
   - Create realistic scenarios
   - Draft assessment questions
   - Include key takeaways

Run with: npm run seed:courses
```

## Cursor-Specific Tips

### Using Composer Mode Effectively

1. **Load Context Files**: Before starting work, use `@filename` to reference context:
   ```
   @01-TECHNICAL-ARCHITECTURE.md @02-DESIGN-SYSTEM.md
   Create the Button component following the design system specifications...
   ```

2. **Iterative Refinement**: Break large prompts into smaller steps:
   - First: "Create basic Button component structure"
   - Then: "Add all variant styles and sizes"
   - Finally: "Add accessibility features and TypeScript types"

3. **Reference Examples**: Point Cursor to existing code:
   ```
   @04-INTERACTIVE-COMPONENTS.md Look at the SleepDiaryForm component.
   Create a similar MoodLogger component with...
   ```

4. **Fix-Focused Prompts**: When debugging:
   ```
   This component has a TypeScript error on line 45.
   The error is: [paste error].
   Fix this while maintaining type safety.
   ```

### Multi-File Operations

1. **Batch Creation**: Create multiple related files at once:
   ```
   Create these three components in src/components/tools/:
   1. SleepTracker/index.tsx (main component)
   2. SleepTracker/SleepDiaryForm.tsx (form)
   3. SleepTracker/SleepTrendChart.tsx (chart)
   
   Use the specifications from @04-INTERACTIVE-COMPONENTS.md
   ```

2. **Refactoring**: Extract common code:
   ```
   @src/components/course/CourseCard.tsx
   @src/components/course/ModuleCard.tsx
   
   These components have duplicate code for the difficulty badge.
   Extract this into a shared DifficultyBadge component.
   ```

### Testing Prompts

```
Create React Testing Library tests for:
@src/components/ui/Button.tsx

Test cases:
- Renders all variants correctly
- Click handler fires
- Disabled state prevents clicks
- Keyboard navigation works (Enter, Space)
- ARIA labels are correct
```

## Common Patterns to Reuse

### Mutation Pattern
```typescript
const mutation = useMutation({
  mutationFn: async (data) => {
    const { error } = await supabase.from('table').insert(data)
    if (error) throw error
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['key'] })
    toast.success('Saved!')
  },
  onError: (error) => {
    toast.error('Failed to save. Please try again.')
  },
})
```

### Protected Page Pattern
```typescript
export default function ProtectedPage() {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" />
  
  return <PageContent />
}
```

### Form Pattern
```typescript
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { ... },
})

const onSubmit = async (data: FormData) => {
  await mutation.mutateAsync(data)
}

return (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    {/* fields */}
  </form>
)
```

Use these patterns consistently throughout the application.
