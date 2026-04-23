# ML Integration Strategy — Nebius AI Discovery Award 2026

**Date:** April 2026  
**Status:** Strategic Planning  
**Deadline:** April 30, 2026 (application submission)  
**Category:** Digital Health  

---

## Executive Summary

The Digital Wellness Academy deploys ML across three operational layers: **clinical safety** (real-time distress detection), **intelligent coaching** (RAG-powered therapeutic companion with crisis gating), and **provider intelligence** (session prep, patient risk context). This document outlines the complete ML integration strategy — what's deployed, what GPU credits unlock, and how the data flywheel creates a defensible analytics moat that competitors cannot replicate without 1–2 years of longitudinal clinical data.

**Core thesis:** Every user interaction — quiz response, journal entry, forum post, assessment score, lesson completion — trains the system to deliver better clinical outcomes. GPU credits don't just improve inference speed; they unlock the **adaptive learning layer** that transforms static courses into personalized treatment pathways.

---

## Part 1: Deployed ML Systems (Operational Today)

### 1.1 DistilBERT Distress Classifier (Maia)

**Architecture:** Fine-tuned DistilBERT (255MB) → FastAPI → Docker Swarm  
**Integration points:** Journal entries, assessment responses, forum posts, coaching chat  
**Classification:** Three-tier (None / Mild / Crisis) with configurable confidence thresholds  
**Safety design:**
- Zero-knowledge architecture — input text never stored or logged (HIPAA compliant)
- 3-second hard timeout with SAFE_FALLBACK (never blocks user flow)
- Crisis-level triggers immediate provider notification + 988 Lifeline escalation
- CPU inference only (no GPU dependency for safety-critical path)

**Performance characteristics:**
- Confidence thresholds: Crisis ≥ 85%, Mild 60–85%, None < 60%
- Fail-safe: Returns `none` if classifier unavailable (safety net, not risk amplifier)
- Concurrency: Async FastAPI with resource limits (2–4 CPU, 4–8GB RAM)

**Unified classification client** (`/lib/ai/maia-client.ts`):
- Distress detection (none/mild/crisis)
- Forum topic routing (needs-provider vs. community-handles)
- Content quality scoring
- Content atomization tagging (for marketing pipeline)

### 1.2 RAG-Powered Provider Intelligence

**Architecture:** OpenAI `text-embedding-3-small` (1536 dims) → JSONB embeddings → cosine similarity → gpt-4o-mini synthesis  
**Knowledge base:** 380+ MDX lessons across 5 clinical tracks + standardized clinical assessments (PHQ-9, GAD-7, PDSS-SR, OCD screening)  
**Provider features:**
- Natural language queries against the full course library and clinical assessment content
- Automated session prep briefs — synthesizes patient's recent activity, quiz scores, and relevant course material into a pre-appointment summary
- Source attribution — every RAG response cites specific lessons/assessments for clinical traceability

**Current limitation:** JSONB float arrays with JavaScript cosine similarity. Functional but won't scale beyond ~5,000 embeddings without pgvector migration.

### 1.3 Wellness Coaching Chat (AI Companion)

**Architecture:** Multi-model routing via OpenRouter → streaming responses → crisis detection headers  
**Models:**
- Coaching: Claude Haiku 4.5 (configurable via env)
- Quiz reflection: Gemini 2.5 Flash
- Forum moderation: Gemini 2.5 Flash
- Voice: OpenAI TTS-1 + Whisper STT

**Context assembly** (`/lib/services/profileContextService.ts`):
- Primary/secondary symptoms with severity
- Wellness goals and learning preferences
- Life context (age, stage, living situation, support network)
- Coping strategies, therapy history, triggers
- Progress metrics (XP, course completion, streak days)
- Personal reflections (user's own words for personalization)

**Safety integration:**
- Every user message classified by Maia before LLM processing
- Multi-level crisis detection (keyword + ML hybrid)
- Crisis response: pre-built clinically-reviewed responses with 988 Lifeline, blocks further AI chat
- HTTP headers signal crisis state to frontend for UI intervention

**Interaction modalities:**
- Flyout chat widget (available on every page, context-aware)
- Dedicated coaching page (`/coach`)
- Voice input (Whisper STT) and voice output (TTS-1)

### 1.4 Forum Moderation AI

**Architecture:** Gemini 2.5 Flash for content classification  
**Function:** Screens forum posts for clinical safety, community guidelines compliance, and topic routing  
**Integration:** Feeds back into Maia unified classifier for consistent distress detection across all user-generated content

---

## Part 2: GPU-Dependent ML Roadmap (What Nebius Credits Unlock)

### 2.1 Adaptive Learning Engine

**The problem:** Every user currently receives the same linear course sequence regardless of their baseline knowledge, learning pace, or mastery level. A user who aces cognitive distortion quizzes still sits through foundational content. A struggling user gets no additional support.

**The solution — three interconnected models:**

#### Item Response Theory (IRT) — Quiz Calibration
- **Purpose:** Determine true difficulty of every quiz question based on response patterns
- **Implementation:** `py-irt` Python library as microservice
- **Training data:** Quiz response logs (question, user, correct/incorrect, response time)
- **Output:** Per-question difficulty parameters, per-user ability estimates
- **GPU need:** Initial calibration on historical quiz data, periodic recalibration as new questions added
- **Impact:** Stop showing easy questions to advanced users, stop overwhelming beginners

#### Bayesian Knowledge Tracing (BKT) — Mastery Estimation
- **Purpose:** Track per-skill mastery in real-time as users complete lessons and quizzes
- **Implementation:** `pyBKT` Python library (pip-installable), 4 parameters per skill: P(L0), P(T), P(G), P(S)
- **Training data:** Sequence of correct/incorrect responses per knowledge component
- **Output:** Per-user, per-skill mastery probability (0–1)
- **GPU need:** Parameter fitting across growing user base, cross-validation
- **Impact:** "You've mastered cognitive distortions — skip to behavioral activation" vs. "You need more practice on thought records before advancing"

#### FSRS Spaced Repetition — Review Scheduling
- **Purpose:** Schedule optimal review timing for quiz material to maximize long-term retention
- **Implementation:** JavaScript (runs client-side in Next.js) — open-source `free-spaced-repetition-scheduler`
- **Training data:** Review history (when reviewed, grade, time since last review)
- **Output:** Optimal next review date per item
- **GPU need:** None (algorithmic, client-side) — but feeds data to BKT
- **Impact:** "Review your exposure hierarchy skills from 2 weeks ago" at the moment forgetting curves predict maximum benefit

**Combined effect:** IRT calibrates content difficulty → BKT tracks mastery → FSRS schedules reviews. Together, they create a personalized learning path that adapts in real-time. No static course sequence can compete with this.

### 2.2 Patient Risk Stratification

**The problem:** Providers see raw data — individual mood scores, individual distress alerts, individual quiz grades. They lack a synthesized risk view across their entire patient roster.

**The solution:**

#### Composite Risk Scoring Model
- **Architecture:** XGBoost gradient-boosted trees on structured features
- **Input features:**
  - Assessment score trajectories (PHQ-9, GAD-7 slopes)
  - Engagement metrics (login frequency, time-between-sessions, lesson completion rate)
  - Quiz performance trends (improving, stagnating, declining)
  - Distress classifier trigger frequency and severity distribution
  - Journal sentiment trajectory (via ClinicalBERT — see 2.3)
  - Forum participation changes
- **Output:** Risk tier (Low / Watch / Elevated / High) + contributing factors
- **GPU need:** Training + hyperparameter optimization on patient data, periodic retraining
- **Impact:** Provider dashboard shows "3 patients need attention this week" ranked by composite risk, not just "Patient X had a crisis flag"

#### Churn Prediction
- **Architecture:** Random Forest classifier on engagement features
- **Purpose:** Flag patients likely to disengage before they disappear
- **Business impact:** Critical for practice licensing revenue — disengaged patients = lost subscriptions = practices question platform value
- **GPU need:** Training on engagement sequences, temporal pattern recognition

### 2.3 Enhanced Clinical NLP

**The problem:** The distress classifier provides binary safety gating (crisis/not crisis). It doesn't tell providers *what kind* of distress, *how it's trending*, or *what clinical domain* the patient is struggling in.

**The solution:**

#### ClinicalBERT Second-Pass Classifier
- **Purpose:** Granular categorization — anxiety vs. depression vs. stress vs. trauma response vs. personality-related distress
- **Architecture:** ClinicalBERT (pre-trained on clinical notes/EHR data) fine-tuned on platform interaction data
- **GPU need:** Fine-tuning on platform-specific text (journal entries, forum posts, assessment free-text)
- **Training data:** Labeled by correlation with standardized assessment scores (PHQ-9 maps to depression, GAD-7 maps to anxiety)
- **Impact:** Provider sees "Patient X's journal entries show increasing anxiety markers" not just "distress detected"

#### Sentiment Trajectory Tracking
- **Purpose:** Per-patient emotional progression over weeks/months
- **Architecture:** RoBERTa fine-tuned for mental health sentiment (existing HuggingFace models achieve 99%+ accuracy on benchmarks)
- **GPU need:** Inference at scale across longitudinal journal/forum data
- **Impact:** Publishable outcomes data — "Patients who completed CBT Fundamentals showed statistically significant sentiment improvement at week 6"

### 2.4 Content Intelligence

**The problem:** With 380+ lessons and growing, there's no systematic way to know which content drives clinical improvement, what topics users need that don't exist yet, or which lessons underperform.

**The solution:**

#### Forum Topic Clustering
- **Architecture:** Sentence embeddings → HDBSCAN clustering → topic labeling
- **Purpose:** Surface trending themes, common struggles, emerging content needs from community discussion
- **GPU need:** Embedding generation for forum corpus, periodic reclustering
- **Impact:** "50 users discussed sleep hygiene this month but you have no course on it" → build it

#### Content-Outcome Correlation
- **Architecture:** Causal inference models (propensity score matching or instrumental variables)
- **Purpose:** Identify which specific lessons/courses correlate with assessment score improvement
- **GPU need:** Large-scale statistical modeling across user × content × outcome matrices
- **Impact:** "Lesson 3.4 on cognitive restructuring is associated with 2.1-point PHQ-9 improvement" — this is publishable research

#### Content Recommendation Engine
- **Architecture:** Hybrid collaborative + content-based filtering
  - Collaborative: "Users with similar assessment profiles who completed Course A showed improvement — recommend Course A"
  - Content-based: "This user struggles with anxiety; recommend courses tagged with GAD-related content"
- **GPU need:** Matrix factorization training, embedding similarity computation
- **Impact:** Personalized "recommended next" that adapts to clinical profile, not just completion history

### 2.5 pgvector Migration + User-Facing RAG

**The problem:** Provider RAG exists but uses JSONB float arrays with JavaScript cosine similarity. Users (patients) have no RAG access — the coaching chat doesn't retrieve course content.

**The solution:**
- Migrate embeddings from JSONB → pgvector (HNSW index) in existing Postgres
- Extend RAG endpoint to serve user-facing coaching chat (not just providers)
- Chunk 380+ MDX lessons by section/heading (semantically meaningful boundaries)
- Implement Socratic system prompts per course track (ask questions, don't give answers — following the Khanmigo pattern)
- **GPU need:** Batch embedding generation for full course library, incremental updates as content changes

**Impact:** User asks "How do I challenge catastrophic thinking?" → system retrieves the specific lesson section on cognitive restructuring → coaching chat guides them through the exercise using YOUR evidence-based content, not generic LLM knowledge.

---

## Part 3: The Data Flywheel (Why This Is Defensible)

### The Virtuous Cycle

```
More practices license the platform
        ↓
More patients use courses, quizzes, journals, forums
        ↓
More interaction data feeds ML models
        ↓
Better personalization → better outcomes → better retention
        ↓
Better outcomes data → publishable research → more practices trust the platform
        ↓
(cycle repeats)
```

### Quantified Data Advantage

At target scale (10 practices × 200 patients = 2,000 active users):

| Data Type | Volume (Monthly) | ML Application |
|-----------|-----------------|----------------|
| Quiz responses | ~100,000 (2K users × 5 questions × 10 lessons) | IRT calibration, BKT mastery, disengagement detection |
| Journal entries | ~30,000 (2K users × ~15 entries) | Distress classification, sentiment trajectory, ClinicalBERT training |
| Assessment scores | ~4,000 (2K users × 2 assessments) | Risk stratification, outcome correlation, population modeling |
| Forum posts | ~10,000 (2K users × ~5 posts) | Topic clustering, content gap detection, peer support quality |
| Lesson interactions | ~200,000 (2K users × ~100 page views) | Engagement prediction, churn detection, recommendation training |
| Coaching chat messages | ~50,000 (2K users × ~25 messages) | RAG quality improvement, Socratic prompt refinement |

**Total: ~394,000 labeled interaction signals per month.**

A competitor starting from zero needs 12–18 months of user adoption to accumulate comparable training data. By then, our models have been retrained 12–18 times, each iteration improving personalization and outcomes.

### The Research Output

This data directly produces peer-reviewable research:
- "Longitudinal PHQ-9 trajectories in a digital CBT intervention: A naturalistic cohort study"
- "Adaptive learning pathway optimization in mental health education: BKT-based personalization outcomes"
- "Real-time distress detection in digital mental health platforms: DistilBERT performance in community settings"
- "Content-outcome correlations in structured mental health education: Which lessons move clinical scales?"

Each publication strengthens the platform's credibility with practices, providers, and future award applications.

---

## Part 4: GPU Credit Allocation Plan

### How $5,000 in Nebius GPU Credits Would Be Spent

| ML System | GPU Task | Estimated Compute | Priority |
|-----------|---------|------------------|----------|
| ClinicalBERT fine-tuning | Fine-tune on platform journal/forum data | ~$800 (A100 hours) | P1 |
| Sentiment model training | Fine-tune RoBERTa for mental health sentiment | ~$600 (A100 hours) | P1 |
| BKT parameter fitting | Cross-validated mastery estimation across users | ~$400 (batch compute) | P1 |
| IRT quiz calibration | Item parameter estimation on quiz response data | ~$300 (batch compute) | P2 |
| Embedding generation | pgvector migration — batch embed 380+ lessons | ~$200 (API or local) | P2 |
| Risk stratification | XGBoost training + hyperparameter search | ~$300 (batch compute) | P2 |
| Topic clustering | Forum corpus embedding + HDBSCAN | ~$200 (batch compute) | P2 |
| Content-outcome modeling | Causal inference across user × content matrix | ~$500 (statistical compute) | P3 |
| Churn prediction | Random Forest training on engagement features | ~$200 (batch compute) | P3 |
| Retraining buffer | Monthly model retraining as data grows | ~$1,500 (ongoing) | Ongoing |
| **Total** | | **~$5,000** | |

### Infrastructure Requirements

- **Training:** Nebius GPU instances (A100/H100) for fine-tuning and batch compute
- **Inference:** CPU-based for safety-critical path (distress classifier — must never depend on GPU availability)
- **Storage:** Existing Postgres + pgvector extension (no new database)
- **Orchestration:** Python microservices in Docker (matching existing distress classifier pattern)

---

## Part 5: Competitive Positioning

### Why No Competitor Can Replicate This Quickly

| Competitor | What They Have | What They Lack |
|-----------|---------------|----------------|
| **Woebot / Wysa** | Consumer chatbots with clinical validation | No educational depth (380+ lessons), no provider coordination, no practice licensing, no analytics moat |
| **HealthStream / MapleLMS** | Healthcare learning management | No clinical AI safety, no distress detection, no therapeutic content, no patient-provider bridge |
| **Khanmigo** | AI-powered education at scale (700K users) | No healthcare focus, no HIPAA, no clinical assessments, no crisis detection |
| **Headspace / Calm** | Consumer wellness with meditation content | No evidence-based clinical education, no provider integration, no practice licensing model |

### The Moat Stack

1. **Safety layer** (DistilBERT) — regulatory compliance + clinical trust
2. **Content layer** (380+ evidence-based lessons) — 15–20 hours per course to build, not copyable overnight
3. **Intelligence layer** (adaptive learning + risk stratification) — requires longitudinal data that only comes from real users
4. **Distribution layer** (practice licensing) — practices do the marketing, 70/30 revenue share aligns incentives
5. **Research layer** (publishable outcomes) — academic credibility compounds over time

---

## Part 6: Implementation Timeline

### Phase 1: Pre-Submission (Now → April 30, 2026)
- [x] Distress classifier deployed and operational
- [x] Provider RAG with session prep
- [x] Coaching chat with crisis gating
- [ ] Document F1/AUC metrics for distress classifier
- [ ] Prepare quantified metrics package for application

### Phase 2: Post-Award (May–July 2026)
- pgvector migration (replace JSONB embeddings)
- User-facing RAG (extend coaching chat with course content retrieval)
- IRT quiz calibration (first model using existing quiz data)
- BKT mastery estimation (microservice deployment)
- FSRS spaced repetition (client-side JavaScript)

### Phase 3: Intelligence Layer (August–October 2026)
- ClinicalBERT fine-tuning (granular distress categorization)
- Sentiment trajectory tracking (longitudinal analysis)
- Patient risk stratification (composite scoring for providers)
- Churn prediction (engagement-based early warning)

### Phase 4: Analytics Moat (November 2026–January 2027)
- Forum topic clustering (content gap detection)
- Content-outcome correlation (which lessons improve scores)
- Content recommendation engine (personalized pathways)
- A/B testing framework (lesson variant testing)

### Phase 5: Research & Publication (2027+)
- First outcomes paper (PHQ-9 trajectories)
- Adaptive learning effectiveness study
- Distress detection performance in community settings
- Conference presentations (APA, AMIA)

---

## Appendix: Technology Stack Alignment

| Component | Current | With Nebius |
|-----------|---------|-------------|
| Distress detection | DistilBERT (CPU, Dokploy) | + ClinicalBERT second-pass (GPU training) |
| Embeddings | JSONB float arrays | pgvector with HNSW index |
| RAG | Provider-only, gpt-4o-mini | + User-facing, Socratic prompts |
| Coaching | Claude Haiku, context-aware | + Course content RAG retrieval |
| Learning paths | Static linear sequence | Adaptive via IRT + BKT + FSRS |
| Provider tools | Raw data display | Composite risk scoring + auto-briefs |
| Analytics | Metabase dashboards | + ML-powered content intelligence |
| Training infra | None (pre-trained models only) | Nebius GPU instances for fine-tuning |
