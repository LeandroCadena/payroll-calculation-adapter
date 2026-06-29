# Sprint 14 — Application Layer Refactor

## Goal

Refactor the project architecture to separate HTTP modules from application use cases and persistence.

## Concepts Learned

A business flow such as calculate-associate is not just a service.

It is a use case that orchestrates several steps:

- Create calculation record
- Return accepted response
- Continue async processing
- Call OAuth service
- Call Payroll Builder
- Validate data
- Map data
- Call Calculation Engine
- Update final status

## Architecture

```txt
Controller
↓
Use Case
↓
Gateway / Repository / Domain
↓
Client / Storage / External System

## New Structure

src/
├── application/
│   ├── use-cases/
│   ├── gateways/
│   └── dto/
├── repositories/
│   └── calculations/
├── modules/
├── clients/
├── domain/
├── infrastructure/
├── config/
└── shared/
```
