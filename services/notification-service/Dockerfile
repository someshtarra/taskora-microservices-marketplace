FROM node:20-alpine

WORKDIR /app

COPY package.json ./
# Run native node directly with modern ES modules
COPY src ./src

EXPOSE 8003

# Liveness check on port 8003
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -qO- http://localhost:8003/healthz || exit 1

CMD ["node", "--loader", "tsx", "src/index.ts"]
