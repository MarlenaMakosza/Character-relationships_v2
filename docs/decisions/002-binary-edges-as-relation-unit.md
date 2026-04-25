# ADR-002: Binary Edges as the Atomic Relation Unit

## Context
Character relationships could be modeled as n-ary entities (triangles, alliances of 3+
characters stored as a single record) or as binary edges (one record per pair). The graph
library operates on source→target pairs regardless. Storing n-ary entities adds schema
complexity and requires decomposition before rendering anyway.

## Decision
We will use binary edges (one record per character pair) as the only relation unit.
Patterns such as triangles or quadrilaterals are graph cycles detectable at runtime via
traversal algorithms — they will not be stored as separate entities.

## Status
Accepted

## Alternatives considered
- **N-ary table** (`character_groups` + `character_group_members` junction) — valid if a
  group needs its own metadata independent of binary edges; deferred, not ruled out permanently

## Consequences
- Schema stays simple: one `relations` table with two character FKs
- Triangle/cycle detection requires graph algorithm at query or render time
- Future n-ary annotation (e.g. named alliances) can be added as a separate table without
  touching the binary edge model
- No way to attach metadata to a "triangle as a unit" without the deferred n-ary table
