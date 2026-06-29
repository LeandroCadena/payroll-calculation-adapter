# Sprint 2 — Engineering Standards

## Goal

Define the engineering standards, architectural principles and development workflow that will be followed throughout the project.

Rather than focusing on implementing new features, this sprint establishes a common set of rules to ensure consistency, maintainability and long-term scalability.

These standards will guide every future sprint.

---

# Concepts Learned

Enterprise software development is not only about writing code.

It is also about establishing conventions that allow multiple developers to work together while producing consistent, maintainable and predictable software.

During this sprint we defined:

- Coding standards
- Architectural boundaries
- Module organization
- Documentation strategy
- Git workflow
- Architecture Decision Records (ADR)

---

# Technologies and Practices

## Feature-Based Architecture

The project is organized by business capabilities instead of technical layers.

Example:

```text
modules/
    calculate-associate/
    health/
    oauth/
```

Each module contains everything related to a specific feature.

---

## Architecture Decision Records (ADR)

Important architectural decisions are documented.

Each ADR explains:

- Context
- Decision
- Consequences
- Trade-offs

This allows future contributors to understand why a decision was made.

---

## Engineering Documentation

Technical topics that evolve over time are documented separately.

Examples:

- Logging
- Validation
- Testing
- Observability
- Coding Standards

Unlike sprint documents, engineering documents are updated as the project evolves.

---

## Path Aliases

Imports use TypeScript aliases.

Example:

```ts
import { logger } from '@/infrastructure/logger';
```

Instead of:

```ts
import { logger } from '../../../../infrastructure/logger';
```

This improves readability and makes refactoring easier.

---

# Architecture

The project currently follows the structure below.

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

# Development Workflow

Every sprint follows the same workflow.

```text
Design
    ↓
Implementation
    ↓
Validation
    ↓
Documentation
    ↓
Senior Review
    ↓
Commit
    ↓
Tag (when applicable)
```

No sprint is considered complete until every stage has been finished.

---

# Definition of Done

A sprint is considered complete only when all of the following have been completed.

- Source code implemented.
- Build successful.
- Lint passes without errors.
- Tests pass.
- Sprint documentation completed.
- ADR created when required.
- Engineering documentation updated.
- Senior Review completed.
- Commit created.
- Tag created when appropriate.

---

# Documentation Strategy

The project documentation is divided into four categories.

## Sprint Documentation

Explains what was built during each sprint.

Location:

```text
docs/sprints/
```

---

## Engineering Documentation

Explains technical concepts that evolve during the project.

Location:

```text
docs/engineering/
```

---

## Architecture Decision Records

Documents important architectural decisions.

Location:

```text
docs/adr/
```

---

## Diagrams

Contains architecture and flow diagrams.

Location:

```text
docs/diagrams/
```

---

# Why This Approach?

The objective is not only to produce working software.

The objective is to create a project that is:

- Easy to understand.
- Easy to maintain.
- Easy to explain during technical interviews.
- Similar to the development practices used in enterprise software teams.

---

# Benefits

- Consistent codebase.
- Predictable project structure.
- Better onboarding.
- Easier maintenance.
- Higher portfolio quality.
- Better interview preparation.

---

# Senior Notes

One of the main differences between junior and senior engineers is not the amount of code they write.

It is the quality of the decisions they make before writing the first line of code.

A well-defined engineering process reduces technical debt, improves collaboration and makes software easier to evolve over time.

---

# Files Created

```text
docs/engineering/
docs/adr/
docs/sprints/

.github/
```

---

# How to Validate

Verify that the repository contains:

```text
docs/
engineering/
adr/
sprints/

.github/

src/
```

Run:

```bash
npm run build
npm run lint
npm test
```

---

# Common Mistakes

- Skipping documentation until the end of the project.
- Making architectural decisions without documenting them.
- Allowing different coding styles across modules.
- Mixing infrastructure code with business logic.

---

# What's Next?

The next sprint introduces the first functional module of the application.

We will implement the Health Module using the standards established during this sprint.

This will serve as the reference implementation for all future modules.
