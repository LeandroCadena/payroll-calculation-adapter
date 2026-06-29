# Sprint 24 — Extract Calculate Associate Processor

## Goal

Extract the background calculation workflow from the use case into a dedicated processor.

## Concepts Learned

A use case should orchestrate the initial application action, but long-running background work can be delegated to a processor.

## Architecture

```txt
Controller
↓
Use Case
↓
Background Dispatcher
↓
Calculate Associate Processor
↓
Payroll Builder
↓
Business Validation
↓
Mapper
↓
Calculation Engine
↓
Update Status
```

## Benefits

- Keeps the use case small.
- Makes the background workflow easier to test.
- Prepares the project for future worker-based execution.
- Makes the async flow closer to a real enterprise integration system.

## Senior Notes

Processors are useful when a flow may later move to a worker, queue, Lambda, or background job system.

The controller and use case should not need to change if the execution mechanism changes later.

## Files Created

```txt
src/application/processors/calculate-associate/calculate-associate.processor.ts
src/application/processors/calculate-associate/index.ts
```

## Files Updated

```txt
src/application/use-cases/calculate-associate/calculate-associate.use-case.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will improve error handling inside the background processor so failed calculations update their status to `ERROR`.
