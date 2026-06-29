# Sprint 7 — Context-Aware Logger

## Goal

Enhance the logger to automatically include request context metadata.

## Concepts Learned

Structured logs become more useful when they include correlation identifiers such as `traceId`.

This allows developers and observability tools to connect all logs produced during the same request.

## Technologies Used

- Pino
- AsyncLocalStorage
- Express middleware

## Architecture

```txt
HTTP Request
↓
Request Context Middleware
↓
AsyncLocalStorage stores traceId
↓
Logger mixin reads current context
↓
Log output includes traceId
```

## Why This Approach?

The logger reads the current request context automatically.

This avoids passing `traceId` manually to every function.

## Benefits

- Cleaner code.
- Better observability.
- Splunk-ready structured logs.
- Easier debugging across async flows.

## Senior Notes

A trace identifier is only useful when it is consistently attached to logs.

Automating this at the logger level reduces developer mistakes and improves operational visibility.

## Files Updated

```txt
src/infrastructure/logger/logger.ts
```

## How to Test

Run:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/health
```

The logs should include a `traceId` field when logging occurs inside a request lifecycle.

## What's Next?

The next sprint will introduce request logging so every HTTP request produces structured logs.
