# Sprint 43 — Metrics Endpoint

## Goal

Expose internal application metrics through an HTTP endpoint.

## Architecture

```txt
GET /internal/metrics
↓
Metrics Controller
↓
Metrics Service
↓
In-Memory Counters
```

## Senior Notes

Metrics endpoints are useful for debugging and observability.

In production, this endpoint would usually be protected or exposed only internally.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Start the app:

```bash
npm run dev
```

Call:

```bash
curl http://localhost:3000/internal/metrics
```

## What's Next?

The next sprint will introduce OpenAPI / Swagger documentation.
