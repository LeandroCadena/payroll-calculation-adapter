# Sprint 47 — GitHub Actions CI

## Goal

Add a GitHub Actions workflow to automatically validate the project on every push and pull request.

## Architecture

```txt
GitHub Push / Pull Request
↓
GitHub Actions
↓
Install Dependencies
↓
Build
↓
Lint
↓
Test
```

## Senior Notes

CI protects the main branch from broken builds.

A professional backend project should automatically verify that the application builds, follows linting rules and passes tests before changes are merged.

## How to Test

Push the branch to GitHub and verify that the CI workflow runs successfully.

You can also validate locally with:

```bash
npm run build
npm run lint
npm test
```

## What's Next?

The next sprint will add an architecture review document before preparing the final README.
