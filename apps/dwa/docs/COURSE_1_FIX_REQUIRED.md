# Course 1: Critical Fix Required Before Production

**Status:** ⚠️ BLOCKING ISSUE  
**Course:** Movement for Mental Performance (Course 1)  
**Issue:** Interactive component mismatch  
**Priority:** MUST FIX before deployment

---

## Issue Summary

**Problem:** Lesson 1-3 attempts to use `<BreathingExercise>` component with custom props, but:
1. The component is actually named `InteractiveBreathingExercise` (exported from `interactive-breathing.tsx`)
2. The component does NOT accept any props (hardcoded 4-4-4-4 box breathing)
3. The lesson tries to pass: `type`, `duration`, `title`, `instructions` props

**Location:** 
- File: `server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-1-3-anxiety-disorders-and-movement-therapy.md`
- Line: 235

**Current usage (BROKEN):**
```jsx
<BreathingExercise 
  type="box" 
  duration={4}
  title="4-4-4-4 Box Breathing"
  instructions="After exercise, if you feel overstimulated or anxious, use box breathing to down-regulate your nervous system. Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 2-3 minutes."
/>
```

**Available component:**
```tsx
// app/(default)/academy/components/interactive-breathing.tsx
export default function InteractiveBreathingExercise() {
  // Hardcoded 4-4-4-4 box breathing
  // No props accepted
}
```

---

## Fix Options

### Option 1: Use Component As-Is (FASTEST — 5 minutes)

**Action:** Replace lesson usage with no-props version

**Change in `lesson-1-3-anxiety-disorders-and-movement-therapy.md:235`:**
```diff
- <BreathingExercise 
-   type="box" 
-   duration={4}
-   title="4-4-4-4 Box Breathing"
-   instructions="After exercise, if you feel overstimulated or anxious, use box breathing to down-regulate your nervous system. Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 2-3 minutes."
- />
+ <InteractiveBreathingExercise />
+ 
+ **Instructions:** After exercise, if you feel overstimulated or anxious, use box breathing to down-regulate your nervous system. Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 2-3 minutes.
```

**Pros:**
- Immediate fix
- No component changes needed
- Works with existing component

**Cons:**
- Less integrated (instructions outside component)
- Can't customize duration or breathing pattern

---

### Option 2: Update Component to Accept Props (RECOMMENDED — 30 minutes)

**Action:** Enhance `InteractiveBreathingExercise` to accept optional props while maintaining backward compatibility

**Component changes needed:**
```tsx
// app/(default)/academy/components/interactive-breathing.tsx

interface BreathingExerciseProps {
  type?: 'box' | 'extended-exhale' | 'calming'; // For future expansion
  duration?: number; // Seconds per phase (default: 4)
  title?: string; // Custom title (default: "Box Breathing")
  instructions?: string; // Custom instructions
}

export default function InteractiveBreathingExercise({
  type = 'box',
  duration = 4,
  title = 'Box Breathing',
  instructions = '4-4-4-4 breathing technique'
}: BreathingExerciseProps = {}) {
  // Use duration prop to configure PHASES
  // Use title/instructions props in UI
  // ...existing logic with prop support
}
```

**Lesson usage (NO CHANGE NEEDED except name):**
```diff
- <BreathingExercise 
+ <InteractiveBreathingExercise 
    type="box" 
    duration={4}
    title="4-4-4-4 Box Breathing"
    instructions="After exercise, if you feel overstimulated or anxious, use box breathing to down-regulate your nervous system. Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 2-3 minutes."
  />
```

**Pros:**
- Flexible component (reusable across lessons)
- Clean integration
- Future-proof (can add more breathing patterns)

**Cons:**
- Requires component modification
- Need to test component changes

---

### Option 3: Create Alias Export (COMPROMISE — 10 minutes)

**Action:** Export component under both names for backward compatibility

**Component changes:**
```tsx
// app/(default)/academy/components/interactive-breathing.tsx
// ... existing component code ...

export default InteractiveBreathingExercise;

// Alias for lesson compatibility
export { InteractiveBreathingExercise as BreathingExercise };
```

**Then update lesson to use no-props pattern (same as Option 1).**

**Pros:**
- Quick fix
- Backward compatible
- Allows gradual migration

**Cons:**
- Still doesn't support props
- Two names for same component (confusing)

---

## Recommended Fix Strategy

**IMMEDIATE (for production):** Use **Option 1** — minimal change, unblocks deployment

**NEXT SPRINT:** Implement **Option 2** — proper component enhancement for long-term flexibility

---

## Testing After Fix

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to lesson:**
   - Go to `/optimization/movement-for-mental-performance/lesson-1-3-anxiety-disorders-and-movement-therapy`
   - Scroll to "Interactive: Grounding Exercise After Movement" section
   - Verify breathing exercise renders without errors

3. **Test interaction:**
   - Click "Start" button
   - Verify breathing animation works
   - Verify phase changes (Breathe In → Hold → Breathe Out → Hold)
   - Verify countdown displays correctly

4. **Verify all other lessons still work:**
   - Spot-check lessons 1, 10, 20
   - Verify no other component errors

---

## Impact Assessment

**Severity:** CRITICAL (runtime error, blocks lesson loading)  
**Affected Lessons:** 1 of 20 (lesson 1-3 only)  
**User Impact:** Cannot complete Lesson 3 (breaks learning progression)  
**Fix Time:** 5 minutes (Option 1) to 30 minutes (Option 2)  
**Testing Time:** 15 minutes

---

## Sign-Off Required

- [ ] Fix implemented (specify which option)
- [ ] Component renders without errors
- [ ] Breathing exercise functionality verified
- [ ] All 20 lessons spot-checked
- [ ] Ready for production deployment

**Fixed by:** _____________  
**Date:** _____________  
**Option used:** _____________

---

**END OF FIX DOCUMENT**
