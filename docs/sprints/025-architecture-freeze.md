# Sprint 2.5 — Architecture Freeze

## Goal

Freeze the core architecture before continuing with feature development.

This sprint defines the project structure, dependency rules, naming conventions, module boundaries, use-case strategy and OAuth token lifecycle.

## Final Source Structure

```txt
src/
├── application/
├── clients/
├── config/
├── domain/
├── infrastructure/
├── modules/
├── shared/
├── app.ts
└── server.ts
```

## Layer Responsibilities

### application/

Contains use cases.

Use cases orchestrate business flows such as calculate-associate.

### modules/

Contains HTTP-facing feature modules.

A module may include routes, controller, schemas, DTOs and index exports.

### clients/

Contains external service clients.

Examples:

- payroll-builder
- calculation-engine

### domain/

Contains business models, domain types and domain rules.

### infrastructure/

Contains technical framework concerns.

Examples:

- HTTP setup
- logger
- middleware
- observability

### shared/

Contains small reusable utilities, errors and shared types.

## Dependency Direction

```txt
Routes
↓
Controllers
↓
Use Cases
↓
Domain / Repositories / Clients
↓
External Systems
```

Controllers should not call clients directly.

Business logic should not live inside controllers.

Infrastructure should not contain payroll business rules.

## Module Structure

Large modules should follow this pattern:

```txt
modules/calculate-associate/
├── calculate-associate.controller.ts
├── calculate-associate.routes.ts
├── calculate-associate.schema.ts
├── calculate-associate.dto.ts
└── index.ts
```

## Use Case Structure

```txt
application/calculate-associate/
├── calculate-associate.use-case.ts
├── calculate-associate.types.ts
└── index.ts
```

## Naming Convention

Use descriptive names.

```txt
calculate-associate.controller.ts
calculate-associate.routes.ts
calculate-associate.schema.ts
calculate-associate.use-case.ts
payroll-builder.client.ts
calculation-engine.client.ts
```

## Functions vs Classes

Prefer functions by default.

Use classes only when they provide clear value such as state, polymorphism or dependency injection patterns.

## OAuth Token Lifecycle

OAuth tokens must not be assumed valid during the entire async process.

The process may take longer than expected, so the token must be revalidated before each external service call.

```txt
Async Process
↓
Validate token
↓
Call Payroll Builder
↓
Revalidate token
↓
Business validation and mapping
↓
Revalidate token
↓
Call Calculation Engine
↓
Update final status
```

## Token Strategy

The OAuth service will expose:

```txt
getValidToken()
isTokenExpired()
isTokenExpiringSoon()
refreshTokenIfNeeded()
```

## Senior Notes

Architecture should reduce future change cost.

This project follows the principle:

Architecture first, implementation second.

## What's Next?

The next step is to document the OAuth token lifecycle as an ADR.
