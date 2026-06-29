# Sprint 22 — Calculation Engine Mapper

## Goal

Map Payroll Builder data into the input format expected by the Calculation Engine.

## Architecture

```txt
Payroll Builder Response
↓
Business Validation
↓
Mapper
↓
Calculation Engine Input
```

## Senior Notes

Mapping keeps external service models isolated.

A downstream system should not depend directly on the response shape of an upstream system.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add the mock Calculation Engine client.
