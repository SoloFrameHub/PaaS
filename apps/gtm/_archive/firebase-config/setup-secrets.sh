#!/bin/bash

# Setup Secrets for Firebase App Hosting
# This script helps create the necessary secrets in Google Secret Manager

PROJECT_ID="customer-acquisition-aca-182f9"

echo "==================================================="
echo "  SoloFrameHub Deployment Secret Setup"
echo "  Project: $PROJECT_ID"
echo "==================================================="

# Ensure user is logged in
echo "Checking gcloud auth..."
gcloud auth print-identity >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ You are not logged in. Please run 'gcloud auth login' and 'gcloud config set project $PROJECT_ID' first."
  exit 1
fi

create_secret() {
  SECRET_NAME=$1
  echo ""
  echo "--- Configuring $SECRET_NAME ---"
  
  # Check if secret exists
  EXISTS=$(gcloud secrets describe $SECRET_NAME --project="$PROJECT_ID" --format="value(name)" 2>/dev/null)
  
  if [ -n "$EXISTS" ]; then
    echo "✅ Secret '$SECRET_NAME' already exists."
    read -p "Do you want to update it? (y/N) " UPDATE
    if [[ "$UPDATE" != "y" && "$UPDATE" != "Y" ]]; then
      return
    fi
  fi

  echo "Enter value for $SECRET_NAME (input will be hidden):"
  read -s SECRET_VALUE
  
  if [ -z "$SECRET_VALUE" ]; then
    echo "⚠️  Skipping empty value."
    return
  fi

  if [ -n "$EXISTS" ]; then
    # Add new version
    echo -n "$SECRET_VALUE" | gcloud secrets versions add $SECRET_NAME --data-file=- --project="$PROJECT_ID"
    echo "✅ Updated $SECRET_NAME."
  else
    # Create new secret
    echo -n "$SECRET_VALUE" | gcloud secrets create $SECRET_NAME --data-file=- --replication-policy="automatic" --project="$PROJECT_ID"
    echo "✅ Created $SECRET_NAME."
  fi
  
  # Grant access to the App Hosting service account (default typically)
  # For now, we assume the user will handle permission binding if using a specific SA, 
  # or App Hosting's automatic permission handling.
  echo "ℹ️  Remember to grant 'Secret Manager Secret Accessor' to your App Hosting service account if not already done."
}

# 1. Google GenAI Key
create_secret "GOOGLE_GENAI_API_KEY"

# 2. Firebase Private Key (for Admin SDK)
create_secret "FIREBASE_PRIVATE_KEY"

# 3. Setup Vertex AI Permissions
echo ""
echo "==================================================="
echo "  Vertex AI Permissions"
echo "==================================================="
echo "Your App Hosting service account needs 'Vertex AI User' and 'Discovery Engine Viewer' roles."
echo "Run the following command manually if you encounter permission errors:"
echo "gcloud projects add-iam-policy-binding $PROJECT_ID --member='serviceAccount:YOUR_APP_HOSTING_SA_EMAIL' --role='roles/aiplatform.user'"

echo ""
echo "🎉 Secret setup complete!"
