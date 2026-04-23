# SoloFrameHub v2 - Elite Sales Academy

The systematic customer acquisition engine for Solo Founders, migrated to **Next.js 16 (Turbopack)**, **React 19**, and **Tailwind CSS v4**.

## 🚀 Key Features

- **Elite Onboarding**: Dynamic founder profiling with real-time AI analysis.
- **AI Sales Lab**: 
  - **Solo Advisor AI**: Strategic coaching based on your business model.
  - **Sales Roleplay**: Simulation against 4 distinct DISC-type buyer personas.
  - **ICP Builder**: Structured workbench for audience validation.
- **Modern Academy**: 30+ lessons across Foundations, Marketing, and Sales Methodology.
- **Premium Design**: Dark-mode first, high-performance UI built with Mosaic.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI Components**: Tailwind CSS v4, Mosaic Pro
- **Auth & Database**: Firebase (Auth, Firestore, Storage)
- **AI Framework**: Firebase Genkit (Gemini 2.0 Flash & 1.5 Pro)

## 🔑 Environment Variables

Create a `.env.local` file with the following keys:

```bash
# Firebase Frontend (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_id

# Firebase Admin (Server)
FIREBASE_PROJECT_ID=your_id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=your_gemini_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🏗 Setup & Deployment

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

4. **Start Production**:
   ```bash
   npm run start
   ```

5. **Deploy to Dokploy (VPS)**
   This repo is set up for a Google-free stack (Lucia + Postgres, OpenAI, MinIO). Deployed via Dokploy on Hostinger VPS.
   - [docs/dokploy-conversion/MIGRATION-STATUS.md](docs/dokploy-conversion/MIGRATION-STATUS.md) — Dokploy migration status
   - [docs/dokploy-conversion/migration-mapping.md](docs/dokploy-conversion/migration-mapping.md) — service inventory and mapping

## 📂 Project Structure

- `app/ (default)`: Protected application routes (Dashboard, Academy, Tools).
- `app/ (auth)`: Authentication flow.
- `app/ onboarding/`: Multi-step founder profiling.
- `lib/ genkit`: AI flows and model configurations.
- `lib/ services`: Business logic (Profile, Course progress).
- `components/ ai`: Specialized AI interface components.
