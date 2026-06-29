# ADR-001 — Project Architecture

## Status

**Accepted**

---

# Context

Payroll Calculation Adapter is designed to simulate a real enterprise payroll integration platform rather than a simple REST API.

The project will evolve to include:

- Asynchronous request processing
- Multiple external integrations
- OAuth authentication
- Structured logging
- Health monitoring
- Business validation
- Data normalization
- Distributed services
- Unit and integration testing
- Observability
- Dockerized deployment

As the project grows, a traditional Express folder structure organized only by technical layers (controllers, services, routes, etc.) becomes increasingly difficult to navigate and maintain.

Additionally, future iterations will introduce independent services such as Payroll Builder and Calculation Engine, making clear architectural boundaries even more important.

---

# Problem

Traditional Express applications often organize files like this:

```text
controllers/
services/
routes/
middlewares/
models/
```

Although simple at first, this approach creates several problems as the application grows.

For example, implementing a single feature may require navigating across many unrelated folders.

Business logic also tends to become tightly coupled with framework-specific code.

The project becomes harder to understand, test and evolve.

---

# Decision

The project will adopt a **feature-based layered architecture** inspired by Clean Architecture principles.

The application will be divided into independent modules representing business capabilities, while infrastructure concerns remain isolated.

The high-level structure will be:

```text
src/
│
├── config/
│
├── infrastructure/
│   ├── http/
│   ├── logger/
│   ├── middleware/
│   └── observability/
│
├── modules/
│   ├── calculate-associate/
│   ├── calculations/
│   ├── health/
│   └── oauth/
│
├── clients/
│   ├── payroll-builder/
│   └── calculation-engine/
│
├── domain/
│
├── shared/
│   ├── errors/
│   ├── types/
│   └── utils/
│
├── app.ts
└── server.ts
```

---

# Architectural Principles

The project follows several architectural principles.

## Separation of Concerns

Each layer has a single responsibility.

- Controllers handle HTTP communication.
- Services implement business logic.
- Clients communicate with external systems.
- Repositories abstract persistence.
- Infrastructure contains framework-specific code.

---

## Replace, Don't Rewrite

External dependencies should be replaceable without changing the business logic.

Example:

```text
PayrollBuilderMockClient

↓

PayrollBuilderHttpClient
```

The service layer should remain unchanged.

---

## Dependency Direction

Dependencies should always point toward the business domain.

Example:

```text
Controller

↓

Service

↓

Client

↓

External Service
```

Controllers should never communicate directly with external clients.

---

## Thin Controllers

Controllers should only:

- receive requests
- delegate work
- return responses

Business logic belongs exclusively to Services.

---

## Explicit Boundaries

Infrastructure should not contain business rules.

Business modules should not depend directly on Express, Pino or any other framework whenever possible.

---

# Expected Benefits

This architecture provides several advantages.

## Scalability

New modules can be added without modifying existing features.

---

## Maintainability

Related files stay together, making the project easier to understand.

---

## Testability

Business logic can be tested independently of HTTP or external services.

---

## Flexibility

External systems such as Payroll Builder or Calculation Engine can evolve independently.

---

## Portfolio Value

The project better represents the architecture commonly found in enterprise backend applications.

---

# Trade-offs

Every architectural decision introduces compromises.

## More Initial Structure

The project starts with more folders and abstractions than a simple CRUD application.

However, this investment pays off as complexity increases.

---

## Slightly Higher Learning Curve

Developers need to understand architectural boundaries before contributing.

The project documentation aims to reduce this learning curve.

---

## Additional Boilerplate

Feature isolation requires more files.

The benefit is improved readability and long-term maintainability.

---

# Alternatives Considered

## Traditional Express Structure

```text
controllers/
services/
routes/
```

Rejected because features become scattered across multiple folders.

---

## Full Clean Architecture

Rejected for now because it introduces additional complexity that is unnecessary for the current scope.

However, several concepts from Clean Architecture are adopted.

---

## NestJS

NestJS naturally provides modular organization and dependency injection.

The decision was made to use Express because:

- it better reflects the existing enterprise project that inspired this repository;
- it allows demonstrating architectural decisions explicitly rather than relying on framework conventions;
- it provides greater visibility into how the application is assembled.

---

# Consequences

Future modules will follow the same architectural conventions.

Every new feature should be implemented as an independent module.

Infrastructure concerns should remain isolated.

Services should remain framework-agnostic whenever possible.

---

# Senior Notes

Enterprise applications are rarely successful because of the framework they use.

They are successful because responsibilities are clearly separated and each layer can evolve independently.

The goal of this architecture is not to imitate a specific framework, but to create a codebase that remains understandable and maintainable as the project grows.

---

# References

- Clean Architecture — Robert C. Martin
- Domain-Driven Design — Eric Evans
- Building Evolutionary Architectures — Neal Ford
- The Twelve-Factor App

# Interview Notes

### Why did you choose a feature-based architecture?

Possible answer:

"I wanted each business capability to be self-contained. As the project grows, this approach reduces coupling, improves discoverability, and allows each feature to evolve independently while keeping infrastructure concerns isolated."

---

### Why not organize by controllers, services and routes?

Possible answer:

"That structure works well for small applications, but in larger systems related files become scattered. A feature-based architecture keeps all artifacts of a business capability together, improving maintainability and reducing cognitive load."