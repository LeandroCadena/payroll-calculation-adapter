# Sprint 23 — Mock Calculation Engine Client

## Goal

Add a mock Calculation Engine client to simulate the external payroll calculation service.

## Concepts Learned

The adapter should never contain the payroll calculation algorithm itself.

Its responsibility is to orchestrate the process, prepare the request and delegate the calculation to the Calculation Engine.

This separation follows the Single Responsibility Principle (SRP) and mirrors the architecture used in enterprise integration platforms.

## Technologies Used

- TypeScript
- Mock Client Pattern
- OAuth Token Revalidation
- Structured Logging

## Architecture

```txt
Calculate Associate Processor
        │
        ▼
Revalidate OAuth Token
        │
        ▼
Calculation Engine Client
        │
        ▼
Payroll Calculation
        │
        ▼
Calculation Results
```

## Why This Approach?

The Calculation Engine is an external service.

Today we simulate it with an in-memory implementation, but tomorrow it can become:

- HTTP REST API
- gRPC service
- Queue Consumer
- Independent Go repository
- Independent Java service

The processor will not need to change.

## Benefits

- Decouples payroll calculation from the adapter.
- Makes the project closer to a real distributed architecture.
- Simplifies testing.
- Allows replacing the implementation without modifying business orchestration.

## Senior Notes

Adapters should orchestrate business workflows, not execute payroll calculations.

The payroll calculation algorithm belongs to the Calculation Engine.

Keeping those responsibilities separated improves maintainability and scalability.

## Files Created

```txt
src/clients/calculation-engine/
├── calculation-engine.types.ts
├── calculation-engine.mock-client.ts
└── index.ts
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

Start the application:

```bash
npm run dev
```

Send a calculation request:

```bash
POST /api/v1/calculate-associate
```

Verify that the logs show:

```txt
Payroll builder data received

↓

Payroll builder data mapped to calculation engine input

↓

Calculation engine completed payroll calculation

↓

Calculation status updated to CALCULATED
```

## What We Learned

- External systems should always be isolated behind clients.
- OAuth tokens may need to be refreshed before every external integration.
- Mapping and validation belong to the adapter.
- Payroll calculations belong to the Calculation Engine.

## What's Next?

The next sprint will improve the background processor by handling failures gracefully.

Instead of allowing exceptions to terminate the process, every unexpected error will update the calculation status to **ERROR**, log the failure with the corresponding `traceId`, and prepare the foundation for future retry policies.
