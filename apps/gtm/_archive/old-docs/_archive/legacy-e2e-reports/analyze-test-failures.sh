#!/bin/bash

echo "=== E2E TEST FAILURE ANALYSIS ==="
echo ""

total_failures=0
total_tests=0

# Count unique test failures (excluding retries)
for dir in test-results/*/; do
  if [ -f "$dir/error-context.md" ] && [[ ! "$dir" =~ retry ]]; then
    ((total_failures++))
    testname=$(basename "$dir" | sed 's/-chromium$//' | sed 's/-/ /g')
    echo "❌ FAILED: $testname"
    
    # Try to extract meaningful error info
    if [ -f "$dir/test-failed-1.png" ]; then
      echo "   📸 Screenshot available"
    fi
    if [ -f "$dir/video.webm" ]; then
      echo "   🎥 Video available"
    fi
  fi
done

echo ""
echo "=== SUMMARY ==="
echo "Total unique failures: $total_failures"

# Count total tests from spec files
total_tests=$(grep -r "test(" e2e/*.spec.ts | wc -l | tr -d ' ')
echo "Total tests in spec files: $total_tests"

# Calculate pass rate
if [ $total_tests -gt 0 ]; then
  passed=$((total_tests - total_failures))
  pass_rate=$((passed * 100 / total_tests))
  echo "Pass rate: $pass_rate% ($passed/$total_tests passed)"
fi
