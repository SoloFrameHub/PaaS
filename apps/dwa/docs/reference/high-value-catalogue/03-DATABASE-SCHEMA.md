# Database Schema - Supabase PostgreSQL

## Schema Overview

This schema supports:
- User authentication and profiles
- Course enrollment and progress tracking
- Interactive tool data (sleep logs, mood tracking, etc.)
- Personalized content recommendations
- Assessment responses and scoring

## Core Tables

### users (Extended from Supabase Auth)

Supabase Auth creates the `auth.users` table automatically. We extend it with a public profile table.

```sql
-- Public user profiles
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Preferences
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  reduced_motion BOOLEAN DEFAULT FALSE,
  text_size TEXT DEFAULT 'medium' CHECK (text_size IN ('small', 'medium', 'large')),
  notification_frequency TEXT DEFAULT 'daily' CHECK (notification_frequency IN ('none', 'daily', 'weekly')),
  
  -- Learning preferences
  learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('leisurely', 'moderate', 'intensive')),
  content_preference TEXT DEFAULT 'mixed' CHECK (content_preference IN ('video', 'reading', 'interactive', 'mixed')),
  daily_goal_minutes INTEGER DEFAULT 30,
  
  -- Privacy settings
  show_in_community BOOLEAN DEFAULT FALSE,
  data_sharing_enabled BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see and update their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### courses

```sql
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_hours INTEGER,
  tier INTEGER DEFAULT 1 CHECK (tier BETWEEN 1 AND 6),
  
  -- Ordering and visibility
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  -- Metadata
  instructor_name TEXT,
  instructor_bio TEXT,
  instructor_credentials TEXT,
  cover_image_url TEXT,
  preview_video_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_courses_published ON public.courses(is_published) WHERE is_published = TRUE;

-- RLS: Courses are publicly viewable (read-only for users)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone"
  ON public.courses FOR SELECT
  USING (is_published = TRUE);
```

### modules

```sql
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL,
  estimated_minutes INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_modules_course ON public.modules(course_id);

ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Modules are viewable by everyone"
  ON public.modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE id = modules.course_id AND is_published = TRUE
    )
  );
```

### lessons

```sql
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_type TEXT CHECK (content_type IN ('video', 'text', 'interactive', 'assessment', 'mixed')),
  sort_order INTEGER NOT NULL,
  estimated_minutes INTEGER,
  
  -- Content
  content_text TEXT,
  content_json JSONB, -- For structured interactive content
  video_url TEXT,
  transcript_url TEXT,
  
  -- Learning objectives
  learning_objectives TEXT[],
  key_takeaways TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_module ON public.lessons(module_id);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by everyone"
  ON public.lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.modules m
      JOIN public.courses c ON m.course_id = c.id
      WHERE m.id = lessons.module_id AND c.is_published = TRUE
    )
  );
```

### user_course_enrollments

```sql
CREATE TABLE public.user_course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Progress tracking
  lessons_completed INTEGER DEFAULT 0,
  total_time_minutes INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON public.user_course_enrollments(user_id);
CREATE INDEX idx_enrollments_course ON public.user_course_enrollments(course_id);

ALTER TABLE public.user_course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON public.user_course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON public.user_course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON public.user_course_enrollments FOR UPDATE
  USING (auth.uid() = user_id);
```

### user_lesson_progress

```sql
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  
  -- Progress state
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_position_seconds INTEGER DEFAULT 0, -- For video tracking
  
  -- Time tracking
  time_spent_seconds INTEGER DEFAULT 0,
  
  -- Self-assessment
  confidence_rating INTEGER CHECK (confidence_rating BETWEEN 1 AND 5),
  notes TEXT,
  
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_progress_user ON public.user_lesson_progress(user_id);
CREATE INDEX idx_progress_lesson ON public.user_lesson_progress(lesson_id);
CREATE INDEX idx_progress_status ON public.user_lesson_progress(user_id, status);

ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON public.user_lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
  ON public.user_lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.user_lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

## Interactive Tool Tables

### sleep_logs

```sql
CREATE TABLE public.sleep_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Date tracking
  log_date DATE NOT NULL,
  
  -- Sleep timing
  bedtime TIME NOT NULL,
  wake_time TIME NOT NULL,
  sleep_latency_minutes INTEGER, -- Time to fall asleep
  
  -- Sleep quality
  total_sleep_minutes INTEGER,
  awakenings_count INTEGER DEFAULT 0,
  wake_duration_minutes INTEGER DEFAULT 0,
  sleep_quality_rating INTEGER CHECK (sleep_quality_rating BETWEEN 1 AND 5),
  
  -- Daytime functioning
  daytime_functioning_rating INTEGER CHECK (daytime_functioning_rating BETWEEN 1 AND 5),
  
  -- Calculated fields
  sleep_efficiency_percentage DECIMAL(5,2),
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_sleep_logs_user_date ON public.sleep_logs(user_id, log_date DESC);

-- Function to calculate sleep efficiency
CREATE OR REPLACE FUNCTION calculate_sleep_efficiency(
  total_minutes INTEGER,
  bedtime TIME,
  waketime TIME
) RETURNS DECIMAL AS $$
DECLARE
  time_in_bed_minutes INTEGER;
BEGIN
  -- Calculate time in bed
  IF waketime < bedtime THEN
    -- Crossed midnight
    time_in_bed_minutes := EXTRACT(EPOCH FROM (waketime + INTERVAL '24 hours' - bedtime)) / 60;
  ELSE
    time_in_bed_minutes := EXTRACT(EPOCH FROM (waketime - bedtime)) / 60;
  END IF;
  
  -- Calculate efficiency percentage
  IF time_in_bed_minutes > 0 THEN
    RETURN ROUND((total_minutes::DECIMAL / time_in_bed_minutes * 100), 2);
  ELSE
    RETURN 0;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate sleep efficiency
CREATE OR REPLACE FUNCTION update_sleep_efficiency()
RETURNS TRIGGER AS $$
BEGIN
  NEW.sleep_efficiency_percentage := calculate_sleep_efficiency(
    NEW.total_sleep_minutes,
    NEW.bedtime,
    NEW.wake_time
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sleep_efficiency_trigger
  BEFORE INSERT OR UPDATE ON public.sleep_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_sleep_efficiency();

ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sleep logs"
  ON public.sleep_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### mood_logs

```sql
CREATE TABLE public.mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Timestamp
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  log_date DATE NOT NULL,
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'afternoon', 'evening')),
  
  -- Mood ratings (1-5 scale)
  overall_mood INTEGER CHECK (overall_mood BETWEEN 1 AND 5),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 5),
  anxiety_level INTEGER CHECK (anxiety_level BETWEEN 1 AND 5),
  
  -- Context
  activities TEXT[],
  location TEXT,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mood_logs_user_date ON public.mood_logs(user_id, log_date DESC);

ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own mood logs"
  ON public.mood_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### food_mood_logs

```sql
CREATE TABLE public.food_mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Timestamp
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  meal_time TIMESTAMPTZ NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  
  -- Food details
  foods_consumed TEXT[],
  portion_sizes TEXT,
  
  -- Mood tracking (before and after)
  mood_before INTEGER CHECK (mood_before BETWEEN 1 AND 5),
  mood_after INTEGER CHECK (mood_after BETWEEN 1 AND 5),
  energy_before INTEGER CHECK (energy_before BETWEEN 1 AND 5),
  energy_after INTEGER CHECK (energy_after BETWEEN 1 AND 5),
  
  -- Mediterranean diet tracking
  mediterranean_score INTEGER CHECK (mediterranean_score BETWEEN 0 AND 9),
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_food_mood_user ON public.food_mood_logs(user_id, logged_at DESC);

ALTER TABLE public.food_mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own food logs"
  ON public.food_mood_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### thought_records

```sql
CREATE TABLE public.thought_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Situation
  situation_description TEXT NOT NULL,
  situation_date TIMESTAMPTZ NOT NULL,
  
  -- Thoughts and emotions
  automatic_thoughts TEXT[],
  emotions JSONB, -- [{emotion: 'anxiety', intensity: 85}, ...]
  physical_sensations TEXT[],
  
  -- Challenge and reframe
  evidence_for TEXT,
  evidence_against TEXT,
  alternative_thought TEXT,
  
  -- After reframe
  emotions_after JSONB, -- Same format as emotions
  
  -- Metadata
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_thought_records_user ON public.thought_records(user_id, created_at DESC);

ALTER TABLE public.thought_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own thought records"
  ON public.thought_records FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### medication_logs

```sql
CREATE TABLE public.medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Medication details
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  time_of_day TEXT[], -- ['morning', 'evening']
  
  -- Schedule
  start_date DATE NOT NULL,
  end_date DATE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.medication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Log details
  scheduled_time TIMESTAMPTZ NOT NULL,
  taken_at TIMESTAMPTZ,
  skipped BOOLEAN DEFAULT FALSE,
  skipped_reason TEXT,
  
  -- Side effects
  side_effects TEXT[],
  side_effect_severity INTEGER CHECK (side_effect_severity BETWEEN 1 AND 10),
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_medications_user ON public.medications(user_id) WHERE is_active = TRUE;
CREATE INDEX idx_medication_logs_user_date ON public.medication_logs(user_id, scheduled_time DESC);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own medications"
  ON public.medications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own medication logs"
  ON public.medication_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### anxiety_episodes

```sql
CREATE TABLE public.anxiety_episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Episode details
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  peak_intensity INTEGER CHECK (peak_intensity BETWEEN 1 AND 10),
  
  -- Context
  location TEXT,
  triggers TEXT[],
  physical_symptoms TEXT[],
  thoughts TEXT[],
  
  -- Coping strategies
  strategies_used TEXT[],
  strategies_effectiveness JSONB, -- [{strategy: 'deep breathing', effectiveness: 4}, ...]
  
  -- Outcome
  final_intensity INTEGER CHECK (final_intensity BETWEEN 1 AND 10),
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_anxiety_episodes_user ON public.anxiety_episodes(user_id, started_at DESC);

ALTER TABLE public.anxiety_episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own anxiety logs"
  ON public.anxiety_episodes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

## Assessment Tables

### assessments

```sql
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  assessment_type TEXT CHECK (assessment_type IN ('quiz', 'self_assessment', 'diagnostic')),
  passing_score INTEGER,
  
  -- Questions stored as JSONB
  questions JSONB NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example questions structure:
-- [
--   {
--     "id": "q1",
--     "type": "multiple_choice",
--     "question": "Which neurotransmitter is most affected by SSRIs?",
--     "options": ["Dopamine", "Serotonin", "GABA", "Norepinephrine"],
--     "correct_answer": 1,
--     "explanation": "SSRIs primarily increase serotonin levels..."
--   }
-- ]

CREATE INDEX idx_assessments_lesson ON public.assessments(lesson_id);

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assessments are viewable by enrolled users"
  ON public.assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.lessons l
      JOIN public.modules m ON l.module_id = m.id
      JOIN public.courses c ON m.course_id = c.id
      WHERE l.id = assessments.lesson_id AND c.is_published = TRUE
    )
  );
```

### assessment_responses

```sql
CREATE TABLE public.assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  
  -- Responses and scoring
  responses JSONB NOT NULL, -- User's answers
  score INTEGER,
  total_questions INTEGER,
  percentage DECIMAL(5,2),
  passed BOOLEAN,
  
  -- Timing
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assessment_responses_user ON public.assessment_responses(user_id);
CREATE INDEX idx_assessment_responses_assessment ON public.assessment_responses(assessment_id);

ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own assessment responses"
  ON public.assessment_responses FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

## Analytics and Insights Tables

### user_activity_log

```sql
CREATE TABLE public.user_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  activity_type TEXT NOT NULL,
  activity_metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partition by month for performance
CREATE INDEX idx_activity_user_date ON public.user_activity_log(user_id, created_at DESC);

ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity"
  ON public.user_activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity"
  ON public.user_activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### user_streaks

```sql
CREATE TABLE public.user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id)
);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON public.user_streaks FOR SELECT
  USING (auth.uid() = user_id);
```

## Utility Functions

### Function to update updated_at timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables needing auto-update
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Repeat for other tables with updated_at...
```

### Function to calculate course completion percentage

```sql
CREATE OR REPLACE FUNCTION calculate_course_completion(
  p_user_id UUID,
  p_course_id UUID
) RETURNS INTEGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  -- Count total lessons in course
  SELECT COUNT(l.id) INTO total_lessons
  FROM public.lessons l
  JOIN public.modules m ON l.module_id = m.id
  WHERE m.course_id = p_course_id;
  
  -- Count completed lessons for user
  SELECT COUNT(ulp.id) INTO completed_lessons
  FROM public.user_lesson_progress ulp
  JOIN public.lessons l ON ulp.lesson_id = l.id
  JOIN public.modules m ON l.module_id = m.id
  WHERE m.course_id = p_course_id
    AND ulp.user_id = p_user_id
    AND ulp.status = 'completed';
  
  -- Calculate percentage
  IF total_lessons > 0 THEN
    RETURN ROUND((completed_lessons::DECIMAL / total_lessons * 100));
  ELSE
    RETURN 0;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

## Seed Data Script

```sql
-- Insert sample course
INSERT INTO public.courses (slug, title, subtitle, description, difficulty_level, estimated_hours, tier, is_published, published_at)
VALUES (
  'sleep-mastery',
  'Sleep Mastery: The Foundation of Mental Wellness',
  'Evidence-based strategies to improve sleep quality and mental health',
  'Learn how sleep affects mental health and develop personalized strategies for better sleep hygiene.',
  'beginner',
  8,
  1,
  TRUE,
  NOW()
) RETURNING id;

-- Use the returned ID to insert modules, lessons, etc.
```

## Database Migrations

Use Supabase CLI to manage migrations:

```bash
# Create new migration
supabase migration new create_courses_table

# Apply migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > src/types/database.types.ts
```

## Performance Optimization

### Indexes Created
- User-based lookups (most critical for RLS)
- Date-range queries (for logs and tracking)
- Course/module/lesson hierarchies
- Completion status filters

### Query Optimization Tips
1. Always include user_id in WHERE clauses (leverages RLS and indexes)
2. Use date ranges efficiently with indexes
3. Limit result sets with pagination
4. Use JSONB operators for structured data queries

### Monitoring Queries
```sql
-- Find slow queries
SELECT * FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY tablename;
```
