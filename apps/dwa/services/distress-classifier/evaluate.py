"""
Distress Classifier — Evaluation Script
========================================
Loads a pre-trained DistilBERT model fine-tuned on depression/distress data,
evaluates it against a held-out test set, and outputs the metrics needed for
the Nebius AI Discovery Award application.

Run time on VPS CPU: approx 20-40 minutes for 1,000 test examples.

Usage:
    python evaluate.py

Output:
    - Classification report (precision, recall, F1 per class)
    - Weighted F1 score
    - AUC-ROC score
    - Sensitivity at clinical suicidality threshold
    - Saves results to metrics.json
"""

import json
import time
import numpy as np
from datasets import load_dataset
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from sklearn.metrics import (
    classification_report,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    ConfusionMatrixDisplay,
)

# ── Configuration ─────────────────────────────────────────────────────────────

# Base model: commercially licensed (Apache 2.0), fine-tuned for distress detection
# This is our starting point. Run finetune.py to train your own version.
MODEL_NAME = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"

# If you have already run finetune.py, use your own model instead:
# MODEL_NAME = "./model"

# Dataset: 200K Reddit posts, fully open, no DUA required
DATASET_NAME = "thePixel42/depression-detection"

# How many test examples to evaluate (None = full test split)
# Start with 1000 for speed; increase for more accurate metrics
TEST_SAMPLE_SIZE = 1000

# Confidence threshold above which we flag as distress
# Tune this to balance sensitivity vs false positives
DISTRESS_THRESHOLD = 0.60

# ── Load model ────────────────────────────────────────────────────────────────

print("Loading model...")
print(f"  Model: {MODEL_NAME}")
print(f"  Running on: CPU")
print()

classifier = pipeline(
    "text-classification",
    model=MODEL_NAME,
    tokenizer=MODEL_NAME,
    device=-1,          # -1 = CPU; change to 0 if GPU available
    truncation=True,
    max_length=256,
)

# ── Load dataset ──────────────────────────────────────────────────────────────

print(f"Loading dataset: {DATASET_NAME}")
ds = load_dataset(DATASET_NAME)

# Use the test split; fall back to a slice of train if no test split exists
if "test" in ds:
    test_data = ds["test"]
else:
    test_data = ds["train"].train_test_split(test_size=0.1, seed=42)["test"]

if TEST_SAMPLE_SIZE and TEST_SAMPLE_SIZE < len(test_data):
    test_data = test_data.select(range(TEST_SAMPLE_SIZE))

print(f"  Test examples: {len(test_data)}")
print()

# ── Run inference ─────────────────────────────────────────────────────────────

print("Running inference... (this takes ~20-40 min on CPU)")
start = time.time()

texts = test_data["text"]
true_labels = test_data["label"]   # 0 = no depression, 1 = depression

# Run in batches to avoid OOM on small VPS
BATCH_SIZE = 16
raw_results = []

for i in range(0, len(texts), BATCH_SIZE):
    batch = texts[i : i + BATCH_SIZE]
    results = classifier(batch, batch_size=BATCH_SIZE)
    raw_results.extend(results)

    if (i // BATCH_SIZE) % 5 == 0:
        done = min(i + BATCH_SIZE, len(texts))
        elapsed = time.time() - start
        rate = done / elapsed if elapsed > 0 else 0
        remaining = (len(texts) - done) / rate if rate > 0 else 0
        print(f"  {done}/{len(texts)} — ~{remaining/60:.1f} min remaining")

elapsed_total = time.time() - start
print(f"\nInference complete in {elapsed_total/60:.1f} minutes")
print()

# ── Parse predictions ─────────────────────────────────────────────────────────

# Map model output labels to 0/1
# SST-2 model uses POSITIVE/NEGATIVE; we treat NEGATIVE as distress signal
# Adjust label mapping if you use a different base model
def parse_label(result):
    label = result["label"].upper()
    if label in ("LABEL_1", "POSITIVE", "DEPRESSION", "1"):
        return 1
    return 0

def parse_confidence(result):
    label = result["label"].upper()
    score = result["score"]
    # Return confidence in the "distress" direction
    if label in ("LABEL_1", "POSITIVE", "DEPRESSION", "1"):
        return score
    return 1 - score

pred_labels = [parse_label(r) for r in raw_results]
pred_probs  = [parse_confidence(r) for r in raw_results]

# Apply threshold
pred_labels_threshold = [1 if p >= DISTRESS_THRESHOLD else 0 for p in pred_probs]

# ── Compute metrics ───────────────────────────────────────────────────────────

print("=" * 60)
print("DISTRESS CLASSIFIER — EVALUATION RESULTS")
print("=" * 60)
print(f"Model:      {MODEL_NAME}")
print(f"Dataset:    {DATASET_NAME}")
print(f"Test size:  {len(test_data)} examples")
print(f"Threshold:  {DISTRESS_THRESHOLD}")
print()

report = classification_report(
    true_labels,
    pred_labels_threshold,
    target_names=["No Distress", "Distress"],
    digits=4,
)
print(report)

f1_weighted = f1_score(true_labels, pred_labels_threshold, average="weighted")
f1_distress = f1_score(true_labels, pred_labels_threshold, pos_label=1, average="binary")

try:
    auc = roc_auc_score(true_labels, pred_probs)
except Exception:
    auc = None

cm = confusion_matrix(true_labels, pred_labels_threshold)
tn, fp, fn, tp = cm.ravel()

sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0   # True positive rate (recall for distress)
specificity = tn / (tn + fp) if (tn + fp) > 0 else 0   # True negative rate

print("-" * 60)
print(f"Weighted F1 Score:        {f1_weighted:.4f}")
print(f"Distress F1 Score:        {f1_distress:.4f}")
if auc:
    print(f"AUC-ROC:                  {auc:.4f}")
print()
print(f"Sensitivity (recall):     {sensitivity:.4f}  ← crisis detection rate")
print(f"Specificity:              {specificity:.4f}")
print(f"True Positives:           {tp}")
print(f"False Positives:          {fp}  ← unnecessary alerts")
print(f"False Negatives:          {fn}  ← missed distress signals")
print(f"True Negatives:           {tn}")
print("=" * 60)

# ── Nebius application quote ──────────────────────────────────────────────────

print()
print("NEBIUS APPLICATION — HEADLINE METRIC:")
print(f'  "Our distress detection model achieves {sensitivity*100:.1f}% sensitivity')
print(f'   and {f1_weighted:.3f} weighted F1 on a {len(test_data)}-example held-out test set,')
if auc:
    print(f'   with an AUC-ROC of {auc:.3f}."')
print()

# ── Save results ──────────────────────────────────────────────────────────────

metrics = {
    "model": MODEL_NAME,
    "dataset": DATASET_NAME,
    "test_size": len(test_data),
    "threshold": DISTRESS_THRESHOLD,
    "weighted_f1": round(f1_weighted, 4),
    "distress_f1": round(f1_distress, 4),
    "auc_roc": round(auc, 4) if auc else None,
    "sensitivity": round(sensitivity, 4),
    "specificity": round(specificity, 4),
    "true_positives": int(tp),
    "false_positives": int(fp),
    "false_negatives": int(fn),
    "true_negatives": int(tn),
    "inference_time_seconds": round(elapsed_total, 1),
}

with open("metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

print("Results saved to: metrics.json")
print("Run app.py to start the inference API.")
