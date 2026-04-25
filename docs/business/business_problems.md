# Business problems — relations

## Relation directionality
**Problem:** A loves B ≠ B loves A. But friends = symmetric.
**Decision:** `isDirected: boolean` per relation. `true` = one-way, `false` = mutual.

## Self-relation
**Problem:** Character can relate to itself (e.g. self-marriage).
**Decision:** Allowed. No constraint blocking `idChar1 = idChar2`.

## Multiple relations between same pair
**Problem:** Two characters can be siblings AND enemies simultaneously.
**Decision:** Allowed. No unique constraint on `(idChar1, idChar2)`.

## Undirected duplicate
**Problem:** `(A→B, "friends")` and `(B→A, "friends")` undirected = same relation stored twice.
**Decision:** App layer normalizes order before insert (`idChar1 < idChar2` when `isDirected=false`). Partial unique index on `(idChar1, idChar2, about)` WHERE `is_directed = false`.
