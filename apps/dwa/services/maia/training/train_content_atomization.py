"""
Train Content Atomization Classifier
======================================
Tags lesson text sections for marketing content extraction.

Data strategy:
  Loads the platform's own MDX lesson files, splits them into sections,
  and applies heuristic labels based on section characteristics.
  Heuristics are then manually reviewed and corrected.

Labels (5):
  0: standalone-blog-excerpt  — Self-contained narrative (150-500 words, has intro/conclusion)
  1: email-teaser             — Hook or key insight (50-150 words, engaging opener)
  2: social-snippet           — Short, punchy, shareable (under 50 words, quotable)
  3: needs-full-context       — References other sections, exercises, or lesson structure
  4: not-extractable          — Tables, code blocks, interactive elements, metadata

Usage:
    cd services/maia
    python -m training.train_content_atomization

Output:
    models/content-atomization/  — fine-tuned model + metrics.json
"""

import re
import random
from pathlib import Path
from datasets import Dataset

from .base_trainer import BaseTrainer


ATOMIZATION_LABELS = [
    "standalone-blog-excerpt",
    "email-teaser",
    "social-snippet",
    "needs-full-context",
    "not-extractable",
]

ID2LABEL = {i: label for i, label in enumerate(ATOMIZATION_LABELS)}
LABEL2ID = {label: i for i, label in enumerate(ATOMIZATION_LABELS)}

# Path to lesson content (relative to services/maia/)
CONTENT_ROOT = Path("../../server/data/content")

# Patterns that indicate non-extractable content
NOT_EXTRACTABLE_PATTERNS = [
    r"<\w+",                    # JSX/React components
    r"\|.*\|.*\|",              # Markdown tables
    r"```",                     # Code blocks
    r"import\s",                # Import statements
    r"export\s",                # Export statements
    r"frontmatter",             # MDX metadata
    r"---",                     # YAML frontmatter delimiters
    r"^\s*-\s.*\n\s*-\s",      # Long bullet lists (3+)
]

# Patterns that indicate context-dependent content
CONTEXT_PATTERNS = [
    r"(as we (discussed|mentioned|saw|explored))",
    r"(in the (previous|next|following) (section|lesson|module))",
    r"(refer to|see also|as shown (above|below))",
    r"(step \d|exercise \d|activity \d)",
    r"(your (worksheet|thought record|tracking log))",
    r"(let's (try|practice|do) (this|the following))",
    r"(complete the following)",
]


def extract_sections(mdx_path: Path) -> list[str]:
    """Split an MDX file into meaningful text sections."""
    try:
        content = mdx_path.read_text(encoding="utf-8")
    except Exception:
        return []

    # Remove frontmatter
    if content.startswith("---"):
        end = content.find("---", 3)
        if end > 0:
            content = content[end + 3:]

    # Remove import/export statements
    content = re.sub(r"^(import|export)\s+.*$", "", content, flags=re.MULTILINE)

    # Split by headers and double newlines
    sections = re.split(r"\n#{1,3}\s+[^\n]+\n|\n\n\n+", content)

    # Clean and filter
    cleaned = []
    for section in sections:
        text = section.strip()
        if len(text) < 30:  # Too short to be useful
            continue
        # Remove JSX components but keep the text
        text = re.sub(r"<[^>]+>", "", text)
        text = text.strip()
        if len(text) >= 30:
            cleaned.append(text)

    return cleaned


def heuristic_label(text: str) -> str:
    """Apply heuristic labeling based on text characteristics."""
    word_count = len(text.split())

    # Check for non-extractable patterns first
    for pattern in NOT_EXTRACTABLE_PATTERNS:
        if re.search(pattern, text, re.MULTILINE):
            return "not-extractable"

    # Check for context-dependent patterns
    for pattern in CONTEXT_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return "needs-full-context"

    # Length-based heuristics
    if word_count <= 40:
        # Short, check if it's quotable/punchy
        if any(indicator in text.lower() for indicator in [
            "research shows", "studies suggest", "the key is",
            "remember:", "important:", "tip:", "fact:",
        ]):
            return "social-snippet"
        # If it's too list-like or fragmented, it needs context
        if text.count("\n") > 2 or text.startswith("-"):
            return "needs-full-context"
        return "social-snippet"

    elif word_count <= 120:
        # Medium length — could be an email teaser
        # Check for engaging openers
        if any(text.lower().startswith(opener) for opener in [
            "have you ever", "did you know", "imagine",
            "what if", "most people", "one of the most",
            "research has", "studies show", "according to",
        ]):
            return "email-teaser"
        # If it has a clear point/insight, it's a teaser
        if "." in text and word_count >= 50:
            return "email-teaser"
        return "needs-full-context"

    elif word_count <= 400:
        # Longer — check for standalone narrative quality
        sentences = text.count(". ") + text.count(".\n") + 1
        if sentences >= 3 and not any(
            re.search(p, text, re.IGNORECASE) for p in CONTEXT_PATTERNS
        ):
            return "standalone-blog-excerpt"
        return "needs-full-context"

    else:
        # Very long sections usually need context or are full lessons
        return "needs-full-context"


def build_dataset_from_lessons() -> Dataset:
    """Extract and label sections from all MDX lesson files."""
    texts, labels = [], []

    if not CONTENT_ROOT.exists():
        print(f"  Warning: Content root not found at {CONTENT_ROOT}")
        print("  Building from synthetic examples instead...")
        return build_synthetic_dataset()

    mdx_files = list(CONTENT_ROOT.rglob("*.md")) + list(CONTENT_ROOT.rglob("*.mdx"))
    print(f"  Found {len(mdx_files)} lesson files")

    for mdx_path in mdx_files:
        sections = extract_sections(mdx_path)
        for section in sections:
            label = heuristic_label(section)
            label_id = LABEL2ID[label]
            texts.append(section)
            labels.append(label_id)

    if len(texts) < 100:
        print(f"  Only {len(texts)} sections extracted — supplementing with synthetic data")
        synth = build_synthetic_dataset()
        texts.extend(synth["text"])
        labels.extend(synth["label"])

    return Dataset.from_dict({"text": texts, "label": labels})


def build_synthetic_dataset() -> Dataset:
    """Fallback synthetic examples for each atomization category."""
    examples = {
        "standalone-blog-excerpt": [
            "Sleep is one of the most underrated tools for mental health recovery. Research from the National Sleep Foundation shows that adults who consistently get 7-9 hours of sleep report significantly lower levels of anxiety and depression. The connection between sleep and emotional regulation is well-established: during deep sleep, your brain processes emotional experiences and consolidates coping strategies learned during the day. When sleep is disrupted, this processing is interrupted, leading to heightened emotional reactivity the following day. The good news is that sleep hygiene improvements often show results within two to three weeks of consistent practice.",
            "The relationship between physical movement and mood is one of the most robust findings in mental health research. Exercise triggers the release of endorphins, serotonin, and brain-derived neurotrophic factor, all of which play crucial roles in mood regulation. You don't need to run marathons to benefit. Studies consistently show that even 20 minutes of moderate walking can reduce anxiety symptoms by up to 20 percent. The key is consistency rather than intensity. Finding a form of movement you genuinely enjoy makes it far more likely you'll maintain the habit long-term.",
            "Social connection is a fundamental human need, not a luxury. Research by Dr. Julianne Holt-Lunstad found that chronic social isolation carries health risks comparable to smoking 15 cigarettes per day. For people managing anxiety or depression, social withdrawal often feels protective but actually worsens symptoms over time. The solution isn't forcing yourself into large social gatherings. Start small: a text to a friend, a brief coffee meetup, or joining an online community focused on shared interests. Quality of connection matters far more than quantity.",
        ],
        "email-teaser": [
            "Did you know that the way you breathe directly affects your nervous system? Most people take 15-20 breaths per minute, but research shows that slowing to 6 breaths per minute activates your body's natural calming response. In this week's lesson, we explore three breathing techniques that can shift you from fight-or-flight to rest-and-digest in under two minutes.",
            "Have you ever noticed that your worst anxiety predictions rarely come true? Cognitive behavioral therapy calls this 'catastrophizing,' and it's one of the most common thinking patterns that keeps anxiety alive. This lesson introduces a simple three-step technique to catch catastrophic thoughts before they spiral.",
            "Most people think motivation comes before action, but research shows it's actually the other way around. Starting a task, even imperfectly, generates the motivation to continue. This lesson explores how to use the two-minute rule to break through procrastination and build momentum.",
        ],
        "social-snippet": [
            "Research shows that even 20 minutes of walking can reduce anxiety symptoms by up to 20 percent.",
            "Tip: The best time to practice a coping strategy is when you don't need one. Building the habit during calm moments makes it available during difficult ones.",
            "Studies suggest that writing about your emotions for just 15 minutes can reduce stress hormones and improve immune function.",
            "Remember: Recovery isn't linear. A setback doesn't erase your progress any more than a bad meal erases a month of healthy eating.",
            "Fact: Your brain can't distinguish between a vividly imagined scenario and reality. That's why visualization exercises actually work.",
        ],
        "needs-full-context": [
            "As we discussed in the previous section, identifying your triggers is the first step. Now let's build on that foundation by creating your personal coping plan.",
            "Complete the following exercise using your thought record from the worksheet above. Write down the situation, your automatic thought, and rate your belief in that thought from 0-100.",
            "In step 3 of this activity, you'll apply the grounding technique we practiced earlier to a real scenario from your trigger list.",
            "Let's try this together. Using the exposure hierarchy you created in the previous lesson, select the item rated 3 out of 10 on your anxiety scale.",
            "Refer to the mood tracking log you've been maintaining this week. Look for patterns in when your anxiety peaks and what preceded those moments.",
        ],
        "not-extractable": [
            "| Situation | Thought | Emotion | Intensity | Alternative | New Intensity |\n|-----------|---------|---------|-----------|------------|---------------|\n| Example | I'll fail | Anxiety | 80/100 | I've prepared well | 40/100 |",
            "```javascript\nconst breathingPattern = { inhale: 4, hold: 7, exhale: 8 };\n```",
            "<BreathingExercise pattern='4-7-8' duration={300} />",
            "<ThoughtRecord columns={['situation', 'thought', 'emotion', 'evidence-for', 'evidence-against', 'balanced-thought']} />",
            "import { ExposureHierarchy } from '@/components/exercises'",
        ],
    }

    texts, labels = [], []
    for label_name, example_list in examples.items():
        label_id = LABEL2ID[label_name]
        for text in example_list:
            texts.append(text)
            labels.append(label_id)

    return Dataset.from_dict({"text": texts, "label": labels})


class ContentAtomizationTrainer(BaseTrainer):
    name = "content-atomization"
    num_labels = len(ATOMIZATION_LABELS)
    id2label = ID2LABEL
    label2id = LABEL2ID
    output_subdir = "content-atomization"
    epochs = 5
    batch_size = 8
    learning_rate = 3e-5

    def load_datasets(self):
        print("Building content atomization dataset...")
        ds = build_dataset_from_lessons()
        ds = ds.shuffle(seed=42)

        # Report distribution
        label_counts = {}
        for label in ds["label"]:
            label_counts[ID2LABEL.get(label, label)] = label_counts.get(ID2LABEL.get(label, label), 0) + 1
        print(f"  Label distribution: {label_counts}")

        # 70/15/15 split
        n = len(ds)
        n_train = int(n * 0.70)
        n_val = int(n * 0.15)

        train_ds = ds.select(range(n_train))
        val_ds = ds.select(range(n_train, n_train + n_val))
        test_ds = ds.select(range(n_train + n_val, n))

        return train_ds, val_ds, test_ds


if __name__ == "__main__":
    trainer = ContentAtomizationTrainer()
    trainer.train()
