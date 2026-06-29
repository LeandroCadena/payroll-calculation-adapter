# Module Boundaries

## Goal

Define how modules and layers are allowed to communicate inside Payroll Calculation Adapter.

## Dependency Direction

Dependencies should move from external layers toward business logic.

```txt
HTTP Route
↓
Controller
↓
Service
↓
Repository / Client / Domain
```

## Rules

Controllers can call Services.

Services can call Repositories, Clients and Domain logic.

Clients can communicate with external systems.

Repositories abstract persistence.

Domain should not depend on Express, Pino, Zod or infrastructure tools.

## Not Allowed

Controllers should not call external clients directly.

Controllers should not access repositories directly.

Business logic should not be implemented inside routes.

Infrastructure should not contain payroll business rules.

## Why This Matters

Clear module boundaries reduce coupling and make the project easier to test, maintain and extend.

## Senior Note

A clean architecture is not defined by folders alone.

It is defined by dependency direction, clear responsibilities and the ability to replace infrastructure without rewriting business logic.
