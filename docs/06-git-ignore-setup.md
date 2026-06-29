# Sprint 1.6 — Git Ignore Setup

## Goal

Prevent unnecessary, generated or sensitive files from being committed to the repository.

## Why .gitignore Matters

A professional repository should not include:

- Dependencies like `node_modules`
- Build output like `dist`
- Test coverage reports
- Local environment files
- Logs
- IDE-specific configuration

## Security Note

Environment files such as `.env` may contain secrets, tokens or credentials.

For that reason, only `.env.example` should be committed.