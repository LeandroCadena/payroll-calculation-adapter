# Sprint 5 — Async Route Handler

## Goal

Add a reusable async route handler for Express controllers.

## Concepts Learned

Async controllers can fail by throwing errors or rejecting promises.

Instead of wrapping every controller with `try/catch`, errors are forwarded to the centralized error handler.

## Technologies Used

- Express
- TypeScript
- Centralized error handling

## Architecture

```txt
Request
↓
Route
↓
Async Handler
↓
Controller
↓
Error
↓
Centralized Error Handler
```

## Why This Approach?

This keeps controllers clean and makes error handling consistent.

## Benefits

- Less duplicated code.
- Cleaner controllers.
- Centralized error behavior.
- Better maintainability.

## Senior Notes

Express 5 improved async support, but an explicit wrapper still documents the intended error flow and keeps the codebase consistent.

## Files Created

```txt
src/infrastructure/http/async-handler.ts
src/infrastructure/http/index.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will introduce request context and trace identifiers for structured logging.
