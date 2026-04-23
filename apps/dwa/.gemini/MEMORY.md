# User Preferences

## Code Quality Standards
- **NEVER use simplest fixes** - Always implement using industry best practices
- **NEVER bypass, ignore, or work around type issues** - Fix types properly at their source
- **NEVER use shortcuts like `z.record(z.unknown())` to bypass type validation** - Define proper typed schemas
- **NEVER use object spread `{...obj}` to bypass type incompatibilities** - Fix the underlying type definitions
- **Always fix issues at the root cause** - Not at the symptom
- When facing type mismatches, update the source type definitions to be correct and compatible

---

## Multi-Pass Diagnostic Methodology

When resolving issues and errors, perform a **comprehensive, multi-pass diagnostic**. Do not stop after identifying a single issue.

### Objective
Identify primary bugs, edge-case vulnerabilities, and architectural weaknesses that could cause recurring failures.

### Analysis Requirements

1. **Primary Bug Identification**: Fix the immediate issue reported.

2. **Dependency Mapping**: Analyze how this bug affects upstream and downstream functions.

3. **Edge-Case Stress Test**: Evaluate how the code handles:
   - Null/undefined inputs
   - Maximum/minimum values
   - Unexpected data types
   - Empty arrays/objects
   - Network failures

4. **Logical Consistency Check**: Scan for:
   - Race conditions
   - Memory leaks
   - Improper state management
   - "Silent failures" that don't crash but cause incorrect behavior

5. **Iterative Refinement**: After proposing a fix:
   - Simulate a test run mentally
   - Identify if the new code introduces any secondary regressions
   - Verify the fix doesn't break existing functionality

### Output Format
Provide:
- A list of all identified issues (Major and Minor)
- A final "Hardened" code block that addresses the entire scope of the analysis
