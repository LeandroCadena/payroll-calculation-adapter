# ADR-003 — OAuth Token Lifecycle

## Status

**Accepted**

## Context

The calculate-associate process is asynchronous.

The API returns an immediate `CALCULATING` response, but the request continues processing in the background.

During that background flow, the adapter may call multiple external services:

- Payroll Builder
- Calculation Engine

If the process takes longer than expected, an OAuth token obtained at the beginning may expire before the next external call.

## Decision

The adapter will revalidate the OAuth token before each external service call.

The OAuth service will be responsible for returning a valid token.

Expected methods:

```txt
getValidToken()
isTokenExpired()
isTokenExpiringSoon()
refreshTokenIfNeeded()
```

## Flow

```txt
Background process starts
↓
Get valid OAuth token
↓
Call Payroll Builder
↓
Revalidate OAuth token
↓
Map and validate data
↓
Revalidate OAuth token
↓
Call Calculation Engine
↓
Update status
```

## Consequences

### Benefits

- Reduces token expiration failures.
- Makes async processing more reliable.
- Better simulates enterprise integration behavior.
- Keeps OAuth logic centralized.

### Trade-offs

- Adds complexity to the OAuth service.
- Requires careful testing around expiration.
- May introduce additional token refresh calls.

## Senior Notes

In long-running async flows, authentication should be treated as a lifecycle concern, not a one-time setup step.

## Interview Notes

### Why revalidate OAuth tokens during the process?

Because async processes can take longer than expected. A token that was valid at the beginning may expire before a later external service call, so the adapter must validate or refresh the token before each integration step.
