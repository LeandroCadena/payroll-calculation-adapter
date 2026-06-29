# Sprint 12 — OAuth Token Endpoint

## Goal

Expose a mock OAuth token endpoint.

## Concepts Learned

OAuth token endpoints are commonly used to simulate or implement machine-to-machine authentication flows.

## Technologies Used

- Express
- TypeScript
- Async route handler

## Architecture

```txt
POST /oauth/token
↓
OAuth Routes
↓
OAuth Controller
↓
OAuth Token Service
↓
Token Response
```

## Senior Notes

In this project, the OAuth endpoint is a simulation.

In a production system, the adapter would usually call an external Identity Provider instead of issuing its own token.

## Files Created

```txt
src/modules/oauth/oauth-token.controller.ts
src/modules/oauth/oauth-token.routes.ts
```

## Files Updated

```txt
src/modules/oauth/index.ts
src/infrastructure/http/routes.ts
```

## How to Test

Run:

```bash
npm run dev
```

Call:

```bash
curl -X POST http://localhost:3000/oauth/token
```

## What's Next?

The next sprint will add the calculation status model and repository.
