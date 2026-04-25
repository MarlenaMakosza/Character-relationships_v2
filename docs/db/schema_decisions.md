# Schema decisions — relations table

## Decided

### Multiple relations between same pair — ALLOWED
Two characters can simultaneously have X and Y relation (e.g. siblings + enemies).
No unique constraint on `(idChar1, idChar2)`.

### Self-relation — ALLOWED
`idChar1 = idChar2` valid. No CHECK constraint blocking it.

### Directed vs undirected — per-relation flag
Column `isDirected: boolean NOT NULL DEFAULT false`.
- `true`: `idChar1` = source, `idChar2` = target, order matters
- `false`: symmetric, order irrelevant

### Undirected duplicate protection — partial unique index
`(A, B, "friends")` undirected == `(B, A, "friends")` undirected → duplicate.

Fix: partial unique index on `(LEAST(idChar1,idChar2), GREATEST(idChar1,idChar2), about)`
WHERE `is_directed = false`.

In app layer: normalize order before insert when `isDirected=false`
(`idChar1 = min(charA, charB)`, `idChar2 = max(charA, charB)`).

## Resulting schema

```ts
export const relations = pgTable('relations', {
  id: uuid('id').primaryKey().defaultRandom(),
  idChar1: uuid('id_char_1').notNull().references(() => characters.id),
  idChar2: uuid('id_char_2').notNull().references(() => characters.id),
  about: text('about').notNull(),
  isDirected: boolean('is_directed').notNull().default(false),
});
```

Plus migration adding partial unique index (raw SQL — Drizzle doesn't support
functional indexes in schema DSL):

```sql
CREATE UNIQUE INDEX relations_undirected_no_dup
ON relations (LEAST(id_char_1, id_char_2), GREATEST(id_char_1, id_char_2), about)
WHERE is_directed = false;
```

## Deferred

- n-ary group relations (triangles etc.) — see `notes/nary_relationships.md`
