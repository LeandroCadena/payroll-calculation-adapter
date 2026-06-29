# Sprint 28 — Retryable Error Handling

## Goal

Improve the retry policy so it only retries errors that are safe to retry.

## Architecture

```txt
External Client
↓
ExternalServiceError retryable=true/false
↓
Retry Policy
↓
Retry or Fail Fast
```

## Senior Notes

A retry policy should not retry every error.

Business errors and validation errors are usually permanent failures and should fail fast.

Transient external errors may be retried.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add idempotency support for calculate-associate requests.
