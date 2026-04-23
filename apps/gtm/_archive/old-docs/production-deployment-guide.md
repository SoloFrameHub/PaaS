# SoloFrameHub Production Deployment Guide

**Launch: January 21, 2026 | Timeline: 18 Days | Stack: Next.js 14 + Firebase + PayPal + Endorsely**

Your educational platform launch requires integrating Firebase Authentication, PayPal subscriptions, Endorsely affiliate tracking, and production-grade infrastructure. This guide provides the critical path to deployment with code examples, prioritized tasks, and cost estimates for your solo founder bootstrap budget.

---

## Bootstrap-friendly discovery: Endorsely + PayPal via Manual API

**Endorsely is free until $1K/month in affiliate revenue** ($39/month from $1K-$5K), making it the most cost-effective solution for your launch. While Endorsely's primary integration is with Stripe, their **Manual API** supports any payment processor including PayPal Business subscriptions.

**How it works:**
1. Endorsely tracks affiliate clicks/referrals via JavaScript
2. Your PayPal webhook pushes conversion data to Endorsely's Manual API
3. Endorsely credits recurring commissions automatically
4. Bulk affiliate payouts via PayPal (built-in feature)

**Cost until first 20 customers (~$980 revenue):** $0

---

## 18-day launch timeline at a glance

The launch divides into three phases: infrastructure/security (Week 1), integration/testing (Week 2), and launch preparation (Week 3).

| Days | Phase | Critical Items |
|------|-------|----------------|
| 1-4 | Infrastructure | Firebase Auth, PayPal setup, Security Rules |
| 5-8 | Payments & Tracking | PayPal webhooks, Endorsely Manual API |
| 9-12 | Deployment | Firebase App Hosting, CI/CD, SSL |
| 13-16 | Testing & Polish | E2E tests, Security audit, GDPR |
| 17-18 | Pre-launch | Soft launch, Final checks |

---

## Firebase Authentication for Next.js 14 App Router

Use the **`next-firebase-auth-edge`** library (v1.10+) for production-ready authentication. This approach provides zero bundle size, Edge Runtime compatibility, and automatic cookie management.

### Core authentication setup

```typescript
// lib/firebase/config.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp: FirebaseApp =
  getApps()[0] || initializeApp(firebaseConfig);
export const auth: Auth = getAuth(firebaseApp);
```

### Middleware for session management

The middleware handles authentication state, cookie refresh, and route protection automatically:

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware, redirectToLogin } from "next-firebase-auth-edge";

const PUBLIC_PATHS = ["/", "/login", "/pricing", "/about"];

export async function middleware(request: NextRequest) {
  // Skip for mock auth (E2E tests)
  if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
    return NextResponse.next();
  }

  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "AuthToken",
    cookieSignatureKeys: [
      process.env.COOKIE_SECRET_CURRENT!,
      process.env.COOKIE_SECRET_PREVIOUS!
    ],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // 12 days
    },
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    },
    handleValidToken: async ({ decodedToken }, headers) => {
      // Check subscription status for premium routes
      if (request.nextUrl.pathname.startsWith("/courses/")) {
        // Subscription check happens in page component
      }
      return NextResponse.next({ request: { headers } });
    },
    handleInvalidToken: async () => {
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\.).*)"],
};
```

### Google OAuth with redirect handling

```typescript
// lib/firebase/auth.ts
"use client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "./config";

export async function signInWithGoogle(isMobile: boolean = false) {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  
  if (isMobile) {
    await signInWithRedirect(auth, provider);
  } else {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }
}

export async function handleRedirectResult() {
  const result = await getRedirectResult(auth);
  return result?.user || null;
}
```

### Maintaining mock auth for E2E tests

Your existing `NEXT_PUBLIC_MOCK_AUTH=true` flag integrates seamlessly:

```typescript
// lib/auth/authService.ts
"use client";
const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

export const MOCK_USERS = {
  student: { uid: "mock-student", email: "student@test.com", role: "student" },
  admin: { uid: "mock-admin", email: "admin@test.com", role: "admin" },
};

export async function signIn(userType?: keyof typeof MOCK_USERS) {
  if (isMockAuth) {
    const user = MOCK_USERS[userType || "student"];
    localStorage.setItem("mockUser", JSON.stringify(user));
    return user;
  }
  return signInWithGoogle();
}
```

---

## PayPal Business subscription integration

Your pricing structure ($49/month introductory, $79/month after April 2026) requires creating subscription plans via the PayPal REST API and handling webhooks for payment events.

### PayPal setup and authentication

```typescript
// lib/paypal.ts
async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  
  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );
  
  const data = await response.json();
  return data.access_token;
}
```

### Creating subscription plans

```typescript
// scripts/create-paypal-plans.ts
async function createSubscriptionPlan(productId: string, price: string) {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v1/billing/plans`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        product_id: productId,
        name: "Customer Acquisition Academy Monthly",
        status: "ACTIVE",
        billing_cycles: [{
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // Infinite
          pricing_scheme: {
            fixed_price: { value: price, currency_code: "USD" },
          },
        }],
        payment_preferences: {
          auto_bill_outstanding: true,
          payment_failure_threshold: 3, // Suspend after 3 failures
        },
      }),
    }
  );
  
  return response.json(); // Returns { id: "P-XXXX..." }
}
```

### PayPal checkout button

Install the React PayPal SDK: `npm install @paypal/react-paypal-js`

```tsx
// components/PayPalSubscribeButton.tsx
"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export function PayPalSubscribeButton({ planId, onSuccess, onError }) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: "subscription",
      }}
    >
      <PayPalButtons
        style={{ shape: "rect", color: "gold", label: "subscribe" }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: planId,
            application_context: {
              shipping_preference: "NO_SHIPPING",
              user_action: "SUBSCRIBE_NOW",
            },
          });
        }}
        onApprove={async (data) => {
          await fetch("/api/subscriptions/activate", {
            method: "POST",
            body: JSON.stringify({ subscriptionId: data.subscriptionID }),
          });
          onSuccess(data.subscriptionID);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}
```

### Webhook handling for subscription events

This webhook handles both PayPal payment events AND pushes conversion data to Endorsely:

```typescript
// app/api/webhooks/paypal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headers = Object.fromEntries(request.headers);
  const isValid = await verifyPayPalWebhook(body, headers);
  
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  
  const event = JSON.parse(body);

  // Helper for Endorsely Conversion
  const pushToEndorsely = async (payload: any) => {
    return fetch("https://api.endorsely.com/v1/conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ENDORSELY_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
  };
  
  switch (event.event_type) {
    case "BILLING.SUBSCRIPTION.ACTIVATED":
      const userEmail = event.resource.subscriber?.email_address;
      const subscriptionId = event.resource.id;
      
      // 1. Update Firestore subscription record
      await adminDb.collection("subscriptions").doc(subscriptionId).set({
        status: "active",
        planId: event.resource.plan_id,
        email: userEmail,
        startTime: event.resource.start_time,
        nextBillingTime: event.resource.billing_info?.next_billing_time,
        updatedAt: new Date(),
      }, { merge: true });
      
      // 2. Get user's Endorsely referral ID (stored during signup)
      const userDoc = await adminDb
        .collection("users")
        .where("email", "==", userEmail)
        .limit(1)
        .get();
      
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        const endorselyReferralId = userData.endorselyReferralId;
        
        // 3. Push conversion to Endorsely Manual API
        if (endorselyReferralId) {
          await fetch("https://api.endorsely.com/v1/conversions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.ENDORSELY_API_KEY}`,
            },
            body: JSON.stringify({
              referral_id: endorselyReferralId,
              transaction_id: subscriptionId,
              amount: parseFloat(event.resource.billing_info?.last_payment?.amount?.value || "49"),
              currency: "USD",
              customer_id: userDoc.docs[0].id,
              email: userEmail,
              metadata: {
                subscription_id: subscriptionId,
                plan_id: event.resource.plan_id,
                event_type: "new_subscription",
              },
            }),
          });
        }
      }
      break;
      
    case "BILLING.SUBSCRIPTION.CANCELLED":
      await adminDb.collection("subscriptions").doc(event.resource.id).update({
        status: "cancelled",
        cancelledAt: new Date(),
      });
      break;
      
    case "PAYMENT.SALE.COMPLETED":
      const paymentSubscriptionId = event.resource.billing_agreement_id;
      
      // Record payment
      await adminDb.collection("payments").add({
        subscriptionId: paymentSubscriptionId,
        transactionId: event.resource.id,
        amount: event.resource.amount.total,
        status: "completed",
        createdAt: new Date(),
      });
      
      // Credit recurring commission to Endorsely
      const subDoc = await adminDb
        .collection("subscriptions")
        .doc(paymentSubscriptionId)
        .get();
      
      if (subDoc.exists) {
        const subData = subDoc.data();
        const userRef = await adminDb
          .collection("users")
          .where("email", "==", subData?.email)
          .limit(1)
          .get();
        
        if (!userRef.empty) {
          const affiliateData = userRef.docs[0].data();
          
          if (affiliateData.endorselyReferralId) {
            await fetch("https://api.endorsely.com/v1/conversions/recurring", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ENDORSELY_API_KEY}`,
              },
              body: JSON.stringify({
                referral_id: affiliateData.endorselyReferralId,
                subscription_id: paymentSubscriptionId,
                transaction_id: event.resource.id,
                amount: parseFloat(event.resource.amount.total),
                currency: "USD",
                recurring: true,
                metadata: {
                  event_type: "subscription_renewal",
                },
              }),
            });
          }
        }
      }
      break;
      
    case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
      // Trigger dunning email
      await sendPaymentFailedEmail(event.resource.subscriber?.email_address);
      break;
  }
  
  return NextResponse.json({ received: true });
}

/**
 * Verifies the PayPal Webhook signature using the PayPal SDK or REST API
 * Placeholder implementation for production use.
 */
async function verifyPayPalWebhook(body: string, headers: any): Promise<boolean> {
  // If in development/sandbox, you might skip this or use a simplified check
  if (process.env.NODE_ENV !== "production") return true;

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: headers["paypal-auth-algo"],
      cert_url: headers["paypal-cert-url"],
      transmission_id: headers["paypal-transmission-id"],
      transmission_sig: headers["paypal-transmission-sig"],
      transmission_time: headers["paypal-transmission-time"],
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(body),
    }),
  });

  const verification = await response.json();
  return verification.verification_status === "SUCCESS";
}
```

### PayPal fees and cost estimate

| Transaction | Fee (3.49% + $0.49) | Net Revenue |
|-------------|---------------------|-------------|
| $49/month | ~$2.20 | ~$46.80 |
| $79/month | ~$3.25 | ~$75.75 |

---

## Endorsely affiliate tracking integration

Endorsely provides a bootstrap-friendly solution: **free until $1K monthly affiliate revenue**, then $39/month from $1K-$5K.

### Step 1: Install Endorsely tracking script

```tsx
// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="endorsely-tracker"
          src="https://cdn.endorsely.com/track.js"
          strategy="afterInteractive"
          onLoad={() => {
            // Initialize Endorsely tracker
            if (typeof window !== 'undefined' && (window as any).EndorselyTracker) {
              (window as any).EndorselyTracker.init(
                process.env.NEXT_PUBLIC_ENDORSELY_ACCOUNT_ID
              );
            }
          }}
        />
      </body>
    </html>
  );
}
```

### Step 2: Capture referral ID during signup

```typescript
// app/signup/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function SignupPage() {
  const [endorselyRefId, setEndorselyRefId] = useState<string | null>(null);
  
  useEffect(() => {
    // Capture Endorsely referral ID from cookie or URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlParams.get("ref");
    
    const refFromCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("endorsely_ref="))
      ?.split("=")[1];
    
    const referralId = refFromUrl || refFromCookie;
    setEndorselyRefId(referralId || null);
  }, []);
  
  const handleSignup = async (email: string, password: string) => {
    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Store Endorsely referral ID with user profile
    await adminDb.collection("users").doc(userCredential.user.uid).set({
      email,
      endorselyReferralId: endorselyRefId,
      createdAt: new Date(),
    });
  };
  
  return (
    // Your signup form JSX
  );
}
```

### Step 3: Track free signups (optional)

If you want to track free signups before they subscribe:

```typescript
// After successful signup
if (endorselyRefId) {
  await fetch("https://api.endorsely.com/v1/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ENDORSELY_API_KEY}`,
    },
    body: JSON.stringify({
      referral_id: endorselyRefId,
      email: email,
      customer_id: userCredential.user.uid,
      metadata: {
        signup_source: "direct",
      },
    }),
  });
}
```

### Step 4: Bulk affiliate payouts via PayPal

Endorsely has built-in bulk PayPal payout functionality:

1. Navigate to Endorsely dashboard → Affiliates → Payouts
2. Review commissions earned for the period
3. Click "Generate PayPal Batch File"
4. Upload to PayPal Mass Payments
5. Endorsely automatically marks payouts as completed

**Time saved:** ~3-4 hours/month compared to manual calculations and individual PayPal transfers.

### Endorsely pricing breakdown

| Revenue Threshold | Cost | Effective Until |
|------------------|------|-----------------|
| $0 - $1,000/month | **$0** | ~20 customers @ $49 |
| $1,000 - $5,000/month | **$39/month** | ~100 customers @ $49 |
| $5,000+/month | **$79/month** | 100+ customers |

**Bootstrap advantage:** You pay nothing until affiliates generate $1K in monthly sales. At that point, you're already profitable enough to cover the $39/month cost.

---

## Firebase App Hosting deployment

Firebase App Hosting became GA in April 2025 and is the recommended approach for Next.js 14 full-stack applications. It provides automatic SSR via Cloud Run, CDN caching, and integrated secrets management.

### Configuration files

```yaml
# apphosting.yaml
runConfig:
  cpu: 1
  memoryMiB: 1024
  maxInstances: 10
  minInstances: 0
  concurrency: 100

env:
  - variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID
    value: {{FIREBASE_PROJECT_ID}}
    availability:
      - BUILD
      - RUNTIME
  
  - variable: NEXT_PUBLIC_ENDORSELY_ACCOUNT_ID
    value: {{ENDORSELY_ACCOUNT_ID}}
    availability:
      - BUILD
      - RUNTIME
  
  # Secrets from Cloud Secret Manager
  - variable: FIREBASE_PRIVATE_KEY
    secret: firebasePrivateKey
  - variable: PAYPAL_CLIENT_SECRET
    secret: paypalClientSecret
  - variable: COOKIE_SECRET_CURRENT
    secret: cookieSecretCurrent
  - variable: ENDORSELY_API_KEY
    secret: endorselyApiKey
```

### Setting up secrets

```bash
# Create secrets via Firebase CLI
firebase apphosting:secrets:set FIREBASE_PRIVATE_KEY
firebase apphosting:secrets:set PAYPAL_CLIENT_SECRET
firebase apphosting:secrets:set COOKIE_SECRET_CURRENT
firebase apphosting:secrets:set COOKIE_SECRET_PREVIOUS
firebase apphosting:secrets:set ENDORSELY_API_KEY

# Grant access to App Hosting backend
firebase apphosting:secrets:grantaccess
```

### GitHub Actions CI/CD pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase App Hosting

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run test:e2e
        env:
          NEXT_PUBLIC_MOCK_AUTH: "true"

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: {{FIREBASE_PROJECT_ID}}
```

### Custom domain and SSL

Add your domain in Firebase Console → App Hosting → Settings → Domains. Configure DNS:

```
# A Records for apex domain
Type: A
Host: @
Value: 199.36.158.100

# CNAME for www
Type: CNAME
Host: www
Value: {{BACKEND_ID}}--{{FIREBASE_PROJECT_ID}}.us-central1.hosted.app
```

SSL certificates are automatically provisioned via Let's Encrypt within 24 hours.

---

## Firestore production database

### Security rules with subscription verification

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function hasActiveSubscription() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid))
        .data.subscription.status == 'active';
    }
    
    // User profiles
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId);
      allow update: if isOwner(userId) &&
        !request.resource.data.diff(resource.data).affectedKeys()
          .hasAny(['role', 'subscription.status', 'subscription.paypalSubscriptionId']);
    }
    
    // Premium course content
    match /courses/{courseId}/lessons/{lessonId} {
      allow read: if isAuthenticated() && 
        (resource.data.isFree == true || hasActiveSubscription());
    }
    
    // Payments (server-only writes)
    match /payments/{paymentId} {
      allow read: if resource.data.userId == request.auth.uid;
      allow write: if false; // Cloud Functions only
    }
    
    // Subscriptions (server-only writes)
    match /subscriptions/{subId} {
      allow read: if resource.data.userId == request.auth.uid;
      allow write: if false;
    }
  }
}
```

### User profile schema with Endorsely tracking

```typescript
// types/firestore.ts
import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  
  // Affiliate tracking
  endorselyReferralId?: string;
  affiliateSource?: string;
  
  subscription: {
    status: "active" | "inactive" | "cancelled" | "past_due";
    planId: string;
    paypalSubscriptionId?: string;
    startDate: Timestamp;
    expiresAt: Timestamp;
    autoRenew: boolean;
  };
  
  role: "user" | "admin";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  gdpr: {
    consentGiven: boolean;
    consentDate: Timestamp;
    marketingConsent: boolean;
  };
}

export interface Payment {
  id: string;
  userId: string;
  paypalTransactionId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "refunded";
  affiliateCommissionPaid?: boolean;
  createdAt: Timestamp;
}
```

### Automated daily backups

```typescript
// functions/src/backup.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const client = new admin.firestore.v1.FirestoreAdminClient();

export const scheduledBackup = functions
  .pubsub.schedule("0 2 * * *") // Daily at 2 AM UTC
  .onRun(async () => {
    const projectId = process.env.GCP_PROJECT!;
    const databaseName = client.databasePath(projectId, "(default)");
    const timestamp = new Date().toISOString().split("T")[0];
    const bucket = `gs://${projectId}-backups/firestore/${timestamp}`;
    
    await client.exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      collectionIds: [],
    });
  });
```

---

## SEO and AEO optimization

### Metadata API implementation

```typescript
// app/courses/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const course = await getCourse(params.slug);
  
  return {
    title: `${course.title} | Customer Acquisition Academy`,
    description: course.description.slice(0, 160),
    alternates: {
      canonical: `https://customer-acquisition-academy.soloframehub.com/courses/${params.slug}`,
    },
    openGraph: {
      title: course.title,
      description: course.description,
      type: "article",
      images: [course.thumbnail],
    },
  };
}
```

### Course schema markup (JSON-LD)

```typescript
// components/CourseSchema.tsx
export function CourseSchema({ course }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Customer Acquisition Academy",
      sameAs: "https://customer-acquisition-academy.soloframehub.com",
    },
    offers: {
      "@type": "Offer",
      price: 49,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: course.instructor },
    },
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### Allow AI crawlers in robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard/", "/admin/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    sitemap: "https://customer-acquisition-academy.soloframehub.com/sitemap.xml",
  };
}
```

---

## Security and monitoring

### CSP headers in middleware

```typescript
// Add to middleware.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.paypal.com https://cdn.endorsely.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://firebasestorage.googleapis.com;
  connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://api-m.paypal.com https://api.endorsely.com;
  frame-src https://*.firebaseapp.com https://www.paypal.com;
`.replace(/\s{2,}/g, " ").trim();

response.headers.set("Content-Security-Policy", cspHeader);
response.headers.set("X-Frame-Options", "DENY");
response.headers.set("X-Content-Type-Options", "nosniff");
response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
```

### Rate limiting with Upstash Redis

```typescript
// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

// Usage in API routes
const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
const { success } = await ratelimit.limit(ip);
if (!success) {
  return new Response("Rate limit exceeded", { status: 429 });
}
```

### Sentry error monitoring

```bash
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

---

## Complete 18-day launch checklist

### Days 1-4: Authentication and security foundation

- [ ] Install `next-firebase-auth-edge` and configure middleware
- [ ] Implement Google OAuth with popup/redirect handling
- [ ] Verify mock auth still works (`NEXT_PUBLIC_MOCK_AUTH=true`)
- [ ] Deploy Firestore security rules
- [ ] Configure Firebase API key restrictions
- [ ] Set up App Check with reCAPTCHA v3
- [ ] Add CSP headers to middleware

### Days 5-8: Payment and affiliate integration

- [ ] Create PayPal Business account and get API credentials
- [ ] Create product and subscription plan via API ($49/month)
- [ ] Implement PayPal checkout button component
- [ ] Set up webhook endpoint with signature verification
- [ ] Handle all subscription lifecycle events
- [ ] **Sign up for Endorsely** (free account)
- [ ] **Add Endorsely tracking script** to layout
- [ ] **Implement referral ID capture** during signup
- [ ] **Test Endorsely Manual API** conversion push from webhook

### Days 9-12: Deployment and infrastructure

- [ ] Create Firebase App Hosting backend
- [ ] Configure `apphosting.yaml` with secrets
- [ ] **Add ENDORSELY_API_KEY to secrets**
- [ ] Set up GitHub Actions CI/CD pipeline
- [ ] Configure custom domain and verify SSL
- [ ] Set up staging environment for testing
- [ ] Implement automated Firestore backups
- [ ] Configure Firestore indexes

### Days 13-16: Testing and compliance

- [ ] Run full E2E test suite against staging
- [ ] **Test affiliate referral flow end-to-end**
- [ ] **Verify PayPal → Endorsely conversion tracking**
- [ ] Security audit: test all protected routes
- [ ] Load test with expected user volumes
- [ ] Complete Privacy Policy and Terms of Service
- [ ] Implement cookie consent (CookieYes free tier)
- [ ] Set up GDPR data export endpoint
- [ ] Configure Sentry error monitoring
- [ ] Set up Google Analytics 4

### Days 17-18: Pre-launch

- [ ] Soft launch to 10-20 beta testers
- [ ] **Test affiliate link with real referral**
- [ ] **Verify commission shows in Endorsely dashboard**
- [ ] Monitor error rates and fix critical issues
- [ ] Clear test data from production
- [ ] Final backup before launch
- [ ] Prepare launch announcements
- [ ] Set up budget alerts in Google Cloud

### Launch day (January 21)

- [ ] 6 AM: Final health check all systems
- [ ] Monitor Sentry dashboard for errors
- [ ] Monitor Firebase Console for usage spikes
- [ ] **Check Endorsely dashboard for referral tracking**
- [ ] Respond to user issues within 1 hour
- [ ] Track first subscriptions in PayPal dashboard
- [ ] **Verify affiliate conversions are credited**

---

## Monthly cost estimates (with Endorsely free tier)

### At 100 users (Months 1-2)

| Service | Cost |
|---------|------|
| Firebase (Auth, Firestore, Hosting) | $0-7 |
| **Endorsely** | **$0** (under $1K revenue) |
| Sentry (free tier) | $0 |
| Domain | ~$1 |
| **Total** | **~$1-8/month** |

### At 500 users (~$2K affiliate revenue/month)

| Service | Cost |
|---------|------|
| Firebase | $10-25 |
| **Endorsely** | **$39** ($1K-$5K tier) |
| Sentry (free/team) | $0-26 |
| Upstash Redis | $0-10 |
| Domain | ~$1 |
| **Total** | **~$50-100/month** |

### At 1,000 users (Stable growth)

| Service | Cost |
|---------|------|
| Firebase | $20-50 |
| **Endorsely** | **$39-79** (depends on affiliate revenue) |
| Sentry (Team) | $26 |
| Upstash Redis | $0-10 |
| Domain | ~$1 |
| **Total** | **~$86-166/month** |

**Bootstrap savings:** Endorsely's free tier saves you $468 in the first 12 months ($39 × 12) compared to paid alternatives.

---

## Key documentation links

- **Firebase Auth for Next.js**: https://firebase.google.com/docs/auth/web/start
- **next-firebase-auth-edge**: https://next-firebase-auth-edge-docs.vercel.app
- **Firebase App Hosting**: https://firebase.google.com/docs/app-hosting
- **PayPal Subscriptions API**: https://developer.paypal.com/docs/api/subscriptions/v1
- **PayPal React SDK**: https://www.npmjs.com/package/@paypal/react-paypal-js
- **Endorsely Documentation**: https://docs.endorsely.com
- **Endorsely Manual API**: Contact support via Endorsely dashboard for API docs
- **Sentry Next.js**: https://docs.sentry.io/platforms/javascript/guides/nextjs

---

## Common pitfalls to avoid

| Issue | Solution |
|-------|----------|
| Mobile Google sign-in popup blocked | Use `signInWithRedirect` on mobile devices |
| PayPal webhook failing silently | Always verify webhook signatures before processing |
| Token not refreshing | `next-firebase-auth-edge` handles this automatically |
| Cookie size exceeds 4KB | Enable `enableMultipleCookies: true` in middleware |
| E2E tests breaking in CI | Ensure `NEXT_PUBLIC_MOCK_AUTH=true` in test environment |
| Firebase Admin in Edge Runtime | Use `next-firebase-auth-edge` which handles Web Crypto API |
| **Endorsely referral not captured** | **Check cookie consent isn't blocking tracking script** |
| **Affiliate commission not showing** | **Verify API key and webhook payload match Endorsely schema** |
| **PayPal webhook timeout** | **Keep webhook handler <10s, queue heavy processing** |

---

## Post-launch priorities (Week 1)

Items that can safely wait until after launch:

- Advanced analytics dashboards
- Automated marketing email sequences
- Additional payment methods (beyond PayPal)
- Mobile app
- Advanced admin features
- A/B testing infrastructure
- Additional social login providers (LinkedIn, GitHub)
- Affiliate onboarding email automation

Focus launch day on core functionality: users can sign up, subscribe via PayPal, access courses, and affiliates can track conversions. Everything else is iteration.

---

## Endorsely-specific best practices

### Setting up your first affiliate campaign

1. **Log into Endorsely dashboard** → Campaigns → Create Campaign
2. **Set commission structure:**
   - **30% recurring** for all affiliates
   - OR **50% first month** + 10% recurring
3. **Generate affiliate signup link** (share in launch announcement)
4. **Create promotional assets** in Endorsely Content Studio:
   - 3-5 social media post templates
   - Email swipe copy for newsletters
   - 300×250 and 728×90 banner ads

### Recruiting your first affiliates

Endorsely's AI Affiliate Finder scans the web for people promoting competitors. On day 1:

1. **Run competitor search** for companies like Rewardful, TapAffiliate
2. **Filter for micro-influencers** (5K-50K followers on Twitter/LinkedIn)
3. **Reach out with personalized pitch** highlighting your $49 price point vs competitors

**Pro tip:** Bootstrap founders with existing audiences make the best affiliates—they understand your customer.

### Monitoring affiliate quality

Not all affiliates drive profitable customers. Track in Endorsely:
- **Customer LTV by affiliate source** (some affiliates attract churners)
- **First payment success rate** (watch for fraud patterns)
- **Activation rate** (do referred customers actually use the product?)

Pause low-quality affiliates after 30 days if patterns emerge.

---

## Reconciliation and Auditing

To ensure no revenue is lost and affiliates are credited correctly, implement a weekly reconciliation process.

### Automated Reconciliation Script
Create a script to compare PayPal transactions against Firestore payments and Endorsely conversions.

```typescript
// scripts/reconcile-payments.ts
async function reconcile() {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  // 1. Fetch PayPal transactions
  const paypalSales = await getPayPalSales(startDate);

  // 2. Fetch Firestore payments
  const firestorePayments = await adminDb.collection("payments")
    .where("createdAt", ">=", startDate)
    .get();

  // 3. Compare and Report
  paypalSales.forEach(sale => {
    const matchingPayment = firestorePayments.docs.find(p => p.data().transactionId === sale.id);
    if (!matchingPayment) {
      console.error(`Missing payment in Firestore: ${sale.id}`);
    }
  });
}
```

### Manual Audit Checklist
- [ ] Verify "Conversion Rate" in Endorsely matches "Checkout Success Rate" in PayPal.
- [ ] Check for "Zombie Subscriptions" (PayPal active, Firestore inactive).
- [ ] Ensure `affiliateCommissionPaid` flag is updated in Firestore after Endorsely push.

---

## Testing Strategy: Sandbox to Production

Before going live, execute this test matrix in the Sandbox environment.

### 1. PayPal Sandbox Setup
- Create a **Business Sandbox Account** for your "store".
- Create a **Personal Sandbox Account** for your "tester".
- Copy `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` from the Sandbox tab in PayPal Developer.

### 2. Endorsely Test Mode
- Use your Endorsely Test API Key.
- Verify conversions appear in the "Test Data" section of the Endorsely dashboard.

### 3. Integrated Flow Test
1. **Referral Link**: Click a test affiliate link.
2. **Signup**: Complete the onboarding flow.
3. **Payment**: Subscribe using the Personal Sandbox account.
4. **Webhook**: Verify `BILLING.SUBSCRIPTION.ACTIVATED` triggers.
5. **Post-Checkout**: Confirm user role changes to "premium" and conversion shows in Endorsely.

---

**You're now ready to deploy SoloFrameHub to production in 18 days with Firebase Auth, PayPal subscriptions, and Endorsely affiliate tracking—all while maintaining your bootstrap budget.** 🚀