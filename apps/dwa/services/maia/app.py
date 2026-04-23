"""
Maia — Clinical AI Classification Layer
=========================================
Unified FastAPI service hosting multiple DistilBERT classifiers for the
Digital Wellness Academy platform.

Classifiers:
    distress             — Safety screening (crisis / mild / none)
    forum-topic          — Forum post topic + routing
    content-quality      — Therapeutic language quality scoring
    content-atomization  — Marketing content extraction tagging

Backwards Compatibility:
    POST /classify       — Original distress classifier endpoint (unchanged)
    GET  /health         — Original health check (unchanged)
    GET  /metrics        — Original distress metrics (unchanged)

New Unified API (v1):
    POST /v1/classify/{classifier}  — Classify text with any loaded model
    GET  /v1/health                 — Per-model health status
    GET  /v1/metrics                — All models' metrics
    GET  /v1/metrics/{classifier}   — Specific model metrics

Port: 8001 (same as original distress classifier)
"""

import logging
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from classifiers import CLASSIFIER_CLASSES
from classifiers.base import BaseClassifier

# ── Logging ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(name)s] %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("maia")

# ── Classifier Registry ─────────────────────────────────────────────────────

CLASSIFIERS: dict[str, BaseClassifier] = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load all registered classifiers at startup."""
    logger.info("Maia starting — loading classifiers...")

    for cls in CLASSIFIER_CLASSES:
        clf = cls()
        try:
            clf.load()
            if clf.loaded:
                CLASSIFIERS[clf.name] = clf
                logger.info(f"  [{clf.name}] ready")
            else:
                logger.warning(f"  [{clf.name}] skipped (no model available)")
        except Exception as e:
            logger.error(f"  [{clf.name}] failed to load: {e}")

    loaded = [n for n, c in CLASSIFIERS.items() if c.loaded]
    logger.info(f"Maia ready — {len(loaded)}/{len(CLASSIFIER_CLASSES)} classifiers loaded: {loaded}")

    yield

    CLASSIFIERS.clear()
    logger.info("Maia shutdown")


# ── App ──────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Maia — Clinical AI Layer",
    description="Unified classification service for the Digital Wellness Academy platform",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Internal Docker network only — not exposed externally
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


# ── Schemas ──────────────────────────────────────────────────────────────────

class ClassifyRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000,
                      description="Text to classify")
    user_id: str | None = Field(None, description="Optional — audit logging only")


# Legacy response (backwards compat with existing Next.js integration)
class DistressResponse(BaseModel):
    level: str
    confidence: float
    flag: bool
    crisis: bool
    model: str


# ── Backwards-Compatible Routes (original distress classifier API) ───────────

@app.get("/health")
def health_legacy():
    """Original health check — unchanged response shape."""
    distress = CLASSIFIERS.get("distress")
    return {
        "status": "ok",
        "model_loaded": distress is not None and distress.loaded,
        "model": distress._model_path if distress else None,
    }


@app.get("/metrics")
def metrics_legacy():
    """Original metrics endpoint — distress only."""
    distress = CLASSIFIERS.get("distress")
    if not distress:
        raise HTTPException(status_code=404, detail="Distress classifier not loaded")
    m = distress.metrics()
    if not m:
        raise HTTPException(status_code=404, detail="No metrics found. Run training first.")
    return m


@app.post("/classify", response_model=DistressResponse)
def classify_legacy(request: ClassifyRequest):
    """Original /classify endpoint — unchanged response shape.

    This is the endpoint called by lib/safety/checkDistress.ts.
    Response is identical to the standalone distress-classifier service.
    """
    distress = CLASSIFIERS.get("distress")
    if not distress:
        raise HTTPException(status_code=503, detail="Distress classifier not loaded")

    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    result = distress.predict(text)

    # Return only the fields the original client expects
    return DistressResponse(
        level=result["level"],
        confidence=result["confidence"],
        flag=result["flag"],
        crisis=result["crisis"],
        model=result["model"],
    )


# ── V1 Unified API ──────────────────────────────────────────────────────────

@app.post("/v1/classify/{classifier_name}")
def classify_v1(classifier_name: str, request: ClassifyRequest) -> dict[str, Any]:
    """Classify text with any loaded classifier.

    Returns the classifier-specific result plus common envelope fields:
    classifier, model, processing_ms.
    """
    clf = CLASSIFIERS.get(classifier_name)
    if clf is None:
        available = list(CLASSIFIERS.keys())
        raise HTTPException(
            status_code=404,
            detail=f"Classifier '{classifier_name}' not found. Available: {available}",
        )

    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    return clf.predict(text)


@app.get("/v1/health")
def health_v1():
    """Per-model health status."""
    return {
        "status": "ok",
        "classifiers": {
            name: clf.health() for name, clf in CLASSIFIERS.items()
        },
        "total_loaded": sum(1 for c in CLASSIFIERS.values() if c.loaded),
        "total_registered": len(CLASSIFIER_CLASSES),
    }


@app.get("/v1/metrics")
def metrics_v1():
    """All models' evaluation metrics."""
    return {
        name: clf.metrics() for name, clf in CLASSIFIERS.items()
    }


@app.get("/v1/metrics/{classifier_name}")
def metrics_v1_single(classifier_name: str):
    """Specific model's evaluation metrics."""
    clf = CLASSIFIERS.get(classifier_name)
    if clf is None:
        raise HTTPException(status_code=404, detail=f"Classifier '{classifier_name}' not found")
    m = clf.metrics()
    if not m:
        raise HTTPException(status_code=404, detail="No metrics found for this classifier")
    return m


# ── Run directly ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8001, reload=False)
