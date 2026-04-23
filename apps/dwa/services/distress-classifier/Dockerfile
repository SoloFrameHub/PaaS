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

# Copy fine-tuned model if it exists (built by finetune.py)
# If ./model/ doesn't exist, app.py falls back to the HuggingFace base model
COPY model/ ./model/ 2>/dev/null || true

# Copy metrics if they exist
COPY metrics.json ./ 2>/dev/null || true

# Non-root user
RUN useradd --system --uid 1001 classifier
USER classifier

EXPOSE 8001

HEALTHCHECK --interval=30s --timeout=15s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
