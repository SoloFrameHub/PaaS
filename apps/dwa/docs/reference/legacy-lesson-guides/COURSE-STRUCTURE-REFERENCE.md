# Course Structure Reference

## Overview

All course content is created and maintained in the **`github-deployment/`** directory, which contains the Bootstrap template, styling, and all 20 courses.

## Directory Structure

```
github-deployment/
├── assets/
│   ├── css/
│   │   └── styles.css           # Bootstrap + custom RPS styling
│   └── img/                     # Images and logos
│
├── anxiety-toolkit/             # Stress Mastery Series (5 micro-lessons)
│   ├── index.html              # Course landing page
│   ├── lesson-1-1-*.html       # Lesson 1.1: Understanding Your Stress Response
│   ├── lesson-1-2-*.html       # Lesson 1.2: Emergency Calm Techniques
│   ├── lesson-1-3-*.html       # Lesson 1.3: Building Your Daily Reset
│   ├── lesson-1-4-*.html       # Lesson 1.4: Stress Prevention Lifestyle
│   └── lesson-1-5-*.html       # Lesson 1.5: Long-term Stress Mastery
│
├── course-1-movement-medicine/
│   ├── index.html              # Course landing page
│   └── lesson-1-*.html         # 20 lessons
│
├── course-2-workplace-mental-health/
│   ├── index.html
│   └── lesson-2-*.html         # 20 lessons
│
├── course-3-digital-wellness/
├── course-4-growth-mindset/
├── course-5-cbt-fundamentals/
├── course-6-stress-challenge-navigation/
├── course-7-boundaries-bootcamp/
├── course-8-social-circle-mastery/
├── course-9-team-sports-mental-health/
├── course-10-relationship-dynamics/
├── course-11-family-parenting-mental-health/
├── course-12-purpose-and-responsibility/
├── course-13-mental-health-first-aid/
├── course-14-coaching-mentoring/
├── course-15-legacy-building/
├── course-16-recreational-therapy/
├── course-17-creative-expression/
├── course-18-adventure-outdoor-mental-health/
├── course-19-music-movement-wellness/
│
├── index.html                   # Homepage
├── courses.html                 # Course catalog
├── community.html               # Community page
├── forum.html                   # Forum page
├── free-preview-lessons.html    # Free preview page
└── 5-pillars-evidence.html      # Five Pillars framework page
```

## Course Naming Convention

### Course Directories
Format: `course-[NUMBER]-[name-with-hyphens]/`

Examples:
- `course-1-movement-medicine/`
- `course-8-social-circle-mastery/`
- `anxiety-toolkit/` (special case: micro-lesson series)

### Lesson Files
Format: `lesson-[COURSE#]-[LESSON#]-[name-with-hyphens].html`

Examples:
- `lesson-1-1-science-exercise-mental-health.html`
- `lesson-8-15-professional-vs-personal-relationships.html`
- `lesson-1-1-understanding-stress-response.html` (anxiety-toolkit)

### Landing Pages
Each course directory contains:
- `index.html` - Course landing page with:
  - Course overview
  - Learning objectives
  - Lesson list with links
  - SEO metadata
  - Crisis resources

## Standard Course Structure

### Full Courses (Courses 1-19)
Each course contains:
- **1 landing page** (`index.html`)
- **20 lesson files** (`lesson-X-1.html` through `lesson-X-20.html`)
- **Total**: 21 files per course

### Anxiety Toolkit (Stress Mastery Series)
Special micro-lesson series:
- **1 landing page** (`index.html`)
- **5 micro-lessons** (`lesson-1-1.html` through `lesson-1-5.html`)
- **Total**: 6 files

## Bootstrap & Styling

### Stylesheet Location
`github-deployment/assets/css/styles.css`

This file contains:
- Bootstrap 5 framework
- Custom RPS branding
- Responsive design rules
- Interactive element styles

### Images & Assets
`github-deployment/assets/img/`
- RPS logo
- Course images
- Icons and graphics

## Creating New Courses

When creating a new course in `github-deployment/`:

1. **Create course directory**:
   ```bash
   mkdir github-deployment/course-[NUMBER]-[name]/
   ```

2. **Create landing page**:
   ```bash
   # Copy from template or existing course
   cp github-deployment/course-1-movement-medicine/index.html \
      github-deployment/course-[NUMBER]-[name]/index.html
   ```

3. **Create lessons**:
   - Use API-driven workflow: [WORKFLOW-API-DRIVEN-LESSON-CREATION.md](WORKFLOW-API-DRIVEN-LESSON-CREATION.md)
   - Or manual creation with Bootstrap template

4. **Link stylesheet**:
   ```html
   <link rel="stylesheet" href="../assets/css/styles.css">
   ```

5. **Add to course catalog**:
   Update `github-deployment/courses.html` with new course card

## Key Features in Every Course File

### Required Elements
- ✅ Bootstrap 5 framework
- ✅ Custom RPS styling (`../assets/css/styles.css`)
- ✅ Crisis detection keywords
- ✅ 988 Suicide & Crisis Lifeline integration
- ✅ Responsive design (mobile-first)
- ✅ WCAG 2.1 AA accessibility
- ✅ SEO metadata (title, description, keywords)

### Navigation
- Home link → `../index.html`
- Courses link → `../courses.html`
- Previous/Next lesson links within course

### Interactive Elements
- Accordions for content sections
- Reflection prompts
- Practical exercises
- Self-assessment questions
- Downloadable worksheets (planned)

## Course Content Guidelines

### Lesson Structure
1. **Introduction** (Why this matters)
2. **Core Content** (Evidence-based teaching)
3. **Practical Application** (Interactive exercises)
4. **Reflection** (Personal insight prompts)
5. **Practice Plan** (Next steps)
6. **Crisis Resources** (Always available)

### Length Guidelines
- **Full Lessons**: 8-12 sections per lesson
- **Micro-lessons**: 4-6 sections per lesson
- **Reading Time**: 10-15 minutes per lesson

## Deployment

All files in `github-deployment/` are:
1. Version controlled in Git
2. Auto-deployed to Cloudflare Pages on push
3. Served globally via CDN
4. Protected by Cloudflare Workers (premium content)

### Live URLs
- Homepage: `https://rps-digital-wellness.netlify.app/`
- Courses: `https://rps-digital-wellness.netlify.app/courses.html`
- Course example: `https://rps-digital-wellness.netlify.app/course-1-movement-medicine/`

## Related Documentation

- **Lesson Creation Workflow**: [WORKFLOW-API-DRIVEN-LESSON-CREATION.md](WORKFLOW-API-DRIVEN-LESSON-CREATION.md)
- **Deployment Checklist**: [LESSON-DEPLOYMENT-CHECKLIST.md](LESSON-DEPLOYMENT-CHECKLIST.md)
- **Workbook System**: [WORKBOOK-SYSTEM-GUIDE.md](WORKBOOK-SYSTEM-GUIDE.md)
- **Bootstrap Template**: See any existing course for reference

## Quick Commands

```bash
# Navigate to course directory
cd github-deployment/

# Count total courses
ls -d course-* anxiety-toolkit | wc -l

# Find all lesson files
find . -name "lesson-*.html"

# Check course structure
ls -la course-1-movement-medicine/

# Test local preview
python3 -m http.server 8080
# Visit: http://localhost:8080/
```

---

**Last Updated**: October 24, 2025
**Total Courses**: 20 (19 full courses + 1 micro-lesson series)
**Course Location**: `github-deployment/`
