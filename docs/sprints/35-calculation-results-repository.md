# Sprint 35 — Calculation Results Repository

## Goal

Persist payroll calculation results independently from calculation execution metadata.

## Concepts Learned

Execution metadata and business results represent different concepts.

The execution record answers:

- What happened?
- When did it happen?
- Did it succeed?

The calculation results answer:

- What payroll values were produced?

Keeping both models separated improves maintainability and follows common enterprise data modeling practices.

## Technologies Used

- TypeScript
- Repository Pattern
- In-Memory Persistence

## Architecture

```txt
Calculation Engine
        │
        ▼
Calculation Results Repository
        │
        ▼
Persist Results
        │
        ▼
Update Calculation Status
```

## Why This Approach?

Separating execution metadata from business results makes the domain model clearer.

Future implementations can persist these repositories independently without changing the processor.

## Benefits

- Better separation of responsibilities.
- Cleaner domain model.
- Easier future migration to PostgreSQL.
- Supports result queries without coupling them to execution metadata.

## Senior Notes

Enterprise systems frequently separate "Job" tables from "Result" tables.

This allows:

- different retention policies;
- optimized queries;
- independent scaling;
- better reporting.

## Files Created

```txt
src/repositories/calculation-results/
├── calculation-results.types.ts
├── calculation-results.repository.ts
└── index.ts
```

## Files Updated

```txt
src/application/processors/calculate-associate/calculate-associate.processor.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Execute a calculation and verify that:

- results are persisted;
- status changes to `CALCULATED`;
- no errors are logged.

## What We Learned

- Execution metadata is different from business data.
- Separating repositories improves maintainability.
- Persisting results before updating status prevents inconsistent states.

## What's Next?

The next sprint will expose:

```http
GET /api/v1/calculations/{calculationGroupId}/results
```

allowing clients to retrieve the calculated payroll results.
