FROM python:3.11-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python deps (layer cached)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App code
COPY app.py ./
COPY classifiers/ ./classifiers/

# Note: training/ and models/ directories are optional
# App will use HuggingFace fallback models if models/ doesn't exist
# To include custom models, add them to models/ before building

# Non-root user with proper home directory for HuggingFace cache
RUN useradd --system --uid 1001 --create-home maia && \
    mkdir -p /home/maia/.cache && \
    chown -R maia:maia /home/maia /app

USER maia

# Set HuggingFace cache to writable location
ENV TRANSFORMERS_CACHE=/home/maia/.cache/huggingface \
    HF_HOME=/home/maia/.cache/huggingface

EXPOSE 8001

# Longer start-period for multi-model loading
HEALTHCHECK --interval=30s --timeout=15s --start-period=90s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
