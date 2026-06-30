# Sprint 39 — Enterprise Health Checks

## Goal

Improve health endpoints with dependency-level readiness information.

## Architecture

```txt
GET /health
↓
Service status
↓
Dependency checks
↓
Response
```

## Senior Notes

Liveness and readiness are different.

Liveness answers: "Is the process alive?"

Readiness answers: "Can this service receive traffic?"

In production, readiness may depend on databases, queues, OAuth providers and external services.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Open:

```txt
http://localhost:3000/health
http://localhost:3000/health/live
http://localhost:3000/health/ready
```

## What's Next?

The next sprint will improve the configuration module and centralize service-level settings.
