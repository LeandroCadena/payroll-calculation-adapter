# Sprint 15 — Background Task Dispatcher

## Goal

Create a small abstraction for background task execution.

## Concepts Learned

Async business flows should not depend directly on the execution mechanism.

The application should be able to start background work without knowing whether the task is executed in memory, by a queue, or by an external worker.

## Architecture

```txt
Use Case
↓
Background Task Dispatcher
↓
In-Memory Async Execution
```

## Why This Approach?

The first implementation uses `setImmediate()` to execute tasks asynchronously in the same process.

The use case will depend only on the dispatcher abstraction, which allows future replacement with SQS, BullMQ, RabbitMQ or EventBridge.

## Benefits

- Keeps async execution isolated.
- Avoids coupling business logic to infrastructure.
- Supports future queue-based architecture.
- Keeps the calculate-associate flow clean.

## Senior Notes

This is not a production queue yet.

In production, long-running or critical tasks should usually be persisted in a durable queue to avoid losing work if the process restarts.

## Files Created

```txt
src/infrastructure/background/background-task-dispatcher.ts
src/infrastructure/background/index.ts
```

## How to Test

Run:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will start the calculate-associate module with DTOs and validation schema.
