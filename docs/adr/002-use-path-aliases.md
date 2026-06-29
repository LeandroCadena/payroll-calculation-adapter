# ADR-002 — Use Path Aliases

## Status

**Accepted**

## Context

As the project grows, relative imports can become long and fragile.

Example:

```ts
import { logger } from '../../../../infrastructure/logger';
```

This reduces readability and makes refactoring harder.

## Decision

Use TypeScript path aliases with `@/` pointing to `src/`.

Example:

```ts
import { logger } from '@/infrastructure/logger';
```

Because this project uses TypeScript 6, we avoid the deprecated `baseUrl` option and define paths directly:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

## Consequences

### Benefits

- Cleaner imports.
- Easier refactoring.
- Better readability.
- Less coupling to folder depth.

### Trade-offs

- Runtime tools must support the alias.
- Test tools may require extra configuration later.

## Senior Notes

Path aliases improve developer experience, but they do not replace good architecture.

Module boundaries still need to be respected.

## Interview Notes

### Why use path aliases?

Path aliases keep imports readable and avoid fragile relative paths in large projects.

### Why avoid deprecated baseUrl?

Because using modern TypeScript configuration prevents future migration problems.