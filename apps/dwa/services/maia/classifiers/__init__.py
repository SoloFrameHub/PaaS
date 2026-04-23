"""
Maia Classifier Registry
========================
Each classifier inherits from BaseClassifier and is registered here.
The FastAPI app loads all registered classifiers at startup.
"""

from .distress import DistressClassifier
from .forum_topic import ForumTopicClassifier
from .content_quality import ContentQualityClassifier
from .content_atomization import ContentAtomizationClassifier

CLASSIFIER_CLASSES = [
    DistressClassifier,
    ForumTopicClassifier,
    ContentQualityClassifier,
    ContentAtomizationClassifier,
]
