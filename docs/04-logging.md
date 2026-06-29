# Sprint 1.4 — Logging

## Goal

Provide a centralized logging infrastructure for the application.

## Why Pino?

Pino is one of the fastest JSON loggers for Node.js applications.

It produces structured logs that can be consumed by observability platforms such as:

- Splunk
- Grafana Loki
- CloudWatch
- OpenTelemetry

## Why a Wrapper?

The application imports its logger from `shared/logger`.

This decouples the rest of the codebase from the logging implementation.

If the project ever changes from Pino to another logger, only the wrapper needs to be updated.

## Future Improvements

In future sprints, request context (traceId, requestId and calculationGroupId) will automatically be attached to every log entry.