# Sprint 1 — Professional Project Setup

## Goal

Establish a professional backend foundation before implementing any business functionality.

The objective of this sprint is to prepare the project with modern development tools, coding standards and a scalable folder structure.

Although no business features are implemented yet, this sprint creates the foundation that every future module will rely on.

---

# Concepts Learned

During this sprint we introduced several concepts that are common in enterprise backend projects.

- Project bootstrapping
- TypeScript configuration
- Code quality tools
- Environment validation
- Structured logging
- Folder organization
- Git repository standards

The goal is to build a project that is maintainable from day one instead of evolving from a simple prototype.

---

# Technologies Used

## Node.js

Application runtime.

The project uses the latest LTS-compatible runtime available at the time of development.

---

## TypeScript

Provides static typing and improves maintainability.

TypeScript allows us to define contracts between modules before runtime.

---

## Express

Provides the HTTP server used by the adapter.

Business logic will remain independent from Express whenever possible.

---

## ESLint

Detects code quality issues before runtime.

Using ESLint from the beginning ensures a consistent coding style across the project.

---

## Prettier

Automatically formats the source code.

Formatting should never depend on individual developer preferences.

---

## Jest

Testing framework.

Although no tests have been implemented yet, the project is prepared for unit and integration testing.

---

## Pino

Structured JSON logger.

Chosen because it integrates well with enterprise observability platforms such as Splunk.

---

## Zod

Runtime validation library.

Initially introduced to validate environment variables.

Later it will validate HTTP requests.

---

# Architecture

The application currently consists of the following high-level structure.

```text
src/
├── config/
├── infrastructure/
├── modules/
├── clients/
├── domain/
├── shared/
├── app.ts
└── server.ts
```

Each folder has a single responsibility.

The goal is to keep business logic isolated from infrastructure concerns.

---

# Why This Approach?

Many tutorial projects start with all files inside a few folders.

As the application grows, responsibilities become mixed together and the codebase becomes difficult to maintain.

Instead, this project starts with a scalable architecture from the beginning.

This avoids major refactors later.

---

# Benefits

- Consistent project structure.
- Better maintainability.
- Easier testing.
- Separation of concerns.
- Cleaner dependency management.
- Enterprise-ready foundation.

---

# Senior Notes

Professional projects rarely fail because of the business logic itself.

Most maintenance problems appear because the project was not properly organized from the beginning.

Investing in architecture early reduces technical debt and makes future changes easier.

---

# Files Created

```text
src/
config/
infrastructure/
modules/
clients/
domain/
shared/

.editorconfig
.prettierrc
tsconfig.json
eslint.config.mjs
jest.config.ts
.env.example
.gitignore
```

---

# How to Test

Run:

```bash
npm install
npm run build
npm run lint
npm test
```

The project should build successfully and be ready for future feature development.

---

# Common Mistakes

- Starting business development before configuring the project.
- Using `process.env` directly throughout the application.
- Mixing framework code with business logic.
- Ignoring linting and formatting until later.

---

# What's Next?

The next sprint establishes the engineering standards used across the entire project.

These standards will define how modules communicate, how imports are organized and how architectural decisions are documented.
