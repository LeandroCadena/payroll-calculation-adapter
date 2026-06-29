# Coding Standards

## Goal

Define the coding conventions used across Payroll Calculation Adapter.

## Naming Conventions

```txt
Classes: CalculateAssociateService
Interfaces: CalculateAssociateRequest
Types: CalculationStatus
Files: calculate-associate.service.ts
Folders: calculate-associate
Variables: associateId
Constants: DEFAULT_TIMEOUT
Enums: CalculationStatus
```

## Interfaces vs Types

Use `interface` for object contracts.

Use `type` for unions, aliases and utility types.

## Controllers

Controllers handle HTTP input and output only.

They should not contain business logic.

## Services

Services contain business logic.

They should not depend on Express request or response objects.

## Clients

Clients communicate with external systems such as Payroll Builder or Calculation Engine.

## Repositories

Repositories abstract persistence.

The first implementation will use memory storage, but future implementations may use PostgreSQL or Redis.

## Comments

Comments should explain why something exists, not what the code already clearly says.

Good example:

```ts
// Services should not depend on Express.
// This allows the same business logic to be reused by HTTP routes, workers or scheduled jobs.
```

Bad example:

```ts
// Create user
createUser();
```

## Logging

Logs should be structured and include relevant identifiers such as:

- traceId
- calculationGroupId
- associateId
- organizationId

## Errors

The project will use custom application errors instead of throwing generic errors everywhere.

Future hierarchy:

```txt
ApplicationError
├── ValidationError
├── BusinessRuleError
├── ExternalServiceError
└── NotFoundError
```