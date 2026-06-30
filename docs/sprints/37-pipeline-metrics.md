# Sprint 37 — Pipeline Metrics

## Goal

Measure the duration of important pipeline steps during calculate-associate processing.

## Architecture

```txt
Processor
↓
Measure Payroll Builder
↓
Measure Calculation Engine
↓
Log Pipeline Metrics
```

## Senior Notes

Pipeline metrics help identify slow external services and bottlenecks.

In production, these metrics could be sent to Splunk, CloudWatch, Prometheus, Datadog or OpenTelemetry.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Execute a calculation and verify that logs include pipeline metrics.

## What's Next?

The next sprint will introduce a log context helper to standardize structured log metadata.
