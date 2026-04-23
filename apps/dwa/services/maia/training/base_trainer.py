"""
Maia Base Trainer
=================
Shared training pipeline for all Maia classifiers.
Subclasses override: dataset loading, label config, and metrics computation.

Pattern extracted from the original distress classifier finetune.py.
"""

import json
import time
import numpy as np
import torch
from pathlib import Path
from abc import ABC, abstractmethod

from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    EarlyStoppingCallback,
)
from sklearn.metrics import (
    f1_score,
    roc_auc_score,
    classification_report,
    confusion_matrix,
)

HAS_CUDA = torch.cuda.is_available()


def softmax(logits, axis=-1):
    e = np.exp(logits - np.max(logits, axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)


class BaseTrainer(ABC):
    """Shared training pipeline. Subclasses define data + labels."""

    # Subclasses must set these
    name: str = ""
    base_model: str = "distilbert/distilbert-base-uncased"
    num_labels: int = 2
    id2label: dict[int, str] = {}
    label2id: dict[str, int] = {}
    output_subdir: str = ""  # e.g. "forum-topic" -> models/forum-topic/

    # Training config (can override)
    epochs: int = 3
    batch_size: int = 32
    max_length: int = 256
    learning_rate: float = 2e-5
    eval_batch_size: int = 16

    @property
    def output_dir(self) -> Path:
        return Path("./models") / self.output_subdir

    @abstractmethod
    def load_datasets(self) -> tuple[Dataset, Dataset, Dataset]:
        """Return (train_ds, val_ds, test_ds) with 'text' and 'label' columns."""
        ...

    def compute_metrics(self, eval_pred):
        """Default multi-class metrics. Override for binary classifiers."""
        logits, labels = eval_pred
        preds = np.argmax(logits, axis=-1)

        f1_weighted = f1_score(labels, preds, average="weighted")
        f1_macro = f1_score(labels, preds, average="macro")

        return {
            "f1_weighted": round(f1_weighted, 4),
            "f1_macro": round(f1_macro, 4),
        }

    def train(self):
        """Full training pipeline."""
        print(f"\n{'='*60}")
        print(f"MAIA TRAINER — {self.name}")
        print(f"{'='*60}\n")

        # Load data
        print("Loading datasets...")
        train_ds, val_ds, test_ds = self.load_datasets()
        print(f"  Train: {len(train_ds)} | Val: {len(val_ds)} | Test: {len(test_ds)}")

        # Label distribution
        label_counts = {}
        for label in train_ds["label"]:
            label_counts[label] = label_counts.get(label, 0) + 1
        print(f"  Label distribution: {label_counts}\n")

        # Tokenize
        print(f"Loading tokenizer: {self.base_model}")
        tokenizer = AutoTokenizer.from_pretrained(self.base_model)

        def tokenize(batch):
            return tokenizer(
                batch["text"],
                truncation=True,
                max_length=self.max_length,
                padding="max_length",
            )

        print("Tokenizing...")
        train_ds = train_ds.map(tokenize, batched=True, batch_size=256)
        val_ds = val_ds.map(tokenize, batched=True, batch_size=256)
        test_ds = test_ds.map(tokenize, batched=True, batch_size=256)

        # Rename label -> labels for HuggingFace
        train_ds = train_ds.rename_column("label", "labels")
        val_ds = val_ds.rename_column("label", "labels")
        test_ds = test_ds.rename_column("label", "labels")

        train_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
        val_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
        test_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])

        # Model
        print(f"Loading model: {self.base_model}")
        model = AutoModelForSequenceClassification.from_pretrained(
            self.base_model,
            num_labels=self.num_labels,
            id2label=self.id2label,
            label2id=self.label2id,
        )

        # Training args — auto-detect GPU (Kaggle T4) vs CPU (VPS)
        if HAS_CUDA:
            device_name = torch.cuda.get_device_name(0)
            print(f"  GPU detected: {device_name} — using FP16 + GPU acceleration")
        else:
            print(f"  No GPU detected — CPU training (slower, consider Kaggle)")

        training_args = TrainingArguments(
            output_dir=str(self.output_dir),
            num_train_epochs=self.epochs,
            per_device_train_batch_size=self.batch_size,
            per_device_eval_batch_size=self.eval_batch_size,
            learning_rate=self.learning_rate,
            weight_decay=0.01,
            eval_strategy="epoch",
            save_strategy="epoch",
            load_best_model_at_end=True,
            metric_for_best_model="f1_weighted",
            greater_is_better=True,
            logging_steps=50,
            fp16=HAS_CUDA,          # FP16 on GPU, FP32 on CPU
            dataloader_num_workers=2 if HAS_CUDA else 0,
            no_cuda=not HAS_CUDA,   # Auto-detect: use GPU if available
            report_to="none",
        )

        # Train
        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_ds,
            eval_dataset=val_ds,
            compute_metrics=self.compute_metrics,
            callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],
        )

        print(f"\nStarting training ({self.epochs} epochs, batch {self.batch_size})...")
        start = time.time()
        trainer.train()
        elapsed = time.time() - start
        print(f"\nTraining complete in {elapsed/60:.1f} minutes")

        # Evaluate on test set
        print("\nEvaluating on held-out test set...")
        predictions = trainer.predict(test_ds)
        logits = predictions.predictions
        labels = predictions.label_ids
        preds = np.argmax(logits, axis=-1)

        f1_weighted = f1_score(labels, preds, average="weighted")
        f1_macro = f1_score(labels, preds, average="macro")

        print(f"\n{'='*60}")
        print(f"FINAL TEST RESULTS — {self.name}")
        print(f"{'='*60}")
        target_names = [self.id2label[i] for i in range(self.num_labels)]
        print(classification_report(labels, preds, target_names=target_names, digits=4))
        print(f"Weighted F1: {f1_weighted:.4f}")
        print(f"Macro F1:    {f1_macro:.4f}")
        print(f"{'='*60}")

        # Save
        self.output_dir.mkdir(parents=True, exist_ok=True)
        trainer.save_model(str(self.output_dir))
        tokenizer.save_pretrained(str(self.output_dir))
        print(f"\nModel saved to: {self.output_dir}/")

        # Save metrics
        metrics = {
            "classifier": self.name,
            "model": self.base_model,
            "finetuned": True,
            "num_labels": self.num_labels,
            "labels": self.id2label,
            "train_size": len(train_ds),
            "test_size": len(test_ds),
            "weighted_f1": round(f1_weighted, 4),
            "macro_f1": round(f1_macro, 4),
            "training_minutes": round(elapsed / 60, 1),
        }

        metrics_path = self.output_dir / "metrics.json"
        with open(metrics_path, "w") as f:
            json.dump(metrics, f, indent=2)
        print(f"Metrics saved to: {metrics_path}")

        return metrics
