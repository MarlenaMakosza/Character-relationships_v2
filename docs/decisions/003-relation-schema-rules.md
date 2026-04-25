# ADR-003: Relation Schema Rules

## Context
The `relations` table needs rules for four edge cases: whether a relation can point in one
direction only, whether a character can relate to itself, whether two characters can hold
multiple simultaneous relations, and how to prevent silent duplicates for symmetric
relations stored in either order.

## Decision
We will apply the following rules to the `relations` table:

- **Directionality:** each relation carries an `isDirected: boolean` flag. Directed relations
  have a meaningful source (`idChar1`) and target (`idChar2`). Undirected relations are symmetric.
- **Self-relation:** allowed. No constraint prevents `idChar1 = idChar2`.
- **Multiple relations per pair:** allowed. Two characters may simultaneously hold any number
  of distinct relations (e.g. siblings and enemies).
- **Undirected duplicate prevention:** the app layer normalizes insert order
  (`idChar1 < idChar2` lexicographically) when `isDirected = false`. A partial unique index
  on `(idChar1, idChar2, about)` WHERE `is_directed = false` enforces this at the database level.

## Status
Accepted

## Alternatives considered
- **Raw SQL functional index** (`LEAST`/`GREATEST`) — enforces order at DB level without app
  normalization, but requires a raw SQL migration outside Drizzle DSL; deferred until necessary
- **Unique constraint on all pairs** — would block legitimate multiple relations between same pair

## Consequences
- `isDirected` must be set explicitly on every insert; defaults to `false`
- App layer must normalize `idChar1`/`idChar2` order before every undirected insert
- Self-relations render as loops in Cytoscape.js — must be handled in graph styling
- Partial unique index only covers undirected; directed duplicates (`A→B "loves"` twice) are
  currently not prevented
