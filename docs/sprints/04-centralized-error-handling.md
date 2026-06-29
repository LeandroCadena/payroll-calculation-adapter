# Sprint 4 — Centralized Error Handling

## Goal

Add centralized error handling for HTTP requests.

## Concepts Learned

Express error middlewares receive four arguments: `error`, `req`, `res` and `next`.

This allows the application to handle errors in one place instead of duplicating error logic across controllers.

## Technologies Used

- Express error middleware
- TypeScript custom error class
- Pino logger

## Architecture

```txt
Request
↓
Route
↓
Controller / Service
↓
Error thrown
↓
Error Handler
↓
Standard JSON Error Response
```

## Why This Approach?

Centralized error handling keeps controllers clean and ensures API errors follow a consistent response format.

## Benefits

- Consistent error responses.
- Cleaner controllers.
- Better logging.
- Easier debugging.
- Foundation for future business errors.

## Senior Notes

Not all errors should be treated the same.

Expected errors should use custom application errors.

Unexpected errors should be logged as internal server errors without exposing sensitive details to the client.

## Files Created

```txt
src/shared/errors/application-error.ts
src/shared/errors/index.ts
src/infrastructure/middleware/error-handler.ts
```

## Files Updated

```txt
src/app.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add async route support so controllers can throw errors without manual try/catch blocks.
