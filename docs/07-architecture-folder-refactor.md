# Sprint 1.7 — Architecture Folder Refactor

## Goal

Refactor the project structure into a more scalable architecture before adding business logic.

## Previous Structure

The first structure was organized mostly by technical layer and API version.

## New Structure

```txt
src/
├── config/
├── infrastructure/
│   ├── http/
│   ├── logger/
│   ├── middleware/
│   └── observability/
├── modules/
│   ├── calculate-associate/
│   ├── calculations/
│   ├── health/
│   └── oauth/
├── clients/
│   ├── payroll-builder/
│   └── calculation-engine/
├── domain/
├── shared/
│   ├── errors/
│   ├── types/
│   └── utils/
├── app.ts
└── server.ts
```
