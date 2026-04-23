# Plan: Generate Training Data for Maia Classifiers

## Context

The Maia service has 3 classifiers that need better training data before `kaggle_train_all.py` is worth running:

1. **Forum Topic** — Currently uses keyword-heuristic-labeled HuggingFace data. A real labeled dataset exists on Kaggle/HuggingFace with ~50k examples.
2. **Content Quality** — Only 15 synthetic examples per class (75 total). Needs 500+ per class.
3. **Content Atomization** — Only 5-8 synthetic examples per class (34 total). Needs 500+ per class.

For #2 and #3, no public dataset exists. The platform's own 317 lesson files (277 .md, 40 .mdx) are the natural training corpus — we extract paragraphs and use an LLM to label them.

## What We're Building

A single script: `services/maia/training/generate_training_data.py`

It does three things:
1. **Extracts paragraphs** from all 317 lesson files in `server/data/content/`
2. **Labels each paragraph** via OpenRouter API (OpenAI-compatible) for both content-quality and content-atomization
3. **Saves labeled datasets** as JSON to `services/maia/training/datasets/`

Then updates `kaggle_train_all.py` to:
1. Load the **Kaggle Sentiment Analysis for Mental Health** dataset (50k, 7 classes) for forum-topic instead of the keyword-heuristic approach
2. Load the generated JSON datasets for content-quality and content-atomization instead of inline synthetic examples

## Implementation Steps

### Step 1: Create `generate_training_data.py`

**File:** `services/maia/training/generate_training_data.py`

Key design:
- Reuse `extract_sections()` from `train_content_atomization.py` for MDX parsing (already handles frontmatter stripping, component removal, section splitting)
- Use `openai` Python package pointed at `https://openrouter.ai/api/v1` with `OPENROUTER_API_KEY` from `.env.local`
- Batch paragraphs (10 at a time) into a single LLM call to minimize API cost/time
- Use GPT-4o-mini via OpenRouter (fast, cheap, good enough for labeling)
- Two prompts: one for content-quality labels, one for content-atomization labels
- Output: `datasets/content_quality.json` and `datasets/content_atomization.json`
- Include progress logging, resume capability (skip already-labeled paragraphs), and a `--dry-run` flag

**Prompt design for content-quality:**
- Few-shot with 3 examples per class (from existing synthetic data)
- Input: paragraph text
- Output: JSON with `label` and `confidence` (0-1)
- Labels: clinically-appropriate, needs-revision, potentially-harmful, overly-clinical, missing-validation

**Prompt design for content-atomization:**
- Few-shot with 2 examples per class
- Input: paragraph text  
- Output: JSON with `label` and `confidence`
- Labels: standalone-blog-excerpt, email-teaser, social-snippet, needs-full-context, not-extractable

**Batching strategy:**
- Send 10 paragraphs per API call
- Request JSON array response
- ~300+ paragraphs per lesson × 317 lessons = thousands of paragraphs (more than enough)
- Filter to confidence > 0.7 for training data quality

### Step 2: Update `kaggle_train_all.py` — Forum Topic

Replace `prepare_forum_topic_data()` to use the Kaggle dataset:
- `load_dataset("suchintikasarkar/sentiment-analysis-for-mental-health")` from HuggingFace (mirrors the Kaggle dataset)
- Map its 7 labels → our 8 labels (add "optimization" from keyword heuristic for non-clinical content)
- ~50k real labeled examples instead of keyword-heuristic-labeled data

### Step 3: Update `kaggle_train_all.py` — Content Quality & Atomization

Replace `prepare_quality_data()` and `prepare_atomization_data()` to:
- Load from `datasets/content_quality.json` and `datasets/content_atomization.json`
- Fall back to existing inline synthetic examples if JSON files don't exist (backwards compat)
- Standard 70/15/15 train/val/test split

## Files Modified

| File | Change |
|------|--------|
| `services/maia/training/generate_training_data.py` | **NEW** — LLM labeling script |
| `services/maia/training/kaggle_train_all.py` | Update all 3 `prepare_*_data()` functions |
| `services/maia/requirements.txt` | Add `python-dotenv` if not present |

## Verification

1. Run `generate_training_data.py --dry-run` to verify paragraph extraction works (no API calls)
2. Run `generate_training_data.py` to generate datasets (requires OPENROUTER_API_KEY)
3. Verify output JSON files have 500+ examples per class
4. Upload updated `kaggle_train_all.py` to Kaggle notebook with the generated JSON datasets
5. Train all 3 models and check F1 scores improve over current baselines