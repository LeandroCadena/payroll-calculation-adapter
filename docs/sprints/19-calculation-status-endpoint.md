# Sprint 19 — Calculation Status Endpoint

## Goal

Expose an endpoint to query the current status of an asynchronous calculation.

## Architecture

```txt
GET /api/v1/calculations/:calculationGroupId
↓
Calculation Status Route
↓
Controller
↓
Calculation Repository
↓
Response
```

## Senior Notes

Async APIs should provide a way for clients to query operation status.

This is commonly used with `202 Accepted` workflows where processing continues after the initial HTTP response.

## How to Test

Run:

```bash
npm run dev
```

First create a calculation with:

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

Then call:

```bash
curl http://localhost:3000/api/v1/calculations/<calculationGroupId>
```
