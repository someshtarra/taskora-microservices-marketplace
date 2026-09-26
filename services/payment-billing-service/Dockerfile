# Build stage using Maven and Eclipse Temurin OpenJDK 21
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder

WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8004

# Spring Boot Actuator Liveness & Readiness Probes on port 8004
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -qO- http://localhost:8004/actuator/health/liveness || exit 1

CMD ["java", "-jar", "app.jar"]
