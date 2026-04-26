FROM python:3.11-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App files
COPY app.py evaluate.py finetune.py ./

# Copy fine-tuned model + metrics. The old `COPY … 2>/dev/null || true`
# pattern used shell syntax that Dockerfile COPY does not understand — Docker
# treated `2>/dev/null` as an extra source path and `|| true` as a broken
# destination. The net effect was that the build silently failed the COPY
# and relied on app.py's HuggingFace fallback. (B-054)
#
# The model/ directory and metrics.json are expected to be present in the
# build context (metrics.json is checked in; model weights are transferred
# out-of-band by deploy-classifier-with-model.sh). If you need to build an
# image without them, comment out the relevant COPY and the app will fall
# back to the HuggingFace base model.
COPY model/ ./model/
COPY metrics.json ./

# Non-root user
RUN useradd --system --uid 1001 classifier
USER classifier

EXPOSE 8001

HEALTHCHECK --interval=30s --timeout=15s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
