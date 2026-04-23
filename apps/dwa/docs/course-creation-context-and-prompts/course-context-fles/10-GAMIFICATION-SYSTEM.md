# 10-GAMIFICATION-SYSTEM.md

**Purpose:** Engagement mechanics and business milestone tracking system  
**Estimated Size:** 15KB  
**Dependencies:** 03-DATABASE-SCHEMA.md, 04-MODULE-ARCHITECTURE.md  
**Last Updated:** 2024-11-22

---

## Table of Contents

1. [Overview](#overview)
2. [Points System](#points-system)
3. [Progression Levels](#progression-levels)
4. [Badge System](#badge-system)
5. [Business Milestone Detection](#business-milestone-detection)
6. [Leaderboards](#leaderboards)
7. [Re-engagement Triggers](#re-engagement-triggers)
8. [Certification System](#certification-system)
9. [Implementation Guide](#implementation-guide)

---

## Overview

### Design Philosophy

**White-Hat Gamification Principles:**
- **Meaningful Progress** - Track real business outcomes, not just activity
- **Intrinsic Motivation** - Reward learning depth and application, not just completion
- **Community Recognition** - Celebrate achievements in supportive environment
- **Transparent Mechanics** - Clear criteria for all rewards
- **No Dark Patterns** - No artificial scarcity, FOMO tactics, or manipulative design

### Core Objectives

1. **Increase Engagement** - Keep founders actively learning and applying frameworks
2. **Drive Completion** - Move from 3-15% (self-paced) to 40%+ completion rates
3. **Measure Real Impact** - Track business milestones, not just lesson views
4. **Build Community** - Foster peer learning and mutual support
5. **Celebrate Progress** - Recognize both learning and business achievements

### Key Metrics

```typescript
interface GamificationMetrics {
  // Engagement metrics
  daily_active_users: number
  weekly_active_users: number
  avg_session_duration: number  // minutes
  avg_lessons_per_week: number
  
  // Learning metrics
  course_completion_rate: number  // percentage
  framework_application_rate: number
  strategic_thinking_avg_score: number
  
  // Business impact metrics
  milestones_achieved: number
  founders_to_first_customer: number
  founders_to_profitability: number
  avg_time_to_first_revenue: number  // days
  
  // Community metrics
  forum_participation_rate: number
  peer_mentoring_sessions: number
  case_studies_shared: number
}
```

---

## Points System

### Point Categories

```typescript
const POINT_VALUES = {
  // ===== LEARNING ACTIONS =====
  lesson_started: 5,
  lesson_completed: 10,
  lesson_completed_with_notes: 15,
  course_completed: 100,
  
  // Assessment performance
  assessment_passed_60: 10,
  assessment_passed_70: 15,
  assessment_passed_80: 20,
  assessment_passed_90: 30,
  assessment_passed_95: 50,
  assessment_retake_improvement: 10,
  
  // ===== STRATEGIC THINKING =====
  framework_started: 10,
  framework_completed: 25,
  framework_high_quality: 40,  // AI evaluation score >85
  
  strategic_exercise_submitted: 15,
  strategic_exercise_high_score: 30,  // Score >80
  strategic_exercise_exemplary: 50,  // Score >90
  
  case_study_analysis: 15,
  case_study_deep_analysis: 25,  // >500 words with insights
  
  // ===== AI INTERACTIONS =====
  ai_coaching_session: 10,
  ai_coaching_applied: 20,  // Applied AI suggestion
  document_analyzed: 15,
  document_revised_with_feedback: 25,
  
  // ===== BUSINESS MILESTONES =====
  first_customer: 500,
  first_100_revenue: 750,
  first_1k_revenue: 1000,
  first_1k_mrr: 2000,
  first_5k_mrr: 3000,
  first_10k_mrr: 5000,
  first_profitable_month: 2500,
  product_launched: 1500,
  team_first_hire: 1000,
  
  // ===== COMMUNITY CONTRIBUTIONS =====
  forum_post_helpful: 5,
  forum_post_best_answer: 20,
  shared_case_study: 50,
  mentored_peer_session: 100,
  hosted_office_hours: 200,
  created_resource: 75,
  
  // ===== CONSISTENCY & HABITS =====
  daily_login_streak_7: 50,
  daily_login_streak_14: 100,
  daily_login_streak_30: 200,
  daily_login_streak_60: 400,
  daily_login_streak_90: 600,
  
  weekly_learning_goal_met: 25,  // Completed 3+ lessons
  monthly_learning_goal_met: 100,  // Completed 12+ lessons
  
  // ===== SPECIAL ACHIEVEMENTS =====
  competency_mastery: 200,  // Mastered all courses in SC1-SC12
  track_completed: 300,  // Completed all courses in a track
  all_tracks_completed: 1000,
  
  perfect_course: 150,  // 100% on all assessments
  speed_learner: 100,  // Completed course in 50% of avg time
  depth_learner: 100,  // Avg strategic thinking score >85
  
  // ===== MULTIPLIERS (applied to base points) =====
  streak_7days: 1.25,  // 25% bonus
  streak_30days: 1.5,  // 50% bonus
  streak_90days: 2.0,  // 100% bonus
}
```

### Point Calculation Logic

```typescript
// lib/gamification/points.ts

interface AwardPointsInput {
  user_id: string
  tenant_id: string
  action: keyof typeof POINT_VALUES
  metadata?: {
    course_id?: string
    lesson_id?: string
    score?: number
    quality_score?: number
    revenue_amount?: number
  }
}

export async function awardPoints({
  user_id,
  tenant_id,
  action,
  metadata = {}
}: AwardPointsInput): Promise<number> {
  // Get base points
  let basePoints = POINT_VALUES[action]
  
  if (!basePoints) {
    throw new Error(`Invalid action: ${action}`)
  }
  
  // Apply quality multipliers for strategic work
  if (metadata.quality_score) {
    if (metadata.quality_score >= 90) {
      basePoints *= 1.5
    } else if (metadata.quality_score >= 80) {
      basePoints *= 1.25
    }
  }
  
  // Apply streak multipliers
  const streakMultiplier = await getStreakMultiplier(user_id)
  const finalPoints = Math.round(basePoints * streakMultiplier)
  
  // Update user points in Firestore
  const userRef = doc(db, 'users', user_id)
  await updateDoc(userRef, {
    'gamification.total_points': increment(finalPoints),
    'gamification.points_this_week': increment(finalPoints),
    'gamification.points_this_month': increment(finalPoints),
    'gamification.last_point_earned': new Date(),
  })
  
  // Create point history record
  await addDoc(collection(db, 'pointHistory'), {
    user_id,
    tenant_id,
    action,
    points_earned: finalPoints,
    base_points: basePoints,
    multiplier: streakMultiplier,
    metadata,
    earned_at: new Date(),
  })
  
  // Check for level progression
  await checkLevelProgression(user_id)
  
  // Check for badge unlocks
  await checkBadgeUnlocks(user_id, action, metadata)
  
  // Send notification
  await sendPointsNotification(user_id, {
    action,
    points: finalPoints,
    newTotal: await getUserTotalPoints(user_id),
  })
  
  return finalPoints
}

async function getStreakMultiplier(user_id: string): Promise<number> {
  const streak = await getUserStreak(user_id)
  
  if (streak >= 90) return POINT_VALUES.streak_90days
  if (streak >= 30) return POINT_VALUES.streak_30days
  if (streak >= 7) return POINT_VALUES.streak_7days
  
  return 1.0
}

async function getUserStreak(user_id: string): Promise<number> {
  const userDoc = await getDoc(doc(db, 'users', user_id))
  return userDoc.data()?.gamification?.current_streak || 0
}
```

### Streak Tracking

```typescript
// lib/gamification/streaks.ts

export async function updateStreak(user_id: string): Promise<void> {
  const userRef = doc(db, 'users', user_id)
  const userDoc = await getDoc(userRef)
  const userData = userDoc.data()
  
  const lastActivity = userData?.gamification?.last_activity_date
  const currentStreak = userData?.gamification?.current_streak || 0
  const longestStreak = userData?.gamification?.longest_streak || 0
  
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  
  let newStreak = currentStreak
  
  if (!lastActivity || lastActivity === yesterday) {
    // Continue or start streak
    newStreak = currentStreak + 1
  } else if (lastActivity !== today) {
    // Streak broken
    newStreak = 1
  }
  // If lastActivity === today, don't change streak
  
  await updateDoc(userRef, {
    'gamification.current_streak': newStreak,
    'gamification.longest_streak': Math.max(newStreak, longestStreak),
    'gamification.last_activity_date': today,
  })
  
  // Award streak milestone badges
  if ([7, 14, 30, 60, 90].includes(newStreak)) {
    await awardPoints({
      user_id,
      tenant_id: userData.tenant_id,
      action: `daily_login_streak_${newStreak}` as any,
    })
  }
}
```

---

## Progression Levels

### Level Definitions

```typescript
interface Level {
  id: string
  name: string
  min_points: number
  max_points: number
  benefits: string[]
  icon: string
  color: string
}

export const LEVELS: Level[] = [
  {
    id: 'aspiring',
    name: 'Aspiring Founder',
    min_points: 0,
    max_points: 99,
    benefits: [
      'Access to Foundation track courses',
      'Community forum access',
      'Basic AI coaching',
    ],
    icon: 'ðŸŒ±',
    color: '#10b981', // emerald
  },
  {
    id: 'validated',
    name: 'Validated Founder',
    min_points: 100,
    max_points: 299,
    benefits: [
      'Access to Growth track courses',
      'Advanced AI coaching',
      'Document critique tools',
      'Peer matching for accountability',
    ],
    icon: 'ðŸš€',
    color: '#3b82f6', // blue
  },
  {
    id: 'revenue',
    name: 'Revenue-Stage Founder',
    min_points: 300,
    max_points: 699,
    benefits: [
      'Access to Scale track courses',
      'Priority AI coaching',
      'Expert AMAs',
      'Advanced analytics dashboard',
    ],
    icon: 'ðŸ’°',
    color: '#8b5cf6', // primary
  },
  {
    id: 'scaling',
    name: 'Scaling Founder',
    min_points: 700,
    max_points: 1499,
    benefits: [
      'Access to Mastery track courses',
      'Private mastermind groups',
      'Guest expert sessions',
      'Early access to new features',
    ],
    icon: 'ðŸ“ˆ',
    color: '#f59e0b', // amber
  },
  {
    id: 'master',
    name: 'Master Builder',
    min_points: 1500,
    max_points: Infinity,
    benefits: [
      'All platform features',
      'Mentor other founders',
      'Contribute to course content',
      'Speaking opportunities',
      'Lifetime access guarantee',
    ],
    icon: 'ðŸ‘‘',
    color: '#ef4444', // red
  },
]

export function getLevelByPoints(points: number): Level {
  return LEVELS.find(
    level => points >= level.min_points && points <= level.max_points
  ) || LEVELS[0]
}

export function getNextLevel(currentPoints: number): Level | null {
  const currentLevel = getLevelByPoints(currentPoints)
  const currentIndex = LEVELS.findIndex(l => l.id === currentLevel.id)
  
  if (currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1]
  }
  
  return null
}

export function getProgressToNextLevel(currentPoints: number): {
  current: Level
  next: Level | null
  percentage: number
  pointsNeeded: number
} {
  const current = getLevelByPoints(currentPoints)
  const next = getNextLevel(currentPoints)
  
  if (!next) {
    return {
      current,
      next: null,
      percentage: 100,
      pointsNeeded: 0,
    }
  }
  
  const pointsInCurrentLevel = currentPoints - current.min_points
  const pointsNeededForLevel = next.min_points - current.min_points
  const percentage = (pointsInCurrentLevel / pointsNeededForLevel) * 100
  const pointsNeeded = next.min_points - currentPoints
  
  return {
    current,
    next,
    percentage,
    pointsNeeded,
  }
}
```

### Level Progression Logic

```typescript
// lib/gamification/levels.ts

export async function checkLevelProgression(user_id: string): Promise<void> {
  const userRef = doc(db, 'users', user_id)
  const userDoc = await getDoc(userRef)
  const userData = userDoc.data()
  
  const currentPoints = userData?.gamification?.total_points || 0
  const currentLevelId = userData?.gamification?.level || 'aspiring'
  
  const newLevel = getLevelByPoints(currentPoints)
  
  // Check if level changed
  if (newLevel.id !== currentLevelId) {
    await levelUp(user_id, newLevel)
  }
}

async function levelUp(user_id: string, newLevel: Level): Promise<void> {
  const userRef = doc(db, 'users', user_id)
  
  // Update user level
  await updateDoc(userRef, {
    'gamification.level': newLevel.id,
    'gamification.level_achieved_at': new Date(),
  })
  
  // Create level history record
  await addDoc(collection(db, 'levelHistory'), {
    user_id,
    level_id: newLevel.id,
    level_name: newLevel.name,
    achieved_at: new Date(),
  })
  
  // Send celebration notification
  await sendLevelUpNotification(user_id, {
    level: newLevel,
    benefits: newLevel.benefits,
  })
  
  // Award level-up badge
  await awardBadge(user_id, `level_${newLevel.id}`)
  
  // Trigger confetti animation in UI
  await triggerCelebration(user_id, 'level_up')
}
```

---

## Badge System

### Badge Categories & Definitions

```typescript
interface Badge {
  id: string
  name: string
  description: string
  category: 'completion' | 'mastery' | 'milestone' | 'community' | 'special'
  criteria: BadgeCriteria
  icon_url: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points_value: number
}

interface BadgeCriteria {
  type: string
  conditions: Record<string, any>
}

export const BADGES: Badge[] = [
  // ===== COMPETENCY MASTERY BADGES =====
  {
    id: 'sc1_master',
    name: 'Market Validation Master',
    description: 'Complete all courses for SC1 (Market Validation & Problem-Solution Fit)',
    category: 'mastery',
    criteria: {
      type: 'competency_mastery',
      conditions: { competency: 'SC1', min_score: 80 },
    },
    rarity: 'rare',
    points_value: 200,
  },
  {
    id: 'sc2_master',
    name: 'GTM Strategist',
    description: 'Master Solo Founder GTM Strategy & Execution (SC2)',
    category: 'mastery',
    criteria: {
      type: 'competency_mastery',
      conditions: { competency: 'SC2', min_score: 80 },
    },
    rarity: 'rare',
    points_value: 200,
  },
  // ... SC3-SC12 badges
  
  // ===== BUSINESS MILESTONE BADGES =====
  {
    id: 'first_dollar',
    name: 'First Dollar',
    description: 'Achieve your first customer and revenue',
    category: 'milestone',
    criteria: {
      type: 'business_milestone',
      conditions: { milestone: 'first_customer', verified: true },
    },
    rarity: 'epic',
    points_value: 500,
  },
  {
    id: 'profitable',
    name: 'Profitable Founder',
    description: 'Achieve first profitable month',
    category: 'milestone',
    criteria: {
      type: 'business_milestone',
      conditions: { milestone: 'first_profitable_month', verified: true },
    },
    rarity: 'epic',
    points_value: 2500,
  },
  {
    id: 'mrr_1k',
    name: '$1K MRR Club',
    description: 'Reach $1,000 in monthly recurring revenue',
    category: 'milestone',
    criteria: {
      type: 'business_milestone',
      conditions: { milestone: 'first_1k_mrr', verified: true },
    },
    rarity: 'legendary',
    points_value: 2000,
  },
  {
    id: 'mrr_10k',
    name: '$10K MRR Club',
    description: 'Reach $10,000 in monthly recurring revenue',
    category: 'milestone',
    criteria: {
      type: 'business_milestone',
      conditions: { milestone: 'first_10k_mrr', verified: true },
    },
    rarity: 'legendary',
    points_value: 5000,
  },
  
  // ===== COMPLETION BADGES =====
  {
    id: 'track_foundation_complete',
    name: 'Foundation Graduate',
    description: 'Complete all Foundation track courses',
    category: 'completion',
    criteria: {
      type: 'track_completion',
      conditions: { track: 'foundation' },
    },
    rarity: 'rare',
    points_value: 300,
  },
  {
    id: 'all_tracks_complete',
    name: 'Academy Master',
    description: 'Complete all four course tracks',
    category: 'completion',
    criteria: {
      type: 'all_tracks_completion',
      conditions: {},
    },
    rarity: 'legendary',
    points_value: 1000,
  },
  
  // ===== COMMUNITY BADGES =====
  {
    id: 'helpful_peer',
    name: 'Helpful Peer',
    description: 'Have 10 forum posts marked as helpful',
    category: 'community',
    criteria: {
      type: 'community_contribution',
      conditions: { helpful_posts: 10 },
    },
    rarity: 'common',
    points_value: 50,
  },
  {
    id: 'mentor',
    name: 'Community Mentor',
    description: 'Conduct 5 peer mentoring sessions',
    category: 'community',
    criteria: {
      type: 'mentoring',
      conditions: { sessions: 5 },
    },
    rarity: 'rare',
    points_value: 500,
  },
  
  // ===== SPECIAL ACHIEVEMENT BADGES =====
  {
    id: 'perfect_strategist',
    name: 'Perfect Strategist',
    description: 'Score 100% on all assessments in a course',
    category: 'special',
    criteria: {
      type: 'perfect_course',
      conditions: { min_assessments: 5 },
    },
    rarity: 'epic',
    points_value: 150,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a course in 50% of average time with >80% scores',
    category: 'special',
    criteria: {
      type: 'speed_learning',
      conditions: { time_multiplier: 0.5, min_score: 80 },
    },
    rarity: 'rare',
    points_value: 100,
  },
  {
    id: 'deep_thinker',
    name: 'Deep Thinker',
    description: 'Maintain >85 average strategic thinking score across 10 exercises',
    category: 'special',
    criteria: {
      type: 'strategic_depth',
      conditions: { min_exercises: 10, min_avg_score: 85 },
    },
    rarity: 'rare',
    points_value: 100,
  },
  {
    id: 'framework_architect',
    name: 'Framework Architect',
    description: 'Build 10+ custom frameworks using AI tools',
    category: 'special',
    criteria: {
      type: 'framework_creation',
      conditions: { frameworks_built: 10, min_quality: 75 },
    },
    rarity: 'epic',
    points_value: 200,
  },
  
  // ===== STREAK BADGES =====
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: '7-day learning streak',
    category: 'special',
    criteria: {
      type: 'streak',
      conditions: { days: 7 },
    },
    rarity: 'common',
    points_value: 50,
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: '30-day learning streak',
    category: 'special',
    criteria: {
      type: 'streak',
      conditions: { days: 30 },
    },
    rarity: 'rare',
    points_value: 200,
  },
  {
    id: 'quarter_champion',
    name: 'Quarter Champion',
    description: '90-day learning streak',
    category: 'special',
    criteria: {
      type: 'streak',
      conditions: { days: 90 },
    },
    rarity: 'legendary',
    points_value: 600,
  },
]
```

### Badge Unlock Logic

```typescript
// lib/gamification/badges.ts

export async function checkBadgeUnlocks(
  user_id: string,
  action: string,
  metadata: Record<string, any> = {}
): Promise<Badge[]> {
  const userData = await getUserData(user_id)
  const earnedBadges = userData.gamification?.badges || []
  
  // Filter badges user hasn't earned yet
  const eligibleBadges = BADGES.filter(badge => 
    !earnedBadges.includes(badge.id)
  )
  
  const newlyEarnedBadges: Badge[] = []
  
  for (const badge of eligibleBadges) {
    const meetsC riteria = await evaluateBadgeCriteria(
      badge.criteria,
      userData,
      action,
      metadata
    )
    
    if (meetsCriteria) {
      await awardBadge(user_id, badge.id)
      newlyEarnedBadges.push(badge)
    }
  }
  
  return newlyEarnedBadges
}

async function evaluateBadgeCriteria(
  criteria: BadgeCriteria,
  userData: any,
  action: string,
  metadata: Record<string, any>
): Promise<boolean> {
  switch (criteria.type) {
    case 'competency_mastery':
      return await checkCompetencyMastery(
        userData,
        criteria.conditions.competency,
        criteria.conditions.min_score
      )
    
    case 'business_milestone':
      return await checkBusinessMilestone(
        userData,
        criteria.conditions.milestone,
        criteria.conditions.verified
      )
    
    case 'track_completion':
      return await checkTrackCompletion(
        userData,
        criteria.conditions.track
      )
    
    case 'streak':
      return userData.gamification?.current_streak >= criteria.conditions.days
    
    case 'framework_creation':
      return await checkFrameworkCount(
        userData,
        criteria.conditions.frameworks_built,
        criteria.conditions.min_quality
      )
    
    // Add more criteria evaluators...
    
    default:
      return false
  }
}

async function awardBadge(user_id: string, badge_id: string): Promise<void> {
  const badge = BADGES.find(b => b.id === badge_id)
  if (!badge) return
  
  const userRef = doc(db, 'users', user_id)
  
  // Add badge to user
  await updateDoc(userRef, {
    'gamification.badges': arrayUnion(badge_id),
    'gamification.total_points': increment(badge.points_value),
  })
  
  // Create badge history record
  await addDoc(collection(db, 'badgeHistory'), {
    user_id,
    badge_id,
    badge_name: badge.name,
    earned_at: new Date(),
    points_awarded: badge.points_value,
  })
  
  // Send notification
  await sendBadgeNotification(user_id, badge)
  
  // Trigger celebration
  await triggerCelebration(user_id, 'badge_earned', { badge })
}
```

---

## Business Milestone Detection

### Milestone Types

```typescript
enum MilestoneType {
  // Revenue milestones
  FIRST_CUSTOMER = 'first_customer',
  FIRST_100_REVENUE = 'first_100_revenue',
  FIRST_1K_REVENUE = 'first_1k_revenue',
  FIRST_1K_MRR = 'first_1k_mrr',
  FIRST_5K_MRR = 'first_5k_mrr',
  FIRST_10K_MRR = 'first_10k_mrr',
  FIRST_100K_REVENUE = 'first_100k_revenue',
  
  // Product milestones
  PRODUCT_LAUNCHED = 'product_launch',
  BETA_LAUNCHED = 'beta_launch',
  FEATURE_SHIPPED = 'feature_shipped',
  
  // Growth milestones
  FIRST_PROFITABLE_MONTH = 'profitability',
  POSITIVE_UNIT_ECONOMICS = 'unit_econ_positive',
  BREAK_EVEN = 'break_even',
  
  // Team milestones
  TEAM_FIRST_HIRE = 'team_hire',
  TEAM_5_PEOPLE = 'team_5',
  
  // Funding milestones (optional - we're bootstrap-focused)
  ACCELERATOR_ACCEPTED = 'accelerator',
  
  // Exit milestones
  ACQUISITION_OFFER = 'acquisition_offer',
  EXIT = 'exit',
}

interface MilestoneSubmission {
  user_id: string
  tenant_id: string
  type: MilestoneType
  details: {
    revenue_amount?: number
    customer_count?: number
    mrr_amount?: number
    description: string
    achieved_date: Date
    proof_url?: string  // Screenshot, invoice, analytics, etc.
  }
  verified: boolean
  submitted_at: Date
  verified_at?: Date
  verifier_notes?: string
}
```

### Milestone Submission Flow

```typescript
// lib/gamification/milestones.ts

export async function submitMilestone(
  user_id: string,
  type: MilestoneType,
  details: MilestoneSubmission['details']
): Promise<string> {
  const userData = await getUserData(user_id)
  
  // Check if milestone already achieved
  const existingMilestones = await getDocs(
    query(
      collection(db, 'businessMilestones'),
      where('user_id', '==', user_id),
      where('type', '==', type),
      where('verified', '==', true)
    )
  )
  
  if (!existingMilestones.empty) {
    throw new Error('Milestone already achieved')
  }
  
  // Create milestone submission
  const milestoneRef = await addDoc(collection(db, 'businessMilestones'), {
    user_id,
    tenant_id: userData.tenant_id,
    type,
    details,
    verified: false,
    submitted_at: new Date(),
  })
  
  // Award provisional points (will be confirmed on verification)
  await awardPoints({
    user_id,
    tenant_id: userData.tenant_id,
    action: type as any,
    metadata: {
      milestone_id: milestoneRef.id,
      provisional: true,
    },
  })
  
  // Notify admins for verification
  await notifyAdminsForVerification(milestoneRef.id, type, details)
  
  // Send confirmation to user
  await sendMilestoneSubmissionConfirmation(user_id, type)
  
  return milestoneRef.id
}
```

### Admin Verification Process

```typescript
// lib/admin/milestones.ts

export async function verifyMilestone(
  milestone_id: string,
  verified: boolean,
  verifier_notes?: string
): Promise<void> {
  const milestoneRef = doc(db, 'businessMilestones', milestone_id)
  const milestoneDoc = await getDoc(milestoneRef)
  
  if (!milestoneDoc.exists()) {
    throw new Error('Milestone not found')
  }
  
  const milestone = milestoneDoc.data() as MilestoneSubmission
  
  // Update milestone status
  await updateDoc(milestoneRef, {
    verified,
    verified_at: new Date(),
    verifier_notes,
  })
  
  if (verified) {
    // Award verification bonus points
    await awardPoints({
      user_id: milestone.user_id,
      tenant_id: milestone.tenant_id,
      action: 'milestone_verified' as any,
      metadata: {
        milestone_type: milestone.type,
        bonus: 100,
      },
    })
    
    // Check for related badges
    await checkBadgeUnlocks(milestone.user_id, milestone.type, {
      verified: true,
    })
    
    // Add to public success wall
    await addToSuccessWall(milestone)
    
    // Send congratulations
    await sendMilestoneVerifiedNotification(milestone.user_id, milestone)
    
    // Trigger major celebration
    await triggerCelebration(milestone.user_id, 'milestone_verified', {
      milestone,
    })
  } else {
    // Send feedback to user
    await sendMilestoneRejectionNotification(
      milestone.user_id,
      milestone,
      verifier_notes
    )
  }
}

async function addToSuccessWall(milestone: MilestoneSubmission): Promise<void> {
  await addDoc(collection(db, 'successStories'), {
    user_id: milestone.user_id,
    milestone_type: milestone.type,
    revenue_amount: milestone.details.revenue_amount,
    description: milestone.details.description,
    achieved_at: milestone.details.achieved_date,
    verified_at: new Date(),
    featured: milestone.type === MilestoneType.FIRST_10K_MRR, // Auto-feature big milestones
  })
}
```

---

## Leaderboards

### Leaderboard Types

```typescript
enum LeaderboardType {
  GLOBAL_POINTS = 'global_points',
  MONTHLY_POINTS = 'monthly_points',
  WEEKLY_POINTS = 'weekly_points',
  
  STRATEGIC_THINKING = 'strategic_thinking',
  FRAMEWORK_BUILDERS = 'framework_builders',
  COMMUNITY_HELPERS = 'community_helpers',
  
  FASTEST_TO_REVENUE = 'fastest_revenue',
  HIGHEST_MRR = 'highest_mrr',
  
  MODULE_SPECIFIC = 'module_specific',  // Separate leaderboards per module
}

interface LeaderboardEntry {
  user_id: string
  user_name: string
  user_avatar?: string
  tenant_id: string
  score: number
  rank: number
  metadata?: Record<string, any>
}
```

### Leaderboard Queries

```typescript
// lib/gamification/leaderboards.ts

export async function getLeaderboard(
  type: LeaderboardType,
  options: {
    limit?: number
    module_id?: string
    timeframe?: 'all_time' | 'month' | 'week'
  } = {}
): Promise<LeaderboardEntry[]> {
  const { limit = 10, module_id, timeframe = 'all_time' } = options
  
  let leaderboardData: LeaderboardEntry[] = []
  
  switch (type) {
    case LeaderboardType.GLOBAL_POINTS:
      leaderboardData = await getPointsLeaderboard(timeframe, limit)
      break
    
    case LeaderboardType.STRATEGIC_THINKING:
      leaderboardData = await getStrategicThinkingLeaderboard(limit)
      break
    
    case LeaderboardType.FRAMEWORK_BUILDERS:
      leaderboardData = await getFrameworkBuildersLeaderboard(limit)
      break
    
    case LeaderboardType.HIGHEST_MRR:
      leaderboardData = await getMRRLeaderboard(limit)
      break
    
    case LeaderboardType.MODULE_SPECIFIC:
      if (!module_id) throw new Error('module_id required')
      leaderboardData = await getModuleLeaderboard(module_id, limit)
      break
  }
  
  // Add rank numbers
  return leaderboardData.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }))
}

async function getPointsLeaderboard(
  timeframe: string,
  limit: number
): Promise<LeaderboardEntry[]> {
  const pointsField = timeframe === 'week' 
    ? 'gamification.points_this_week'
    : timeframe === 'month'
    ? 'gamification.points_this_month'
    : 'gamification.total_points'
  
  const usersSnapshot = await getDocs(
    query(
      collection(db, 'users'),
      orderBy(pointsField, 'desc'),
      limit(limit)
    )
  )
  
  return usersSnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      user_id: doc.id,
      user_name: data.name,
      user_avatar: data.avatar_url,
      tenant_id: data.tenant_id,
      score: data.gamification?.[pointsField.split('.')[1]] || 0,
      rank: 0, // Will be assigned by parent function
    }
  })
}

async function getMRRLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
  // Get verified milestones with MRR data
  const milestonesSnapshot = await getDocs(
    query(
      collection(db, 'businessMilestones'),
      where('verified', '==', true),
      where('type', 'in', ['first_1k_mrr', 'first_5k_mrr', 'first_10k_mrr']),
      orderBy('details.mrr_amount', 'desc'),
      limit(limit)
    )
  )
  
  // Get unique users (one entry per user with highest MRR)
  const userMRRMap = new Map()
  
  for (const doc of milestonesSnapshot.docs) {
    const data = doc.data()
    const existing = userMRRMap.get(data.user_id)
    
    if (!existing || data.details.mrr_amount > existing.mrr_amount) {
      userMRRMap.set(data.user_id, {
        user_id: data.user_id,
        mrr_amount: data.details.mrr_amount,
      })
    }
  }
  
  // Enrich with user data
  const entries: LeaderboardEntry[] = []
  
  for (const [user_id, data] of userMRRMap) {
    const userDoc = await getDoc(doc(db, 'users', user_id))
    const userData = userDoc.data()
    
    entries.push({
      user_id,
      user_name: userData?.name || 'Anonymous',
      user_avatar: userData?.avatar_url,
      tenant_id: userData?.tenant_id,
      score: data.mrr_amount,
      rank: 0,
      metadata: {
        mrr: data.mrr_amount,
      },
    })
  }
  
  return entries.sort((a, b) => b.score - a.score)
}
```

### User Rank Display

```typescript
// components/gamification/UserRank.tsx

export function UserRank({ userId, leaderboardType }: UserRankProps) {
  const [rank, setRank] = useState<number | null>(null)
  const [nearbyUsers, setNearbyUsers] = useState<LeaderboardEntry[]>([])
  
  useEffect(() => {
    async function fetchRank() {
      // Get user's rank and nearby competitors
      const data = await getUserRankWithContext(userId, leaderboardType, 2)
      setRank(data.rank)
      setNearbyUsers(data.nearby)
    }
    
    fetchRank()
  }, [userId, leaderboardType])
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Your Ranking</h3>
      
      {rank !== null ? (
        <div>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary-600">
              #{rank}
            </div>
            <div className="text-sm text-neutral-600">
              Global Ranking
            </div>
          </div>
          
          {nearbyUsers.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Nearby Founders</h4>
              <div className="space-y-2">
                {nearbyUsers.map((user) => (
                  <div 
                    key={user.user_id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded",
                      user.user_id === userId && "bg-primary-50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        #{user.rank}
                      </span>
                      <span className="text-sm">
                        {user.user_id === userId ? 'You' : user.user_name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold">
                      {user.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-neutral-600">Loading...</p>
      )}
    </Card>
  )
}
```

---

## Re-engagement Triggers

### Inactivity Detection

```typescript
// lib/gamification/reengagement.ts

export async function checkInactiveUsers(): Promise<void> {
  // Run daily via Cloud Functions
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000)
  
  const inactiveUsers = await getDocs(
    query(
      collection(db, 'users'),
      where('gamification.last_activity_date', '<', sevenDaysAgo),
      where('subscription_status', '==', 'active')
    )
  )
  
  for (const userDoc of inactiveUsers.docs) {
    await triggerReengagement(userDoc.id, userDoc.data())
  }
}

async function triggerReengagement(
  user_id: string,
  userData: any
): Promise<void> {
  const lastActivity = userData.last_activity_type
  const daysSinceActivity = Math.floor(
    (Date.now() - userData.gamification.last_activity_date.toMillis()) / 86400000
  )
  
  // Choose reengagement strategy based on last activity
  if (lastActivity === 'lesson_in_progress') {
    await sendEmail(user_id, 'continue_your_course', {
      courseName: userData.last_course_name,
      nextLesson: userData.next_lesson_title,
      progress: userData.course_progress,
    })
  } else if (lastActivity === 'framework_started') {
    await sendEmail(user_id, 'finish_your_framework', {
      toolName: userData.last_tool_name,
      progress: userData.tool_progress,
    })
  } else {
    // Generic reengagement
    await sendEmail(user_id, 'we_miss_you', {
      daysSinceActivity,
      newContent: await getNewContentSinceLastVisit(userData.gamification.last_activity_date),
    })
  }
  
  // Award comeback bonus if they return
  await setReengagementBonus(user_id, daysSinceActivity)
}

async function setReengagementBonus(
  user_id: string,
  daysSinceActivity: number
): Promise<void> {
  const bonus = Math.min(daysSinceActivity * 10, 200) // Max 200 points
  
  await updateDoc(doc(db, 'users', user_id), {
    'gamification.comeback_bonus': bonus,
  })
}
```

---

## Certification System

### Certification Definitions

```typescript
interface Certification {
  id: string
  name: string
  description: string
  requirements: CertificationRequirement[]
  certificate_template: string
  badge_icon: string
}

interface CertificationRequirement {
  type: 'track_completion' | 'min_score' | 'frameworks_built' | 'roleplay_sessions' | 'business_milestone'
  value: any
  description: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'foundation_certified',
    name: 'Foundation Certified Founder',
    description: 'Master the fundamentals of solo entrepreneurship',
    requirements: [
      {
        type: 'track_completion',
        value: 'foundation',
        description: 'Complete all Foundation track courses',
      },
      {
        type: 'min_score',
        value: 80,
        description: 'Achieve 80%+ on all assessments',
      },
      {
        type: 'frameworks_built',
        value: 3,
        description: 'Build 3 strategic frameworks',
      },
    ],
    certificate_template: 'foundation_cert_template',
    badge_icon: 'foundation_cert_badge',
  },
  {
    id: 'growth_certified',
    name: 'Growth Certified Founder',
    description: 'Master growth strategies and execution',
    requirements: [
      {
        type: 'track_completion',
        value: 'growth',
        description: 'Complete all Growth track courses',
      },
      {
        type: 'min_score',
        value: 85,
        description: 'Achieve 85%+ on all assessments',
      },
      {
        type: 'business_milestone',
        value: 'first_customer',
        description: 'Achieve first customer milestone',
      },
    ],
    certificate_template: 'growth_cert_template',
    badge_icon: 'growth_cert_badge',
  },
  // Add more certifications...
]
```

### Certificate Generation

```typescript
// lib/gamification/certifications.ts

export async function generateCertificate(
  user_id: string,
  certification_id: string
): Promise<string> {
  const certification = CERTIFICATIONS.find(c => c.id === certification_id)
  if (!certification) throw new Error('Certification not found')
  
  // Check if user meets all requirements
  const eligible = await checkCertificationEligibility(user_id, certification)
  if (!eligible) {
    throw new Error('User does not meet certification requirements')
  }
  
  const userData = await getUserData(user_id)
  
  // Generate certificate data
  const certificateData = {
    userName: userData.name,
    certificationName: certification.name,
    completionDate: new Date(),
    certificateId: `CERT-${user_id.slice(0, 8)}-${certification_id}-${Date.now()}`,
    verificationUrl: `https://soloframehub.com/verify/${certificateId}`,
  }
  
  // Generate PDF certificate
  const pdfUrl = await generateCertificatePDF(
    certification.certificate_template,
    certificateData
  )
  
  // Store in Firestore
  await updateDoc(doc(db, 'users', user_id), {
    'certifications': arrayUnion({
      id: certification_id,
      name: certification.name,
      issued_at: new Date(),
      certificate_url: pdfUrl,
      certificate_id: certificateData.certificateId,
    }),
  })
  
  // Award certification badge
  await awardBadge(user_id, `cert_${certification_id}`)
  
  // Send email with certificate
  await sendCertificateEmail(user_id, {
    certification: certification.name,
    pdfUrl,
    certificateId: certificateData.certificateId,
  })
  
  return pdfUrl
}

async function checkCertificationEligibility(
  user_id: string,
  certification: Certification
): Promise<boolean> {
  const userData = await getUserData(user_id)
  
  for (const requirement of certification.requirements) {
    const meets = await evaluateRequirement(user_id, userData, requirement)
    if (!meets) return false
  }
  
  return true
}
```

---

## Implementation Guide

### Step 1: Database Setup

```typescript
// Firestore collections for gamification
collections: [
  'pointHistory',
  'badgeHistory',
  'levelHistory',
  'businessMilestones',
  'leaderboards',
  'successStories',
  'certifications',
]
```

### Step 2: Cloud Functions

```typescript
// functions/src/gamification.ts

// Daily cron job to update streaks
export const updateStreaks = functions.pubsub
  .schedule('0 0 * * *') // Midnight UTC
  .onRun(async () => {
    // Reset weekly/monthly points
    // Check for broken streaks
    // Update leaderboards
  })

// Daily cron job to check inactive users
export const checkInactive = functions.pubsub
  .schedule('0 10 * * *') // 10am UTC
  .onRun(async () => {
    await checkInactiveUsers()
  })

// Trigger on new milestone submission
export const onMilestoneSubmitted = functions.firestore
  .document('businessMilestones/{milestoneId}')
  .onCreate(async (snap) => {
    const milestone = snap.data()
    await notifyAdminsForVerification(snap.id, milestone.type, milestone.details)
  })
```

### Step 3: UI Components

```typescript
// Key UI components to build:
- GamificationDashboard
- PointsDisplay
- LevelProgressBar
- BadgeShowcase
- LeaderboardTable
- MilestoneSubmissionForm
- CertificateDisplay
```

---

## Success Metrics

Track these metrics to evaluate gamification effectiveness:

```typescript
interface GamificationSuccessMetrics {
  // Engagement
  weekly_active_users_increase: number  // Target: +25%
  avg_session_duration_increase: number  // Target: +30%
  
  // Completion
  course_completion_rate: number  // Target: 40%+ (up from 3-15%)
  assessment_submission_rate: number  // Target: 70%+
  
  // Quality
  avg_strategic_thinking_score: number  // Target: 75+
  framework_quality_scores: number  // Target: 80+
  
  // Business Impact
  founders_to_first_customer: number  // Track over time
  avg_days_to_first_revenue: number  // Target: Decrease
  milestone_verification_rate: number  // Target: 80%+
  
  // Community
  forum_participation_rate: number  // Target: 30%+
  peer_mentoring_matches: number
}
```

---

## End of Document

**Related Documentation:**
- 03-DATABASE-SCHEMA.md - For data structure details
- 04-MODULE-ARCHITECTURE.md - For module-specific features
- 06-INTERACTIVE-COMPONENTS.md - For UI component implementation

**Next Steps:**
1. Implement points and badge system
2. Create leaderboard infrastructure
3. Build milestone submission and verification workflow
4. Set up Cloud Functions for automation
5. Design and test celebration animations