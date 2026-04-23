"""
Distress Classifier — FastAPI Inference Service
================================================
Production API endpoint called by the Next.js platform to classify
user text (journal entries, assessment responses) for distress signals.

Replaces keyword-matching safety logic with a trained ML classifier.

Endpoints:
    POST /classify      — classify a single text input
    GET  /health        — health check
    GET  /metrics       — last evaluation metrics (for Nebius application)

Called from Next.js:
    const res = await fetch('http://localhost:8001/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput }),
    })
    const { level, confidence, flag } = await res.json()
"""

import json
import os
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import pipeline

# ── Configuration ─────────────────────────────────────────────────────────────

# Use fine-tuned model if it exists (from finetune.py), else fall back to base
FINETUNED_MODEL_PATH = "./model"
BASE_MODEL = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"

MODEL_PATH = FINETUNED_MODEL_PATH if Path(FINETUNED_MODEL_PATH).exists() else BASE_MODEL

# Confidence thresholds for distress levels
# Tune these based on your evaluate.py results
CRISIS_THRESHOLD  = 0.85   # PHQ-9 Item 9 equivalent — triggers crisis modal
DISTRESS_THRESHOLD = 0.60  # Mild/moderate — triggers gentle check-in

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── Model loading ─────────────────────────────────────────────────────────────

classifier = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global classifier
    logger.info(f"Loading model from: {MODEL_PATH}")
    classifier = pipeline(
        "text-classification",
        model=MODEL_PATH,
        device=-1,          # CPU; set to 0 if GPU available
        truncation=True,
        max_length=256,
    )
    logger.info("Model loaded — ready")
    yield
    # Cleanup on shutdown
    classifier = None

# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Distress Classifier",
    description="Mental health distress detection for the Digital Wellness Academy platform",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow from all origins (internal Docker network only, not exposed externally)
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

# ── Schemas ───────────────────────────────────────────────────────────────────

class ClassifyRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000,
                      description="Text to classify (journal entry, assessment response, etc.)")
    user_id: str | None = Field(None, description="Optional — used for audit logging only, never stored with text")

class ClassifyResponse(BaseModel):
    level: str              # "none" | "mild" | "crisis"
    confidence: float       # 0.0–1.0 confidence in distress direction
    flag: bool              # True = surface safety resource to user
    crisis: bool            # True = surface crisis modal immediately
    model: str              # Which model was used

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": classifier is not None,
        "model": MODEL_PATH,
    }

@app.get("/metrics")
def get_metrics():
    """Return the last evaluation metrics — used in Nebius application materials."""
    metrics_path = Path("metrics.json")
    if not metrics_path.exists():
        raise HTTPException(
            status_code=404,
            detail="No metrics found. Run evaluate.py first."
        )
    with open(metrics_path) as f:
        return json.load(f)

@app.post("/classify", response_model=ClassifyResponse)
def classify(request: ClassifyRequest):
    if classifier is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    try:
        result = classifier(text)[0]
    except TypeError as e:
        # Handle transformers/model incompatibility with token_type_ids
        if "token_type_ids" in str(e):
            # Manually tokenize and classify without token_type_ids
            import torch
            tokenizer = classifier.tokenizer
            inputs = tokenizer(text, truncation=True, max_length=256, return_tensors="pt")
            # Remove token_type_ids if present
            if "token_type_ids" in inputs:
                del inputs["token_type_ids"]
            with torch.no_grad():
                outputs = classifier.model(**inputs)
            scores = torch.nn.functional.softmax(outputs.logits, dim=-1)
            predicted_class = scores.argmax(-1).item()
            predicted_score = scores[0, predicted_class].item()
            label_name = classifier.model.config.id2label.get(predicted_class, f"LABEL_{predicted_class}")
            result = {"label": label_name, "score": predicted_score}
        else:
            raise

    # Parse confidence in the "distress" direction
    label = result["label"].upper()
    score = result["score"]

    if label in ("LABEL_1", "POSITIVE", "DEPRESSION", "1", "DISTRESS"):
        distress_confidence = score
    else:
        distress_confidence = 1 - score

    # Map confidence to distress level
    if distress_confidence >= CRISIS_THRESHOLD:
        level = "crisis"
        flag  = True
        crisis = True
    elif distress_confidence >= DISTRESS_THRESHOLD:
        level = "mild"
        flag  = True
        crisis = False
    else:
        level = "none"
        flag  = False
        crisis = False

    logger.info(
        f"Classified text ({len(text)} chars): level={level} "
        f"confidence={distress_confidence:.3f}"
        # Never log the actual text content — PHI protection
    )

    return ClassifyResponse(
        level=level,
        confidence=round(distress_confidence, 4),
        flag=flag,
        crisis=crisis,
        model=MODEL_PATH,
    )

# ── Run directly ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8001, reload=False)
