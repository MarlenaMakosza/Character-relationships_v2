# 2. Constraints

## Technical Constraints

| Constraint | Reason |
|------------|--------|
| TypeScript | Primary language — type safety across full stack |
| SvelteKit | Full-stack framework (routing + SSR + API) |
| PostgreSQL | Relational DB — relational data with FK integrity |
| Drizzle ORM | Type-safe query builder, schema-as-code migrations |
| Zod | Runtime validation at system boundaries |
| Cytoscape.js | Graph visualisation — see ADR-001 |
| Node.js | SvelteKit runtime requirement |

## Organisational Constraints

- Solo developer — scope must stay manageable
- No deadline — quality over speed
- Open source — no licensing restrictions on dependencies

## Conventions

- Conventional Commits enforced via commitlint
- ESLint with strict plugin set (security, sonarjs, unicorn, functional)
- GitHub Flow — `main` always deployable, changes via PR

## MVP Scope Limits

- Single-user only (no auth, no multi-tenancy)
- No real-time collaboration
- No mobile-optimised UI
