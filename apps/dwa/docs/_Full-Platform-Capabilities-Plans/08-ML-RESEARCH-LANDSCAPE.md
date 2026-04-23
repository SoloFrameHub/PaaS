# ML Research Landscape — Models, Frameworks & Competitive Analysis

**Date:** April 2026  
**Purpose:** Deep research into existing ML models, learning frameworks, and competitive platforms applicable to the Digital Wellness Academy  
**Audience:** Nebius AI Discovery Award application, technical architecture decisions  

---

## 1. Adaptive Learning Models

The core ML opportunity for the platform: replacing static linear course sequences with personalized learning paths that adapt in real-time to each user's mastery level.

### 1.1 Knowledge Tracing (Modeling What a Student Knows)

#### Bayesian Knowledge Tracing (BKT)
- **What it does:** Models per-skill mastery with four parameters — P(L0) initial knowledge, P(T) learning rate, P(G) guess probability, P(S) slip probability
- **Why it fits:** Simple, interpretable, proven in deployed intelligent tutoring systems across thousands of educational deployments
- **Library:** [pyBKT](https://github.com/CAHLR/pyBKT) — Python, pip-installable, includes fitting, prediction, cross-validation
- **Data requirements:** Sequence of correct/incorrect quiz responses tagged by knowledge component
- **Our readiness:** HIGH — we have 5 questions per lesson with external JSON quizzes, directly mappable to BKT input format
- **Effort:** Python microservice (matching distress classifier pattern), days to deploy

#### Deep Knowledge Tracing (DKT)
- **What it does:** Uses LSTMs to model temporal dynamics of student knowledge — captures complex skill dependencies BKT misses
- **Reference:** [Piech et al., Stanford](https://stanford.edu/~cpiech/bio/papers/deepKnowledgeTracing.pdf) — the foundational paper
- **Trade-off:** Better accuracy than BKT but less interpretable (black box). Requires more training data.
- **Our readiness:** MEDIUM — need sufficient user base first (1,000+ users with quiz history)
- **Effort:** GPU training required, weeks to tune

#### RL-DKT (Reinforcement Learning + Dynamic Knowledge Tracing)
- **What it does:** Combines knowledge tracing with RL for real-time learning path optimization
- **Reference:** [Nature Scientific Reports, 2025](https://www.nature.com/articles/s41598-025-23900-4)
- **Results:** 12.5% improvement in task completion time, 50% dropout reduction vs. BKT/DKT alone
- **Our readiness:** LOW — frontier research, complex to implement. Phase 4+ consideration.

#### Item Response Theory (IRT)
- **What it does:** Models probability of correct response as function of student ability vs. item difficulty. Calibrates quiz questions.
- **Libraries:** `py-irt` (Python), `mirt` (R)
- **Why it fits:** We have 5 questions per lesson × 380+ lessons = 1,900+ quiz items to calibrate. IRT tells us which questions are too easy, too hard, or poorly discriminating.
- **Our readiness:** HIGH — direct application to existing quiz infrastructure
- **Effort:** Batch computation job, hours to implement

### 1.2 Spaced Repetition Scheduling

#### FSRS (Free Spaced Repetition Scheduler)
- **What it does:** Modern replacement for SM-2 (the Anki algorithm). Models difficulty, stability, and retrievability per item.
- **Library:** [open-spaced-repetition/free-spaced-repetition-scheduler](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler) — JavaScript, Python, Rust, Go implementations
- **Why it fits:** JS implementation runs client-side in Next.js. Schedules optimal quiz review timing to maximize long-term retention.
- **Evidence:** Significantly outperforms SM-2 in empirical tests across millions of review sessions
- **Our readiness:** HIGH — JavaScript library, no GPU needed, no backend changes
- **Effort:** Days to integrate into quiz system

#### SM-2 (SuperMemo)
- **The classic:** Still widely used (it's what Anki runs), simpler than FSRS. FSRS is strictly better if the added complexity is acceptable.
- **Recommendation:** Skip SM-2, go directly to FSRS.

### 1.3 Recommended Stack for Our Platform

```
IRT (quiz calibration)
  → "This question is too easy for 80% of users — retire or replace it"
  
BKT (mastery estimation)
  → "This user has 92% mastery of cognitive distortions — skip to behavioral activation"
  
FSRS (review scheduling)
  → "Review your exposure hierarchy skills on Thursday — that's when forgetting curves predict maximum benefit"
```

All three are complementary. IRT calibrates content, BKT tracks learners, FSRS optimizes review timing.

---

## 2. NLP Models for Educational Content

### 2.1 Socratic Tutoring Approaches

The research consensus: **prompt engineering + RAG >> fine-tuning** for educational AI tutoring.

#### SocraticAI
- **What it does:** Scaffolded AI tutoring that constrains LLM output to guide via questions, not answers
- **Reference:** [arxiv:2512.03501](https://arxiv.org/abs/2512.03501)
- **Results:** 75%+ of students produce substantive reflections within 2–3 weeks
- **Key insight:** Custom system prompts + structured interaction constraints on any capable LLM are more effective than fine-tuning

#### KELE (Multi-Agent Socratic Framework)
- **What it does:** Multiple specialized agents — questioner, evaluator, hint-giver — coordinated for teaching
- **Reference:** [ACL 2025 Findings](https://aclanthology.org/2025.findings-emnlp.888.pdf)
- **Relevance:** Could map to our architecture: one agent retrieves course content, one asks Socratic questions, one evaluates responses

#### SocratiQ
- **What it does:** Generative AI learning companion for personalized education
- **Reference:** [arxiv:2502.00341](https://arxiv.org/html/2502.00341v1)
- **Results:** Significant critical thinking improvement after just 5 interaction turns
- **Relevance:** Validates that short Socratic interactions (not extended sessions) are effective

### 2.2 The Khanmigo Pattern (Reference Architecture)

Khan Academy's Khanmigo is the most relevant reference implementation for our platform:

- **Architecture:** GPT-4 + RAG over 429 courses with Socratic system prompts
- **NOT fine-tuned** — uses general-purpose LLMs with custom prompts + retrieved content
- **Key features:**
  - Retrieves human-authored exercises, hints, and solutions as context before responding
  - Dedicated calculator module for computation (LLMs are unreliable for math)
  - Serving 700K+ users as of 2024–25
  - Microsoft partnership for distribution
  - Free for teachers in the U.S.

**Key lesson for us:** RAG over our 380+ MDX lessons + Socratic system prompts = per-lesson AI tutoring without fine-tuning. The Khanmigo team specifically chose RAG over fine-tuning because fine-tuning produced hallucinated content that looked authoritative.

### 2.3 Application to Our Platform

Our coaching chat already exists. What's missing is the **RAG bridge** — the coaching chat doesn't currently retrieve lesson content. The fix:

1. Extend pgvector embeddings to cover all 380+ MDX lessons (chunked by section/heading)
2. On user query, retrieve top-k relevant lesson sections
3. Inject retrieved content into coaching chat system prompt
4. Add Socratic constraints: "Guide the user through this exercise rather than explaining the answer"
5. Distress classifier gates every message before RAG processing (safety first)

---

## 3. Mental Health Specific AI

### 3.1 Crisis Detection and Safety Models

#### Our Current System (DistilBERT)
- Three-tier classification: None / Mild / Crisis
- Zero-knowledge architecture (HIPAA compliant)
- CPU inference with 3-second timeout
- Operational and deployed

#### Available Enhancement Models

| Model | Purpose | Source | Notes |
|-------|---------|--------|-------|
| **sentinet/suicidality** | Suicidal ideation detection | [HuggingFace](https://huggingface.co/sentinet/suicidality) | Specialized single-task model |
| **ClinicalBERT** | Clinical text classification/sentiment | HuggingFace | Pre-trained on clinical notes + EHR data |
| **RoBERTa (mental health)** | Multi-category classification | Various fine-tuned versions | Anxiety, Bipolar, Depression, Normal, Personality Disorder, Stress, Suicidal — up to 99.6% accuracy |
| **MentalBERT** | Mental health NLP | [Specialized BERT variant](https://huggingface.co/mental) | Pre-trained on Reddit mental health communities |

#### Recommended Enhancement
Add **ClinicalBERT as a second-pass classifier** after our existing DistilBERT:
- DistilBERT handles binary safety gating (fast, CPU, fail-safe)
- ClinicalBERT provides granular categorization for clinical insight (GPU for training, CPU for inference)
- Provider sees "increasing anxiety markers" not just "distress detected"

### 3.2 Therapeutic Chatbot Architecture Patterns

#### Woebot (Gold Standard for Clinical Safety)
- **Architecture:** Rules-based conversational tree + NLP for intent classification
- **Key design:** LLMs classify user input → route to human-written therapeutic responses. **Everything Woebot says is human-authored.**
- **NLP role:** Understanding only, never generation. This eliminates hallucination risk.
- **Validation:** Multiple RCTs demonstrating clinical efficacy
- **Lesson for us:** Consider a hybrid where high-stakes responses (crisis, clinical advice) are human-authored templates, and coaching/educational responses use LLM generation with RAG

#### Tiered Human-AI Healing Model
- **Reference:** [MDPI Healthcare, 2025](https://www.mdpi.com/2227-9032/14/6/820)
- **Three tiers:**
  1. AI-led for mild distress (our coaching chat)
  2. AI + human collaboration for moderate (coaching chat + provider alerts)
  3. Human-led with AI assist for severe (provider-driven with AI prep)
- **Our alignment:** We already have this architecture — coaching chat (Tier 1), distress alerts (Tier 2), provider portal (Tier 3). Document this explicitly for Nebius.

### 3.3 Regulatory Context (2026)

| Regulation | Status | Our Position |
|-----------|--------|-------------|
| NY/CA AI companion self-harm detection mandates | Active | DistilBERT classifier satisfies this |
| FDA Breakthrough Device (Wysa precedent, 2025) | Sets market expectation | Our classifier + provider coordination exceeds Wysa's scope |
| HIPAA for AI in mental health | Ongoing guidance | Zero-knowledge architecture is compliant by design |
| EU AI Act (mental health = high-risk) | Active | Anonymous-by-design architecture simplifies compliance |

---

## 4. Learning Analytics ML

### 4.1 Disengagement Detection

#### SHAP-Based Explainable ML
- **Reference:** [arxiv, 2025](https://arxiv.org/html/2507.02681)
- **What it does:** Detects disengagement from quizzes using response timing, answer patterns, session behavior
- **Features:** Response time variance, answer switching patterns, sequential answer selection, rapid completion
- **Output:** Risk classification (high/medium/low) with SHAP explanations (which features drove the classification)
- **Our readiness:** HIGH — we log quiz responses; adding timing data is minimal backend change

#### 1D-CNN Outcome Prediction
- **Reference:** [Nature Scientific Reports, 2025](https://www.nature.com/articles/s41598-025-00256-3)
- **What it does:** Predicts student outcomes (Distinction/Pass/Fail/Withdrawn) from sparse early behavioral data
- **Key finding:** Accurate predictions possible even from first 2 weeks of interaction data
- **Relevance:** Early intervention — flag at-risk patients before they disengage

### 4.2 Dropout / Churn Prediction

#### Standard Approaches (Proven)
- **Models:** Random Forest, XGBoost, or gradient-boosted trees
- **Features:** Login frequency, time-on-task, quiz attempts, content completion rates, session gaps, assessment score trajectories
- **Reference:** [Nature, 2026](https://www.nature.com/articles/s41598-026-44919-1)
- **Our readiness:** HIGH — all features available in existing Postgres tables
- **Business impact:** Critical for practice licensing revenue. Disengaged patient = lost subscription = practice questions platform value.

### 4.3 Content Recommendation

| Approach | How It Works | Cold Start? | Our Use |
|----------|-------------|-------------|---------|
| **Collaborative filtering** | "Users like you benefited from Course B" | No (needs data) | Phase 3+ |
| **Content-based filtering** | "This lesson matches your assessment profile" | Yes (metadata only) | Phase 2 (can start immediately) |
| **Hybrid DeepFM-SVD++** | Deep learning + factorization | No | Phase 4+ (scale) |

**Recommendation:** Start with content-based filtering (tag lessons by clinical domain, match to assessment profiles). Add collaborative filtering once we have 1,000+ users with completion data.

---

## 5. RAG Architecture Best Practices

### 5.1 Recommended Stack (Aligned to Our Infrastructure)

```
Next.js 16 (frontend)
    ↓
Vercel AI SDK (streaming)
    ↓
RAG Pipeline:
    1. Embed user query → text-embedding-3-small (1536 dims)
    2. Vector search → pgvector (HNSW index) in existing Postgres
    3. Retrieve top-k chunks with metadata
    4. Assemble prompt: system instructions + retrieved content + user query
    5. Generate response → Claude/GPT with Socratic constraints
    6. Stream to frontend
```

### 5.2 Chunking Strategy for MDX Lessons

**Bad:** Arbitrary token-count chunks (breaks mid-sentence, loses context)  
**Good:** Semantic chunking by heading/section boundaries in MDX

```
Lesson: "Understanding Cognitive Distortions"
├── Chunk 1: Introduction (what are cognitive distortions)
├── Chunk 2: Common distortion types (all-or-nothing, catastrophizing, etc.)
├── Chunk 3: Interactive exercise (thought record walkthrough)
├── Chunk 4: Quiz content + correct answers + explanations
└── Chunk 5: Summary + further reading
```

Each chunk includes metadata: `course_id`, `lesson_id`, `section_type`, `clinical_domain`, `difficulty_level`

### 5.3 pgvector vs. Current JSONB Approach

| Property | Current (JSONB) | pgvector |
|----------|----------------|----------|
| Storage | JSONB float arrays | Native vector type |
| Search | JavaScript cosine similarity | SQL `<=>` operator |
| Indexing | None (full scan) | HNSW or IVFFlat |
| Scale limit | ~5,000 embeddings | Millions |
| Query speed | O(n) linear scan | O(log n) approximate |
| Migration effort | — | Add extension + alter column |

**Recommendation:** Migrate to pgvector. No new database needed — it's a Postgres extension. The migration is: `CREATE EXTENSION vector;` + alter the `content_embedding` table + rebuild indexes.

### 5.4 Key References

- [Vercel AI SDK + LangChain integration](https://vercel.com/kb/guide/nextjs-langchain-vercel-ai)
- [Next.js + pgvector RAG reference implementation](https://github.com/HamedMP/NextRag)
- [Postgres + TypeScript RAG stack](https://blogs.perficient.com/2025/07/17/postgres-typescript-rag-stack/)

---

## 6. Competitive Landscape

### 6.1 Mental Health AI Platforms

| Platform | Architecture | Strengths | Weaknesses vs. Us |
|----------|-------------|-----------|-------------------|
| **Woebot** | Rules-based + NLP classification | Stanford-validated CBT, human-authored responses, RCT evidence | No educational depth, no courses, no provider portal, no practice licensing, consumer-only |
| **Wysa** | CBT + DBT + meditation, evidence-based | FDA Breakthrough Device (2025), broad therapeutic modalities | Consumer chatbot only, no structured education, no provider coordination, no B2B model |
| **Elomia** | AI therapist, anonymous chat | Low barrier to entry, anonymous | Limited clinical validation, no education component, no provider integration |
| **Therabot** | LLM-based therapeutic chatbot | 51% depression symptom decrease in 8-week study | Research prototype, no platform, no courses, no licensing model |
| **Flourish** | AI mental wellness companion | Newer entrant (2026), fresh design | Unproven, limited feature set |

### 6.2 Educational AI Platforms

| Platform | Architecture | Strengths | Weaknesses vs. Us |
|----------|-------------|-----------|-------------------|
| **Khanmigo** | GPT-4 + RAG, Socratic tutoring | 700K+ users, Microsoft partnership, free for teachers | No healthcare focus, no HIPAA, no clinical safety, no assessments |
| **HealthStream** | AI-powered healthcare LMS | #1 healthcare learning (G2 2025), compliance focus | Generic LMS, no clinical AI safety, no therapeutic content, no patient-provider bridge |
| **MapleLMS** | AI LMS for regulated industries | CME/CNE workflows, credential tracking | No mental health specialization, no crisis detection, no community features |
| **Docebo** | AI learning platform (LMS + LXP) | White-label, enterprise scale | Generic, no clinical domain, no safety systems |

### 6.3 Our Unique Position

**No existing platform combines all of these:**

| Capability | Woebot | Wysa | Khanmigo | HealthStream | **Us** |
|-----------|--------|------|----------|-------------|--------|
| Evidence-based clinical education (380+ lessons) | — | — | — | Generic | **Yes** |
| Real-time crisis detection (ML) | Partial | Yes | — | — | **Yes** |
| Therapeutic AI coaching | Yes | Yes | — | — | **Yes** |
| Provider coordination + portal | — | — | — | — | **Yes** |
| Standardized assessments (PHQ-9, GAD-7) | — | Yes | — | — | **Yes** |
| Practice licensing (B2B2C) | — | — | — | Partial | **Yes** |
| HIPAA-compliant architecture | — | — | — | Yes | **Yes** |
| Optimization/performance education | — | Partial | — | — | **Yes** |
| Community forum with AI moderation | — | — | — | — | **Yes** |
| Adaptive learning (planned) | — | — | Yes | — | **Planned** |
| Voice interaction | — | — | — | — | **Yes** |
| RAG over clinical content | — | — | Yes | — | **Yes** |

---

## 7. Fine-Tuning vs. RAG vs. Prompt Engineering — Decision Framework

### When to Use What (Specific to Our Platform)

| Technique | Best For | Our Use Cases | Effort | GPU Need |
|-----------|---------|--------------|--------|----------|
| **Prompt Engineering** | Interaction style, exercise structure | Socratic tutoring prompts, CBT thought record guidance, guided breathing exercises, crisis responses | Hours | None |
| **RAG** | Domain-specific knowledge retrieval | Course content Q&A, lesson-specific tutoring, provider knowledge base, session prep | Days–weeks | Embedding generation |
| **Fine-tuning** | Specialized classification tasks | Distress detection (done), engagement scoring, sentiment analysis, clinical categorization | Weeks–months | Training compute |

### Decision Tree

```
Is the task about WHAT the AI knows?
  → RAG (retrieve your content, don't train it in)

Is the task about HOW the AI behaves?
  → Prompt engineering (system prompts, constraints)

Is the task about CLASSIFYING user input?
  → Fine-tuning (small, fast, specialized models)

Is the task about GENERATING clinical content?
  → RAG + prompt engineering (never fine-tune for clinical generation — hallucination risk)
```

### The Khanmigo Lesson

Khan Academy specifically chose RAG over fine-tuning because:
1. Fine-tuned models produced hallucinated content that looked authoritative
2. RAG ensures every response is grounded in human-authored course material
3. Content updates don't require model retraining — just re-embed the new content
4. System prompts control interaction style without touching model weights

**Our implication:** Fine-tune classifiers (distress, engagement, sentiment). Use RAG + prompts for everything user-facing. Never fine-tune a generative model on clinical content.

---

## 8. Research Papers & Resources Index

### Adaptive Learning
- Piech et al., "Deep Knowledge Tracing" — [Stanford, 2015](https://stanford.edu/~cpiech/bio/papers/deepKnowledgeTracing.pdf)
- "RL-DKT: Real-time Learning Path Optimization" — [Nature Scientific Reports, 2025](https://www.nature.com/articles/s41598-025-23900-4)
- FSRS — [GitHub](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler)
- pyBKT — [GitHub](https://github.com/CAHLR/pyBKT)

### Socratic AI Tutoring
- SocraticAI — [arxiv:2512.03501](https://arxiv.org/abs/2512.03501)
- KELE Multi-Agent — [ACL 2025](https://aclanthology.org/2025.findings-emnlp.888.pdf)
- SocratiQ — [arxiv:2502.00341](https://arxiv.org/html/2502.00341v1)
- Khanmigo Architecture — [Khan Academy Blog](https://blog.khanacademy.org/how-we-built-ai-tutoring-tools/)

### Clinical AI Safety
- Transformer Sentiment in Psychotherapy — [Frontiers Digital Health, 2026](https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2026.1792536/full)
- Woebot Technology Overview — [woebothealth.com](https://woebothealth.com/technology-overview/)
- Tiered Human-AI Healing — [MDPI Healthcare, 2025](https://www.mdpi.com/2227-9032/14/6/820)
- sentinet/suicidality — [HuggingFace](https://huggingface.co/sentinet/suicidality)

### Learning Analytics
- SHAP Disengagement Detection — [arxiv, 2025](https://arxiv.org/html/2507.02681)
- 1D-CNN Student Outcome Prediction — [Nature, 2025](https://www.nature.com/articles/s41598-025-00256-3)
- ML for Student Outcomes — [Nature, 2025](https://www.nature.com/articles/s41598-025-23409-w)
- AI-Based Dropout Forecasting — [Nature, 2026](https://www.nature.com/articles/s41598-026-44919-1)

### RAG Architecture
- Next.js + pgvector Reference — [GitHub](https://github.com/HamedMP/NextRag)
- Postgres RAG Stack — [Perficient, 2025](https://blogs.perficient.com/2025/07/17/postgres-typescript-rag-stack/)
- RAG vs Fine-tuning vs Prompt Engineering — [IBM Think](https://www.ibm.com/think/topics/rag-vs-fine-tuning-vs-prompt-engineering)

### Market Intelligence
- AI Mental Health Chatbot Evolution — [PMC Systematic Review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12434366/)
- Hybrid DeepFM-SVD++ for Education — [Nature, 2025](https://www.nature.com/articles/s41598-025-97407-3)
