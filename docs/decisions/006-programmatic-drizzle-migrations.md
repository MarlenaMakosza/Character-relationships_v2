---
status: accepted
date: 2026-04-25
---

# ADR-006: Programmatic Drizzle Migrations over drizzle-kit CLI

## Context and Problem Statement

Drizzle provides two ways to apply migrations: the `drizzle-kit migrate` CLI command and
the programmatic `migrate()` function from `drizzle-orm/postgres-js/migrator`. On
PostgreSQL 18, the CLI exits with code 1 silently — no error message, no stack trace,
no indication of what failed. This makes debugging broken migrations effectively impossible.

## Decision Drivers

* Broken migrations must surface actionable error output
* PostgreSQL 18 is the target database version
* Migration logic must be transparent and debuggable

## Considered Options

* Programmatic `migrate()` via `node dev/db/migrate.ts`
* `drizzle-kit migrate` CLI

## Decision Outcome

Chosen option: **Programmatic `migrate()`**, because it propagates exceptions and produces
full stack traces where the CLI swallows them silently on PG18.

We will always run migrations via `npm run db:migrate` which executes `node dev/db/migrate.ts`.
Direct use of `drizzle-kit migrate` is prohibited.

### Consequences

* Good, because broken migrations show full stack traces instead of silent exit code 1
* Good, because migration logic is explicit and version-controlled in `dev/db/migrate.ts`
* Bad, because one extra file to maintain (`dev/db/migrate.ts`) vs zero-config CLI
* Neutral, because `drizzle-kit generate` is still used for generating SQL — only apply step changes

### Confirmation

Running a broken migration (e.g. type change without `USING` clause) produces a visible
error with stack trace. `drizzle-kit migrate` is not referenced in `package.json` scripts.

## Pros and Cons of the Options

### Programmatic `migrate()` via node script

* Good, because exceptions propagate — full stack trace on failure
* Good, because same migration logic as CLI under the hood
* Bad, because requires a `dev/db/migrate.ts` file to maintain

### `drizzle-kit migrate` CLI

* Good, because zero configuration — works out of the box
* Bad, because silently exits code 1 on PostgreSQL 18 with no diagnostic output
* Bad, because impossible to debug migration failures without switching to programmatic approach

## Migration Workflow

```text
db:generate  →  drizzle-kit generate  (creates SQL in dev/drizzle/)
db:migrate   →  node dev/db/migrate.ts (applies to DB, surfaces errors)
db:sync      →  generate + migrate
```

## Recovery from Broken Migrations

```text
1. Delete dev/drizzle/*.sql
2. Delete dev/drizzle/meta/*.json
3. Keep _journal.json (empty)
4. Run db:generate → db:migrate
```
