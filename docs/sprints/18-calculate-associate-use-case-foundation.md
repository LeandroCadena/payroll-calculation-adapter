# Sprint 18 — Calculate Associate Use Case Foundation

## Goal

Move the calculate-associate orchestration from the HTTP controller into an application use case.

## Concepts Learned

A controller should not contain business orchestration.

The controller belongs to the HTTP layer, while the use case belongs to the application layer.

The use case is responsible for coordinating the business flow.

## Technologies Used

- TypeScript
- Node.js `crypto.randomUUID`
- Background Task Dispatcher
- In-memory calculation repository
- Pino logger

## Architecture

```txt
POST /api/v1/calculate-associate
↓
Validation Middleware
↓
Controller
↓
Calculate Associate Use Case
↓
Create Calculation Record
↓
Dispatch Background Task
↓
Return 202 Accepted
```

## Why This Approach?

The calculate-associate process will grow into a multi-step async workflow.

Keeping this orchestration inside a use case makes the flow easier to test, extend and explain.

## Benefits

- Keeps controllers thin.
- Moves business orchestration into the application layer.
- Creates calculation status immediately.
- Starts background processing without blocking the HTTP response.
- Prepares the flow for Payroll Builder and Calculation Engine integrations.

## Senior Notes

Returning `202 Accepted` is appropriate when the request has been accepted but processing is not complete yet.

This pattern is common in long-running operations, batch processing and integration workflows.

## Files Created

```txt
src/application/use-cases/calculate-associate/calculate-associate.use-case.ts
src/application/use-cases/calculate-associate/index.ts
```

## Files Updated

```txt
src/modules/calculate-associate/calculate-associate.controller.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Then start the app:

```bash
npm run dev
```

Call:

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

Expected response:

```json
{
  "calculationGroupId": "uuid",
  "status": "CALCULATING",
  "message": "Calculation request accepted and is being processed asynchronously"
}
```

## Common Mistakes

Do not perform long-running work inside the controller.

Do not block the HTTP response while processing payroll calculations.

Do not let the controller directly update repositories or call external clients.

## What's Next?

The next sprint will expose an endpoint to query the calculation status by `calculationGroupId`.
