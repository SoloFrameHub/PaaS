# Marketing Screenshots Guide

## Quick Capture Instructions

### Setup
1. Start the app: `npm run dev`
2. Create test accounts if needed:
   - Provider: Use provider signup flow
   - Student: Use regular signup flow
3. Add sample data (patients, journal entries, course progress)

### Screenshots to Capture

#### 1. Provider Dashboard (`01-provider-dashboard.png`)
- **URL**: `/provider/dashboard`
- **Login**: Use provider credentials
- **What to show**: Patient roster overview, stats, quick actions
- **Crop**: Full viewport (1920x1080)
- **Save to**: `public/images/practices/`

#### 2. Provider Patients Roster (`02-provider-patients.png`)
- **URL**: `/provider/patients`
- **What to show**: List of patients with engagement status, progress indicators
- **Highlight**: Patient names (blur if needed), progress bars, tier labels

#### 3. Distress Alerts (`03-distress-alerts.png`)
- **URL**: `/provider/alerts`
- **What to show**: Real-time distress detection alerts
- **Note**: May need to create sample alert data
- **Highlight**: Alert severity, patient name, timestamp

#### 4. Patient Detail View (`04-patient-detail.png`)
- **URL**: `/provider/patients/[patientId]`
- **What to show**: Individual patient progress, mood tracking, session prep
- **Highlight**: Progress charts, recent activity, notes editor

#### 5. Provider Resources/RAG (`05-provider-resources.png`)
- **URL**: `/provider/resources`
- **What to show**: RAG search interface for clinical resources
- **Highlight**: Search functionality, results display

#### 6. Student Dashboard - Two Schools (`06-student-dashboard.png`)
- **URL**: `/dashboard` (logged in as student)
- **What to show**: Both therapeutic and optimization school access
- **Highlight**: School selection, path preview, next steps

#### 7. Interactive Lesson (`07-interactive-lesson.png`)
- **URL**: Example lesson with interactive components
  - `/academy/anxiety-breathing-techniques/lessons/01-diaphragmatic-breathing`
  - Or any lesson with `<BreathingExercise>`, `<ThoughtRecord>`, etc.
- **What to show**: Interactive component in action
- **Highlight**: Breathing visualizer, form inputs, progress tracking

#### 8. AI Coach Interface (`08-ai-coach.png`)
- **URL**: `/coach`
- **What to show**: Chat interface with AI wellness coach
- **Highlight**: Message history, context awareness, therapeutic guidance

#### 9. Course Catalog - Two Schools (`09-course-catalog.png`)
- **URL**: `/courses`
- **What to show**: Therapeutic + Optimization school filters active
- **Highlight**: School toggle, course cards, track organization

#### 10. Analytics Dashboard (`10-analytics.png`)
- **URL**: `/dashboard/analytics` (or provider analytics)
- **What to show**: Completion rates, quiz scores, engagement metrics
- **Highlight**: Charts, trends, data visualization

---

## After Capturing

### Add Annotations
Use an image editor to add:
- **Arrows** pointing to key features
- **Labels** explaining what each section does
- **Highlights** (circles/boxes) around important UI elements
- **Callouts** with brief descriptions

### Example Annotations:
- "Real-time distress detection" → pointing to alert icon
- "Patient progress tracking" → pointing to progress bar
- "Interactive breathing exercise" → pointing to breathing visualizer
- "Two-school architecture" → pointing to school toggle

### File Naming
Save to `public/images/practices/` with descriptive names:
- `01-provider-dashboard.png`
- `02-provider-patients.png`
- etc.

---

## Quick Capture with Browser DevTools

**Chrome/Edge:**
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "screenshot"
4. Select "Capture full size screenshot" or "Capture screenshot"

**Firefox:**
1. Press `F12`
2. Click the three-dot menu in DevTools
3. Select "Take a screenshot"

---

## Alternative: Use the Playwright Script

```bash
# Install dependencies if needed
npm install

# Set environment variables
export PROVIDER_EMAIL="your-provider@test.com"
export PROVIDER_PASSWORD="yourpassword"

# Run the script
npx tsx scripts/capture-marketing-screenshots.ts
```

This will automatically capture all 10 screenshots and save them to `public/images/practices/`.
