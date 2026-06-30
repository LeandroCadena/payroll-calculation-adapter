# Sprint 45 — Integration Tests

## Goal

Add integration tests for the main calculate-associate API flow.

## Architecture

```txt
Supertest
↓
Express App
↓
Routes
↓
Validation
↓
Controller
↓
Use Case
```

## Senior Notes

Integration tests validate that multiple layers work together.

They are especially valuable for APIs because they verify routing, middleware, validation and response contracts.

## How to Test

Run:

```bash
npm run test
npm run build
npm run lint
```

## What's Next?

The next sprint will improve Docker production readiness.
