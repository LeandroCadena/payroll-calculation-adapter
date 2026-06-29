# Sprint 1.2 — Folder Structure

## Goal

Define a scalable folder structure before implementing business logic.

## Architecture Style

This project follows a layered architecture inspired by Clean Architecture.

The goal is to separate responsibilities clearly:

- Routes define HTTP paths.
- Controllers handle HTTP input/output.
- Services contain business logic.
- Clients communicate with external systems.
- Repositories abstract persistence.
- Mappers transform data between models.
- Schemas validate external input.
- Shared modules contain reusable infrastructure.

## Main Structure

```txt
src/
├── config/
├── shared/
│   ├── constants/
│   ├── errors/
│   ├── logger/
│   ├── middlewares/
│   ├── router/
│   ├── types/
│   └── utils/
├── v1/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── clients/
│   ├── validators/
│   ├── schemas/
│   ├── mappers/
│   ├── models/
│   ├── repositories/
│   ├── dto/
│   └── mocks/
├── app.ts
└── server.ts
```
