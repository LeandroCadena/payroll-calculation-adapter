# Sprint 44 — OpenAPI / Swagger Documentation

## Goal

Add interactive API documentation using OpenAPI and Swagger UI.

## Architecture

```txt
Express App
↓
Swagger Spec
↓
Swagger UI
↓
/api-docs
```

## Senior Notes

API documentation is essential for integration platforms.

External consumers need to understand endpoints, request payloads, response formats and error structures.

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

Start the application:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/api-docs
```

## What's Next?

The next sprint will add integration tests for the main calculate-associate flow.
