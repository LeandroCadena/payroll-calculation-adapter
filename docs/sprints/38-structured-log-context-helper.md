# Sprint 38 — Structured Log Context Helper

## Goal

Create a shared helper to standardize log metadata across the processing pipeline.

## Architecture

```txt
Processor
↓
Create Log Context
↓
Structured Logs
↓
Splunk-ready metadata
```

## Senior Notes

Structured logs are most useful when teams follow consistent field names.

A helper reduces duplicated metadata and avoids inconsistent log shapes.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Execute a calculation and verify logs include consistent fields:

```txt
correlationId
calculationGroupId
requesterAOID
```

## What's Next?

The next sprint will improve health checks with dependency-level readiness.
