# Sprint 8 — HTTP Request Logging

## Goal

Add structured logging for every HTTP request.

## Concepts Learned

HTTP request logs help monitor traffic, latency, status codes and failures.

## Technologies Used

- Express middleware
- Pino
- AsyncLocalStorage

## Architecture

```txt
HTTP Request
↓
Request Context Middleware
↓
Request Logger Middleware
↓
Routes
↓
Response Finished
↓
Structured Log
```

## Benefits

- Every request is logged.
- Logs include method, path, status code and duration.
- Logs also include traceId through the context-aware logger.
- The output is ready for observability tools like Splunk.

## Senior Notes

Request logging should happen after the response finishes so the log can include the final status code and request duration.

## Files Created

```txt
src/infrastructure/middleware/request-logger.middleware.ts
```

## Files Updated

```txt
src/infrastructure/http/middlewares.ts
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

You should see a structured log containing method, path, statusCode, durationMs and traceId.

## What's Next?

The next sprint will introduce validation infrastructure with Zod.
