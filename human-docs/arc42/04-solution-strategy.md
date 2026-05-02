# 4. Solution Strategy

## Key Architectural Decisions

See `docs/decisions/` for full ADRs.

| Decision | Choice | ADR |
|----------|--------|-----|
| Graph visualisation | Cytoscape.js | ADR-001 |
| Relation storage unit | Binary edges | ADR-002 |
| Relation schema rules | `isDirected` flag + app-layer normalisation | ADR-003 |
| ADR enforcement | Archgate CLI (proposed) | ADR-004 |

## Runtime Dependencies

### Core

| Package | Role |
|---------|------|
| `sveltekit` | Full-stack framework (routing, SSR, API endpoints) |
| `drizzle-orm` | Type-safe ORM + query builder |
| `drizzle-kit` | Schema migrations (via `node dev/db/migrate.ts`, not CLI — see risks) |
| `postgres` | PostgreSQL driver |
| `zod` | Runtime validation at API boundaries |
| `cytoscape` | Graph visualisation |

### Dev / Tooling

| Package | Role |
|---------|------|
| `@faker-js/faker` | Seed data generation |
| `dotenv` / `dotenv-expand` | Env variable loading |
| `rimraf` | Cross-platform `rm -rf` |

### Linting / Formatting

| Package | Role |
|---------|------|
| `eslint` + plugins | TS, Svelte, security, sonarjs, unicorn, functional, drizzle, import, promise, perfectionist, tsdoc, n, html, cspell, stylistic, vitest |
| `prettier` + plugins | Formatting (svelte, organize-imports) |
| `cspell` | Spellchecking |
| `skott` | Dependency graph analysis |

### Git / Commits

| Package | Role |
|---------|------|
| `husky` | Git hooks runner |
| `lint-staged` | Run linters on staged files only |
| `commitlint` + `commitlint-plugin-function-rules` | Enforce Conventional Commits |
| `commitizen` + `cz-conventional-changelog` | Interactive commit prompt |

### Testing

| Package | Role |
|---------|------|
| `vitest` | Unit test runner |
| `@testing-library/svelte` | Component testing |
| `@testing-library/jest-dom` | DOM matchers |
| `@testcontainers/postgresql` | Real PostgreSQL in tests (requires Docker) |

### Dependency Management

| Package | Role |
|---------|------|
| `npm-check-updates` | Check for outdated dependencies |
