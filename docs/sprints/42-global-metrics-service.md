# Sprint 42 — Global Metrics Service

## Goal

Add an in-memory metrics service to track high-level application behavior.

## Architecture

```txt
Use Case / Processor / Retry Policy
↓
Metrics Service
↓
In-Memory Counters
```

## Senior Notes

This is not a production metrics system yet.

In production, these counters would normally be exported to tools such as Prometheus, CloudWatch, Datadog, Grafana or OpenTelemetry.

## Metrics Added

```txt
calculationsStarted
calculationsCompleted
calculationsFailed
externalCalls
retries
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will expose metrics through an internal endpoint.
