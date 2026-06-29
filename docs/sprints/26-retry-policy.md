# Sprint 26 — Retry Policy

## Goal

Add a reusable retry policy for transient external integration failures.

## Architecture

```txt
Processor
↓
executeWithRetry
↓
External Client
↓
Success or Retry
```

## Senior Notes

Retries should be used carefully.

They are useful for transient failures such as timeouts, temporary network issues or service throttling.

They should not be used blindly for validation errors or permanent business failures.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will introduce external service error types.
