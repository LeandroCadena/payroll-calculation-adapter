# Sprint 21 — Business Validations

## Goal

Add payroll business validations using enriched data returned by Payroll Builder.

## Architecture

```txt
Payroll Builder Response
↓
Business Validation
↓
Continue Processing or Fail
```

## Senior Notes

Request validation and business validation are different.

Request validation checks the shape of incoming data.

Business validation checks whether the data makes sense according to payroll rules.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add mapping from Payroll Builder data to Calculation Engine input.
