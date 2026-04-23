#!/bin/bash

# Script to update E2E test files to use new test helpers
# This will add the import statement to all test files that don't have it

echo "🔧 Updating E2E test files to use new helpers..."

# Files to update
files=(
    "e2e/courses.spec.ts"
    "e2e/dashboard.spec.ts"
    "e2e/roleplay.spec.ts"
    "e2e/error-handling-and-accessibility.spec.ts"
    "e2e/tools-and-community.spec.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "📝 Checking $file..."
        
        # Check if file already has the import
        if ! grep -q "signInWithCompletedOnboarding" "$file"; then
            echo "   Adding import to $file"
            # Add import after the first import line
            sed -i '' '1 a\
import { signInWithCompletedOnboarding } from '"'"'./helpers'"'"';
' "$file"
        else
            echo "   ✅ $file already has the import"
        fi
    else
        echo "   ⚠️  $file not found"
    fi
done

echo ""
echo "✅ Done! Test files updated."
echo ""
echo "Next steps:"
echo "1. Review the changes in each test file"
echo "2. Replace setupAuthenticatedTest(page) with signInWithCompletedOnboarding(page)"
echo "3. Run tests: npm run test:e2e"
