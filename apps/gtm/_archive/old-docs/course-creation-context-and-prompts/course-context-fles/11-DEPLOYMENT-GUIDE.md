# 11-DEPLOYMENT-GUIDE.md

**Purpose:** Complete deployment, operations, and production readiness guide  
**Estimated Size:** 28KB  
**Dependencies:** All previous documentation files (00-10)  
**Last Updated:** 2024-11-22

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Firebase Deployment](#firebase-deployment)
4. [Domain Configuration](#domain-configuration)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Production Monitoring](#production-monitoring)
7. [Backup & Disaster Recovery](#backup-disaster-recovery)
8. [Security Hardening](#security-hardening)
9. [Performance Optimization](#performance-optimization)
10. [Scaling Strategy](#scaling-strategy)
11. [Operational Runbooks](#operational-runbooks)
12. [Cost Monitoring & Optimization](#cost-monitoring-optimization)

---

## Pre-Deployment Checklist

### Phase 1: Development Complete âœ…

```markdown
## Code Quality
- [ ] All TypeScript strict mode enabled and passing
- [ ] No console.log statements in production code
- [ ] All TODOs resolved or documented
- [ ] Code reviewed and approved
- [ ] Git history clean (no secrets committed)

## Testing
- [ ] Unit tests passing (>80% coverage)
- [ ] Integration tests passing
- [ ] E2E tests passing for critical paths
- [ ] Accessibility audit completed (WCAG 2.1 AA)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness verified
- [ ] Performance budget met (Lighthouse >90)

## Security
- [ ] Environment variables properly configured
- [ ] No hardcoded API keys or secrets
- [ ] Firestore security rules deployed and tested
- [ ] Authentication flows tested
- [ ] SQL injection prevention (N/A - NoSQL)
- [ ] XSS prevention implemented
- [ ] CSRF protection enabled
- [ ] Rate limiting configured

## Documentation
- [ ] API documentation complete
- [ ] README.md updated
- [ ] Environment setup documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide created
```

### Phase 2: Infrastructure Ready âœ…

```markdown
## Firebase Project
- [ ] Production Firebase project created
- [ ] Billing account linked (Blaze plan)
- [ ] Budget alerts configured
- [ ] Team members granted appropriate access
- [ ] Service accounts created for CI/CD

## Domain & DNS
- [ ] Domain purchased and verified
- [ ] DNS records configured
- [ ] SSL certificate provisioned
- [ ] CDN configured (if using)

## Third-Party Services
- [ ] Stripe account configured (production keys)
- [ ] SendGrid/email service configured
- [ ] Google Drive API credentials
- [ ] Gmail API credentials
- [ ] Analytics service configured
- [ ] Error tracking service configured (Sentry)

## Monitoring
- [ ] Uptime monitoring configured
- [ ] Performance monitoring configured
- [ ] Error tracking configured
- [ ] Log aggregation configured
```

### Phase 3: Content & Data Ready âœ…

```markdown
## Course Content
- [ ] All courses reviewed and approved
- [ ] Images optimized and uploaded
- [ ] Videos transcoded and hosted
- [ ] PDFs generated and stored
- [ ] Case studies finalized
- [ ] Assessments validated

## Database
- [ ] Seed data prepared
- [ ] Migration scripts tested
- [ ] Backup strategy defined
- [ ] Security rules deployed
- [ ] Indexes created

## Legal
- [ ] Terms of Service finalized
- [ ] Privacy Policy finalized
- [ ] Cookie Policy created
- [ ] GDPR compliance verified
- [ ] Refund policy defined
```

---

## Environment Setup

### Development Environment

```bash
# .env.development
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000

# Firebase Development Project
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dev-soloframehub.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dev-soloframehub
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dev-soloframehub.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Genkit (Development)
GOOGLE_GENAI_API_KEY=AIza...dev

# Stripe (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# SendGrid (Development)
SENDGRID_API_KEY=SG...dev
SENDGRID_FROM_EMAIL=dev@soloframehub.com
```

### Staging Environment

```bash
# .env.staging
NEXT_PUBLIC_ENV=staging
NEXT_PUBLIC_API_URL=https://staging.soloframehub.com

# Firebase Staging Project
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...staging
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=staging-soloframehub.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=staging-soloframehub
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=staging-soloframehub.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=987654321
NEXT_PUBLIC_FIREBASE_APP_ID=1:987654321:web:def456

# Genkit (Staging)
GOOGLE_GENAI_API_KEY=AIza...staging

# Stripe (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# SendGrid (Staging)
SENDGRID_API_KEY=SG...staging
SENDGRID_FROM_EMAIL=staging@soloframehub.com
```

### Production Environment

```bash
# .env.production
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_URL=https://app.soloframehub.com

# Firebase Production Project
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...prod
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=soloframehub.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=soloframehub
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=soloframehub.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=111222333
NEXT_PUBLIC_FIREBASE_APP_ID=1:111222333:web:ghi789

# Genkit (Production)
GOOGLE_GENAI_API_KEY=AIza...prod

# Stripe (Live Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# SendGrid (Production)
SENDGRID_API_KEY=SG...prod
SENDGRID_FROM_EMAIL=hello@soloframehub.com

# Monitoring
SENTRY_DSN=https://...@sentry.io/...
POSTHOG_API_KEY=phc_...
```

### Environment Variables in Firebase

```bash
# Set Firebase environment variables for Cloud Functions
firebase functions:config:set \
  stripe.secret_key="sk_live_..." \
  sendgrid.api_key="SG..." \
  google.genai_api_key="AIza..."

# Verify
firebase functions:config:get
```

---

## Firebase Deployment

### Initial Setup

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize Firebase in your project
firebase init

# Select:
# - Firestore (database & rules)
# - Functions (Cloud Functions)
# - Hosting (static site)
# - Storage (file storage & rules)

# 4. Configure firebase.json
```

### firebase.json Configuration

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log"
      ],
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ]
    }
  ],
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

### Deployment Commands

```bash
# Deploy everything (first time)
firebase deploy

# Deploy specific services
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only functions
firebase deploy --only hosting
firebase deploy --only storage

# Deploy with specific project
firebase deploy --project production

# Deploy specific function
firebase deploy --only functions:onUserCreate
```

### Next.js Build for Firebase Hosting

```bash
# 1. Build Next.js for static export
npm run build
npm run export

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting

# Or combine in package.json script
# "deploy:prod": "npm run build && npm run export && firebase deploy --only hosting --project production"
```

### Cloud Functions Deployment

```typescript
// functions/src/index.ts

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// Deploy with:
// firebase deploy --only functions

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  // Create user document in Firestore
  await admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    gamification: {
      total_points: 0,
      level: 'aspiring',
      badges: [],
      current_streak: 0,
    },
  })
})

export const onMilestoneVerified = functions.firestore
  .document('businessMilestones/{milestoneId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data()
    const oldData = change.before.data()
    
    // If milestone just got verified
    if (newData.verified && !oldData.verified) {
      // Award points, send email, etc.
      await awardMilestonePoints(newData.user_id, newData.type)
      await sendCongratulationsEmail(newData.user_id, newData)
    }
  })

// Scheduled function - runs daily at midnight UTC
export const updateStreaks = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('UTC')
  .onRun(async (context) => {
    // Update all user streaks
    await checkAndUpdateStreaks()
  })
```

---

## Domain Configuration

### DNS Records for soloframehub.com

```
# A Records (if using own servers)
@               A       1h      YOUR_IP_ADDRESS
www             A       1h      YOUR_IP_ADDRESS

# Firebase Hosting (Recommended)
@               A       1h      151.101.1.195
@               A       1h      151.101.65.195
www             CNAME   1h      soloframehub.web.app.

# Email (SendGrid)
email           CNAME   1h      sendgrid.net.
em123           CNAME   1h      u123456.wl.sendgrid.net.

# Email Authentication
@               TXT     1h      "v=spf1 include:sendgrid.net ~all"
s1._domainkey   TXT     1h      "k=rsa; p=MIGfMA0GCS..."
s2._domainkey   TXT     1h      "k=rsa; p=MIGfMA0GCS..."

# DMARC
_dmarc          TXT     1h      "v=DMARC1; p=none; rua=mailto:dmarc@soloframehub.com"

# Verification
@               TXT     1h      "google-site-verification=ABC123..."
```

### Firebase Hosting Custom Domain

```bash
# 1. Add custom domain in Firebase Console
# https://console.firebase.google.com/project/YOUR_PROJECT/hosting/sites

# 2. Click "Add custom domain"
# Enter: soloframehub.com

# 3. Follow verification steps
# Add provided TXT record to DNS

# 4. Wait for SSL certificate provisioning (can take 24 hours)

# 5. Test
curl -I https://soloframehub.com
```

### Subdomain Configuration

```
# Subdomains
app.soloframehub.com        â†’ Main application (Firebase Hosting)
api.soloframehub.com        â†’ API endpoints (Cloud Functions)
docs.soloframehub.com       â†’ Documentation site
blog.soloframehub.com       â†’ Blog (Ghost/WordPress)
status.soloframehub.com     â†’ Status page (StatusPage.io)
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy-production.yml

name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
      
      - name: Export static site
        run: npm run export
      
      - name: Upload build artifact
        uses: actions/upload-artifact@v3
        with:
          name: production-build
          path: out/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: production-build
          path: out/
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: soloframehub
      
      - name: Deploy Cloud Functions
        run: |
          npm install -g firebase-tools
          firebase deploy --only functions --project production --token ${{ secrets.FIREBASE_TOKEN }}
      
      - name: Deploy Firestore Rules
        run: firebase deploy --only firestore:rules --project production --token ${{ secrets.FIREBASE_TOKEN }}
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment completed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Staging Deployment Workflow

```yaml
# .github/workflows/deploy-staging.yml

name: Deploy to Staging

on:
  push:
    branches:
      - develop

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          npm ci
          npm run build
          npm run export
      
      - name: Deploy to Firebase Staging
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_STAGING }}'
          channelId: live
          projectId: staging-soloframehub
```

---

## Production Monitoring

### Firebase Performance Monitoring

```typescript
// lib/firebase/performance.ts

import { getPerformance } from 'firebase/performance'
import { app } from './config'

export const perf = getPerformance(app)

// Custom traces
export function traceAPICall(name: string) {
  const trace = perf.trace(name)
  trace.start()
  return trace
}

// Usage in API calls
const trace = traceAPICall('genkit_strategic_advisor')
try {
  const response = await callGenkitFlow()
  trace.putMetric('response_tokens', response.tokenCount)
  return response
} finally {
  trace.stop()
}
```

### Error Tracking with Sentry

```typescript
// lib/monitoring/sentry.ts

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  
  beforeSend(event, hint) {
    // Don't send errors in development
    if (process.env.NEXT_PUBLIC_ENV === 'development') {
      return null
    }
    return event
  },
  
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['soloframehub.com', 'api.soloframehub.com'],
    }),
  ],
})

// Usage
try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      component: 'BusinessModelCanvas',
      action: 'save',
    },
    user: {
      id: userId,
      email: userEmail,
    },
  })
  throw error
}
```

### Uptime Monitoring

**Recommended Services:**
1. **UptimeRobot** (Free tier: 50 monitors)
2. **Pingdom** (Paid: $15/month)
3. **StatusCake** (Free tier: 10 monitors)

**Monitors to Configure:**
```
1. Homepage (https://soloframehub.com)
   - Check every 5 minutes
   - Alert if down for 2+ checks

2. Login page (https://app.soloframehub.com/login)
   - Check every 5 minutes
   - Alert if response time > 3s

3. API health endpoint (https://api.soloframehub.com/health)
   - Check every 1 minute
   - Alert if down for 1+ check

4. Genkit AI endpoint
   - Check every 10 minutes
   - Alert if error rate > 5%

5. Firestore read/write
   - Check every 10 minutes via API
   - Alert if latency > 2s
```

### Analytics with PostHog

```typescript
// lib/analytics/posthog.ts

import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY!, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NEXT_PUBLIC_ENV === 'development') {
        posthog.opt_out_capturing()
      }
    },
  })
}

// Track events
export function trackEvent(name: string, properties?: Record<string, any>) {
  posthog.capture(name, properties)
}

// Track page views (in _app.tsx)
useEffect(() => {
  const handleRouteChange = () => posthog.capture('$pageview')
  router.events.on('routeChangeComplete', handleRouteChange)
  return () => router.events.off('routeChangeComplete', handleRouteChange)
}, [])

// Track user properties
export function identifyUser(userId: string, properties: Record<string, any>) {
  posthog.identify(userId, properties)
}
```

### Log Aggregation

```typescript
// lib/logging/logger.ts

import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true,
  },
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
})

export function logInfo(message: string, context?: Record<string, any>) {
  logger.info({ ...context }, message)
}

export function logError(error: Error, context?: Record<string, any>) {
  logger.error({ ...context, error }, error.message)
}

export function logAIInteraction(
  flowName: string,
  tokensUsed: number,
  latency: number
) {
  logger.info({
    type: 'ai_interaction',
    flow: flowName,
    tokens: tokensUsed,
    latency_ms: latency,
  }, 'AI interaction completed')
}
```

---

## Backup & Disaster Recovery

### Firestore Backups

```bash
# Enable automated backups in Firebase Console
# Settings â†’ Project Settings â†’ Service accounts â†’ Enable Backup

# Manual backup using gcloud
gcloud firestore export gs://soloframehub-backups/$(date +%Y%m%d)

# Restore from backup
gcloud firestore import gs://soloframehub-backups/20240322

# Schedule daily backups with Cloud Functions
export const scheduledFirestoreExport = functions.pubsub
  .schedule('0 2 * * *') // 2 AM UTC daily
  .timeZone('UTC')
  .onRun(async (context) => {
    const bucket = 'gs://soloframehub-backups'
    const timestamp = new Date().toISOString().split('T')[0]
    
    await admin.firestore().exportDocuments({
      outputUriPrefix: `${bucket}/${timestamp}`,
      collectionIds: [], // Empty = all collections
    })
  })
```

### User Data Export (GDPR Compliance)

```typescript
// functions/src/gdpr.ts

export const exportUserData = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }
  
  const userId = context.auth.uid
  const db = admin.firestore()
  
  // Gather all user data
  const userData: Record<string, any> = {}
  
  // User profile
  const userDoc = await db.collection('users').doc(userId).get()
  userData.profile = userDoc.data()
  
  // Progress data
  const progressSnap = await db.collection('userProgress')
    .where('user_id', '==', userId)
    .get()
  userData.progress = progressSnap.docs.map(doc => doc.data())
  
  // Framework tools
  const toolsSnap = await db.collection('frameworkTools')
    .where('user_id', '==', userId)
    .get()
  userData.frameworks = toolsSnap.docs.map(doc => doc.data())
  
  // AI interactions
  const aiSnap = await db.collection('aiInteractions')
    .where('user_id', '==', userId)
    .get()
  userData.ai_conversations = aiSnap.docs.map(doc => doc.data())
  
  // Business milestones
  const milestonesSnap = await db.collection('businessMilestones')
    .where('user_id', '==', userId)
    .get()
  userData.milestones = milestonesSnap.docs.map(doc => doc.data())
  
  // Generate JSON file
  const jsonData = JSON.stringify(userData, null, 2)
  
  // Upload to Cloud Storage
  const bucket = admin.storage().bucket()
  const file = bucket.file(`user-exports/${userId}/${Date.now()}.json`)
  await file.save(jsonData, {
    contentType: 'application/json',
    metadata: {
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  })
  
  // Generate signed URL (valid for 7 days)
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })
  
  return { downloadUrl: url }
})
```

### Disaster Recovery Plan

```markdown
## Disaster Recovery Procedures

### Scenario 1: Firestore Data Corruption
**Detection:** Monitoring alerts show unusual data patterns
**Response Time:** < 1 hour
**Steps:**
1. Identify affected collections
2. Locate latest backup (automated daily backups)
3. Restore from backup: `gcloud firestore import gs://soloframehub-backups/[DATE]`
4. Verify data integrity
5. Notify affected users if data loss occurred

### Scenario 2: Firebase Hosting Outage
**Detection:** Uptime monitoring alerts
**Response Time:** < 15 minutes
**Steps:**
1. Check Firebase status page
2. If Firebase issue: Wait for resolution
3. If DNS issue: Update DNS to backup hosting (Vercel/Netlify)
4. Notify users via status page

### Scenario 3: Accidental Deletion of Production Data
**Detection:** User reports or monitoring alerts
**Response Time:** < 30 minutes
**Steps:**
1. Immediately disable write access
2. Identify scope of deletion
3. Restore from most recent backup
4. Re-apply any valid changes made after backup
5. Re-enable write access
6. Document incident

### Scenario 4: Security Breach
**Detection:** Security monitoring or user report
**Response Time:** Immediate
**Steps:**
1. Isolate affected systems
2. Revoke all active sessions
3. Force password reset for all users
4. Audit security logs
5. Patch vulnerability
6. Notify affected users within 72 hours (GDPR requirement)
7. Report to authorities if required
```

---

## Security Hardening

### Firestore Security Rules - Production Ready

```javascript
// firestore.rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isTenantMember(tenantId) {
      return isAuthenticated() && 
             request.auth.token.tenant_id == tenantId;
    }
    
    function hasModuleAccess(moduleId) {
      return isAuthenticated() && 
             moduleId in request.auth.token.modules;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.role == 'admin';
    }
    
    // Rate limiting (basic)
    function notTooManyRequests() {
      return request.time > resource.data.last_request_time + duration.value(1, 's');
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId) && 
                       request.resource.data.email == resource.data.email; // Can't change email
      allow delete: if isAdmin();
    }
    
    // Courses (public read, admin write)
    match /courses/{courseId} {
      allow read: if true;
      allow write: if isAdmin();
      
      match /lessons/{lessonId} {
        allow read: if true;
        allow write: if isAdmin();
      }
    }
    
    // User Progress
    match /userProgress/{progressId} {
      allow read: if isOwner(resource.data.user_id);
      allow create: if isOwner(request.resource.data.user_id);
      allow update: if isOwner(resource.data.user_id) && 
                       isOwner(request.resource.data.user_id);
      allow delete: if false; // Never delete progress
    }
    
    // Framework Tools
    match /frameworkTools/{toolId} {
      allow read: if isOwner(resource.data.user_id);
      allow create: if isOwner(request.resource.data.user_id) && 
                       hasModuleAccess(request.resource.data.module_id);
      allow update: if isOwner(resource.data.user_id) && 
                       notTooManyRequests(); // Basic rate limit
      allow delete: if isOwner(resource.data.user_id);
    }
    
    // AI Interactions (sensitive data)
    match /aiInteractions/{interactionId} {
      allow read: if isOwner(resource.data.user_id) || isAdmin();
      allow create: if isOwner(request.resource.data.user_id);
      allow update: if false; // Immutable
      allow delete: if isOwner(resource.data.user_id);
    }
    
    // Business Milestones
    match /businessMilestones/{milestoneId} {
      allow read: if isOwner(resource.data.user_id) || isAdmin();
      allow create: if isOwner(request.resource.data.user_id);
      allow update: if isAdmin(); // Only admins can verify
      allow delete: if isAdmin();
    }
  }
}
```

### Content Security Policy

```typescript
// next.config.js

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://generativelanguage.googleapis.com https://api.stripe.com;
  frame-src 'self' https://accounts.google.com https://js.stripe.com;
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### API Rate Limiting

```typescript
// middleware/rateLimit.ts

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

// Different limits for different endpoints
const limits = {
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  }),
  aiGeneration: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 AI calls per minute
  }),
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 login attempts per minute
  }),
}

export async function rateLimit(
  identifier: string,
  type: keyof typeof limits = 'api'
) {
  const { success, limit, reset, remaining } = await limits[type].limit(identifier)
  
  return {
    success,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  }
}

// Usage in API route
export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  const { success, headers } = await rateLimit(userId!, 'aiGeneration')
  
  if (!success) {
    return new Response('Rate limit exceeded', { 
      status: 429,
      headers,
    })
  }
  
  // Process request...
}
```

---

## Performance Optimization

### Bundle Size Optimization

```typescript
// next.config.js

module.exports = {
  // Enable SWC minification
  swcMinify: true,
  
  // Analyze bundle size
  webpack: (config, { isServer }) => {
    if (!isServer && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze.html',
        })
      )
    }
    return config
  },
  
  // Image optimization
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compression
  compress: true,
}

// Run: ANALYZE=true npm run build
```

### Database Query Optimization

```typescript
// Optimized queries with indexes

// BAD: Sequential reads
const userProgress = await Promise.all(
  courseIds.map(id => 
    getDoc(doc(db, 'userProgress', `${userId}_${id}`))
  )
)

// GOOD: Batch read (up to 10 documents)
const progressRefs = courseIds.map(id => 
  doc(db, 'userProgress', `${userId}_${id}`)
)
const userProgress = await getDocsFromCache(progressRefs)

// GOOD: Single query with index
const userProgress = await getDocs(
  query(
    collection(db, 'userProgress'),
    where('user_id', '==', userId),
    where('course_id', 'in', courseIds),
    orderBy('last_updated', 'desc')
  )
)
```

### Caching Strategy

```typescript
// lib/cache/strategy.ts

import { LRUCache } from 'lru-cache'

// In-memory cache for frequently accessed data
const cache = new LRUCache<string, any>({
  max: 500, // Maximum items
  ttl: 1000 * 60 * 5, // 5 minutes
})

// Cache course data
export async function getCourse(courseId: string) {
  const cacheKey = `course:${courseId}`
  
  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }
  
  // Fetch from Firestore
  const courseDoc = await getDoc(doc(db, 'courses', courseId))
  const courseData = courseDoc.data()
  
  // Store in cache
  cache.set(cacheKey, courseData)
  
  return courseData
}

// Invalidate cache on update
export async function updateCourse(courseId: string, data: any) {
  await updateDoc(doc(db, 'courses', courseId), data)
  
  // Invalidate cache
  cache.delete(`course:${courseId}`)
}
```

---

## Scaling Strategy

### User Growth Milestones

```markdown
## 0-100 Users (Month 1-2)
**Infrastructure:**
- Firebase Spark plan (free)
- Single region deployment
- Basic monitoring

**Actions:**
- Monitor performance closely
- Gather user feedback
- Iterate quickly

---

## 100-1,000 Users (Month 3-6)
**Infrastructure:**
- Upgrade to Blaze plan
- Add performance monitoring
- Implement caching layer
- Set up CI/CD pipeline

**Actions:**
- Optimize expensive queries
- Add rate limiting
- Monitor costs daily
- Scale Cloud Functions concurrency

**Estimated Costs:** $200-$500/month

---

## 1,000-10,000 Users (Month 7-12)
**Infrastructure:**
- Multi-region deployment
- CDN for static assets
- Redis for caching
- Load balancing

**Actions:**
- Database sharding if needed
- Implement queue for background jobs
- Advanced monitoring and alerting
- Dedicated support team

**Estimated Costs:** $500-$2,000/month

---

## 10,000+ Users (Year 2+)
**Infrastructure:**
- Global CDN (Cloudflare/Fastly)
- Multi-region Firestore
- Dedicated Cloud Run services for heavy workloads
- Professional monitoring (Datadog)

**Actions:**
- Consider microservices architecture
- Implement feature flags
- A/B testing infrastructure
- Advanced security measures

**Estimated Costs:** $2,000-$10,000/month
```

### Firestore Scaling Patterns

```typescript
// Sharding for high-write collections

// Bad: Single document with high writes
const statsRef = doc(db, 'globalStats', 'all')
await updateDoc(statsRef, {
  total_users: increment(1)
})

// Good: Sharded counters
const SHARDS = 10
const shardId = Math.floor(Math.random() * SHARDS)
const shardRef = doc(db, 'globalStats', `shard_${shardId}`)
await updateDoc(shardRef, {
  count: increment(1)
})

// Read aggregated value
async function getTotalUsers() {
  const shardsSnap = await getDocs(
    query(collection(db, 'globalStats'))
  )
  
  return shardsSnap.docs.reduce((total, doc) => {
    return total + (doc.data().count || 0)
  }, 0)
}
```

---

## Operational Runbooks

### Runbook 1: High Error Rate Alert

```markdown
**Trigger:** Error rate > 5% for 5 minutes

**Steps:**
1. Check Sentry dashboard for error patterns
2. Identify affected component/endpoint
3. Check Firebase status page
4. Review recent deployments (last 24 hours)
5. If deployment issue: Rollback
   ```bash
   firebase hosting:rollback
   ```
6. If code issue: Create hotfix branch, fix, deploy
7. Monitor for 30 minutes
8. Document incident in postmortem

**Escalation:** After 30 minutes, notify CTO
```

### Runbook 2: Slow AI Response Times

```markdown
**Trigger:** 95th percentile latency > 10 seconds

**Steps:**
1. Check Genkit dashboard for queue depth
2. Check Gemini API status
3. Review recent prompt changes
4. Check token usage patterns
5. If high usage: Implement response caching
6. If API issue: Switch to fallback model temporarily
7. Optimize prompts to reduce token count
8. Monitor for improvement

**Prevention:**
- Set max_tokens limit on all flows
- Implement streaming responses
- Cache common responses
- Use batch processing where possible
```

### Runbook 3: Database Performance Degradation

```markdown
**Trigger:** Query latency > 2 seconds

**Steps:**
1. Check Firebase Console â†’ Performance tab
2. Identify slow queries
3. Check if indexes exist for slow queries
4. Create missing indexes:
   ```bash
   firebase deploy --only firestore:indexes
   ```
5. If indexes exist, optimize query:
   - Reduce result set size
   - Add pagination
   - Use subcollections
6. Monitor query performance
7. Document optimization in tech debt tracker

**Prevention:**
- Add indexes proactively
- Use query analyzers
- Implement pagination everywhere
- Regular performance audits
```

---

## Cost Monitoring & Optimization

### Firebase Cost Dashboard

```typescript
// Cloud Function to track daily costs
export const trackDailyCosts = functions.pubsub
  .schedule('0 8 * * *') // 8 AM daily
  .onRun(async () => {
    // Get billing data from Firebase
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    const costs = {
      date: yesterday.toISOString().split('T')[0],
      firestore_reads: await getFirestoreReads(),
      firestore_writes: await getFirestoreWrites(),
      functions_invocations: await getFunctionInvocations(),
      genai_tokens: await getGenAITokens(),
      total_estimated: 0,
    }
    
    // Calculate costs
    costs.total_estimated = 
      (costs.firestore_reads / 100000 * 0.06) +
      (costs.firestore_writes / 100000 * 0.18) +
      (costs.functions_invocations / 1000000 * 0.40) +
      (costs.genai_tokens / 1000 * 0.000125)
    
    // Store in Firestore
    await addDoc(collection(db, 'dailyCosts'), costs)
    
    // Alert if over budget
    if (costs.total_estimated > 100) { // $100/day threshold
      await sendSlackAlert('Daily costs exceeded $100!', costs)
    }
  })
```

### Cost Optimization Checklist

```markdown
## Firestore Optimization
- [ ] Implement pagination (limit queries to 20-50 docs)
- [ ] Use subcollections for 1-to-many relationships
- [ ] Avoid reading entire documents when only need specific fields
- [ ] Cache frequently accessed data
- [ ] Use batch operations instead of individual writes
- [ ] Delete unused collections and documents

## Cloud Functions Optimization
- [ ] Use appropriate memory allocation (128MB-256MB for most functions)
- [ ] Set timeout to minimum required (default 60s â†’ 10s if possible)
- [ ] Use pub/sub for async operations instead of HTTP
- [ ] Minimize cold starts with min instances (1-2 for critical functions)
- [ ] Use Cloud Run for long-running processes

## Gemini API Optimization
- [ ] Implement response caching (Redis/Firestore)
- [ ] Set max_tokens limits on all flows
- [ ] Use conversation summarization for long contexts
- [ ] Batch similar requests where possible
- [ ] Use streaming to show progress (doesn't reduce cost but improves UX)
- [ ] Monitor token usage per user and set limits

## Hosting & CDN
- [ ] Enable compression (gzip/brotli)
- [ ] Optimize images (WebP, AVIF)
- [ ] Lazy load images and components
- [ ] Use CDN for static assets
- [ ] Implement service worker for offline support

## Monitoring Costs
- [ ] Set up billing alerts ($100, $500, $1000)
- [ ] Review cost dashboard weekly
- [ ] Track cost per user metric
- [ ] Identify and optimize expensive operations
```

---

## End of Document

**Summary:** This deployment guide provides everything needed to take the Solo Founder Platform from development to production, including:

âœ… Pre-deployment checklist  
âœ… Environment configuration  
âœ… Firebase deployment process  
âœ… CI/CD pipeline setup  
âœ… Production monitoring  
âœ… Backup & disaster recovery  
âœ… Security hardening  
âœ… Performance optimization  
âœ… Scaling strategy  
âœ… Operational runbooks  
âœ… Cost monitoring  

**Next Steps:**
1. Review pre-deployment checklist
2. Set up staging environment
3. Deploy to staging and test
4. Configure monitoring and alerts
5. Deploy to production
6. Monitor closely for first 48 hours

**Related Documentation:**
- 00-QUICK-START.md - Initial setup
- 01-TECHNICAL-ARCHITECTURE.md - Infrastructure details
- 08-CURSOR-PROMPTS.md - Build instructions

---

**Production Readiness:** This guide enables a smooth, secure, and monitored production deployment of the Solo Founder Ecosystem Platform.