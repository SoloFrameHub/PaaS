"""
Train Distress Classifier
=========================
Refactored from the original finetune.py into the Maia training pipeline.
Dataset: thePixel42/depression-detection (200K Reddit posts, open license).

Usage:
    cd services/maia
    python -m training.train_distress

Output:
    models/distress/  — fine-tuned model + metrics.json
"""

import numpy as np
from datasets import load_dataset
from sklearn.metrics import f1_score, roc_auc_score, confusion_matrix

from .base_trainer import BaseTrainer, softmax


DATASET_NAME = "thePixel42/depression-detection"
TRAIN_SIZE = 140_000
VAL_SIZE = 10_000
TEST_SIZE = 10_000
DISTRESS_THRESHOLD = 0.60


class DistressTrainer(BaseTrainer):
    name = "distress"
    num_labels = 2
    id2label = {0: "no_distress", 1: "distress"}
    label2id = {"no_distress": 0, "distress": 1}
    output_subdir = "distress"

    def load_datasets(self):
        ds = load_dataset(DATASET_NAME)
        full_train = ds["train"] if "train" in ds else ds[list(ds.keys())[0]]
        full_train = full_train.shuffle(seed=42)

        total_needed = TRAIN_SIZE + VAL_SIZE + TEST_SIZE
        if len(full_train) < total_needed:
            train_size = int(len(full_train) * 0.8)
            val_size = int(len(full_train) * 0.1)
            test_size = len(full_train) - train_size - val_size
        else:
            train_size, val_size, test_size = TRAIN_SIZE, VAL_SIZE, TEST_SIZE

        train_ds = full_train.select(range(train_size))
        val_ds = full_train.select(range(train_size, train_size + val_size))
        test_ds = full_train.select(range(train_size + val_size, train_size + val_size + test_size))

        return train_ds, val_ds, test_ds

    def compute_metrics(self, eval_pred):
        logits, labels = eval_pred
        probs = softmax(logits, axis=1)[:, 1]
        preds = (probs >= DISTRESS_THRESHOLD).astype(int)

        f1_w = f1_score(labels, preds, average="weighted")
        f1_d = f1_score(labels, preds, pos_label=1, average="binary")
        try:
            auc = roc_auc_score(labels, probs)
        except Exception:
            auc = 0.0

        return {
            "f1_weighted": round(f1_w, 4),
            "f1_distress": round(f1_d, 4),
            "auc_roc": round(auc, 4),
        }


if __name__ == "__main__":
    trainer = DistressTrainer()
    trainer.train()
