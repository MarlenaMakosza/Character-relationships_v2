---
status: accepted
date: 2026-04-25
---

# ADR-002: Binary Edges as the Atomic Relation Unit

## Context and Problem Statement

Character relationships could be stored as n-ary entities (a single record for a group of
3+ characters) or as binary edges (one record per pair). The graph library always renders
source→target pairs regardless of storage model, so n-ary entities require decomposition
before rendering anyway.

## Decision Drivers

* Graph library operates exclusively on binary source→target pairs
* N-ary patterns (triangles, quadrilaterals) are graph cycles derivable via traversal algorithms
* Schema complexity should stay minimal at this stage

## Considered Options

* Binary edges only
* N-ary table (`character_groups` + `character_group_members` junction)
* Both (binary edges + optional n-ary annotation layer)

## Decision Outcome

Chosen option: **Binary edges only**, because patterns are derivable algorithmically and
adding n-ary storage now would increase schema complexity without a concrete requirement.

### Consequences

* Good, because schema stays simple — one `relations` table, two character FKs
* Good, because n-ary annotation table can be added later without changing the binary edge model
* Bad, because attaching metadata to a "triangle as a unit" is not possible without the deferred n-ary table
* Neutral, because cycle detection is required at query or render time for pattern highlighting

### Confirmation

The `relations` table contains no group or n-ary columns. Triangle/cycle detection is
implemented as a graph traversal algorithm, not a database query on a groups table.

## Pros and Cons of the Options

### Binary edges only

* Good, because minimal schema — one table, two FKs
* Good, because patterns detectable algorithmically at no extra schema cost
* Bad, because no way to attach metadata to a pattern (e.g. "this triangle started in chapter 5")

### N-ary table only

* Good, because groups have their own identity and can carry metadata
* Bad, because requires decomposition to binary edges before every render
* Bad, because schema complexity added before there is a concrete requirement

### Both (binary + n-ary annotation layer)

* Good, because covers all cases — binary edges for rendering, groups for metadata
* Neutral, because n-ary layer is independent and can be added later without changing binary edges
* Bad, because premature — adds complexity before it is needed
