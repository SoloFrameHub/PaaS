"""
BaseClassifier — shared interface for all Maia classifiers.

Every classifier loads a DistilBERT model via the transformers pipeline,
exposes health/metrics, and runs inference through a common predict() method.
Subclasses only implement _parse_result() to map raw model output to their
domain-specific response shape.
"""

import json
import time
import logging
from abc import ABC, abstractmethod
from pathlib import Path

import torch
from transformers import pipeline as hf_pipeline

logger = logging.getLogger("maia")


class BaseClassifier(ABC):
    """Abstract base for all Maia classifiers."""

    # Subclasses must set these
    name: str = ""                       # e.g. "distress"
    model_subdir: str = ""               # e.g. "distress" -> models/distress/
    fallback_model: str = ""             # HuggingFace model ID for cold start
    num_labels: int = 2
    max_length: int = 256

    def __init__(self):
        self._pipeline = None
        self._model_path: str = ""

    @property
    def models_root(self) -> Path:
        return Path("./models")

    @property
    def model_dir(self) -> Path:
        return self.models_root / self.model_subdir

    @property
    def metrics_path(self) -> Path:
        return self.model_dir / "metrics.json"

    @property
    def loaded(self) -> bool:
        return self._pipeline is not None

    def load(self) -> None:
        """Load the model. Fine-tuned model preferred, fallback to base."""
        if self.model_dir.exists() and (self.model_dir / "config.json").exists():
            model_path = str(self.model_dir)
            logger.info(f"[{self.name}] Loading fine-tuned model from {model_path}")
        elif self.fallback_model:
            model_path = self.fallback_model
            logger.info(f"[{self.name}] No fine-tuned model found, using fallback: {model_path}")
        else:
            logger.warning(f"[{self.name}] No model available — skipping")
            return

        self._pipeline = hf_pipeline(
            "text-classification",
            model=model_path,
            device=-1,
            truncation=True,
            max_length=self.max_length,
        )
        self._model_path = model_path
        logger.info(f"[{self.name}] Model loaded")

    def predict(self, text: str) -> dict:
        """Run inference and return parsed result with timing."""
        if not self.loaded:
            raise RuntimeError(f"[{self.name}] Model not loaded")

        start = time.perf_counter()

        try:
            raw = self._pipeline(text)[0]
        except TypeError as e:
            # Handle token_type_ids incompatibility (some DistilBERT variants)
            if "token_type_ids" in str(e):
                raw = self._manual_inference(text)
            else:
                raise

        elapsed_ms = (time.perf_counter() - start) * 1000
        result = self._parse_result(raw, text)
        result["classifier"] = self.name
        result["model"] = self._model_path
        result["processing_ms"] = round(elapsed_ms, 1)

        logger.info(
            f"[{self.name}] Classified ({len(text)} chars) in {elapsed_ms:.0f}ms: "
            f"{self._log_summary(result)}"
        )

        return result

    def _manual_inference(self, text: str) -> dict:
        """Fallback when pipeline fails due to token_type_ids."""
        tokenizer = self._pipeline.tokenizer
        inputs = tokenizer(text, truncation=True, max_length=self.max_length, return_tensors="pt")
        if "token_type_ids" in inputs:
            del inputs["token_type_ids"]
        with torch.no_grad():
            outputs = self._pipeline.model(**inputs)
        scores = torch.nn.functional.softmax(outputs.logits, dim=-1)
        predicted_class = scores.argmax(-1).item()
        predicted_score = scores[0, predicted_class].item()
        label_name = self._pipeline.model.config.id2label.get(
            predicted_class, f"LABEL_{predicted_class}"
        )
        return {"label": label_name, "score": predicted_score}

    @abstractmethod
    def _parse_result(self, raw: dict, text: str) -> dict:
        """Convert raw model output to domain-specific response."""
        ...

    def _log_summary(self, result: dict) -> str:
        """One-line summary for logging. Override for richer logging."""
        return str({k: v for k, v in result.items() if k not in ("classifier", "model", "processing_ms")})

    def health(self) -> dict:
        return {
            "name": self.name,
            "loaded": self.loaded,
            "model": self._model_path or None,
        }

    def metrics(self) -> dict | None:
        if not self.metrics_path.exists():
            return None
        with open(self.metrics_path) as f:
            return json.load(f)
