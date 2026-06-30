# Sprint 41 — Request Context Metadata

## Goal

Extend the request context with request-level metadata.

## Architecture

```txt
HTTP Request
↓
Request Context Middleware
↓
AsyncLocalStorage
↓
requestId / traceId / startedAt
↓
Logger
```

## Senior Notes

A request ID identifies a single HTTP request.

A trace ID helps correlate logs inside the same request lifecycle.

A correlation ID identifies the larger business transaction, which may continue beyond the original HTTP request.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Call any endpoint and verify the logs include:

```txt
requestId
traceId
```

## What's Next?

The next sprint will add a global metrics service to track calculation counts and integration behavior.
