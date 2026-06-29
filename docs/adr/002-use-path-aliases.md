# ADR-002 — Use Path Aliases

## Status

**Accepted**

## Context

As the project grows, relative imports can become long and fragile.

Example:

```ts
import { logger } from '../../../../infrastructure/logger';
```

This makes files harder to read and increases the risk of broken imports when files move.

## Decision

Use TypeScript path aliases with `@/` pointing to the `src/` directory.

Example:

```ts
import { logger } from '@/infrastructure/logger';
```

## Consequences

### Benefits

- Cleaner imports.
- Easier refactoring.
- Better readability.
- Less coupling to folder depth.

### Trade-offs

- Requires TypeScript configuration.
- Runtime tools must understand the alias.
- Test tools may also need alias configuration.

## Senior Notes

Path aliases do not replace good architecture.

They improve developer experience, but module boundaries still need to be respected.

## Interview Notes

### Why use path aliases?

Path aliases keep imports readable and reduce coupling to folder depth. This is useful in larger projects where files move often and relative imports become difficult to maintain.