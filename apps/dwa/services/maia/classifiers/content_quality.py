"""
Content Quality Classifier
===========================
Scores therapeutic/educational text for clinical language quality.

Labels:
  - clinically-appropriate:  Well-written, evidence-based, validating
  - needs-revision:          Fixable issues (tone, clarity, missing context)
  - potentially-harmful:     Could cause harm (invalidating, triggering)
  - overly-clinical:         Too technical for patient-facing content
  - missing-validation:      Lacks empathy/validation statements

Training data: CBT/DBT manuals (positive), synthetic negatives via LLM.
See training/train_content_quality.py.
"""

from .base import BaseClassifier

QUALITY_LABELS = [
    "clinically-appropriate",
    "needs-revision",
    "potentially-harmful",
    "overly-clinical",
    "missing-validation",
]

# Content is publish-ready if it's clinically appropriate with high confidence
PUBLISH_THRESHOLD = 0.65


class ContentQualityClassifier(BaseClassifier):
    name = "content-quality"
    model_subdir = "content-quality"
    fallback_model = ""  # No fallback — requires fine-tuned model
    num_labels = len(QUALITY_LABELS)

    def _parse_result(self, raw: dict, text: str) -> dict:
        label = raw["label"].lower().replace(" ", "-").replace("_", "-")
        score = raw["score"]

        quality = label if label in QUALITY_LABELS else "needs-revision"
        publish_ready = (quality == "clinically-appropriate" and score >= PUBLISH_THRESHOLD)

        return {
            "quality": quality,
            "quality_confidence": round(score, 4),
            "publish_ready": publish_ready,
        }

    def _log_summary(self, result: dict) -> str:
        return (
            f"quality={result['quality']} confidence={result['quality_confidence']:.3f} "
            f"publish_ready={result['publish_ready']}"
        )
