# Sprint 30 — Idempotency Repository Support

## Goal

Store idempotency keys and reuse an existing calculation when the same logical request is received again.

## Architecture

```txt
Calculate Associate Request
↓
Generate Idempotency Key
↓
Find Existing Calculation
↓
Return Existing Calculation or Create New One
```

## Senior Notes

Idempotency prevents duplicate async processing when clients retry requests because of timeouts or network failures.

In production, idempotency keys should be stored in durable persistence such as PostgreSQL or Redis.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Send the same calculate-associate request twice.

Both responses should return the same `calculationGroupId`.
