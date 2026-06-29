# Sprint 34 — Propagate Correlation ID to External Clients

## Goal

Propagate the `correlationId` to external integration clients.

## Architecture

```txt
Processor
↓
Payroll Builder Client
↓
Calculation Engine Client
```

## Senior Notes

Correlation metadata should travel across service boundaries.

In real systems, this is usually sent through HTTP headers, queue message attributes or tracing context.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add response persistence for calculation results.
