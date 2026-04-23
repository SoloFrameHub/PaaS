"""
Forum Topic Classifier
======================
Classifies forum posts/discussions into topic categories and routing labels.

Topic labels: anxiety, depression, relationships, medication, coping-strategies,
              crisis, general-wellness, optimization

Routing labels: needs-provider, community-handles, informational

Uses a single multi-label DistilBERT model. At inference time, we take the
argmax across topic labels and routing labels separately, giving both a
primary topic and a routing recommendation.

Training data: Reddit mental health subreddits (see training/train_forum_topic.py).
"""

from .base import BaseClassifier

# Label groups — the model outputs a single label, but we map it to
# topic + routing categories based on label semantics
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

ROUTING_MAP = {
    # Topics that should route to provider review
    "crisis": "needs-provider",
    "medication": "needs-provider",
    # Topics the community can handle
    "anxiety": "community-handles",
    "depression": "community-handles",
    "relationships": "community-handles",
    "coping-strategies": "community-handles",
    "general-wellness": "community-handles",
    "optimization": "community-handles",
}

# Confidence threshold for flagging provider attention
PROVIDER_THRESHOLD = 0.70


class ForumTopicClassifier(BaseClassifier):
    name = "forum-topic"
    model_subdir = "forum-topic"
    fallback_model = ""  # No fallback — requires fine-tuned model
    num_labels = len(TOPIC_LABELS)

    def _parse_result(self, raw: dict, text: str) -> dict:
        label = raw["label"].lower().replace(" ", "-")
        score = raw["score"]

        # Ensure the label is one we recognize
        topic = label if label in TOPIC_LABELS else "general-wellness"
        routing = ROUTING_MAP.get(topic, "community-handles")

        # Override routing if confidence is high on a crisis/medication post
        needs_provider = (
            routing == "needs-provider" and score >= PROVIDER_THRESHOLD
        )

        return {
            "topic": topic,
            "topic_confidence": round(score, 4),
            "routing": routing,
            "needs_provider": needs_provider,
        }

    def _log_summary(self, result: dict) -> str:
        return (
            f"topic={result['topic']} confidence={result['topic_confidence']:.3f} "
            f"routing={result['routing']}"
        )
