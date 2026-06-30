# Sprint 46 — Production Docker

## Goal

Add a production-ready Dockerfile using a multi-stage build.

## Architecture

```txt
Builder Image
↓
Install dependencies
↓
Build TypeScript
↓
Production Image
↓
Install production dependencies
↓
Run compiled app
```

## Senior Notes

Multi-stage Docker builds keep the final image smaller and safer.

The production image should not include TypeScript source files, tests, documentation or dev dependencies.

## How to Test

Build:

```bash
docker build -t payroll-calculation-adapter .
```

Run:

```bash
docker run -p 3000:3000 --env-file .env payroll-calculation-adapter
```

Open:

```txt
http://localhost:3000/health
```

## What's Next?

The next sprint will add GitHub Actions for CI.
