# Sprint 1.5 — Base Express Application

## Goal

Create the base Express application and start the HTTP server.

## Main Files

- `src/app.ts`
- `src/server.ts`
- `src/bootstrap/middlewares.ts`

## Why Separate app.ts and server.ts?

`app.ts` creates and configures the Express application.

`server.ts` starts the HTTP server.

This separation makes testing easier because tests can import the app without opening a real network port.

## Why Bootstrap Folder?

The `bootstrap` folder centralizes application startup concerns such as middlewares, routes and future observability setup.

This keeps `app.ts` small and focused.