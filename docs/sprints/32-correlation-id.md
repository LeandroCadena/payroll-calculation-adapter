# Sprint 32 — Correlation ID

## Goal

Introduce Correlation IDs to trace a single business operation across multiple services.

## Concepts Learned

Distributed systems generate logs from multiple components.

Without a shared identifier, following a single request becomes extremely difficult.

A Correlation ID uniquely identifies one execution flow and is propagated across all services involved.

## Technologies Used

- Node.js `crypto.randomUUID`
- Structured Logging
- Distributed Tracing Concepts

## Architecture

```txt
HTTP Request
        │
        ▼
Correlation ID
        │
        ▼
Payroll Adapter
        │
        ▼
Payroll Builder
        │
        ▼
Calculation Engine
        │
        ▼
Future Notification Service
```

## Why This Approach?

Every log generated during the calculation process will contain the same Correlation ID.

This allows engineers to reconstruct the complete execution flow using log aggregation tools such as Splunk.

## Benefits

- Easier troubleshooting.
- Better observability.
- Faster incident resolution.
- Production-ready logging.
- Compatible with distributed architectures.

## Senior Notes

Correlation IDs are different from Request IDs.

- Request ID identifies one HTTP request.
- Correlation ID identifies the complete business transaction.

A business transaction may span multiple HTTP requests, queues, workers and services while preserving the same Correlation ID.

## Files Created

```txt
src/shared/correlation/
├── correlation-id.ts
└── index.ts
```

## Files Updated

```txt
src/application/use-cases/calculate-associate/calculate-associate.use-case.ts

src/application/processors/calculate-associate/calculate-associate.processor.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Start the application and send a calculation request.

Verify that every log generated during the processing contains the same `correlationId`.

## What We Learned

- Correlation IDs are fundamental in distributed systems.
- Every service should propagate the same identifier.
- Log aggregation platforms such as Splunk become much more useful when Correlation IDs are present.
- This pattern prepares the project for future microservices and queue-based processing.

## What's Next?

The next sprint will introduce an `ExecutionContext`, grouping together metadata such as:

- correlationId
- calculationGroupId
- requesterAOID
- timestamps

This will reduce parameter passing and make the processing pipeline cleaner.
