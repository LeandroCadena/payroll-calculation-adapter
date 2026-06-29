# Sprint 25 — Background Error Handling

## Goal

Ensure background processing always finishes in a known state.

## Concepts Learned

Long-running asynchronous processes should never leave operations in an intermediate state.

Unexpected failures must be handled gracefully.

## Architecture

```txt
Background Processor
        │
        ▼
try
        │
        ▼
Processing
        │
        ▼
CALCULATED
```

```txt
Background Processor
        │
        ▼
catch
        │
        ▼
Update Status ERROR
        │
        ▼
Structured Log
```

## Why This Approach?

Without centralized error handling, a failure could leave the calculation forever in `CALCULATING`.

Updating the final state guarantees that clients can always determine the outcome of the operation.

## Benefits

- Prevents orphan calculations.
- Improves observability.
- Prepares the project for retry strategies.
- Makes failures visible to API consumers.

## Senior Notes

Background workers should always finish in a terminal state.

In production systems, common terminal states are:

- COMPLETED
- FAILED
- CANCELLED

Leaving a process indefinitely in an intermediate state is considered an operational defect.

## Files Updated

```txt
src/application/processors/calculate-associate/calculate-associate.processor.ts
```

## How to Test

Force an exception inside the processor.

Verify that:

- The calculation status changes to `ERROR`.
- The error message is stored.
- A structured log is generated.

## What's Next?

The next sprint will introduce a Retry Policy with exponential backoff for transient failures.
