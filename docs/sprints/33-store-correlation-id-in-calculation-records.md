# Sprint 33 — Store Correlation ID in Calculation Records

## Goal

Store the `correlationId` inside each calculation record and expose it through the calculation status endpoint.

## Concepts Learned

A Correlation ID should not only exist in logs.

It should also be part of the operation metadata so API consumers, developers and support teams can connect a business operation with its logs.

## Technologies Used

- TypeScript
- Repository Pattern
- Correlation ID Pattern
- Structured Logging

## Architecture

```txt
Calculate Associate Request
        │
        ▼
Create Correlation ID
        │
        ▼
Create Calculation Record
        │
        ▼
Store correlationId
        │
        ▼
Expose via Status Endpoint
```

## Why This Approach?

When a client queries a calculation status, returning the `correlationId` makes troubleshooting easier.

A support engineer can use the `correlationId` from the API response and search for it in logs or observability tools such as Splunk.

## Benefits

- Improves traceability.
- Connects API state with logs.
- Helps support and debugging workflows.
- Prepares the project for distributed tracing.
- Makes the status endpoint more useful.

## Senior Notes

Correlation IDs are most valuable when they are consistently available across:

- API responses
- Logs
- External service calls
- Queue messages
- Error reports

Storing the `correlationId` with the calculation record ensures the identifier is not lost after the initial request.

## Files Updated

```txt
src/repositories/calculations/calculation-status.types.ts

src/repositories/calculations/calculation-status.repository.ts

src/application/use-cases/calculate-associate/calculate-associate.use-case.ts

src/modules/calculations/get-calculation-status.controller.ts
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
2. Copy the returned `calculationGroupId`.
3. Query the status endpoint:

```bash
curl http://localhost:3000/api/v1/calculations/<calculationGroupId>
```

Expected response should include:

```json
{
  "calculationGroupId": "...",
  "correlationId": "...",
  "status": "CALCULATED"
}
```

## What We Learned

- Correlation IDs should be persisted as operation metadata.
- API responses can support operational troubleshooting.
- Observability is stronger when identifiers are available outside logs.
- Async workflows benefit from storing trace metadata with the business record.

## What's Next?

The next sprint will improve the client calls by propagating the `correlationId` to external integrations.

This will simulate how distributed systems pass correlation metadata from one service to another.
