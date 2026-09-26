FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

# Liveness probe endpoint configured for port 8001
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD curl -f http://localhost:8001/healthz || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
