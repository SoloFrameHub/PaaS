# Design System - UI Standards & Component Library

**File:** 02-DESIGN-SYSTEM.md  
**Purpose:** Complete visual design system for the strategic thinking environment  
**Dependencies:** 01-TECHNICAL-ARCHITECTURE.md  
**Estimated Size:** 20KB

---

## Design Philosophy

The Solo Founder Platform employs a **"calm, focused aesthetic"** specifically designed for deep strategic work. This is not a high-energy, gamified interfaceâ€”it's a thoughtful environment for building lasting businesses.

### Core Principles

**1. Calm, Focused Aesthetic**
- Minimal distractions, ample white space
- Muted color palette with strategic accent usage
- Typography optimized for extended reading
- No anxiety-inducing countdown timers or urgency messaging

**2. Strategic Builder/Architect Theme**
- Visual metaphors: blueprints, frameworks, foundations
- Professional, competent feeling
- Emphasis on structure and systems
- Tools feel substantial and reliable

**3. Depth Over Speed**
- No pressure to rush through content
- Progress indicators show journey, not urgency
- "Continue learning" prompts, not "Don't lose your streak!"
- Reflection encouraged at natural breakpoints

**4. Mobile-First Responsive**
- Touch-optimized interfaces (44x44px minimum)
- Readable typography at all sizes
- Collapsible navigation for small screens
- Progressive enhancement for desktop features

---

## Color System

### Primary Palette (Blues) - Trust & Stability

Professional blue palette conveying reliability and strategic thinking.

```css
:root {
  /* Primary Blues - Main brand color */
  --primary-50: #eff6ff;   /* Lightest tint - backgrounds */
  --primary-100: #dbeafe;  /* Light tint - hover states */
  --primary-200: #bfdbfe;  /* Subtle emphasis */
  --primary-300: #93c5fd;  /* Borders, dividers */
  --primary-400: #60a5fa;  /* Interactive elements */
  --primary-500: #3b82f6;  /* Main brand blue - CTAs */
  --primary-600: #2563eb;  /* Hover on CTAs */
  --primary-700: #1d4ed8;  /* Active states */
  --primary-800: #1e40af;  /* Dark emphasis */
  --primary-900: #1e3a8a;  /* Darkest - headings */
}
```

**Usage Guidelines:**
- `primary-500`: Primary CTAs, active states, brand elements
- `primary-600`: Hover states on primary buttons
- `primary-100`: Subtle backgrounds for highlighted content
- `primary-900`: Strategic headings requiring emphasis

---

### Secondary Palette (Indigo) - Sales Module

Distinct color for sales-related features to create visual hierarchy.

```css
:root {
  --secondary-50: #eef2ff;
  --secondary-100: #e0e7ff;
  --secondary-200: #c7d2fe;
  --secondary-300: #a5b4fc;
  --secondary-400: #818cf8;
  --secondary-500: #6366f1;  /* Sales Training main color */
  --secondary-600: #4f46e5;
  --secondary-700: #4338ca;
  --secondary-800: #3730a3;
  --secondary-900: #312e81;
}
```

**Usage Guidelines:**
- Used exclusively in Sales Training module
- Helps users mentally compartmentalize different academies
- Should never mix with Founder Academy (primary blues)

---

### Accent Palette (Emerald) - Sales Enablement

Fresh, growth-oriented color for enablement features.

```css
:root {
  --accent-50: #ecfdf5;
  --accent-100: #d1fae5;
  --accent-200: #a7f3d0;
  --accent-300: #6ee7b7;
  --accent-400: #34d399;
  --accent-500: #10b981;  /* Enablement main color */
  --accent-600: #059669;
  --accent-700: #047857;
  --accent-800: #065f46;
  --accent-900: #064e3b;
}
```

**Usage Guidelines:**
- Used exclusively in Sales Enablement module
- Represents growth, revenue, and team success
- Pipeline visualizations use emerald gradients

---

### Neutral Palette - Foundation

Extensive neutral palette for UI elements, text, and backgrounds.

```css
:root {
  /* Neutrals - UI foundation */
  --neutral-50: #f9fafb;   /* Page backgrounds */
  --neutral-100: #f3f4f6;  /* Card backgrounds */
  --neutral-200: #e5e7eb;  /* Borders, dividers */
  --neutral-300: #d1d5db;  /* Disabled states */
  --neutral-400: #9ca3af;  /* Placeholder text */
  --neutral-500: #6b7280;  /* Secondary text */
  --neutral-600: #4b5563;  /* Body text */
  --neutral-700: #374151;  /* Emphasized text */
  --neutral-800: #1f2937;  /* Headings */
  --neutral-900: #111827;  /* Darkest text */
  --neutral-950: #030712;  /* Maximum contrast */
}
```

**Usage Guidelines:**
- `neutral-50`: Page backgrounds
- `neutral-100`: Card/panel backgrounds
- `neutral-600`: Default body text
- `neutral-800`: Headings and emphasized content

---

### Semantic Colors

Purpose-driven colors for feedback and status.

```css
:root {
  /* Success */
  --success-50: #f0fdf4;
  --success-500: #10b981;
  --success-700: #047857;
  
  /* Warning */
  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-700: #b45309;
  
  /* Error */
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-700: #b91c1c;
  
  /* Info */
  --info-50: #eff6ff;
  --info-500: #3b82f6;
  --info-700: #1d4ed8;
}
```

**Usage Guidelines:**
- Success: Completed actions, validation passed, milestones
- Warning: Attention needed, review required, approaching limits
- Error: Failed validation, security issues, critical problems
- Info: Neutral notifications, tips, helpful context

---

## Typography

### Font Families

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

**Inter** - Primary typeface
- Professional, highly readable
- Excellent at small sizes
- Wide range of weights available
- Optimized for screens

**JetBrains Mono** - Code and technical content
- Clear distinction between similar characters
- Ligatures for common code patterns
- Consistent spacing

### Type Scale

Based on modular scale (1.25 ratio) for harmonious sizing.

```css
:root {
  /* Font sizes with line heights */
  --text-xs: 0.75rem;      /* 12px - labels, captions */
  --text-xs-lh: 1rem;      /* 16px line height */
  
  --text-sm: 0.875rem;     /* 14px - secondary text */
  --text-sm-lh: 1.25rem;   /* 20px line height */
  
  --text-base: 1rem;       /* 16px - body text */
  --text-base-lh: 1.5rem;  /* 24px line height */
  
  --text-lg: 1.125rem;     /* 18px - emphasized text */
  --text-lg-lh: 1.75rem;   /* 28px line height */
  
  --text-xl: 1.25rem;      /* 20px - section headings */
  --text-xl-lh: 1.75rem;   /* 28px line height */
  
  --text-2xl: 1.5rem;      /* 24px - subsection headings */
  --text-2xl-lh: 2rem;     /* 32px line height */
  
  --text-3xl: 1.875rem;    /* 30px - page headings */
  --text-3xl-lh: 2.25rem;  /* 36px line height */
  
  --text-4xl: 2.25rem;     /* 36px - major headings */
  --text-4xl-lh: 2.5rem;   /* 40px line height */
  
  --text-5xl: 3rem;        /* 48px - hero headings */
  --text-5xl-lh: 1;        /* Tight line height */
}
```

### Font Weights

```css
:root {
  --font-normal: 400;    /* Body text */
  --font-medium: 500;    /* Emphasized text */
  --font-semibold: 600;  /* Subheadings */
  --font-bold: 700;      /* Headings, CTAs */
}
```

**Usage Guidelines:**
- **400 (Normal)**: All body text, descriptions, long-form content
- **500 (Medium)**: Labels, navigation items, emphasized inline text
- **600 (Semibold)**: Card titles, section labels, button text
- **700 (Bold)**: Page headings, primary CTAs, numbers/metrics

### Typography Classes

```css
/* Heading styles */
.heading-1 {
  font-size: var(--text-4xl);
  line-height: var(--text-4xl-lh);
  font-weight: var(--font-bold);
  color: var(--neutral-900);
  letter-spacing: -0.025em;
}

.heading-2 {
  font-size: var(--text-3xl);
  line-height: var(--text-3xl-lh);
  font-weight: var(--font-bold);
  color: var(--neutral-900);
  letter-spacing: -0.02em;
}

.heading-3 {
  font-size: var(--text-2xl);
  line-height: var(--text-2xl-lh);
  font-weight: var(--font-semibold);
  color: var(--neutral-800);
}

.heading-4 {
  font-size: var(--text-xl);
  line-height: var(--text-xl-lh);
  font-weight: var(--font-semibold);
  color: var(--neutral-800);
}

/* Body styles */
.body-large {
  font-size: var(--text-lg);
  line-height: var(--text-lg-lh);
  font-weight: var(--font-normal);
  color: var(--neutral-600);
}

.body-base {
  font-size: var(--text-base);
  line-height: var(--text-base-lh);
  font-weight: var(--font-normal);
  color: var(--neutral-600);
}

.body-small {
  font-size: var(--text-sm);
  line-height: var(--text-sm-lh);
  font-weight: var(--font-normal);
  color: var(--neutral-500);
}

/* Special styles */
.caption {
  font-size: var(--text-xs);
  line-height: var(--text-xs-lh);
  font-weight: var(--font-medium);
  color: var(--neutral-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background-color: var(--neutral-100);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: var(--neutral-800);
}
```

---

## Spacing System

Based on 4px grid for consistent rhythm and alignment.

```css
:root {
  --space-0: 0;
  --space-px: 1px;
  --space-0_5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1_5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2_5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3_5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-32: 8rem;       /* 128px */
  --space-40: 10rem;      /* 160px */
  --space-48: 12rem;      /* 192px */
  --space-56: 14rem;      /* 224px */
  --space-64: 16rem;      /* 256px */
}
```

**Common Usage Patterns:**
- `space-1` (4px): Icon padding, tight spacing
- `space-2` (8px): Element padding, small gaps
- `space-4` (16px): Standard padding, card internal spacing
- `space-6` (24px): Section spacing, card gaps
- `space-8` (32px): Major section spacing
- `space-12` (48px): Page section breaks
- `space-16` (64px): Hero section padding

---

## Component Library

### Buttons

```typescript
// Button variants and sizes
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

// Component implementation
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 disabled:bg-neutral-300 disabled:cursor-not-allowed',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
    outline: 'bg-white border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500',
    danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
```

**Button States:**
- **Default**: Base styling
- **Hover**: Darker shade, subtle elevation
- **Active**: Even darker, slight scale down
- **Focus**: 2px ring matching button color
- **Disabled**: Reduced opacity, cursor not-allowed
- **Loading**: Spinner icon, interaction disabled

---

### Cards

```typescript
// Card component for content containers
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-neutral-200 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('px-6 py-5 border-b border-neutral-200', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-semibold text-neutral-900', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-neutral-500 mt-1', className)}>
      {children}
    </p>
  )
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('px-6 py-5', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-neutral-200 bg-neutral-50', className)}>
      {children}
    </div>
  )
}
```

**Card Variants:**
- **Default**: White background, subtle shadow
- **Elevated**: Larger shadow on hover
- **Interactive**: Hover state with scale transform
- **Outlined**: No shadow, prominent border

---

### Form Elements

```typescript
// Input field
export function Input({
  label,
  error,
  helperText,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 border rounded-lg text-neutral-900 placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-neutral-300'
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  )
}

// Textarea
export function Textarea({
  label,
  error,
  helperText,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-3 py-2 border rounded-lg text-neutral-900 placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'resize-none',
          error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-neutral-300'
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  )
}

// Select dropdown
export function Select({
  label,
  options,
  error,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-3 py-2 border rounded-lg text-neutral-900',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-neutral-300'
        )}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  )
}
```

---

### Navigation Components

```typescript
// Header
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/tools">Tools</NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ModuleSwitcher />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

// Sidebar
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-neutral-200 bg-white">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-neutral-200">
          <Logo />
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink href="/dashboard" icon={<Home />}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/courses" icon={<BookOpen />}>
            Courses
          </SidebarLink>
          <SidebarLink href="/tools" icon={<Wrench />}>
            Tools
          </SidebarLink>
        </nav>
        
        <div className="p-4 border-t border-neutral-200">
          <ProgressSummary />
        </div>
      </div>
    </aside>
  )
}
```

---

## Layout Patterns

### Dashboard Layout

```typescript
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
```

### Course Viewer Layout

```typescript
export function CourseViewerLayout({
  lesson,
  sidebar,
}: {
  lesson: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Main lesson content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-12 px-8">
          {lesson}
        </div>
      </div>
      
      {/* Sidebar with navigation */}
      <div className="w-80 border-l border-neutral-200 bg-white overflow-y-auto">
        {sidebar}
      </div>
    </div>
  )
}
```

---

## Animation Standards

### Transitions

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slowest: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Usage Guidelines:**
- `fast` (150ms): Hover states, small UI changes
- `base` (200ms): Standard transitions, default choice
- `slow` (300ms): Complex animations, modal open/close
- `slowest` (500ms): Page transitions, major state changes

### Easing Functions

```css
/* Predefined easing curves */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
```

### Motion Preferences

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

```css
:root {
  --screen-sm: 640px;   /* Mobile landscape */
  --screen-md: 768px;   /* Tablet portrait */
  --screen-lg: 1024px;  /* Tablet landscape / small laptop */
  --screen-xl: 1280px;  /* Desktop */
  --screen-2xl: 1536px; /* Large desktop */
}
```

**Responsive Strategy:**
- Start with mobile design
- Progressively enhance for larger screens
- Test on real devices, not just browser resize
- Consider touch targets on mobile (min 44x44px)

---

## Accessibility Guidelines

### Color Contrast

**WCAG 2.1 Level AA Requirements:**
- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (â‰¥ 18px or â‰¥ 14px bold): Minimum 3:1 contrast ratio
- UI components and graphics: Minimum 3:1 contrast ratio

**Verification:**
```typescript
// Check contrast ratios using libraries like 'polished'
import { readableColor } from 'polished'

const textColor = readableColor(
  backgroundColor,
  darkColor,
  lightColor,
  true // Strict mode for WCAG AA
)
```

### Focus Indicators

All interactive elements must have visible focus indicators:

```css
/* Standard focus ring */
.interactive-element:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-500);
  border-radius: 0.375rem;
}

/* Focus within for complex components */
.card:focus-within {
  box-shadow: 0 0 0 2px var(--primary-500);
}
```

### Keyboard Navigation

- All interactive elements reachable via Tab
- Logical tab order (matches visual order)
- Skip links for navigation
- Escape key closes modals and dropdowns
- Arrow keys navigate within components

### Screen Reader Support

```typescript
// Add appropriate ARIA labels
<button aria-label="Close modal">
  <X className="w-4 h-4" />
</button>

// Use semantic HTML
<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>

// Announce dynamic changes
<div role="status" aria-live="polite">
  {loadingMessage}
</div>
```

---

## Icon System

**Primary Icon Library:** Lucide React

```typescript
import {
  Home,
  BookOpen,
  Wrench,
  Users,
  TrendingUp,
  Award,
  // ... many more
} from 'lucide-react'
```

**Icon Sizes:**
- `w-4 h-4` (16px): Inline with text, small UI elements
- `w-5 h-5` (20px): Standard buttons, navigation
- `w-6 h-6` (24px): Emphasized actions, section headers
- `w-8 h-8` (32px): Large CTAs, feature highlights

**Icon Colors:**
- Default: `currentColor` (inherits text color)
- Emphasis: `text-primary-500`
- Muted: `text-neutral-400`
- Success/Error/Warning: Semantic colors

---

This design system provides a complete foundation for building the Solo Founder Platform with consistent, accessible, and aesthetically coherent interfaces across all modules.