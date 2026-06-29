# Sprint 0 — Planning and Architecture

## Goal

Define the initial architecture, project purpose, technologies and development strategy before writing implementation code.

## Project Name

payroll-calculation-adapter

## Architecture Overview

The service acts as a backend adapter between an external client and payroll calculation services.

The adapter receives a calculate-associate request and immediately returns an accepted response with status `CALCULATING`.

The request continues processing asynchronously in the background.

## Main Flow

1. Receive calculate-associate request.
2. Validate initial request shape.
3. Return immediate response with status `CALCULATING`.
4. Simulate a request to payroll-builder.
5. Receive enriched payroll data.
6. Validate business rules.
7. Map data to calculation-engine format.
8. Simulate calculation-engine execution.
9. Update final status to `CALCULATED` or `ERROR`.

## Initial Technologies

### Node.js

Used as the backend runtime.

### TypeScript

Used to add static typing, improve maintainability and make data contracts explicit.

### Express

Used to expose HTTP endpoints.

### Zod

Used to validate external input before it enters the business logic.

### Pino

Used to generate structured JSON logs that can be consumed by observability tools like Splunk.

### Jest

Used for unit and integration testing.

### ESLint and Prettier

Used to keep code quality and formatting consistent from the beginning.

### Docker

Used to run the application in a consistent environment.

## Future Services

In future phases, this project may be expanded into multiple repositories:

- payroll-calculation-adapter
- payroll-builder
- calculation-engine

For now, payroll-builder and calculation-engine will be simulated with internal mock services.
