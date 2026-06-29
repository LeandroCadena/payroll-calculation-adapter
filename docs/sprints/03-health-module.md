# Sprint 3 — Health Module

## Goal

Implement basic health check endpoints for the service.

## Concepts Learned

Health endpoints are commonly used by Docker, Kubernetes, load balancers and monitoring tools to determine if a service is running and ready to receive traffic.

## Technologies Used

- Express: exposes HTTP endpoints.
- TypeScript: defines the health response contract.

## Architecture

```txt
GET /health
GET /health/live
GET /health/ready
        ↓
Health Routes
        ↓
Health Controller
        ↓
Health Service
        ↓
Health Response
```

## Why This Approach?

The Health module is implemented as an independent feature module.

This keeps all health-related files together:

```txt
src/modules/health/
├── controller.ts
├── service.ts
├── routes.ts
└── index.ts
```

## Benefits

- Keeps `app.ts` clean.
- Makes health checks reusable and testable.
- Prepares the app for Docker, Kubernetes and cloud deployments.
- Follows the same module pattern we will use for future features.

## Senior Notes

`/health/live` and `/health/ready` are intentionally different.

`live` usually means the process is alive.

`ready` usually means the app is ready to receive traffic.

In future sprints, `/health/ready` may verify dependencies such as database, external services or message queues.

## Files Created

```txt
src/modules/health/service.ts
src/modules/health/controller.ts
src/modules/health/routes.ts
src/modules/health/index.ts
```

## Files Updated

```txt
src/infrastructure/http/routes.ts
```

## How to Test

Run:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/health
http://localhost:3000/health/live
http://localhost:3000/health/ready
```

## Common Mistakes

Do not put business logic inside health controllers.

Do not make `/health/live` depend on external services, because if one dependency fails, Kubernetes may restart a healthy application unnecessarily.

## What's Next?

The next sprint will add centralized error handling and async route support.
