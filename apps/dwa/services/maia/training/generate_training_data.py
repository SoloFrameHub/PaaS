"""
Maia — Training Data Generator
================================
Extracts paragraphs from the platform's 317 lesson files and labels them
via OpenRouter (LLM) for two classifiers:

    1. Content Quality     — clinically-appropriate, needs-revision,
                             potentially-harmful, overly-clinical, missing-validation
    2. Content Atomization — standalone-blog-excerpt, email-teaser,
                             social-snippet, needs-full-context, not-extractable

Usage:
    cd services/maia

    # Dry run — extract paragraphs, no API calls
    python -m training.generate_training_data --dry-run

    # Generate both datasets
    python -m training.generate_training_data

    # Generate only one dataset
    python -m training.generate_training_data --task quality
    python -m training.generate_training_data --task atomization

    # Resume (skips batches already saved)
    python -m training.generate_training_data --resume

Requirements:
    pip install openai python-dotenv

Reads OPENROUTER_API_KEY from ../../.env.local (project root).
Output: training/datasets/content_quality.json, training/datasets/content_atomization.json
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    print("python-dotenv not installed. Run: pip install python-dotenv")
    sys.exit(1)

try:
    from openai import OpenAI
except ImportError:
    print("openai not installed. Run: pip install openai")
    sys.exit(1)


# ── Paths ────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR / ".." / ".." / ".."
CONTENT_ROOT = PROJECT_ROOT / "server" / "data" / "content"
DATASETS_DIR = SCRIPT_DIR / "datasets"

# ── LLM Config ───────────────────────────────────────────────────────────────

DEFAULT_MODEL = "openai/gpt-4o-mini"
BATCH_SIZE = 10  # paragraphs per API call
MIN_CONFIDENCE = 0.7  # discard labels below this threshold
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds


# ── Label Definitions ────────────────────────────────────────────────────────

QUALITY_LABELS = [
    "clinically-appropriate",
    "needs-revision",
    "potentially-harmful",
    "overly-clinical",
    "missing-validation",
]

ATOMIZATION_LABELS = [
    "standalone-blog-excerpt",
    "email-teaser",
    "social-snippet",
    "needs-full-context",
    "not-extractable",
]


# ── Paragraph Extraction (adapted from train_content_atomization.py) ─────────

def extract_paragraphs(file_path: Path) -> list[dict]:
    """Extract clean text paragraphs from a lesson .md/.mdx file.

    Returns list of dicts with 'text' and 'source' (file path + section index).
    """
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception:
        return []

    # Strip frontmatter
    if content.startswith("---"):
        end = content.find("---", 3)
        if end > 0:
            content = content[end + 3:]

    # Strip import/export statements
    content = re.sub(r"^(import|export)\s+.*$", "", content, flags=re.MULTILINE)

    # Split on headings and triple+ newlines
    sections = re.split(r"\n#{1,3}\s+[^\n]+\n|\n\n\n+", content)

    paragraphs = []
    rel_path = str(file_path.relative_to(CONTENT_ROOT))

    for i, section in enumerate(sections):
        text = section.strip()
        if len(text) < 40:
            continue

        # Remove JSX/MDX component tags but keep inner text
        text = re.sub(r"<[^>]+>", "", text)
        # Remove markdown image syntax
        text = re.sub(r"!\[.*?\]\(.*?\)", "", text)
        # Collapse multiple newlines to double
        text = re.sub(r"\n{3,}", "\n\n", text)
        text = text.strip()

        if len(text) < 40:
            continue

        # Skip sections that are mostly code/tables/lists
        lines = text.split("\n")
        code_like = sum(1 for l in lines if l.strip().startswith(("-", "|", "```", "import ", "export ")))
        if code_like > len(lines) * 0.6:
            continue

        paragraphs.append({
            "text": text,
            "source": f"{rel_path}:section-{i}",
            "word_count": len(text.split()),
        })

    return paragraphs


def extract_all_paragraphs() -> list[dict]:
    """Extract paragraphs from all lesson files."""
    all_files = sorted(
        list(CONTENT_ROOT.rglob("*.md")) + list(CONTENT_ROOT.rglob("*.mdx"))
    )
    print(f"Found {len(all_files)} lesson files in {CONTENT_ROOT}")

    all_paragraphs = []
    for f in all_files:
        paragraphs = extract_paragraphs(f)
        all_paragraphs.extend(paragraphs)

    print(f"Extracted {len(all_paragraphs)} paragraphs total")

    # Distribution by word count
    short = sum(1 for p in all_paragraphs if p["word_count"] <= 50)
    medium = sum(1 for p in all_paragraphs if 50 < p["word_count"] <= 150)
    long = sum(1 for p in all_paragraphs if p["word_count"] > 150)
    print(f"  Short (<=50 words): {short}")
    print(f"  Medium (51-150):    {medium}")
    print(f"  Long (>150):        {long}")

    return all_paragraphs


# ── LLM Labeling Prompts ────────────────────────────────────────────────────

QUALITY_SYSTEM_PROMPT = """You are an expert clinical content reviewer for a mental health education platform.

Your task: classify each text paragraph into exactly one content quality category.

LABELS:
- "clinically-appropriate": Validating, empathetic, evidence-based. Normalizes the reader's experience, cites research, offers hope without minimizing. Uses warm but professional tone.
- "needs-revision": Superficial, vague, or generic. Gives advice without depth ("try to relax"). Lacks specificity, evidence, or emotional nuance. Not harmful, just unhelpful.
- "potentially-harmful": Invalidating, blaming, dismissive. Implies weakness, uses toxic positivity, or minimizes real suffering. Would make a struggling reader feel worse.
- "overly-clinical": Too technical for a patient-facing audience. Dense jargon, academic references, no warmth. Reads like a textbook or journal article, not education.
- "missing-validation": Informative and accurate but jumps straight to techniques/instructions without first acknowledging the reader's experience. Technically correct, emotionally cold.

RULES:
- Return ONLY a JSON array. No markdown, no explanation.
- Each element: {"index": <int>, "label": "<label>", "confidence": <0.0-1.0>}
- The "index" corresponds to the paragraph's position in the input array (0-based).
- If unsure between two labels, pick the one you lean toward and lower the confidence."""

QUALITY_FEW_SHOT = """Example input paragraphs and correct labels:

[0] "It's completely normal to feel anxious in social situations. Many people experience this, and it doesn't mean something is wrong with you. Let's explore some strategies that research has shown to be helpful."
Label: clinically-appropriate (0.95) — Validates, normalizes, offers evidence-based hope.

[1] "Anxiety is bad. You should try to relax more and think positive thoughts."
Label: needs-revision (0.90) — Vague, oversimplified, no evidence or depth.

[2] "If you were stronger, you wouldn't be struggling with this. It's really a matter of willpower."
Label: potentially-harmful (0.95) — Blaming, invalidating, implies personal failure.

[3] "The hypothalamic-pituitary-adrenal axis mediates the neuroendocrine stress response through cortisol secretion, with chronic dysregulation associated with allostatic load and subsequent psychopathology."
Label: overly-clinical (0.92) — Dense jargon, no warmth, textbook register.

[4] "The 5-4-3-2-1 grounding technique works by identifying 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
Label: missing-validation (0.88) — Accurate technique, but no empathy or acknowledgment before the instructions."""

ATOMIZATION_SYSTEM_PROMPT = """You are a content strategist for a mental health education platform.

Your task: classify each text paragraph by its marketing extractability — whether it can stand alone outside the original lesson context.

LABELS:
- "standalone-blog-excerpt": Self-contained narrative (150-500 words). Has its own intro, makes a complete point, cites evidence. Could be published as a blog section with zero editing.
- "email-teaser": Hook or key insight (50-150 words). Engaging opener, poses a question or surprising fact. Would work as the opening of a marketing email to drive clicks.
- "social-snippet": Short, punchy, shareable (under 50 words). A quotable stat, tip, or insight. Works as a tweet, LinkedIn post, or Instagram caption.
- "needs-full-context": References other sections, exercises, worksheets, or lesson structure. Uses phrases like "as we discussed", "in the previous lesson", "complete the following". Cannot stand alone.
- "not-extractable": Tables, code blocks, component markup, raw data, metadata, bullet-only lists, or fragments that make no narrative sense outside the lesson.

RULES:
- Return ONLY a JSON array. No markdown, no explanation.
- Each element: {"index": <int>, "label": "<label>", "confidence": <0.0-1.0>}
- The "index" corresponds to the paragraph's position in the input array (0-based).
- Word count is a guideline, not a hard rule. A 60-word paragraph that reads like a tweet is still "social-snippet"."""

ATOMIZATION_FEW_SHOT = """Example input paragraphs and correct labels:

[0] "Sleep is one of the most underrated tools for mental health recovery. Research from the National Sleep Foundation shows that adults who consistently get 7-9 hours of sleep report significantly lower levels of anxiety and depression. The connection between sleep and emotional regulation is well-established: during deep sleep, your brain processes emotional experiences and consolidates coping strategies learned during the day."
Label: standalone-blog-excerpt (0.93) — Self-contained, cites research, makes a complete point.

[1] "Did you know that the way you breathe directly affects your nervous system? Most people take 15-20 breaths per minute, but research shows that slowing to 6 breaths per minute activates your body's natural calming response."
Label: email-teaser (0.90) — Engaging question, surprising fact, drives curiosity.

[2] "Research shows that even 20 minutes of walking can reduce anxiety symptoms by up to 20 percent."
Label: social-snippet (0.95) — Short, quotable stat, works as a standalone post.

[3] "As we discussed in the previous section, identifying your triggers is the first step. Now let's build on that foundation by creating your personal coping plan."
Label: needs-full-context (0.92) — References "previous section" and prior content.

[4] "| Situation | Thought | Emotion | Intensity |\n|-----------|---------|---------|-----------|"
Label: not-extractable (0.98) — Raw table markup, no narrative value."""


# ── LLM Client ──────────────────────────────────────────────────────────────

def create_client() -> OpenAI:
    """Create OpenRouter client from env."""
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        print("ERROR: OPENROUTER_API_KEY not set.")
        print("Set it in .env.local or export it directly.")
        sys.exit(1)

    return OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": "https://mental-health-education.soloframehub.com",
            "X-Title": "Maia Training Data Generator",
        },
    )


def label_batch(
    client: OpenAI,
    paragraphs: list[str],
    system_prompt: str,
    few_shot: str,
    model: str = DEFAULT_MODEL,
) -> list[dict] | None:
    """Send a batch of paragraphs to the LLM for labeling.

    Returns list of {"index": int, "label": str, "confidence": float} or None on failure.
    """
    # Format paragraphs as numbered list
    numbered = "\n\n".join(
        f"[{i}] \"{p}\"" for i, p in enumerate(paragraphs)
    )

    user_msg = f"Classify these {len(paragraphs)} paragraphs:\n\n{numbered}"

    for attempt in range(MAX_RETRIES):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt + "\n\n" + few_shot},
                    {"role": "user", "content": user_msg},
                ],
                temperature=0.1,
                max_tokens=1000,
            )

            content = response.choices[0].message.content.strip()

            # Strip markdown fences if present
            if content.startswith("```"):
                content = re.sub(r"^```(?:json)?\s*", "", content)
                content = re.sub(r"\s*```$", "", content)

            results = json.loads(content)

            if not isinstance(results, list):
                raise ValueError(f"Expected JSON array, got {type(results)}")

            return results

        except json.JSONDecodeError as e:
            print(f"    JSON parse error (attempt {attempt + 1}): {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
        except Exception as e:
            print(f"    API error (attempt {attempt + 1}): {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY * (attempt + 1))

    return None


# ── Dataset Generation ───────────────────────────────────────────────────────

def generate_dataset(
    client: OpenAI,
    paragraphs: list[dict],
    task: str,
    resume: bool = False,
    model: str = DEFAULT_MODEL,
) -> list[dict]:
    """Label all paragraphs for a given task (quality or atomization).

    Returns list of {"text": str, "label": str, "confidence": float, "source": str}.
    """
    if task == "quality":
        system_prompt = QUALITY_SYSTEM_PROMPT
        few_shot = QUALITY_FEW_SHOT
        valid_labels = set(QUALITY_LABELS)
        output_path = DATASETS_DIR / "content_quality.json"
    elif task == "atomization":
        system_prompt = ATOMIZATION_SYSTEM_PROMPT
        few_shot = ATOMIZATION_FEW_SHOT
        valid_labels = set(ATOMIZATION_LABELS)
        output_path = DATASETS_DIR / "content_atomization.json"
    else:
        raise ValueError(f"Unknown task: {task}")

    # Resume support: load existing results
    existing = []
    existing_sources = set()
    if resume and output_path.exists():
        existing = json.loads(output_path.read_text())
        existing_sources = {e["source"] for e in existing}
        print(f"  Resuming: {len(existing)} existing labels loaded")

    # Filter out already-labeled paragraphs
    remaining = [p for p in paragraphs if p["source"] not in existing_sources]
    print(f"  Labeling {len(remaining)} paragraphs for {task} ({len(paragraphs) - len(remaining)} already done)")

    results = list(existing)
    total_batches = (len(remaining) + BATCH_SIZE - 1) // BATCH_SIZE

    for batch_idx in range(0, len(remaining), BATCH_SIZE):
        batch = remaining[batch_idx:batch_idx + BATCH_SIZE]
        batch_num = batch_idx // BATCH_SIZE + 1
        texts = [p["text"] for p in batch]

        print(f"  Batch {batch_num}/{total_batches} ({len(texts)} paragraphs)...", end=" ", flush=True)

        labels = label_batch(client, texts, system_prompt, few_shot, model=model)

        if labels is None:
            print("FAILED (skipping)")
            continue

        batch_added = 0
        for item in labels:
            idx = item.get("index", -1)
            label = item.get("label", "")
            confidence = item.get("confidence", 0)

            if idx < 0 or idx >= len(batch):
                continue
            if label not in valid_labels:
                continue
            if confidence < MIN_CONFIDENCE:
                continue

            results.append({
                "text": batch[idx]["text"],
                "label": label,
                "confidence": confidence,
                "source": batch[idx]["source"],
            })
            batch_added += 1

        print(f"{batch_added}/{len(texts)} labeled")

        # Save progress after each batch
        DATASETS_DIR.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(results, indent=2))

        # Rate limiting — be kind to OpenRouter
        time.sleep(0.5)

    return results


def print_distribution(results: list[dict], label_set: list[str], task_name: str):
    """Print label distribution summary."""
    counts = {l: 0 for l in label_set}
    for r in results:
        label = r["label"]
        if label in counts:
            counts[label] += 1

    print(f"\n  {task_name} distribution ({len(results)} total):")
    for label, count in sorted(counts.items(), key=lambda x: -x[1]):
        pct = count / len(results) * 100 if results else 0
        bar = "#" * int(pct / 2)
        print(f"    {label:<30s} {count:>5d} ({pct:5.1f}%) {bar}")

    min_count = min(counts.values())
    if min_count < 100:
        print(f"\n  WARNING: '{min(counts, key=counts.get)}' has only {min_count} examples.")
        print(f"  Target is 500+ per class. You may need more lesson content or synthetic augmentation.")


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Generate Maia training data via LLM labeling")
    parser.add_argument("--dry-run", action="store_true",
                        help="Extract paragraphs only, no API calls")
    parser.add_argument("--task", choices=["quality", "atomization", "both"], default="both",
                        help="Which dataset to generate (default: both)")
    parser.add_argument("--resume", action="store_true",
                        help="Skip already-labeled paragraphs (resume interrupted run)")
    parser.add_argument("--model", default=DEFAULT_MODEL,
                        help=f"OpenRouter model ID (default: {DEFAULT_MODEL})")
    args = parser.parse_args()

    model_id = args.model

    print("=" * 60)
    print("Maia Training Data Generator")
    print("=" * 60)

    # Load env
    env_path = PROJECT_ROOT / ".env.local"
    if env_path.exists():
        load_dotenv(env_path)
        print(f"Loaded env from {env_path}")
    else:
        print(f"No .env.local found at {env_path} — using environment variables")

    # Extract paragraphs
    print(f"\nExtracting paragraphs from {CONTENT_ROOT}...")
    paragraphs = extract_all_paragraphs()

    if not paragraphs:
        print("ERROR: No paragraphs extracted. Check CONTENT_ROOT path.")
        sys.exit(1)

    if args.dry_run:
        print("\n[DRY RUN] Paragraph extraction complete. No API calls made.")
        print(f"\nSample paragraphs:")
        for p in paragraphs[:5]:
            preview = p["text"][:120].replace("\n", " ")
            print(f"  [{p['word_count']:>3d}w] {p['source']}")
            print(f"        {preview}...")
        print(f"\n  ... and {len(paragraphs) - 5} more")
        return

    # Create LLM client
    client = create_client()
    print(f"Using model: {model_id}")

    DATASETS_DIR.mkdir(parents=True, exist_ok=True)

    # Generate datasets
    tasks = ["quality", "atomization"] if args.task == "both" else [args.task]

    for task in tasks:
        print(f"\n{'=' * 60}")
        print(f"Generating {task} dataset")
        print(f"{'=' * 60}")

        results = generate_dataset(client, paragraphs, task, resume=args.resume, model=model_id)

        if task == "quality":
            print_distribution(results, QUALITY_LABELS, "Content Quality")
        else:
            print_distribution(results, ATOMIZATION_LABELS, "Content Atomization")

    print(f"\nDatasets saved to {DATASETS_DIR}/")
    print("Next: run kaggle_train_all.py to train models on this data.")


if __name__ == "__main__":
    main()
