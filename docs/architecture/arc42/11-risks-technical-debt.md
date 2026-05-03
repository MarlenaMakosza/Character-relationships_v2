# 11. Risks and Technical Debt

## Known Technical Debt

### Missing core features (not yet implemented)
- No form for adding relations
- No edit for characters or relations
- No individual character graph view
- No CSS styling (`app.css` empty)
- Error handling uses `alert()` / `confirm()` — placeholder only

### Schema drift
`now.md` described `firstName`/`lastName` columns; actual schema has single `name` column.
Any code referencing old column names will break.

### Directed duplicates unprotected
Two identical directed relations (`A→B "loves"` twice) are not prevented.
Only undirected duplicates are blocked by the partial unique index.
See [ADR-003](../decisions/003-relation-schema-rules.md).

---

## Infrastructure Risks

### Drizzle CLI silent failure on PostgreSQL 18
`drizzle-kit migrate` exits with code 1 silently on PG18 — swallows errors, zero output.

**Mitigation:** Always use `npm run db:migrate` (runs `node dev/db/migrate.ts`) instead of
`drizzle-kit migrate` directly. Errors surface as full stack traces.
See [ADR-006](../decisions/006-programmatic-drizzle-migrations.md).

### Broken migration recovery
If migrations are corrupted (e.g. `serial → uuid` without `USING` clause):

```text
1. Delete dev/drizzle/*.sql
2. Delete dev/drizzle/meta/*.json
3. Keep empty _journal.json
4. Run db:generate → db:migrate
```

### PostgreSQL 18 volume mount path changed
PG18 changed data directory. Docker volume must mount to `/var/lib/postgresql`
(not `/var/lib/postgresql/data`).

### testcontainers requires Docker
`container.test.ts` fails with `Could not find a working container runtime strategy`
if Docker is not running. Start Docker before running tests.

---

## Appendix: Migration workflow

```text
db:generate   → drizzle-kit generate  (creates SQL in dev/drizzle/)
db:migrate    → node dev/db/migrate.ts (applies to DB, surfaces errors)
db:sync       → generate + migrate
```
