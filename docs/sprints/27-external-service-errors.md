# Sprint 27 — External Service Error Types

## Goal

Introduce a dedicated error type for failures produced by external integrations.

The adapter communicates with external systems such as Payroll Builder and Calculation Engine. These failures are different from business validation errors and should be represented separately.

## Concepts Learned

Not all errors are the same.

A robust integration platform usually distinguishes between:

- Validation Errors
- Business Rule Errors
- External Service Errors
- Infrastructure Errors
- Unexpected System Errors

Each category may have different retry policies, monitoring rules and alerting strategies.

## Technologies Used

- TypeScript
- Custom Error Classes
- Centralized Error Handling
- Structured Logging

## Architecture

```txt
Processor
        │
        ▼
External Client
        │
        ├──────────────► Success
        │
        ▼
ExternalServiceError
        │
        ▼
Retry Policy
        │
        ▼
Processor
        │
        ▼
ERROR Status
```

## Why This Approach?

External integrations are one of the most common failure points in distributed systems.

By introducing a dedicated error type we can:

- identify integration failures quickly;
- retry only transient failures;
- expose meaningful logs;
- prepare the system for monitoring and alerting.

## Benefits

- Better observability.
- Clear separation of failure categories.
- Easier debugging.
- Foundation for retry and circuit breaker policies.
- Better production support.

## Senior Notes

Enterprise systems rarely retry every exception.

Typical retryable failures include:

- HTTP 429 (Too Many Requests)
- HTTP 503 (Service Unavailable)
- Network timeout
- Temporary DNS failures
- Temporary connection errors

Business validation failures should **never** be retried.

Separating external errors from business errors makes those decisions much easier.

## Files Created

```txt
src/shared/errors/external-service-error.ts
```

## Files Updated

```txt
src/shared/errors/index.ts

src/clients/payroll-builder/payroll-builder.mock-client.ts

src/clients/calculation-engine/calculation-engine.mock-client.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Temporarily modify one of the clients to throw:

```ts
throw new ExternalServiceError('payroll-builder', 'Simulated timeout');
```

Verify that:

- the Retry Policy is executed;
- structured logs are generated;
- after the last retry, the processor updates the calculation status to `ERROR`.

## What We Learned

- External integrations deserve their own error hierarchy.
- Retry logic depends on the error category.
- Strong typing improves observability.
- Error classification is a key part of enterprise integration platforms.

## What's Next?

The next sprint will improve the Retry Policy.

Instead of retrying every exception, the retry mechanism will determine whether an error is retryable based on its type.

This will prepare the project for future features such as:

- Circuit Breaker
- Dead Letter Queue (DLQ)
- Failure Metrics
- Automatic Alerting
