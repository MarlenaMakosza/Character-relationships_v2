# 1. Introduction and Goals

## Purpose

Web application for managing characters and their relationships in creative projects.
Lets users build visual graphs of character connections and track rich character data.

## Use Cases

**Primary:**
- Writing novels and short stories
- Worldbuilding (fictional universes, lore, factions)
- RPG campaign design (NPCs, political webs)

**Secondary:**
- Analysing characters from books, series, films
- Any narrative project requiring character tracking

## Inspiration

- [Tintero](https://tintero.app) — template-based character sheets
- [vvd.world](https://vvd.world) — visual world-building tool
- Gramps — genealogy app, validation philosophy (see appendix)

## Top Quality Goals

| Priority | Goal | Motivation |
|----------|------|------------|
| 1 | Flexibility | Supports fantasy, sci-fi, contemporary, RPG — no domain assumptions |
| 2 | Usability | Intuitive for creative users, not developers |
| 3 | Performance | Handles 2000+ characters without degradation |

## Key Requirements (summary)

- Character has at least one identifier (name, nickname, tag — anything)
- Characters can be related to each other with typed, directional or mutual relations
- Relations visualised as interactive graph
- Custom attributes and tags on characters
- Single-user MVP; multi-user post-MVP

## Future Feature Ideas

- **Auto-typography in writing editor:** when a prose/novel writing area is added,
  automatically apply correct punctuation per writing style (Polish/English) —
  em dash in dialogue, en dash as sentence dash, style-correct quotation marks.

**Full backlog:** [backlog.md](backlog.md)

---

**Full attribute spec:** [appendix/character-attributes-extended.md](appendix/character-attributes-extended.md)
**Relationship type catalogue:** [appendix/relationship-types.md](appendix/relationship-types.md)
**Event type catalogue:** [appendix/event-types.md](appendix/event-types.md)
