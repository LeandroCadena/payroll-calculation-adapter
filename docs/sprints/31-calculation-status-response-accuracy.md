# Sprint 31 — Calculation Status Response Accuracy

## Goal

Improve the idempotency flow by returning the real status of an existing calculation instead of always returning `CALCULATING`.

## Concepts Learned

Idempotency is not only about preventing duplicate work.

It is also about returning a consistent representation of the current state of the operation.

If the same logical request is received again, the client should receive the latest status of that calculation.

## Technologies Used

- TypeScript
- Idempotency Pattern
- Repository Pattern
- Asynchronous Processing

## Architecture

```txt
Incoming Request
        │
        ▼
Generate Idempotency Key
        │
        ▼
Calculation Repository
        │
        ├──────────────► Existing Calculation
        │                     │
        │                     ▼
        │            Return Current Status
        │
        ▼
Create New Calculation
        │
        ▼
Background Processing
```

## Why This Approach?

Clients often retry requests after:

- HTTP timeouts
- Network interruptions
- Load balancer retries
- Temporary infrastructure failures

Without idempotency, those retries could create duplicated payroll calculations.

Returning the current status of the existing calculation guarantees consistency and avoids unnecessary processing.

## Benefits

- Prevents duplicated calculations.
- Returns deterministic responses.
- Improves client experience.
- Reduces unnecessary background processing.
- Makes the API safer for automatic retries.

## Senior Notes

A common mistake is to always return `CALCULATING` when a duplicate request is received.

Instead, the API should return the actual current status.

Example:

```txt
First Request

↓

202 Accepted
Status = CALCULATING

↓

Background Worker

↓

Status = CALCULATED

↓

Second Request

↓

200/202

Status = CALCULATED
```

This behavior allows clients to recover gracefully from communication failures.

## Files Updated

```txt
src/application/use-cases/calculate-associate/calculate-associate.use-case.ts

src/modules/calculate-associate/calculate-associate.dto.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Start the application:

```bash
npm run dev
```

1. Send a `POST /api/v1/calculate-associate`.
2. Wait until the background processor completes.
3. Send the exact same request again.
4. Verify that:
   - The same `calculationGroupId` is returned.
   - The response contains the latest status (`CALCULATED` or `ERROR`).
   - No new background task is started.

## What We Learned

- Idempotency is about consistency, not only deduplication.
- Existing operations should always expose their latest state.
- Async APIs should be deterministic when handling retries.
- Returning the current status improves resilience and simplifies client implementations.

## What's Next?

The next sprint will introduce **Correlation IDs** that will travel across the entire processing pipeline.

Every log generated during a calculation will include the same correlation identifier, making it possible to trace a request across multiple services such as:

- Payroll Calculation Adapter
- Payroll Builder
- Calculation Engine

This is one of the most common observability practices used in distributed systems.
