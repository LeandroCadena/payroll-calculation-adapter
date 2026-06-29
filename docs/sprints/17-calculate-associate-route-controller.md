# Sprint 17 — Calculate Associate Route & Controller

## Goal

Expose the first version of the calculate-associate endpoint.

## Architecture

```txt
POST /api/v1/calculate-associate
↓
Validation Middleware
↓
Calculate Associate Controller
↓
202 Accepted Response
```

## Senior Notes

At this stage, the controller only returns the accepted response.

The actual use case and background processing will be added next.

## Files Created

```txt
src/modules/calculate-associate/calculate-associate.controller.ts
src/modules/calculate-associate/calculate-associate.routes.ts
src/modules/calculate-associate/index.ts
```

## Files Updated

```txt
src/infrastructure/http/routes.ts
```

## How to Test

```bash
npm run build
npm run lint
npm test
```
