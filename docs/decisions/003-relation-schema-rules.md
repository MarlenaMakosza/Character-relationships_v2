---
status: accepted
date: 2026-04-25
---

# ADR-003: Relation Schema Rules

## Context and Problem Statement

The `relations` table requires explicit rules for four edge cases that arise from the
narrative domain: whether a relation can be one-way, whether a character can relate to
itself, whether two characters can hold multiple simultaneous relations, and how to prevent
silent duplicates when a symmetric relation is inserted in either column order.

## Decision Drivers

* Narrative relationships can be one-way (A loves B, B doesn't) or symmetric (friends)
* Characters can relate to themselves (e.g. self-marriage is legally valid in some countries)
* Two characters can simultaneously hold multiple distinct relations (siblings + enemies)
* Symmetric relations stored in reverse column order represent the same relationship

## Considered Options

* `isDirected` boolean flag per relation + app-layer order normalization
* Separate tables for directed and undirected relations
* Always directed — normalize all relations as directed edges

## Decision Outcome

Chosen option: **`isDirected` flag + app-layer normalization**, because it keeps a single
table while covering all cases, and partial unique index enforcement requires no raw SQL.

### Consequences

* Good, because one table covers directed, undirected, and self-relations
* Good, because multiple relations per pair are allowed — no unique constraint on `(idChar1, idChar2)`
* Bad, because app layer must normalize column order before every undirected insert (`idChar1 < idChar2` lexicographically)
* Bad, because directed duplicates (A→B "loves" inserted twice) are not currently prevented
* Neutral, because self-relations render as loops in Cytoscape.js and require explicit graph styling

### Confirmation

Inserting `(B, A, "friends", false)` after `(A, B, "friends", false)` throws a unique
constraint violation. Inserting a self-relation (`idChar1 = idChar2`) succeeds without error.

## Pros and Cons of the Options

### `isDirected` flag + app-layer normalization

* Good, because single table for all relation types
* Good, because Drizzle DSL supports partial unique index — no raw SQL migration needed
* Bad, because app layer must always normalize insert order for undirected relations
* Bad, because directed duplicates remain unprotected

### Separate tables (directed / undirected)

* Good, because constraints are cleanly separated per table
* Bad, because queries joining both types become more complex
* Bad, because adding a new relation type may require a new table

### Always directed

* Good, because simplest schema — no flag needed
* Bad, because symmetric relations (friends, siblings) require two rows per pair
* Bad, because query logic must always handle both directions for undirected semantics
