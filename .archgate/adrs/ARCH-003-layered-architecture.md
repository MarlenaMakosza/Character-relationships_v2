---
id: ARCH-003
title: Routes must not access repositories directly
domain: architecture
rules: true
files: ["src/routes/**/*.ts", "src/routes/**/*.svelte"]
---

# ARCH-003: Routes must not access repositories directly

## Context

The project uses a layered architecture: routes → controllers → services → repositories.
Bypassing layers (e.g. a route importing a repository directly) breaks this separation
and makes the codebase harder to reason about and test.

## Decision

Route files (`src/routes/**`) may only import from controllers (`$lib/Controller`).
Importing directly from `$lib/repositories` or `$lib/services` in a route is a violation.

## Compliance and Enforcement

Enforced automatically — see companion `.rules.ts` file.
