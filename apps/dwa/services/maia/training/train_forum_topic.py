"""
Train Forum Topic Classifier
=============================
Classifies mental health forum posts into topic + routing categories.

Data source: HuggingFace datasets from Reddit mental health communities.
Uses go_emotions + concatenated mental health subreddit data.

Topic labels (8): anxiety, depression, relationships, medication,
    coping-strategies, crisis, general-wellness, optimization

The model learns to classify topic directly. Routing (needs-provider vs
community-handles vs informational) is derived from topic at inference time
(see classifiers/forum_topic.py).

Usage:
    cd services/maia
    python -m training.train_forum_topic

Output:
    models/forum-topic/  — fine-tuned model + metrics.json
"""

import random
from datasets import Dataset, load_dataset, concatenate_datasets

from .base_trainer import BaseTrainer


TOPIC_LABELS = [
    "anxiety",
    "depression",
    "relationships",
    "medication",
    "coping-strategies",
    "crisis",
    "general-wellness",
    "optimization",
]

ID2LABEL = {i: label for i, label in enumerate(TOPIC_LABELS)}
LABEL2ID = {label: i for i, label in enumerate(TOPIC_LABELS)}

# Map source dataset labels/subreddits to our topic labels
# Using counseling_and_mental_health dataset (Reddit-based, open)
KEYWORD_TOPIC_MAP = {
    # Crisis indicators (check first — highest priority)
    "suicide": "crisis",
    "suicidal": "crisis",
    "self-harm": "crisis",
    "kill myself": "crisis",
    "want to die": "crisis",
    "end it": "crisis",
    # Medication
    "medication": "medication",
    "prescription": "medication",
    "dosage": "medication",
    "ssri": "medication",
    "antidepressant": "medication",
    "psychiatrist": "medication",
    "side effect": "medication",
    # Anxiety
    "anxiety": "anxiety",
    "panic": "anxiety",
    "anxious": "anxiety",
    "worry": "anxiety",
    "phobia": "anxiety",
    "social anxiety": "anxiety",
    # Depression
    "depression": "depression",
    "depressed": "depression",
    "hopeless": "depression",
    "worthless": "depression",
    "empty": "depression",
    # Relationships
    "relationship": "relationships",
    "partner": "relationships",
    "boyfriend": "relationships",
    "girlfriend": "relationships",
    "marriage": "relationships",
    "family": "relationships",
    "friend": "relationships",
    "lonely": "relationships",
    # Coping strategies
    "coping": "coping-strategies",
    "therapy": "coping-strategies",
    "meditation": "coping-strategies",
    "exercise": "coping-strategies",
    "journal": "coping-strategies",
    "mindfulness": "coping-strategies",
    "breathing": "coping-strategies",
    "self-care": "coping-strategies",
    # Optimization
    "productivity": "optimization",
    "performance": "optimization",
    "motivation": "optimization",
    "goals": "optimization",
    "habits": "optimization",
    "biohack": "optimization",
    "optimize": "optimization",
    "resilience": "optimization",
}

# Samples per topic for balanced training
SAMPLES_PER_TOPIC = 3000
VAL_SAMPLES = 500
TEST_SAMPLES = 500


def classify_text_by_keywords(text: str) -> str | None:
    """Assign a topic label based on keyword matching. Returns None if ambiguous."""
    text_lower = text.lower()

    # Check crisis first (highest priority)
    for keyword in ["suicide", "suicidal", "self-harm", "kill myself", "want to die", "end it"]:
        if keyword in text_lower:
            return "crisis"

    # Score each topic
    scores: dict[str, int] = {}
    for keyword, topic in KEYWORD_TOPIC_MAP.items():
        if topic == "crisis":
            continue  # Already handled above
        if keyword in text_lower:
            scores[topic] = scores.get(topic, 0) + 1

    if not scores:
        return None  # No clear topic

    # Return the highest-scoring topic
    return max(scores, key=scores.get)


class ForumTopicTrainer(BaseTrainer):
    name = "forum-topic"
    num_labels = len(TOPIC_LABELS)
    id2label = ID2LABEL
    label2id = LABEL2ID
    output_subdir = "forum-topic"
    epochs = 3
    batch_size = 32

    def load_datasets(self):
        print("Loading source datasets for topic classification...")

        # Use multiple public datasets and label by keyword matching
        # 1. Depression detection dataset (already have — reuse for depression + crisis)
        print("  Loading depression detection dataset...")
        depression_ds = load_dataset("thePixel42/depression-detection", split="train")
        depression_ds = depression_ds.shuffle(seed=42)

        # 2. go_emotions for general emotional content
        print("  Loading go_emotions dataset...")
        try:
            emotions_ds = load_dataset("google-research-datasets/go_emotions", "simplified", split="train")
            emotions_ds = emotions_ds.shuffle(seed=42)
        except Exception as e:
            print(f"  Warning: Could not load go_emotions: {e}")
            emotions_ds = None

        # Build labeled examples by keyword matching
        all_examples: dict[str, list[str]] = {label: [] for label in TOPIC_LABELS}

        # Process depression dataset
        print("  Labeling depression dataset by keywords...")
        for example in depression_ds:
            text = example.get("text", "")
            if len(text) < 20:
                continue

            if example.get("label", 0) == 1:  # Labeled as depression
                topic = classify_text_by_keywords(text)
                if topic:
                    all_examples[topic].append(text)
                else:
                    all_examples["depression"].append(text)
            else:
                topic = classify_text_by_keywords(text)
                if topic:
                    all_examples[topic].append(text)
                else:
                    all_examples["general-wellness"].append(text)

            # Stop if we have enough for all topics
            if all(len(v) >= SAMPLES_PER_TOPIC + VAL_SAMPLES + TEST_SAMPLES for v in all_examples.values()):
                break

        # Process go_emotions if available
        if emotions_ds:
            print("  Labeling go_emotions by keywords...")
            for example in emotions_ds:
                text = example.get("text", "")
                if len(text) < 20:
                    continue
                topic = classify_text_by_keywords(text)
                if topic and len(all_examples[topic]) < SAMPLES_PER_TOPIC + VAL_SAMPLES + TEST_SAMPLES:
                    all_examples[topic].append(text)

        # Report distribution
        print("  Examples per topic:")
        for topic, texts in all_examples.items():
            print(f"    {topic}: {len(texts)}")

        # Build balanced dataset
        train_texts, train_labels = [], []
        val_texts, val_labels = [], []
        test_texts, test_labels = [], []

        for topic, texts in all_examples.items():
            random.seed(42)
            random.shuffle(texts)
            label_id = LABEL2ID[topic]

            n_available = len(texts)
            if n_available < 10:
                print(f"  Skipping '{topic}' — only {n_available} examples")
                continue
            n_test = min(TEST_SAMPLES, max(1, n_available // 10))
            n_val = min(VAL_SAMPLES, max(1, n_available // 10))
            n_train = min(SAMPLES_PER_TOPIC, n_available - n_val - n_test)

            if n_train < 100:
                print(f"  Warning: Only {n_train} training examples for '{topic}'")

            train_texts.extend(texts[:n_train])
            train_labels.extend([label_id] * n_train)

            val_texts.extend(texts[n_train:n_train + n_val])
            val_labels.extend([label_id] * n_val)

            test_texts.extend(texts[n_train + n_val:n_train + n_val + n_test])
            test_labels.extend([label_id] * n_test)

        train_ds = Dataset.from_dict({"text": train_texts, "label": train_labels})
        val_ds = Dataset.from_dict({"text": val_texts, "label": val_labels})
        test_ds = Dataset.from_dict({"text": test_texts, "label": test_labels})

        # Shuffle
        train_ds = train_ds.shuffle(seed=42)
        val_ds = val_ds.shuffle(seed=42)

        return train_ds, val_ds, test_ds


if __name__ == "__main__":
    trainer = ForumTopicTrainer()
    trainer.train()
