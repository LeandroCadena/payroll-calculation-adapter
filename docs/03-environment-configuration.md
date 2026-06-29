# Sprint 1.3 — Environment Configuration

## Goal

Centralize and validate environment variables before the application starts.

## Why Not Use process.env Directly?

Using `process.env` across the entire codebase makes configuration harder to validate, test and maintain.

Instead, this project exposes a centralized `env` object from `src/config/env.ts`.

## Technology Used

### dotenv

Loads environment variables from a `.env` file during local development.

### Zod

Validates and transforms environment variables.

For example, `PORT` is received as a string from the environment, but Zod converts it into a number using `z.coerce.number()`.

## Benefits

- Fail fast when configuration is invalid.
- Avoid duplicated environment parsing.
- Keep configuration strongly typed.
- Improve maintainability.
