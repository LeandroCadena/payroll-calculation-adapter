# Sprint 29 — Idempotency Key Foundation

## Goal

Create the foundation for idempotency support in calculate-associate requests.

## Architecture

```txt
Calculate Associate Request
↓
Stable Payload Selection
↓
SHA-256 Hash
↓
Idempotency Key
```

## Senior Notes

Idempotency is essential in async integrations.

If a client retries the same request because of a timeout or network failure, the system should avoid creating duplicated calculations.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will store idempotency keys in the calculation repository and return the existing calculation when the same request is received again.
