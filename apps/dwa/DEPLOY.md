# Deployment Guide

This project is configured for **Firebase App Hosting**, designed for deployments of Next.js applications with minimal configuration.

## Prerequisites

1.  **Google Cloud Project**: `customer-acquisition-aca-182f9`
2.  **Firebase CLI**: Installed globally (`npm install -g firebase-tools`).
3.  **Permissions**: Owner/Editor access to the GCP project.

## 1. Environment Variables & Secrets

The configuration is defined in `apphosting.yaml`.

- **Public Variables**: Set directly in `apphosting.yaml` (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`).
- **Secrets**: Must be stored in Google Secret Manager.

### Setup Secrets
Run the helper script to create/update secrets:
```bash
./scripts/setup-secrets.sh
```
Required Secrets:
- `GOOGLE_GENAI_API_KEY`: Your Gemini API key.
- `FIREBASE_PRIVATE_KEY`: Service account private key for Firebase Admin SDK.

## 2. Deploying

### Option A: Push to GitHub (Recommended)
Firebase App Hosting is connected to the GitHub repository.
1.  Commit your changes.
2.  Push to the `main` branch.
3.  The rollout will start automatically. View status in the [Firebase Console](https://console.firebase.google.com/project/customer-acquisition-aca-182f9/apphosting).

### Option B: Manual Rollout via CLI
To trigger a rollout manually without pushing (or to force a specific commit):
```bash
firebase apphosting:rollout --backend customer-acquisition-academy-backend
```
*(Note: Replace backend name with your actual backend ID found in keys/console)*

## 3. Post-Deployment Verification
1.  Visit the deployed URL (e.g., `https://customer-acquisition-academy.soloframehub.com`).
2.  Test the **Coaching Chat** to verify:
    -   Firestore connection (Profile data).
    -   Vertex AI connection (RAG retrieval).
    -   Genkit configuration.
