# Sprint 10 — Field-Level Validation Errors

## Goal

Improve validation responses by returning field-level error details.

## Concepts Learned

Validation errors should help API consumers understand exactly what failed.

## Technologies Used

- Zod
- Express error middleware
- Custom application errors

## Architecture

```txt
HTTP Request
↓
Validation Middleware
↓
Zod Error
↓
ValidationError
↓
Centralized Error Handler
↓
Field-Level JSON Response
```

## Benefits

- More useful API responses.
- Cleaner validation flow.
- Better debugging.
- Better developer experience.

## Senior Notes

Validation errors are expected errors, not system failures.

They should be logged as warnings, not as internal server errors.

## Files Created

```txt
src/shared/errors/validation-error.ts
```

## Files Updated

```txt
src/shared/errors/index.ts
src/infrastructure/middleware/validate-request.middleware.ts
src/infrastructure/middleware/error-handler.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will start the OAuth module foundation.
