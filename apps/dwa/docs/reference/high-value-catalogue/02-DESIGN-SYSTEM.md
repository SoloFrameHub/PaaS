# Design System Specifications

## Color Palette

### Primary Colors (Mental Health Psychology Informed)

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // Primary: Soft Blue (trust, calm, safety)
        primary: {
          50: '#f0f9fc',
          100: '#e0f2f9',
          200: '#bae5f3',
          300: '#7dd3eb',
          400: '#5FACCF',  // Main brand color
          500: '#3a9bc2',
          600: '#2a7c9f',
          700: '#256381',
          800: '#24536b',
          900: '#1a3440',
        },
        // Secondary: Emerald Green (growth, healing, balance)
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',  // Main secondary color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Neutral: Warm grays (professional, non-clinical)
        neutral: {
          50: '#fafafa',
          100: '#f7f7f7',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Semantic: Muted, non-alarming versions
        success: {
          DEFAULT: '#10b981',
          light: '#86efac',
          dark: '#047857',
        },
        warning: {
          DEFAULT: 'rgba(245, 158, 11, 0.7)',  // Muted amber
          light: 'rgba(252, 211, 77, 0.5)',
          dark: 'rgba(217, 119, 6, 0.8)',
        },
        error: {
          DEFAULT: 'rgba(239, 68, 68, 0.8)',  // Softened red
          light: 'rgba(252, 165, 165, 0.6)',
          dark: 'rgba(185, 28, 28, 0.9)',
        },
        info: {
          DEFAULT: 'rgba(59, 130, 246, 0.6)',  // Soft blue
          light: 'rgba(147, 197, 253, 0.5)',
          dark: 'rgba(37, 99, 235, 0.7)',
        },
      },
    },
  },
}
```

### Color Usage Guidelines

**Primary Blue (#5FACCF)**
- Primary CTAs and action buttons
- Links and interactive text
- Header and navigation elements
- Active states and selections
- Progress indicators (loading, processing)

**Secondary Green (#10b981)**
- Success states and completions
- Progress bars and achievement markers
- Positive reinforcement messages
- Growth/milestone indicators
- "Start" or "Continue" actions

**Neutral Grays**
- Body text: neutral-800
- Secondary text: neutral-600
- Borders: neutral-200
- Backgrounds: neutral-50, neutral-100
- Disabled states: neutral-400

**Semantic Colors**
- Success: Lesson completion, correct answers, achieved goals
- Warning: Gentle reminders, optional suggestions, non-critical alerts
- Error: Form validation, failed actions, crisis resources (sparingly)
- Info: Educational callouts, tips, additional information

### Contrast Requirements

All text must meet WCAG 2.2 Level AA:
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

Provide high-contrast mode option:
- Increase contrast ratios to AAA (7:1)
- Use neutral-900 for text on light backgrounds
- Use white for text on dark backgrounds

## Typography

### Font Stack

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

**Import Fonts** (in `index.html` or CSS):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
```

### Type Scale

```typescript
// tailwind.config.js
export default {
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],     // 12px
      sm: ['0.875rem', { lineHeight: '1.6' }],    // 14px
      base: ['1rem', { lineHeight: '1.6' }],      // 16px - minimum for body
      lg: ['1.125rem', { lineHeight: '1.6' }],    // 18px
      xl: ['1.25rem', { lineHeight: '1.5' }],     // 20px
      '2xl': ['1.5rem', { lineHeight: '1.4' }],   // 24px
      '3xl': ['2rem', { lineHeight: '1.3' }],     // 32px
      '4xl': ['2.5rem', { lineHeight: '1.2' }],   // 40px
      '5xl': ['3rem', { lineHeight: '1.1' }],     // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
}
```

### Typography Usage

**Headings**
```tsx
// H1: Page titles
<h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900">
  Sleep Mastery Course
</h1>

// H2: Section headers
<h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900">
  Module 1: Understanding Sleep
</h2>

// H3: Subsection headers
<h3 className="font-display text-2xl md:text-3xl font-semibold text-neutral-800">
  The Science of Circadian Rhythms
</h3>

// H4: Component headers
<h4 className="font-display text-xl md:text-2xl font-semibold text-neutral-800">
  Daily Sleep Diary
</h4>
```

**Body Text**
```tsx
// Primary body text
<p className="text-base text-neutral-800 leading-relaxed">
  Sleep is essential for mental health recovery and maintenance.
</p>

// Secondary/caption text
<p className="text-sm text-neutral-600">
  Last updated 2 hours ago
</p>

// Small text (legal, footnotes)
<p className="text-xs text-neutral-500">
  This information is educational only, not medical advice.
</p>
```

**Reading Experience**
- Maximum line length: 65-75 characters
- Paragraph spacing: 1.5em - 2em
- Always left-aligned (never justified)
- Maximum 3-4 lines per paragraph for mental health content

## Spacing System

### 8-Point Grid System

```typescript
// tailwind.config.js - default spacing is already 4px based, use multiples
export default {
  theme: {
    spacing: {
      '0': '0px',
      '1': '0.25rem',    // 4px
      '2': '0.5rem',     // 8px   - Base unit
      '3': '0.75rem',    // 12px
      '4': '1rem',       // 16px  - Standard component padding
      '5': '1.25rem',    // 20px
      '6': '1.5rem',     // 24px  - Section spacing
      '8': '2rem',       // 32px  - Large component spacing
      '10': '2.5rem',    // 40px
      '12': '3rem',      // 48px  - Major section breaks
      '16': '4rem',      // 64px  - Hero/landing sections
      '20': '5rem',      // 80px
      '24': '6rem',      // 96px
    },
  },
}
```

### Spacing Application

**Component Internal Padding**
- Small components (buttons, inputs): `p-4` (16px)
- Medium components (cards): `p-6` (24px)
- Large components (modals, panels): `p-8` (32px)

**Component Margins**
- Between related elements: `gap-2` or `gap-4` (8px or 16px)
- Between sections: `gap-6` or `gap-8` (24px or 32px)
- Major breaks: `gap-12` or `gap-16` (48px or 64px)

**Container Padding**
- Mobile: `px-4` (16px)
- Tablet: `px-6` (24px)
- Desktop: `px-8` or `px-12` (32px or 48px)

## Component Design Patterns

### Button Components

```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  // ... other props
}

// Usage examples:
<Button variant="primary" size="md">Start Lesson</Button>
<Button variant="secondary" size="md">Save Progress</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

**Button Styles**
```css
/* Primary Button */
.btn-primary {
  @apply bg-primary-400 hover:bg-primary-500 text-white;
  @apply px-6 py-3 rounded-lg font-semibold;
  @apply transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-secondary-500 hover:bg-secondary-600 text-white;
  @apply px-6 py-3 rounded-lg font-semibold;
  @apply transition-colors duration-200;
}

/* Outline Button */
.btn-outline {
  @apply border-2 border-primary-400 text-primary-400;
  @apply hover:bg-primary-50;
  @apply px-6 py-3 rounded-lg font-semibold;
}
```

### Card Components

```tsx
// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export function Card({ children, hover, className }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm border border-neutral-200',
      'p-6',
      hover && 'hover:shadow-md transition-shadow duration-200',
      className
    )}>
      {children}
    </div>
  )
}
```

**Card Variants**
```tsx
// Course Card
<Card hover className="overflow-hidden">
  <img src={courseImage} alt="" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2">Sleep Mastery</h3>
    <p className="text-neutral-600 mb-4">6 weeks • 8 modules</p>
    <Button variant="primary">Start Course</Button>
  </div>
</Card>

// Progress Card
<Card>
  <h4 className="text-lg font-semibold mb-3">Your Progress</h4>
  <ProgressBar value={65} max={100} />
  <p className="text-sm text-neutral-600 mt-2">13 of 20 lessons complete</p>
</Card>
```

### Form Components

```tsx
// Input with Label
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className="w-full px-4 py-3 border border-neutral-300 rounded-lg
               focus:ring-2 focus:ring-primary-400 focus:border-transparent
               transition-all duration-200"
    placeholder="you@example.com"
  />
  <p className="text-sm text-neutral-500">We'll never share your email.</p>
</div>

// Checkbox with Clear Target Size
<label className="flex items-center space-x-3 cursor-pointer p-2">
  <input
    type="checkbox"
    className="w-5 h-5 rounded border-neutral-300 text-primary-400
               focus:ring-primary-400 focus:ring-offset-2"
  />
  <span className="text-neutral-700">I agree to the terms and conditions</span>
</label>
```

### Progress Indicators

```tsx
// Linear Progress Bar
export function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const percentage = (value / max) * 100
  
  return (
    <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-secondary-500 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  )
}

// Circular Progress (for course completion)
export function CircularProgress({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference
  
  return (
    <svg className="w-24 h-24 -rotate-90">
      {/* Background circle */}
      <circle
        cx="48"
        cy="48"
        r="45"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        className="text-neutral-200"
      />
      {/* Progress circle */}
      <circle
        cx="48"
        cy="48"
        r="45"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-secondary-500 transition-all duration-500"
      />
      <text
        x="48"
        y="48"
        className="text-xl font-bold rotate-90"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {percentage}%
      </text>
    </svg>
  )
}
```

### Modal/Dialog Components

```tsx
// src/components/ui/Modal.tsx
import { motion, AnimatePresence } from 'framer-motion'

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Navigation Components

```tsx
// Header with Crisis Resources
export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
      {/* Crisis Banner - always visible */}
      <div className="bg-error/10 border-b border-error/20">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm text-center">
            <strong>Crisis Support Available 24/7:</strong>
            <a href="tel:988" className="ml-2 underline font-semibold">
              Call 988
            </a>
            <span className="mx-2">or</span>
            <span className="font-semibold">Text "HELLO" to 741741</span>
          </p>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Logo />
          <NavLinks />
        </div>
        <UserMenu />
      </nav>
    </header>
  )
}
```

## Animation Guidelines

### Framer Motion Configuration

```tsx
// Respect reduced motion preference
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```

### Animation Timing

```typescript
// Standard transitions
const transitions = {
  fast: { duration: 0.15 },      // Micro-interactions
  normal: { duration: 0.25 },    // Default transitions
  slow: { duration: 0.4 },       // Page transitions, modals
}

// Easing functions (prefer ease-out for UI)
const easing = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
}
```

### Common Animations

```tsx
// Page Transition
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 20 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {children}
</motion.div>

// Success Checkmark
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
>
  <CheckCircle className="text-success" />
</motion.div>

// Loading Pulse (subtle)
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
>
  Loading...
</motion.div>
```

## Responsive Design

### Breakpoints

```typescript
// tailwind.config.js
export default {
  theme: {
    screens: {
      'sm': '640px',   // Phone landscape, small tablets
      'md': '768px',   // Tablets
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    },
  },
}
```

### Mobile-First Approach

```tsx
// Build for mobile, enhance for desktop
<div className="
  px-4 py-6           {/* Mobile */}
  md:px-6 md:py-8     {/* Tablet */}
  lg:px-8 lg:py-12    {/* Desktop */}
">
  <h1 className="
    text-3xl          {/* Mobile */}
    md:text-4xl       {/* Tablet */}
    lg:text-5xl       {/* Desktop */}
  ">
    Title
  </h1>
</div>

// Grid layouts
<div className="
  grid grid-cols-1    {/* Mobile: single column */}
  md:grid-cols-2      {/* Tablet: 2 columns */}
  lg:grid-cols-3      {/* Desktop: 3 columns */}
  gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Touch Targets

All interactive elements must be minimum 44x44px:
```tsx
// Proper button sizing
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Click Me
</button>

// Icon buttons need explicit sizing
<button className="w-11 h-11 flex items-center justify-center rounded-lg">
  <Icon className="w-5 h-5" />
</button>
```

## Dark Mode Support (Optional)

```typescript
// tailwind.config.js
export default {
  darkMode: 'class',
  // ... rest of config
}

// Usage
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
  Content that adapts to theme
</div>
```

## Cruip Template Integration

### Adapting Mosaic & Simple Templates

Cruip templates use React + Tailwind. Key patterns to extract:

**Hero Section Pattern**
```tsx
<section className="relative pt-12 md:pt-20 pb-10 md:pb-16">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="pt-12 md:pt-20 pb-10 md:pb-16">
      {/* Hero content */}
    </div>
  </div>
</section>
```

**Feature Cards Pattern**
```tsx
<div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-none">
  {features.map((feature) => (
    <div key={feature.id} className="relative flex flex-col p-6 bg-white rounded shadow-xl">
      <Icon className="w-16 h-16 mb-4" />
      <h4 className="text-xl font-bold mb-1">{feature.title}</h4>
      <p className="text-neutral-600 text-center">{feature.description}</p>
    </div>
  ))}
</div>
```

**CTA Section Pattern**
```tsx
<section className="bg-primary-400">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <Button variant="secondary" size="lg">
          Get Started Free
        </Button>
      </div>
    </div>
  </div>
</section>
```
