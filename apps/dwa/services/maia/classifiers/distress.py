"""
Distress Classifier
===================
Detects distress/crisis signals in user text (journal entries, assessments,
forum posts, check-ins). Three-tier output: none / mild / crisis.

Extracted from the original standalone distress-classifier service.
Backwards-compatible response shape.
"""

from .base import BaseClassifier

# Confidence thresholds (tuned via evaluate.py)
CRISIS_THRESHOLD = 0.85    # PHQ-9 Item 9 equivalent — triggers crisis modal
DISTRESS_THRESHOLD = 0.60  # Mild/moderate — triggers gentle check-in

# Labels that indicate the "positive" (distress) class across different model formats
POSITIVE_LABELS = {"LABEL_1", "POSITIVE", "DEPRESSION", "1", "DISTRESS"}


class DistressClassifier(BaseClassifier):
    name = "distress"
    model_subdir = "distress"
    fallback_model = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"
    num_labels = 2

    def _parse_result(self, raw: dict, text: str) -> dict:
        label = raw["label"].upper()
        score = raw["score"]

        # Normalize confidence to the "distress" direction
        if label in POSITIVE_LABELS:
            confidence = score
        else:
            confidence = 1 - score

        # Map confidence to level
        if confidence >= CRISIS_THRESHOLD:
            level = "crisis"
            flag = True
            crisis = True
        elif confidence >= DISTRESS_THRESHOLD:
            level = "mild"
            flag = True
            crisis = False
        else:
            level = "none"
            flag = False
            crisis = False

        return {
            "level": level,
            "confidence": round(confidence, 4),
            "flag": flag,
            "crisis": crisis,
        }

    def _log_summary(self, result: dict) -> str:
        return f"level={result['level']} confidence={result['confidence']:.3f}"
