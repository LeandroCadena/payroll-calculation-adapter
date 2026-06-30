# Sprint 36 — Calculation Results Endpoint

## Goal

Expose an endpoint to retrieve payroll calculation results after a calculation has completed.

## Architecture

```txt
GET /api/v1/calculations/:calculationGroupId/results
        │
        ▼
Validate Calculation Exists
        │
        ▼
Validate Status Is CALCULATED
        │
        ▼
Read Calculation Results
        │
        ▼
Return Results
```

## Senior Notes

A client should not retrieve calculation results while the operation is still running.

For that reason, the endpoint returns `409 CONFLICT` when the calculation exists but has not reached `CALCULATED`.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Create a calculation, wait until it finishes, then call:

```bash
curl http://localhost:3000/api/v1/calculations/<calculationGroupId>/results
```

## What's Next?

The next sprint will introduce pipeline metrics to measure each processing stage.
