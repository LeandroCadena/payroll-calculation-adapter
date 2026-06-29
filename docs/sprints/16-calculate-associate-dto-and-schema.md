# Sprint 16 — Calculate Associate DTO & Validation Schema

## Goal

Define the request and response contracts for the calculate-associate endpoint.

## Concepts Learned

DTOs describe the shape of data crossing application boundaries.

Schemas validate external data before it reaches business logic.

## Technologies Used

- TypeScript interfaces
- Zod validation schema

## Architecture

```txt
HTTP Request
↓
Zod Schema
↓
DTO Contract
↓
Controller
↓
Use Case
```

## Why This Approach?

The API receives external data, so it cannot be trusted.

Zod validates the runtime shape of the request, while TypeScript interfaces document the expected compile-time contracts.

## Benefits

- Stronger API boundary.
- Clear request contract.
- Safer business logic.
- Better future OpenAPI documentation.

## Senior Notes

TypeScript validates code at compile time.

Zod validates data at runtime.

Both are needed because external HTTP requests are not controlled by TypeScript.

## Files Created

```txt
src/modules/calculate-associate/calculate-associate.dto.ts
src/modules/calculate-associate/calculate-associate.schema.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add the calculate-associate route and controller.
