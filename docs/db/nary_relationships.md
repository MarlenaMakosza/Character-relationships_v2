# N-ary relationships — decision

**No n-ary table in base schema.**

Triangle/quadrilateral = graph pattern, detect via cycle algorithm at runtime.

## If needed in future

Only if group needs own metadata (e.g. "romantic triangle, started chapter 5").

Schema:
```sql
character_groups (id, type, description)
character_group_members (group_id, character_id)  -- junction, any group size
```

## Open question

Derived (binary edges must exist) or independent annotation (no FK to relations)?
