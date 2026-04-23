"""
Content Atomization Classifier
===============================
Tags lesson sections for marketing content extraction.

Labels:
  - standalone-blog-excerpt:  Self-contained narrative, works as a blog post
  - email-teaser:             Hook or insight, works in email marketing
  - social-snippet:           Short, punchy, shareable on social media
  - needs-full-context:       Requires surrounding lesson context to make sense
  - not-extractable:          Tables, code blocks, exercises — not standalone content

Training data: Platform's own 380+ MDX lessons with heuristic bootstrap labels.
See training/train_content_atomization.py.
"""

from .base import BaseClassifier

ATOMIZATION_LABELS = [
    "standalone-blog-excerpt",
    "email-teaser",
    "social-snippet",
    "needs-full-context",
    "not-extractable",
]

EXTRACTABLE_LABELS = {"standalone-blog-excerpt", "email-teaser", "social-snippet"}


class ContentAtomizationClassifier(BaseClassifier):
    name = "content-atomization"
    model_subdir = "content-atomization"
    fallback_model = ""  # No fallback — requires fine-tuned model
    num_labels = len(ATOMIZATION_LABELS)

    def _parse_result(self, raw: dict, text: str) -> dict:
        label = raw["label"].lower().replace(" ", "-").replace("_", "-")
        score = raw["score"]

        tag = label if label in ATOMIZATION_LABELS else "needs-full-context"
        extractable = tag in EXTRACTABLE_LABELS

        return {
            "tag": tag,
            "tag_confidence": round(score, 4),
            "extractable": extractable,
        }

    def _log_summary(self, result: dict) -> str:
        return (
            f"tag={result['tag']} confidence={result['tag_confidence']:.3f} "
            f"extractable={result['extractable']}"
        )
