# Sprint 9 — Validation Infrastructure

## Goal

Add reusable request validation middleware.

## Concepts Learned

External input should be validated before reaching business logic.

## Technologies Used

- Zod
- Express middleware
- Centralized error handling

## Architecture

```txt
HTTP Request
↓
Validation Middleware
↓
Controller
↓
Service / Use Case
```

## Benefits

- Prevents invalid data from entering business logic.
- Keeps controllers cleaner.
- Reuses the same validation pattern across modules.
- Prepares the project for calculate-associate validation.

## Senior Notes

Validation should happen at system boundaries.

HTTP requests, environment variables and external service responses are all boundaries where data cannot be fully trusted.

## Files Created

```txt
src/infrastructure/middleware/validate-request.middleware.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will improve validation errors so the API returns field-level details.
