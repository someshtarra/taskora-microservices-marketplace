FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

EXPOSE 8003

# Liveness check on port 8003
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -qO- http://localhost:8003/healthz || exit 1

CMD ["node", "dist/index.js"]
