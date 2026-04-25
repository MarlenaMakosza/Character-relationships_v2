# N-ary Relationships — architectural decision notes

## Decision: no n-ary table in base schema

Binary edges (source→target) are the atomic unit. "Triangle", "quadrilateral" etc.
are **graph patterns**, not stored entities — detectable via cycle algorithms at runtime.

## When n-ary storage makes sense (future consideration)

Only if the group is an **independent annotation** with its own metadata, NOT derivable
from binary edges. Example: manually tagging "these 3 characters form a romantic triangle
starting in chapter 5."

## Proposed schema if needed (NOT YET IMPLEMENTED)

```sql
character_groups (id, type, description)
-- type: 'triangle' | 'alliance' | 'rivalry' | ...

character_group_members (group_id, character_id)
-- junction table, no hardcoded character_a/b/c_id columns
```

Open/Closed: junction table handles triangles, quadrilaterals, groups of any size.

## Open question (unresolved)

Is the group **derived** (all binary edges must exist) or **independent** (manual annotation,
no FK to relations table)? This determines whether consistency enforcement is needed.
