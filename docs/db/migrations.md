# Migrations

## drizzle-kit migrate vs programmatic migrate()

Use `dev/db/migrate.ts` (node script), not `drizzle-kit migrate` CLI.

### Why

`drizzle-kit migrate` silently exits code 1 on PostgreSQL 18 — swallows the error, zero diagnostic output.
`migrate()` from `drizzle-orm/postgres-js/migrator` propagates exceptions → full stack trace visible.

### How it works

`db:migrate` in package.json runs `node ./dev/db/migrate.ts`.
Script calls `migrate(db, { migrationsFolder: "./dev/drizzle" })` — same logic as the CLI, but errors surface.

### Workflow

```text
db:generate   → drizzle-kit generate (creates SQL files in dev/drizzle/)
db:migrate    → node dev/db/migrate.ts (applies them to DB)
db:sync       → generate + migrate
```

### Pitfalls

- Broken migration (e.g. `serial → uuid` without `USING`) → CLI hides it, script shows it
- PG18 changed data dir: volume mount must be `/var/lib/postgresql` (not `/var/lib/postgresql/data`)
- If migrations are broken: delete `dev/drizzle/*.sql` + `dev/drizzle/meta/*.json`, keep empty `_journal.json`, regenerate
