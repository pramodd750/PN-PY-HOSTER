FROM python:3.11-slim-bookworm

# System deps: build tools + python headers
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    gcc \
    g++ \
    make \
    git \
    curl \
    nodejs \
    npm \
    bash \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# App code
COPY app.py .

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    RENDER_DISK_PATH=/var/data

# Persistent disk mount
RUN mkdir -p /var/data/data /var/data/user_files

EXPOSE 8080

# CRITICAL: --timeout 0 warna pip install ke waqt gunicorn worker kill karega
CMD ["sh", "-c", "gunicorn -w 1 -k gthread --threads 8 --timeout 0 --graceful-timeout 30 -b 0.0.0.0:${PORT:-8080} app:app"]
