# Sprint 20 — Mock Payroll Builder Client

## Goal

Add a mock Payroll Builder client to simulate the external Go service used to enrich associate payroll data.

## Concepts Learned

External integrations should be isolated behind clients.

This allows the application to use a mock implementation during development and replace it later with a real HTTP client without changing the use case.

## Technologies Used

- TypeScript
- Mock client pattern
- OAuth token usage
- Background processing

## Architecture

```txt
Calculate Associate Use Case
↓
Get Valid OAuth Token
↓
Payroll Builder Client
↓
Mock Payroll Builder Data
↓
Continue Processing
```

## Why This Approach?

The real Payroll Builder service will be implemented later.

For now, the adapter simulates its response while keeping the architecture ready for a real external integration.

## Benefits

- Keeps the use case close to the real enterprise flow.
- Isolates external service communication.
- Prepares the project for future Go service integration.
- Keeps business orchestration clean.

## Senior Notes

Mocks should simulate behavior, not replace architecture.

The mock client keeps the same contract that a real client would expose later.

## Files Created

```txt
src/clients/payroll-builder/payroll-builder.types.ts
src/clients/payroll-builder/payroll-builder.mock-client.ts
src/clients/payroll-builder/index.ts
```

## Files Updated

```txt
src/application/use-cases/calculate-associate/calculate-associate.use-case.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Then call:

```bash
curl -X POST http://localhost:3000/api/v1/calculate-associate \
  -H "Content-Type: application/json" \
  -d '{
    "requesterAOID": "G3A1VB1MR5A1KTYJ",
    "calculateAssociate": [
      {
        "organizationOID": "G3F4HH2X9K5DP07C",
        "payrollProfileID": "PAYROLL_PROFILE_001",
        "paymentGroupID": "PAYMENT_GROUP_001",
        "countryCode": "US",
        "payPeriodID": "2026-06",
        "calculationTypeCode": "GROSS_TO_NET",
        "payDate": "2026-06-30",
        "associateOID": "G3NV1ECB2Q031KH2",
        "associateWeeklyStandardHours": 40
      }
    ]
  }'
```

## What's Next?

The next sprint will add business validations using the data returned by Payroll Builder.
