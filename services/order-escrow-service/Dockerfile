# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app
COPY go.mod ./
COPY main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o order-service main.go

# Production scratch/alpine container (< 15MB)
FROM alpine:3.19

RUN apk --no-cache add ca-certificates curl
WORKDIR /root/
COPY --from=builder /app/order-service .

EXPOSE 8002

# Liveness probe on port 8002
HEALTHCHECK --interval=10s --timeout=2s --retries=3 CMD curl -f http://localhost:8002/healthz || exit 1

CMD ["./order-service"]
