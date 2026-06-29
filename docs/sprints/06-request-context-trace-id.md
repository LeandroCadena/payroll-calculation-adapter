# Sprint 6 — Request Context & Trace ID

## Goal

Add request-level context using `AsyncLocalStorage`.

Each incoming HTTP request receives a unique `traceId`.

## Concepts Learned

`AsyncLocalStorage` allows Node.js applications to preserve context across asynchronous operations.

This is useful for observability because logs can be correlated across the entire request lifecycle.

## Technologies Used

- Node.js AsyncLocalStorage
- Express middleware
- crypto.randomUUID

## Architecture

```txt
HTTP Request
↓
Request Context Middleware
↓
AsyncLocalStorage
↓
Controller / Service / Client
↓
Logs include traceId
```

## Why This Approach?

Passing `traceId` manually through every function creates noise and increases coupling.

A request context centralizes this concern.

## Benefits

- Better traceability.
- Cleaner function signatures.
- Splunk-ready correlation.
- Foundation for future distributed tracing.

## Senior Notes

`AsyncLocalStorage` is powerful, but it should be used carefully.

It introduces a small runtime overhead, so it should be applied intentionally to cross-cutting concerns such as logging, tracing or request correlation.

## Files Created

```txt
src/infrastructure/http/request-context.ts
src/infrastructure/middleware/request-context.middleware.ts
```

## Files Updated

```txt
src/infrastructure/http/middlewares.ts
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

The next sprint will enhance the logger to automatically include request context metadata such as `traceId`.
