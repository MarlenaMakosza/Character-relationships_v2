# 5. Building Block View

## Database Schema (current)

```text
characters
  id        uuid PK
  name      text NOT NULL

relations
  id        uuid PK
  idChar1   uuid FK → characters.id  NOT NULL
  idChar2   uuid FK → characters.id  NOT NULL
  about     text NOT NULL
  isDirected boolean NOT NULL DEFAULT false
```

Unique index: `(idChar1, idChar2, about)` WHERE `is_directed = false`
(app layer normalises `idChar1 < idChar2` before insert for undirected relations)

**Full planned schema:** see [appendix/character-attributes-extended.md](appendix/character-attributes-extended.md)

---

## Domain Classes

| Class | File | Responsibility |
|-------|------|----------------|
| `Character` | `Character.ts` | Character model, `fullName` getter |
| `Characters` | `Characters.ts` | Character collection |
| `Relationship` | `Relationship.ts` | Relation model |
| `Relationships` | `Relationships.ts` | Relation collection |
| `CharacterFormatter` | `CharacterFormatter.ts` | Format character to string |
| `RelationshipFormatter` | `RelationshipFormatter.ts` | Format relation → DOT language |

---

## Pages (current)

| Route | Description |
|-------|-------------|
| `/` | Main menu |
| `/characters` | Character list with delete |
| `/characters/[charId]` | Character detail (stub) |
| `/add_character` | Add character form |
| `/relations` | Relation list (read-only) |
| `/character_rel` | Graph view (SVG, Cytoscape) + relation table |
| `/sandbox` | Dev sandbox |
| `/debug` | Debug table |
