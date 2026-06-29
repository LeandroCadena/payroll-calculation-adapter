# Sprint 1.8 — Base Routes Registration

## Goal

Centralize HTTP route registration.

Instead of registering routes directly inside `app.ts`, the application delegates that responsibility to a dedicated infrastructure module.

This keeps the application bootstrap simple and makes the project easier to scale.

---

## Why Register Routes Separately?

As projects grow, the number of endpoints increases considerably.

Having every route registered directly inside `app.ts` quickly becomes difficult to maintain.

Instead, all route registration is centralized inside:

```text
src/infrastructure/http/routes.ts
```

This file is responsible only for connecting Express with the application's modules.

---

## Current Route

At this stage, the application exposes a single endpoint.

```http
GET /
```

Response

```json
{
  "service": "payroll-calculation-adapter",
  "status": "running"
}
```

Its purpose is simply to verify that the application is running correctly.

---

## Future Routes

As the project evolves, this file will register additional modules.

```text
GET  /health
GET  /health/live
GET  /health/ready

POST /api/v1/calculate-associate

GET  /api/v1/calculations/:calculationGroupId

POST /oauth/token
```

Notice that route registration remains centralized, while each module owns its own implementation.

---

## Benefits

Separating route registration provides several advantages:

- Keeps `app.ts` small.
- Makes API versioning easier.
- Improves readability.
- Allows feature modules to be added independently.
- Reduces merge conflicts in larger teams.

---

## Senior Note

Many enterprise applications don't register routes directly in the application entry point.

Instead, they use a dedicated routing module that acts as the composition root for HTTP endpoints.

This approach becomes especially valuable once multiple API versions (`v1`, `v2`) or dozens of modules are introduced.

---

## Files Added

```text
src/
└── infrastructure/
    └── http/
        └── routes.ts
```

---

## How to Test

Start the application:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/
```

Expected response:

```json
{
  "service": "payroll-calculation-adapter",
  "status": "running"
}
```

---

## What's Next?

The next sprint introduces the **Health Module**, which will expose:

- `GET /health`
- `GET /health/live`
- `GET /health/ready`

These endpoints are commonly used by Docker, Kubernetes and load balancers to determine the application's health.
