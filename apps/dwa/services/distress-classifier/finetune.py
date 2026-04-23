"""
Distress Classifier — Fine-Tuning Script (Optional)
=====================================================
Fine-tunes distilbert-base-uncased (Apache 2.0 license, commercially safe)
on the depression detection dataset to produce a model you own entirely.

Run time estimates:
    CPU (VPS, 4 vCPU):   ~3-6 hours on 20K examples
    CPU (VPS, 8 vCPU):   ~2-3 hours on 20K examples
    GPU (T4, Kaggle):    ~15-25 minutes on 20K examples

Recommendation:
    Run evaluate.py first — it gives you metrics immediately.
    Run this script overnight on the VPS for a fully owned model.
    If VPS is too slow, copy this script to a Kaggle notebook and run there.

Output:
    ./model/  — saved fine-tuned model, ready for app.py to load
"""

import os
import time
import json
import numpy as np
from datasets import load_dataset, concatenate_datasets
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    EarlyStoppingCallback,
)
from sklearn.metrics import f1_score, roc_auc_score, classification_report

# ── Configuration ─────────────────────────────────────────────────────────────

BASE_MODEL   = "distilbert/distilbert-base-uncased"  # Apache 2.0 — commercially safe
OUTPUT_DIR   = "./model"
DATASET_NAME = "thePixel42/depression-detection"

# Hostinger KVM 8 (32GB RAM, 8 vCPU) — use full dataset and larger batches
# 140K examples, batch 32, 3 epochs: estimated ~2-3 hours on 8 vCPUs
TRAIN_SIZE   = 140_000   # None = use entire training split
VAL_SIZE     = 10_000
TEST_SIZE    = 10_000

EPOCHS       = 3
BATCH_SIZE   = 32    # 32GB RAM allows large batches — faster training
MAX_LENGTH   = 256   # Full sequence length — better accuracy than 128
LEARNING_RATE = 2e-5

# ── Load and prepare data ─────────────────────────────────────────────────────

print("Loading dataset...")
ds = load_dataset(DATASET_NAME)

# Get train split; create val/test splits
full_train = ds["train"] if "train" in ds else ds[list(ds.keys())[0]]

# Shuffle before slicing
full_train = full_train.shuffle(seed=42)

# Slice into train / val / test
total_needed = TRAIN_SIZE + VAL_SIZE + TEST_SIZE
if len(full_train) < total_needed:
    print(f"Warning: dataset has {len(full_train)} examples, requested {total_needed}. Adjusting.")
    TRAIN_SIZE = int(len(full_train) * 0.8)
    VAL_SIZE   = int(len(full_train) * 0.1)
    TEST_SIZE  = len(full_train) - TRAIN_SIZE - VAL_SIZE

train_ds = full_train.select(range(TRAIN_SIZE))
val_ds   = full_train.select(range(TRAIN_SIZE, TRAIN_SIZE + VAL_SIZE))
test_ds  = full_train.select(range(TRAIN_SIZE + VAL_SIZE, TRAIN_SIZE + VAL_SIZE + TEST_SIZE))

print(f"  Train: {len(train_ds)} | Val: {len(val_ds)} | Test: {len(test_ds)}")

# Label check
label_counts = {}
for label in train_ds["label"]:
    label_counts[label] = label_counts.get(label, 0) + 1
print(f"  Label distribution (train): {label_counts}")
print()

# ── Tokenize ──────────────────────────────────────────────────────────────────

print(f"Loading tokenizer: {BASE_MODEL}")
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

def tokenize(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        max_length=MAX_LENGTH,
        padding="max_length",
    )

print("Tokenizing...")
train_ds = train_ds.map(tokenize, batched=True, batch_size=256)
val_ds   = val_ds.map(tokenize, batched=True, batch_size=256)
test_ds  = test_ds.map(tokenize, batched=True, batch_size=256)

# Rename label → labels for HuggingFace compatibility
train_ds = train_ds.rename_column("label", "labels")
val_ds   = val_ds.rename_column("label", "labels")
test_ds  = test_ds.rename_column("label", "labels")

train_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
val_ds.set_format("torch",   columns=["input_ids", "attention_mask", "labels"])
test_ds.set_format("torch",  columns=["input_ids", "attention_mask", "labels"])

# ── Model ─────────────────────────────────────────────────────────────────────

print(f"Loading model: {BASE_MODEL}")
model = AutoModelForSequenceClassification.from_pretrained(
    BASE_MODEL,
    num_labels=2,
    id2label={0: "no_distress", 1: "distress"},
    label2id={"no_distress": 0, "distress": 1},
)

# ── Metrics function ──────────────────────────────────────────────────────────

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    probs = softmax(logits, axis=1)[:, 1]   # Probability of distress class
    preds = (probs >= 0.60).astype(int)      # Default threshold

    f1_w  = f1_score(labels, preds, average="weighted")
    f1_d  = f1_score(labels, preds, pos_label=1, average="binary")
    try:
        auc = roc_auc_score(labels, probs)
    except Exception:
        auc = 0.0

    return {
        "f1_weighted": round(f1_w, 4),
        "f1_distress": round(f1_d, 4),
        "auc_roc":     round(auc, 4),
    }

def softmax(logits, axis=-1):
    e = np.exp(logits - np.max(logits, axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)

# ── Training arguments ────────────────────────────────────────────────────────

print(f"\nTraining configuration:")
print(f"  Base model:    {BASE_MODEL}")
print(f"  Train samples: {len(train_ds)}")
print(f"  Epochs:        {EPOCHS}")
print(f"  Batch size:    {BATCH_SIZE}")
print(f"  Max length:    {MAX_LENGTH}")

# Estimate time
steps_per_epoch = len(train_ds) // BATCH_SIZE
total_steps = steps_per_epoch * EPOCHS
secs_per_step_cpu = 0.7   # Rough estimate on a 4-vCPU VPS
estimated_mins = (total_steps * secs_per_step_cpu) / 60
print(f"  Estimated time (CPU): ~{estimated_mins:.0f} minutes")
print()

training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    num_train_epochs=EPOCHS,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=16,
    learning_rate=LEARNING_RATE,
    weight_decay=0.01,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1_weighted",
    greater_is_better=True,
    logging_steps=50,
    fp16=False,          # CPU training: no FP16
    dataloader_num_workers=0,
    no_cuda=True,        # Force CPU — remove this line if you have a GPU
    report_to="none",    # No wandb / mlflow
)

# ── Train ─────────────────────────────────────────────────────────────────────

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
    eval_dataset=val_ds,
    compute_metrics=compute_metrics,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],
)

print("Starting training...")
start = time.time()
trainer.train()
elapsed = time.time() - start
print(f"\nTraining complete in {elapsed/60:.1f} minutes")

# ── Final evaluation on test set ──────────────────────────────────────────────

print("\nRunning final evaluation on held-out test set...")
predictions = trainer.predict(test_ds)
logits = predictions.predictions
labels = predictions.label_ids
probs  = softmax(logits, axis=1)[:, 1]
preds  = (probs >= 0.60).astype(int)

f1_weighted = f1_score(labels, preds, average="weighted")
f1_distress = f1_score(labels, preds, pos_label=1, average="binary")
auc         = roc_auc_score(labels, probs)

from sklearn.metrics import confusion_matrix
cm = confusion_matrix(labels, preds)
tn, fp, fn, tp = cm.ravel()
sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
specificity = tn / (tn + fp) if (tn + fp) > 0 else 0

print()
print("=" * 60)
print("FINE-TUNED MODEL — FINAL TEST SET RESULTS")
print("=" * 60)
print(classification_report(labels, preds, target_names=["No Distress", "Distress"], digits=4))
print(f"Weighted F1:    {f1_weighted:.4f}")
print(f"Distress F1:    {f1_distress:.4f}")
print(f"AUC-ROC:        {auc:.4f}")
print(f"Sensitivity:    {sensitivity:.4f}")
print(f"Specificity:    {specificity:.4f}")
print("=" * 60)

print()
print("NEBIUS APPLICATION — HEADLINE METRIC:")
print(f'  "Our distress detection model — fine-tuned on {len(train_ds)} labeled examples')
print(f'   — achieves {sensitivity*100:.1f}% sensitivity and AUC-ROC of {auc:.3f}')
print(f'   on a held-out test set of {len(test_ds)} examples."')

# ── Save model and metrics ────────────────────────────────────────────────────

trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)
print(f"\nModel saved to: {OUTPUT_DIR}/")

metrics = {
    "model": BASE_MODEL,
    "finetuned": True,
    "dataset": DATASET_NAME,
    "train_size": len(train_ds),
    "test_size": len(test_ds),
    "threshold": 0.60,
    "weighted_f1": round(f1_weighted, 4),
    "distress_f1": round(f1_distress, 4),
    "auc_roc": round(auc, 4),
    "sensitivity": round(sensitivity, 4),
    "specificity": round(specificity, 4),
    "true_positives": int(tp),
    "false_positives": int(fp),
    "false_negatives": int(fn),
    "true_negatives": int(tn),
    "training_minutes": round(elapsed / 60, 1),
}

with open("metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

print("Metrics saved to: metrics.json")
print("\nNext: restart app.py — it will automatically use the fine-tuned model from ./model/")
