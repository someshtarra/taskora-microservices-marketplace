# Kubernetes Probes Architecture Guide for Polyglot Microservices

This architecture guide details the design, configuration, and operational best practices for **Kubernetes Startup, Liveness, and Readiness Probes** across microservices built in **Python**, **Go**, **Node.js**, and **Java**.

---

## 1. The Three Kubernetes Probes Explained

| Probe Type | What it Answers | Action Taken on Failure | Typical Frequency |
|---|---|---|---|
| **Startup Probe** | *"Has the application finished its cold-start initialization and warmup?"* | Kubelet stops other probes from running and restarts the pod only after `failureThreshold * periodSeconds` expires. | Fast interval (2-3s) during launch |
| **Liveness Probe** | *"Is the application in an unrecoverable deadlocked state?"* | Kubelet kills the container and creates a replacement container according to `restartPolicy`. | Periodic interval (10-15s) |
| **Readiness Probe** | *"Can the application currently accept and process incoming user traffic?"* | Kubelet removes the pod's IP from the Kubernetes Service endpoints list (no traffic routed). Does **NOT** restart the container. | Frequent interval (5-10s) |

---

## 2. Polyglot Microservice Implementation Matrix

In our **Taskora** platform, we employ a polyglot microservices topology tailored to language strengths:

```
[ Ingress / API Gateway ]
          │
          ├──► Python (FastAPI)             : AI & Semantic Search Microservice (Port 8001)
          ├──► Go (Golang)                  : Order, Milestones & Escrow Microservice (Port 8002)
          ├──► Node.js / TypeScript         : Real-Time Notifications & WebSocket Service (Port 8003)
          └──► Java (Spring Boot)           : Payment, Taxes & Billing Microservice (Port 8004)
```

---

### A. Python (FastAPI / Uvicorn) — AI Search Service

#### Probe Strategy
Python web services running under Uvicorn/Gunicorn are asynchronous. However, heavy CPU operations (like vector embedding computations or regex tokenization) can temporarily block the Global Interpreter Lock (GIL).

- **Liveness (`/healthz`)**: Returns a lightweight JSON status. Never execute database queries or LLM calls in liveness!
- **Readiness (`/readyz`)**: Confirms that vector databases (pgvector/Pinecone) and embedding model weights are loaded in memory.

#### Manifest Configuration
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8001
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /readyz
    port: 8001
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 2
```

---

### B. Go (Golang) — Order & Escrow Service

#### Probe Strategy
Go produces compiled, single-binary microservices. It has virtually **zero startup delay** (< 50ms) and minimal memory footprint.

- **Liveness (`/healthz`)**: Evaluated directly in memory by Go's `net/http` goroutines. Response times are typically `< 1ms`.
- **Readiness (`/readyz`)**: Validates that the internal ledger mutex and database connection pool (e.g. `sql.DB.Ping()`) are active.

#### Manifest Configuration
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8002
  initialDelaySeconds: 2
  periodSeconds: 10
  timeoutSeconds: 1
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /readyz
    port: 8002
  initialDelaySeconds: 2
  periodSeconds: 5
  timeoutSeconds: 1
  failureThreshold: 2
```

---

### C. Node.js / TypeScript — Notification & WebSocket Service

#### Probe Strategy
Node.js relies on a **single-threaded event loop**. If the event loop is blocked (e.g., intensive synchronous JSON parsing or regex evaluation), health check requests will time out.

- **Liveness (`/healthz`)**: Checks event loop health and heap memory usage (`process.memoryUsage()`). If memory exceeds container limits, liveness fails safely before an OS OOM kill.
- **Readiness (`/readyz`)**: Checks WebSocket connection listener capacity and event pub/sub subscription state.

#### Manifest Configuration
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8003
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /readyz
    port: 8003
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 2
```

---

### D. Java (Spring Boot 3) — Payment & Billing Service

#### Probe Strategy: The Crucial Role of `startupProbe`
Java/JVM applications represent the **#1 source of probe failures** in Kubernetes when configured improperly. 
- JVM startup requires class loading, Spring Context dependency injection, and JIT compilation (which can take 15 to 45 seconds).
- **The Anti-Pattern**: Setting a long `initialDelaySeconds: 60` on `livenessProbe` delays recovery if a running pod deadlocks later.
- **The Best Practice**: Use `startupProbe` with Spring Boot Actuator (`/actuator/health/liveness`). The startup probe grants up to 60 seconds (20 checks × 3s) for the JVM to warm up, after which the normal fast liveness probe takes over.

#### Manifest Configuration
```yaml
# Startup probe: gives JVM up to 20 * 3s = 60s to boot without killing the container
startupProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8004
  failureThreshold: 20
  periodSeconds: 3

# Liveness probe: only starts after startupProbe succeeds
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8004
  periodSeconds: 15
  timeoutSeconds: 3
  failureThreshold: 3

# Readiness probe: verifies HikariCP database connection pool & payment gateway reachability
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8004
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 2
```

---

## 3. Top 5 Kubernetes Probe Anti-Patterns to Avoid

1. **Checking Downstream Dependencies in Liveness Probes**:
   - *Never* check if the database, Redis, or an external payment API is available in a **Liveness Probe**. If the database goes down, all your microservice pods will fail their liveness checks and crash-loop simultaneously, amplifying the outage. Put external dependency checks in **Readiness Probes** instead.
2. **Missing `startupProbe` on Slow-Booting Languages**:
   - Always pair Java, .NET, or heavy Python/ML models with a `startupProbe`.
3. **Aggressive `timeoutSeconds` (e.g. 1 second) on Busy Services**:
   - Under heavy CPU load, a health check response might take 1.2s. Set `timeoutSeconds: 2` or `3` to prevent cascading pod reboots during traffic spikes.
4. **Heavy Computations inside Probe Endpoints**:
   - Keep probe endpoints minimal. They should return in `< 5ms`.
5. **Identical Paths for Liveness and Readiness**:
   - Separate `/healthz` (Is this process alive?) from `/readyz` (Can this process accept user requests?).
