"""
Maia — Unified Evaluation Script
=================================
Evaluates all loaded classifiers and generates metrics.json for each.

Usage:
    cd services/maia
    python evaluate.py                    # Evaluate all models
    python evaluate.py distress           # Evaluate specific model
    python evaluate.py forum-topic

Output:
    models/{name}/metrics.json for each evaluated model
"""

import sys
import json
from pathlib import Path

# Allow running from services/maia/ directory
sys.path.insert(0, str(Path(__file__).parent))

from classifiers import CLASSIFIER_CLASSES


def evaluate_classifier(name: str | None = None):
    """Evaluate one or all classifiers."""
    for cls in CLASSIFIER_CLASSES:
        clf = cls()
        if name and clf.name != name:
            continue

        print(f"\n{'='*60}")
        print(f"Evaluating: {clf.name}")
        print(f"{'='*60}")

        if not clf.model_dir.exists() or not (clf.model_dir / "config.json").exists():
            print(f"  No trained model found at {clf.model_dir} — skipping")
            continue

        clf.load()
        if not clf.loaded:
            print(f"  Failed to load — skipping")
            continue

        # Quick smoke test
        test_texts = [
            "I feel really anxious about going to work tomorrow",
            "What a beautiful day, I'm feeling great and motivated",
            "I can't stop crying and nothing helps anymore",
        ]

        print(f"\n  Smoke test ({len(test_texts)} examples):")
        for text in test_texts:
            result = clf.predict(text)
            summary = {k: v for k, v in result.items()
                       if k not in ("classifier", "model", "processing_ms")}
            print(f"    \"{text[:50]}...\" → {summary}")

        print(f"\n  Model: {clf._model_path}")
        metrics = clf.metrics()
        if metrics:
            print(f"  Metrics: {json.dumps(metrics, indent=2)}")
        else:
            print(f"  No metrics.json found")


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else None
    evaluate_classifier(target)
