-- ============================================================================
-- SoloFrameHub CAA - Demo Seed Data for Dashboard Screenshots & Metabase
-- ============================================================================
-- Run: psql $DATABASE_URL -f scripts/seed-demo-data.sql
-- Idempotent: uses ON CONFLICT for all inserts (profiles use DO UPDATE)
--
-- Best users for dashboard screenshots:
--   Sarah Chen   (demo_sarah)  - 72% readiness, 3 courses, 3 roleplay sessions
--   James Wright (demo_james)  - 68% readiness, 4 courses, 4 roleplay sessions
-- ============================================================================

-- Create new tables if they don't exist yet (safe re-run)
CREATE TABLE IF NOT EXISTS "social_signal" (
  "id" text PRIMARY KEY NOT NULL,
  "platform" text NOT NULL,
  "signal_type" text NOT NULL,
  "content_preview" text,
  "author" text,
  "url" text,
  "sentiment" text DEFAULT 'neutral',
  "relevance_score" integer DEFAULT 50,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_social_signal_platform" ON "social_signal"("platform");
CREATE INDEX IF NOT EXISTS "idx_social_signal_created" ON "social_signal"("created_at");

CREATE TABLE IF NOT EXISTS "seo_research" (
  "id" text PRIMARY KEY NOT NULL,
  "keyword" text NOT NULL,
  "search_volume" integer,
  "difficulty" integer,
  "current_position" integer,
  "target_url" text,
  "content_score" integer,
  "recommendations" jsonb,
  "source" text DEFAULT 'neuronwriter',
  "metadata" jsonb,
  "researched_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_seo_keyword" ON "seo_research"("keyword");

-- ============================================================================
-- 1. DEMO USERS (8 founders with different profiles)
-- ============================================================================

INSERT INTO "user" (id, email, hashed_password, email_verified, created_at) VALUES
  ('demo_sarah',  'sarah.chen@techstartup.io',    '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '28 days'),
  ('demo_marcus', 'marcus.johnson@saasconsult.co', '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '25 days'),
  ('demo_elena',  'elena.rodriguez@devtools.dev',  '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '22 days'),
  ('demo_james',  'james.wright@b2bflow.com',      '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '20 days'),
  ('demo_aisha',  'aisha.patel@cloudhr.io',        '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '18 days'),
  ('demo_tom',    'tom.miller@apistack.dev',       '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '15 days'),
  ('demo_lin',    'lin.zhao@creatorpro.co',        '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '12 days'),
  ('demo_raj',    'raj.kapoor@saleseng.io',        '$argon2id$v=19$m=19456,t=2,p=1$demo_hash_not_real', true, now() - interval '10 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 1b. SUBSCRIPTIONS (required for dashboard access - redirects to /subscribe without)
-- ============================================================================

INSERT INTO subscription (id, user_id, polar_customer_id, polar_product_id, polar_subscription_id, status, current_period_end, metadata, created_at) VALUES
  ('sub_sarah',  'demo_sarah',  'pc_demo_sarah',  'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_sarah',  'active', now() + interval '30 days', '{"plan": "monthly", "demo": true}', now() - interval '28 days'),
  ('sub_marcus', 'demo_marcus', 'pc_demo_marcus', 'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_marcus', 'active', now() + interval '25 days', '{"plan": "monthly", "demo": true}', now() - interval '25 days'),
  ('sub_elena',  'demo_elena',  'pc_demo_elena',  'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_elena',  'active', now() + interval '20 days', '{"plan": "monthly", "demo": true}', now() - interval '22 days'),
  ('sub_james',  'demo_james',  'pc_demo_james',  '16521213-3716-4406-9437-35f85693b71e', 'ps_demo_james',  'active', now() + interval '340 days', '{"plan": "annual", "demo": true}', now() - interval '20 days'),
  ('sub_aisha',  'demo_aisha',  'pc_demo_aisha',  'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_aisha',  'active', now() + interval '18 days', '{"plan": "monthly", "demo": true}', now() - interval '18 days'),
  ('sub_tom',    'demo_tom',    'pc_demo_tom',    'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_tom',    'active', now() + interval '15 days', '{"plan": "monthly", "demo": true}', now() - interval '15 days'),
  ('sub_lin',    'demo_lin',    'pc_demo_lin',    'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_lin',    'active', now() + interval '12 days', '{"plan": "monthly", "demo": true}', now() - interval '12 days'),
  ('sub_raj',    'demo_raj',    'pc_demo_raj',    'a75bcdb7-34ad-4fc5-b878-b2309ea0611b', 'ps_demo_raj',    'active', now() + interval '10 days', '{"plan": "monthly", "demo": true}', now() - interval '10 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. PROFILES (with questionnaire, assessment, progress data)
-- ============================================================================

INSERT INTO profile (user_id, data, updated_at) VALUES
('demo_sarah', '{
  "name": "Sarah Chen",
  "businessModel": "B2B SaaS",
  "stage": "growth",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-15T10:00:00Z",
  "questionnaire": {
    "industry": "Developer Tools",
    "target_roles": ["CTO", "VP Engineering", "Engineering Manager"],
    "founder_description": "Technical founder building dev productivity SaaS",
    "deal_size": "smb",
    "sales_journey": "have_some_customers",
    "revenue_range": "$10k-50k MRR",
    "time_commitment": "10-15 hours/week",
    "learning_style": "aggressive",
    "disc_profile": {"primary": "D", "secondary": "C"},
    "urgency": "high",
    "channels": ["outbound", "content"],
    "success_90_days": "Close 3 enterprise deals"
  },
  "assessment": {
    "overallReadiness": 72,
    "scores": {"icpClarity": 85, "positioningStrength": 70, "messagingConsistency": 65, "channelReadiness": 75, "salesProcessMaturity": 60},
    "scoreReasoning": {
      "icpClarity": "Strong ICP definition targeting Series A-B dev tool companies with 20-200 engineers",
      "positioningStrength": "Clear positioning against manual code review but needs sharper competitive differentiation",
      "messagingConsistency": "Website and LinkedIn mostly aligned but cold emails use different value props",
      "channelReadiness": "Email infrastructure and LinkedIn presence solid; missing systematic outbound cadences",
      "salesProcessMaturity": "Has closed deals but no repeatable discovery or qualification framework"
    },
    "recommendedPath": "outbound",
    "recommendedStartCourse": 2,
    "quickWins": [
      {"category": "Positioning", "title": "Sharpen competitive positioning", "description": "Better differentiate from GitHub Copilot and AI code review tools.", "impact": "high", "actionableStep": "Write a 3-column comparison chart showing your unique advantage against the top 2 competitors."},
      {"category": "Outbound", "title": "Build systematic email sequences", "description": "Strong email infrastructure but no repeatable sequences for different buyer personas.", "impact": "high", "actionableStep": "Create 3 DISC-typed email sequences targeting CTOs, VPs Eng, and Engineering Managers."},
      {"category": "Messaging", "title": "Unify messaging across channels", "description": "Website promises productivity gains but cold emails focus on cost savings.", "impact": "medium", "actionableStep": "Audit your top 5 touchpoints and align them to a single value story."}
    ],
    "criticalGaps": [
      {"category": "Sales Process", "title": "No structured discovery framework", "description": "Closing deals through intuition, not a repeatable process. This will not scale.", "impact": "high", "actionableStep": "Implement the BANT-MEDDIC hybrid from Course 3 for your next 5 discovery calls."},
      {"category": "Messaging", "title": "Inconsistent value narratives", "description": "Website says 10x code review speed but emails say 50% cost reduction.", "impact": "medium", "actionableStep": "Choose your primary metric and use it everywhere."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 3},
      {"phase": "Outbound Engine", "courses": [3, 4, 7], "estimatedWeeks": 4},
      {"phase": "Scaling", "courses": [8, 9], "estimatedWeeks": 3}
    ],
    "personalizedInsight": "Sarah, your technical depth is your superpower in sales conversations. CTOs respect founders who speak their language. Your biggest opportunity is systematizing what you do intuitively: your discovery calls reveal deep technical pain, but you lose deals when you skip qualification. Focus the next 2 weeks on building a repeatable discovery framework, and your close rate could jump from 25% to 40%+.",
    "generatedAt": "2026-01-15T10:30:00Z"
  },
  "founder_profile": {
    "founder_category": "technical_purist",
    "category_confidence": 82,
    "category_assessed_at": "2026-01-15T10:00:00Z",
    "business_context": {
      "industry": "developer_tools",
      "company_stage": "early_revenue",
      "target_customer_type": "b2b",
      "typical_deal_size": "smb",
      "target_roles": ["cto", "vp_engineering"]
    },
    "disc_profile": {"primary": "D", "secondary": "C", "assessed_at": "2026-01-15T10:00:00Z"},
    "roleplay_stats": {
      "total_sessions": 3,
      "by_disc_type": {
        "D": {"sessions": 1, "avg_score": 78},
        "I": {"sessions": 1, "avg_score": 74},
        "C": {"sessions": 1, "avg_score": 81}
      },
      "by_industry": {
        "saas": {"sessions": 2, "avg_score": 76},
        "fintech": {"sessions": 1, "avg_score": 81}
      },
      "strongest_pairing": "High-C + SaaS + CTO",
      "weakest_pairing": "High-I + Consulting + CEO"
    }
  },
  "progress": {
    "currentCourse": 3,
    "completedCourses": [0, 1, 2],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4","5","6","7","8"],
      "icp-builder": ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
      "positioning-value": ["1","2","3","4","5","6","7","8","9","10"],
      "choose-path": ["1","2","3"]
    },
    "xpTotal": 310,
    "badges": ["first-lesson", "course-complete-0", "course-complete-1", "course-complete-2"],
    "lastActivityAt": "2026-02-08T14:30:00Z"
  }
}'::jsonb, now() - interval '1 day'),

('demo_marcus', '{
  "name": "Marcus Johnson",
  "businessModel": "Consulting",
  "stage": "early",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-18T09:00:00Z",
  "questionnaire": {
    "industry": "Management Consulting",
    "target_roles": ["CEO", "VP Operations", "Chief of Staff"],
    "founder_description": "Former McKinsey consultant going solo",
    "deal_size": "$25k-100k",
    "sales_journey": "just_starting",
    "revenue_range": "$0-5k MRR",
    "time_commitment": "5-10 hours/week",
    "learning_style": "structured",
    "disc_profile": {"primary": "I", "secondary": "D"},
    "urgency": "medium",
    "channels": ["referral", "content"],
    "success_90_days": "Land first $50k consulting engagement"
  },
  "assessment": {
    "overallReadiness": 45,
    "scores": {"icpClarity": 40, "positioningStrength": 55, "messagingConsistency": 35, "channelReadiness": 50, "salesProcessMaturity": 45},
    "recommendedPath": "inbound",
    "recommendedStartCourse": 0,
    "quickWins": [
      {"category": "ICP", "title": "Define your ideal consulting client", "description": "You are targeting everyone which dilutes your message and pricing power.", "impact": "high", "actionableStep": "List your 3 best past clients and identify the common psychographic pattern."},
      {"category": "LinkedIn", "title": "Optimize LinkedIn for inbound leads", "description": "Your profile reads like a resume, not a client magnet.", "impact": "high", "actionableStep": "Rewrite your headline to state the outcome you deliver, not your job title."}
    ],
    "criticalGaps": [
      {"category": "ICP", "title": "No ICP defined", "description": "Without a clear ICP, every proposal is custom and your close rate stays low.", "impact": "high", "actionableStep": "Complete the ICP Builder Workshop and create your 1-page ICP card."},
      {"category": "Messaging", "title": "Scattered messaging", "description": "Your website, LinkedIn, and proposals each tell a different story.", "impact": "medium", "actionableStep": "Pick one positioning statement and use it across all channels for 30 days."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 4},
      {"phase": "Inbound Engine", "courses": [5, 6], "estimatedWeeks": 3},
      {"phase": "Closing", "courses": [13, 14], "estimatedWeeks": 3}
    ],
    "personalizedInsight": "Marcus, your McKinsey background gives you instant credibility but it is also your trap. You default to serving everyone because you can. The data shows consultants who niche down earn 2-3x more per project. Your first priority is defining a sharp ICP based on psychographic patterns, not demographics. Once you stop saying we help everyone, your pipeline will actually grow.",
    "generatedAt": "2026-01-18T09:30:00Z"
  },
  "progress": {
    "currentCourse": 1,
    "completedCourses": [0],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4","5","6","7","8"],
      "icp-builder": ["1","2","3","4","5"]
    },
    "xpTotal": 130,
    "badges": ["first-lesson", "course-complete-0"],
    "lastActivityAt": "2026-02-07T16:00:00Z"
  }
}'::jsonb, now() - interval '2 days'),

('demo_elena', '{
  "name": "Elena Rodriguez",
  "businessModel": "B2B SaaS",
  "stage": "pre-revenue",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-20T11:00:00Z",
  "questionnaire": {
    "industry": "Developer Tools",
    "target_roles": ["CTO", "DevOps Lead", "SRE Manager"],
    "founder_description": "Full-stack dev building API monitoring platform",
    "deal_size": "$1k-5k",
    "sales_journey": "building_product",
    "revenue_range": "Pre-revenue",
    "time_commitment": "5-10 hours/week",
    "learning_style": "visual",
    "disc_profile": {"primary": "C", "secondary": "S"},
    "urgency": "low",
    "channels": ["content", "community"],
    "success_90_days": "Get 10 beta users"
  },
  "assessment": {
    "overallReadiness": 32,
    "scores": {"icpClarity": 30, "positioningStrength": 25, "messagingConsistency": 40, "channelReadiness": 35, "salesProcessMaturity": 30},
    "recommendedPath": "inbound",
    "recommendedStartCourse": 0,
    "quickWins": [
      {"category": "Community", "title": "Join 3 developer communities", "description": "Your target users hang out in specific Slack/Discord groups. Be there.", "impact": "high", "actionableStep": "Join the top 3 API monitoring communities and start answering questions weekly."},
      {"category": "Content", "title": "Start building in public", "description": "Technical founders who share their journey attract early adopters naturally.", "impact": "medium", "actionableStep": "Post one build-in-public update per week on Twitter/LinkedIn for 30 days."}
    ],
    "criticalGaps": [
      {"category": "Validation", "title": "No market validation", "description": "You are building without confirmed demand. This is the #1 risk for pre-revenue founders.", "impact": "high", "actionableStep": "Have 10 conversations with potential users this week. Ask about their monitoring pain."},
      {"category": "ICP", "title": "No ICP defined", "description": "Who exactly will pay for this? Until you know, everything else is guessing.", "impact": "high", "actionableStep": "Complete the ICP Builder Workshop before writing another line of code."},
      {"category": "Positioning", "title": "No positioning statement", "description": "You cannot sell what you cannot clearly describe in one sentence.", "impact": "medium", "actionableStep": "Draft a positioning statement using the Dunford framework from Course 2."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 4},
      {"phase": "Community Engine", "courses": [5, 6], "estimatedWeeks": 4}
    ],
    "personalizedInsight": "Elena, your C-type analytical nature is perfect for building great products but it is holding you back from selling. You are over-engineering and under-validating. The hardest thing for you will be talking to potential customers before the product is ready, but that is exactly what will make or break your startup. Start with 10 discovery conversations this week.",
    "generatedAt": "2026-01-20T11:30:00Z"
  },
  "progress": {
    "currentCourse": 0,
    "completedCourses": [],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4"]
    },
    "xpTotal": 40,
    "badges": ["first-lesson"],
    "lastActivityAt": "2026-02-05T10:00:00Z"
  }
}'::jsonb, now() - interval '5 days'),

('demo_james', '{
  "name": "James Wright",
  "businessModel": "B2B SaaS",
  "stage": "growth",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-22T08:00:00Z",
  "questionnaire": {
    "industry": "Sales Automation",
    "target_roles": ["VP Sales", "Head of Revenue", "Sales Director"],
    "founder_description": "Technical co-founder, partner handles product",
    "deal_size": "smb",
    "sales_journey": "have_some_customers",
    "revenue_range": "$50k-100k MRR",
    "time_commitment": "15-20 hours/week",
    "learning_style": "aggressive",
    "disc_profile": {"primary": "D", "secondary": "I"},
    "urgency": "high",
    "channels": ["outbound", "partnerships"],
    "success_90_days": "Build repeatable outbound pipeline"
  },
  "assessment": {
    "overallReadiness": 68,
    "scores": {"icpClarity": 80, "positioningStrength": 75, "messagingConsistency": 60, "channelReadiness": 70, "salesProcessMaturity": 55},
    "scoreReasoning": {
      "icpClarity": "Well-defined ICP targeting mid-market sales teams with 10-50 SDRs",
      "positioningStrength": "Strong positioning against legacy CRM tools but needs differentiation from AI-native competitors",
      "messagingConsistency": "Product messaging is clear but sales conversations drift into feature dumping",
      "channelReadiness": "Active on LinkedIn with good engagement; outbound infrastructure needs automation",
      "salesProcessMaturity": "Closing deals through hustle but process is ad-hoc and partner-dependent"
    },
    "recommendedPath": "outbound",
    "recommendedStartCourse": 3,
    "quickWins": [
      {"category": "Outbound", "title": "Systematize outbound cadences", "description": "You have the instinct for outbound but need repeatable sequences that work without you.", "impact": "high", "actionableStep": "Document your last 5 successful outreach sequences and templatize the pattern."},
      {"category": "Infrastructure", "title": "Set up cold email automation", "description": "Manual email sending is eating 8+ hours per week that could be automated.", "impact": "high", "actionableStep": "Choose between Apollo, Lemlist, or Instantly and set up your first automated sequence this week."},
      {"category": "Process", "title": "Create discovery call checklist", "description": "Your calls uncover great insights but you miss qualification signals.", "impact": "medium", "actionableStep": "Build a 10-question discovery checklist using BANT-MEDDIC hybrid from Course 3."}
    ],
    "criticalGaps": [
      {"category": "Sales Process", "title": "Ad-hoc sales process", "description": "Every deal follows a different path. You need a standardized pipeline with clear stages.", "impact": "high", "actionableStep": "Map your last 10 deals to a 5-stage pipeline and identify where deals stall."},
      {"category": "Discovery", "title": "No formal discovery framework", "description": "You ask good questions intuitively but miss critical qualification signals.", "impact": "high", "actionableStep": "Record your next 3 discovery calls and score them against the MEDDIC checklist."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 2},
      {"phase": "Pipeline Build", "courses": [3, 4, 7, 8], "estimatedWeeks": 4},
      {"phase": "Close & Scale", "courses": [9, 13, 14], "estimatedWeeks": 3}
    ],
    "personalizedInsight": "James, you are the classic high-D technical founder who closes through sheer determination. That has gotten you to $50k+ MRR, which is impressive. But your biggest risk is burnout: every deal depends on you personally. The academy will help you build systems so your pipeline runs even when you step away. Your immediate priority should be systematizing your outbound and building a discovery framework. With your drive, you could hit $100k MRR within 60 days if you stop selling ad-hoc and start selling systematically.",
    "generatedAt": "2026-01-22T08:30:00Z"
  },
  "founder_profile": {
    "founder_category": "reluctant_closer",
    "category_confidence": 78,
    "category_assessed_at": "2026-01-22T08:00:00Z",
    "business_context": {
      "industry": "sales_automation",
      "company_stage": "early_revenue",
      "target_customer_type": "b2b",
      "typical_deal_size": "smb",
      "target_roles": ["vp_sales", "head_of_revenue"]
    },
    "disc_profile": {"primary": "D", "secondary": "I", "assessed_at": "2026-01-22T08:00:00Z"},
    "roleplay_stats": {
      "total_sessions": 4,
      "by_disc_type": {
        "D": {"sessions": 1, "avg_score": 85},
        "I": {"sessions": 2, "avg_score": 82},
        "S": {"sessions": 1, "avg_score": 68}
      },
      "by_industry": {
        "saas": {"sessions": 3, "avg_score": 80},
        "consulting": {"sessions": 1, "avg_score": 72}
      },
      "strongest_pairing": "High-I + SaaS + VP Sales",
      "weakest_pairing": "High-S + Consulting + CEO"
    }
  },
  "progress": {
    "currentCourse": 4,
    "completedCourses": [0, 1, 2, 3],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4","5","6","7","8"],
      "icp-builder": ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
      "positioning-value": ["1","2","3","4","5","6","7","8","9","10"],
      "choose-path": ["1","2","3","4","5","6"],
      "list-building": ["1","2","3","4"]
    },
    "xpTotal": 450,
    "badges": ["first-lesson", "course-complete-0", "course-complete-1", "course-complete-2", "course-complete-3", "first-deal-closed"],
    "lastActivityAt": "2026-02-09T09:00:00Z"
  }
}'::jsonb, now() - interval '1 day'),

('demo_aisha', '{
  "name": "Aisha Patel",
  "businessModel": "B2B SaaS",
  "stage": "early",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-24T14:00:00Z",
  "questionnaire": {
    "industry": "HR Tech",
    "target_roles": ["HR Director", "VP People", "Head of Talent"],
    "founder_description": "Solo technical founder, HR automation",
    "deal_size": "$1k-5k",
    "sales_journey": "have_some_customers",
    "revenue_range": "$5k-10k MRR",
    "time_commitment": "10-15 hours/week",
    "learning_style": "structured",
    "disc_profile": {"primary": "S", "secondary": "C"},
    "urgency": "medium",
    "channels": ["content", "referral"],
    "success_90_days": "Reduce churn and increase referrals"
  },
  "assessment": {
    "overallReadiness": 55,
    "scores": {"icpClarity": 65, "positioningStrength": 50, "messagingConsistency": 55, "channelReadiness": 45, "salesProcessMaturity": 60},
    "recommendedPath": "inbound",
    "recommendedStartCourse": 1,
    "quickWins": [
      {"category": "Positioning", "title": "Sharpen HR tech positioning", "description": "Your positioning is too broad. Remote-first companies with 50-200 employees is your sweet spot.", "impact": "high", "actionableStep": "Rewrite your homepage hero to target this specific segment."},
      {"category": "Referrals", "title": "Systematize referral requests", "description": "Your best customers love you but never refer. You are not asking.", "impact": "high", "actionableStep": "Email your top 5 customers this week with a specific referral ask template."}
    ],
    "criticalGaps": [
      {"category": "Channels", "title": "No channel strategy", "description": "You are passively waiting for customers instead of actively acquiring them.", "impact": "high", "actionableStep": "Pick one acquisition channel and commit to it for 60 days before evaluating."},
      {"category": "Positioning", "title": "Generic positioning", "description": "AI-powered HR automation describes 200 competitors. What makes you different?", "impact": "medium", "actionableStep": "Complete the competitive positioning exercise in Course 2, Lesson 6."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 3},
      {"phase": "Inbound Engine", "courses": [5, 6], "estimatedWeeks": 3},
      {"phase": "Retention", "courses": [10, 11], "estimatedWeeks": 3}
    ],
    "personalizedInsight": "Aisha, your S-type personality makes you incredible at customer relationships, which is why your existing customers love you. But that same trait makes you avoid the discomfort of outbound selling. Your path to growth is not cold outreach; it is systematizing the referrals you naturally earn. Focus on building a referral engine that leverages your existing customer love into new pipeline.",
    "generatedAt": "2026-01-24T14:30:00Z"
  },
  "progress": {
    "currentCourse": 2,
    "completedCourses": [0, 1],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4","5","6","7","8"],
      "icp-builder": ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
      "positioning-value": ["1","2","3","4","5"]
    },
    "xpTotal": 260,
    "badges": ["first-lesson", "course-complete-0", "course-complete-1"],
    "lastActivityAt": "2026-02-06T11:00:00Z"
  }
}'::jsonb, now() - interval '3 days'),

('demo_tom', '{
  "name": "Tom Miller",
  "businessModel": "Agency",
  "stage": "early",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-27T10:00:00Z",
  "questionnaire": {
    "industry": "Web Development Agency",
    "target_roles": ["VP Marketing", "Head of Growth", "CTO"],
    "founder_description": "Freelance dev turning agency, needs sales system",
    "deal_size": "$5k-25k",
    "sales_journey": "just_starting",
    "revenue_range": "$5k-10k MRR",
    "time_commitment": "5-10 hours/week",
    "learning_style": "hands-on",
    "disc_profile": {"primary": "C", "secondary": "D"},
    "urgency": "medium",
    "channels": ["referral", "outbound"],
    "success_90_days": "Get 3 agency retainer clients"
  },
  "assessment": {
    "overallReadiness": 38,
    "scores": {"icpClarity": 35, "positioningStrength": 40, "messagingConsistency": 30, "channelReadiness": 45, "salesProcessMaturity": 40},
    "recommendedPath": "outbound",
    "recommendedStartCourse": 0,
    "quickWins": [
      {"category": "Niche", "title": "Pick a vertical niche", "description": "Generalist agencies compete on price. Niche agencies compete on expertise.", "impact": "high", "actionableStep": "Choose the industry where you have the most case studies and go all-in for 90 days."},
      {"category": "Portfolio", "title": "Build a results-focused portfolio", "description": "Your current portfolio shows projects, not outcomes.", "impact": "medium", "actionableStep": "Rewrite 3 case studies to lead with the business result, not the technology used."}
    ],
    "criticalGaps": [
      {"category": "Niche", "title": "No niche focus", "description": "You serve everyone, which means you are memorable to no one.", "impact": "high", "actionableStep": "Analyze your last 10 projects: which industry paid the most and referred the most?"},
      {"category": "Sales Process", "title": "No sales process", "description": "You wait for inbound inquiries instead of proactively building pipeline.", "impact": "high", "actionableStep": "Complete Course 0 and 1 to build your foundation before any outreach."},
      {"category": "Messaging", "title": "Generic messaging", "description": "We build websites says nothing about why someone should choose you.", "impact": "medium", "actionableStep": "Draft a positioning statement using the Dunford framework: For [who] who [need], we provide [what] unlike [alternatives]."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 4},
      {"phase": "Outbound Engine", "courses": [3, 4, 7], "estimatedWeeks": 4}
    ],
    "personalizedInsight": "Tom, the transition from freelancer to agency is exciting but dangerous. Most developers who try to build agencies fail because they keep doing the technical work instead of selling. Your C-type precision is an asset for project delivery but a liability for sales. You need to get comfortable with imperfect outreach. Send 10 imperfect emails this week. Perfection is the enemy of pipeline.",
    "generatedAt": "2026-01-27T10:30:00Z"
  },
  "progress": {
    "currentCourse": 1,
    "completedCourses": [0],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4","5","6","7","8"],
      "icp-builder": ["1","2","3"]
    },
    "xpTotal": 110,
    "badges": ["first-lesson", "course-complete-0"],
    "lastActivityAt": "2026-02-04T15:00:00Z"
  }
}'::jsonb, now() - interval '6 days'),

('demo_lin', '{
  "name": "Lin Zhao",
  "businessModel": "Creator/Coach",
  "stage": "growth",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-01-30T12:00:00Z",
  "questionnaire": {
    "industry": "Online Education",
    "target_roles": ["Self-taught Developer", "Junior Engineer", "Career Changer"],
    "founder_description": "Tech educator with 50k YouTube subscribers",
    "deal_size": "$100-500",
    "sales_journey": "have_some_customers",
    "revenue_range": "$10k-50k MRR",
    "time_commitment": "10-15 hours/week",
    "learning_style": "visual",
    "disc_profile": {"primary": "I", "secondary": "S"},
    "urgency": "medium",
    "channels": ["content", "community"],
    "success_90_days": "Launch premium course at $997"
  },
  "assessment": {
    "overallReadiness": 58,
    "scores": {"icpClarity": 70, "positioningStrength": 65, "messagingConsistency": 50, "channelReadiness": 60, "salesProcessMaturity": 45},
    "recommendedPath": "hybrid",
    "recommendedStartCourse": 2,
    "quickWins": [
      {"category": "Audience", "title": "Segment your 50k subscribers", "description": "You have a huge audience but treat them all the same. Segment by engagement and intent.", "impact": "high", "actionableStep": "Tag your YouTube subscribers by comment behavior: D-types (action seekers), I-types (sharers), C-types (question askers)."},
      {"category": "Lead Magnet", "title": "Create a high-value lead magnet", "description": "Your audience consumes free content but has no path to paid. Bridge the gap.", "impact": "high", "actionableStep": "Create a mini-course or toolkit that solves one specific problem your audience asks about repeatedly."}
    ],
    "criticalGaps": [
      {"category": "Funnel", "title": "No sales funnel exists", "description": "Your audience goes from free YouTube to nothing. There is no paid offering in between.", "impact": "high", "actionableStep": "Map out a 3-step funnel: free content to lead magnet to $997 course offer."},
      {"category": "Monetization", "title": "Community not monetized", "description": "50k subscribers generating $0 in direct revenue is a missed opportunity.", "impact": "high", "actionableStep": "Launch a waitlist for your premium course and measure demand before building it."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 2},
      {"phase": "Creator Engine", "courses": [5, 6], "estimatedWeeks": 3},
      {"phase": "Launch & Scale", "courses": [8, 9, 10], "estimatedWeeks": 4}
    ],
    "personalizedInsight": "Lin, you have already solved the hardest problem in business: you have an audience. Most founders spend months trying to get attention you already have. Your challenge is not getting noticed, it is converting attention into revenue. Your I-type personality makes you a natural community builder, but you avoid the ask. The next step is simple but uncomfortable: put a price on something and see who pays. Your 50k subscribers are waiting for you to sell them something valuable.",
    "generatedAt": "2026-01-30T12:30:00Z"
  },
  "progress": {
    "currentCourse": 3,
    "completedCourses": [0, 1, 2],
    "completedLessons": {
      "sales-psychology": ["1","2","3","4","5","6","7","8"],
      "icp-builder": ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
      "positioning-value": ["1","2","3","4","5","6","7","8","9","10"],
      "choose-path": ["1","2","3","4"]
    },
    "xpTotal": 340,
    "badges": ["first-lesson", "course-complete-0", "course-complete-1", "course-complete-2"],
    "lastActivityAt": "2026-02-08T18:00:00Z"
  }
}'::jsonb, now() - interval '1 day'),

('demo_raj', '{
  "name": "Raj Kapoor",
  "businessModel": "B2B SaaS",
  "stage": "pre-revenue",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2026-02-01T09:00:00Z",
  "questionnaire": {
    "industry": "Sales Engineering",
    "target_roles": ["VP Sales", "Sales Director", "Head of SE"],
    "founder_description": "Sales engineer building demo automation tool",
    "deal_size": "$5k-25k",
    "sales_journey": "building_product",
    "revenue_range": "Pre-revenue",
    "time_commitment": "10-15 hours/week",
    "learning_style": "hands-on",
    "disc_profile": {"primary": "D", "secondary": "C"},
    "urgency": "high",
    "channels": ["outbound", "content"],
    "success_90_days": "Get 5 design partners"
  },
  "assessment": {
    "overallReadiness": 42,
    "scores": {"icpClarity": 50, "positioningStrength": 35, "messagingConsistency": 40, "channelReadiness": 45, "salesProcessMaturity": 40},
    "recommendedPath": "outbound",
    "recommendedStartCourse": 0,
    "quickWins": [
      {"category": "Network", "title": "Leverage your sales engineering network", "description": "You know hundreds of sales leaders from your SE career. That is pure gold.", "impact": "high", "actionableStep": "List 20 former colleagues who now lead sales teams and reach out to 5 this week."},
      {"category": "Demo", "title": "Build a demo-first pitch", "description": "As a sales engineer, your superpower is showing, not telling.", "impact": "high", "actionableStep": "Create a 5-minute interactive demo that prospects can try before a call."}
    ],
    "criticalGaps": [
      {"category": "Positioning", "title": "No positioning statement", "description": "Demo automation is a crowded space. You need to clearly state why you are different.", "impact": "high", "actionableStep": "Complete Course 2 positioning exercises with your specific competitive landscape."},
      {"category": "Outbound", "title": "No outbound system", "description": "You have the network but no system to activate it at scale.", "impact": "high", "actionableStep": "Set up a CRM and import your LinkedIn connections this week."},
      {"category": "Pricing", "title": "No pricing model", "description": "Without pricing, you cannot close. Even wrong pricing is better than no pricing.", "impact": "medium", "actionableStep": "Research 3 competitors pricing and set your initial price at 70% of the market leader."}
    ],
    "journeyMap": [
      {"phase": "Foundation", "courses": [0, 1, 2], "estimatedWeeks": 3},
      {"phase": "Outbound Engine", "courses": [3, 4, 7], "estimatedWeeks": 4}
    ],
    "personalizedInsight": "Raj, you have an unfair advantage that most founders would kill for: deep relationships with the exact people who buy sales tools. Your sales engineering background means you understand the buyer better than 99% of founders. Stop building and start selling. Your first 5 design partners are one LinkedIn message away. The product does not need to be perfect; your credibility fills the gaps.",
    "generatedAt": "2026-02-01T09:30:00Z"
  },
  "progress": {
    "currentCourse": 0,
    "completedCourses": [],
    "completedLessons": {
      "sales-psychology": ["1","2","3"]
    },
    "xpTotal": 30,
    "badges": ["first-lesson"],
    "lastActivityAt": "2026-02-03T13:00:00Z"
  }
}'::jsonb, now() - interval '7 days')
ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at;

-- ============================================================================
-- 3. LESSON EVENTS (~200 rows showing completion patterns)
-- Key pattern: Course 3 Lesson 4 has ~42% drop-off
-- ============================================================================

-- Helper: generate lesson events for each user's completed lessons
-- Sarah (courses 0-2 complete, course 3 partial)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT
  'le_sarah_' || c.cid || '_' || l.lid,
  'demo_sarah', c.cid, l.lid, 'completed', 10,
  now() - interval '28 days' + (row_number() OVER () * interval '4 hours')
FROM (VALUES ('sales-psychology'),('icp-builder'),('positioning-value')) AS c(cid)
CROSS JOIN (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_sarah_icp_' || l.lid, 'demo_sarah', 'icp-builder', l.lid, 'completed', 10,
  now() - interval '20 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('9'),('10'),('11'),('12'),('13')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_sarah_pv_' || l.lid, 'demo_sarah', 'positioning-value', l.lid, 'completed', 10,
  now() - interval '14 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('9'),('10')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- Sarah starts course 3, completes lessons 1-3 then drops off at lesson 4
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at) VALUES
  ('le_sarah_cp_1', 'demo_sarah', 'choose-path', '1', 'completed', 10, now() - interval '5 days'),
  ('le_sarah_cp_2', 'demo_sarah', 'choose-path', '2', 'completed', 10, now() - interval '4 days'),
  ('le_sarah_cp_3', 'demo_sarah', 'choose-path', '3', 'completed', 10, now() - interval '3 days')
ON CONFLICT (id) DO NOTHING;

-- Marcus (course 0 complete, course 1 partial)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_marcus_sp_' || l.lid, 'demo_marcus', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '25 days' + (row_number() OVER () * interval '5 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_marcus_icp_' || l.lid, 'demo_marcus', 'icp-builder', l.lid, 'completed', 10,
  now() - interval '15 days' + (row_number() OVER () * interval '6 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- James (courses 0-3 complete, course 4 partial - power user)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_james_sp_' || l.lid, 'demo_james', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '20 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_james_icp_' || l.lid, 'demo_james', 'icp-builder', l.lid, 'completed', 10,
  now() - interval '17 days' + (row_number() OVER () * interval '2 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10'),('11'),('12'),('13')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_james_pv_' || l.lid, 'demo_james', 'positioning-value', l.lid, 'completed', 10,
  now() - interval '12 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- James completes ALL of course 3 (doesn't drop off)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_james_cp_' || l.lid, 'demo_james', 'choose-path', l.lid, 'completed', 10,
  now() - interval '8 days' + (row_number() OVER () * interval '4 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_james_lb_' || l.lid, 'demo_james', 'list-building', l.lid, 'completed', 10,
  now() - interval '4 days' + (row_number() OVER () * interval '5 hours')
FROM (VALUES ('1'),('2'),('3'),('4')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- Aisha (courses 0-1 complete, course 2 partial)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_aisha_sp_' || l.lid, 'demo_aisha', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '18 days' + (row_number() OVER () * interval '4 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_aisha_icp_' || l.lid, 'demo_aisha', 'icp-builder', l.lid, 'completed', 10,
  now() - interval '14 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10'),('11'),('12'),('13')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_aisha_pv_' || l.lid, 'demo_aisha', 'positioning-value', l.lid, 'completed', 10,
  now() - interval '6 days' + (row_number() OVER () * interval '4 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- Lin (courses 0-2 complete, course 3 partial - drops off at lesson 4)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_lin_sp_' || l.lid, 'demo_lin', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '12 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_lin_icp_' || l.lid, 'demo_lin', 'icp-builder', l.lid, 'completed', 10,
  now() - interval '10 days' + (row_number() OVER () * interval '2 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10'),('11'),('12'),('13')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_lin_pv_' || l.lid, 'demo_lin', 'positioning-value', l.lid, 'completed', 10,
  now() - interval '7 days' + (row_number() OVER () * interval '3 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- Lin drops off at course 3 lesson 4 (same pattern as Sarah)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at) VALUES
  ('le_lin_cp_1', 'demo_lin', 'choose-path', '1', 'completed', 10, now() - interval '3 days'),
  ('le_lin_cp_2', 'demo_lin', 'choose-path', '2', 'completed', 10, now() - interval '2 days'),
  ('le_lin_cp_3', 'demo_lin', 'choose-path', '3', 'completed', 10, now() - interval '2 days'),
  ('le_lin_cp_4', 'demo_lin', 'choose-path', '4', 'completed', 10, now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- Tom (course 0 complete, course 1 partial)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_tom_sp_' || l.lid, 'demo_tom', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '15 days' + (row_number() OVER () * interval '5 hours')
FROM (VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_tom_icp_' || l.lid, 'demo_tom', 'icp-builder', l.lid, 'completed', 10,
  now() - interval '8 days' + (row_number() OVER () * interval '6 hours')
FROM (VALUES ('1'),('2'),('3')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- Elena & Raj (early users, only partial course 0)
INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_elena_sp_' || l.lid, 'demo_elena', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '22 days' + (row_number() OVER () * interval '8 hours')
FROM (VALUES ('1'),('2'),('3'),('4')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lesson_event (id, user_id, course_id, lesson_id, event_type, xp_earned, created_at)
SELECT 'le_raj_sp_' || l.lid, 'demo_raj', 'sales-psychology', l.lid, 'completed', 10,
  now() - interval '10 days' + (row_number() OVER () * interval '6 hours')
FROM (VALUES ('1'),('2'),('3')) AS l(lid)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. CHAT SESSIONS + MESSAGES (AI coaching - showing repeated question patterns)
-- ============================================================================

-- Repeated theme: "How do I use DISC in cold email?" (gap signal)
INSERT INTO chat_session (id, user_id, context_course_id, context_lesson_id, message_count, created_at) VALUES
  ('cs_1', 'demo_sarah',  'choose-path', '3', 6, now() - interval '5 days'),
  ('cs_2', 'demo_marcus', 'icp-builder', '4', 4, now() - interval '8 days'),
  ('cs_3', 'demo_james',  'choose-path', '4', 8, now() - interval '3 days'),
  ('cs_4', 'demo_aisha',  'positioning-value', '3', 4, now() - interval '6 days'),
  ('cs_5', 'demo_lin',    'choose-path', '3', 6, now() - interval '2 days'),
  ('cs_6', 'demo_sarah',  'icp-builder', '7', 4, now() - interval '15 days'),
  ('cs_7', 'demo_tom',    'icp-builder', '2', 3, now() - interval '7 days'),
  ('cs_8', 'demo_raj',    'sales-psychology', '2', 4, now() - interval '9 days'),
  ('cs_9', 'demo_elena',  'sales-psychology', '3', 3, now() - interval '18 days'),
  ('cs_10', 'demo_james', 'list-building', '2', 6, now() - interval '2 days'),
  ('cs_11', 'demo_marcus', 'icp-builder', '7', 5, now() - interval '4 days'),
  ('cs_12', 'demo_aisha', 'icp-builder', '13', 4, now() - interval '10 days'),
  ('cs_13', 'demo_lin',   'positioning-value', '5', 6, now() - interval '5 days'),
  ('cs_14', 'demo_sarah', 'positioning-value', '6', 4, now() - interval '10 days'),
  ('cs_15', 'demo_james', 'icp-builder', '10', 5, now() - interval '6 days'),
  ('cs_16', 'demo_tom',   'sales-psychology', '5', 3, now() - interval '12 days'),
  ('cs_17', 'demo_raj',   'sales-psychology', '1', 4, now() - interval '10 days'),
  ('cs_18', 'demo_elena', 'sales-psychology', '1', 3, now() - interval '20 days'),
  ('cs_19', 'demo_aisha', 'positioning-value', '5', 5, now() - interval '4 days'),
  ('cs_20', 'demo_lin',   'icp-builder', '12', 4, now() - interval '6 days')
ON CONFLICT (id) DO NOTHING;

-- Messages showing repeated question patterns
INSERT INTO chat_message (id, session_id, role, content, created_at) VALUES
  -- Session 1: Sarah asks about DISC in cold email
  ('cm_1_1', 'cs_1', 'user', 'How should I adapt my cold email approach based on the prospect DISC profile?', now() - interval '5 days'),
  ('cm_1_2', 'cs_1', 'assistant', 'Great question! For D-style prospects, keep emails under 3 sentences with a clear ROI metric. For I-style, lead with social proof and enthusiasm...', now() - interval '5 days' + interval '1 minute'),
  ('cm_1_3', 'cs_1', 'user', 'What if I dont know their DISC type before the first email?', now() - interval '5 days' + interval '5 minutes'),
  ('cm_1_4', 'cs_1', 'assistant', 'You can infer DISC from their LinkedIn presence. D-types have achievement-focused headlines, I-types list many connections and endorsements...', now() - interval '5 days' + interval '6 minutes'),
  ('cm_1_5', 'cs_1', 'user', 'Can you give me a template for each DISC type cold email?', now() - interval '5 days' + interval '10 minutes'),
  ('cm_1_6', 'cs_1', 'assistant', 'Here are four templates adapted by DISC type:\n\n**D-Style:** Subject: [Metric] improvement in [timeframe]\n**I-Style:** Subject: [Mutual connection] suggested I reach out...', now() - interval '5 days' + interval '11 minutes'),

  -- Session 2: Marcus asks about ICP for consulting
  ('cm_2_1', 'cs_2', 'user', 'How do I define an ICP when my consulting services could help anyone?', now() - interval '8 days'),
  ('cm_2_2', 'cs_2', 'assistant', 'The "anyone" trap is the #1 mistake consultants make. Start with your last 3 best clients and find the pattern...', now() - interval '8 days' + interval '1 minute'),
  ('cm_2_3', 'cs_2', 'user', 'My best clients were all different industries though. Is industry even the right filter?', now() - interval '8 days' + interval '8 minutes'),
  ('cm_2_4', 'cs_2', 'assistant', 'Industry is often a red herring for consultants. Look at psychographic patterns instead: company stage, decision-making style, budget authority structure...', now() - interval '8 days' + interval '9 minutes'),

  -- Session 3: James deep dive on acquisition paths (long session)
  ('cm_3_1', 'cs_3', 'user', 'I know Im suited for outbound but the service business path in lesson 4 confused me. How is it different from B2B SaaS outbound?', now() - interval '3 days'),
  ('cm_3_2', 'cs_3', 'assistant', 'Key difference: service business outbound targets relationship-based decisions while SaaS outbound targets process-based decisions...', now() - interval '3 days' + interval '1 minute'),
  ('cm_3_3', 'cs_3', 'user', 'So should I use different DISC approaches for service vs SaaS cold outreach?', now() - interval '3 days' + interval '5 minutes'),
  ('cm_3_4', 'cs_3', 'assistant', 'Absolutely. In service sales, S-type prospects want relationship depth before discussing scope. In SaaS, even S-types respond to clear ROI data first...', now() - interval '3 days' + interval '6 minutes'),
  ('cm_3_5', 'cs_3', 'user', 'What about the creator acquisition path? Could that work alongside my SaaS outbound?', now() - interval '3 days' + interval '12 minutes'),
  ('cm_3_6', 'cs_3', 'assistant', 'A hybrid approach can work if your product has a PLG component. Many SaaS founders use content (creator path) to warm up outbound prospects...', now() - interval '3 days' + interval '13 minutes'),
  ('cm_3_7', 'cs_3', 'user', 'How do I measure which path is working better? What metrics should I track?', now() - interval '3 days' + interval '20 minutes'),
  ('cm_3_8', 'cs_3', 'assistant', 'Track these per channel: 1) Cost per qualified lead, 2) Time to first response, 3) Conversion rate to demo, 4) Average deal size by source...', now() - interval '3 days' + interval '21 minutes'),

  -- Session 4: Aisha on positioning vs value prop (confusion cluster)
  ('cm_4_1', 'cs_4', 'user', 'Whats the difference between positioning and value proposition? The StoryBrand lesson seemed to overlap with the Dunford framework.', now() - interval '6 days'),
  ('cm_4_2', 'cs_4', 'assistant', 'Positioning = WHERE you sit in the market (competitive context). Value proposition = WHY someone should choose you (unique benefit). StoryBrand helps communicate BOTH...', now() - interval '6 days' + interval '1 minute'),
  ('cm_4_3', 'cs_4', 'user', 'But dont they both answer "why should someone buy from me"?', now() - interval '6 days' + interval '6 minutes'),
  ('cm_4_4', 'cs_4', 'assistant', 'Think of it as layers: Positioning sets the context (you compete against X, Y, Z). Value proposition fills the gap (heres specifically why youre better for customer segment A)...', now() - interval '6 days' + interval '7 minutes'),

  -- Session 5: Lin on DISC in cold email (same gap as Sarah!)
  ('cm_5_1', 'cs_5', 'user', 'For my creator audience, how do I use DISC profiling in my email sequences?', now() - interval '2 days'),
  ('cm_5_2', 'cs_5', 'assistant', 'Creator audiences are typically I-dominant (social, expressive) or D-dominant (ambitious, results-focused). Segment your list by engagement patterns...', now() - interval '2 days' + interval '1 minute'),
  ('cm_5_3', 'cs_5', 'user', 'Can I determine DISC from how people engage with my YouTube content?', now() - interval '2 days' + interval '7 minutes'),
  ('cm_5_4', 'cs_5', 'assistant', 'Yes! D-types leave comments like "just tell me the steps." I-types share and tag friends. S-types lurk but watch everything. C-types ask detailed technical questions...', now() - interval '2 days' + interval '8 minutes'),
  ('cm_5_5', 'cs_5', 'user', 'What email subject lines work best for each DISC type in a creator launch?', now() - interval '2 days' + interval '15 minutes'),
  ('cm_5_6', 'cs_5', 'assistant', 'For D: "[X] founders already enrolled" (scarcity+results). For I: "You were personally selected" (exclusivity+social). For S: "A safe space to learn sales" (comfort+community)...', now() - interval '2 days' + interval '16 minutes'),

  -- Session 6: Sarah on ICP document creation
  ('cm_6_1', 'cs_6', 'user', 'My ICP document is getting too long. How detailed should it actually be?', now() - interval '15 days'),
  ('cm_6_2', 'cs_6', 'assistant', 'Aim for a 1-page "ICP card" for daily use, plus a detailed 3-5 page reference document. The card should have: firmographic criteria, trigger events, and disqualification criteria.', now() - interval '15 days' + interval '1 minute'),
  ('cm_6_3', 'cs_6', 'user', 'What about the negative ICP? Should that be separate?', now() - interval '15 days' + interval '5 minutes'),
  ('cm_6_4', 'cs_6', 'assistant', 'Include 3-5 negative ICP criteria on the same card. Examples: "Company raised Series B+ (too complex)", "Less than 10 employees (too small)"...', now() - interval '15 days' + interval '6 minutes'),

  -- Session 7: Tom on ICP basics
  ('cm_7_1', 'cs_7', 'user', 'As an agency owner, should my ICP be the company or the person who hires agencies?', now() - interval '7 days'),
  ('cm_7_2', 'cs_7', 'assistant', 'Both. Your ICP has two layers: the company profile (industry, size, tech stack) and the buyer persona (typically VP Marketing, Head of Growth, or CTO)...', now() - interval '7 days' + interval '1 minute'),
  ('cm_7_3', 'cs_7', 'user', 'Makes sense. How do I find these people at scale?', now() - interval '7 days' + interval '5 minutes'),

  -- Session 11: Marcus again on ICP for consulting (same theme)
  ('cm_11_1', 'cs_11', 'user', 'Im still struggling with my ICP. Every time I narrow down, I feel like Im leaving money on the table.', now() - interval '4 days'),
  ('cm_11_2', 'cs_11', 'assistant', 'This is the classic consulting trap. The data shows that consultants who niche down earn 2-3x more per project. Lets look at your pipeline...', now() - interval '4 days' + interval '1 minute'),
  ('cm_11_3', 'cs_11', 'user', 'But my ICP for consulting should be different from a SaaS ICP right?', now() - interval '4 days' + interval '8 minutes'),
  ('cm_11_4', 'cs_11', 'assistant', 'Yes. Consulting ICPs weight psychographics (decision style, change readiness) more heavily than SaaS ICPs which weight firmographics (company size, tech stack)...', now() - interval '4 days' + interval '9 minutes'),
  ('cm_11_5', 'cs_11', 'assistant', 'I recommend revisiting the buyer persona lesson with a consulting lens. Focus on the pain-urgency matrix rather than demographic filters.', now() - interval '4 days' + interval '9 minutes'),

  -- Session 13: Lin on value quantification
  ('cm_13_1', 'cs_13', 'user', 'How do I quantify the value of my course when results vary so much between students?', now() - interval '5 days'),
  ('cm_13_2', 'cs_13', 'assistant', 'Use the "anchor and range" approach: anchor to your best case study, then present a conservative range. "Students typically see 2-5x ROI within 90 days..."', now() - interval '5 days' + interval '1 minute'),
  ('cm_13_3', 'cs_13', 'user', 'But what about positioning vs value proposition for a course? They seem like the same thing.', now() - interval '5 days' + interval '8 minutes'),
  ('cm_13_4', 'cs_13', 'assistant', 'For courses, positioning = "This is for [audience] who want [outcome], unlike [alternatives]." Value proposition = "You will learn [specific skills] and achieve [measurable result]."', now() - interval '5 days' + interval '9 minutes'),
  ('cm_13_5', 'cs_13', 'user', 'Can you help me draft both for my upcoming launch?', now() - interval '5 days' + interval '15 minutes'),
  ('cm_13_6', 'cs_13', 'assistant', 'Let me help. Based on your profile: Positioning: "The only coding education that teaches you to build AND sell, for developers who want to launch products, not just write code."', now() - interval '5 days' + interval '16 minutes'),

  -- Session 19: Aisha on positioning vs value prop again (confusion cluster)
  ('cm_19_1', 'cs_19', 'user', 'I went through the positioning and value prop lessons again but Im still confused about where one ends and the other begins.', now() - interval '4 days'),
  ('cm_19_2', 'cs_19', 'assistant', 'Youre not alone - this is the most common confusion point in the curriculum. Think of a restaurant analogy: Positioning = "We are a high-end Italian restaurant in downtown" (category + context). Value prop = "Fresh pasta made daily with imported ingredients, in a romantic setting" (why choose us).', now() - interval '4 days' + interval '1 minute'),
  ('cm_19_3', 'cs_19', 'user', 'Oh that makes more sense! So for my HR tech product, positioning is the market category and value prop is the specific benefit?', now() - interval '4 days' + interval '6 minutes'),
  ('cm_19_4', 'cs_19', 'assistant', 'Exactly. Positioning: "AI-powered employee onboarding for remote-first companies with 50-200 employees." Value prop: "Reduce new hire time-to-productivity by 40% without adding headcount."', now() - interval '4 days' + interval '7 minutes'),
  ('cm_19_5', 'cs_19', 'assistant', 'The test: if a competitor could also say your value prop, your positioning needs work. If your positioning doesnt immediately suggest who its NOT for, narrow it down.', now() - interval '4 days' + interval '7 minutes')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 5. ASSESSMENT SNAPSHOTS (showing improvement over time)
-- ============================================================================

INSERT INTO assessment_snapshot (id, user_id, overall_readiness, icp_clarity, positioning_strength, messaging_consistency, channel_readiness, sales_process_maturity, recommended_path, recommended_start_course, quick_wins_count, critical_gaps_count, full_assessment, created_at) VALUES
  -- Sarah: initial and improved
  ('as_sarah_1', 'demo_sarah', 52, 60, 50, 45, 55, 50, 'outbound-first', 1, 3, 2, '{}', now() - interval '28 days'),
  ('as_sarah_2', 'demo_sarah', 72, 85, 70, 65, 75, 60, 'outbound-first', 2, 2, 1, '{}', now() - interval '5 days'),
  -- Marcus: initial and slight improvement
  ('as_marcus_1', 'demo_marcus', 30, 20, 35, 25, 40, 30, 'inbound-first', 0, 2, 3, '{}', now() - interval '25 days'),
  ('as_marcus_2', 'demo_marcus', 45, 40, 55, 35, 50, 45, 'inbound-first', 0, 2, 2, '{}', now() - interval '4 days'),
  -- Elena: initial only
  ('as_elena_1', 'demo_elena', 32, 30, 25, 40, 35, 30, 'community-first', 0, 3, 3, '{}', now() - interval '22 days'),
  -- James: initial and major improvement
  ('as_james_1', 'demo_james', 48, 55, 50, 40, 50, 45, 'outbound-first', 1, 3, 2, '{}', now() - interval '20 days'),
  ('as_james_2', 'demo_james', 68, 80, 75, 60, 70, 55, 'outbound-first', 3, 2, 1, '{}', now() - interval '2 days'),
  -- Aisha: initial and improved
  ('as_aisha_1', 'demo_aisha', 38, 40, 35, 40, 30, 45, 'inbound-first', 0, 2, 2, '{}', now() - interval '18 days'),
  ('as_aisha_2', 'demo_aisha', 55, 65, 50, 55, 45, 60, 'inbound-first', 1, 2, 1, '{}', now() - interval '3 days'),
  -- Tom: initial only
  ('as_tom_1', 'demo_tom', 38, 35, 40, 30, 45, 40, 'outbound-first', 0, 2, 3, '{}', now() - interval '15 days'),
  -- Lin: initial and improved
  ('as_lin_1', 'demo_lin', 40, 45, 40, 35, 42, 38, 'community-first', 0, 3, 2, '{}', now() - interval '12 days'),
  ('as_lin_2', 'demo_lin', 58, 70, 65, 50, 60, 45, 'community-first', 2, 2, 1, '{}', now() - interval '2 days'),
  -- Raj: initial only
  ('as_raj_1', 'demo_raj', 42, 50, 35, 40, 45, 40, 'outbound-first', 0, 2, 3, '{}', now() - interval '10 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 6. ROLEPLAY SESSIONS
-- ============================================================================

INSERT INTO roleplay_session (id, user_id, industry_id, role_id, disc_type, transcript, evaluation, created_at) VALUES
  ('rp_sarah_1', 'demo_sarah', 'saas', 'cto', 'D', '[{"role":"user","content":"Hi, I noticed your team spends 3 hours/day on code reviews..."},{"role":"assistant","content":"We do. Whats your point?"},{"role":"user","content":"Our tool cuts that to 30 minutes. Want to see how?"},{"role":"assistant","content":"If you can prove that, sure. Show me the data."}]',
   '{"score": 78, "strengths": ["Direct opener with specific metric", "Good handling of D-type directness"], "improvements": ["Add social proof earlier", "Quantify ROI in dollar terms"], "coachingMessage": "Strong start. Next time lead with a customer case study."}',
   now() - interval '8 days'),
  ('rp_james_1', 'demo_james', 'saas', 'vp-sales', 'I', '[{"role":"user","content":"Hey! I saw your LinkedIn post about scaling SDR teams..."},{"role":"assistant","content":"Oh thanks! Yeah we are growing fast. Whats up?"},{"role":"user","content":"We help teams like yours automate the boring parts of prospecting."},{"role":"assistant","content":"Interesting! Tell me more - how does it work?"}]',
   '{"score": 82, "strengths": ["Social proof reference", "Matched I-type enthusiasm", "Good rapport building"], "improvements": ["Ask about their specific pain point", "Qualify budget earlier"], "coachingMessage": "Excellent rapport! Remember to transition from relationship to discovery."}',
   now() - interval '5 days'),
  ('rp_marcus_1', 'demo_marcus', 'consulting', 'ceo', 'S', '[{"role":"user","content":"I wanted to follow up on our conversation at the conference..."},{"role":"assistant","content":"Oh right, nice to hear from you. How can I help?"},{"role":"user","content":"You mentioned struggling with go-to-market. I help founders like you build systematic approaches."},{"role":"assistant","content":"That sounds interesting but we are pretty busy right now. Maybe next quarter?"}]',
   '{"score": 55, "strengths": ["Personal connection reference"], "improvements": ["Create urgency without pressure", "Offer a no-commitment next step", "Use a case study from their industry"], "coachingMessage": "S-types need to feel safe. Try offering a quick diagnostic call instead of jumping to your service."}',
   now() - interval '12 days'),
  ('rp_aisha_1', 'demo_aisha', 'saas', 'hr-director', 'C', '[{"role":"user","content":"I saw your company recently expanded to 150 employees..."},{"role":"assistant","content":"Yes. What specifically prompted your outreach?"},{"role":"user","content":"Companies at your stage typically see 30-40% longer onboarding times. We solve that."},{"role":"assistant","content":"What data do you have to support that claim? And how does your solution technically integrate?"}]',
   '{"score": 71, "strengths": ["Research-based opener", "Specific metric cited"], "improvements": ["Prepare technical integration details for C-types", "Offer a whitepaper or case study before the call"], "coachingMessage": "Good preparation. C-types need proof before meetings - send supporting data in advance next time."}',
   now() - interval '7 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 7. FORUM TOPICS + POSTS (confusion clusters)
-- ============================================================================

INSERT INTO forum_topic_sync (nodebb_tid, title, category_name, slug, user_name, post_count, view_count, vote_count, timestamp_ms, last_post_timestamp_ms) VALUES
  (101, 'Confused about positioning vs value proposition - help!', 'Course Discussions', 'confused-positioning-value-prop', 'AishaPatel', 8, 245, 12, extract(epoch from now() - interval '6 days')::bigint * 1000, extract(epoch from now() - interval '4 days')::bigint * 1000),
  (102, 'Are positioning and value prop the same thing?', 'Course Discussions', 'positioning-value-prop-same', 'LinZhao', 5, 180, 8, extract(epoch from now() - interval '5 days')::bigint * 1000, extract(epoch from now() - interval '3 days')::bigint * 1000),
  (103, 'StoryBrand vs Dunford framework - when to use which?', 'Course Discussions', 'storybrand-vs-dunford', 'TomMiller', 6, 195, 10, extract(epoch from now() - interval '7 days')::bigint * 1000, extract(epoch from now() - interval '5 days')::bigint * 1000),
  (104, 'Value prop keeps sounding like my positioning statement', 'Course Discussions', 'value-prop-positioning-overlap', 'MarcusJohnson', 4, 120, 6, extract(epoch from now() - interval '4 days')::bigint * 1000, extract(epoch from now() - interval '2 days')::bigint * 1000),
  (105, 'My first cold email got a reply! (D-type prospect)', 'Wins', 'first-cold-email-reply', 'SarahChen', 12, 340, 25, extract(epoch from now() - interval '3 days')::bigint * 1000, extract(epoch from now() - interval '1 day')::bigint * 1000),
  (106, 'ICP document template - sharing mine for feedback', 'Resources', 'icp-document-template', 'JamesWright', 9, 280, 18, extract(epoch from now() - interval '8 days')::bigint * 1000, extract(epoch from now() - interval '2 days')::bigint * 1000),
  (107, 'How granular should negative ICP criteria be?', 'Course Discussions', 'negative-icp-granularity', 'AishaPatel', 5, 155, 7, extract(epoch from now() - interval '10 days')::bigint * 1000, extract(epoch from now() - interval '7 days')::bigint * 1000),
  (108, 'Week 1 done - sales psychology changed my perspective', 'General', 'week-1-sales-psychology', 'RajKapoor', 7, 210, 15, extract(epoch from now() - interval '9 days')::bigint * 1000, extract(epoch from now() - interval '6 days')::bigint * 1000),
  (109, 'DISC profiling for email - need more examples', 'Course Discussions', 'disc-profiling-email-examples', 'SarahChen', 6, 175, 9, extract(epoch from now() - interval '4 days')::bigint * 1000, extract(epoch from now() - interval '1 day')::bigint * 1000),
  (110, 'Using DISC to customize cold outreach sequences', 'Course Discussions', 'disc-cold-outreach-sequences', 'LinZhao', 4, 140, 7, extract(epoch from now() - interval '2 days')::bigint * 1000, extract(epoch from now() - interval '1 day')::bigint * 1000),
  (111, 'Announcement: New SEO & AEO course available!', 'Announcements', 'new-seo-aeo-course', 'Admin', 3, 450, 20, extract(epoch from now() - interval '14 days')::bigint * 1000, extract(epoch from now() - interval '10 days')::bigint * 1000),
  (112, 'LinkedIn Sales Navigator vs Apollo - which first?', 'Resources', 'linkedin-vs-apollo', 'JamesWright', 8, 260, 14, extract(epoch from now() - interval '6 days')::bigint * 1000, extract(epoch from now() - interval '2 days')::bigint * 1000),
  (113, 'Closed my first deal using the MAGNETS framework!', 'Wins', 'first-deal-magnets-framework', 'JamesWright', 15, 520, 35, extract(epoch from now() - interval '2 days')::bigint * 1000, extract(epoch from now() - interval '6 hours')::bigint * 1000),
  (114, 'Creator funnel vs traditional B2B funnel', 'Course Discussions', 'creator-vs-b2b-funnel', 'LinZhao', 5, 165, 8, extract(epoch from now() - interval '3 days')::bigint * 1000, extract(epoch from now() - interval '1 day')::bigint * 1000),
  (115, 'Book club: reading "Obviously Awesome" together', 'Book Club', 'book-club-obviously-awesome', 'MarcusJohnson', 6, 190, 11, extract(epoch from now() - interval '11 days')::bigint * 1000, extract(epoch from now() - interval '4 days')::bigint * 1000)
ON CONFLICT (nodebb_tid) DO NOTHING;

INSERT INTO forum_post_sync (nodebb_pid, nodebb_tid, user_name, content_preview, vote_count, timestamp_ms) VALUES
  (1001, 101, 'AishaPatel', 'Im going through Course 2 and the positioning and value prop lessons feel like they cover the same ground. Can someone explain the actual difference?', 5, extract(epoch from now() - interval '6 days')::bigint * 1000),
  (1002, 101, 'SarahChen', 'I had the same confusion! What helped me was thinking of positioning as the MAP and value prop as the DESTINATION.', 8, extract(epoch from now() - interval '5 days')::bigint * 1000),
  (1003, 101, 'JamesWright', 'Think restaurant: positioning = "Italian fine dining downtown" vs value prop = "handmade pasta, romantic ambiance". One is category, other is reasons.', 10, extract(epoch from now() - interval '5 days')::bigint * 1000),
  (1004, 102, 'LinZhao', 'As a creator, this distinction is even harder because my "product" IS my positioning in a way.', 4, extract(epoch from now() - interval '5 days')::bigint * 1000),
  (1005, 102, 'MarcusJohnson', 'Same for consulting. When I AM the product, where does positioning end and value prop begin?', 6, extract(epoch from now() - interval '4 days')::bigint * 1000),
  (1006, 103, 'TomMiller', 'StoryBrand is great for website copy but Dunford is better for sales conversations. Use both.', 7, extract(epoch from now() - interval '7 days')::bigint * 1000),
  (1007, 105, 'SarahChen', 'Used the D-type template from the coaching session and got a reply within 2 hours! The key was keeping it to 3 sentences.', 15, extract(epoch from now() - interval '3 days')::bigint * 1000),
  (1008, 105, 'JamesWright', 'Congrats! What industry was the prospect in?', 3, extract(epoch from now() - interval '3 days')::bigint * 1000),
  (1009, 106, 'JamesWright', 'Sharing my ICP document v3 after the workshop. Includes firmographic, psychographic, and negative criteria.', 12, extract(epoch from now() - interval '8 days')::bigint * 1000),
  (1010, 109, 'SarahChen', 'The DISC email templates in the coaching session were helpful but I need more examples for S and C types.', 5, extract(epoch from now() - interval '4 days')::bigint * 1000),
  (1011, 109, 'AishaPatel', 'Agreed! I especially struggle with C-type emails - they always want more data before a call.', 4, extract(epoch from now() - interval '3 days')::bigint * 1000),
  (1012, 113, 'JamesWright', 'After 3 weeks in the academy, I closed a $12k deal using the systematic approach from courses 0-3!', 20, extract(epoch from now() - interval '2 days')::bigint * 1000),
  (1013, 113, 'SarahChen', 'This is amazing James! Can you share which specific framework made the biggest difference?', 8, extract(epoch from now() - interval '2 days')::bigint * 1000),
  (1014, 113, 'MarcusJohnson', 'Inspiring! I hope to share a similar win soon.', 5, extract(epoch from now() - interval '1 day')::bigint * 1000),
  (1015, 113, 'LinZhao', 'The discovery framework from course 3 was a game changer for me too, even in the creator space.', 6, extract(epoch from now() - interval '1 day')::bigint * 1000)
ON CONFLICT (nodebb_pid) DO NOTHING;

-- ============================================================================
-- 8. CONTENT VERSIONS (curriculum evolution)
-- ============================================================================

INSERT INTO content_version (id, entity_type, entity_id, version_label, change_summary, changed_by, metadata, created_at) VALUES
  ('cv_course0_1_1', 'course', 'sales-psychology', '1.1.0', 'Added new lesson on rejection math based on cognitive bias research', 'system', '{"trigger": "manual", "lessonCount": 8}', now() - interval '20 days'),
  ('cv_lesson_3_4', 'lesson', 'choose-path:4', '1.1.0', 'Rewrote service business acquisition lesson with clearer B2B vs consulting distinction after 42% drop-off detected', 'intelligence', '{"trigger": "dropout_pattern", "dropoffRate": 0.42, "affectedUsers": 3}', now() - interval '1 day'),
  ('cv_course5_1_0', 'course', 'technical-content', '1.0.0', 'New course: Technical Content Engine with 13 lessons', 'system', '{"trigger": "manual", "lessonCount": 13}', now() - interval '14 days'),
  ('cv_course6_1_0', 'course', 'seo-aeo', '1.0.0', 'New course: SEO & Answer Engine Optimization', 'system', '{"trigger": "manual", "lessonCount": 10}', now() - interval '14 days'),
  ('cv_icp_1_1', 'lesson', 'icp-builder:7', '1.1.0', 'Enhanced ICP document creation lesson with consulting-specific examples based on coaching gap analysis', 'intelligence', '{"trigger": "coaching_gap", "topicCount": 5, "affectedCourse": "icp-builder"}', now() - interval '3 days'),
  ('cv_disc_1_1', 'lesson', 'choose-path:3', '1.1.0', 'Added DISC-based cold email templates section after repeated coaching questions', 'intelligence', '{"trigger": "coaching_gap", "questionCount": 8, "topConcern": "DISC in cold email"}', now() - interval '2 days'),
  ('cv_manuscript', 'curriculum', 'v3', '1.2.0', 'Major curriculum update: added creator-specific lessons to courses 1, 4, 5', 'system', '{"trigger": "manual", "addedLessons": 3}', now() - interval '7 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 9. SOCIAL SIGNALS
-- ============================================================================

INSERT INTO social_signal (id, platform, signal_type, content_preview, author, url, sentiment, relevance_score, metadata, created_at) VALUES
  ('ss_1', 'linkedin', 'mention', 'Just joined the SoloFrameHub Customer Acquisition Academy. The DISC-based cold email approach is mind-blowing for a technical founder.', 'Sarah Chen', 'https://linkedin.com/posts/sarahchen-academy', 'positive', 92, '{"likes": 47, "comments": 12, "shares": 8}', now() - interval '3 days'),
  ('ss_2', 'linkedin', 'mention', 'Week 2 of the academy: the ICP Builder workshop forced me to stop saying "we help everyone." Revenue is already up.', 'James Wright', 'https://linkedin.com/posts/jameswright-icp', 'positive', 88, '{"likes": 83, "comments": 24, "shares": 15}', now() - interval '5 days'),
  ('ss_3', 'twitter', 'mention', 'Hot take: most sales courses for founders suck because they teach enterprise tactics. @SoloFrameHub actually gets the solo founder context.', '@devfounder_mike', 'https://twitter.com/devfounder_mike/status/123', 'positive', 85, '{"likes": 156, "retweets": 42, "replies": 18}', now() - interval '2 days'),
  ('ss_4', 'twitter', 'engagement', 'Thread: What I learned about DISC profiling for B2B sales as a solo technical founder (1/8)', '@techsales_guru', 'https://twitter.com/techsales_guru/status/456', 'positive', 78, '{"likes": 234, "retweets": 67, "replies": 31}', now() - interval '4 days'),
  ('ss_5', 'reddit', 'mention', 'Has anyone tried the SoloFrameHub academy? Thinking about it for my SaaS but $49/mo seems steep for a solo founder.', 'u/bootstrapped_dev', 'https://reddit.com/r/SaaS/comments/abc123', 'neutral', 72, '{"upvotes": 23, "comments": 15}', now() - interval '6 days'),
  ('ss_6', 'reddit', 'mention', 'Replying to the SoloFrameHub question - Ive been a member for 3 weeks. The AI coaching alone is worth the price. My ICP went from "everyone" to a focused segment.', 'u/saas_founder_aj', 'https://reddit.com/r/SaaS/comments/abc123/reply', 'positive', 80, '{"upvotes": 45, "comments": 8}', now() - interval '5 days'),
  ('ss_7', 'linkedin', 'share', 'Great framework from SoloFrameHub on positioning vs value proposition. Finally understand the difference after years of confusing the two.', 'Marketing Mike', 'https://linkedin.com/posts/marketingmike-positioning', 'positive', 75, '{"likes": 31, "comments": 7, "shares": 4}', now() - interval '7 days'),
  ('ss_8', 'twitter', 'mention', 'The MAGNETS framework from SoloFrameHub is the best B2B customer acquisition model Ive seen for bootstrapped founders.', '@indie_hacker_sam', 'https://twitter.com/indie_hacker_sam/status/789', 'positive', 90, '{"likes": 189, "retweets": 54, "replies": 22}', now() - interval '1 day'),
  ('ss_9', 'linkedin', 'mention', 'Closed my first $12k deal using systematic approach learned at SoloFrameHub. Sharing my exact process in the comments.', 'James Wright', 'https://linkedin.com/posts/jameswright-12k-deal', 'positive', 95, '{"likes": 156, "comments": 42, "shares": 28}', now() - interval '2 days'),
  ('ss_10', 'twitter', 'engagement', 'Solo founders: stop building, start selling. The data from @SoloFrameHub shows most tech founders procrastibuild for 6+ months before first sale.', '@startupcoach_lisa', 'https://twitter.com/startupcoach/status/321', 'positive', 70, '{"likes": 98, "retweets": 28, "replies": 14}', now() - interval '8 days'),
  ('ss_11', 'reddit', 'mention', 'Looking for alternatives to SoloFrameHub for B2B sales training. Their community seems good but I prefer async learning.', 'u/remote_cto', 'https://reddit.com/r/Entrepreneur/comments/def456', 'neutral', 55, '{"upvotes": 8, "comments": 12}', now() - interval '9 days'),
  ('ss_12', 'linkedin', 'mention', 'AI roleplay for sales practice is the future. @SoloFrameHub lets you practice discovery calls with AI buyers who respond based on DISC types.', 'Tech Sales Advisor', 'https://linkedin.com/posts/techsalesadvisor-ai-roleplay', 'positive', 82, '{"likes": 64, "comments": 19, "shares": 11}', now() - interval '4 days'),
  ('ss_13', 'twitter', 'mention', 'Unpopular opinion: sales academies for founders are mostly rehashed enterprise content. Exception: @SoloFrameHub focuses on bootstrapped context.', '@solofounder_nat', 'https://twitter.com/solofounder_nat/status/654', 'positive', 76, '{"likes": 112, "retweets": 33, "replies": 16}', now() - interval '3 days'),
  ('ss_14', 'reddit', 'mention', 'Just finished Course 0 (Sales Psychology) on SoloFrameHub. The procrastibuild pattern hit too close to home. Highly recommend.', 'u/dev_turned_founder', 'https://reddit.com/r/startups/comments/ghi789', 'positive', 84, '{"upvotes": 67, "comments": 21}', now() - interval '1 day'),
  ('ss_15', 'linkedin', 'engagement', 'Poll: Whats your biggest customer acquisition challenge as a solo founder? 1) Finding leads 2) Closing deals 3) Pricing 4) Fear of selling', 'SoloFrameHub', 'https://linkedin.com/posts/soloframehub-poll', 'neutral', 65, '{"votes": 342, "comments": 48}', now() - interval '10 days'),
  ('ss_16', 'twitter', 'mention', 'The "Choose Your Acquisition Path" module is confusing. Service business vs SaaS distinction needs work. @SoloFrameHub', '@frustrated_founder', 'https://twitter.com/frustrated_founder/status/987', 'negative', 88, '{"likes": 14, "retweets": 3, "replies": 7}', now() - interval '5 days'),
  ('ss_17', 'linkedin', 'mention', 'Warning: this academy will make you realize how much time you wasted building features nobody asked for. Thank you @SoloFrameHub.', 'Elena Rodriguez', 'https://linkedin.com/posts/elenarodriguez-warning', 'positive', 79, '{"likes": 52, "comments": 16, "shares": 9}', now() - interval '6 days'),
  ('ss_18', 'twitter', 'share', 'RT if youre a technical founder who secretly hates sales calls. SoloFrameHub has an AI roleplay feature that lets you practice without the anxiety.', '@anxious_cto', 'https://twitter.com/anxious_cto/status/111', 'positive', 73, '{"likes": 267, "retweets": 89, "replies": 34}', now() - interval '1 day'),
  ('ss_19', 'reddit', 'mention', 'Meta discussion: Is the SoloFrameHub forum actually active? Worried about paying for a dead community.', 'u/community_skeptic', 'https://reddit.com/r/SaaS/comments/jkl012', 'negative', 60, '{"upvotes": 12, "comments": 9}', now() - interval '7 days'),
  ('ss_20', 'linkedin', 'mention', '3 months ago I couldn''t even describe my ICP. Today I closed 2 deals in one week using the SoloFrameHub system. The academy works.', 'Aisha Patel', 'https://linkedin.com/posts/aishapatel-2deals', 'positive', 93, '{"likes": 118, "comments": 35, "shares": 22}', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 10. SEO RESEARCH (NeuronWriter-style data)
-- ============================================================================

INSERT INTO seo_research (id, keyword, search_volume, difficulty, current_position, target_url, content_score, recommendations, source, researched_at) VALUES
  ('seo_1', 'solo founder sales', 2400, 35, 12, '/courses/sales-psychology', 72, '{"title_tag": "Solo Founder Sales: The Complete Psychology Guide", "missing_topics": ["impostor syndrome", "first sale anxiety"], "word_count_target": 3500, "competitors": ["close.com/blog", "hubspot.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_2', 'B2B customer acquisition for startups', 4800, 52, 28, '/courses/choose-path', 45, '{"title_tag": "B2B Customer Acquisition: 4 Paths for Solo Founders", "missing_topics": ["PLG", "community-led growth", "outbound automation"], "word_count_target": 4200, "competitors": ["firstround.com", "saastr.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_3', 'AI sales coaching', 1900, 28, 8, '/features/ai-coaching', 81, '{"title_tag": "AI Sales Coaching for Technical Founders", "missing_topics": ["roleplay simulation", "DISC-based feedback"], "word_count_target": 2800, "competitors": ["gong.io", "chorus.ai"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_4', 'ICP template B2B', 6200, 45, 15, '/courses/icp-builder', 68, '{"title_tag": "ICP Template for B2B: The Solo Founder Workshop", "missing_topics": ["negative ICP", "psychographic criteria"], "word_count_target": 3800, "competitors": ["hubspot.com", "cognism.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_5', 'DISC assessment sales', 3100, 32, 6, '/courses/sales-psychology', 85, '{"title_tag": "DISC Assessment for Sales: Adapt Your Pitch to Buyer Psychology", "missing_topics": ["email personalization", "negotiation styles"], "word_count_target": 3200, "competitors": ["discprofile.com", "crystalknows.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_6', 'cold email templates B2B', 8100, 62, 35, '/courses/list-building', 38, '{"title_tag": "Cold Email Templates for B2B Solo Founders", "missing_topics": ["DISC-typed templates", "A/B testing frameworks", "compliance"], "word_count_target": 5000, "competitors": ["lemlist.com", "woodpecker.co"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_7', 'founder led sales', 1800, 25, 4, '/', 88, '{"title_tag": "Founder-Led Sales: The Complete System for Solo Technical Founders", "missing_topics": ["scaling beyond founder", "delegation playbook"], "word_count_target": 2500, "competitors": ["founderledsales.com", "saastr.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_8', 'value proposition canvas template', 5400, 48, 22, '/courses/positioning-value', 55, '{"title_tag": "Value Proposition Canvas: From Features to Business Outcomes", "missing_topics": ["jobs to be done", "competitive differentiation"], "word_count_target": 3600, "competitors": ["strategyzer.com", "canvanizer.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_9', 'sales roleplay practice', 1200, 18, 3, '/features/roleplay', 90, '{"title_tag": "AI Sales Roleplay: Practice Discovery Calls with DISC-Typed Buyers", "missing_topics": ["objection handling scenarios"], "word_count_target": 2200, "competitors": ["secondnature.ai", "practiceai.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_10', 'positioning framework startups', 2800, 38, 18, '/courses/positioning-value', 62, '{"title_tag": "Startup Positioning Framework: Dunford + StoryBrand for Solo Founders", "missing_topics": ["category design", "positioning statement examples"], "word_count_target": 3400, "competitors": ["aprildunford.com", "storybrand.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_11', 'bootstrapped SaaS sales', 1500, 22, 7, '/courses/choose-path', 78, '{"title_tag": "Bootstrapped SaaS Sales: Build Pipeline Without a Sales Team", "missing_topics": ["CAC optimization", "sales velocity metrics"], "word_count_target": 2800, "competitors": ["microconf.com", "indiehackers.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_12', 'answer engine optimization', 3200, 30, 11, '/courses/seo-aeo', 74, '{"title_tag": "Answer Engine Optimization: Get Cited by AI (ChatGPT, Perplexity)", "missing_topics": ["structured data for AI", "entity authority building"], "word_count_target": 3000, "competitors": ["searchengineland.com", "moz.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_13', 'technical founder marketing', 2100, 33, 9, '/courses/technical-content', 80, '{"title_tag": "Technical Founder Marketing: Content That Sells Without Feeling Salesy", "missing_topics": ["developer relations", "build in public strategy"], "word_count_target": 3100, "competitors": ["devmarketing.xyz", "swyx.io"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_14', 'sales discovery questions B2B', 4100, 42, 20, '/courses/sales-psychology', 58, '{"title_tag": "Sales Discovery Questions: The BANT/MEDDIC Hybrid for Solo Founders", "missing_topics": ["qualification frameworks", "red flag detection"], "word_count_target": 3800, "competitors": ["gong.io/blog", "close.com"]}', 'neuronwriter', now() - interval '3 days'),
  ('seo_15', 'customer acquisition cost calculator', 3800, 40, 25, '/tools/cac-calculator', 42, '{"title_tag": "Customer Acquisition Cost Calculator for Bootstrapped Founders", "missing_topics": ["CAC payback period", "channel attribution"], "word_count_target": 2600, "competitors": ["baremetrics.com", "chartmogul.com"]}', 'neuronwriter', now() - interval '3 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 11. PODS + MEMBERS + ACTIVITY
-- ============================================================================

INSERT INTO pod (id, name, slug, status, curriculum_stage, deal_size_tier, max_members, current_member_count, week_number, created_at) VALUES
  ('pod_alpha', 'Alpha Builders', 'alpha-builders', 'active', 'foundations', 'smb', 6, 4, 3, now() - interval '21 days'),
  ('pod_beta', 'Beta Closers', 'beta-closers', 'active', 'marketing-engine', 'mid_market', 6, 4, 2, now() - interval '14 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pod_member (id, pod_id, user_id, status, joined_at, last_active_at, post_count, engagement_score) VALUES
  ('pm_1', 'pod_alpha', 'demo_sarah',  'active', now() - interval '21 days', now() - interval '1 day', 12, 85),
  ('pm_2', 'pod_alpha', 'demo_marcus', 'active', now() - interval '21 days', now() - interval '2 days', 8, 65),
  ('pm_3', 'pod_alpha', 'demo_elena',  'active', now() - interval '20 days', now() - interval '5 days', 3, 35),
  ('pm_4', 'pod_alpha', 'demo_raj',    'active', now() - interval '18 days', now() - interval '7 days', 2, 25),
  ('pm_5', 'pod_beta',  'demo_james',  'active', now() - interval '14 days', now() - interval '1 day', 15, 92),
  ('pm_6', 'pod_beta',  'demo_aisha',  'active', now() - interval '14 days', now() - interval '3 days', 9, 72),
  ('pm_7', 'pod_beta',  'demo_tom',    'active', now() - interval '13 days', now() - interval '6 days', 5, 48),
  ('pm_8', 'pod_beta',  'demo_lin',    'active', now() - interval '12 days', now() - interval '1 day', 11, 80)
ON CONFLICT (id) DO NOTHING;

INSERT INTO pod_activity (id, pod_id, user_id, event_type, metadata, created_at) VALUES
  ('pa_1',  'pod_alpha', 'demo_sarah',  'member_joined', '{}', now() - interval '21 days'),
  ('pa_2',  'pod_alpha', 'demo_marcus', 'member_joined', '{}', now() - interval '21 days'),
  ('pa_3',  'pod_alpha', 'demo_elena',  'member_joined', '{}', now() - interval '20 days'),
  ('pa_4',  'pod_alpha', 'demo_raj',    'member_joined', '{}', now() - interval '18 days'),
  ('pa_5',  'pod_alpha', 'demo_sarah',  'milestone_reached', '{"milestone": "completed_course_2", "xp": 100}', now() - interval '5 days'),
  ('pa_6',  'pod_beta',  'demo_james',  'member_joined', '{}', now() - interval '14 days'),
  ('pa_7',  'pod_beta',  'demo_aisha',  'member_joined', '{}', now() - interval '14 days'),
  ('pa_8',  'pod_beta',  'demo_tom',    'member_joined', '{}', now() - interval '13 days'),
  ('pa_9',  'pod_beta',  'demo_lin',    'member_joined', '{}', now() - interval '12 days'),
  ('pa_10', 'pod_beta',  'demo_james',  'milestone_reached', '{"milestone": "first_deal_closed", "dealValue": 12000}', now() - interval '2 days'),
  ('pa_11', 'pod_beta',  'demo_lin',    'milestone_reached', '{"milestone": "completed_course_2", "xp": 100}', now() - interval '3 days'),
  ('pa_12', 'pod_alpha', 'demo_sarah',  'post_created', '{"topic": "DISC cold email templates"}', now() - interval '4 days'),
  ('pa_13', 'pod_beta',  'demo_james',  'post_created', '{"topic": "ICP document v3 sharing"}', now() - interval '3 days'),
  ('pa_14', 'pod_alpha', 'demo_marcus', 'post_created', '{"topic": "Consulting ICP struggles"}', now() - interval '4 days')
ON CONFLICT (id) DO NOTHING;

-- Facilitator context (weekly summaries)
INSERT INTO facilitator_context (id, pod_id, week_number, member_contexts, pod_health_score, ai_summary, created_at) VALUES
  ('fc_alpha_1', 'pod_alpha', 1, '{"demo_sarah": {"name": "Sarah", "progress": "Course 1", "engagement": "high"}, "demo_marcus": {"name": "Marcus", "progress": "Course 0", "engagement": "medium"}}', 72, 'Alpha Builders had a strong first week. Sarah is leading engagement with 5 posts. Marcus is catching up on Course 0. Elena and Raj need nudging - low activity.', now() - interval '14 days'),
  ('fc_alpha_2', 'pod_alpha', 2, '{"demo_sarah": {"name": "Sarah", "progress": "Course 2", "engagement": "high"}, "demo_marcus": {"name": "Marcus", "progress": "Course 1", "engagement": "medium"}}', 68, 'Week 2: Sarah completed Course 2 and shared positioning tips. Marcus making steady progress on ICP. Elena posted once about sales psychology. Raj silent - consider reaching out.', now() - interval '7 days'),
  ('fc_alpha_3', 'pod_alpha', 3, '{"demo_sarah": {"name": "Sarah", "progress": "Course 3", "engagement": "high"}, "demo_marcus": {"name": "Marcus", "progress": "Course 1", "engagement": "medium"}}', 65, 'Week 3: Sarah hit the acquisition path module - showing signs of confusion on lesson 4 (service vs SaaS distinction). Marcus deep in ICP workshop. Pod health declining due to Elena and Raj inactivity.', now()),
  ('fc_beta_1', 'pod_beta', 1, '{"demo_james": {"name": "James", "progress": "Course 3", "engagement": "very_high"}, "demo_aisha": {"name": "Aisha", "progress": "Course 2", "engagement": "high"}}', 82, 'Beta Closers launched strong! James is a powerhouse - already on Course 3. Aisha making great progress on positioning. Tom and Lin joining the conversation.', now() - interval '7 days'),
  ('fc_beta_2', 'pod_beta', 2, '{"demo_james": {"name": "James", "progress": "Course 4", "engagement": "very_high"}, "demo_aisha": {"name": "Aisha", "progress": "Course 2", "engagement": "high"}}', 85, 'Week 2: HUGE win - James closed a $12k deal! Pod morale is sky high. Aisha working through positioning confusion. Lin contributing creator-specific insights. Tom needs encouragement.', now())
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- DONE! Verify with: SELECT count(*) FROM lesson_event;
-- ============================================================================
